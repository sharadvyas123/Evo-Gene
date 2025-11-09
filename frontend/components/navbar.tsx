"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check for token in localStorage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    checkAuth();
    window.addEventListener("focus", checkAuth);
    return () => window.removeEventListener("focus", checkAuth);
  }, []);

  // ✅ Logout: remove token + refresh UI
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ✅ CLICKABLE LOGO */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-white font-bold text-xl">EvoGene</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">
              About
            </Link>
            <Link href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Features
            </Link>
            <Link href="#tech" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Tech Stack
            </Link>
          </div>

          {/* Auth Button — Login / Logout have same styling */}
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="#about" className="text-gray-300 hover:text-cyan-400">
              About
            </Link>
            <Link href="#features" className="text-gray-300 hover:text-cyan-400">
              Features
            </Link>
            <Link href="#tech" className="text-gray-300 hover:text-cyan-400">
              Tech Stack
            </Link>

            {!isLoggedIn ? (
              <Link
                href="/login"
                className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold w-full text-center hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold w-full hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
