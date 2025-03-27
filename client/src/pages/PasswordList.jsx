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
      <div className="w-11/12  mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-blue-200/30">
            <h3 className="text-xl font-semibold text-blue-800">
              Total Passwords
            </h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-green-200/30">
            <h3 className="text-xl font-semibold text-green-800">Personal</h3>
            <p className="text-3xl font-bold text-green-600">
              {stats.personal}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-yellow-200/30">
            <h3 className="text-xl font-semibold text-yellow-800">Work</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.work}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-purple-200/30">
            <h3 className="text-xl font-semibold text-purple-800">Finance</h3>
            <p className="text-3xl font-bold text-purple-600">
              {stats.finance}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight font-['Fira_Code'] ">
            Password Vault
          </h1>
          <Link
            to="/add-password"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-800 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 font-['Fira_Code'] "
          >
            <MdAddCircleOutline className="text-2xl mr-2" />
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
              className="bg-white overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-indigo-200"
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
                      <span className="text-sm sm:text-base font-medium text-gray-600">
                        Username
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(password.username, "username", password.id)
                        }
                        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 relative"
                        title="Copy username"
                      >
                        <FaRegCopy className="text-xl" />
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
                      className="text-gray-900 bg-gray-50/70 sm:p-3 rounded-lg backdrop-blur-sm font-['JetBrains_Mono'] font-semibold text-base"
                    >
                      {password.username}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-sm sm:text-base font-medium text-gray-600 font-inter">
                        URL
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(password.url, "url", password.id)
                        }
                        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200 relative"
                        title="Copy URL"
                      >
                        <FaRegCopy className="text-xl " />
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
                      className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200 block bg-gray-50/70 p-2 sm:p-3 rounded-lg backdrop-blur-sm hover:bg-white/80 font-['JetBrains_Mono'] font-semibold text-base"
                    >
                      {new URL(password.url).hostname}
                    </a>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-sm sm:text-base font-medium text-gray-600 font-inter">
                        Password
                      </span>
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
                        <FaRegCopy className="text-xl" />
                        {copiedField === `password-${password.id}` && (
                          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="relative w-full sm:w-3/4">
                      <input
                        type={showPassword[password.id] ? "text" : "password"}
                        value={decryptPassword(password.password)}
                        readOnly
                        className="w-full py-2 sm:py-2.5 px-3 pr-10 bg-gray-50 rounded-md text-base font-mono outline-none ring-0 focus:ring-0"
                      />
                      <button
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            [password.id]: !prev[password.id],
                          }))
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                        title={
                          showPassword[password.id]
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword[password.id] ? (
                          <FaRegEye className="text-lg sm:text-base" />
                        ) : (
                          <FaRegEyeSlash className="text-lg sm:text-base" />
                        )}
                      </button>
                    </div>
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
