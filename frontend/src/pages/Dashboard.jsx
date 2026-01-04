// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center text-white p-6">
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌟 Welcome to Your Dashboard
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        {/* Insurance Card */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard/insurance')}
          className="cursor-pointer bg-gradient-to-br from-blue-600 to-indigo-800 shadow-2xl rounded-2xl p-8 text-center hover:shadow-blue-400/40 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-2">🏢 Insurance Dashboard</h2>
          <p className="text-gray-200">Manage claims and policies.</p>
        </motion.div>

        {/* Patient Card */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard/patient')}
          className="cursor-pointer bg-gradient-to-br from-green-600 to-emerald-800 shadow-2xl rounded-2xl p-8 text-center hover:shadow-green-400/40 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-2">🧍‍♂️ Patient Dashboard</h2>
          <p className="text-gray-200">Track health and claim requests.</p>
        </motion.div>

        {/* TPA Card */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard/tpa')}
          className="cursor-pointer bg-gradient-to-br from-purple-600 to-violet-800 shadow-2xl rounded-2xl p-8 text-center hover:shadow-purple-400/40 transition-all duration-300"
        >
          <h2 className="text-2xl font-bold mb-2">🤝 TPA Dashboard</h2>
          <p className="text-gray-200">Approve and process patient claims.</p>
        </motion.div>
      </motion.div>

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-600 rounded-xl font-semibold hover:bg-red-700 shadow-lg transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
