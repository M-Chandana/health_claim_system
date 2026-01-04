import express from "express";
import Claim from "../models/Claim.js";

const router = express.Router();

// 🔹 Fetch all verified claims (from TPA)
router.get("/claims", async (req, res) => {
  try {
    const verifiedClaims = await Claim.find({
      $or: [{ status: "Verified" }, { status: "Approved" }],
    });
    res.json(verifiedClaims);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching verified claims" });
  }
});

// 🔹 Approve / Reject claim (final decision)
router.put("/claim/:id", async (req, res) => {
  try {
    const { status, remarks } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update." });
    }

    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    claim.status = status;
    claim.remarks = remarks;
    await claim.save();

    res.json({ message: `Claim ${status.toLowerCase()} successfully!`, claim });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating claim" });
  }
});

// 🔹 Final Approval + Payment Processing
router.put("/final-approve/:id", async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ msg: "Claim not found" });

    // Simulate payment
    const transactionId = "TXN" + Math.floor(100000 + Math.random() * 900000);

    claim.status = "FinalApproved";
    claim.paymentStatus = "Paid";
    claim.paymentAmount = claim.amount;
    claim.paymentDate = new Date();
    claim.transactionId = transactionId;

    await claim.save();

    res.json({
      msg: `Payment of ₹${claim.amount} released successfully.`,
      transactionId: transactionId,
      claim,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Payment processing failed." });
  }
});

export default router;
