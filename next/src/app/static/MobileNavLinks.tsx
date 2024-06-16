"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const linkStyle =
  "px-2 py-2 rounded hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1";
const hoverEffect = { hover: { scale: 1.05 } };

const MobileNav: React.FC = () => {
  const { t } = useTranslation("header");

  const navItems = [
    { href: "/about", label: t("about") },
    { href: "/self-host", label: t("selfHostedApps") },
  ];

  return (
    <div className="flex justify-center bg-white w-full text-center space-x-4 items-center">
      {[
        <motion.div key="/" whileHover={hoverEffect.hover}>
          <Link
            href="/"
            className="text-lg text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
          >
            {t("websiteName")}
          </Link>
        </motion.div>,
        ...navItems.map((item) => (
          <motion.div key={item.href} whileHover={hoverEffect.hover}>
            <Link
              href={item.href}
              className={`${linkStyle} text-black hover:text-gray-600 transition duration-300 ease-in-out`}
            >
              {item.label}
            </Link>
          </motion.div>
        )),
      ]}
    </div>
  );
};

export default MobileNav;
