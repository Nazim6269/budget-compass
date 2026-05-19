import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production", "test"]),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["local", "dev", "staging", "prod"])
    .default("local"),

  // Feature flags (optional, default off)
  NEXT_PUBLIC_FF_NEW_DASHBOARD: z.coerce.boolean().default(false),
  NEXT_PUBLIC_FF_BETA_INVOICES: z.coerce.boolean().default(false),

  // Monitoring
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  NEXT_PUBLIC_LOG_LEVEL: z
    .enum(["debug", "info", "warn", "error"])
    .default("info"),

  // Auth
  NEXT_PUBLIC_AUTH_COOKIE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_SESSION_TIMEOUT_MS: z.coerce.number().default(30 * 60 * 1000), // 30 min
});

type Env = z.infer<typeof EnvSchema>;

function createEnv(): Env {
  const parsed = EnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_FF_NEW_DASHBOARD: process.env.NEXT_PUBLIC_FF_NEW_DASHBOARD,
    NEXT_PUBLIC_FF_BETA_INVOICES: process.env.NEXT_PUBLIC_FF_BETA_INVOICES,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
    NEXT_PUBLIC_AUTH_COOKIE_DOMAIN: process.env.NEXT_PUBLIC_AUTH_COOKIE_DOMAIN,
    NEXT_PUBLIC_SESSION_TIMEOUT_MS: process.env.NEXT_PUBLIC_SESSION_TIMEOUT_MS,
  });

  if (!parsed.success) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment configuration. Check your .env file.");
  }

  return parsed.data;
}

export const env = createEnv();

// Feature flag accessor — clean interface for feature-gated code
export const featureFlags = {
  newDashboard: env.NEXT_PUBLIC_FF_NEW_DASHBOARD,
  betaInvoices: env.NEXT_PUBLIC_FF_BETA_INVOICES,
} as const;

export type FeatureFlags = typeof featureFlags;
