import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import FavoritesButton from "../components/FavoritesButton";

const Characters = () => {
  const [data, setData] = useState({ results: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const limit = 100;
  const API_URL = "https://site--marvel-backend--zn4bx7lhq62j.code.run";

  // Debounce pour limiter les appels API
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${API_URL}/characters?name=${debouncedSearch}&skip=${
            page * limit
          }&limit=${limit}`
        );
        setData(response.data);
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setError("Impossible de récupérer les personnages.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearch, page]);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="characters-container">
      <div className="description-container">
        <h2>Explorez les Personnages Marvel</h2>
        <p>
          Recherchez vos héros préférés et découvrez leurs histoires
          légendaires.
        </p>
      </div>

      <input
        autoFocus
        type="text"
        placeholder="Recherchez un personnage"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="characters-grid">
        {data.results
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((character) => (
            <div key={character._id} className="character-card">
              <FavoritesButton
                itemId={character._id}
                type="character"
                name={character.name}
                description={character.description}
                thumbnail={character.thumbnail}
              />
              <Link
                to={`/comics/${character._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={
                    character.thumbnail
                      ? `${character.thumbnail.path}.${character.thumbnail.extension}`
                      : "/placeholder-image.png"
                  }
                  alt={character.name || "Personnage Marvel"}
                  loading="lazy"
                />
                <h2>{character.name}</h2>
                <p>{character.description || "Description indisponible"}</p>
              </Link>
            </div>
          ))}
      </div>

      <div className="pagination">
        {page > 0 && (
          <button onClick={() => setPage(page - 1)}>← Précédent</button>
        )}
        {data.results.length === limit && (
          <button onClick={() => setPage(page + 1)}>Suivant →</button>
        )}
      </div>
    </main>
  );
};

export default Characters;
