import React, { useState } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../useContext/CartContext";
import { useWishlist } from "../useContext/WishlistContext";

const RecommendedProductCard = ({id, name, image, discountedPrice }) => {
  const [quantity, setQuantity] = useState(1); 
  const [isWishlisted, setIsWishlisted] = useState(false); 
   const { addToCart } = useCart();
   const { addToWishlist } = useWishlist();

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


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

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    const product = {
      id,
      name,
      discountedPrice,
      quantity,
      image,
    };
    
    addToWishlist(product); 
  };


  return (
    <>
      {/* Desktop View */}
      <div className="w-64 p-4 hidden bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 md:flex flex-col">
        
        <div className="w-full h-32 overflow-hidden relative flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
       
          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <FaHeart
              className={`w-5 h-5 ${
                isWishlisted ? "text-red-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

          <div className="mt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-green-600">₹{discountedPrice}/kg</span>

            
            <div className="flex items-center bg-gray-100 rounded-full">
              <button
                onClick={handleDecrement}
                className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-l-full transition-colors"
              >
                -
              </button>
              <span className="px-3 text-sm font-semibold text-gray-800">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-r-full transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button onClick={handleAddToCart} className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            <FaShoppingCart className="w-4 h-4" />
            <span className="text-sm">Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="w-40 md:hidden bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
       
        <div className="w-full h-28 overflow-hidden relative flex-shrink-0">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <FaHeart
              className={`w-5 h-5 ${
                isWishlisted ? "text-red-500" : "text-gray-500"
              }`}
            />
          </button>
        </div>

        <div className="p-2 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <div className=" flex justify-between items-center">
            <span className="text-base font-bold text-green-600">₹{discountedPrice}/kg</span>
            <div className="flex items-center space-x-1.5 w-fit bg-slate-100 rounded-full">
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
          <button onClick={handleAddToCart}
           className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
            <FaShoppingCart className="w-4 h-4" />
            <span className="text-sm">
              Add to Cart
              </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RecommendedProductCard;
