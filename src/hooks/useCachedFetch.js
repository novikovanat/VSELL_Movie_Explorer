import { useEffect, useState } from "react";
import fetchMovies from "../js/fetchMovies";

const useCashedFetch = (query, page) => {
  const [response, setResponse] = useState({
    Search: [],
    totalResults: 0,
    Response: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
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
  return { response, loading, error };
};

export default useCashedFetch;
