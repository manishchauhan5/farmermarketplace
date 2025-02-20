import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createOrder = async (total) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/order/create-order`, {
      total,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async (paymentData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/order/verify-payment`, paymentData,{
      headers: {
        Authorization : token
      }
  });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchOrders = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/order/get-order`,{
      headers: {
        Authorization : token
      }
  });
    return response.data;
  } catch (error) {
    throw error;
  }
};