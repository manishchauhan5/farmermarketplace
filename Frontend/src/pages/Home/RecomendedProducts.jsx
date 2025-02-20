import React, { useState, useEffect } from "react";
import axios from "axios";
import RecommendedProductCard from "../../cards/RecomendedProductCard";
import { getAllProduct } from "../../apiEndPoints";

const RecomendedProducts = () => {
  const [visibleRows, setVisibleRows] = useState(5);
  const [products, setProducts] = useState([]); 
  const productsPerRow = 1;

  const fetchAllProduct = async () => {
    try {
      const { data } = await axios.get(getAllProduct);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error(error || "Failed to fetch product");
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleSeeMore = () => {
    setVisibleRows((prevRows) => prevRows + 5);
  };

  const handleShowLess = () => {
    setVisibleRows(5);
  };

  return (
    <div className="w-full md:mt-8 mt-2 flex flex-col justify-center items-center">
      <div className="w-full md:text-left text-center text-gray-700 p-5 pt-3 md:text-3xl text-xl font-bold">
        Recommended for you
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid lg:grid-cols-5 grid-cols-2 md:gap-7 gap-3">
          {products.slice(0, visibleRows * productsPerRow).map((product) => (
            <RecommendedProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              discountedPrice={product.offerPrice}
              image={product.image.url}
            />
          ))}
        </div>

        <div className="mt-4 flex gap-5">
          {/* "See More" button */}
          {visibleRows * productsPerRow < products.length && (
            <button
              onClick={handleSeeMore}
              className="py-2 px-4 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
            >
              See More
            </button>
          )}

          {/* "Show Less" button */}
          {visibleRows > 5 && (
            <button
              onClick={handleShowLess}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecomendedProducts;
