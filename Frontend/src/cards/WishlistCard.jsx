import React from 'react';

const WishlistCard = ({ id, name, discountedPrice, image, onRemoveItem, handleMoveToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
     <img
        src={image}
        alt={name}
        className="h-16 w-24 object-contain mb-2"
      />
      <h2 className="text-lg font-semibold text-gray-700 text-center">
        {name}
      </h2>
      <p className="text-green-700 font-bold mt-1">₹{discountedPrice}</p>
      
      <div className="mt-4 flex flex-row space-x-4 w-full items-center justify-center">
        <button
          // onClick={() => handleMoveToCart(id)}
          className="md:px-4 px-2 md:py-2 py-1 bg-green-700 text-white rounded hover:bg-green-600 w-full"
        >
          Move to Cart
        </button>
        <button
          onClick={() => onRemoveItem(id)}
          className="md:px-4 px-2 md:py-2 py-1 bg-red-600 text-white rounded hover:bg-red-500 w-full"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;