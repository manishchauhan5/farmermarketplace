import axios from "axios";
import { addProductApi, getAllProduct, ProductByCategory, ProductById } from "./apiEndPoints";

const token = localStorage.getItem("token");

export const addProduct = async (productData) => {
  try {
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
        Authorization: token,
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
    const response = await axios.get(`${ProductById}/${pid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
}
export const getProductByCategory = async (category) => {
  try {
   
    const encodedCategory = encodeURIComponent(category);
    const response = await axios.get(`${ProductByCategory}/${encodedCategory}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
};


export const updateProduct = async (pid, formData) => {
  try {        
    
    const response = await axios.put(
      `${updateProduct}/${pid}`, 
      formData
    );

    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; 
  }
};


