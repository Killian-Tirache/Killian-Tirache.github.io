import "./Project.css";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IProject, projectsData } from "../Projects/Projects";

export default function Project() {
  const { id } = useParams<{ id?: string }>();
  const projects = projectsData as IProject[];
  const projectId = id ? Number(id) : NaN;

  const project = projects.find((p) => p.id === projectId);

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
      <div className="project__header">
        <motion.img
          src={project.image}
          alt={project.title}
          className="project__image"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
        <div className="project__title-block">
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      </div>

      <div className="project__technologies">
        <h2>Technologies utilisées</h2>
        <ul>
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className="project__link">
        <Link to={project.link}>
          Voir le projet en ligne
        </Link>
      </div>

      <Link to="/projects" className="project__back">
        ← Retour aux projets
      </Link>
    </motion.main>
  );
}