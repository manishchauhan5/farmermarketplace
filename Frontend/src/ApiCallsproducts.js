import axios from "axios";
import { addProductApi, getAllProduct } from "./apiEndPoints";
import { useUser } from "./useContext/UserContext";

const token = localStorage.getItem("token");

// Add product API call
export const addProduct = async (productData) => {
  try {
    // Validate productData
    if (!productData || typeof productData !== "object") {
      throw new Error("Invalid product data");
    }

    const formDataToSend = new FormData();
    formDataToSend.append("category", productData.category);
    formDataToSend.append("name", productData.name);
    formDataToSend.append("description", productData.description);
    formDataToSend.append("expiryDate", productData.expiryDate);
    formDataToSend.append("actualPrice", productData.actualPrice);
    formDataToSend.append("offerPrice", productData.offerPrice);
    formDataToSend.append("image", productData.image);

    const response = await axios.post(addProductApi, formDataToSend, {
      
      headers: {
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error(error.response?.data?.message || "Failed to add product");
  }
};

export const getProductById = async (pid) => {
  
  try {
    const response = await axios.get(`http://localhost:4000/v1/product/getProduct/${pid}`, {
      headers: {
        Authorization: token, 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
}

export const updateProduct = async (pid, formData) => {
  try {        
    
    const response = await axios.put(
      `http://localhost:4000/v1/product/updateProduct/${pid}`, 
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; 
  }
};


// Get all Products
