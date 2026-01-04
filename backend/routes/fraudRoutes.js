import express from "express";
import Claim from "../models/Claim.js";
import { analyzeClaimRisk } from "../utils/fraudDetection.js";

const router = express.Router();

// 🔹 Analyze all claims for fraud
router.get("/analyze", async (req, res) => {
  try {
    const allClaims = await Claim.find();
    const analyzed = allClaims.map(claim => {
      const analysis = analyzeClaimRisk(claim, allClaims);
      return {
        ...claim._doc,
        riskScore: analysis.riskScore,
        riskStatus: analysis.status,
        reasons: analysis.reasons,
      };
    });

    res.json(analyzed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error analyzing claims" });
  }
});

export default router;
