import { Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { AppContext, AuthUser } from '../types';

interface ClerkUserResponse {
  id: string;
  email_addresses: Array<{ email_address: string }>;
  public_metadata: {
    role: 'admin' | 'consignor';
  };
}

/**
 * Error handler middleware
 */
export async function errorHandler(err: Error, c: AppContext) {
  console.error(`[Error] ${err.message}`);

  if (err instanceof HTTPException) {
    return c.json(
      {
        error: err.message,
        status: err.status,
      },
      err.status
    );
  }

  return c.json(
    {
      error: 'Internal Server Error',
      status: 500,
    },
    500
  );
}

/**
 * Authentication middleware
 */
export async function authMiddleware(c: AppContext, next: Next) {
  const authHeader = c.req.header('Authorization');

  if (!authHeader) {
    throw new HTTPException(401, { message: 'No authorization header' });
  }

  try {
    // Verify token with Clerk
    const response = await fetch('https://api.clerk.dev/v1/session', {
      headers: {
        Authorization: `Bearer ${c.env.CLERK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new HTTPException(401, { message: 'Invalid session' });
    }

    const userData = (await response.json()) as ClerkUserResponse;
    const user: AuthUser = {
      id: userData.id,
      email: userData.email_addresses[0]?.email_address ?? '',
      role: userData.public_metadata.role ?? 'consignor',
    };

    c.set('user', user);
    await next();
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    throw new HTTPException(401, { message: 'Authentication failed' });
  }
}

/**
 * Role-based authorization middleware
 */
export function authorizeRoles(roles: string[]) {
  return async function roleMiddleware(c: AppContext, next: Next) {
    const user = c.get('user');

    if (!user) {
      throw new HTTPException(401, { message: 'User not authenticated' });
    }

    if (!roles.includes(user.role)) {
      throw new HTTPException(403, { message: 'Insufficient permissions' });
    }

    await next();
  };
}

/**
 * Request validation middleware
 */
export function validateRequest<T>(schema: {
  safeParse: (data: unknown) => { success: boolean; error?: { errors: unknown[] } };
}) {
  return async function validationMiddleware(c: AppContext, next: Next) {
    const body = await c.req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      throw new HTTPException(400, {
        message: 'Validation failed',
        // @ts-expect-error - We know error exists when success is false
        cause: result.error.errors,
      });
    }

    await next();
  };
}

/**
 * Cache middleware
 */
export function cache(ttl: number) {
  return async function cacheMiddleware(c: AppContext, next: Next) {
    const cacheKey = new URL(c.req.url).pathname;
    const cached = await c.env.CACHE.get(cacheKey);

    if (cached) {
      return c.json(JSON.parse(cached));
    }

    await next();

    const response = c.res;
    if (response.ok) {
      const body = await response.clone().text();
      await c.env.CACHE.put(cacheKey, body, { expirationTtl: ttl });
    }
  };
}

/**
 * Rate limiting middleware
 */
export function rateLimit(limit: number, window: number) {
  return async function rateLimitMiddleware(c: AppContext, next: Next) {
    const ip = c.req.header('CF-Connecting-IP') || 'unknown';
    const key = `ratelimit:${ip}`;

    const current = await c.env.CACHE.get(key);
    const count = current ? parseInt(current, 10) : 0;

    if (count >= limit) {
      throw new HTTPException(429, { message: 'Too many requests' });
    }

    await c.env.CACHE.put(key, (count + 1).toString(), {
      expirationTtl: window,
    });

    await next();
  };
}