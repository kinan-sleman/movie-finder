import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faHeart } from '@fortawesome/free-solid-svg-icons';

interface SearchBoxProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  placeholder?: string;
}

export default function SearchBox({ searchTerm, onSearch }: SearchBoxProps) {
  const { favorites } = useFavorites();

  return (
    <div className="container-fluid px-3">
      <div className="d-flex flex-column flex-lg-row align-items-center my-4 gap-3">
        {/* First row on mobile (logo and favorites) */}
        <div className="d-flex justify-content-between align-items-center mb-3 mb-lg-0 w-100">
          {/* Logo */}
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faFilm} className="text-danger me-2" size="2x" />
              <span className="text-white fw-bold fs-4">Movie</span>
              <span className="text-danger fw-bold fs-4">Finder</span>
            </div>
          </Link>

          {/* Favorites Button */}
          <Link
            to="/favorites"
            className="btn btn-outline-danger position-relative"
            style={{
              borderRadius: '25px',
              padding: '8px 15px'
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger" style={{
              transform: 'translate(-50%, -50%)',
              fontSize: '12px',
              padding: '2px 6px'
            }}>
              {favorites.length}
            </span>
          </Link>
        </div>

        {/* Second row on mobile (search input) */}
        <div className="w-100 mt-3 mt-lg-0">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-dark text-white border-1"
              placeholder="Search movies..."
              aria-label="Search movies"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              style={{
                color: '#fff',
                backgroundColor: '#1a1a1a',
                borderRadius: '25px',
                padding: '10px 25px',
                fontSize: '16px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
