// src/pages/dashboard/PatientDashboard.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import LogoutButton from "../../components/LogoutButton";

const PatientDashboard = () => {
  const [form, setForm] = useState({
    hospitalName: "",
    treatmentType: "",
    amount: "",
    certificateFile: null,
  });
  const [msg, setMsg] = useState("");
  const [claims, setClaims] = useState([]);

  const patientId = localStorage.getItem("userId");

  // 🔹 Handle input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔹 Handle file upload
  const handleFileChange = (e) =>
    setForm({ ...form, certificateFile: e.target.files[0] });

  // 🔹 Submit claim
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("patientId", patientId);
      formData.append("hospitalName", form.hospitalName);
      formData.append("treatmentType", form.treatmentType);
      formData.append("amount", form.amount);
      formData.append("certificateFile", form.certificateFile);

      const res = await axios.post(
        "http://localhost:5000/api/patient/claim",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMsg(res.data.message || "Claim submitted successfully!");
      setForm({
        hospitalName: "",
        treatmentType: "",
        amount: "",
        certificateFile: null,
      });
      fetchClaims();
    } catch (err) {
      setMsg("❌ Error submitting claim. Please try again.");
      console.error(err);
    }
  };

  // 🔹 Fetch all patient claims
  const fetchClaims = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/patient/claims/${patientId}`
      );
      setClaims(res.data);
    } catch (err) {
      console.error("Error fetching claims:", err);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center text-white relative p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: "linear-gradient(135deg, #34d399, #0d9488)",
      }}
    >
      <LogoutButton />

      <h1 className="text-4xl font-bold mb-6">Patient Dashboard</h1>
      {msg && <p className="text-yellow-300 mb-4">{msg}</p>}

      {/* 🔹 Claim Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4 mb-10"
      >
        <input
          type="text"
          name="hospitalName"
          placeholder="Hospital Name"
          value={form.hospitalName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md text-black"
        />

        <input
          type="text"
          name="treatmentType"
          placeholder="Treatment Type"
          value={form.treatmentType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md text-black"
        />

        <input
          type="number"
          name="amount"
          placeholder="Claim Amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md text-black"
        />

        <input
          type="file"
          name="certificateFile"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          required
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-md text-white font-semibold"
        >
          Submit Claim
        </button>
      </form>

      {/* 🔹 Claim History Table */}
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">My Claim History</h2>

        {claims.length === 0 ? (
          <p className="text-gray-300 text-center">No claims submitted yet.</p>
        ) : (
          <table className="w-full text-white text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2">Hospital</th>
                <th className="p-2">Treatment</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Remarks</th>
                <th className="p-2">Payment</th>
                <th className="p-2">Certificate</th>
              </tr>
            </thead>

            <tbody>
              {claims.map((claim) => (
                <tr key={claim._id} className="border-b border-white/10">
                  <td className="p-2">{claim.hospitalName}</td>
                  <td className="p-2">{claim.treatmentType}</td>
                  <td className="p-2">₹{claim.amount}</td>

                  {/* 🔹 Claim Status */}
                  <td className="p-2 font-semibold">
                    {claim.status === "FinalApproved" && (
                      <span className="text-green-400">Final Approved ✅</span>
                    )}
                    {claim.status === "Approved" && (
                      <span className="text-emerald-400">Approved</span>
                    )}
                    {claim.status === "Verified" && (
                      <span className="text-blue-400">Verified</span>
                    )}
                    {claim.status === "Rejected" && (
                      <span className="text-red-400">Rejected</span>
                    )}
                    {claim.status === "Pending" && (
                      <span className="text-yellow-400">Pending</span>
                    )}
                  </td>

                  {/* 🔹 Remarks */}
                  <td className="p-2 text-sm opacity-80">
                    {claim.remarks || "—"}
                  </td>

                  {/* 🔹 Payment Status */}
                  <td className="p-2">
                    {claim.paymentStatus === "Paid" ? (
                      <span className="text-green-400 font-semibold">
                        ₹{claim.paymentAmount} Paid ✅
                      </span>
                    ) : claim.paymentStatus === "Failed" ? (
                      <span className="text-red-400 font-semibold">
                        Payment Failed ❌
                      </span>
                    ) : (
                      <span className="text-yellow-300">Awaiting Payment</span>
                    )}
                  </td>

                  {/* 🔹 Certificate */}
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </motion.div>
  );
};

export default PatientDashboard;
