import React from 'react';
import { FaSearch } from 'react-icons/fa'; 

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative w-1/3">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="border rounded p-2 pl-10 pr-4 h-12 w-full"
      />
      <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default SearchBar;
