import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    setError("");
    setMessage("OTP has been verified successfully.");
    console.log("OTP Verified:", otp);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 }, 
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100">
      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl"
        variants={containerVariants}
        initial="hidden" 
        animate="visible" 
      >
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6 sm:text-2xl md:text-3xl">
          OTP Verification
        </h2>

        {error && (
          <motion.div
            className="text-red-500 text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}

        {message && (
          <motion.div
            className="text-green-500 text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {/* OTP Input */}
          <div className="mb-6">
            <label htmlFor="otp" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
              Enter OTP
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="otp"
                name="otp"
                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 text-sm sm:text-base"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="w-full py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-200 text-sm sm:text-base"
          >
            Verify OTP
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the OTP?{" "}
            <NavLink to="/resend-otp" className="text-green-600 hover:text-green-700 font-medium">
              Resend OTP
            </NavLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpVerification;
