import React, { useState } from "react";
import { PiClockCountdownFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import moment from "moment"; 
import { useCart } from "../useContext/CartContext";

const ProductCard = ({ id ,name, price, discountedPrice, rating, expiry, image }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleIncrement = () => setQuantity(quantity + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const formatExpiry = (expiryDate) => {
    const now = moment();
    const expiryMoment = moment(expiryDate);
    const diffDays = expiryMoment.diff(now, "days");

    if (diffDays > 0) {
      return `${diffDays} days left`;
    } else if (diffDays === 0) {
      return "Expires today";
    } else {
      return "Expired";
    }
  };

  const displayName = name.length > 8 ? `${name.slice(0, 8)}...` : name;

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      discountedPrice,
      quantity,
      image,
    };
    addToCart(product); 
  };

  return (
    <>
      {/* Desktop View */}
      <div className="bg-white shadow-md rounded-lg p-4 w-64 relative hidden md:block">
        {/* Expiry Badge */}
        <div className="absolute flex justify-center items-center bg-yellow-100 text-yellow-600 font-semibold text-xs px-2 py-1 rounded top-2 left-2">
          <PiClockCountdownFill className="h-4 w-4 mr-1" /> {formatExpiry(expiry)}
        </div>

        {/* Product Image */}
        <div className="flex justify-center items-center mb-2">
          <img
            src={image}
            alt={name}
            className="w-full h-32 object-cover rounded"
          />
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {displayName}
        </h3>

        {/* Product Price */}
        <div className="flex justify-between items-center">
          {/* Dynamic Rating */}
          <div className="flex items-center rounded-md my-2">
            {[...Array(5)].map((_, index) => {
              const isFullStar = index + 1 <= Math.floor(rating);
              const isHalfStar = index + 1 === Math.ceil(rating) && rating % 1 !== 0;
              return (
                <FaStar
                  key={index}
                  className={`h-4 w-4 ${
                    isFullStar
                      ? "text-yellow-300"
                      : isHalfStar
                      ? "text-yellow-200"
                      : "text-gray-300"
                  }`}
                />
              );
            })}
          </div>
          <div className="flex gap-3 justify-center items-center mb-2">
            <p className="text-sm line-through font-semibold text-orange-600">
            <span className="text-xs">₹</span>{price}/kg
            </p>
            <p className="text-lg text-green-500 font-bold">
              <span className="text-xs">₹</span>
              {discountedPrice}/kg
            </p>
          </div>
        </div>

      
        <div className="flex justify-between items-center">
        
          <div className="flex items-center justify-between space-x-3 bg-stone-100 rounded-full">
            <button
              onClick={handleDecrement}
              className="w-6 h-6 md:w-8 md:h-8 text-xl rounded-full bg-gray-300 text-gray-800 flex justify-center items-center hover:bg-gray-400"
            >
              -
            </button>
            <span className="md:text-base text-sm font-semibold w-2">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="w-6 h-6 md:w-8 md:h-8 text-xl rounded-full bg-green-500 text-white flex justify-center items-center shadow hover:bg-green-600"
            >
              +
            </button>
          </div>
          
          <button onClick={handleAddToCart} className="rounded px-2 md:px-3 py-1 bg-stone-100 text-green-500 md:text-sm text-xs flex items-center justify-center shadow border-green-500 border md:border-2 hover:bg-green-50">
            Add
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex items-center bg-white shadow-lg rounded p-2 w-full md:hidden">
        {/* Left Section: Product Image */}
        <div className="w-1/3 flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-24 rounded object-cover"
          />
        </div>

        {/* Middle Section: Product Name, Rating, and Counter */}
        <div className="flex-grow px-4">
          {/* Product Name */}
          <h2 className="text-lg font-bold text-gray-800">{displayName}</h2>

          {/* Dynamic Rating */}
          <div className="flex items-center rounded-md my-2">
            {[...Array(5)].map((_, index) => {
              const isFullStar = index + 1 <= Math.floor(rating);
              const isHalfStar = index + 1 === Math.ceil(rating) && rating % 1 !== 0;
              return (
                <FaStar
                  key={index}
                  className={`h-4 w-4 ${
                    isFullStar
                      ? "text-yellow-300"
                      : isHalfStar
                      ? "text-yellow-200"
                      : "text-gray-300"
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center space-x-3 w-fit bg-slate-100 rounded-full">
            <button
              onClick={handleDecrement}
              className="w-7 h-7 text-xl rounded-full bg-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              -
            </button>
            <span className="text-base font-semibold text-gray-800">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="w-7 h-7 text-xl rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Right Section: Expiry, Price, and Add Button */}
        <div className="w-1/3 flex-shrink-0 flex flex-col items-end">
          {/* Expiry */}
          <div className="flex items-center bg-yellow-100 text-yellow-600 font-semibold text-xs px-1 py-1 rounded">
            <PiClockCountdownFill className="h-4 w-4  pr-0.5" /> {formatExpiry(expiry)}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs line-through font-semibold text-gray-700">
              ₹{price}/kg
            </p>
            <p className="text-md text-green-500 font-bold">
              <span className="text-xs">₹</span>
              {discountedPrice}/kg
            </p>
          </div>

          {/* Add Button */}
          <button onClick={handleAddToCart} className="bg-green-500 border font-bold border-green-600 text-white text-xs px-5 py-1.5 rounded shadow-md hover:bg-green-600 transition-colors mt-2">
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;