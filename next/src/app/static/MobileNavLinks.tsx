"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const linkStyle =
  "block px-2 py-2 text-lg text-gray-800 dark:text-white rounded transition-all duration-300 ease-in-out transform hover:bg-gray-200 hover:scale-105";

const MobileNav: React.FC = () => {
  const { t } = useTranslation("header");

  const navItems = [
    { href: "/about", label: t("about") },
    { href: "/self-host", label: t("mobileselfHostedApps") },
  ];

  return (
    <div className="flex justify-center bg-white w-full text-center space-x-4 items-center">
      {[
        <motion.div key="/" whileHover={{ scale: 1.05 }}>
          <Link href="/" className={linkStyle}>
            {t("websiteName")}
          </Link>
        </motion.div>,
        ...navItems.map((item) => (
          <motion.div key={item.href} whileHover={{ scale: 1.05 }}>
            <Link href={item.href} className={linkStyle}>
              {item.label}
            </Link>
          </motion.div>
        )),
      ]}
    </div>
  );
};

export default MobileNav;
