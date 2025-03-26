import CryptoJS from 'crypto-js';
import React, { useState } from 'react';
import { FaEdit, FaRegCopy, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { deletePassword, setSearchTerm, setSelectedCategory } from '../store/passwordSlice';

const PasswordList = () => {
  const dispatch = useDispatch();
  const { passwords, categories, searchTerm, selectedCategory } = useSelector((state) => state.passwords);
  const [showPassword, setShowPassword] = useState({});
  const [copiedField, setCopiedField] = useState(null);

  const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, import.meta.env.VITE_ENCRYPTION_KEY || 'default-key');
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleCopy = (text, field, id) => {
    navigator.clipboard.writeText(text);
    setCopiedField(`${field}-${id}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this password?')) {
      dispatch(deletePassword(id));
    }
  };

  const filteredPasswords = passwords
    .filter((password) => 
      selectedCategory === 'All' || password.category === selectedCategory
    )
    .filter((password) =>
      password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Layout>
      <div className="max-w-7xl mt-5">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Password Vault
          </h1>
          <Link
            to="/add-password"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add New Password
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search passwords..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
          <select
            className="block w-full sm:w-48 py-3 pl-3 pr-10 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg text-sm"
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredPasswords.map((password) => (
            <div
              key={password.id}
              className="bg-white overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {password.title}
                  </h3>
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit-password/${password.id}`}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(password.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        Username
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(password.username, "username", password.id)
                        }
                        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 relative"
                        title="Copy username"
                      >
                        <FaRegCopy />
                        {copiedField === `username-${password.id}` && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                      {password.username}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        URL
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(password.url, "url", password.id)
                        }
                        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 relative"
                        title="Copy URL"
                      >
                        <FaRegCopy />
                        {copiedField === `url-${password.id}` && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                    <a
                      href={password.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200 block bg-gray-50 p-2 rounded font-mono"
                    >
                      {new URL(password.url).hostname}
                    </a>
                  </div>
                </div>
                <div className="relative">
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3">
                    <input
                      type={showPassword[password.id] ? "text" : "password"}
                      value={decryptPassword(password.password)}
                      readOnly
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-mono"
                    />
                    <button
                      onClick={() =>
                        handleCopy(
                          decryptPassword(password.password),
                          "password",
                          password.id
                        )
                      }
                      className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 relative"
                      title="Copy password"
                    >
                      <FaRegCopy />
                      {copiedField === `password-${password.id}` && (
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded">
                          Copied!
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          [password.id]: !prev[password.id],
                        }))
                      }
                      className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                      title={
                        showPassword[password.id]
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                        {showPassword[password.id] ? (
                          <FaRegEye />
                        ) : (
                          <FaRegEyeSlash />
                        )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {password.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PasswordList;

