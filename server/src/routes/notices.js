import { Hono } from 'hono'
import { getAllNotices, getNoticeById, addComment } from '../services/noticeService.js'

const notices = new Hono()

// GET /api/notices
notices.get('/', (c) => {
  const allNotices = getAllNotices();
  return c.json({ success: true, data: allNotices, count: allNotices.length });
})

// GET /api/notices/:id
notices.get('/:id', (c) => {
  const notice = getNoticeById(c.req.param('id'));
  if (!notice) return c.json({ success: false, message: "Notice not found" }, 404);
  return c.json({ success: true, data: notice });
})

// POST /api/notices/:id/comments
notices.post('/:id/comments', async (c) => {
  try {
    const { user, text } = await c.req.json();
    if (!text || !text.trim()) {
      return c.json({ success: false, message: "Comment text is required" }, 400);
    }
    const comment = addComment(c.req.param('id'), { user, text: text.trim() });
    if (!comment) return c.json({ success: false, message: "Notice not found" }, 404);
    return c.json({ success: true, data: comment }, 201);
  } catch (e) {
    return c.json({ success: false, message: "Invalid JSON body" }, 400);
  }
})

export default notices
