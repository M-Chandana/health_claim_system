import express from "express";
import Claim from "../models/Claim.js";

const router = express.Router();

// 🔹 Fetch all pending claims
router.get("/claims", async (req, res) => {
  try {
    const pendingClaims = await Claim.find({ status: "Pending" });
    res.json(pendingClaims);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching claims" });
  }
});

// 🔹 Verify / Reject claim
router.put("/claim/:id", async (req, res) => {
  try {
    const { status, remarks } = req.body;

    // Basic validation
    if (!["Verified", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update." });
    }

    const claim = await Claim.findById(req.params.id);
    if (!claim) return res.status(404).json({ message: "Claim not found" });

    // Update status and remarks
    claim.status = status;
    claim.remarks = remarks;
    await claim.save();

    res.json({ message: `Claim ${status.toLowerCase()} successfully!`, claim });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating claim" });
  }
});

export default router;
