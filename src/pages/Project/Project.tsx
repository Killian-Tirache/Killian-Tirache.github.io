import "./Project.css";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectsData } from "../../data/projects";
import FadeInWhenVisible from "../../components/FadeinWhenVisible/FadeInWhenVisible";
import usePageMeta from "../../hooks/usePageMeta";

export default function Project() {
  const { id } = useParams<{ id?: string }>();
  const projectId = id ? Number(id) : NaN;

  const project = projectsData.find((p) => p.id === projectId);

  usePageMeta({
    title: project ? project.title : "Projet introuvable",
    description: project ? project.tagline : undefined,
  });

  if (!project) {
    return (
      <div className="project__not-found">
        <h2>Projet introuvable</h2>
        <Link to="/projects" className="project__back">
          ← Retour aux projets
        </Link>
      </div>
    );
  }

  return (
    <motion.main
      className="project"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Link to="/projects" className="project__back project__back--top">
        ← Retour aux projets
      </Link>

      <header className="project__intro">
        <motion.div
          className="project__title-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="project__category">{project.category}</span>
          <h1>{project.title}</h1>
          <p className="project__tagline">{project.tagline}</p>

          {(project.year || project.role || project.status) && (
            <dl className="project__meta">
              {project.year && (
                <div>
                  <dt>Période</dt>
                  <dd>{project.year}</dd>
                </div>
              )}
              {project.role && (
                <div>
                  <dt>Rôle</dt>
                  <dd>{project.role}</dd>
                </div>
              )}
              {project.status && (
                <div>
                  <dt>Statut</dt>
                  <dd>{project.status}</dd>
                </div>
              )}
            </dl>
          )}

          {project.links && project.links.length > 0 && (
            <div className="project__links">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`project__link-btn ${link.primary ? "primary" : ""}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
          {project.linksNote && <p className="project__links-note">{project.linksNote}</p>}
        </motion.div>

        <motion.img
          src={project.image}
          alt={`Aperçu du projet ${project.title}`}
          className="project__image"
          loading="lazy"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
      </header>

      <FadeInWhenVisible className="project__section project__about">
        <h2>Le projet</h2>
        <p className="project__description">{project.description}</p>
        {project.context?.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </FadeInWhenVisible>

      {project.stats && (
        <FadeInWhenVisible className="project__section">
          <ul className="project__stats">
            {project.stats.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </FadeInWhenVisible>
      )}

      {project.highlights && (
        <FadeInWhenVisible className="project__section">
          <h2>Ce qu’il y a sous le capot</h2>
          <div className="project__highlights">
            {project.highlights.map((highlight, index) => (
              <FadeInWhenVisible
                key={highlight.title}
                className="project__highlight"
                transition={{ delay: index * 0.1 }}
              >
                <h3>{highlight.title}</h3>
                <p>{highlight.text}</p>
              </FadeInWhenVisible>
            ))}
          </div>
        </FadeInWhenVisible>
      )}

      {project.gallery && (
        <FadeInWhenVisible className="project__section">
          <h2>En images</h2>
          <div className="project__gallery">
            {project.gallery.map((shot, index) => (
              <FadeInWhenVisible
                key={shot.src}
                className={`project__shot ${shot.portrait ? "portrait" : ""}`}
                transition={{ delay: index * 0.1 }}
              >
                <img src={shot.src} alt={shot.caption} loading="lazy" />
                <p className="project__shot-caption">{shot.caption}</p>
              </FadeInWhenVisible>
            ))}
          </div>
        </FadeInWhenVisible>
      )}

      <FadeInWhenVisible className="project__section project__technologies">
        <h2>Technologies utilisées</h2>
        <ul>
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </FadeInWhenVisible>

      <Link to="/projects" className="project__back">
        ← Retour aux projets
      </Link>
    </motion.main>
  );
}
