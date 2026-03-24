const events = [
  {
    id: 1,
    title: "Annual Tech Fest 2026 - TechZen",
    category: "Technical",
    date: "2026-04-05",
    time: "10:00 AM - 6:00 PM",
    venue: "Main Auditorium & Ground Floor Labs",
    description:
      "Join us for TechZen 2026 — our flagship annual tech festival featuring hackathons, project expos, robotics competitions, AI workshops, and more. Open to all students. Cash prizes worth ₹1,00,000!",
    organizer: "Technical Club",
    maxAttendees: 500,
    registeredUsers: ["student_001", "student_002", "student_003"],
    tags: ["hackathon", "tech", "competition"],
    image: "techfest",
  },
  {
    id: 2,
    title: "Career Guidance Seminar - Campus Placements",
    category: "Career",
    date: "2026-04-08",
    time: "2:00 PM - 5:00 PM",
    venue: "Seminar Hall B",
    description:
      "Industry veterans and alumni will share insights on cracking campus placements, building strong resumes, and acing technical and HR interviews. Mandatory for final year students.",
    organizer: "Training & Placement Cell",
    maxAttendees: 200,
    registeredUsers: ["student_001"],
    tags: ["placement", "career", "seminar"],
    image: "career",
  },
  {
    id: 3,
    title: "Cultural Night - Rang Mahotsav",
    category: "Cultural",
    date: "2026-04-12",
    time: "6:00 PM - 10:00 PM",
    venue: "Open Air Theatre",
    description:
      "Celebrate cultures and talent at Rang Mahotsav — an evening of music, dance, drama, and art. Registrations open for performers. Free entry for audience.",
    organizer: "Cultural Committee",
    maxAttendees: 1000,
    registeredUsers: [],
    tags: ["cultural", "music", "dance"],
    image: "cultural",
  },
  {
    id: 4,
    title: "Entrepreneurship Bootcamp",
    category: "Workshop",
    date: "2026-04-15",
    time: "9:00 AM - 4:00 PM",
    venue: "Innovation Hub",
    description:
      "A hands-on 1-day bootcamp for aspiring entrepreneurs. Learn ideation, lean startup methodology, pitching, and get mentored by successful startup founders.",
    organizer: "E-Cell",
    maxAttendees: 60,
    registeredUsers: ["student_003", "student_004"],
    tags: ["startup", "entrepreneurship", "workshop"],
    image: "bootcamp",
  },
  {
    id: 5,
    title: "Blood Donation Camp",
    category: "Social",
    date: "2026-04-17",
    time: "9:00 AM - 1:00 PM",
    venue: "Medical Centre",
    description:
      "Do your part for society. The annual Blood Donation Camp is being organized in collaboration with the City Blood Bank. All participants will receive a certificate of appreciation.",
    organizer: "NSS Unit",
    maxAttendees: 150,
    registeredUsers: [],
    tags: ["social", "health", "nss"],
    image: "social",
  },
];

const getAllEvents = () =>
  events.map((e) => ({
    ...e,
    attendeeCount: e.registeredUsers.length,
    spotsLeft: e.maxAttendees - e.registeredUsers.length,
  }));

const getEventById = (id) => {
  const event = events.find((e) => e.id === parseInt(id));
  if (!event) return null;
  return {
    ...event,
    attendeeCount: event.registeredUsers.length,
    spotsLeft: event.maxAttendees - event.registeredUsers.length,
  };
};

const registerForEvent = (eventId, userId) => {
  const event = events.find((e) => e.id === parseInt(eventId));
  if (!event) return { success: false, message: "Event not found" };
  if (event.registeredUsers.includes(userId))
    return { success: false, message: "Already registered" };
  if (event.registeredUsers.length >= event.maxAttendees)
    return { success: false, message: "Event is full" };
  event.registeredUsers.push(userId);
  return { success: true, message: "Registration successful", eventId: event.id };
};

module.exports = { getAllEvents, getEventById, registerForEvent };
