import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import fetchMovies from "../../js/fetchMovies";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [response, setResponse] = useState({
    Search: [],
    totalResults: 0,
    Response: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    query ?? "";
    if (query === "") {
      return;
    }
    search(query, page);
  }, [query, page]);

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
      {loading === true && <Loader />}
      {error !== "" && <ErrorMessage errorText={error} />}
      {0 < response.totalResults && <MovieList moviesArray={response.Search} />}
    </div>
  );
}
