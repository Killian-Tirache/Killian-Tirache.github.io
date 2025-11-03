import './NotFound.css';
import NotFoundImage from '../../assets/not-found-image.webp';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
      <div className="not-found">
        <h3>Tu t'es perdu ?</h3>
        <Link to={'/'}>
            <img src={NotFoundImage} alt="Error 404" />
        </Link>
      </div>
    );
}