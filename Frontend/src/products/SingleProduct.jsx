import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { getProductById } from "../ApiCallsproducts";
import { PhoneHeader } from "../components/Navbar";
import { FadeLoader } from "react-spinners"; 
import { useCart } from "../useContext/CartContext";
import { useWishlist } from "../useContext/WishlistContext";

const SingleProduct = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false); 
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToWishlist } = useWishlist();

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleIncrement = () => setQuantity(quantity + 1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToWishlist = () => {
    const product2 = {
      id: product._id, 
      name: product.name, 
      discountedPrice: product.offerPrice, 
      quantity: quantity, 
      image: product.image.url,
    };
    
    addToWishlist(product2); 
    setIsWishlisted((prev) => !prev);
  };

  const handleAddToCart = () => {
    const product2 = {
      id: product._id, 
      name: product.name, 
      discountedPrice: product.offerPrice, 
      quantity: quantity, 
      image: product.image.url,
    };
    addToCart(product2); 
  };

  return (
    <>
      <PhoneHeader />
      {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-170px)]">
            <FadeLoader color="#36d7b7" size={15} margin={2} /> 
          </div>
        ) : 
        (<div className="flex justify-center items-center min-h-screen p-4"> 
        <div className="w-full max-w-4xl mx-auto"> 
          <div className="bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-96 p-2 overflow-hidden">
              <img
                src={product.image.url}
                alt={product.name}
                className="w-full h-full rounded-lg object-cover"
              />
              <button
                onClick={handleAddToWishlist}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
              >
                <FaHeart
                  className={`text-xl ${
                    isWishlisted ? "text-red-500" : "text-gray-500"
                  }`}
                />
              </button>
            </div>

            <div className="p-4 md:p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xl font-semibold text-green-600">
                    ₹{product.offerPrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ₹{product.actualPrice}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-yellow-500 ${
                        i < (product.rating || 4) ? "" : "opacity-50"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    ({product.rating || 4})
                  </span>
                </div>

                <p className="text-gray-700 mb-3">
                  <span className="font-medium">Expiry Date:</span>{" "}
                  {new Date(product.expiryDate).toLocaleDateString()}
                </p>

                <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-row gap-6">
                <div className="flex items-center w-full md:w-36 justify-between bg-stone-100 rounded">
                  <button
                    onClick={handleDecrement}
                    className="w-10 h-10 lg:w-12 lg:h-12  text-2xl rounded bg-gray-300 text-gray-800 flex justify-center items-center hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="w-10 h-10 lg:w-12 lg:h-12 text-2xl rounded bg-green-500 text-white flex justify-center items-center shadow hover:bg-green-600"
                  >
                    +
                  </button>
                </div>

                <button 
                onClick={handleAddToCart}
                 className="w-full md:flex-1 flex items-center justify-center gap-2 px-4 py-2 lg:py-3 rounded-lg font-semibold transition-colors duration-300 shadow-md bg-green-500">
                  <FaShoppingCart /> <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>)
        }
    </>
  );
};

export default SingleProduct;