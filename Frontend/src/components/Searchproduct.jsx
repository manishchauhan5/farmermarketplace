import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { getAllProduct } from "../apiEndPoints";
import ProductCard from "../cards/ProductCard";
import { PhoneHeader } from "./Navbar";
import { FadeLoader } from "react-spinners";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(getAllProduct);
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <PhoneHeader />
      <div className="min-h-screen lg:mt-[72px] mt-12  bg-gray-100 px-2 py-6">
        {/* Search Bar */}
        <div className="flex lg:hidden w-full justify-center items-center mb-6">
          <div className="relative w-full border-2 mx-2 rounded">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 pl-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute right-4 top-4 text-gray-500" />
          </div>
        </div>

        {/* Loading State */}
        {loading && <div className="flex justify-center items-center h-[calc(100vh-170px)]">
            <FadeLoader color="#36d7b7" size={15} margin={2} />
          </div>}

        {/* Error State */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5">
          {filteredProducts.length > 0 || searchTerm === "" ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.actualPrice}
                discountedPrice={product.offerPrice}
                rating={product.rating}
                expiry={product.expiryDate}
                image={product.image?.url}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
