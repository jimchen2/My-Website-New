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
        className="text-lg p-2 hover:bg-gray-200 transition-colors duration-300 block"
      >
        {t("websiteName")}
      </Link>
    </>
  );
};

export default JimChenWebsite;
