import React from 'react';

const SortDropdown = ({ onSort }) => {
  return (
    <select
      onChange={(e) => onSort(e.target.value)}
      className="px-3 py-2 rounded mb-4 w-32 bg-transparent focus:outline-none"
      style={{ 
        background: 'white', 
        textAlign: 'right', 
        paddingRight: '1.5rem', 
        paddingLeft: '0.5rem', 
        border: 'none', 
        appearance: 'none', 
      }}
    >
      <option value="">Sort By</option>
      <option value="name-asc">Name: A to Z</option>
      <option value="name-desc">Name: Z to A</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
};

export default SortDropdown;
