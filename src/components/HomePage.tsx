import { useState, useEffect } from 'react';
import SearchBox from './SearchBox';
import MovieList from './MovieList';
import EmptyState from './EmptyState';
import { useFavorites } from '../hooks/useFavorites';

export default function HomePage() {
  const { favorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=3b3a17f&s=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        searchMovies(searchTerm);
      } else {
        // Fetch popular movies when input is empty
        searchMovies('popular');
      }
    }, 500); // ⏱ 500ms تأخير

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="container-fluid movie-app bg-dark h-100" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-md-12">
          <SearchBox
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            placeholder="Search movies..."
          />
        </div>
        <div className="col-md-12">
          <h1 className="text-center text-white mb-4">Welcome to MovieFinder</h1>
          <div className="text-center text-white mb-4">
            <p className="lead">Discover your favorite movies</p>
            <p>Start searching or explore our collection</p>
          </div>

          {favorites.length > 0 && (
            <div className="text-center mb-4">
              <p className="text-white">
                You have {favorites.length} favorite {favorites.length === 1 ? 'movie' : 'movies'}
              </p>
            </div>
          )}

          <div className="row">
            <div className="col-12">
              <h2 className="text-white mb-4">
                {searchTerm.trim() ? `Results for "${searchTerm}"` : 'Popular Movies'}
              </h2>
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : movies.length > 0 ? (
                <MovieList movies={movies} />
              ) : (
                <EmptyState message="No movies found" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
