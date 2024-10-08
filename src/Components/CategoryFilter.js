import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onFilter }) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onFilter(e.target.value)}
      className="border border-gray-300 bg-white px-3 py-2 rounded mb-4 w-32" 
    >
      <option value="">Filter By</option>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
