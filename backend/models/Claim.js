import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hospitalName: { type: String, required: true },
  treatmentType: { type: String, required: true },
  amount: { type: Number, required: true },
  certificateFile: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending | Verified | Rejected | Approved | FinalApproved
  remarks: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },

  // 💰 New Fields for Payment Tracking
  paymentStatus: {
    type: String,
    enum: ["Not Initiated", "Processing", "Paid", "Failed"],
    default: "Not Initiated",
  },
  paymentAmount: { type: Number, default: 0 },
  paymentDate: { type: Date },
  transactionId: { type: String },
});

export default mongoose.model("Claim", claimSchema);
