import MovieCard from "../MovieCard/MovieCard";

export default function MovieList({ moviesArray }) {
  function handleClick(item) {
    console.log("clicked", item);
  }
  const movieList = moviesArray.map((item) => {
    return (
      <li key={item.imdbID} onClick={() => handleClick(item)}>
        <h2>{item.Title}</h2>
        <img src={item.Poster} alt={`poster for ${item.Title}`} />
        <p>{item.Year}</p>
      </li>
    );
  });
  return <ul>{movieList}</ul>;
}
