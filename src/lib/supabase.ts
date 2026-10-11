// Browser client for the "nexilis" schema. Without PUBLIC_SUPABASE_* (e.g. a deploy with no backend)
// it is null and the forms fall back to an informative message.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const clave = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase: SupabaseClient | null = url && clave
  ? createClient(url, clave, { auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true } })
  : null;

export type ResultadoSuscripcion = 'ok' | 'email_invalido' | 'demasiados_intentos' | 'sin_conexion' | 'sin_backend';

export async function suscribir(email: string): Promise<ResultadoSuscripcion> {
  if (!supabase) return 'sin_backend';
  const { error } = await supabase.schema('nexilis').rpc('suscribir', { p_email: email });
  if (!error) return 'ok';
  if (error.message === 'email_invalido' || error.message === 'demasiados_intentos') return error.message;
  console.error('suscribir:', error);
  return 'sin_conexion';
}
