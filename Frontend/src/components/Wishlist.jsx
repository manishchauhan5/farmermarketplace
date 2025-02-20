import React, { useState, useEffect } from "react";
import axios from "axios"; 
import WishlistCard from "../cards/WishlistCard";
import { getWishlistApi } from "../apiEndPoints";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../useContext/UserContext";
import { useWishlist } from "../useContext/WishlistContext";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { setWishlistCount} = useWishlist();

  const token = localStorage.getItem("token");
  const { user } = useUser();
  const navigate = useNavigate();
  // const location = useLocation();

  const { removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) throw new Error("User not authenticated");

        const response = await axios.get(getWishlistApi, {
          headers: {
            Authorization: token, 
          },
        });

        if (response.data && response.data.items) {
          setWishlistItems(response.data.items);
          setWishlistCount(response.data.items.length);
        } else {
          setWishlistItems([]);
        }

      } catch (error) {
        console.error("Error fetching wishlist data:", error);
        
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchWishlist();
  }, [user]); 

 
  const handleMoveToCart = (id) => {
    alert(`Item with ID ${id} moved to cart!`);
  };

  const handleRemoveItem = async (id) => {
    console.log("Removing item with id:", id);

    try {
      await removeFromWishlist(id); 
      setWishlistItems((prevItems) => prevItems.filter((item) => item._id !== id)); 
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      alert("Failed to remove item from wishlist. Please try again.");
    }
  };

  const handleContinueShopping = () => {
    navigate("/"); 
  };

  // Display loading state
  if (loading) {
    return (
      <div className="relative md:pt-[74px] bg-gray-100 min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-700">Loading wishlist...</p>
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div className="relative bg-gray-100 min-h-screen flex justify-center items-center">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative md:pt-[74px] pt-11 min-h-screen mb-20">
       {/* Header */}
       <div className="bg-green-500 text-white md:py-4 py-1 px-8 shadow-md">
          <h1 className="md:text-2xl text-lg font-semibold flex justify-center items-center">
            Your Wishlist
          </h1>
        </div>

      <div className="container mx-auto md:p-4 p-2">       

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 md:px-4 md:*:py-8">
            {wishlistItems.map((item) => (
              <WishlistCard
                key={item._id}
                id={item._id} 
                name={item.name}
                discountedPrice={item.discountedPrice}
                image={item.image}
                onMoveToCart={handleMoveToCart}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        ) : (
          // Empty Wishlist State
          <div className="text-center py-8">
            <p className="text-lg text-gray-700">Your wishlist is empty!</p>
            <button
              onClick={handleContinueShopping}
              className="mt-4 px-6 py-3 bg-green-700 text-white font-semibold rounded hover:bg-green-600 text-sm sm:text-base"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;