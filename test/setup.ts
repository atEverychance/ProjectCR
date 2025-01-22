import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import type { ExecutionContext } from '@cloudflare/workers-types';

// Mock Cloudflare Workers runtime
const createMockRuntime = () => {
  const ctx = {
    waitUntil: vi.fn(),
    passThroughOnException: vi.fn(),
    // @ts-expect-error - Partial mock implementation
    props: {},
  } as ExecutionContext;
  
  // Mock KV namespace
  const mockKV = {
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    list: vi.fn(),
  };

  // Mock D1 database
  const mockD1 = {
    prepare: vi.fn().mockReturnValue({
      bind: vi.fn().mockReturnThis(),
      first: vi.fn(),
      run: vi.fn(),
      all: vi.fn(),
    }),
    batch: vi.fn(),
    exec: vi.fn(),
  };

  // Mock Queue
  const mockQueue = {
    send: vi.fn(),
    sendBatch: vi.fn(),
  };

  // Mock environment bindings
  const env = {
    DB: mockD1,
    CACHE: mockKV,
    JOBS_QUEUE: mockQueue,
    CLERK_API_KEY: 'test-clerk-key',
    SHOPIFY_API_KEY: 'test-shopify-key',
    SHOPIFY_API_SECRET: 'test-shopify-secret',
    EMAIL_API_KEY: 'test-email-key',
  };

  return { ctx, env };
};

// Setup global test environment
beforeAll(() => {
  const { env } = createMockRuntime();
  // Make env available globally for tests
  // @ts-expect-error - Adding to global
  global.env = env;
});

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Clean up after all tests
afterAll(() => {
  vi.resetAllMocks();
});

// Helper function to create test requests
export const createTestRequest = (
  method: string,
  path: string,
  body?: unknown,
  headers?: HeadersInit
) => {
  return new Request(`http://localhost${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
  });
};

// Helper function to create test bindings
export const createTestBindings = () => {
  const { env } = createMockRuntime();
  return env;
};

// Export mocked runtime for use in tests
export const mockRuntime = createMockRuntime;