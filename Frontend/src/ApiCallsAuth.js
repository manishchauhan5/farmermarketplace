import axios from "axios";
import { loginApi, signUpApi } from "./apiEndPoints";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(signUpApi, userData);
        return response.data;
    } catch (error) {
        console.error("Error in registerUser:", error.response?.data?.message || error.message || "Unknown error");
        throw new Error(error.response?.data?.message || error.message || "Failed to register user.");
    }
};  

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(loginApi, { email, password }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error; 
    }
};

