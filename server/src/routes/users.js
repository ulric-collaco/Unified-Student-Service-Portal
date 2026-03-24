import { Hono } from 'hono'
import {
  getUserProfile,
  getNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
} from '../services/userService.js'

const users = new Hono()

// GET /api/users/profile
users.get('/profile', (c) => {
  const profile = getUserProfile("student_001");
  return c.json({ success: true, data: profile });
})

// GET /api/users/notifications
users.get('/notifications', (c) => {
  const notifications = getNotifications("student_001");
  const unreadCount = getUnreadCount();
  return c.json({ success: true, data: notifications, unreadCount });
})

// PATCH /api/users/notifications/:id/read
users.patch('/notifications/:id/read', (c) => {
  const notif = markAsRead(c.req.param('id'));
  if (!notif) return c.json({ success: false, message: "Notification not found" }, 404);
  return c.json({ success: true, data: notif });
})

// PATCH /api/users/notifications/read-all
users.patch('/notifications/read-all', (c) => {
  markAllAsRead();
  return c.json({ success: true, message: "All notifications marked as read" });
})

export default users
