// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <nav className="bg-white/10 backdrop-blur-lg shadow-lg py-4 px-6 flex justify-between items-center rounded-b-xl border-b border-gray-700">
        <motion.h1 
          className="text-3xl font-extrabold text-violet-400 tracking-wider"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          HealthClaimPro
        </motion.h1>
        <motion.div 
          className="space-x-6"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link to="/login" className="text-blue-400 hover:text-white transition">Login</Link>
          <Link to="/register" className="text-violet-400 hover:text-white transition">Register</Link>
        </motion.div>
      </nav>

      <motion.div 
        className="flex flex-col justify-center items-center mt-24 text-center px-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-md">Smarter Claims, Safer Healthcare</h2>
        <p className="text-lg text-gray-300 max-w-2xl">
          Empowering insurers and patients with a transparent, token-based TPA health claim system.
        </p>
        <div className="mt-10 space-x-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/register" className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-6 rounded-full shadow-xl transition">Get Started</Link>
          </motion.div>
          
        </div>

        {/* 👇 About Section Card 👇 */}
        <motion.div 
          className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-700 mt-14 p-6 max-w-3xl transition duration-300 hover:scale-105"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px #9333ea" }}
        >
          <h3 className="text-2xl font-semibold text-violet-300 mb-2">About HealthClaimPro</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            HealthClaimPro is a next-gen health insurance platform that simplifies and secures medical claims using a token-based TPA verification process.
            Our mission is to create a seamless experience for insurers and patients by leveraging real-time data and secure architecture.
          </p>
        </motion.div>
      </motion.div>
      {/* 👇 Contact Info Section 👇 */}
<motion.div
  className="mt-10 text-sm text-gray-300 space-y-2 text-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, delay: 0.5 }}
>
  <p>📞 <span className="font-medium text-white">Phone:</span> +91 98765 43210</p>
  <p>📧 <span className="font-medium text-white">Email:</span> support@healthclaimpro.com</p>
  <p>📍 <span className="font-medium text-white">Address:</span> 123 Wellness Street, Hyderabad, India</p>
</motion.div>


      {/* Optional Footer Placeholder */}
      <footer className="mt-20 text-center text-xs text-gray-500 py-6">
        &copy; {new Date().getFullYear()} HealthClaimPro. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
