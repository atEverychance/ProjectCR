import type { Context } from 'hono';

// Environment bindings for Cloudflare Workers
export interface Bindings {
  // Database
  DB: D1Database;
  
  // Cache
  CACHE: KVNamespace;
  
  // Queue
  JOBS_QUEUE: Queue;
  
  // API Keys
  CLERK_API_KEY: string;
  SHOPIFY_API_KEY: string;
  SHOPIFY_API_SECRET: string;
  EMAIL_API_KEY: string;
  
  // Required by Hono for index signature
  [key: string]: unknown;
}

// Variables stored in Hono context
export interface Variables {
  user: AuthUser;
  [key: string]: unknown;
}

// Custom context type with variables
export type AppContext = Context<{
  Bindings: Bindings;
  Variables: Variables;
}>;

// Queue message types
export type QueueMessageType = 'email' | 'shopify-sync';

export interface QueueMessage {
  type: QueueMessageType;
  payload: unknown;
}

// Environment interface extending bindings
export interface Env extends Bindings {
  JOBS_QUEUE: Queue;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  nextCursor?: string;
}

// Cache configuration
export interface CacheConfig {
  ttl: number;
  staleWhileRevalidate?: boolean;
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'consignor';
}

// Database entity types
export interface BaseEntity {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface Consignor extends BaseEntity {
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  preferred_contact?: 'email' | 'phone';
}

export interface Event extends BaseEntity {
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  location: string;
  max_consignors: number;
  drop_off_start: string;
  drop_off_end: string;
  pick_up_start: string;
  pick_up_end: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
}

export interface InventoryItem extends BaseEntity {
  user_id: string;
  event_id: number;
  name: string;
  description?: string;
  category: string;
  size?: string;
  price: number;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  status: 'pending' | 'approved' | 'rejected' | 'sold' | 'returned';
  barcode?: string;
}

export interface TimeSlot extends BaseEntity {
  event_id: number;
  slot_time: string;
  slot_type: 'drop_off' | 'pick_up';
  max_appointments: number;
}

export interface Appointment extends BaseEntity {
  time_slot_id: number;
  user_id: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
}

// Worker context type
export interface WorkerContext {
  env: Env;
  ctx: ExecutionContext;
}

// Helper type for database operations
export type D1Result<T> = Promise<T | null>;