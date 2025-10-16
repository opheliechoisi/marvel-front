import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const CharacterComics = () => {
  const { characterId } = useParams();
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "https://site--marvel-backend--zn4bx7lhq62j.code.run";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/comics/${characterId}`);
        setComics(response.data.comics || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [characterId]);

  return (
    <div className="comics-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      {isLoading ? (
        <p>Chargement des comics...</p>
      ) : error ? (
        <p>Erreur : {error}</p>
      ) : comics.length > 0 ? (
        <div className="comics-grid">
          {comics.map((comic) => (
            <article
              className="comic-card"
              key={comic._id || comic.id || comic.title}
            >
              <h3>{comic.title}</h3>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <p>{comic.description || "Pas de description disponible."}</p>
            </article>
          ))}
        </div>
      ) : (
        <p>Aucun comics trouvé pour ce personnage.</p>
      )}
    </div>
  );
};

export default CharacterComics;
