import "./App.css";
// import searchIcon from "../icons/search.png";

// Example imports (for later):
import { useState, useEffect } from "react";
// import moviePostersData from "../data/movie_posters";
import movieDetails from "../data/movie_details";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import MovieDetails from "../MovieDetails/MovieDetails";
import homeIcon from "../icons/home.png";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [moviePosters, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://rancid-tomatillos-api.onrender.com/api/v1/movies")
    .then(response => response.json())
    .then(moviePosterData => {
      setMovies(moviePosterData)
    }).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (selectedMovie) {
      setSelectedMovieDetails(movieDetails);
    } else {
      setSelectedMovieDetails(null);
    }
  }, [selectedMovie]);

  return (
    <main className="App">
      <header>
        <h1>Rancid Tomatillos</h1>
        {selectedMovieDetails && (
          <button
            className="home-button"
            onClick={() => setSelectedMovie(null)}
          >
            <img src={homeIcon} alt={"Home"} />
          </button>
        )}
      </header>
      {selectedMovieDetails && (
        <MovieDetails
          selectedMovie={selectedMovieDetails}
          setSelectedMovie={setSelectedMovie}
        />
      )}
      {!selectedMovie && (
        <MoviesContainer
          moviePosters={moviePosters}
          setMovies={setMovies}
          setSelectedMovie={setSelectedMovie}
        />
      )}
    </main>
  );
}

export default App;


