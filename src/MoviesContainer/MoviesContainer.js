import './MoviesContainer.css';


function Movies({ moviePosters }) {
  console.log('Type of moviePosters:', typeof moviePosters);
  console.log('Is moviePosters an array:', Array.isArray(moviePosters));
  console.log('Content of moviePosters:', moviePosters);
  return (
    <section className='MoviesContainer'>
      {moviePosters.map((movie) => (
        <div key={movie.id}>
          <img src={movie.poster_path} alt={`Poster for ${movie.id}`} />
          <p>{movie.vote_count}</p>
        </div>
      ))}
    </section>
  );
}

export default Movies;