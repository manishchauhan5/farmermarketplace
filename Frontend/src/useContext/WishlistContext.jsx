import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { addToWishlistApi, removeWishlistApi } from "../apiEndPoints";
import { toast } from "react-toastify";

const WishlistContext = createContext();  
const token = localStorage.getItem("token");

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Add to wishlist function
  const addToWishlist = async (product) => {
   
    setWishlist([...wishlist, product]);
    if (!token) {
      toast.error("Login required to add to wishlist");
      return;
    };

    try {     
      const response = await axios.post(
        addToWishlistApi,
        product, 
        {
          headers: {
            Authorization: token
          },
        }
      ); 
      setWishlistCount((prev) => prev + 1);
      toast.success("Product added to wishlist successfully!");

    } catch (error) {
      // console.error("Error adding product to wishlist:", error);
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast.error("Failed to add product to wishlist. Please try again.");
    }
  };

  const removeFromWishlist = async (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));

    try {
      await axios.delete(`${removeWishlistApi}/${id}`, 
      {   
        headers: {
          Authorization: token
        },
      });
      toast.success("Product removed from wishlist successfully");
    } catch (error) {

      // console.error("Error removing product:", error);
      setWishlist([...wishlist, wishlist.find((item) => item.id === id)]);
      toast.error("Failed to remove product from wishlist. Please try again.");
    }
  };



  return (
    <WishlistContext.Provider value={{wishlistCount, setWishlistCount, wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
