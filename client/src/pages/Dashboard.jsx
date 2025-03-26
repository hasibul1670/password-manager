import React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';

const Dashboard = () => {
  const passwords = useSelector((state) => state.passwords.passwords);

  const stats = {
    total: passwords.length,
    personal: passwords.filter((p) => p.category === 'Personal').length,
    work: passwords.filter((p) => p.category === 'Work').length,
    finance: passwords.filter((p) => p.category === 'Finance').length,
    social: passwords.filter((p) => p.category === 'Social').length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-blue-800">Total Passwords</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-green-800">Personal</h3>
            <p className="text-3xl font-bold text-green-600">{stats.personal}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-yellow-800">Work</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.work}</p>
          </div>
          <div className="bg-purple-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-purple-800">Finance</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.finance}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Recent Passwords</h2>
          <div className="space-y-4">
            {passwords.slice(0, 5).map((password) => (
              <div key={password.id} className="border-b pb-2">
                <h3 className="font-semibold">{password.title}</h3>
                <p className="text-gray-600">{password.username}</p>
                <p className="text-sm text-gray-500">{password.category}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;