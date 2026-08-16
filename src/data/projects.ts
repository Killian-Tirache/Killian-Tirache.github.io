import underTheDeepCover from '../assets/projects/under-the-deep/cover.webp';
import underTheDeepWorld from '../assets/projects/under-the-deep/world.webp';
import underTheDeepGauntlets from '../assets/projects/under-the-deep/gauntlets.webp';
import underTheDeepWheel from '../assets/projects/under-the-deep/wheel.webp';
import underTheDeepLoop from '../assets/projects/under-the-deep/loop.webp';
import fushiNoteCover from '../assets/projects/fushinote/cover.webp';
import fushiNoteCollections from '../assets/projects/fushinote/collections.webp';
import fushiNotePlanning from '../assets/projects/fushinote/planning.webp';
import fushiNoteMobile from '../assets/projects/fushinote/mobile.webp';

import showcaseSiteImage from '../assets/home-projects-images/showcase-site-image.jpeg';
import eCommerceImage from '../assets/home-projects-images/e-commerce-site-image.jpeg';
import saasImage from '../assets/home-projects-images/saas-site-image.jpeg';
import eLearningImage from '../assets/home-projects-images/e-learning-site-image.jpeg';
import crmImage from '../assets/home-projects-images/crm-site-image.jpeg';
import appMobileImage from '../assets/home-projects-images/app-mobile-site-image.jpeg';

export interface IProjectLink {
  label: string;
  url: string;
  primary?: boolean;
}

export interface IProjectShot {
  src: string;
  caption: string;
  /** Capture au format téléphone : affichée plus étroite dans la galerie. */
  portrait?: boolean;
}

export interface IProject {
  id: number;
  title: string;
  /** Phrase courte affichée sous le titre, dans la liste et sur la fiche. */
  tagline: string;
  image: string;
  category: string;
  description: string;
  technologies: string[];
  /** Projets réels : tout ce qui suit est optionnel pour les fiches encore en placeholder. */
  year?: string;
  role?: string;
  status?: string;
  context?: string[];
  stats?: { value: string; label: string }[];
  highlights?: { title: string; text: string }[];
  gallery?: IProjectShot[];
  links?: IProjectLink[];
  /** Précision affichée sous les liens (dépôt privé, accès sur demande…). */
  linksNote?: string;
  featured?: boolean;
  placeholder?: boolean;
}

