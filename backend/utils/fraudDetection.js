// backend/utils/fraudDetection.js

export const analyzeClaimRisk = (claim, allClaims) => {
  let riskScore = 0;
  let reasons = [];

  // 🔹 Rule 1: High amount threshold
  if (claim.amount > 100000) {
    riskScore += 40;
    reasons.push("High claim amount (> ₹1,00,000)");
  }

  // 🔹 Rule 2: Frequent claims by same patient
  const patientClaims = allClaims.filter(c => c.patientId === claim.patientId);
  if (patientClaims.length > 3) {
    riskScore += 25;
    reasons.push("Multiple recent claims by same patient");
  }

  // 🔹 Rule 3: Duplicate file check
  const duplicateFile = allClaims.find(c => c.certificateFile === claim.certificateFile && c._id !== claim._id);
  if (duplicateFile) {
    riskScore += 35;
    reasons.push("Duplicate certificate detected");
  }

  // 🔹 Rule 4: Suspicious hospital-treatment combo
  const hospitalBlacklist = ["FakeCare Hospital", "UnknownClinic"];
  if (hospitalBlacklist.includes(claim.hospitalName)) {
    riskScore += 50;
    reasons.push("Hospital flagged for suspicious activities");
  }

  // 🔹 Normalize risk
  if (riskScore > 100) riskScore = 100;

  const status = riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low";

  return { riskScore, status, reasons };
};
