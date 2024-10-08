import React from 'react';

const ProductList = ({ products }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
                    <img
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                    />
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <span className="material-icons text-black bg-white shadow-md rounded w-8 h-8 flex items-center justify-center">
                            favorite_border
                        </span> 
                    </div>
                    <p className="text-gray-600">£{product.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mb-4">{product.description}</p>
                    <button className="mt-auto border border-black text-black py-2 px-4 rounded hover:bg-black hover:text-white transition-colors duration-200">
                        View Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
