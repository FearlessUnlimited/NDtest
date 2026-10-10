// Site-wide data rescued from WordPress: identity, social links and the QuadMenu megamenu.
// Labels keep the original capitalization (decision 2026-10-10).

export const sitio = {
  nombre: 'Nexilis Dogmata',
  // original tagline; "espriritualidad" typo fixed
  descripcion:
    'Por la expansión y defensa de la soberanía de la consciencia a través de la espiritualidad y la integración guiada de experiencias (psicodélicos, enteógenos, ecodélicos, meditación, etc).',
  autor: 'Brahman',
  creditos: 'Desarrollado por Fearless Design',
};

export const redes = [
  { nombre: 'Facebook', url: 'https://www.facebook.com/NexilisDogmata', icono: 'facebook-alt' },
  { nombre: 'Twitter', url: 'https://www.twitter.com/NexilisDogmata', icono: 'twitter' },
  { nombre: 'Instagram', url: 'https://www.instagram.com/Nexilis_Dogmata', icono: 'camera' },
] as const;

export type Icono =
  | 'share' | 'universal-access-alt' | 'universal-access' | 'admin-plugins' | 'welcome-learn-more'
  | 'businessman' | 'image-filter' | 'groups' | 'format-audio' | 'heart' | 'visibility'
  | 'controls-pause' | 'hidden' | 'trash' | 'palmtree' | 'cloud' | 'welcome-view-site'
  | 'smiley' | 'admin-site' | 'facebook-alt' | 'twitter' | 'camera' | 'admin-users';

export interface Enlace { texto: string; url: string }

export interface Pestana {
  titulo: string;
  subtitulo?: string;
  icono?: Icono;
  enlaces?: Enlace[];
  /** Spotify playlist id, rendered as an embed inside the panel */
  playlist?: string;
}

export interface ItemMenu {
  id: string;
  titulo: string;
  subtitulo?: string;
  icono: Icono;
  insignia?: string;
  /** megamenu with vertical tabs */
  pestanas?: Pestana[];
  tipo?: 'redes' | 'ingresar' | 'guias';
}

