# Nexilis Dogmata

Sitio de Nexilis Dogmata reconstruido fuera de WordPress y Elementor, como código propio, con [Astro](https://astro.build) 7.

El diseño original se rescató en `rescate-visual/`, en la carpeta del proyecto, fuera de este repositorio: allí están las capturas, las recreaciones y la receta de cada efecto.

## Comandos

```bash
npm install
npm run dev       # desarrollo en http://localhost:4321 (muestra también los borradores)
npm run build     # genera el sitio estático en dist/ (sin borradores)
npm run preview   # sirve dist/
npm run check     # verificación de tipos
```

### Supabase local

Las suscripciones y "Ingresar" usan Supabase, con todo en el esquema `nexilis`. Para usarlo en local:

1. Abre Docker Desktop y espera a que diga "Engine running".
2. Corre `npx supabase start`. Aplica las migraciones de `supabase/migrations`.
3. Copia `.env.example` a `.env`. Ya trae la URL y la clave pública locales.
4. Para ver los datos y los correos:
   - Studio: http://127.0.0.1:54323
   - Correos de prueba (Mailpit): http://127.0.0.1:54324

Sin `.env`, el sitio funciona igual: el formulario y "Ingresar" solo muestran un aviso.

Usa los mismos puertos que los otros proyectos locales, así que solo uno puede estar encendido a la vez (`npx supabase stop` en el otro).

| Pieza | Cómo funciona |
|---|---|
| `nexilis.suscriptores` | RLS activado y sin permisos directos. Solo se escribe con la función `nexilis.suscribir(p_email)`. |
| `nexilis.suscribir` | Valida y normaliza el email y limita a 5 por hora por IP (la IP se guarda como hash con sal privada). Responde igual si el email ya existía. |
| `nexilis_privado` | Sal e IP hasheada. No está expuesto en la API. |
| Ingresar | Supabase Auth con enlace mágico por email (PKCE). El correo está en español (`supabase/templates/enlace-ingreso.html`). |

## Estructura

| Ruta | Contenido |
|---|---|
| `src/content/posts`, `paginas`, `guias`, `charlas` | Contenido en Markdown, migrado desde WordPress. Las imágenes de cada colección están en su carpeta `img/`. |
| `src/content.config.ts` | Esquema de cada colección. Las guías y las charlas reflejan los campos ACF originales. |
| `src/data/sitio.ts` | Identidad, redes y el megamenú completo (pestañas, enlaces y listas de Spotify). |
| `src/data/categorias.json` | Árbol de categorías de WordPress. |
| `src/styles/tokens.css` | Colores, tipografías, efectos y medidas (`--nd-…`). |
| `src/components/` | Megamenú, encabezado, cabecera psicodélica, barra lateral, pie y tarjetas. |
| `src/pages/` | Portada, posts y páginas en la raíz (`/slug/`), `guias/`, `category/…` y `videos/`. Son las mismas URL que en WordPress. |

## Contenido

- Cada archivo `.md` tiene sus datos (título, fecha, imagen, categorías) al inicio, entre `---`.
- `borrador: true` oculta una entrada del sitio publicado; en `npm run dev` se sigue viendo.
- `enPreparacion: true` (páginas) muestra el aviso "en preparación".
- Las notas al pie usan `[^1]` y se muestran al final como "Referencias".

## Decisiones de diseño

- **Capitalización:** se mantiene la original en el menú, las categorías y los títulos. El título del pie va con mayúscula solo al inicio.
- **Títulos de cabecera:** no se cortan por la izquierda; bajan de línea dentro del margen.
- **Tipografías:** 4 familias (Merriweather, Lato, Oswald y Roboto), servidas desde el propio sitio con Fontsource.
- **Enlaces:** en el morado de marca (`#7100e2`).
- **Tamaños:** continuos con mínimo y máximo. El texto de los artículos tiene un mínimo de 15 px.
- **Sin terceros que rastreen:** se quitaron los comentarios y la página de Facebook. Para compartir se usan enlaces simples.

## Pendiente

- **Publicar:** elegir hosting para el sitio y un proyecto de Supabase en la nube (o el esquema `nexilis` en "fearless-dev"). Configurar ahí las variables `PUBLIC_SUPABASE_*`, la URL del sitio y las de redirección de Auth.
- **Correos reales:** configurar SMTP en Supabase. En local caen en Mailpit.
- **Contenido vacío:** pestañas Escéptico, Iniciado y Espiritual, la página "La experiencia mística" y la guía DMT.

## Licencias de terceros

- Íconos: fuente **Dashicons** de WordPress (GPLv2 o posterior), en `public/fuentes/dashicons.woff2`.
- Tipografías: Fontsource (SIL Open Font License).
