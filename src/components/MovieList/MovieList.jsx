export default function MovieList({ moviesArray }) {
  const movieList = moviesArray.map(({ Title, imdbID, Poster, Year, Type }) => {
    return (
      <li key={imdbID}>
        <img src={Poster} alt={`poster${Title}`} />
        <h2>{Title}</h2>
        <p>year: {Year} </p>
        <p>{Type}</p>
      </li>
    );
  });
  return <ul>{movieList}</ul>;
}