// Spotify playlist per Play tab, mapped from the Elementor templates P_* inside each tab
export const menu: ItemMenu[] = [
  { id: 'compartir', titulo: 'Redes', icono: 'share', tipo: 'redes' },
  {
    id: 'antes-que-todo',
    titulo: 'ANTES QUE TODO',
    subtitulo: 'Elige tu modo de lectura',
    icono: 'universal-access-alt',
    insignia: 'START',
    pestanas: [
      {
        titulo: 'CURIOSO', subtitulo: 'Información Básica', icono: 'admin-plugins',
        enlaces: [
          { texto: 'Qué es Nexilis Dogmata', url: '/que-es-nexilis-dogmata/' },
          { texto: 'Quién está detrás de Nexilis Dogmata?', url: '/quien-esta-detras-de-nexilis-dogmata/' },
          { texto: 'Psicodélicos Clásicos', url: '/psicodelicos-clasicos/' },
        ],
      },
      { titulo: 'ESCÉPTICO', subtitulo: 'Estudios Científicos y más', icono: 'welcome-learn-more' },
      {
        titulo: 'INTERESADO', subtitulo: 'Cuéntame más', icono: 'businessman',
        enlaces: [{ texto: 'El Despertar de la Consciencia', url: '/el-despertar-de-la-consciencia/' }],
      },
      {
        titulo: 'DECIDIDO', subtitulo: 'Manuales y más', icono: 'image-filter',
        enlaces: [
          { texto: 'El rol del Chamán', url: '/el-rol-del-chaman/' },
          { texto: 'La disolución del ego', url: '/la-disolucion-del-ego/' },
          { texto: 'La experiencia mística', url: '/la-experiencia-mistica/' },
        ],
      },
      { titulo: 'INICIADO', subtitulo: 'Experiencias, soporte', icono: 'groups' },
      { titulo: 'ESPIRITUAL', subtitulo: 'Mente y espíritu', icono: 'universal-access' },
    ],
  },
  {
    id: 'play',
    titulo: 'Play',
    icono: 'format-audio',
    pestanas: [
      { titulo: 'Previa', icono: 'groups', playlist: '14fVSA8ObOVWlh8IUPAGCV' },
      { titulo: 'Lista Oficial', icono: 'image-filter', playlist: '12bbDJFHmc1BNNAUctBdsO' },
      { titulo: 'RESPECT', icono: 'heart', playlist: '2JQeLCQvLqOQO3vNYXZKrT' },
      { titulo: 'Viaje', icono: 'visibility', playlist: '4bcSWIINXSZX8iVU1CI0gt' },
      { titulo: 'Relax', icono: 'controls-pause', playlist: '71eh5UCP2DaMLnXYiuOM10' },
      { titulo: 'Meditation', icono: 'hidden', playlist: '04WCnadFF3e8rqgK6QJ32p' },
      { titulo: 'OMG', icono: 'trash', playlist: '6Z3hEUxfZLDMTGSte21PKE' },
      { titulo: 'Absolute Chill', icono: 'palmtree', playlist: '3ll7FuE0aI8nDnGmK8P0su' },
      { titulo: 'Andes Step', icono: 'cloud', playlist: '6U3E4Zpl5GecxAXaryd4T1' },
      { titulo: 'Moonlight', icono: 'welcome-view-site', playlist: '2GXk9n0IzzTiUzAgilp2Gr' },
      { titulo: 'Covers', icono: 'smiley', playlist: '3SqV7us3Bdnk3ncGqfMJ7E' },
      { titulo: 'Eastern Chill', icono: 'admin-site', playlist: '0r63RvXe4YMWWrGhEBmTns' },
    ],
  },
  {
    id: 'actualidad',
    titulo: 'Actualidad',
    icono: 'admin-site',
    pestanas: [
      {
        titulo: 'Mente & Espíritu',
        enlaces: [
          { texto: 'Ciencia', url: '/category/mente-y-espiritu/ciencia/' },
          { texto: 'Espiritualidad', url: '/category/mente-y-espiritu/espiritualidad/' },
          { texto: 'Filosofía', url: '/category/mente-y-espiritu/filosofia/' },
          { texto: 'Religión', url: '/category/mente-y-espiritu/religion/' },
          { texto: 'Técnicas', url: '/category/mente-y-espiritu/tecnicas/' },
          { texto: 'Terapias', url: '/category/mente-y-espiritu/terapias/' },
        ],
      },
      {
        titulo: 'Arte & Cultura',
        enlaces: [
          { texto: 'Cine', url: '/category/arte-y-cultura/cine/' },
          { texto: 'Eventos', url: '/category/arte-y-cultura/eventos/' },
          { texto: 'Literatura y Poesía', url: '/category/arte-y-cultura/literatura-y-poesia/' },
          { texto: 'Música', url: '/category/arte-y-cultura/musica/' },
        ],
      },
      {
        titulo: 'Identidad',
        enlaces: [
          { texto: 'Consumo', url: '/category/identidad/consumo/' },
          { texto: 'Latinoamérica', url: '/category/identidad/latinoamerica/' },
          { texto: 'Pueblos Originarios', url: '/category/identidad/pueblos-originarios/' },
          { texto: 'Sin filtro', url: '/category/identidad/sin-filtro/' },
        ],
      },
      {
        titulo: 'Bienestar',
        enlaces: [
          { texto: 'Nuestros Hijos', url: '/category/bienestar/nuestros-hijos/' },
          { texto: 'Salud Espiritual', url: '/category/bienestar/salud-espiritual/' },
          { texto: 'Salud Mental', url: '/category/bienestar/salud-mental/' },
          { texto: 'Salud y Nutrición', url: '/category/bienestar/salud-y-nutricion/' },
        ],
      },
      {
        titulo: 'Psicoactivos',
        enlaces: [
          { texto: 'Mitigación de Daños', url: '/category/psicoactivos/mitigacion-de-danos/' },
          { texto: 'Renacimiento Psicodélico', url: '/category/psicoactivos/renacimiento-psicodelico/' },
          { texto: 'Soberanía de la Consciencia', url: '/category/psicoactivos/soberania-de-la-consciencia/' },
          { texto: 'Autocultivo', url: '/category/psicoactivos/autocultivo/' },
          { texto: 'MicroDosing', url: '/category/psicoactivos/microdosing/' },
        ],
      },
      {
        titulo: 'Medio Ambiente',
        enlaces: [
          { texto: 'Agricultura Orgánica', url: '/category/medio-ambiente/agricultura-organica/' },
          { texto: 'Calentamiento Global', url: '/category/medio-ambiente/calentamiento-global/' },
          { texto: 'Conservación', url: '/category/medio-ambiente/conservacion/' },
          { texto: 'Ecosistemas', url: '/category/medio-ambiente/ecosistemas/' },
          { texto: 'Especies', url: '/category/medio-ambiente/especies/' },
          { texto: 'Reciclaje', url: '/category/medio-ambiente/reciclaje/' },
        ],
      },
      {
        titulo: 'Humor',
        enlaces: [
          { texto: 'Memes', url: '/category/humor/memes/' },
          { texto: 'Shitpost', url: '/category/humor/shitpost/' },
        ],
      },
    ],
  },
  { id: 'ingresar', titulo: 'Ingresar', icono: 'admin-users', tipo: 'ingresar' },
  { id: 'guias', titulo: 'Guias', icono: 'image-filter', tipo: 'guias' },
];
