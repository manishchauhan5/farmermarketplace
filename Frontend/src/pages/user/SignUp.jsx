import React, { useState } from "react";
import { registerUser } from "../../ApiCallsAuth";
import { NavLink } from "react-router-dom";
import { FaUserAlt, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await registerUser({ name, email, password });
      setSuccess(result.message); 
     
      toast.success("Registration successful! Please log in.");
    } catch (error) {
      
      const errorMessage = error.response?.data?.message || error.message || "Failed to register.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 pb-20 md:pb-0">
      <motion.div
        className="w-full max-w-md md:p-6 p-4 bg-white rounded-lg shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
          Create your Account
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-3 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-500 text-sm mb-3 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Full Name
            </label>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                type="text"
                id="name"
                className="w-full p-2.5 pl-10 border text-gray-800 bg-gray-100 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700  text-sm font-medium mb-1"
            >
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                type="email"
                id="email"
                className="w-full p-2.5 pl-10 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-2.5 pl-10 bg-gray-100 text-gray-700 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-4 h-4" />
                ) : (
                  <FaEye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full p-2.5 text-gray-700 bg-gray-100 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Login
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;