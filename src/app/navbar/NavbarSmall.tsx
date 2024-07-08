import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const NavBrand: React.FC = () => (
  <div className="text-lg p-2 hover:bg-gray-200 transition-colors duration-300 cursor-pointer">
    Jim Chen's Blog
  </div>
);

const NavLinks: React.FC = () => (
  <div className="flex items-center">
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link href="https://link.jimchen.me" className="text-lg p-2 hover:bg-gray-200 transition-colors duration-300">
        My LinkTree
      </Link>
    </motion.div>
  </div>
);

interface SearchFormProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ searchQuery, setSearchQuery, handleSearch, setIsSearchOpen }) => (
  <form onSubmit={handleSearch} className="flex items-center w-full">
    <input
      type="text"
      className="h-10 rounded-l-full px-4 py-2 ring-2 ring-gray-200 hover:bg-gray-200 focus:outline-none flex-grow"
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
    <button
      type="button"
      onClick={() => setIsSearchOpen(false)}
      className="ml-2 p-2 hover:bg-gray-200 rounded-full"
    >
      ✖
    </button>
  </form>
);

const NavbarSmall: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery}`);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {!isSearchOpen && (
            <div className="flex items-center space-x-4">
              <NavBrand />
              <NavLinks />
            </div>
          )}
          <div className="flex items-center">
            {isSearchOpen ? (
              <SearchForm 
                searchQuery={searchQuery} 
                setSearchQuery={setSearchQuery} 
                handleSearch={handleSearch}
                setIsSearchOpen={setIsSearchOpen}
              />
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                🔍
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarSmall;