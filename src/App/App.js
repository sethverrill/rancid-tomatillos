import "./App.css";
// import searchIcon from "../icons/search.png";
import { useState, useEffect } from "react";
import MoviesContainer from "../MoviesContainer/MoviesContainer";
import MovieDetails from "../MovieDetails/MovieDetails";
import homeIcon from "../icons/home.png";
import { Link, Route, Routes, useMatch } from "react-router-dom";

function App() {
  const [moviePosters, setMovies] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const MoviePath = useMatch("/movie/:id");
  const homePath = useMatch("/")

  useEffect(() => {
    fetch("https://rancid-tomatillos-api.onrender.com/api/v1/movies")
    .then(response => response.json())
    .then(moviePosterData => {
      setMovies(moviePosterData)
      setFilteredMovies(moviePosterData.movies)
    }).catch(error => console.log(error))
  }, [])

  useEffect(() => {
    const results = moviePosters.filter((movie) =>
      movie.title.toLowerCase().includes(titleFilter.toLowerCase())
    );
    setFilteredMovies(results);
  }, [titleFilter, moviePosters]);

  return (
    <main className="App">
      <header>
        <h1>Rancid Tomatillos</h1>
        {homePath && (
          <div className="search-bar">
            <input 
            aria-label="Title Search Bar"
            type='text'
            value={titleFilter}
            onChange={(event) => {
              setTitleFilter(event.target.value)}}
            placeholder={`Search`} />
          </div>
        )}
        {MoviePath && (
          <Link to='/'>
            <img src={homeIcon} alt={"Home"} />
          </Link>
        )}
      </header>
      <Routes>
        <Route path="/" element={<MoviesContainer moviePosters={filteredMovies} setMovies={setMovies}/>}/>
        <Route path="/movie/:id" element={<MovieDetails />}/>
      </Routes>
    </main>
  );
}

export default App;
