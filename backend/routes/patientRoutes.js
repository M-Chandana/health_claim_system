import express from "express";
import multer from "multer";
import Claim from "../models/Claim.js";

const router = express.Router();

// 🗂 Configure file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: function (req, file, cb) {
  cb(null, file.originalname); // remove timestamp for now
}
});
const upload = multer({ storage });


// 🔹 Upload new claim
router.post("/claim", upload.single("certificateFile"), async (req, res) => {
  try {
    const { patientId, hospitalName, treatmentType, amount } = req.body;
    const certificateFile = req.file.filename;

    const claim = new Claim({
      patientId,
      hospitalName,
      treatmentType,
      amount,
      certificateFile,
      status: "Pending",
      remarks: "",
    });

    await claim.save();
    res.json({ message: "Claim submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting claim" });
  }
});


// 🔹 Get all claims for a specific patient (Claim History)
router.get("/claims/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const claims = await Claim.find({ patientId }).sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching patient claims" });
  }
});

export default router;
