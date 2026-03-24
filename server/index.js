const express = require("express");
const cors = require("cors");

const noticesRouter = require("./routes/notices");
const eventsRouter = require("./routes/events");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/notices", noticesRouter);
app.use("/api/events", eventsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

// ── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Unified Student Service Portal API is running 🚀",
    timestamp: new Date().toISOString(),
    routes: ["/api/notices", "/api/events", "/api/auth", "/api/users"],
  });
});

// ── 404 Handler ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Error Handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎓 USSP Server running on http://localhost:${PORT}`);
  console.log(`📋 Notices  → http://localhost:${PORT}/api/notices`);
  console.log(`📅 Events   → http://localhost:${PORT}/api/events`);
  console.log(`🔑 Auth     → http://localhost:${PORT}/api/auth`);
  console.log(`👤 Users    → http://localhost:${PORT}/api/users\n`);
});
