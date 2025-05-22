import { useState, useEffect } from "react";
import useCashedFetch from "../../hooks/useCachedFetch";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import Favorites from "../../components/Favorites/Favorites";
import Pagination from "../../components/Pagination/Pagination";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { response, loading, error } = useCashedFetch(query, page);
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

  useEffect(() => {
    window.localStorage.setItem("favorites", JSON.stringify(userFavorites));
  }, [userFavorites]);

  return (
    <div>
      <SearchBar value={query} onSearch={setQuery} onPage={setPage} />
      {loading && <Loader />}
      {error !== "" && <ErrorMessage errorText={error} />}
      {0 < response.totalResults && (
        <MovieList moviesArray={response.Search} onClick={setUserFavorites} />
      )}
      {response.totalResults > 10 && (
        <Pagination
          setPage={setPage}
          totalCount={response.totalResults}
          currentPage={page}
        />
      )}
      {0 < userFavorites.length && (
        <Favorites favorites={userFavorites} onClick={setUserFavorites} />
      )}
    </div>
  );
}
