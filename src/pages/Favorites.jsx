import { useState, useEffect } from "react";
import FavoritesButton from "../components/FavoritesButton";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      const parsed = stored ? JSON.parse(stored) : [];
      setFavorites(Array.isArray(parsed) ? parsed : []);
    } catch (err) {
      console.error("Erreur de parsing des favoris :", err);
      localStorage.removeItem("favorites");
      setFavorites([]);
    }
  }, []);

  const handleRemoveFavorite = (id) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  return (
    <main className="description-container">
      <div className="favorites-container">
        <h1>Vos Favoris</h1>

        {favorites.length === 0 ? (
          <p className="hero-text">Aucun favori enregistré.</p>
        ) : (
          <div className="characters-grid">
            {favorites.map((fav) => (
              <article key={fav.id} className="character-card">
                <div className="card-top">
                  {fav.thumbnail?.path ? (
                    <img
                      src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                      alt={fav.name || fav.title}
                    />
                  ) : (
                    <p>Pas d’image disponible</p>
                  )}
                  <h3>{fav.name || fav.title}</h3>
                  <p>{fav.description || "Pas de description disponible."}</p>
                </div>

                <div className="card-bottom">
                  <button
                    className="hero-button-remove"
                    onClick={() => handleRemoveFavorite(fav.id)}
                  >
                    🗑 Supprimer
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
