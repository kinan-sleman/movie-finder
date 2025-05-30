import { useState } from 'react';
import MovieList from './MovieList';
import SearchBox from './SearchBox';
import EmptyState from './EmptyState';
import { useFavorites } from '../hooks/useFavorites';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFavorites = favorites.filter(movie => 
    movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid movie-app bg-dark h-100" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-md-12">
          <SearchBox 
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            placeholder="Search favorites..."
          />
        </div>
        <h1 className="text-center text-white">Favorite Movies</h1>
        <div className="col-md-12">
          {filteredFavorites.length > 0 ? (
            <MovieList movies={filteredFavorites} />
          ) : (
            <EmptyState message="No favorites found" />
          )}
        </div>
      </div>
    </div>
  );
}
