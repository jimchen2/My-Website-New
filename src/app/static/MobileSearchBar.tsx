"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

const MobileSearchBar = () => {
  const [query, setQuery] = useState("");
  const { t } = useTranslation("header");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search/${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex mt-4 px-4 items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="w-full bg-gray-200 py-2 px-4 rounded-l-full focus:outline-none"
      />
      <button type="submit" className="bg-white text-gray-800 ring-2 ring-gray-200 px-4 py-2.5 rounded-r-full flex items-center justify-center">
        <FaSearch />
      </button>
    </form>
  );
};

export default MobileSearchBar;
