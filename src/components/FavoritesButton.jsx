import { useEffect, useState } from "react";

const FavoritesButton = ({ itemId, type, name, description, thumbnail }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(stored.some((fav) => fav.id === itemId && fav.type === type));
  }, [itemId, type]);

  const toggleFavorite = (event) => {
    if (event) event.preventDefault();

    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    let updated;

    if (isFavorite) {
      updated = stored.filter(
        (fav) => !(fav.id === itemId && fav.type === type)
      );
    } else {
      updated = [...stored, { id: itemId, type, name, description, thumbnail }];
    }

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      type="button"
      aria-pressed={isFavorite}
      className={`favorite-btn ${isFavorite ? "active" : ""}`}
    >
      {isFavorite ? "⭐" : "☆"}
    </button>
  );
};

export default FavoritesButton;
