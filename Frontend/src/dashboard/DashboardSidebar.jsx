import React, { useState } from "react";
import { FiUser, FiShoppingBag, FiLogOut, FiChevronDown, FiMenu } from "react-icons/fi";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { MdSell } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar, { PhoneNavbar } from "../components/Navbar";
import { useUser } from "../useContext/UserContext";

const DashboardSidebar = () => {
  const [isSellerDropdownOpen, setIsSellerDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUser();
  const email = user?.email;

  const { logOut } = useUser();

  const toggleSellerDropdown = () => {
    setIsSellerDropdownOpen(!isSellerDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogOut = () => {
    logOut(); 
    setIsSidebarOpen(false); 
  };

  return (
    <>
      <Navbar />
      <PhoneNavbar/>
      {/* Sidebar Toggle Button for Mobile */}
      <div className="flex  justify-between items-center bg-green-500 py-2 w-full fixed md:hidden z-50">
        <div className="pl-3 font-bold text-gray-800 text-lg">Dashboard</div>
        <button onClick={toggleSidebar} className="rounded-md pr-5 text-gray-800" aria-label="Toggle sidebar">
          <FiMenu className="text-3xl" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 md:mt-[72px] mt-10 bg-white shadow-md h-screen fixed transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-20`}
      >
        <div className="p-5">
          {/* User Info */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
              <FiUser className="text-2xl text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">{email}</h2>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link onClick={() => setIsSidebarOpen(false)}
              to="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FiUser />
              Profile
            </Link>

            <Link onClick={() => setIsSidebarOpen(false)}
              to="/dashboard/orders"
              className="flex items-center gap-3 w-full px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FiShoppingBag />
              Orders
            </Link>

            <Link onClick={() => setIsSidebarOpen(false)}
              to="/dashboard/wishlist"
              className="flex items-center gap-3 w-full px-4 py-3 lg:hidden rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FiHeart />
              Wishlist
            </Link>

            {/* Seller Dropdown */}
            <div>
              <button
                onClick={toggleSellerDropdown}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
                aria-expanded={isSellerDropdownOpen}
              >
                <span className="flex items-center gap-3">
                  <MdSell />
                  Seller
                </span>
                <FiChevronDown
                  className={`transform transition-transform ${
                    isSellerDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isSellerDropdownOpen && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link onClick={() => setIsSidebarOpen(false)}
                    to="/dashboard/sellproduct"
                    className="block px-4 py-2 w-full text-start text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Sell Product
                  </Link>
                  <Link onClick={() => setIsSidebarOpen(false)}
                    to="/dashboard/myproducts"
                    className="block px-4 py-2 w-full text-start text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    My Products
                  </Link>
                  <Link onClick={() => setIsSidebarOpen(false)}
                    to="/dashboard/analytics"
                    className="flex items-center gap-3 px-4 py-3 w-full text-start rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Analytics & Reports
                  </Link>
                </div>
              )}
            </div>

            <Link onClick={() => setIsSidebarOpen(false)}
              to="/dashboard/customersupport"
              className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-gray-700 hover:bg-gray-100"
            >
              <RiCustomerServiceFill />
              Customer Support
            </Link>

            <button
              onClick={handleLogOut}
              className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <FiLogOut/>
              Log Out
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;