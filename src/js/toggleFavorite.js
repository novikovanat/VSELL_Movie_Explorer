export default function toggleFavorite(movie, userFavorites) {
  const updatedUserFavorites = !userFavorites ? [] : [...userFavorites];

  const index = userFavorites.findIndex((item) => item.imdbID === movie.imdbID);

  if (index !== -1) {
    updatedUserFavorites.splice(index, 1);
  } else {
    updatedUserFavorites.push(movie);
  }

  return updatedUserFavorites;
}
