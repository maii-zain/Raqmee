import React, { useState } from 'react';

const SellItem = ({ onClose, onAddProduct }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Select');
  const [price, setPrice] = useState('');
  const [photos, setPhotos] = useState([]);

 
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    photos: ''
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPhotos(files);
    if (files.length === 0) {
      setErrors((prev) => ({ ...prev, photos: 'Please upload at least one photo.' }));
    } else {
      setErrors((prev) => ({ ...prev, photos: '' })); 
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: '',
      description: '',
      category: '',
      price: '',
      photos: ''
    };

    if (title.trim() === '') {
      newErrors.title = 'Title is required.';
      valid = false;
    }

    if (description.trim() === '') {
      newErrors.description = 'Description is required.';
      valid = false;
    }

    if (category === 'Select') {
      newErrors.category = 'Category must be selected.';
      valid = false;
    }

    if (!/^\d*(\.\d{0,2})?$/.test(price)) {
      newErrors.price = 'Please enter a valid price, e.g., 0.00';
      valid = false;
    } else if (price.trim() === '') {
      newErrors.price = 'Price is required.';
      valid = false;
    }

    if (photos.length === 0) {
      newErrors.photos = 'At least one photo must be uploaded.';
      valid = false;
    }

    setErrors(newErrors); 
    return valid; 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  
    if (!validateForm()) {
      return; 
    }

   
    const newProduct = {
      id: Date.now(), 
      name: title,
      description: description,
      category: category,
      price: parseFloat(price), 
      image: photos.length > 0 ? URL.createObjectURL(photos[0]) : '', 
    };

    
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

  
    existingProducts.push(newProduct);

  
    localStorage.setItem('products', JSON.stringify(existingProducts));

    
    onAddProduct(newProduct);

 
    setTitle('');
    setDescription('');
    setCategory('Select');
    setPrice('');
    setPhotos([]);

    setErrors({
      title: '',
      description: '',
      category: '',
      price: '',
      photos: ''
    }); 

    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition duration-200"
        >
          &times; 
        </button>

        <h2 className="text-2xl font-bold mb-4">Sell an Item</h2>
        
        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label className="block mb-1">Upload Photos</label>
            <div className="border border-gray-300 rounded p-2 h-[200px] flex items-center justify-center">
              <input 
                type="file" 
                multiple 
                onChange={handleFileChange} 
                className="hidden" 
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer bg-gray-200 rounded py-2 px-4 text-center">
                Select Photos
              </label>
            </div>
            {errors.photos && <p className="text-red-500 mt-1">{errors.photos}</p>} 
          </div>

          
          <div className="mb-4">
            <label className="block mb-1">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className={`border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded p-2 w-full max-w-[780px]`} 
              required 
            />
            {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>} 
          </div>

         
          <div className="mb-4">
            <label className="block mb-1">Describe Your Item</label>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded p-2 w-full max-w-[780px]`} 
              rows="4" 
              required 
            />
            {errors.description && <p className="text-red-500 mt-1">{errors.description}</p>} 
          </div>

         
          <div className="mb-4">
            <label className="block mb-1">Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className={`border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded p-2 w-full max-w-[780px]`}
            >
              <option>Select</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Home & Garden</option>
              <option>Sports</option>
            </select>
            {errors.category && <p className="text-red-500 mt-1">{errors.category}</p>} 
          </div>

   
          <div className="mb-4">
            <label className="block mb-1">Item Price</label>
            <div className="flex items-center border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded p-2 w-full max-w-[780px]">
              <span className="mr-2">£</span>
              <input 
                type="text" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                className="flex-1 border-none focus:outline-none" 
                placeholder="0.00"
                required 
                pattern="^\d*(\.\d{0,2})?$" 
                title="Please enter a valid price, e.g., 0.00" 
              />
            </div>
            {errors.price && <p className="text-red-500 mt-1">{errors.price}</p>} 
          </div>

          <button 
            type="submit" 
            className="bg-[rgba(217,249,157,1)] text-black py-2 px-4 rounded w-full hover:bg-opacity-80 transition duration-200"
          >
            Upload Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellItem;
