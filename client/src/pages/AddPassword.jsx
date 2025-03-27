import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { addPassword } from '../store/passwordSlice';

const AddPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.passwords.categories);
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    password: '',
    category: 'Personal',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPassword(formData));
    navigate('/passwords');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 font-poppins">Add New Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-gray-700 mb-2 font-inter">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded font-inter bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-inter">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded font-inter bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-inter">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded font-inter bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-inter">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded font-inter bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-inter">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded font-inter bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-inter text-base font-medium shadow-sm hover:shadow transition-all duration-200"
          >
            Save Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddPassword;