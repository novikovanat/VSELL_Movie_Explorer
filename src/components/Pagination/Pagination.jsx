const Pagination = (props) => {
  const { setPage, totalCount, currentPage } = props;

  const totalPages = Math.ceil(totalCount / 10);
  if (currentPage === 0 || currentPage > totalPages) {
    return null;
  }

  const onNext = () => setPage(currentPage + 1);

  const onPrevious = () => setPage(currentPage - 1);

  return (
    <div>
      <div>
        {1 < currentPage && (
          <button type="button" onClick={onPrevious}>
            Previous
          </button>
        )}
      </div>
      <div>
        <p>
          <span>{currentPage}</span>/<span>{totalPages}</span>
        </p>
      </div>
      <div>
        {totalCount > currentPage && (
          <button as="button" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
