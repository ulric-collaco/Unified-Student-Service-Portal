const express = require("express");
const router = express.Router();
const { getAllEvents, getEventById, registerForEvent } = require("../services/eventService");

// GET /api/events
router.get("/", (req, res) => {
  const events = getAllEvents();
  res.json({ success: true, data: events, count: events.length });
});

// GET /api/events/:id
router.get("/:id", (req, res) => {
  const event = getEventById(req.params.id);
  if (!event) return res.status(404).json({ success: false, message: "Event not found" });
  res.json({ success: true, data: event });
});

// POST /api/events/:id/register
router.post("/:id/register", (req, res) => {
  const { userId } = req.body;
  const result = registerForEvent(req.params.id, userId || "guest_user");
  if (!result.success) return res.status(400).json({ success: false, message: result.message });
  res.json({ success: true, message: result.message, eventId: result.eventId });
});

module.exports = router;
