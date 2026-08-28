import './Projects.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FadeInWhenVisible from '../../components/FadeinWhenVisible/FadeInWhenVisible';
import { projectCategories, projectsData } from '../../data/projects';
import usePageMeta from '../../hooks/usePageMeta';

export default function Projects() {
  usePageMeta({
    title: 'Mes projets',
    description:
      "Les projets que j'ai conçus et développés : jeu web temps réel, applications full-stack TypeScript et outil de support multi-entreprises.",
  });

  const [activeCategory, setActiveCategory] = useState('tous');

  const filteredProjects = activeCategory === 'tous'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <main className="projects">
      <h1 className="projects__title">Mes projets</h1>
      <div className="projects__filters">
        {projectCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`projects__filter-btn ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <div className="projects__grid">
        {filteredProjects.map((project, index) => (
          <FadeInWhenVisible
            key={project.id}
            className="projects__item"
            transition={{ delay: index * 0.1 }}
          >
            <Link
                to={`/projects/${project.id}`}
                className="projects__link"
                style={{ backgroundImage: `url(${project.image})` }}
            >
              <div className="projects__overlay">
                <h2>{project.title}</h2>
                <p>{project.tagline}</p>
              </div>
            </Link>
          </FadeInWhenVisible>
        ))}
      </div>
    </main>
  );
}
