import type { Movie } from '../types/movie'
import { useFavorites } from '../contexts/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default function MovieList({ movies }: { movies: Movie[] }) {
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {movies.map(movie => (
                <div key={movie.imdbID} className="col">
                    <div className="card h-100 bg-dark text-white shadow-sm">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="card-img-top"
                            style={{ height: '300px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{movie.Title}</h5>
                            <p className="card-text text-muted opacity-75">{movie.Year}</p>
                            <button
                                onClick={() => toggleFavorite(movie)}
                                className="btn btn-link text-danger p-0 position-absolute top-0 end-0 m-3"
                                style={{ zIndex: 1 }}
                            >
                                <FontAwesomeIcon
                                    icon={isFavorite(movie) ? faHeart : faHeartCirclePlus}
                                    className={`fs-4 ${isFavorite(movie) ? 'text-danger' : 'text-white'}`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
