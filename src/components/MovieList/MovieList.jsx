import toggleFavorite from "../../js/toggleFavorite";
import MovieCard from "../MovieCard/MovieCard";

export default function MovieList({ moviesArray, onClick }) {
  function handleClick(event) {
    const currentMovie = moviesArray[event.currentTarget.value];
    onClick((allMovies) => {
      const newList = toggleFavorite(currentMovie, allMovies);
      return newList;
    });
  }

  const movieList = moviesArray.map((item, index) => {
    return (
      <li key={item.imdbID} onClick={handleClick} value={index}>
        <h2>{item.Title}</h2>
        <img src={item.Poster} alt={`poster for ${item.Title}`} />
        <p>{item.Year}</p>
      </li>
    );
  });
  return <ul>{movieList}</ul>;
}
