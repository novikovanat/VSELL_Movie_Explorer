function SearchBar({ onSearch }) {
  function handleSubmit(event) {
    event.preventDefault();

    let input = event.currentTarget.elements.search.value.trim();
    if (input == "") {
      alert("Please enter search term!");
      return;
    }

    onSearch(input);
    event.currentTarget.reset();
  }

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie by title"
        />
        <button>Search</button>
      </form>
    </header>
  );
}

export default SearchBar;
