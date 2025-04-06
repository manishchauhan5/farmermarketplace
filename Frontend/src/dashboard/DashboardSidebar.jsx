import React, { useState, useRef, useEffect } from "react";
import { FiUser, FiShoppingBag, FiLogOut, FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { RiCustomerServiceFill } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { MdSell } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import Navbar, { PhoneNavbar } from "../components/Navbar";
import { useUser } from "../useContext/UserContext";

const DashboardSidebar = () => {
  const [isSellerDropdownOpen, setIsSellerDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut } = useUser();
  const email = user?.email;
  const sidebarRef = useRef(null);
  const location = useLocation();  

  const toggleSellerDropdown = () => {
    setIsSellerDropdownOpen(!isSellerDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path ? "bg-green-100 text-green-500 font-semibold" : "text-gray-700";

  return (
    <>
      <Navbar />
      <PhoneNavbar />

      <div className="flex justify-between items-center border-b-2 bg-white py-2 w-full fixed lg:hidden z-50">
        <div className="pl-3 font-bold text-blue-500 text-xl">Dashboard</div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="rounded-md pr-5 text-gray-800">
          {isSidebarOpen ? <FiX className="text-4xl bg-gray-300 font-bold p-1 rounded-lg" /> : <FiMenu className="text-4xl font-bold rounded-md bg-gray-300 p-1" />}
        </button>
      </div>

      <aside
        ref={sidebarRef}
        className={`w-64 md:mt-[72px] mt-10 bg-white shadow-md h-screen fixed transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-20`}
      >
        <div className="p-5">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
              <FiUser className="text-2xl text-purple-600" />
            </div>
            <h2 className="text-sm font-semibold text-gray-700">{email}</h2>
          </div>

          <nav className="space-y-2">
            <Link to="/dashboard/profile" className={`flex border items-center gap-3 px-4 py-3 w-full rounded-md hover:bg-gray-100 ${isActive("/dashboard/profile")}`}>
              <FiUser />
              Profile
            </Link>

            <Link to="/dashboard/orders" className={`flex border items-center gap-3 w-full px-4 py-3 rounded-md hover:bg-gray-100 ${isActive("/dashboard/orders")}`}>
              <FiShoppingBag />
              Orders
            </Link>

            <Link to="/dashboard/wishlist" className={`flex border items-center gap-3 w-full px-4 py-3 lg:hidden rounded-md hover:bg-gray-100 ${isActive("/dashboard/wishlist")}`}>
              <FiHeart />
              Wishlist
            </Link>

            <div>
              <button
                onClick={toggleSellerDropdown}
                className="flex items-center justify-between w-full px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <span className="flex items-center gap-3">
                  <MdSell />
                  Seller
                </span>
                <FiChevronDown className={`transform transition-transform ${isSellerDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isSellerDropdownOpen && (
                <div className="ml-6 mt-2 space-y-2">
                  <Link to="/dashboard/sellproduct" className={`block border px-4 py-2 w-full text-start rounded-md hover:bg-gray-100 ${isActive("/dashboard/sellproduct")}`}>
                    Sell Product
                  </Link>
                  <Link to="/dashboard/myproducts" className={`block border px-4 py-2 w-full text-start rounded-md hover:bg-gray-100 ${isActive("/dashboard/myproducts")}`}>
                    My Products
                  </Link>
                  <Link to="/dashboard/analytics" className={`flex border items-center gap-3 px-4 py-3 w-full text-start rounded-md hover:bg-gray-100 ${isActive("/dashboard/analytics")}`}>
                    Analytics & Reports
                  </Link>
                </div>
              )}
            </div>

            <Link to="/dashboard/customersupport" className={`flex border items-center gap-3 px-4 py-3 w-full rounded-md hover:bg-gray-100 ${isActive("/dashboard/customersupport")}`}>
              <RiCustomerServiceFill />
              Customer Support
            </Link>

            <button onClick={logOut} className="flex text-orange-500 items-center gap-3 px-4 py-3 rounded-md hover:bg-gray-100 w-full text-left">
              <FiLogOut />
              Log Out
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
