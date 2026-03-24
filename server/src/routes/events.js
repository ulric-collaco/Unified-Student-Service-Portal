import { Hono } from 'hono'
import { getAllEvents, getEventById, registerForEvent } from '../services/eventService.js'

const events = new Hono()

// GET /api/events
events.get('/', (c) => {
  const allEvents = getAllEvents();
  return c.json({ success: true, data: allEvents, count: allEvents.length });
})

// GET /api/events/:id
events.get('/:id', (c) => {
  const event = getEventById(c.req.param('id'));
  if (!event) return c.json({ success: false, message: "Event not found" }, 404);
  return c.json({ success: true, data: event });
})

// POST /api/events/:id/register
events.post('/:id/register', async (c) => {
  try {
    const { userId } = await c.req.json();
    const result = registerForEvent(c.req.param('id'), userId || "guest_user");
    if (!result.success) return c.json({ success: false, message: result.message }, 400);
    return c.json({ success: true, message: result.message, eventId: result.eventId });
  } catch (e) {
    return c.json({ success: false, message: "Invalid JSON body" }, 400);
  }
})

export default events
