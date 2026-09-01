import './NotFound.css';
import NotFoundImage from '../../assets/not-found-image.webp';
import { Link } from 'react-router-dom';
import usePageMeta from '../../hooks/usePageMeta';
import { NOT_FOUND_META } from '../../data/pageMeta';

export default function NotFound() {
    usePageMeta(NOT_FOUND_META);

    return (
      <main id="main-content" className="not-found" tabIndex={-1}>
        <p className="not-found__code">404</p>
        <h1>Tu t'es perdu ?</h1>
        <p className="not-found__text">
          Cette page n'existe pas, ou n'existe plus. Ça arrive.
        </p>

        <div className="not-found__image">
            <img src={NotFoundImage} alt="" />
        </div>

        <div className="not-found__actions">
          <Link to="/" className="not-found__link primary">Retour à l'accueil</Link>
          <Link to="/projects/" className="not-found__link">Voir mes projets</Link>
        </div>
      </main>
    );
}
