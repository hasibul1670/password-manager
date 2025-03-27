import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#1a1b26] text-white shadow-lg font-['Fira_Code'] border-b border-[#2f3042]">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight hover:text-[#7aa2f7] transition-all duration-300 transform hover:scale-[1.02]"
          >
            🔐 Password Manager
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-[#2f3042] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7aa2f7]"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/passwords" className="">
              Passwords
            </Link>
            <Link to="/add-password" className="">
              Add Password
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          } md:hidden overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="pt-4 pb-3 space-y-3">
            <Link
              to="/passwords"
              className="block font-medium hover:bg-[#2f3042] px-3 py-2 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Passwords
            </Link>
            <Link
              to="/add-password"
              className="block font-medium hover:bg-[#2f3042] px-3 py-2 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Add Password
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;