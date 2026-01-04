// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; 

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/register',
        form
      );
      setMsg(res.data?.message || 'Registration completed!');
      setForm({ name: '', email: '', password: '', role: 'Patient' });
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center px-4">
      {/* ✅ Back Button */}
            <Link
              to="/"
              className="absolute top-6 left-6 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition"
            >
              ← Back to Home
            </Link>
      <motion.div
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-violet-300 mb-8">
          Register
        </h2>

        {msg && (
          <p className="text-sm text-yellow-400 text-center mb-4">{msg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
  type="text"
  name="name"
  value={form.name}
  onChange={handleChange}
  placeholder="Full Name"
  className="w-full px-4 py-2 rounded-md bg-gray-100 text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
  required
/>

<input
  type="email"
  name="email"
  value={form.email}
  onChange={handleChange}
  placeholder="Email Address"
  className="w-full px-4 py-2 rounded-md bg-gray-100 text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
  required
/>

          <input
  type="password"
  name="password"
  value={form.password}
  onChange={handleChange}
  placeholder="Password"
  className="w-full px-4 py-2 rounded-md bg-gray-100 text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
/>


          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 transition text-white py-2 rounded-md font-semibold shadow-lg"
          >
            Register
          </button>
        </form>

        {/* 🔽 Role Selection Below the Form 🔽 */}
        <div className="mt-6">
          <label className="text-sm text-gray-300 block mb-2">Select Role</label>
          <select
  name="role"
  value={form.role}
  onChange={handleChange}
  className="w-full px-4 py-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
>
  <option value="patient" className="text-black">Patient</option>
  <option value="tpa" className="text-black">TPA</option>
  <option value="insurance" className="text-black">Insurance</option>
</select>

        </div>
      </motion.div>
    </div>
  );
};

export default Register;
