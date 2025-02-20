import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Connecting farmers directly to consumers, bringing fresh and organic produce to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><NavLink to="/" className="hover:text-green-300">Home</NavLink></li>
              <li><NavLink to="/" className="hover:text-green-300">Products</NavLink></li>
              <li><NavLink to="/" className="hover:text-green-300">About</NavLink></li>
              <li><NavLink to="/" className="hover:text-green-300">Contact</NavLink></li>
            </ul>
          </div>

          {/* Social Media and Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <NavLink to="https://facebook.com" className="hover:text-green-300">
                <FaFacebook className="text-2xl" />
              </NavLink>
              <NavLink to="https://twitter.com" className="hover:text-green-300">
                <FaTwitter className="text-2xl" />
              </NavLink>
              <NavLink to="https://instagram.com" className="hover:text-green-300">
                <FaInstagram className="text-2xl" />
              </NavLink>
              <NavLink to=  "mailto:info@farmermarket.com" className="hover:text-green-300">
                <FaEnvelope className="text-2xl" />
              </NavLink>
            </div>
            <p className="mt-4 text-sm">Email: info@farmermarket.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-700 mt-8 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Farmer Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;