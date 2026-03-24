const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
} = require("../services/userService");

// GET /api/users/profile
router.get("/profile", (req, res) => {
  const profile = getUserProfile("student_001");
  res.json({ success: true, data: profile });
});

// GET /api/users/notifications
router.get("/notifications", (req, res) => {
  const notifications = getNotifications("student_001");
  const unreadCount = getUnreadCount();
  res.json({ success: true, data: notifications, unreadCount });
});

// PATCH /api/users/notifications/:id/read
router.patch("/notifications/:id/read", (req, res) => {
  const notif = markAsRead(req.params.id);
  if (!notif) return res.status(404).json({ success: false, message: "Notification not found" });
  res.json({ success: true, data: notif });
});

// PATCH /api/users/notifications/read-all
router.patch("/notifications/read-all", (req, res) => {
  markAllAsRead();
  res.json({ success: true, message: "All notifications marked as read" });
});

module.exports = router;
