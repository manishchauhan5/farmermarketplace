import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white lg:py-3 py-1 pb-[70px] lg:pb-2">
      <div className="container mx-auto px-4 lg:px-10">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold lg:mb-3">About Us</h3>
            <p className="text-xs md:text-sm text-gray-200">
              At Farmer Market, we bridge the gap between farmers and consumers, delivering fresh, organic produce straight to your doorstep. Our mission is to support local agriculture and promote sustainable living.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="gap-x-5 flex justify-center text-center items-center ">
              <li>
                <NavLink to="/" className="text-xs md:text-sm hover:text-green-300 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="text-xs md:text-sm hover:text-green-300 transition-colors">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="text-xs md:text-sm hover:text-green-300 transition-colors">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="text-xs md:text-sm hover:text-green-300 transition-colors">
                  Contact
                </NavLink>
              </li>
            </ul>
            </div>
            <div className="lg:mt-2 text-yellow-400 font-bold">
              <div>Design & developed by manish chauhan </div>
               <div className="text-white underline">
               <NavLink  to="https://manish-portfolio5.netlify.app/" > 
                visit my website
                </NavLink>
               </div>
            </div>
          </div>

          {/* Social Media and Contact */}
          <div className="text-center md:text-right">
            <h3 className="lg:text-lg font-semibold mb-1 lg:mb-3">Connect With Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <NavLink
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <FaFacebook className="text-xl" />
              </NavLink>
              <NavLink
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </NavLink>
              <NavLink
                to="https://www.instagram.com/manish_j4u/profilecard/?igsh=NGo4ZzFmcjY2ZHg2"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-300 transition-colors"
              >
                <FaInstagram className="text-xl" />
              </NavLink>
              <NavLink
                to="mailto:mkchauhan300@gmail.com"
                className="hover:text-green-300 transition-colors"
              >
                <FaEnvelope className="text-xl" />
              </NavLink>
            </div>
            <p className="lg:mt-3 mt-2 text-xs md:text-sm text-gray-200">
              Email: mkchauhan300@gmail.com
            </p>
            <p className="text-xs md:text-sm text-gray-200">
              Phone: +91 7563086449
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-600 mt-3 pt-2 text-center">
          <p className="text-xs md:text-sm text-gray-200">
            &copy; {new Date().getFullYear()} Farmer Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;