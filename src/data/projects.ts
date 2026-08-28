import underTheDeepCover from '../assets/projects/under-the-deep/cover.webp';
import underTheDeepWorld from '../assets/projects/under-the-deep/world.webp';
import underTheDeepGauntlets from '../assets/projects/under-the-deep/gauntlets.webp';
import underTheDeepWheel from '../assets/projects/under-the-deep/wheel.webp';
import underTheDeepLoop from '../assets/projects/under-the-deep/loop.webp';
import fushiNoteCover from '../assets/projects/fushinote/cover.webp';
import fushiNoteCollections from '../assets/projects/fushinote/collections.webp';
import fushiNotePlanning from '../assets/projects/fushinote/planning.webp';
import fushiNoteMobile from '../assets/projects/fushinote/mobile.webp';
import ticketingCover from '../assets/projects/ticketing/cover.png';
import ticketingTickets from '../assets/projects/ticketing/tickets.png';
import ticketingTicketDetail from '../assets/projects/ticketing/ticket-detail.png';
import ticketingChat from '../assets/projects/ticketing/chat.png';

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
  /** Informations complémentaires affichées sur les fiches détaillées. */
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
  {
    id: 5,
    title: 'Ticketing App',
    tagline: 'Support multi-entreprises, du signalement à la résolution',
    image: ticketingCover,
    category: 'saas',
    year: 'Depuis janvier 2026',
    role: 'Conception et développement full-stack, tests et déploiement',
    status: 'En ligne — front-end sur Vercel, API sur Render',
    description:
      "Ticketing App centralise les demandes de support de plusieurs entreprises : création, recherche et suivi des tickets, assignation aux équipes, changement de statut et discussion en temps réel. Chaque rôle — administrateur, support ou utilisateur — voit les données et les actions qui lui sont destinées.",
    context: [
      "Le point de départ était de construire un outil de support qui reste simple pour l’utilisateur tout en gérant les contraintes d’une organisation réelle : plusieurs entreprises, des droits différents et un historique fiable des actions.",
      "J’ai séparé l’interface React de l’API Express, puis fait appliquer les permissions côté serveur. Les tickets reçoivent une référence propre à leur entreprise et à leur année, le dashboard s’adapte au rôle connecté et Socket.IO relie chaque discussion à son ticket.",
    ],
    stats: [
      { value: '3', label: 'rôles aux permissions distinctes' },
      { value: '4 × 4', label: 'statuts et niveaux de priorité' },
      { value: '143', label: 'fichiers source TypeScript' },
      { value: '147', label: 'cas de test back-end' },
    ],
    highlights: [
      {
        title: 'Des droits calés sur l’organisation',
        text: "L’administrateur pilote l’ensemble de la plateforme, le support intervient sur les entreprises qui lui sont rattachées et l’utilisateur ne voit que les tickets de ses entreprises. Les contrôles sont appliqués par l’API, pas seulement masqués dans l’interface.",
      },
      {
        title: 'Un cycle de ticket lisible',
        text: "Chaque demande reçoit une référence comme NOVA-0128-2026, unique par entreprise et par année. Recherche, filtres, tri, pagination, assignation, quatre priorités et quatre statuts donnent une vue exploitable même quand le volume augmente.",
      },
      {
        title: 'La conversation au même endroit',
        text: "Chaque ticket possède sa discussion Socket.IO. Les participants reçoivent les nouveaux messages en direct et les équipes support sont prévenues lorsqu’un ticket est créé, sans avoir à rafraîchir la page.",
      },
      {
        title: 'Sécurité et traçabilité',
        text: "Session JWT en cookie httpOnly, mots de passe hachés avec bcrypt, validation des entrées, limitation de débit et contrôle d’origine protègent l’API. Les créations, modifications, suppressions et connexions alimentent un journal d’audit réservé à l’administrateur.",
      },
    ],
    gallery: [
      {
        src: ticketingTickets,
        caption: 'La liste des tickets : recherche, filtres, priorités, statuts et pagination dans une même vue.',
      },
      {
        src: ticketingTicketDetail,
        caption: 'Le détail d’une demande : contexte, entreprise, assignation et état accessibles sans changer d’écran.',
      },
      {
        src: ticketingChat,
        caption: 'La discussion liée au ticket, mise à jour en temps réel pour garder le diagnostic au bon endroit.',
      },
    ],
    technologies: [
      'TypeScript 5',
      'React 19',
      'Vite 7',
      'React Router',
      'Tailwind CSS 4',
      'shadcn/ui',
      'TanStack Table',
      'Zustand',
      'React Hook Form / Zod',
      'Node.js 22',
      'Express 5',
      'Socket.IO',
      'MongoDB / Mongoose',
      'JWT / bcrypt',
      'Jest / Supertest',
      'Docker Compose',
      'GitHub Actions',
      'Vercel / Render',
    ],
    links: [
      {
        label: 'Voir l’application',
        url: 'https://ticketing-app-pink.vercel.app/',
        primary: true,
      },
      {
        label: 'Voir le code',
        url: 'https://github.com/Killian-Tirache/ticketing-app',
      },
    ],
    linksNote: 'Application de démonstration — connexion requise. Les captures utilisent des données fictives.',
    featured: true,
  },
];

export const projectCategories = [
  'tous',
  'jeu',
  'webapp',
  'saas',
];
