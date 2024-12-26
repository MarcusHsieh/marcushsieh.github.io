"use client";

import { motion } from "framer-motion";

export default function TopHeader() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-white py-4 fixed w-full z-50 shadow-md backdrop-blur-md bg-gray-900/70 border-b border-gray-700"
    >
      <nav className="container mx-auto flex justify-center gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('technical')}
          className="hover:text-gray-400 transition-all duration-250"
        >
          Technical Portfolio
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('mechanical')}
          className="hover:text-gray-400 transition-all duration-250"
        >
          Mechanical Portfolio
        </motion.button>
      </nav>
    </motion.header>
  );
}
