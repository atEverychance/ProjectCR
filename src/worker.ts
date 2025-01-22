import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { router as authRouter } from './routes/auth';
import { errorHandler } from './utils/middleware';
import { processQueueMessage } from './utils/queue';
import type { Bindings, Env, QueueMessage, Variables } from './types';

const app = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// Middleware
app.use('*', logger());
app.use('*', cors());
app.onError(errorHandler);

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }));

// API Routes
app.route('/api/v1/auth', authRouter);

// These routes will be implemented later
// app.route('/api/v1/consignors', consignorsRouter);
// app.route('/api/v1/events', eventsRouter);
// app.route('/api/v1/inventory', inventoryRouter);

// Worker configuration
export default {
  // HTTP handler
  fetch: app.fetch,

  // Queue handler
  async queue(batch: MessageBatch<QueueMessage>, env: Env): Promise<void> {
    for (const message of batch.messages) {
      try {
        await processQueueMessage(message.body, env);
        message.ack();
      } catch (error) {
        console.error('Queue processing error:', error);
        message.retry();
      }
    }
  },
};