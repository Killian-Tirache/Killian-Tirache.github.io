import './Projects.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FadeInWhenVisible from '../../components/FadeinWhenVisible/FadeInWhenVisible';
import { projectCategories, projectsData } from '../../data/projects';
import usePageMeta from '../../hooks/usePageMeta';
import { PAGE_META } from '../../data/pageMeta';

export default function Projects() {
  usePageMeta(PAGE_META.projects);

  const [activeCategory, setActiveCategory] = useState('tous');

  const filteredProjects = activeCategory === 'tous'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <main id="main-content" className="projects" tabIndex={-1}>
      <h1 className="projects__title">Mes projets</h1>
      <div className="projects__filters" role="group" aria-label="Filtrer les projets">
        {projectCategories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`projects__filter-btn ${activeCategory === cat ? 'active' : ''}`}
            aria-pressed={activeCategory === cat}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''} affiché{filteredProjects.length > 1 ? 's' : ''}
      </p>
      <div className="projects__grid">
        {filteredProjects.map((project, index) => (
          <FadeInWhenVisible
            key={project.id}
            className="projects__item"
            transition={{ delay: index * 0.1 }}
          >
            <Link
                to={`/projects/${project.id}/`}
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
