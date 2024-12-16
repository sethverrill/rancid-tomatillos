import "./App.css";
// import searchIcon from "../icons/search.png";

// Example imports (for later):
import { useState, useEffect } from "react";
// import moviePostersData from "../data/movie_posters";
// import movieDetails from "../data/movie_details";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import MovieDetails from "../MovieDetails/MovieDetails";
import homeIcon from "../icons/home.png";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [moviePosters, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetch("https://rancid-tomatillos-api.onrender.com/api/v1/movies")
    .then(response => response.json())
    .then(moviePosterData => {
      setMovies(moviePosterData)
    }).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (selectedMovie) {
      setMovieDetails(null);
      fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${selectedMovie.id}`, {
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setMovieDetails(data);
        })
        .catch((error) =>
          console.error("Error fetching movie details:", error)
        );
    }
  }, [selectedMovie]);

  return (
    <main className="App">
      <header>
        <h1>Rancid Tomatillos</h1>
        {selectedMovie && (
          <button
            className="home-button"
            onClick={() => setSelectedMovie(null)}
          >
            <img src={homeIcon} alt={"Home"} />
          </button>
        )}
      </header>
      {selectedMovie && (
        <MovieDetails
          selectedMovie={movieDetails}
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
