"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function TopHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-white py-3 fixed w-full z-50 shadow-md backdrop-blur-md bg-gray-900/70 border-b border-gray-700"
    >
      <nav className="container mx-auto flex items-center justify-between gap-6 px-4">
        <div className="flex items-center">
          <Image
            src="/MH.ico"
            alt="MH"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-12 sm:h-12 mr-2 sm:mr-4"
          />
          <span className="text-lg sm:text-xl font-semibold">Marcus Hsieh</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('projects')}
            className="hover:text-gray-400 transition-all duration-250"
          >
            Projects
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="hover:text-gray-400 transition-all duration-250"
          >
            Contact
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left px-4 py-3 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              Projects
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-4 py-3 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              Contact
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
