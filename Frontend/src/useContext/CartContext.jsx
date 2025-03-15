import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { addToCartApi, removeCartApi } from "../apiEndPoints";
import { toast } from "react-toastify";

const CartContext = createContext();
const token = localStorage.getItem("token");

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  
  const addToCart = async (product) => {
    setCart([...cart, product]);
    setCartCount(cart.length + 1);
    if (!token) {
      toast.error("Login required to add to cart");
      return;
    }
    try {     
      const response = await axios.post(addToCartApi,product, 
        {
          headers: {
            Authorization: token
          },
        }
      );
      toast.success("Product added to cart successfully!");
    } catch (error) {
      // console.error("Error adding product to cart:", error);
      setCart(cart.filter((item) => item.id !== product.id));
      setCartCount(cart.length); 
      toast.error("Failed to add product to cart. refresh the page");
    }
  };


  // Remove from cart function  
  const removeFromCart = async (id) => {
    setCart(cart.filter((item) => item.id !== id));

    try {
      await axios.delete(`${removeCartApi}/${id}`, 
      {   
        headers: {
          Authorization: token
        },
      });
      toast.success("Product removed from cart successfully");
    } catch (error) {
      // console.error("Error removing product:", error);

      setCart([...cart, cart.find((item) => item.id === id)]);
      toast.error("Failed to remove product from cart. Please try again.");
    }
  };

  return (
    <CartContext.Provider value={{setCartCount, cartCount, cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);