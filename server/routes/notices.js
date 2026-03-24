const express = require("express");
const router = express.Router();
const { getAllNotices, getNoticeById, addComment } = require("../services/noticeService");

// GET /api/notices
router.get("/", (req, res) => {
  const notices = getAllNotices();
  res.json({ success: true, data: notices, count: notices.length });
});

// GET /api/notices/:id
router.get("/:id", (req, res) => {
  const notice = getNoticeById(req.params.id);
  if (!notice) return res.status(404).json({ success: false, message: "Notice not found" });
  res.json({ success: true, data: notice });
});

// POST /api/notices/:id/comments
router.post("/:id/comments", (req, res) => {
  const { user, text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: "Comment text is required" });
  }
  const comment = addComment(req.params.id, { user, text: text.trim() });
  if (!comment) return res.status(404).json({ success: false, message: "Notice not found" });
  res.status(201).json({ success: true, data: comment });
});

module.exports = router;
