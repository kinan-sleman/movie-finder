import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FavoritesPage from './components/FavoritesPage';
import HomePage from './components/HomePage';

function App() {
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        JSON.parse(savedFavorites);
      } catch (error) {
        console.error('Error parsing saved favorites:', error);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
