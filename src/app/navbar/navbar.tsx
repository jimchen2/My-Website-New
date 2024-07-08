"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery}`);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <NavBrand />
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
            <SearchForm 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              handleSearch={handleSearch} 
            />
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <NavLinks />
            <SearchForm 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              handleSearch={handleSearch} 
            />
          </div>
        )}
      </nav>
    </header>
  );
};

const NavBrand = () => (
  <Link href="/" className="text-lg p-2 hover:bg-gray-200 transition-colors duration-300">
    Jim Chen's Blog
  </Link>
);

const NavLinks = () => (
  <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
    <motion.li whileHover={{ scale: 1.05 }}>
      <Link href="https://link.jimchen.me" className="block px-2 py-2 rounded text-black hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
        LinkTree
      </Link>
    </motion.li>
  </ul>
);

const SearchForm = ({ searchQuery, setSearchQuery, handleSearch }) => (
  <form onSubmit={handleSearch} className="flex items-center mt-2 md:mt-0">
    <input
      type="text"
      className="h-10 rounded-l-full px-4 py-2 ring-2 ring-gray-200 hover:bg-gray-200 focus:outline-none w-full md:w-auto"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button
      type="submit"
      className="h-10 rounded-r-full bg-white px-4 py-2 text-gray-800 ring-2 ring-gray-200 hover:bg-gray-200"
    >
      Search
    </button>
  </form>
);

export default Navbar;