import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import LogoutButton from "../../components/LogoutButton";

const InsurenceDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchClaims = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/insurance/claims");
      setClaims(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);

  const handleAction = async (id, status) => {
    const remarks = prompt(`Enter remarks for ${status}:`);
    if (!remarks) return;
    try {
      const res = await axios.put(`http://localhost:5000/api/insurance/claim/${id}`, {
        status,
        remarks,
      });
      setMsg(res.data.message);
      fetchClaims();
    } catch (err) {
      console.error(err);
      setMsg("Error updating claim.");
    }
  };

  const handleFinalApprove = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/insurance/final-approve/${id}`);
      alert(res.data.msg);
      fetchClaims();
    } catch (err) {
      console.error(err);
      alert("Payment process failed.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center text-white relative p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: "linear-gradient(135deg, #8b5cf6, #db2777)",
      }}
    >
      <LogoutButton />
      <h1 className="text-4xl font-bold mb-6">Insurance Claim & Payment Dashboard</h1>
      {msg && <p className="text-yellow-300 mb-4">{msg}</p>}

      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        {claims.length === 0 ? (
          <p className="text-center text-gray-300">No verified claims pending approval.</p>
        ) : (
          <table className="w-full text-white text-left">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2">Hospital</th>
                <th className="p-2">Treatment</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Certificate</th>
                <th className="p-2">TPA Remarks</th>
                <th className="p-2">Status</th>
                <th className="p-2">Payment</th>
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
                  <td className="p-2 text-sm opacity-80">{claim.remarks}</td>
                  <td className="p-2">
                    {claim.status === "Approved" && <span className="text-green-400">Approved</span>}
                    {claim.status === "Rejected" && <span className="text-red-400">Rejected</span>}
                    {claim.status === "Verified" && <span className="text-blue-400">Verified</span>}
                    {claim.status === "FinalApproved" && <span className="text-emerald-400">Final Approved</span>}
                  </td>
                  <td className="p-2">
                    {claim.paymentStatus === "Paid" ? (
                      <span className="text-green-400 font-semibold">
                        Paid ✅ (TXN: {claim.transactionId})
                      </span>
                    ) : (
                      <span className="text-yellow-300">Pending</span>
                    )}
                  </td>
                  <td className="p-2">
                    {claim.status === "Verified" && (
                      <>
                        <button
                          onClick={() => handleAction(claim._id, "Approved")}
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
                      </>
                    )}
                    {claim.status === "Approved" && (
                      <button
                        onClick={() => handleFinalApprove(claim._id)}
                        className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1 rounded-md"
                      >
                        Final Approve & Pay
                      </button>
                    )}
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

export default InsurenceDashboard;
