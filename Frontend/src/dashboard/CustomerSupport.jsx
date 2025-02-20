import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [charCount, setCharCount] = useState(0);
  const maxChar = 500; // Max character count for message

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message") setCharCount(value.length);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setCharCount(0);
  };

  return (
    <>
    <div className="md:mt-[76px] mt-12 p-2">    
    <div className="min-h-screen pb-16 md:pb-0">
      <h2 className="md:text-3xl text-2xl font-bold text-center text-black md:mb-6 mb-3">Help ?</h2>

      <div className="bg-white shadow-lg md:p-6 p-4 rounded-lg  mx-auto">
        {/* Contact Information */}
        <div className="bg-gray-100 p-3 md:p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">📞 Contact Us</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <FiPhone className="text-lg text-blue-500" />
              <span>+91 7563086449</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className=" text-blue-500" />
              <span>mkchauhan300@gmail.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FiMapPin className="text-lg text-blue-500" />
              <span>Wagholi, Pune, India</span>
            </li>
          </ul>

          {/* Additional Contact Options */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <Link
              to="https://wa.me/917563086449"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition"
            >
              <FaWhatsapp className="text-2xl" /> WhatsApp Chat
            </Link>
            <Link
              to="https://www.instagram.com/manish_j4u/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-500 hover:text-pink-700 transition"
            >
              <FaSquareInstagram className="text-2xl" /> Instagram
            </Link>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Form Section */}
        <p className="text-center text-gray-600 mb-6">
          Have a question? Fill out the form below and we'll respond soon! 😊
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-semibold text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
              placeholder="Your Name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
              placeholder="Your Email"
              required
            />
          </div>

          <div>
            <label htmlFor="subject" className="block font-semibold text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
              placeholder="Subject of Inquiry"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-semibold text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none resize-none"
              placeholder="Write your message here..."
              rows="5"
              maxLength={maxChar}
              required
            ></textarea>
            <p className="text-right text-sm text-gray-500">
              {charCount}/{maxChar} characters
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>

        {/* FAQ Section */}
        <div className="mt-10">
          <h3 className="md:text-xl text-medium font-semibold mb-4">❓ Frequently Asked Questions</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <details className="mb-2">
              <summary className="cursor-pointer md:font-medium text-blue-600">
                How long does it take to get a response?
              </summary>
              <p className="text-gray-600 mt-2">
                Our team usually responds within 24-48 hours.
              </p>
            </details>

            <details className="mb-2">
              <summary className="cursor-pointer font-medium text-blue-600">
                Can I change my order after placing it?
              </summary>
              <p className="text-gray-600 mt-2">
                Yes, you can request modifications within 12 hours of placing the order.
              </p>
            </details>

            <details>
              <summary className="cursor-pointer font-medium text-blue-600">
                Do you offer refunds?
              </summary>
              <p className="text-gray-600 mt-2">
                Yes, refunds are processed for eligible requests within 7 days.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default CustomerSupport;