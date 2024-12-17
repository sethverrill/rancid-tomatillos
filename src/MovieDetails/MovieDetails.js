import { useEffect, useState } from "react";
import "./MovieDetails.css";
import { useParams } from "react-router-dom";


function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);

  const movieId = useParams().id
  useEffect(() => {
    fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${movieId}`, {
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data)
      })
      .catch((error) =>
        console.error("Error fetching movie details:", error)
      );
  }, [movieId])
  
  if (!movieDetails) {
    return <p>Loading movie details...</p>;
  }

  return (
    <section className="MovieDetails">
      <figure className="MovieDetails-image">
        <img
          src={movieDetails.backdrop_path}
          alt={`Backdrop for ${movieDetails.title} `}
          className="movie-image"
        />
      </figure>
      <section className="MovieDetails-content">
        <h2 className="movie-title">{movieDetails.title}</h2>
        {movieDetails.genre_ids && (
          <div className="genres">
            {movieDetails.genre_ids.map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
        )}
        <p className="overview">{movieDetails.overview}</p>
      </section>
    </section>
  );
}

export default MovieDetails;
