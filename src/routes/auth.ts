import { Hono } from 'hono';
import { z } from 'zod';

// Import Bindings type from a shared types file
type Bindings = {
  CLERK_API_KEY: string;
};

const router = new Hono<{ Bindings: Bindings }>();

// Schema for login validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Schema for registration validation
const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: z.enum(['consignor', 'admin']),
});

// Login endpoint
router.post('/login', async (c) => {
  const body = await c.req.json();
  const result = loginSchema.safeParse(body);
  
  if (!result.success) {
    return c.json({ error: result.error.errors }, 400);
  }

  try {
    const { CLERK_API_KEY } = c.env;
    // TODO: Implement Clerk.dev sign-in
    
    return c.json({ 
      status: 'success',
      message: 'Login successful'
    });
  } catch (error) {
    return c.json({ 
      error: 'Authentication failed'
    }, 401);
  }
});

// Registration endpoint
router.post('/register', async (c) => {
  const body = await c.req.json();
  const result = registrationSchema.safeParse(body);
  
  if (!result.success) {
    return c.json({ error: result.error.errors }, 400);
  }

  try {
    const { CLERK_API_KEY } = c.env;
    // TODO: Implement Clerk.dev user creation
    
    return c.json({ 
      status: 'success',
      message: 'Registration successful'
    });
  } catch (error) {
    return c.json({ 
      error: 'Registration failed'
    }, 400);
  }
});

// Logout endpoint
router.post('/logout', async (c) => {
  try {
    // TODO: Implement Clerk.dev sign-out
    return c.json({ 
      status: 'success',
      message: 'Logout successful'
    });
  } catch (error) {
    return c.json({ 
      error: 'Logout failed'
    }, 400);
  }
});

// Verify session endpoint
router.get('/verify', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) {
      return c.json({ error: 'No authorization header' }, 401);
    }

    // TODO: Implement Clerk.dev session verification
    
    return c.json({ 
      status: 'success',
      message: 'Session valid'
    });
  } catch (error) {
    return c.json({ 
      error: 'Invalid session'
    }, 401);
  }
});

export { router };