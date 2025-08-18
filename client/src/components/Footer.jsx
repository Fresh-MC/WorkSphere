// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#CBA7B0] text-[#513934] py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand / Logo */}
        <div className="text-2xl font-heading font-bold">WORKSPHERE</div>

        {/* Navigation Links */}
        <ul className="flex gap-6 flex-wrap justify-center">
          <li className="cursor-pointer hover:text-[#B67679] transition-colors duration-300">Home</li>
          <li className="cursor-pointer hover:text-[#B67679] transition-colors duration-300">Services</li>
          <li className="cursor-pointer hover:text-[#B67679] transition-colors duration-300">Portfolio</li>
          <li className="cursor-pointer hover:text-[#B67679] transition-colors duration-300">Contact</li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-4">
          <FaFacebookF className="cursor-pointer hover:text-[#B67679] transition-colors duration-300" />
          <FaTwitter className="cursor-pointer hover:text-[#B67679] transition-colors duration-300" />
          <FaLinkedinIn className="cursor-pointer hover:text-[#B67679] transition-colors duration-300" />
          <FaInstagram className="cursor-pointer hover:text-[#B67679] transition-colors duration-300" />
        </div>
      </div>

      {/* Divider */}
      <div className="w-3/4 mx-auto border-t border-dotted border-[#513934] mt-8"></div>

      {/* Copyright */}
      <p className="text-center text-gray-800 mt-4 text-sm">
      All rights reserved by Lunar.
      </p>
    </footer>
  );
}
