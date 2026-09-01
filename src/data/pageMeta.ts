export const SITE_NAME = 'Killian Tirache';
export const SITE_URL = 'https://killian-tirache.github.io';

export interface PageMetaDefinition {
  /** Chemin public canonique. Les pages GitHub Pages utilisent un slash final. */
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageType: 'image/png' | 'image/webp';
  priority: number;
  noIndex?: boolean;
}

export const PAGE_META = {
  home: {
    path: '/',
    title: 'Killian Tirache — Développeur web full-stack',
    description:
      'Killian Tirache, développeur web full-stack. Je conçois, développe et déploie des applications web : Under the Deep, FushiNote et Ticketing App.',
    image: '/og-image.png',
    imageAlt: 'Killian Tirache, développeur web full-stack',
    imageWidth: 1200,
    imageHeight: 630,
    imageType: 'image/png',
    priority: 1,
  },
  projects: {
    path: '/projects/',
    title: 'Mes projets — Killian Tirache',
    description:
      "Les projets que j'ai conçus et développés : jeu web temps réel, applications full-stack TypeScript et outil de support multi-entreprises.",
    image: '/og-image.png',
    imageAlt: 'Projets web full-stack de Killian Tirache',
    imageWidth: 1200,
    imageHeight: 630,
    imageType: 'image/png',
    priority: 0.9,
  },
  underTheDeep: {
    path: '/projects/1/',
    title: 'Under the Deep — Killian Tirache',
    description: 'MMORPG idle jouable dans le navigateur',
    image: '/og/under-the-deep.webp',
    imageAlt: 'Aperçu du jeu Under the Deep',
    imageWidth: 1600,
    imageHeight: 1000,
    imageType: 'image/webp',
    priority: 0.8,
  },
  fushiNote: {
    path: '/projects/2/',
    title: 'FushiNote — Killian Tirache',
    description: 'Suivi d’animés, installable comme une application',
    image: '/og/fushinote.webp',
    imageAlt: 'Aperçu de l’application FushiNote',
    imageWidth: 1600,
    imageHeight: 1000,
    imageType: 'image/webp',
    priority: 0.8,
  },
  ticketing: {
    path: '/projects/5/',
    title: 'Ticketing App — Killian Tirache',
    description: 'Support multi-entreprises, du signalement à la résolution',
    image: '/og/ticketing.png',
    imageAlt: 'Aperçu de Ticketing App',
    imageWidth: 1264,
    imageHeight: 775,
    imageType: 'image/png',
    priority: 0.8,
  },
  about: {
    path: '/about/',
    title: 'À propos — Killian Tirache',
    description:
      'Développeur web full-stack : React, TypeScript, Node.js, PostgreSQL, Docker. Mon parcours, mes compétences et ma façon de travailler.',
    image: '/og-image.png',
    imageAlt: 'Killian Tirache, développeur web full-stack',
    imageWidth: 1200,
    imageHeight: 630,
    imageType: 'image/png',
    priority: 0.7,
  },
  contact: {
    path: '/contact/',
    title: 'Contact — Killian Tirache',
    description:
      "Une idée, un projet, une collaboration ? Écris-moi, je réponds à tous les messages.",
    image: '/og-image.png',
    imageAlt: 'Contacter Killian Tirache',
    imageWidth: 1200,
    imageHeight: 630,
    imageType: 'image/png',
    priority: 0.6,
  },
} as const satisfies Record<string, PageMetaDefinition>;

export const STATIC_PAGE_META: PageMetaDefinition[] = Object.values(PAGE_META);

export const NOT_FOUND_META: PageMetaDefinition = {
  path: '',
  title: 'Page introuvable — Killian Tirache',
  description: "Cette page n'existe pas ou plus. Retour à l'accueil ou vers les projets.",
  image: '/og-image.png',
  imageAlt: 'Killian Tirache, développeur web full-stack',
  imageWidth: 1200,
  imageHeight: 630,
  imageType: 'image/png',
  priority: 0,
  noIndex: true,
};

export function toAbsoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getProjectPageMeta(projectId: number) {
  return STATIC_PAGE_META.find((page) => page.path === `/projects/${projectId}/`);
}
