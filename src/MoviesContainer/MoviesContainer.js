import './MoviesContainer.css';
import upvoteIcon from '../icons/upvote.png'
import downvoteIcon from '../icons/downvote.png'

function Movies({ moviePosters }) {
  console.log('Type of moviePosters:', typeof moviePosters);
  console.log('Is moviePosters an array:', Array.isArray(moviePosters));
  console.log('Content of moviePosters:', moviePosters);
  return (
    <section className='MoviesContainer'>
      {moviePosters.map((movie) => (
        <div key={movie.id}>
          <img src={movie.poster_path} alt={`Poster for ${movie.id}`} />
          <section class='VoterBlock'>
            <img src={upvoteIcon} alt={'Upvote Button'} />
            <p>{movie.vote_count}</p>
            <img src={downvoteIcon} alt={'Downvote Button'} />
          </section>
        </div>
      ))}
    </section>
  );
}

export default Movies;