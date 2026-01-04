import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import LogoutButton from "../../components/LogoutButton";
import { useNavigate } from "react-router-dom"; // ✅ Added navigation hook

const TPADashboard = () => {
  const [claims, setClaims] = useState([]);
  const [stats, setStats] = useState({});
  const [msg, setMsg] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigation

  // Fetch pending claims
  const fetchClaims = async () => {
    const res = await axios.get("http://localhost:5000/api/tpa/claims");
    setClaims(res.data);
  };

  // Fetch stats
  const fetchStats = async () => {
    const res = await axios.get("http://localhost:5000/api/stats");
    setStats(res.data);
  };

  useEffect(() => {
    fetchClaims();
    fetchStats();
  }, []);

  const handleAction = async (id, status) => {
    const remarks = prompt(`Enter remarks for ${status}:`);
    if (!remarks) return;
    await axios.put(`http://localhost:5000/api/tpa/claim/${id}`, { status, remarks });
    setMsg(`Claim ${status.toLowerCase()} successfully!`);
    fetchClaims();
    fetchStats();
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center text-white relative p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ background: "linear-gradient(135deg, #4f46e5, #1e3a8a)" }}
    >
      {/* 🔹 Top Section Buttons */}
      <div className="absolute top-6 left-6 flex gap-4">
        {/* Fraud Detection Button */}
        <button
          onClick={() => navigate("/fraud-dashboard")}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition"
        >
          🔍 Fraud Detection
        </button>
      </div>

      {/* Logout Button */}
      <LogoutButton />

      <h1 className="text-4xl font-bold mb-6">TPA Dashboard</h1>
      {msg && <p className="text-yellow-300 mb-4">{msg}</p>}

      {/* 🔹 Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 w-full max-w-5xl">
        {[
          { title: "Total", value: stats.total, color: "bg-blue-500" },
          { title: "Verified", value: stats.verified, color: "bg-green-500" },
          { title: "Approved", value: stats.approved, color: "bg-emerald-500" },
          { title: "Rejected", value: stats.rejected, color: "bg-red-500" },
          { title: "Pending", value: stats.pending, color: "bg-yellow-500" },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            className={`${card.color} rounded-xl p-4 text-center shadow-lg backdrop-blur-lg bg-opacity-80`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-3xl font-bold">{card.value ?? 0}</p>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Claims Table */}
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        {claims.length === 0 ? (
          <p className="text-center text-gray-300">No pending claims.</p>
        ) : (
          <table className="w-full text-white text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2">Hospital</th>
                <th className="p-2">Treatment</th>
                <th className="p-2">Amount</th>
                <th className="p-2">File</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id} className="border-b border-white/10">
                  <td className="p-2">{claim.hospitalName}</td>
                  <td className="p-2">{claim.treatmentType}</td>
                  <td className="p-2">₹{claim.amount}</td>
                  <td className="p-2">
                    <a
                      href={`http://localhost:5000/uploads/${claim.certificateFile}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-300 underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleAction(claim._id, "Verified")}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(claim._id, "Rejected")}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default TPADashboard;
