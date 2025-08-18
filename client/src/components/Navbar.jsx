// src/components/Navbar.jsx
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full flex justify-center mt-4">
      <nav className="rounded-2xl bg-[#320E3B] font-body font-bold text-[#F5F5F5] px-6 py-4 flex items-center relative">
        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 justify-center w-full items-center">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/post-job" className="hover:underline">Services</Link>
          </li>
          <li>
            <Link to="/portfolio" className="hover:underline">Portfolio</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </li>
          
          {/* Show Post Job only if user is client */}
          {user?.role === "client" && (
            <li>
              <Link to="/post-job" className="hover:underline">Post Job</Link>
            </li>
          )}
          {/* Show Jobs link only if user is freelancer */}
{user?.role === "freelancer" && (
  <li>
    <Link to="/jobs" className="hover:underline">Jobs</Link>
  </li>
)}


          {/* Logout button */}
          {user && (
            <li>
              <button
                onClick={logout}
                className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden text-2xl cursor-pointer mt-2" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="absolute top-full left-0 w-full bg-[#320E3B] flex flex-col items-center gap-4 py-4 md:hidden">
            <li>
              <Link to="/" onClick={toggleMenu} className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/services" onClick={toggleMenu} className="hover:underline">Services</Link>
            </li>
            <li>
              <Link to="/portfolio" onClick={toggleMenu} className="hover:underline">Portfolio</Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleMenu} className="hover:underline">Contact</Link>
            </li>

            {user?.role === "client" && (
              <li>
                <Link to="/post-job" onClick={toggleMenu} className="hover:underline">Post Job</Link>
              </li>
            )}

            {user && (
              <li>
                <button
                  onClick={() => { logout(); toggleMenu(); }}
                  className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
}
