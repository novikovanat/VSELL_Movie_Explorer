import axios from "axios";

axios.defaults.baseURL = "http://www.omdbapi.com/?apikey=c2b35b46&";

export default async function fetchMovies(searchTerm, page) {
  const result = await axios.get("/", {
    headers: {
      accept: "application/json",
    },
    params: {
      s: searchTerm,
      page: page,
    },
  });
  return result.data;
}
