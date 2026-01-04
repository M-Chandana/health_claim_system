import Claim from "../models/Claim.js";

export const getAllClaims = async (req, res) => {
  const claims = await Claim.find();
  res.json(claims);
};

export const updateClaimStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await Claim.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
};
