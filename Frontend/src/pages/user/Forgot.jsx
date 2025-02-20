import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

 
    setError("");

    try {
   
      const result = await sendPasswordResetEmail(email); 

      setSuccess(result.message || "Password reset email sent successfully!");
      toast.success("Password reset email sent successfully!");

      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send password reset email. Please try again.");
      toast.error(err.response?.data?.message || "Failed to send password reset email. Please try again.");
    }
  };

  const sendPasswordResetEmail = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: "Password reset email sent successfully!" });
      }, 1000);
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 pb-24 md:pb-0">
      <motion.div
        className="w-full max-w-md md:p-6 p-4 bg-white rounded-lg shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-6">
          Forgot Password
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-500 text-sm mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
              <input
                type="email"
                id="email"
                className="w-full p-2.5 pl-10 bg-gray-100 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            Remember your password?{" "}
            <NavLink
              to="/login"
              className="text-green-600 hover:text-green-700 text-xs md:text-sm"
            >
              Login
            </NavLink>
          </p>
        </div>
      </motion.div>

    </div>
  );
};

export default Forgot;