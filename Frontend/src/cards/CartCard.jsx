import React from "react";

const CartCard = ({ id, name, discountedPrice, quantity, image, handleQuantityChange, handleRemoveItem }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border bg-slate-50 px-4 border-gray-200 py-4">
      <img
        src={image}
        alt={name}
        className="h-16 w-24 object-contain rounded-lg"
      />
      <div className="flex-1 text-center md:text-left md:ml-5 mt-2 sm:mt-0">
        <h3 className="text-md sm:text-lg font-medium text-gray-700">{name}</h3>
        <p className="text-sm text-gray-500">
        Price: ₹{discountedPrice} x {quantity}
        </p>
      </div>
      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => handleQuantityChange(id, quantity - 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-3 py-1 text-gray-700">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(id, quantity + 1)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <p className="font-semibold text-gray-700 hidden sm:block">
          ₹{discountedPrice * quantity}
        </p>
        <button
          onClick={() => handleRemoveItem(id)}
          className="text-red-500 hover:text-red-700"
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};

export default CartCard;
