import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-between items-center mt-4">
     
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="flex items-center text-black disabled:opacity-50 hover:shadow-lg transition-shadow duration-200 bg-opacity-70 bg-white rounded px-4 py-2"
      >
        <span className="material-icons">arrow_back</span> 
        Previous
      </button>

      
      <div className="flex space-x-1">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`border rounded px-3 py-1 transition-all duration-200 ${
              currentPage === index + 1
                ? 'border-black bg-white bg-opacity-70 text-black shadow-lg'
                : 'text-black bg-white bg-opacity-50 hover:bg-opacity-70'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

     
      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="flex items-center text-black disabled:opacity-50 hover:shadow-lg transition-shadow duration-200 bg-opacity-70 bg-white rounded px-4 py-2"
      >
        Next
        <span className="material-icons">arrow_forward</span> 
      </button>
    </div>
  );
};

export default Pagination;
