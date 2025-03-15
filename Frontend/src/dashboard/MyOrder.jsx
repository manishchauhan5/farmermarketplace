import React, { useEffect, useState } from "react";
import { fetchOrders } from "../orderService";
import { FadeLoader } from "react-spinners";

const MyOrder = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetchOrders(token); 
        if (response.success) {
          setOrders(response.data); 
        } else {
          setError(response.message || "Failed to load orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
       
      } finally {
        setLoading(false); 
      }
    };

    getOrders();
  }, [token]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FadeLoader color="#36d7b7" size={15} margin={2} /> 
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen mt-[74px] p-3 md:p-4 flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:mt-[74px] mt-12 p-2 md:p-4 pb-16  md:pb-0">
      {/* Page Title */}
      <h2 className="text-xl md:text-3xl text-gray-700 font-bold text-center md:mb-6 mb-4">My Orders</h2>

      {/* Orders List */}
      {orders.length > 0 ? (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white text-gray-700 p-4 md:p-6 rounded-lg shadow-md mb-6"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  Order ID: {order._id}
                </h3>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Order Placed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  Created At: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Updated At: {new Date(order.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold mb-2">Items</h4>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="text-md font-semibold">
                        Product ID: {item.productId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  Payment ID: {order.paymentId}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">Total: ₹{order.total}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrder;