const users = [
  {
    id: "student_001",
    name: "Aarav Singh",
    email: "aarav.singh@college.edu",
    rollNo: "CS22B001",
    branch: "Computer Science & Engineering",
    year: "3rd Year",
    semester: "6th Semester",
    phone: "+91 98765 43210",
    avatar: "AS",
    cgpa: 8.9,
    credits: 134,
    registeredEvents: [1, 2],
  },
];

const notifications = [
  {
    id: 1,
    type: "notice",
    title: "New Notice: Exam Schedule Released",
    message: "The end semester examination schedule has been released. Click to view.",
    timestamp: "2026-03-20T09:00:00Z",
    read: false,
    link: "/notices/1",
  },
  {
    id: 2,
    type: "event",
    title: "Event Registration Confirmed",
    message: "You are registered for Annual Tech Fest 2026 - TechZen.",
    timestamp: "2026-03-19T14:30:00Z",
    read: false,
    link: "/events/1",
  },
  {
    id: 3,
    type: "alert",
    title: "Scholarship Deadline Extended",
    message: "The scholarship application deadline has been extended to April 15th.",
    timestamp: "2026-03-15T10:00:00Z",
    read: true,
    link: "/notices/3",
  },
  {
    id: 4,
    type: "event",
    title: "Reminder: Career Seminar Tomorrow",
    message: "Don't forget — Career Guidance Seminar is tomorrow at 2 PM in Seminar Hall B.",
    timestamp: "2026-03-14T08:00:00Z",
    read: true,
    link: "/events/2",
  },
  {
    id: 5,
    type: "system",
    title: "Profile Updated Successfully",
    message: "Your contact information was updated successfully.",
    timestamp: "2026-03-12T16:00:00Z",
    read: true,
    link: "/profile",
  },
];

const getUserProfile = (userId) => users.find((u) => u.id === userId) || users[0];

const getNotifications = (userId) => notifications;

const markAsRead = (notifId) => {
  const notif = notifications.find((n) => n.id === parseInt(notifId));
  if (notif) notif.read = true;
  return notif;
};

const markAllAsRead = () => {
  notifications.forEach((n) => (n.read = true));
  return { success: true };
};

const getUnreadCount = () => notifications.filter((n) => !n.read).length;

module.exports = { getUserProfile, getNotifications, markAsRead, markAllAsRead, getUnreadCount };
