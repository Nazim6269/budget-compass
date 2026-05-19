import { env } from "./env";

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: unknown;
  timestamp: string;
}

interface ILogger {
  debug(message: string, context?: unknown): void;
  info(message: string, context?: unknown): void;
  warn(message: string, context?: unknown): void;
  error(message: string, context?: unknown): void;
}

class Logger implements ILogger {
  private readonly minLevel: number;

  constructor() {
    this.minLevel = LEVEL_PRIORITY[env.NEXT_PUBLIC_LOG_LEVEL];
  }

  private log(level: LogLevel, message: string, context?: unknown): void {
    if (LEVEL_PRIORITY[level] < this.minLevel) return;

    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    };

    // In production, ship to external monitoring (Sentry, Datadog, etc.)
    if (env.NODE_ENV === "production") {
      this.shipToMonitoring(entry);
      return;
    }

    // Dev: structured console output
    const prefix = `[${entry.timestamp}] [${level.toUpperCase()}]`;
    const fn =
      level === "error"
        ? console.error
        : level === "warn"
          ? console.warn
          : level === "debug"
            ? console.debug
            : console.info;

    context !== undefined ? fn(prefix, message, context) : fn(prefix, message);
  }

  private shipToMonitoring(entry: LogEntry): void {
    // Example: Sentry integration
    // if (entry.level === 'error' && entry.context instanceof Error) {
    //   Sentry.captureException(entry.context, { extra: { message: entry.message } });
    // } else {
    //   Sentry.addBreadcrumb({ message: entry.message, level: entry.level, data: entry.context });
    // }
  }

  debug(message: string, context?: unknown): void {
    this.log("debug", message, context);
  }
  info(message: string, context?: unknown): void {
    this.log("info", message, context);
  }
  warn(message: string, context?: unknown): void {
    this.log("warn", message, context);
  }
  error(message: string, context?: unknown): void {
    this.log("error", message, context);
  }
}

export const logger = new Logger();
