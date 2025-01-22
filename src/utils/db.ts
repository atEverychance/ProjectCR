import type { D1Result } from '../types';

/**
 * Type guard to check if a value is a non-null object
 */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

/**
 * Safely cast D1 result to a specific type
 */
export function castD1Result<T>(result: unknown): T | null {
  if (!isRecord(result)) {
    return null;
  }
  return result as T;
}

/**
 * Helper function to safely access database result properties
 */
export function getResultProperty<T>(
  result: Record<string, unknown>,
  key: string
): T | null {
  const value = result[key];
  return (value as T) ?? null;
}

/**
 * Type-safe database query wrapper
 */
export async function queryOne<T>(
  db: D1Database,
  query: string,
  ...params: unknown[]
): D1Result<T> {
  const stmt = db.prepare(query);
  const result = await stmt.bind(...params).first();
  return castD1Result<T>(result);
}

/**
 * Type-safe database query wrapper for multiple results
 */
export async function queryMany<T>(
  db: D1Database,
  query: string,
  ...params: unknown[]
): Promise<T[]> {
  const stmt = db.prepare(query);
  const result = await stmt.bind(...params).all();
  return (result.results as T[]) ?? [];
}

/**
 * Execute a write operation and return success status
 */
export async function execute(
  db: D1Database,
  query: string,
  ...params: unknown[]
): Promise<boolean> {
  const result = await db.prepare(query).bind(...params).run();
  return result.success;
}

/**
 * Execute a write operation and return the last inserted ID
 */
export async function executeAndReturnId(
  db: D1Database,
  query: string,
  ...params: unknown[]
): Promise<number | null> {
  const result = await db
    .prepare(query + ' RETURNING id')
    .bind(...params)
    .first<{ id: number }>();
  
  return result?.id ?? null;
}

/**
 * Execute a batch of write operations in a transaction
 */
export async function executeBatch(
  db: D1Database,
  statements: { query: string; params: unknown[] }[]
): Promise<boolean> {
  const batch = statements.map(({ query, params }) =>
    db.prepare(query).bind(...params)
  );
  
  const results = await db.batch(batch);
  return results.every((result) => result.success);
}