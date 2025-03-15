import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PhoneHeader } from "../components/Navbar";
import { getProductByCategory } from "../ApiCallsproducts";
import ProductCard from "../cards/ProductCard";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners"; 

const ProductByCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchProductCategory = async () => {
      try {
        const response = await getProductByCategory(category);
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast("Failed to fetch products. Please try again later.");
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchProductCategory();
    }, [category]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (products?.length === 0 && !loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600">
          No products found in this category.
        </p>
      </div>
    );
  }

  return (
    <>
      <PhoneHeader />
      <div className="lg:mt-[70px] mt-12 p-2 lg:p-4 flex flex-col h-screen items-center w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 lg:py-3 py-2 text-center capitalize">
          {category}
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-170px)]">
            <FadeLoader color="#36d7b7" size={15} margin={2} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-6 gap-2">
            {products?.map((product) => {
              const { _id, name, actualPrice, offerPrice, rating, expiryDate, image } =
                product;
              return (
                <ProductCard
                  key={_id}
                  id={_id}
                  name={name}
                  price={actualPrice}
                  discountedPrice={offerPrice}
                  rating={rating}
                  expiry={expiryDate}
                  image={image.url}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductByCategory;