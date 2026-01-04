import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["patient", "insurance", "tpa"], default: "patient" },
});

export default mongoose.model("User", userSchema);
