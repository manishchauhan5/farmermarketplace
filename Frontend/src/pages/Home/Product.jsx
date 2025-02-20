import React, { useEffect, useState } from "react";
import ProductCard from "../../cards/ProductCard";
import { getAllProduct } from "../../apiEndPoints";
import axios from "axios";

const Product = () => {
  const [visibleRows, setVisibleRows] = useState(5);
  const productsPerRow = 2;
  const visibleProducts = visibleRows * productsPerRow;
  const [products, setProducts] = useState([]);

  // Replace this with your actual product data'

  const fetchAllProduct = async () => {
    try {
      const {data} = await axios.get(getAllProduct);
     setProducts(data);
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error(error || "Failed to fetch product");
    }
  }

  useEffect(()=> {
    fetchAllProduct();
  },[])

  const handleSeeMore = () => {
    setVisibleRows((prevRows) => prevRows + 5);
  };

  const handleShowLess = () => {
    setVisibleRows(5);
  };

  return (
    <div className="w-full md:mt-8 mt-4 flex flex-col justify-center items-center">
      <div className="w-full md:text-left text-center md:p-5 md:text-3xl text-xl font-bold mb-2 md:mb-0 text-gray-700">
        All Products
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 md:gap-6 gap-2">
          {products?.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.actualPrice}
              discountedPrice={product.offerPrice}
              rating={product.rating}
              expiry={product.expiryDate}
              image={product.image.url}
            />
          ))}
        </div>

        <div className="mt-4 flex gap-2 md:gap-5">
          {/* "See More" button */}
          {visibleProducts < products.length && (
            <button
              onClick={handleSeeMore}
              className="md:px-4 px-3 md:py-2 py-1.5 bg-blue-500 text-white text-sm md:text-base font-semibold rounded shadow hover:bg-blue-600"
            >
              See More
            </button>
          )}

          {/* "Show Less" button */}
          {visibleRows > 5 && (
            <button
              onClick={handleShowLess}
              className="md:px-4 px-3 md:py-2 py-1.5 bg-red-500 text-sm md:text-base text-white font-semibold rounded shadow hover:bg-red-600"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;