import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../useContext/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import CartCard from "../cards/CartCard";
import { getCartApi } from "../apiEndPoints";
import { useCart } from "../useContext/CartContext";
import { createOrder, verifyPayment } from "../orderService";
import { toast } from "react-toastify";

const Cart = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(""); 
  const token = localStorage.getItem("token");
  
  const { removeFromCart, setCartCount} = useCart();
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const response = await axios.get(getCartApi, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data && response.data.items) {
          setCartItems(response.data.items);
          setCartCount(response.data.items.length);          
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchCart();
  }, [user]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = async (id) => {
    
    try {
      await removeFromCart(id);
      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (paymentMethod === "cod") {
      try {
        const orderData = await createOrder(totalPrice, "cod");
        if (orderData.success) {
          toast.success("Order placed successfully!");
          navigate("/dashboard/orders");
        } else {
          toast.error("Failed to place order.");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Failed to place order. Please try again.");
      }
    } else if (paymentMethod === "online") {
      try {
        const orderData = await createOrder(totalPrice, "online");
        if (orderData.success) {
          handlePaymentVerify(orderData.order);
        } else {
          toast.error("Failed to create order.");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        toast.error("Payment processing failed.");
      }
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Farmer's Market",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: totalPrice,
            items: cartItems.map((item) => ({
              productId: item._id,
              quantity: item.quantity || 1,
            })),
          };

          const verifyData = await verifyPayment(paymentData, token);
          if (verifyData.message) {
            toast.success(verifyData.message);
            navigate("/dashboard/orders");
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          toast.error("Payment verification failed.");
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="md:pt-[74px] bg-gray-100 min-h-screen">
      <div className="">
        <div className="bg-green-600 text-white md:py-4 py-2 md:relative fixed w-full shadow-md text-center">
          <h1 className="text-xl sm:text-2xl font-semibold">Cart</h1>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-700">Loading cart data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-lg text-red-600">{error}</p>
          </div>
        ) : cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-14 md:py-4 px-2 md:px-10">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-4 md:p-6">
              <h2 className="text-lg sm:text-xl text-center font-semibold text-green-700 mb-4">
                Items in Your Cart
              </h2>
              {cartItems.map((item) => (
                <CartCard
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  discountedPrice={item.discountedPrice}
                  quantity={item.quantity}
                  image={item.image}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveItem={handleRemoveItem}
                />
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-green-700 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="font-semibold text-gray-700">₹{totalPrice}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">Shipping</p>
                  <p className="font-semibold text-gray-700">₹50</p>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <p className="font-semibold text-lg">Total</p>
                  <p className="font-semibold text-lg text-green-700">
                    ₹{totalPrice + 50}
                  </p>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold text-green-700">
                  Select Payment Method
                </h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => handlePaymentMethodChange("cod")}
                      className="mr-2"
                      disabled
                    />
                    Cash on Delivery (COD)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={() => handlePaymentMethodChange("online")}
                      className="mr-2"
                    />
                    Online Payment
                  </label>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => {
                  user
                    ? handlePayment()
                    : navigate("/login", {
                        state: { from: location.pathname },
                      });
                }}
                className="mt-6 w-full px-4 py-2 bg-green-700 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gray-700">Your cart is empty!</p>
            <button
              className="mt-4 px-6 py-3 bg-green-700 text-white font-semibold rounded hover:bg-green-600 transition duration-200"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;