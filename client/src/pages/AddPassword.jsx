import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaKey, FaLink, FaTag, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCreatePasswordMutation } from '../store/feature/passwordApi';

const AddPassword = () => {
  
  const [createPassword] = useCreatePasswordMutation();
  const navigate = useNavigate();
  const categories = [
    'Personal',
    'Work',
    'Finance',
    'Social Media',
    'Shopping',
    'Travel',
  ]
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    category: 'Personal'
  });

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
  createPassword(formData)
    navigate('/passwords');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-3/5 mx-auto px-4 py-6 md:py-8"
      >
        <h1 className="text-2xl md:text-3xl font-black mb-4 md:mb-6 font-poppins bg-gradient-to-r from-blue-800 to-black bg-clip-text font-['JetBrains_Mono'] text-transparent">
          Add New Password
        </h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 md:space-y-6 bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-2xl shadow-xl border border-gray-200/50"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FaTag className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-200 bg-transparent text-gray-900 text-xl  font-['JetBrains_Mono'] placeholder-transparent peer focus:outline-none"
              required
            />
            <label className="absolute left-10 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm transition-all duration-300  font-['JetBrains_Mono']">
              Title
            </label>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FaUser className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-transparent peer focus:outline-none text-xl  font-['JetBrains_Mono']"
              required
            />
            <label className="absolute left-10 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm transition-all duration-300  font-['JetBrains_Mono']">
              Username
            </label>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FaKey className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-transparent peer focus:outline-none text-xl  font-['JetBrains_Mono']"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
            <label className="absolute left-10 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm transition-all duration-300 font-['JetBrains_Mono']">
              Password
            </label>
            <div className="mt-2 flex gap-1">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    index < passwordStrength
                      ? getStrengthColor()
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-3 border-b-2 border-gray-200 bg-transparent text-gray-900 appearance-none focus:outline-none font-['JetBrains_Mono']"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-white font-['JetBrains_Mono']"
                >
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FaLink className="w-5 h-5" />
            </div>
            <input
              type="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="URL"
              className="w-full pl-10 pr-3 py-3 border-b-2 border-gray-200 bg-transparent text-gray-900 placeholder-transparent peer focus:outline-none text-xl  font-['JetBrains_Mono']"
              required
            />
            <label className="absolute left-10 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-sm transition-all duration-300 font-['JetBrains_Mono']">
              URL
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-black text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
          >
            Save Password
          </motion.button>
        </form>
      </motion.div>
    </Layout>
  );
};

export default AddPassword;