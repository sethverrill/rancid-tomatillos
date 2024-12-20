import "./MoviesContainer.css";
import upvoteIcon from "../icons/upvote.png";
import downvoteIcon from "../icons/downvote.png";
import { Link } from "react-router-dom";

function MoviesContainer({ moviePosters = [], setMovies }) {
  function vote(id, voteChange, event) {
    event.stopPropagation()
    const updatedMovie = moviePosters.map((movieData) => {
      if (movieData.id === id) {
        const direction = voteChange > 0 ? "up" : "down"
        let dataToSend = { 
          "id": id,
          "vote_direction": direction
        }
        fetch(`https://rancid-tomatillos-api.onrender.com/api/v1/movies/${id}`, {
          method: "PATCH",
          body: JSON.stringify(dataToSend),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        return { ...movieData, vote_count: movieData.vote_count + voteChange };
      }
      return movieData;
    });
    return setMovies(updatedMovie);
  }

  return (
    <section className="MoviesContainer">
      {moviePosters.map((movie) => (
        <div
          key={movie.id}
          className="movie-card"
        >
          <Link to={`/movie/${movie.id}`}>
            <img src={movie.poster_path} alt={`Poster for ${movie.id}`} />
          </Link>
          <section className="VoterBlock">
            <div onClick={(event) => vote(movie.id, 1, event)}>
              <img src={upvoteIcon} alt={"Upvote Button"} />
            </div>
            <p>{movie.vote_count}</p>
            <div onClick={(event) => vote(movie.id, -1, event)}>
              <img src={downvoteIcon} alt={"Downvote Button"} />
            </div>
          </section>
        </div>
      ))}
    </section>
  );
}

export default MoviesContainer;
