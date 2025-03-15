import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { loginUser } from "../../ApiCallsAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../useContext/UserContext";
import { useNavigate } from "react-router-dom";
import { PhoneHeader, PhoneNavbar } from "../../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //extract from userContext
  const { setUser, setToken } = useUser();
  
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    try {

      const data = await loginUser(email, password);

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("User", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      toast.success(data.message || "Login successful!");

      const redirectTo = location.state?.from || "/";
      navigate(redirectTo);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login. Please try again.");

      toast.error(err.response?.data?.message || "Failed to login. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
    <PhoneHeader/>
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 pb-24 md:pb-0">
      <motion.div
        className="w-full max-w-md md:p-6 p-4 bg-white rounded-lg shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-600 mb-6">
          Farmer Market Login
        </h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <FaUserAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
              <input
                type="email"
                id="email"
                className="w-full p-3 pl-10 bg-gray-100 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
              <input
                type={showPassword ? "text" : "password"} 
                id="password"
                className="w-full p-3 pl-10 bg-gray-100 text-gray-700  pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-300"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs md:text-sm text-gray-500">
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              className="text-green-600 hover:text-green-700 text-xs md:text-sm"
            >
              Create Account
            </NavLink>
          </p>
          <p className="text-xs md:text-sm text-gray-500 mt-2">
            Forgot your password?{" "}
            <NavLink
              to="/forgot"
              className="text-green-600 hover:text-green-700 text-xs md:text-sm"
            >
              Click here
            </NavLink>
          </p>
        </div>
      </motion.div>

    </div>
    </>
  );
};

export default Login;