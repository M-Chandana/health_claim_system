import User from "../models/User.js";
import Claim from "../models/Claim.js";

export const getPatientData = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const claims = await Claim.find({ patientId: id });
  res.json({ user, claims });
};

export const createClaim = async (req, res) => {
  try {
    const { patientId, patientName, hospital, treatment, amount } = req.body;
    const claim = new Claim({ patientId, patientName, hospital, treatment, amount });
    await claim.save();
    res.json({ message: "Claim submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
