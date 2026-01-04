import Claim from "../models/Claim.js";

export const getPendingClaims = async (req, res) => {
  const pending = await Claim.find({ status: "Pending" });
  res.json(pending);
};

export const verifyEligibility = async (req, res) => {
  const { claimId } = req.body;
  const claim = await Claim.findById(claimId);
  if (!claim) return res.status(404).json({ message: "Claim not found" });

  // Basic sample verification logic
  if (claim.amount < 100000) {
    claim.status = "Verified";
    await claim.save();
    return res.json({ message: "Claim is eligible" });
  } else {
    return res.json({ message: "Claim exceeds TPA eligibility limit" });
  }
};
