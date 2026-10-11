import { getCollection, type CollectionEntry } from 'astro:content';
import categorias from '../data/categorias.json';

export type Categoria = (typeof categorias)[number];

/** Drafts are visible in `astro dev` and excluded from the build. */
export const publicado = ({ data }: { data: { borrador?: boolean } }) => import.meta.env.DEV || !data.borrador;

export async function postsPublicados() {
  return (await getCollection('posts', publicado)).sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

export const categoriaPorSlug = (slug: string) => categorias.find((c) => c.slug === slug);
export const urlCategoria = (c: Categoria) => `/category/${c.ruta}/`;

/** A category page lists its own posts plus those of its subcategories. */
export function slugsDeCategoria(c: Categoria): string[] {
  return [c.slug, ...categorias.filter((h) => h.padre === c.slug).flatMap(slugsDeCategoria)];
}

/** Same estimate as the original reading-time plugin: ~200 words per minute, minimum 1. */
export function minutosDeLectura(texto = ''): number {
  const palabras = texto.replace(/<[^>]+>|[#*_>\-[\]()!`]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}

const formato = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatearFecha = (d: Date) => formato.format(d);

export type Articulo = CollectionEntry<'posts'> | CollectionEntry<'paginas'>;
