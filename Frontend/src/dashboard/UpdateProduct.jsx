import React, { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../ApiCallsproducts";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { pid } = useParams();
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    expiryDate: "",
    actualPrice: "",
    offerPrice: "",
    image: null, 
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
    const fetchProductDetails = async () => {
        
      try {
        const product = await getProductById(pid);
        setFormData({
          category: product.category,
          name: product.name,
          description: product.description,
          expiryDate: product.expiryDate.split("T")[0], 
          actualPrice: product.actualPrice,
          offerPrice: product.offerPrice,
          image: product.image.url, 
        });
      } catch (error) {
       
        alert("Failed to fetch product details. Please try again.");
      }
    };

    fetchProductDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, image: file });
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      await updateProduct(pid, formData);
      alert("Product updated successfully!");

      setFormData({
        category: "",
        name: "",
        description: "",
        expiryDate: "",
        actualPrice: "",
        offerPrice: "",
        image: null,
      });

      document.getElementById("image").value = "";
   
    } catch (error) {
      
      alert(error.message || "Failed to update product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="md:mt-[76px] text-gray-700 mt-11 p-2">
      <div className="mx-auto bg-white shadow-md p-4 rounded-lg mb-20 md:mb-0">
      <h2 className="text-xl md:text-3xl  font-bold text-center">
        Update Product
      </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="">Select a category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy Products">Dairy Products</option>
              <option value="Dry Fruits">Dry Fruits</option>
              <option value="Spices">Spices</option>
              <option value="Grains">Grains</option>
              <option value="Flowers">Flowers</option>
            </select>
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border bg-white border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter the product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border bg-white border-gray-300 rounded-lg px-4 py-2"
              placeholder="Enter a short description of the product"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Expiry Date */}
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              id="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="w-full border bg-white border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          {/* Prices */}
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="actualPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Actual Price
              </label>
              <input
                type="number"
                name="actualPrice"
                id="actualPrice"
                value={formData.actualPrice}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter the actual price"
                required
              />
            </div>

            <div>
              <label
                htmlFor="offerPrice"
                className="block text-gray-700 font-medium mb-2"
              >
                Price After Offer
              </label>
              <input
                type="number"
                name="offerPrice"
                id="offerPrice"
                value={formData.offerPrice}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2"
                placeholder="Enter the offer price"
                required
              />
            </div>
          </div>

            {/* Display current image */}
          {formData.image && typeof formData.image === "string" && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Current Image
              </label>
              <img
                src={formData.image}
                alt="Product"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border bg-white border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
      </div>
    </>
  );
};

export default UpdateProduct;