export const projectsData: IProject[] = [
  {
    id: 1,
    title: 'Under the Deep',
    tagline: 'MMORPG idle jouable dans le navigateur',
    image: underTheDeepCover,
    category: 'jeu',
    year: 'Depuis mai 2026',
    role: 'Conception et développement complets (jeu, back-end, front-end, infra)',
    status: 'En développement — préparation de l’alpha privée',
    description:
      "Under the Deep est un MMORPG idle en monde fantasy : on descend dans un gouffre de huit zones élémentaires, on récolte, on craft, on combat en temps réel et on progresse même hors ligne. Tout le jeu tourne dans le navigateur, sans installation.",
    context: [
      "Le projet est parti d’une envie simple : retrouver la boucle des jeux idle que j’aime, mais avec un vrai monde partagé et une progression qui tient sur la durée. J’ai tout construit moi-même, du modèle de données au design de la page d’accueil.",
      "L’intérêt technique est là : un serveur qui fait autorité sur toutes les actions, des timers persistés en base et restaurés après un redémarrage, et un WebSocket qui pousse l’état du combat aux joueurs d’un même groupe en temps réel.",
    ],
    stats: [
      { value: '32', label: 'modules métier côté serveur' },
      { value: '8', label: 'zones élémentaires' },
      { value: '~570', label: 'fichiers TypeScript' },
      { value: '42', label: 'suites de tests back-end' },
    ],
    highlights: [
      {
        title: 'Un serveur qui fait autorité',
        text: "Récolte, craft, combats de groupe : chaque action est validée et exécutée côté serveur. Les états et les timers sont persistés en PostgreSQL puis restaurés au redémarrage, pour qu’une coupure ne coûte jamais la progression d’un joueur.",
      },
      {
        title: 'Temps réel en WebSocket',
        text: "Combats de groupe, présence en ligne, chat multi-canaux et recherche de raid passent par un WebSocket natif Fastify, avec un état de combat diffusé à tous les membres du groupe.",
      },
      {
        title: 'Un système de combat élémentaire',
        text: "Huit éléments, une roue de forces et faiblesses, deux gantelets à combiner et six sorts à assembler : la maîtrise se joue dans la construction du build, pas dans le clic.",
      },
      {
        title: 'Déployé comme un vrai service',
        text: "Monorepo TypeScript, Docker Compose, Nginx en développement, Caddy et HTTPS automatique en production, sauvegardes PostgreSQL quotidiennes et intégration continue GitHub Actions.",
      },
    ],
    gallery: [
      {
        src: underTheDeepWorld,
        caption: 'Le Gouffre : huit zones élémentaires, chacune débloquée par ses propres épreuves.',
      },
      {
        src: underTheDeepGauntlets,
        caption: 'Les gantelets : deux éléments à associer, six sorts à composer avant la descente.',
      },
      {
        src: underTheDeepWheel,
        caption: 'La roue élémentaire : chaque élément domine le suivant et cède au précédent.',
      },
      {
        src: underTheDeepLoop,
        caption: 'La boucle de jeu : récolter, crafter, combattre, descendre plus bas.',
      },
    ],
    technologies: [
      'TypeScript',
      'React 19',
      'Vite',
      'TanStack Query',
      'Zustand',
      'Node.js',
      'Fastify 5',
      'WebSocket',
      'Drizzle ORM',
      'PostgreSQL 17',
      'Vitest',
      'Docker',
      'Caddy',
      'GitHub Actions',
    ],
    linksNote: 'Dépôt privé le temps de l’alpha — je le présente volontiers sur demande.',
    featured: true,
  },
  {
    id: 2,
    title: 'FushiNote',
    tagline: 'Suivi d’animés, installable comme une application',
    image: fushiNoteCover,
    category: 'webapp',
    year: 'Depuis juillet 2026',
    role: 'Conception produit, développement full-stack et mise en production',
    status: 'En ligne sur fushinote.com',
    description:
      "FushiNote réunit une bibliothèque privée d’animés, la progression épisode par épisode, les prochaines diffusions et des notifications, dans une interface volontairement calme. Saisons, films, OVA et spéciaux se regroupent automatiquement sous une seule affiche.",
    context: [
      "Le problème de départ est banal : quand on suit dix séries en parallèle, on ne sait plus où on en est. Les catalogues existants répondent par des tableaux façon base de données, où chaque saison compte comme une œuvre distincte.",
      "FushiNote fait le travail à la place de l’utilisateur : il relie les œuvres entre elles, retient la progression de chaque format et annonce ce qui sort cette semaine. Le catalogue vient d’AniList (ou de MyAnimeList, au choix) ; seules les données personnelles sont stockées côté serveur.",
    ],
    stats: [
      { value: '3', label: 'workspaces npm (api, web, shared)' },
      { value: '~200', label: 'fichiers TypeScript' },
      { value: '22', label: 'suites de tests' },
      { value: 'PWA', label: 'installable, avec notifications push' },
    ],
    highlights: [
      {
        title: 'Les collections se rangent toutes seules',
        text: "Les relations d’AniList sont exploitées pour regrouper saisons, films, OVA et spin-offs sous une même affiche, avec une progression indépendante par œuvre et un statut unique pour la franchise.",
      },
      {
        title: 'Ne jamais inventer une donnée',
        text: "Une date partielle s’affiche partielle, une diffusion estimée porte son « ≈ », une collection incomplète le dit. Le principe traverse la base, l’API et l’interface.",
      },
      {
        title: 'PWA et notifications push',
        text: "L’application s’installe sur mobile et desktop, propose elle-même son installation, garde un shell disponible hors connexion et relaie ses alertes en push, appareil par appareil.",
      },
      {
        title: 'Sécurité et production',
        text: "Sessions opaques en cookie, mots de passe hachés en Argon2id, validation Zod sur toutes les entrées, en-têtes CSP posés par Nginx et HTTPS terminé par Caddy sur un VPS.",
      },
    ],
    gallery: [
      {
        src: fushiNoteCollections,
        caption: 'Une affiche par collection : saisons, films, OVA et spéciaux rangés dessous.',
      },
      {
        src: fushiNotePlanning,
        caption: 'Le planning de la semaine, avec les horaires estimés clairement signalés.',
      },
      {
        src: fushiNoteMobile,
        caption: 'La version mobile, terrain principal du geste quotidien « j’ai vu l’épisode ».',
        portrait: true,
      },
    ],
    technologies: [
      'TypeScript',
      'React 19',
      'Vite',
      'React Router',
      'TanStack Query',
      'Fastify 5',
      'Zod',
      'Drizzle ORM',
      'PostgreSQL 16',
      'Argon2id',
      'PWA / Web Push',
      'GraphQL (AniList)',
      'Docker',
      'Caddy',
    ],
    links: [{ label: 'Voir le site', url: 'https://fushinote.com', primary: true }],
    linksNote: 'Dépôt privé — je le présente volontiers sur demande.',
    featured: true,
  },

  /* ------------------------------------------------------------------ */
  /* Fiches de démonstration — à remplacer par tes projets réels.        */
  /* ------------------------------------------------------------------ */
  {
    id: 3,
    title: 'Projet C',
    tagline: 'Site vitrine responsive',
    image: showcaseSiteImage,
    category: 'vitrine',
    description:
      "Un site vitrine moderne et responsive conçu pour présenter l'identité d'une entreprise avec élégance.",
    technologies: ['React', 'CSS', 'Framer Motion'],
    placeholder: true,
  },
  {
    id: 4,
    title: 'Projet D',
    tagline: 'Boutique en ligne complète',
    image: eCommerceImage,
    category: 'ecommerce',
    description:
      'Une plateforme e-commerce complète avec panier, paiement sécurisé et gestion de produits.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    placeholder: true,
  },
  {
    id: 5,
    title: 'Projet E',
    tagline: 'Application SaaS avec tableau de bord',
    image: saasImage,
    category: 'saas',
    description:
      'Une application SaaS performante avec gestion des utilisateurs, authentification et dashboard en temps réel.',
    technologies: ['React', 'Express', 'PostgreSQL'],
    placeholder: true,
  },
  {
    id: 6,
    title: 'Projet F',
    tagline: 'Plateforme d’apprentissage en ligne',
    image: eLearningImage,
    category: 'elearning',
    description:
      'Une plateforme d’apprentissage en ligne interactive permettant aux utilisateurs de suivre des cours, de visualiser leur progression et d’obtenir des certificats.',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'MongoDB', 'Framer Motion'],
    placeholder: true,
  },
  {
    id: 7,
    title: 'Projet G',
    tagline: 'Outil de gestion client sur mesure',
    image: crmImage,
    category: 'crm',
    description:
      'Outil de gestion client sur mesure avec interface claire, filtres dynamiques et export de données.',
    technologies: ['React', 'NestJS', 'MongoDB'],
    placeholder: true,
  },
  {
    id: 8,
    title: 'Projet H',
    tagline: 'Application mobile hybride',
    image: appMobileImage,
    category: 'mobile',
    description:
      'Une application mobile hybride développée pour permettre aux utilisateurs de gérer leurs tâches et leurs projets en déplacement. Synchronisation en temps réel, notifications push et design minimaliste.',
    technologies: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
    placeholder: true,
  },
];

export const projectCategories = [
  'tous',
  'jeu',
  'webapp',
  'vitrine',
  'ecommerce',
  'saas',
  'elearning',
  'crm',
  'mobile',
];
