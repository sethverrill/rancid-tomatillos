import "./MovieDetails.css";

function MovieDetails({ selectedMovie, setSelectedMovie }) {
  if (!selectedMovie) {
    return <p>Loading movie details...</p>;
  }

  return (
    <section className="MovieDetails">
      <figure className="MovieDetails-image">
        <img
          src={selectedMovie.backdrop_path}
          alt={`Backdrop for ${selectedMovie.title} `}
          className="movie-image"
        />
      </figure>
      <section className="MovieDetails-content">
        <h2 className="movie-title">{selectedMovie.title}</h2>
        {selectedMovie.genre_ids && (
          <div className="genres">
            {selectedMovie.genre_ids.map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
        )}
        <p className="overview">{selectedMovie.overview}</p>
      </section>
    </section>
  );
}

export default MovieDetails;
