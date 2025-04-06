import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import {
  FaSearch,
  FaUserCircle,
  FaRegUserCircle,
  FaShopify,
} from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { useUser } from "../useContext/UserContext";
import farmer_logo from "../assets/images/farmer_logo.png";
import { useWishlist } from "../useContext/WishlistContext";
import { useCart } from "../useContext/CartContext";
import { useSearch } from "../useContext/SearchContext";

export const Navbar = () => {
  const { wishlistCount } = useWishlist();
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const cities = ["Pune", "Mumbai", "Nagpur", "Thane", "Nashik"];
  const [selectedCity, setSelectedCity] = useState("");
  const { user } = useUser();
  const name = user?.name;
  const [isLogin, setIsLogin] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { searchTerm, setSearchTerm } = useSearch();

  const isDashboard = location.pathname.includes("dashboard");

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleScroll = () => {
    if (isDashboard) return;

    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setIsNavbarVisible(false);
    } else {
      // Scrolling up
      setIsNavbarVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  const handleLoginRedirect = () => {
    navigate("/login", { state: { from: location.pathname } });
  };

  useEffect(() => {
    if (!isDashboard) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isDashboard]);

  return (
    <nav
      className={`w-full fixed top-0 z-50 bg-slate-100 shadow-md transition-transform duration-1000 ${
        isDashboard
          ? "transform-none"
          : isNavbarVisible
          ? "transform-none"
          : "-translate-y-full"
      }`}
    >
      <div className="justify-between items-center h-[75px] px-4 md:px-16 hidden lg:flex">
        <div>
          <NavLink to="/">
            <img src={farmer_logo} alt="logo" className="h-28 w-28 rounded" />
          </NavLink>
        </div>
        <div className="flex items-center space-x-10 lg:ml-[-100px]">
          <div className="flex items-center">
            <FaLocationDot className="h-6 w-6 text-gray-500 mr-2" />
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="p-1.5 border-gray-300 rounded-md shadow-sm text-gray-500 text-lg border-2 focus:outline-none focus:border-green-600"
            >
              <option value="" disabled>
                Select a city
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            {/* Search input field */}
            <NavLink to="search">
            <input            
              type="text"
              placeholder="Search products..."
              className="rounded pl-6 pr-12 py-1 shadow-sm text-black text-lg border-2 focus:outline-none focus:border-green-600 w-64 md:w-96"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaSearch />
            </div>
            </NavLink>
          </div>

          <div className="">
            <NavLink to="/">
              <div className="font-medium text-lg border-2 rounded px-4 py-1 shadow-sm flex items-center gap-1">
                <FaShopify className="text-green-500" />
                Products
              </div>
            </NavLink>
          </div>
        </div>

        <div className="flex items-center space-x-6 md:space-x-16">
          <div className="relative flex items-center">
            <NavLink to="/notifications">
              <IoNotificationsCircleOutline className="w-9 h-9 rotate-[25deg]" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </NavLink>
          </div>

          <div className="relative flex items-center">
            <NavLink to="/wishlist">
              <FiHeart className="w-6 h-6" />
              <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            </NavLink>
          </div>

          <div className="relative flex items-center">
            <NavLink to="/cart">
              <FiShoppingCart className="w-7 h-7" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </NavLink>
          </div>

          {user ? (
            <div className="flex items-center">
              <NavLink to="/dashboard">
                <div className="flex flex-col justify-center items-center text-gray-700 hover:text-gray-800">
                  <FaUserCircle className="w-7 h-6" />
                  <h3 className="text-sm font-semibold">user</h3>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center">
              <button onClick={handleLoginRedirect}>
                <div className="flex flex-col justify-center items-center text">
                  <FaRegUserCircle className="w-6 h-6" />
                  <h3 className="text-sm font-semibold">Login</h3>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export const PhoneNavbar = () => {
  const { cartCount } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const name = user?.name;


  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* Bottom Navigation */}
      <div className="lg:hidden ">
        <div className="flex justify-between items-center fixed z-50 bottom-0 border-t-2 border-gray-300 w-full bg-white shadow-md py-2 px-8">
          <NavLink to="/">
            <GoHomeFill className="text-2xl h-7 w-7 text-gray-800" />
          </NavLink>

          <NavLink to="/search">
            <FaSearch className="text-xl h-6 w-6 text-gray-800" />
          </NavLink>

          {/* notification */}
          <div className="relative flex items-center">
            <NavLink to="/notifications">
              <IoNotificationsCircleOutline className="w-9 h-9 text-gray-800 md:rotate-[25deg]" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </NavLink>
          </div>

          {/* cart */}
          <div className="relative flex items-center">
            <NavLink to="/cart">
              <FiShoppingCart className="w-7 h-7 text-gray-800" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            </NavLink>
          </div>

          {/* dashboard */}
          {user ? (
            <div className="flex items-center">
              <NavLink to="/dashboard">
                <div className="flex flex-col justify-center items-center text-gray-800 hover:text-gray-900">
                  <FaUserCircle className="w-7 h-6 text-green-700" />
                  <h3 className="text-sm font-semibold">user</h3>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center">
              <button onClick={handleLoginRedirect}>
                <div className="flex flex-col justify-center text-gray-800 items-center">
                  <FaRegUserCircle className="w-6 h-6" />
                  <h3 className="text-sm font-semibold">Login</h3>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// searchbar

export const PhoneHeader = () => {
  const cities = ["Pune", "Mumbai", "Nagpur", "Thane", "Nashik"];
  const [selectedCity, setSelectedCity] = useState("");

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };
  return (
    <>
      <nav className="fixed top-0 z-50 flex justify-between items-center h-14 bg-white shadow-md w-full px-4 lg:hidden">
      {/* Logo */}
      <NavLink to="/" className="flex items-center">
        
        <h1 className="text-xl font-bold text-green-700 drop-shadow-md">
          Farmer <span className="text-yellow-500">Market</span>
        </h1>
      </NavLink>

      {/* Location Selector */}
      <div className="flex items-center space-x-1">
        <FaLocationDot className="h-5 w-5 text-gray-500" />
        <div className="relative">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="p-1 border-gray-300 rounded shadow-sm text-gray-700 text-sm border focus:outline-none 
                       w-20 bg-gray-100"
          >
            <option value="" disabled className="text-xs">
              Select
            </option>
            {cities.map((city, index) => (
              <option key={index} value={city} className="text-xs">
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
