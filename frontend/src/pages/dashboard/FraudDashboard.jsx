import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import LogoutButton from "../../components/LogoutButton";

const FraudDashboard = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const res = await axios.get("http://localhost:5000/api/fraud/analyze");
      setClaims(res.data);
    };
    fetchAnalysis();
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: "linear-gradient(135deg, #1e293b, #0f172a)",
      }}
    >
      <LogoutButton />
      <h1 className="text-4xl font-bold mb-8 text-violet-300">
        AI Fraud Detection Dashboard
      </h1>

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        {claims.length === 0 ? (
          <p className="text-center text-gray-300">No claims found.</p>
        ) : (
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2">Hospital</th>
                <th className="p-2">Treatment</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Risk</th>
                <th className="p-2">Reasons</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((c) => (
                <tr key={c._id} className="border-b border-white/10">
                  <td className="p-2">{c.hospitalName}</td>
                  <td className="p-2">{c.treatmentType}</td>
                  <td className="p-2">₹{c.amount}</td>
                  <td
                    className={`p-2 font-semibold ${
                      c.riskStatus === "High"
                        ? "text-red-400"
                        : c.riskStatus === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {c.riskStatus}
                  </td>
                  <td className="p-2 text-sm opacity-80">
                    {c.reasons.join(", ") || "None"}
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

export default FraudDashboard;
