"use client";
import React from "react";
import SearchBar from "./SearchBar";
import WebsiteTitle from "./WebsiteTitle";
import NavLinks from "./NavLinks";

const Navbar: React.FC = () => {
  return (
    <header className="w-full bg-white dark:bg-gray-800 shadow-md fixed top-0 z-50 overflow-hidden">
      <nav className="container mx-auto px-4 py-3 flex flex-row justify-between items-center">
        <div >
          <WebsiteTitle />
        </div>
        <div>
          <NavLinks />
        </div>
        <div className="flex-1 flex justify-end items-center">
          <SearchBar />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
