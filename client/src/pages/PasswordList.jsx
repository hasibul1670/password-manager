import CryptoJS from "crypto-js";
import React, { useState } from "react";
import {
  FaEdit,
  FaRegCopy,
  FaRegEye,
  FaRegEyeSlash,
  FaSearch,
} from "react-icons/fa";
import { MdAddCircleOutline, MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import {
  deletePassword,
  setSearchTerm,
  setSelectedCategory,
} from "../store/passwordSlice";
const PasswordList = () => {
  const dispatch = useDispatch();
  const { passwords, categories, searchTerm, selectedCategory } = useSelector(
    (state) => state.passwords
  );
  const [showPassword, setShowPassword] = useState({});
  const [copiedField, setCopiedField] = useState(null);

  const decryptPassword = (encryptedPassword) => {
    const bytes = CryptoJS.AES.decrypt(
      encryptedPassword,
      import.meta.env.VITE_ENCRYPTION_KEY || "default-key"
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleCopy = (text, field, id) => {
    navigator.clipboard.writeText(text);
    setCopiedField(`${field}-${id}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this password?")) {
      dispatch(deletePassword(id));
    }
  };

  const filteredPasswords = passwords
    .filter(
      (password) =>
        selectedCategory === "All" || password.category === selectedCategory
    )
    .filter(
      (password) =>
        password.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        password.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const stats = {
    total: passwords.length,
    personal: passwords.filter((p) => p.category === "Personal").length,
    work: passwords.filter((p) => p.category === "Work").length,
    finance: passwords.filter((p) => p.category === "Finance").length,
    social: passwords.filter((p) => p.category === "Social").length,
  };
  return (
    <Layout>
      <div className="w-11/12 mx-auto lg:px-8 py-6 md:space-y-4 space-y-3">
        <div className="grid grid-cols-4 md:gap-4 gap-1 font-['JetBrains_Mono']">
          <div
            onClick={() => dispatch(setSelectedCategory("All"))}
            className="bg-gradient-to-br from-blue-50 to-blue-400 p-2 rounded-lg shadow-sm hover:shadow-md duration-300 border border-blue-200/30 cursor-pointer hover:scale-105 transform transition-transform"
          >
            <h3 className="md:text-xl text-xs font-semibold text-blue-800 truncate">
              Total
            </h3>
            <p className="md:text-xl text-xs font-bold text-blue-600">
              {stats.total}
            </p>
          </div>
          <div
            onClick={() => dispatch(setSelectedCategory("Personal"))}
            className="bg-gradient-to-br from-green-50 to-green-400 p-2 rounded-lg shadow-sm hover:shadow-md duration-300 border border-green-200/30 cursor-pointer hover:scale-105 transform transition-transform"
          >
            <h3 className="md:text-xl text-xs  font-semibold text-green-800 truncate">
              Personal
            </h3>
            <p className="md:text-xl text-xs  font-bold text-green-600">
              {stats.personal}
            </p>
          </div>
          <div
            onClick={() => dispatch(setSelectedCategory("Work"))}
            className="bg-gradient-to-br from-yellow-50 to-yellow-300 p-2 rounded-lg shadow-sm hover:shadow-md duration-300 border border-yellow-200/30 cursor-pointer hover:scale-105 transform transition-transform"
          >
            <h3 className="md:text-xl text-xs  font-semibold text-yellow-800 truncate">
              Work
            </h3>
            <p className="md:text-xl text-xs font-bold text-yellow-600">
              {stats.work}
            </p>
          </div>
          <div
            onClick={() => dispatch(setSelectedCategory("Finance"))}
            className="bg-gradient-to-br from-purple-50 to-purple-300 p-2 rounded-lg shadow-sm hover:shadow-md duration-300 border border-purple-200/30 cursor-pointer hover:scale-105 transform transition-transform"
          >
            <h3 className="md:text-xl text-xs  font-semibold text-purple-800 truncate">
              Finance
            </h3>
            <p className="md:text-xl text-xs font-bold text-purple-600">
              {stats.finance}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-sm md:text-2xl font-black font-poppins bg-gradient-to-r from-blue-800 to-black bg-clip-text font-['JetBrains_Mono'] text-transparent">
            Password Vault
          </h1>
          <Link
            to="/add-password"
            className="text-xs md:text-base flex justify-center items-center px-2 py-2 md:px-6 md:py-3 border border-transparent font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-800 to-black hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 font-['Fira_Code'] "
          >
            <MdAddCircleOutline className="md:text-2xl text-xl mr-2" />
            Add New Password
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search passwords..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50 hover:bg-white transition-colors duration-200"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </div>
          <select
            className="block  font-['JetBrains_Mono'] w-full sm:w-48 py-3 pl-3 pr-10 text-sm border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg bg-gray-50 hover:bg-white transition-colors duration-200"
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

        <div className="space-y-4 sm:space-y-4">
          {filteredPasswords.map((password) => (
            <div
              key={password.id}
              className="bg-gradient-to-r bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-200"
            >
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                  <h3 className="text-lg sm:text-xl font-['JetBrains_Mono'] font-semibold text-gray-900 tracking-tight">
                    {password.title}
                  </h3>
                  <div className="flex items-center justify-start sm:justify-end gap-4 w-full sm:w-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100/80 text-indigo-800 backdrop-blur-sm border border-indigo-200/30">
                      {password.category}
                    </span>

                    <Link
                      to={`/edit-password/${password.id}`}
                      className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                      <FaEdit className="text-lg sm:text-base" />
                    </Link>
                    <button
                      onClick={() => handleDelete(password.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <MdDeleteOutline className="text-lg sm:text-base" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs sm:text-sm font-medium text-gray-600">
                        Username
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(password.username, "username", password.id)
                        }
                        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 relative"
                        title="Copy username"
                      >
                        <FaRegCopy className="text-lg sm:text-xl" />
                        {copiedField === `username-${password.id}` && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                    <p
                      onClick={() =>
                        handleCopy(password.username, "username", password.id)
                      }
                      className="text-gray-900 bg-gray-50/70 p-2 sm:p-3 rounded-lg backdrop-blur-sm font-['JetBrains_Mono'] font-semibold text-sm sm:text-base"
                    >
                      {password.username}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-xs sm:text-sm font-medium text-gray-600 font-inter">
                        URL
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(password.url, "url", password.id)
                        }
                        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 relative"
                        title="Copy URL"
                      >
                        <FaRegCopy className="text-base sm:text-lg" />
                        {copiedField === `url-${password.id}` && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] sm:text-xs py-1 px-2 rounded">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                    <p
                      onClick={() =>
                        handleCopy(password.url, "url", password.id)
                      }
                      className="text-gray-900 bg-gray-50/70 p-2 sm:p-3 rounded-lg backdrop-blur-sm font-['JetBrains_Mono'] font-semibold text-xs sm:text-sm"
                    >
                      {password.url}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] sm:text-xs font-medium text-gray-600">
                        Password
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(
                            showPassword[password.id]
                              ? decryptPassword(password.password)
                              : "********",
                            "password",
                            password.id
                          )
                        }
                        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 relative"
                        title="Copy password"
                      >
                        <FaRegCopy className="text-base sm:text-lg" />
                        {copiedField === `password-${password.id}` && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] sm:text-xs py-1 px-2 rounded">
                            Copied!
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            [password.id]: !showPassword[password.id],
                          })
                        }
                        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                        title={
                          showPassword[password.id]
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword[password.id] ? (
                          <FaRegEyeSlash className="text-base sm:text-lg" />
                        ) : (
                          <FaRegEye className="text-base sm:text-lg" />
                        )}
                      </button>
                    </div>
                    <p
                      onClick={() =>
                        handleCopy(
                          showPassword[password.id]
                            ? decryptPassword(password.password)
                            : "********",
                          "password",
                          password.id
                        )
                      }
                      className="text-gray-900 bg-gray-50/70 p-2 sm:p-3 rounded-lg backdrop-blur-sm font-['JetBrains_Mono'] font-semibold text-[10px] sm:text-sm"
                    >
                      {showPassword[password.id]
                        ? decryptPassword(password.password)
                        : "********"}
                    </p>
                  </div>
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
