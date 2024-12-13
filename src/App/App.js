import "./App.css";
import searchIcon from "../icons/search.png";

// Example imports (for later):
import { useState, useEffect } from "react";
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MovieDetails from "../MovieDetails/MovieDetails";

function App() {
  const [selectedMovie, setMovies] = useState(null);
  const movies = moviePosters.map((poster) => {
    const detail = movieDetails.id === poster.id ? movieDetails : {}
    return { ...poster, ...detail }
  })

  return (
    <main className="App">
      <header>
        <h1>rancid tomatillos</h1>
      </header>
      {selectedMovie && (
        <MovieDetails
          selectedMovie={selectedMovie}
          setMovies={setMovies}
        />
      )}
      {!selectedMovie && <MoviesContainer movies={movies} setMovies={setMovies} />}
    </main>
  );
}

export default App;
