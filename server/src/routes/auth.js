import { Hono } from 'hono'

const auth = new Hono()

// POST /api/auth/login  (dummy – no real auth)
auth.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ success: false, message: "Email and password are required" }, 400);
    }
    // Accept any credentials for now
    return c.json({
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
  } catch (e) {
    return c.json({ success: false, message: "Invalid JSON body" }, 400);
  }
})

// POST /api/auth/logout
auth.post('/logout', (c) => {
  return c.json({ success: true, message: "Logged out successfully" });
})

export default auth
