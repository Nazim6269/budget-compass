import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";
import {
  type IHttpClient,
  type HttpResponse,
  type RequestConfig,
} from "./http-client";
import { type TokenStore } from "./token-store";
import { ApiError, NetworkError, TimeoutError } from "./api-errors";
import { env } from "./env";
import { logger } from "./logger";

const RETRY_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Exponential backoff with jitter to prevent thundering herd
function getRetryDelay(attempt: number): number {
  const exponential = RETRY_DELAY_MS * Math.pow(2, attempt - 1);
  const jitter = Math.random() * 200;
  return exponential + jitter;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class AxiosHttpClient implements IHttpClient {
  private readonly instance: AxiosInstance;

  constructor(
    private readonly tokenStore: TokenStore,
    private readonly onTokenRefresh: () => Promise<string | null>,
    baseURL: string = env.NEXT_PUBLIC_API_BASE_URL,
  ) {
    this.instance = axios.create({
      baseURL: `${baseURL}/api/`,
      timeout: 15_000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Client-Version": process.env.NEXT_PUBLIC_APP_VERSION ?? "unknown",
      },
    });

    this.attachRequestInterceptors();
    this.attachResponseInterceptors();
  }

  // ─── Interceptors ─────────────────────────────────────────────────────────

  private attachRequestInterceptors(): void {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Inject access token unless explicitly skipped
        if (!(config as RequestConfig)._skipAuth) {
          const token = this.tokenStore.getAccessToken();
          if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
          }
        }

        // Correlation ID for distributed tracing
        config.headers.set("X-Correlation-ID", crypto.randomUUID());

        logger.debug("HTTP Request", {
          method: config.method?.toUpperCase(),
          url: config.url,
        });

        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  private attachResponseInterceptors(): void {
    // Tracks whether we're already refreshing to prevent race conditions
    let isRefreshing = false;
    // Queue of pending requests waiting for the refreshed token
    let failedQueue: Array<{
      resolve: (token: string) => void;
      reject: (err: unknown) => void;
    }> = [];

    const processQueue = (error: unknown, token: string | null) => {
      failedQueue.forEach(({ resolve, reject }) =>
        error ? reject(error) : resolve(token!),
      );
      failedQueue = [];
    };

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        logger.debug("HTTP Response", {
          status: response.status,
          url: response.config.url,
        });
        return response;
      },
      async (error) => {
        const originalRequest = error.config as RequestConfig &
          InternalAxiosRequestConfig;

        // ── 401 → Token Refresh Flow ────────────────────────────────────────
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            // Queue this request until refresh completes
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return this.instance(originalRequest);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const newToken = await this.onTokenRefresh();
            if (!newToken) throw new Error("Refresh failed");

            processQueue(null, newToken);
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        // ── Retry Logic ─────────────────────────────────────────────────────
        const retryCount =
          (originalRequest as { _retryCount?: number })._retryCount ?? 0;
        const shouldRetry =
          RETRY_STATUS_CODES.has(error.response?.status) &&
          retryCount < MAX_RETRIES;

        if (shouldRetry) {
          (originalRequest as { _retryCount?: number })._retryCount =
            retryCount + 1;
          const delay = getRetryDelay(retryCount + 1);
          logger.warn(`Retrying request (attempt ${retryCount + 1})`, {
            url: originalRequest.url,
            delay,
          });
          await sleep(delay);
          return this.instance(originalRequest);
        }

        // ── Error Normalization ─────────────────────────────────────────────
        return Promise.reject(this.normalizeError(error));
      },
    );
  }

  private normalizeError(
    error: unknown,
  ): ApiError | NetworkError | TimeoutError {
    if (!isAxiosError(error)) {
      return new ApiError({
        message: "Unknown error",
        code: "UNKNOWN",
        status: 0,
      });
    }

    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      return new TimeoutError(error.config?.url ?? "");
    }

    if (!error.response) {
      return new NetworkError(error.message);
    }

    const { status, data } = error.response;
    return new ApiError({
      message: data?.message ?? error.message,
      code: data?.code ?? "HTTP_ERROR",
      status,
      errors: data?.errors,
      meta: data?.meta,
    });
  }

  // ─── IHttpClient Implementation ───────────────────────────────────────────

  async get<T>(
    url: string,
    config?: Partial<RequestConfig>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: "GET" });
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: Partial<RequestConfig>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: "POST", data });
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: Partial<RequestConfig>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: "PUT", data });
  }

  async patch<T>(
    url: string,
    data?: unknown,
    config?: Partial<RequestConfig>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: "PATCH", data });
  }

  async delete<T>(
    url: string,
    config?: Partial<RequestConfig>,
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: "DELETE" });
  }

  async request<T>(config: RequestConfig): Promise<HttpResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      url: config.url,
      method: config.method ?? "GET",
      params: config.params,
      data: config.data,
      headers: config.headers,
      timeout: config.timeout,
      signal: config.signal,
      responseType: config.responseType ?? "json",
      onUploadProgress: config.onUploadProgress
        ? (e) =>
            config.onUploadProgress!(
              Math.round((e.loaded / (e.total ?? 1)) * 100),
            )
        : undefined,
      onDownloadProgress: config.onDownloadProgress
        ? (e) =>
            config.onDownloadProgress!(
              Math.round((e.loaded / (e.total ?? 1)) * 100),
            )
        : undefined,
    };

    const response = await this.instance.request<T>(axiosConfig);

    return {
      data: response.data,
      status: response.status,
      headers: response.headers as Record<string, string>,
    };
  }

  // ─── Multipart Upload ─────────────────────────────────────────────────────

  async upload<T>(
    url: string,
    file: File | Blob,
    fields?: Record<string, string>,
    onProgress?: (pct: number) => void,
  ): Promise<HttpResponse<T>> {
    const form = new FormData();
    form.append("file", file);
    if (fields) {
      Object.entries(fields).forEach(([k, v]) => form.append(k, v));
    }

    return this.request<T>({
      url,
      method: "POST",
      data: form,
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: onProgress,
    });
  }

  // ─── File Download ────────────────────────────────────────────────────────

  async download(url: string, filename: string): Promise<void> {
    const response = await this.request<Blob>({
      url,
      method: "GET",
      responseType: "blob",
    });
    const href = URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = href;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(href);
  }
}
