import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchMovies from "../../js/fetchMovies";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Favorites from "../../components/Favorites/Favorites";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [userFavorites, setUserFavorites] = useState(() => {
    const favorites = window.localStorage.getItem("favorites");

    if (favorites !== null) {
      try {
        return JSON.parse(favorites);
      } catch (error) {
        console.log("Error parsing favorites from localStorage", error);
        return;
      }
    } else return [];
  });
  const [response, setResponse] = useState({
    Search: [],
    totalResults: 0,
    Response: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(userFavorites));
  }, [userFavorites]);

  useEffect(() => {
    if (query === "") {
      return;
    }

    search(query, page);
  }, [query, page, userFavorites]);

  const search = async (query, page) => {
    try {
      setLoading(true);
      setError("");
      const apiResponse = await fetchMovies(query, page);

      if (apiResponse.Response == "False") {
        setError(apiResponse.Error);
        return;
      }
      setResponse(apiResponse);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar value={query} onSearch={setQuery} onPage={setPage} />
      {loading && <Loader />}
      {error !== "" && <ErrorMessage errorText={error} />}
      {0 < response.totalResults && (
        <MovieList moviesArray={response.Search} onClick={setUserFavorites} />
      )}
      {0 < userFavorites.length && (
        <Favorites favorites={userFavorites} onClick={setUserFavorites} />
      )}
    </div>
  );
}
