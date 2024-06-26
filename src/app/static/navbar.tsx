"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import MobileSearchBar from "./MobileSearchBar";
import WebsiteTitle from "./WebsiteTitle";
import NavLinks from "./NavLinks";
import MobileNavLinks from "./MobileNavLinks";

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1050);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 z-50 overflow-hidden">
      {isMobile ? (
        <nav className="container px-4 py-3 flex flex-col items-center">
            <MobileNavLinks />
            <MobileSearchBar />
        </nav>
      ) : (
        <nav className="container mx-auto px-4 py-3 flex flex-row justify-between items-center">
          <WebsiteTitle />
          <NavLinks />
          <div className="flex-1 flex justify-end items-center">
            <SearchBar />
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
