const express = require("express");
const router = express.Router();

// POST /api/auth/login  (dummy – no real auth)
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }
  // Accept any credentials for now
  res.json({
    success: true,
    message: "Login successful",
    user: {
      id: "student_001",
      name: "Aarav Singh",
      email,
      role: "student",
      token: "dummy-jwt-token-replace-later",
    },
  });
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
