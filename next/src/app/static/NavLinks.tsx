"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


const linkStyle =
  "px-2 py-2 rounded hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1";
const hoverEffect = {
  hover: { scale: 1.05 },
};

const NavLinks: React.FC = () => {
  const { t } = useTranslation("header");

  const navItems = [
    { href: "/about", label: t("about") },
    { href: "/self-host", label: t("selfHostedApps") },
  ];

  return (
    <ul className="flex space-x-4 bg-white">
      <span style={{ minWidth: "150px" }}></span>
      {navItems.map((item) => (
        <motion.li key={item.href} whileHover={hoverEffect.hover}>
          <Link
            href={item.href}
            className={`
              ${linkStyle} 
              text-black hover:text-gray-600 
              transition duration-300 ease-in-out
            `}
          >
            {item.label}
          </Link>
        </motion.li>
      ))}
    </ul>
  );
};

export default NavLinks;
