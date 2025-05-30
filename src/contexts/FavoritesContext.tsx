import React, { createContext, useState } from 'react';
import type { Movie } from '../types/movie';

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movie: Movie) => void;
  isFavorite: (movie: Movie) => boolean;
  toggleFavorite: (movie: Movie) => void;
}
export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  // Load favorites from localStorage on mount
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const addFavorite = (movie: Movie) => {
    const newFavorites = [...favorites, movie];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const removeFavorite = (movie: Movie) => {
    const newFavorites = favorites.filter(f => f.imdbID !== movie.imdbID);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const isFavorite = (movie: Movie) => {
    return favorites.some(f => f.imdbID === movie.imdbID);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie)) {
      removeFavorite(movie);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite,
      toggleFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}


