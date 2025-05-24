import { useEffect, useRef, useState } from "react";
import fetchMovies from "../js/fetchMovies";

const useCashedFetch = (query, page) => {
  const cashe = useRef({});
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

  const search = async (query, page = 1) => {
    try {
      setLoading(true);
      setError("");
      console.log(page);
      console.log(cashe.current[query + page]);

      if (cashe.current[query + page]) {
        setResponse(cashe.current[query + page].apiResponse);
        return;
      }
      const apiResponse = await fetchMovies(query, page);
      if (apiResponse.Response === "False") {
        setError(apiResponse.Error);
        return;
      }
      cashe.current[query + page] = { apiResponse, page };
      console.log("fetching from API");
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
