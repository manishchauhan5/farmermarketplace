import React, { useState } from "react";
import { addProduct } from "../ApiCallsproducts";
import { toast } from "react-toastify";

const SellProduct = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; 
    if (file && file.type.startsWith("image/")) {
      setFormData({ ...formData, image: file });
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addProduct(formData);
      toast.success("Product added successfully!");

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
      console.error("Error adding product:", error);
      alert(error.message || "Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="md:mt-[74px] mt-10 p-2 pt-4 md:p-4">
      <h2 className="text-xl md:text-3xl text-gray-700 font-bold mb-2 md:mb-4 text-center">
        Sell your Products
      </h2>
      <div className="mx-auto bg-white shadow-md p-4 md:px-16 md:py-7 rounded-lg mb-20 md:mb-0">
     
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full border bg-white border-gray-300 rounded-lg px-4 py-2"
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
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

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
                className="block  text-gray-700 font-medium mb-2"
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
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Product"}
          </button>
        </form>
      </div>
      </div>
    </>
  );
};

export default SellProduct;