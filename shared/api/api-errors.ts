export interface ApiErrorPayload {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>; // field-level validation errors
  meta?: Record<string, unknown>;
}

// ─── Base API Error ───────────────────────────────────────────────────────────

export class ApiError extends Error {
  readonly code: string;
  readonly status: number;
  readonly errors?: Record<string, string[]>;
  readonly meta?: Record<string, unknown>;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiError";
    this.code = payload.code;
    this.status = payload.status;
    this.errors = payload.errors;
    this.meta = payload.meta;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  isValidationError(): boolean {
    return this.status === 422 || this.code === "VALIDATION_ERROR";
  }

  isAuthError(): boolean {
    return this.status === 401;
  }

  isForbidden(): boolean {
    return this.status === 403;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }
}

// ─── Specific Error Types (discriminated unions) ──────────────────────────────

export class NetworkError extends Error {
  readonly code = "NETWORK_ERROR" as const;
  readonly status = 0;
  constructor(message: string = "Network unavailable") {
    super(message);
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class TimeoutError extends Error {
  readonly code = "TIMEOUT" as const;
  readonly status = 408;
  constructor(url: string) {
    super(`Request timeout: ${url}`);
    this.name = "TimeoutError";
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

export class AuthError extends ApiError {
  constructor(message = "Unauthenticated") {
    super({ message, code: "UNAUTHENTICATED", status: 401 });
    this.name = "AuthError";
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Insufficient permissions") {
    super({ message, code: "FORBIDDEN", status: 403 });
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

// ─── Discriminated Union ──────────────────────────────────────────────────────

export type AppError =
  | ApiError
  | NetworkError
  | TimeoutError
  | AuthError
  | ForbiddenError;

// ─── Error Parser ─────────────────────────────────────────────────────────────
// Normalize any thrown value into a structured AppError.

export function parseError(error: unknown): AppError {
  if (error instanceof ApiError) return error;
  if (error instanceof NetworkError) return error;
  if (error instanceof TimeoutError) return error;

  if (error instanceof Error) {
    return new ApiError({ message: error.message, code: "UNKNOWN", status: 0 });
  }

  return new ApiError({
    message: "An unexpected error occurred",
    code: "UNKNOWN",
    status: 0,
  });
}

// ─── Field Error Accessor ─────────────────────────────────────────────────────

export function getFieldErrors(error: AppError): Record<string, string> {
  if (!(error instanceof ApiError) || !error.errors) return {};
  return Object.fromEntries(
    Object.entries(error.errors).map(([field, msgs]) => [field, msgs[0]]),
  );
}
