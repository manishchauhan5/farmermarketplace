import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import LandingPage from "./pages/Home/LandingPage";
import Notification from "./components/Notification";
import Login from "./pages/user/Login";
import SignUp from "./pages/user/SignUp";
import Forgot from "./pages/user/Forgot";
import ProductByCategory from "./products/ProductByCategory";
import OtpVerification from "./pages/user/OtpVerification";
import ProtectedLayout from "./components/ProtectedLayout";
import SingleProduct from "./products/SingleProduct";
import UserProfile from "./dashboard/UserProfile";
import MyOrder from "./dashboard/MyOrder";
import SellProduct from "./dashboard/SellProduct";
import MyAllProducts from "./dashboard/MyAllProducts";
import UpdateProduct from "./dashboard/UpdateProduct";
import Analytics from "./dashboard/Analytics";
import CustomerSupport from "./dashboard/CustomerSupport";
import Dashboard from "./dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="productcategory" element={<ProductByCategory />} />
            <Route path="singleproduct" element={<SingleProduct />} />
            <Route path="notifications" element={<Notification />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot" element={<Forgot />} />
            <Route path="otp" element={<OtpVerification />} />
          </Route>

          <Route path="/dashboard" element={<ProtectedLayout />}>
          {/* Dashboard Layout */}
          <Route element={<Dashboard />}>
            <Route index element={<UserProfile />} /> {/* Default route */}
            <Route path="profile" element={<UserProfile />} />
            <Route path="orders" element={<MyOrder />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="sellproduct" element={<SellProduct />} />
            <Route path="myproducts" element={<MyAllProducts />} />
            <Route path="updateproduct/:pid" element={<UpdateProduct />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="customersupport" element={<CustomerSupport />} />
          </Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

