import React, { useState, useEffect } from 'react';
import ProductList from '../Components/ProductList';
import SearchBar from '../Components/SearchBar';
import CategoryFilter from '../Components/CategoryFilter';
import Pagination from '../Components/Pagination';
import SortDropdown from '../Components/SortDropdown';
import SellItem from '../Components/SellItem';

const Main = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedBy, setSortedBy] = useState('');
  const [showSellItemModal, setShowSellItemModal] = useState(false);

  const PRODUCTS_PER_PAGE = 4;

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      fetch('/products.json')
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          localStorage.setItem('products', JSON.stringify(data));
        })
        .catch((error) => console.error('Error fetching product data:', error));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

 
  const addProduct = (newProduct) => {
   
    const newId = products.length ? products[products.length - 1].id + 1 : 1;
    const productWithId = { ...newProduct, id: newId }; 
    setProducts((prevProducts) => [...prevProducts, productWithId]); 
    setShowSellItemModal(false); 
  };

  const categories = Array.from(new Set(products.map((product) => product.category)));

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => {
      return selectedCategory ? product.category === selectedCategory : true;
    })
    .sort((a, b) => {
      if (sortedBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortedBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortedBy === 'price-asc') return a.price - b.price;
      if (sortedBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between mb-4">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <div className="flex justify-end items-center space-x-1">
          <SortDropdown onSort={setSortedBy} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onFilter={setSelectedCategory}
          />
          <button
            onClick={() => setShowSellItemModal(true)} 
            className="flex items-center text-black py-2 px-3 rounded hover:opacity-80 transition-colors duration-200 w-32 -mt-3.5" 
            style={{ background: 'rgba(217, 249, 157, 1)', color: 'black' }}
          >
            <span className="material-icons mr-1">add</span>
            Sell Item
          </button>
        </div>
      </div>
      <ProductList products={displayedProducts} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      
      
      {showSellItemModal && <SellItem onClose={() => setShowSellItemModal(false)} onAddProduct={addProduct} />}
    </div>
  );
};

export default Main;
