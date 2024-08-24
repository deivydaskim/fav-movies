interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const buttonStyle =
    'bg-white/10 text-gray-300 hover:bg-white/30 hover:text-white px-4 py-2 rounded-md transition duration-300 ease-in-out disabled:opacity-0';

  if (totalPages > 0)
    return (
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={buttonStyle}
        >
          Previous
        </button>
        <span className="mx-1 px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={buttonStyle}
        >
          Next
        </button>
      </div>
    );
};

export default Pagination;
