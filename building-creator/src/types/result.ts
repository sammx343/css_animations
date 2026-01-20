/**
 * Result type for better error handling
 * Similar to Rust's Result type
 */
export type Result<T, E = string> =
  | { success: true; data: T }
  | { success: false; error: E }

export function success<T>(data: T): Result<T> {
  return { success: true, data }
}

export function failure<E>(error: E): Result<never, E> {
  return { success: false, error }
}
