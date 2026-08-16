import './NotFound.css';
import NotFoundImage from '../../assets/not-found-image.webp';
import { Link } from 'react-router-dom';
import usePageMeta from '../../hooks/usePageMeta';

export default function NotFound() {
    usePageMeta({
        title: 'Page introuvable',
        description: "Cette page n'existe pas ou plus. Retour à l'accueil ou vers les projets.",
    });

    return (
      <main className="not-found">
        <p className="not-found__code">404</p>
        <h1>Tu t'es perdu ?</h1>
        <p className="not-found__text">
          Cette page n'existe pas, ou n'existe plus. Ça arrive.
        </p>

        <Link to={'/'} className="not-found__image">
            <img src={NotFoundImage} alt="" />
        </Link>

        <div className="not-found__actions">
          <Link to="/" className="not-found__link primary">Retour à l'accueil</Link>
          <Link to="/projects" className="not-found__link">Voir mes projets</Link>
        </div>
      </main>
    );
}
