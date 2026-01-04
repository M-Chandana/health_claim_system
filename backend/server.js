import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";
import tpaRoutes from "./routes/tpaRoutes.js";
import insuranceRoutes from "./routes/insuranceRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import fraudRoutes from "./routes/fraudRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/tpa", tpaRoutes);
app.use("/uploads", express.static("uploads"));
app.get("/", (req, res) => res.send("Health Claim API is running..."));
app.use("/api/insurance", insuranceRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/fraud", fraudRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
