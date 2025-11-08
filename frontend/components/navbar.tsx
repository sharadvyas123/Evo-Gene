"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-white font-bold text-xl">EvoGene</span>
          </div>

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

          {/* CTA Button */}
          <button className="hidden md:block px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>

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
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold w-full">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
