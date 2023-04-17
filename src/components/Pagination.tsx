import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = (props: Props) => {
  const handlePrevPage = () => {
    if (props.currentPage > 1) {
      props.onPageChange(props.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (props.currentPage < props.totalPages) {
      props.onPageChange(props.currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={props.currentPage === 1}>
        Previous
      </button>
      <span>
        Page {props.currentPage} of {props.totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={props.currentPage === props.totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
