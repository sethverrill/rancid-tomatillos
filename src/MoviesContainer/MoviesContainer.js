import './MoviesContainer.css';
import upvoteIcon from '../icons/upvote.png'
import downvoteIcon from '../icons/downvote.png'

function Movies({ moviePosters, setMovies }) {

  function vote(id, voteChange) {
    const updatedMovie = moviePosters.map((movieData) => {
      if (movieData.id === id) {
        return {...movieData, vote_count: movieData.vote_count + voteChange}
      }
      return movieData
    }) 
    return setMovies(updatedMovie)
  }

  return (
    <section className='MoviesContainer'>
      {moviePosters.map((movie) => (
        <div key={movie.id}>
          <img src={movie.poster_path} alt={`Poster for ${movie.id}`} />
          <section className='VoterBlock'>
            <div onClick={() => vote(movie.id, 1)}>
              <img src={upvoteIcon} alt={'Upvote Button'} />
            </div>
            <p>{movie.vote_count}</p>
            <div onClick={() => vote(movie.id, -1)}>
              <img src={downvoteIcon} alt={'Downvote Button'} />
            </div>
          </section>
        </div>
      ))}
    </section>
  );
}

export default Movies;