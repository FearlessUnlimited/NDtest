import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
    extracto: z.string().optional(),
    imagen: image().optional(),
    imagenAlt: z.string().optional(),
    categorias: z.array(z.string()).default([]),
    etiquetas: z.array(z.string()).default([]),
    autor: z.string().default('Brahman'),
    borrador: z.boolean().default(false),
  }),
});

const paginas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/paginas' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
    extracto: z.string().optional(),
    imagen: image().optional(),
    imagenAlt: z.string().optional(),
    autor: z.string().default('Brahman'),
    // linked from the menu but still without content
    enPreparacion: z.boolean().default(false),
    borrador: z.boolean().default(false),
  }),
});

// Fields mirror the ACF group "Guia de Psicoactivo"; long fields live in the body as ## sections.
const guias = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guias' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    nombre: z.string().optional(),
    alias: z.array(z.string()).default([]),
    nombreMolecular: z.string().optional(),
    formula: z.string().optional(),
    extracto: z.string().optional(),
    imagen: image().optional(),
    molecula: image().optional(),
    borrador: z.boolean().default(false),
  }),
});

// Fields mirror the ACF group "Charlas".
const charlas = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/charlas' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    video: z.url().optional(),
    idioma: z.string().optional(),
    subtitulosEspanol: z.string().optional(),
    subtitulosIngles: z.string().optional(),
    expositor: z.string().optional(),
    cargo: z.string().optional(),
    foto: image().optional(),
    frase: z.string().optional(),
    borrador: z.boolean().default(false),
  }),
});

export const collections = { posts, paginas, guias, charlas };
