import React, { useEffect, useState } from "react";
import axios from "axios";
import { allUserProduct } from "../apiEndPoints";
import { Link } from "react-router-dom";

const MyAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(allUserProduct, {
          headers: {
            Authorization: token,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="md:mt-[74px] mt-10 p-2 md:p-4">
      <div className="mx-auto bg-white shadow-md p-4 md:p-6 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-600 text-center">
          Uploaded Products
        </h2>

        {/* Desktop Table (Horizontal Scroll) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Product Name</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Offer Price</th>
                <th className="border px-4 py-2">Expiry Date</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                    <td className="border px-4 py-2 text-center">
                      <img
                        src={product.image.url}
                        alt={product.name}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg mx-auto"
                      />
                    </td>
                    <td className="border px-4 py-2">{product.name}</td>
                    <td className="border px-4 py-2">{product.category}</td>
                    <td className="border px-4 py-2">₹{product.actualPrice}</td>
                    <td className="border px-4 py-2">₹{product.offerPrice}</td>
                    <td className="border px-4 py-2">
                      {new Date(product.expiryDate).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex space-x-2 justify-center">
                        <Link
                          to={`/dashboard/updateproduct/${product._id}`}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </Link>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards (Vertical Layout) */}
        <div className="md:hidden space-y-1 mb-16">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 p-4"
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={product.image.url}
                    alt={product.name}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg text-gray-700 font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-1 text-gray-700">
                  <p>
                    <span className="font-semibold">Price:</span> ₹
                    {product.actualPrice}
                  </p>
                  <p>
                    <span className="font-semibold">Offer Price:</span> ₹
                    {product.offerPrice}
                  </p>
                  <p>
                    <span className="font-semibold">Expiry Date:</span>{" "}
                    {new Date(product.expiryDate).toLocaleString()}
                  </p>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Link
                    to={`/dashboard/updateproduct/${product._id}`}
                    className="bg-blue-500 text-white px-6 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAllProducts;