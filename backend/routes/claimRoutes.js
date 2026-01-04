import express from "express";
import { getAllClaims, updateClaimStatus } from "../controllers/claimController.js";
const router = express.Router();

router.get("/", getAllClaims);
router.put("/:id", updateClaimStatus);

export default router;
