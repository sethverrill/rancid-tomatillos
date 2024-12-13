import "./App.css";
import searchIcon from "../icons/search.png";

// Example imports (for later):
import { useState, useEffect } from "react";
import moviePostersData from '../data/movie_posters';
import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from "../MovieDetails/MovieDetails";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [moviePosters, setMovies] = useState(moviePostersData)

  return (
    <main className="App">
      <header>
        <h1>Rancid Tomatillos</h1>
      </header>
      {selectedMovie && (
        <MovieDetails
          selectedMovie={selectedMovie}
          setMovies={setMovies}
        />
      )}
      {!selectedMovie && <MoviesContainer moviePosters={moviePosters} setMovies={setMovies} />}
    </main>
  );
}

export default App;
