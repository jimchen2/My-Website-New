"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const JimChenWebsite: React.FC = () => {
  const { t } = useTranslation("header");

  return (
    <>
      <Link
        href="/"
        className="text-lg text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
      >
        {t("websiteName")}
      </Link>
    </>
  );
};

export default JimChenWebsite;
