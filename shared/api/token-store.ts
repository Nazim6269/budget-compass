export interface TokenStore {
  getAccessToken(): string | null;
  setAccessToken(token: string): void;
  clearAccessToken(): void;
}

class InMemoryTokenStore implements TokenStore {
  private accessToken: string | null = null;

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  clearAccessToken(): void {
    this.accessToken = null;
  }
}

export const tokenStore = new InMemoryTokenStore();

export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  permissions: string[];
  exp: number;
  iat: number;
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    const [, payload] = token.split(".");
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded) as JWTPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string, bufferMs = 30_000): boolean {
  const payload = decodeToken(token);
  if (!payload) return true;
  return payload.exp * 1000 - bufferMs < Date.now();
}
