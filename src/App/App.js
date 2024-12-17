import "./App.css";
// import searchIcon from "../icons/search.png";
import { useState, useEffect } from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import MovieDetails from "../MovieDetails/MovieDetails";
import homeIcon from "../icons/home.png";
import { Link, Route, Routes, useMatch } from "react-router-dom";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [moviePosters, setMovies] = useState([]);
  const match = useMatch("/movie/:id");

  useEffect(() => {
    fetch("https://rancid-tomatillos-api.onrender.com/api/v1/movies")
    .then(response => response.json())
    .then(moviePosterData => {
      setMovies(moviePosterData)
    }).catch(error => console.log(error))
  }, [])

  return (
    <main className="App">
      <header>
        <h1>Rancid Tomatillos</h1>
        {match && (
          <Link to='/'>
            <img src={homeIcon} alt={"Home"} />
          </Link>
        )}
      </header>
      <Routes>
        <Route path="/" element={<MoviesContainer moviePosters={moviePosters} setMovies={setMovies} setSelectedMovie={setSelectedMovie}/>}/>
        <Route path="/movie/:id" element={<MovieDetails />}/>
      </Routes>
    </main>
  );
}

export default App;
