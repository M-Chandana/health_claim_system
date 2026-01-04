import express from "express";
import Claim from "../models/Claim.js";

const router = express.Router();

// 🔹 Fetch claim statistics
router.get("/", async (req, res) => {
  try {
    const total = await Claim.countDocuments();
    const verified = await Claim.countDocuments({ status: "Verified" });
    const approved = await Claim.countDocuments({ status: "Approved" });
    const rejected = await Claim.countDocuments({ status: "Rejected" });
    const pending = await Claim.countDocuments({ status: "Pending" });

    res.json({ total, verified, approved, rejected, pending });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching statistics" });
  }
});

export default router;
