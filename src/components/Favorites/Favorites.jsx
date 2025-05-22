import MovieList from "../MovieList/MovieList";

export default function Favorites({ favorites, onClick }) {
  return (
    <div>
      <h1>Favorites</h1>
      <p>Here are your favorite movies:</p>
      <MovieList moviesArray={favorites} onClick={onClick} />
    </div>
  );
}
