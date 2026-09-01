import "./About.css";
import { motion } from "framer-motion";
import profileImage from "./../../assets/home-image.webp";
import usePageMeta from "../../hooks/usePageMeta";
import { PAGE_META } from "../../data/pageMeta";

const skillGroups = [
  {
    title: "Front-end",
    summary: "Des interfaces réactives, animées, pensées pour le mobile autant que pour le grand écran.",
    skills: [
      "React 19",
      "TypeScript",
      "JavaScript (ES2023+)",
      "HTML sémantique",
      "CSS moderne (grid, flex, clamp)",
      "React Router",
      "TanStack Query",
      "Zustand",
      "Framer Motion",
      "Vite",
    ],
  },
  {
    title: "Back-end",
    summary: "Des API typées de bout en bout, validées à l’entrée, et un serveur qui garde la main sur les règles du jeu.",
    skills: [
      "Node.js",
      "Fastify",
      "Express",
      "API REST",
      "WebSocket temps réel",
      "Zod",
      "Sessions & Argon2id",
      "GraphQL (côté client)",
    ],
  },
  {
    title: "Données",
    summary: "Modéliser d’abord, migrer proprement ensuite — une donnée absente reste absente, jamais inventée.",
    skills: [
      "PostgreSQL",
      "Drizzle ORM",
      "Migrations SQL",
      "MongoDB",
      "Modélisation relationnelle",
      "Sauvegardes & restauration",
    ],
  },
  {
    title: "Infra & déploiement",
    summary: "De la machine locale au VPS en HTTPS, avec le moins d’étapes manuelles possible.",
    skills: [
      "Docker & Docker Compose",
      "Nginx",
      "Caddy (HTTPS auto)",
      "VPS Linux",
      "GitHub Actions",
      "Git & pull requests",
    ],
  },
  {
    title: "Méthodes & qualité",
    summary: "Ce qui n’est ni testé ni documenté finit toujours par coûter plus cher que le temps gagné.",
    skills: [
      "Vitest",
      "TypeScript strict",
      "ESLint",
      "Monorepo (npm workspaces)",
      "Revue de code",
      "Documentation & audits",
      "PWA & Web Push",
      "Accessibilité & responsive",
    ],
  },
];

export default function About() {
  usePageMeta(PAGE_META.about);

  return (
    <main id="main-content" className="about" tabIndex={-1}>
      <section className="about__intro">
        <motion.div
          className="about__text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1>À propos de moi</h1>
          <p>
            Je m'appelle <span>Killian</span>, je suis{" "}
            <span>développeur web full-stack</span> passionné par la création
            d’expériences interactives, esthétiques et fluides.
          </p>
          <p>
            J’aime concevoir des interfaces modernes où le design et la
            performance se rencontrent pour créer une véritable immersion.
          </p>
        </motion.div>

        <motion.div
          className="about__image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="image-glow">
            <img src={profileImage} alt="Développeur au travail" />
          </div>
        </motion.div>
      </section>

      <section className="about__skills">
        <h2>Compétences</h2>
        <p className="skills__intro">
          Je travaille surtout en <span>TypeScript de bout en bout</span> : le même
          langage du navigateur à la base de données, sur des projets que je conçois,
          développe et déploie moi-même.
        </p>

        <div className="skills__grid">
          {skillGroups.map((group, groupIndex) => (
            <motion.article
              key={group.title}
              className="skill__group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <h3>{group.title}</h3>
              <p className="skill__group-summary">{group.summary}</p>
              <ul className="skill__list">
                {group.skills.map((skill, skillIndex) => (
                  <motion.li
                    key={skill}
                    className="skill__item"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: skillIndex * 0.04 }}
                    viewport={{ once: true }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="about__values">
        <h2>Ma philosophie</h2>
        <p>
          Un projet ne compte vraiment que le jour où quelqu’un peut l’ouvrir.
          C’est pour ça que je vais jusqu’au bout : le modèle de données, l’API,
          l’interface, le serveur et le nom de domaine. <span>Finir et mettre en
          ligne</span> fait partie du travail, pas de la suite.
        </p>
        <p>
          Le reste tient dans une règle que j’applique partout :{" "}
          <span>ne jamais inventer</span>. Une donnée absente s’affiche comme
          absente, une estimation se déclare estimée, une erreur se dit en
          français. Le soin que je mets dans le visuel et l’animation vient{" "}
          <span>après cette honnêteté-là</span>, jamais à sa place.
        </p>
      </section>
    </main>
  );
}
