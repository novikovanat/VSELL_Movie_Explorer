export default function MovieList({ moviesArray }) {
  const movieList = moviesArray.map(({ Title, imdbID }) => {
    return (
      <li key={imdbID}>
        <div>{Title}</div>
      </li>
    );
  });
  return <ul>{movieList}</ul>;
}
