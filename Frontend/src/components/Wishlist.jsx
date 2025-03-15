import React, { useState, useEffect } from "react";
import axios from "axios";
import WishlistCard from "../cards/WishlistCard";
import { getWishlistApi } from "../apiEndPoints";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../useContext/UserContext";
import { useWishlist } from "../useContext/WishlistContext";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setWishlistCount } = useWishlist();

  const token = localStorage.getItem("token");
  const { user } = useUser();
  const navigate = useNavigate();

  const { removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user) {
        setError("Login is required to view your wishlist.");
        setLoading(false);
        return;
      }
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
        
        setError("Failed to fetch wishlist data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchWishlist();
  }, [user]);

    useEffect(() => {
      if (!user) {
        toast.error("Login is required to view your cart.");
        setError("Login is required to view your cart.");
        setLoading(false);
      }
    }, [user, location.pathname]);

  const handleMoveToCart = (id) => {
    alert(`Item with ID ${id} moved to cart!`);
  };

  const handleRemoveItem = async (id) => {
    try {
      await removeFromWishlist(id);
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item._id !== id)
      );
    } catch (error) {
      toast.error("Failed to remove item from wishlist. Please try again.");
    }
  };

  const handleContinueShopping = () => {
    navigate("/");
  };


  return (
    <div className="relative md:pt-[74px] pt-14 min-h-screen mb-20">
      <div className="md:bg-green-600 text-gray-700  md:py-4 py-1 px-8 md:shadow-md">
        <h1 className="md:text-2xl text-lg lg:text-white text-gray-700 font-semibold flex justify-center items-center">
          Your Wishlist
        </h1>
      </div>

      <div className="container mx-auto md:p-4 p-2">
        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-170px)]">
            <FadeLoader color="#36d7b7" size={15} margin={2} />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-lg text-red-600">{error}</p>
          </div>
        ) : (
          <>
            {wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 md:gap-4 md:px-4 md:*:py-8">
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
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
