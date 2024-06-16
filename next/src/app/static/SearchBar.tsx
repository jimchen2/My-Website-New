"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18n from "../i18n"; // Import the i18n instance

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation("header");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery}`);
    }
  };

  return (
    <div className="flex items-center ml-auto mr-4 md:mr-8">
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          className="px-4 py-2 rounded-full bg-gray-200 focus:outline-none"
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-white text-gray-800 rounded-full border border-gray-300"
        >
          {t("searchButton")}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
