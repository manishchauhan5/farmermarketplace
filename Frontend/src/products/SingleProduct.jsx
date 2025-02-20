import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

const SingleProduct = () => {
  const { id } = useParams();
  const [product] = useState({
    id: id,
    name: "Sample Product",
    price: 100,
    discountedPrice: 80,
    rating: 4.5,
    expiryDate: "2023-12-31",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUHkLKHWI2n9GOjNGONEu-Y3pCO67sUnuPQ&s",
    description:
      "This is a premium quality product made with high-end materials. It is designed to last long and provide maximum satisfaction to the user.",
  });

  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="container md:mt-[72px] mx-auto p-6  flex justify-center">
      <div className="max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden grid md:grid-cols-2">
        {/* Product Image */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-semibold text-green-600">${product.discountedPrice}</span>
              <span className="text-lg text-gray-500 line-through">${product.price}</span>
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={`text-yellow-500 ${i < product.rating ? '' : 'opacity-50'}`} />
              ))}
              <span className="ml-2 text-gray-600">({product.rating})</span>
            </div>

            {/* Expiry Date */}
            <p className="text-gray-700 mb-3">
              <span className="font-medium">Expiry Date:</span> {product.expiryDate}
            </p>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => setIsInCart(true)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-md ${
                isInCart ? "bg-green-500 text-white cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={isInCart}
            >
              <FaShoppingCart /> {isInCart ? "Added to Cart" : "Add to Cart"}
            </button>

            <button
              onClick={() => setIsInWishlist(true)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-md ${
                isInWishlist ? "bg-pink-500 text-white cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"
              }`}
              disabled={isInWishlist}
            >
              <FaHeart /> {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SingleProduct;
