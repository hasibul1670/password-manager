import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Password Manager</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/passwords" className="hover:text-gray-300">Passwords</Link>
          <Link to="/add-password" className="hover:text-gray-300">Add Password</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;