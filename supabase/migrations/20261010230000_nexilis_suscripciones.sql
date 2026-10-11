-- Nexilis Dogmata. Everything lives in its own schema, "nexilis" (one schema per app, as in fearless-dev).
-- Private helpers go in "nexilis_privado", which the API does not expose and clients cannot use.

create schema if not exists nexilis;
grant usage on schema nexilis to anon, authenticated, service_role;

create schema if not exists nexilis_privado;
revoke all on schema nexilis_privado from public, anon, authenticated;

-- Private salt to hash IPs, so no IP is ever stored in clear.
create table nexilis_privado.config (
  clave text primary key,
  valor text not null
);
insert into nexilis_privado.config (clave, valor)
values ('sal_ip', encode(extensions.gen_random_bytes(32), 'hex'));

-- Client IP as reported by Supabase: first value of x-forwarded-for. It can be spoofed,
-- so the per-IP limit is a first barrier, not a guarantee.
create function nexilis_privado.hash_ip() returns text
language sql stable set search_path = '' as $$
  select encode(extensions.digest(
    coalesce(nullif(trim(split_part(
      coalesce(nullif(current_setting('request.headers', true), '')::json ->> 'x-forwarded-for', ''),
      ',', 1)), ''), 'sin-ip')
    || (select valor from nexilis_privado.config where clave = 'sal_ip'),
    'sha256'), 'hex')
$$;

-- ---------- newsletter subscribers (footer form "Mantente al tanto de nuestro lanzamiento") ----------
create table nexilis.suscriptores (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  creado timestamptz not null default now(),
  ip_hash text,
  constraint suscriptores_email_formato check (
    length(email) <= 254 and email = lower(email) and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  )
);
create unique index suscriptores_email_unico on nexilis.suscriptores (email);
create index suscriptores_ip_reciente on nexilis.suscriptores (ip_hash, creado);

-- RLS on and no policies: nobody reads or writes the table through the API.
-- The only way in is nexilis.suscribir().
alter table nexilis.suscriptores enable row level security;
revoke all on nexilis.suscriptores from anon, authenticated;

create function nexilis.suscribir(p_email text) returns text
language plpgsql security definer set search_path = '' as $$
declare
  v_email text := lower(trim(p_email));
  v_ip text := nexilis_privado.hash_ip();
begin
  if v_email is null or length(v_email) > 254 or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'email_invalido' using errcode = '22023';
  end if;

  if (select count(*) from nexilis.suscriptores s
      where s.ip_hash = v_ip and s.creado > now() - interval '1 hour') >= 5 then
    raise exception 'demasiados_intentos' using errcode = 'P0001';
  end if;

  insert into nexilis.suscriptores (email, ip_hash) values (v_email, v_ip)
  on conflict (email) do nothing;

  -- same answer for new and existing emails, so the form cannot be used to check who subscribed
  return 'ok';
end;
$$;

revoke all on function nexilis.suscribir(text) from public;
grant execute on function nexilis.suscribir(text) to anon, authenticated;
