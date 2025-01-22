import type { QueueMessage, QueueMessageType, Env } from '../types';

/**
 * Queue message handler type
 */
type QueueMessageHandler<T = unknown> = (payload: T, env: Env) => Promise<void>;

/**
 * Queue message handlers registry
 */
const messageHandlers: Record<QueueMessageType, QueueMessageHandler> = {
  email: async (payload, env) => {
    // Email sending logic
    const { template, to, subject, data } = payload as {
      template: string;
      to: string;
      subject: string;
      data: Record<string, unknown>;
    };

    try {
      await fetch('https://api.email-service.com/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.EMAIL_API_KEY}`,
        },
        body: JSON.stringify({
          template,
          to,
          subject,
          data,
        }),
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  },

  'shopify-sync': async (payload, env) => {
    // Shopify synchronization logic
    const { operation, data } = payload as {
      operation: 'create' | 'update' | 'delete';
      data: Record<string, unknown>;
    };

    try {
      await fetch('https://api.shopify.com/admin/api/2024-01/graphql.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': env.SHOPIFY_API_KEY,
        },
        body: JSON.stringify({
          query: getShopifyQuery(operation),
          variables: { input: data },
        }),
      });
    } catch (error) {
      console.error('Shopify sync failed:', error);
      throw error;
    }
  },
};

/**
 * Process a queue message
 */
export async function processQueueMessage(
  message: QueueMessage,
  env: Env
): Promise<void> {
  const handler = messageHandlers[message.type];
  if (!handler) {
    throw new Error(`No handler found for message type: ${message.type}`);
  }

  await handler(message.payload, env);
}

/**
 * Helper function to send a message to the queue
 */
export async function sendToQueue(
  queue: Queue,
  type: QueueMessageType,
  payload: unknown
): Promise<void> {
  await queue.send({
    body: { type, payload },
  });
}

/**
 * Helper function to send multiple messages to the queue
 */
export async function sendBatchToQueue(
  queue: Queue,
  messages: Array<{ type: QueueMessageType; payload: unknown }>
): Promise<void> {
  const queueMessages = messages.map((msg) => ({
    body: { type: msg.type, payload: msg.payload },
  }));
  
  await queue.sendBatch(queueMessages);
}

/**
 * Get Shopify GraphQL query based on operation
 */
function getShopifyQuery(operation: 'create' | 'update' | 'delete'): string {
  switch (operation) {
    case 'create':
      return `
        mutation createProduct($input: ProductInput!) {
          productCreate(input: $input) {
            product {
              id
            }
          }
        }
      `;
    case 'update':
      return `
        mutation updateProduct($input: ProductInput!) {
          productUpdate(input: $input) {
            product {
              id
            }
          }
        }
      `;
    case 'delete':
      return `
        mutation deleteProduct($input: ProductDeleteInput!) {
          productDelete(input: $input) {
            deletedProductId
          }
        }
      `;
  }
}