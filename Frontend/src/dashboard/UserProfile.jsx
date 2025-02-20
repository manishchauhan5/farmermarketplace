import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

const UserProfile = () => {

  const user  = JSON.parse(localStorage.getItem("User"));
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: "1234567890",
    address: "412207, Wagholi, Pune",
    profilePicture: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files.length) {
      setFormData({
        ...formData,
        profilePicture: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Service is not available for now!");
  };

  const handleDeleteAccount = () => {
    alert("Service is not available for now!");
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="md:mt-[74px] mt-10 p-3 md:p-4">
        <div className="w-full bg-gray-100 h-screen">
          <h2 className="md:text-3xl text-xl text-gray-700 font-bold md:mb-4 mb-3 text-center">
            Your Profile
          </h2>
          <div className="bg-white shadow-lg md:p-12 p-3 rounded-xl">
            {/* Profile Picture */}
            <div className="flex justify-center mb-10">
              <div className="relative">
                <img
                  src={
                    formData.profilePicture ||
                    "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                  }
                  alt=""
                  className="md:w-40 md:h-40 w-20 h-20 rounded-full object-cover shadow-lg"
                />
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 bg-green-500 text-white md:p-3 p-2 rounded-full cursor-pointer"
                >
                  <FiEdit className="md:h-7 md:w-7 h-4 w-4" />
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Profile Details Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-2">
                <div className="flex items-center gap-3">
                  <FiUser className="text-gray-700 h-6 w-6" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full md:px-4 px-3 md:py-3 py-2 border-2 bg-white border-gray-300 rounded-lg text-gray-700 focus:outline-none "
                    placeholder="Enter your name"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <FiMail className="text-gray-700 h-5 w-6" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full md:px-4 px-3 md:py-3 py-2 border-2 border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none "
                    placeholder="Enter your email"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <FiPhone className="text-gray-700 h-5 w-6" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full md:px-4 px-3 md:py-3 py-2 border-2 bg-white border-gray-300 rounded-lg text-gray-700 focus:outline-none "
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <FiMapPin className="text-gray-700 h-7 w-6" />
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full md:px-4 px-3 md:py-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-gray-700 focus:outline-none  resize-none"
                    rows="4"
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              {/* Buttons in the Same Row */}
              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white text-sm md:text-base rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Update Profile
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex-1 bg-red-500 text-white md:py-3 py-2 text-sm md:text-base  rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>

          {/* Delete Account Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-center">
                  Delete Account
                </h2>
                <p className="text-gray-600 text-sm md:text-base text-center mb-6">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-red-600 transition duration-200 text-sm md:text-base"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-gray-400 transition duration-200 text-sm md:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
