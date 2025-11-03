import './Projects.css';
import { useState } from 'react';
import showcaseSiteImage from './../../assets/home-projects-images/showcase-site-image.jpeg';
import eCommerceImage from './../../assets/home-projects-images/e-commerce-site-image.jpeg';
import saasImage from './../../assets/home-projects-images/saas-site-image.jpeg';
import eLearningImage from './../../assets/home-projects-images/e-learning-site-image.jpeg';
import crmImage from './../../assets/home-projects-images/crm-site-image.jpeg';
import appMobileImage from './../../assets/home-projects-images/app-mobile-site-image.jpeg';
import { Link } from 'react-router-dom';
import FadeInWhenVisible from '../../components/FadeinWhenVisible/FadeInWhenVisible';

export interface IProject {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  technologies: string[];
  link: string;
}

export const projectsData = [
  { id: 1, title: 'Projet A', image: showcaseSiteImage, category: 'vitrine', description: "Un site vitrine moderne et responsive conçu pour présenter l'identité d'une entreprise avec élégance.", technologies: ["React", "CSS", "Framer Motion"], link: '#' },
  { id: 2, title: 'Projet B', image: eCommerceImage, category: 'ecommerce', description: "Une plateforme e-commerce complète avec panier, paiement sécurisé et gestion de produits.", technologies: ["React", "Node.js", "MongoDB"], link: '#' },
  { id: 3, title: 'Projet C', image: saasImage, category: 'saas', description: "Une application SaaS performante avec gestion des utilisateurs, authentification et dashboard en temps réel.", technologies: ["React", "Express", "PostgreSQL"], link: '#' },
  { id: 4, title: 'Projet D', image: eLearningImage, category: 'elearning', description: "Une plateforme d’apprentissage en ligne interactive permettant aux utilisateurs de suivre des cours, de visualiser leur progression et d’obtenir des certificats.", technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Framer Motion"], link: '#' },
  { id: 5, title: 'Projet E', image: crmImage, category: 'crm', description: "Outil de gestion client sur mesure avec interface claire, filtres dynamiques et export de données.", technologies: ["React", "NestJS", "MongoDB"], link: '#' },
  { id: 6, title: 'Projet F', image: appMobileImage, category: 'mobile', description: "Une application mobile hybride développée pour permettre aux utilisateurs de gérer leurs tâches et leurs projets en déplacement. Synchronisation en temps réel, notifications push et design minimaliste.", technologies: ["React Native", "Expo", "Firebase", "TypeScript"], link: '#' },
  { id: 7, title: 'Projet G', image: showcaseSiteImage, category: 'vitrine', description: "Un site vitrine moderne et responsive conçu pour présenter l'identité d'une entreprise avec élégance.", technologies: ["React", "CSS", "Framer Motion"], link: '#' },
  { id: 8, title: 'Projet H', image: eCommerceImage, category: 'ecommerce', description: "Une plateforme e-commerce complète avec panier, paiement sécurisé et gestion de produits.", technologies: ["React", "Node.js", "MongoDB"], link: '#' },
  { id: 9, title: 'Projet J', image: saasImage, category: 'saas', description: "Une application SaaS performante avec gestion des utilisateurs, authentification et dashboard en temps réel.", technologies: ["React", "Express", "PostgreSQL"], link: '#' },
  { id: 10, title: 'Projet K', image: saasImage, category: 'saas', description: "Une application SaaS performante avec gestion des utilisateurs, authentification et dashboard en temps réel.", technologies: ["React", "Express", "PostgreSQL"], link: '#' },
];

const categories = ['tous', 'vitrine', 'ecommerce', 'saas', 'elearning', 'crm', 'mobile'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('tous');

  const filteredProjects = activeCategory === 'tous'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <main className="projects">
      <h1 className="projects__title">Mes projets</h1>
      <div className="projects__filters">
        {categories.map(cat => (
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
            key={project.title}
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
              </div>
            </Link>
          </FadeInWhenVisible>
        ))}
      </div>
    </main>
  );
}