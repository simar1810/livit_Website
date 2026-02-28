/**
 * API base URL and shared fetch client for backend (NutriChef / Livit).
 * All requests use base path /api/v1.
 */

const API_BASE_PATH = "/api/v1";

/** Backend success/error response envelope */
export interface ApiResponse<T = unknown> {
  status_code: number;
  message: string;
  data: T | null;
}

/** Field-level validation error from backend */
export interface ApiFieldError {
  path?: string;
  message?: string;
}

/** Options for authenticated and tenant-scoped requests */
export interface ApiRequestOptions {
  /** Bearer token for Authorization header */
  token?: string | null;
  /** Tenant ID for X-Tenant-Id header (auth flows) */
  tenantId?: string | null;
}

/**
 * Returns the backend base URL (no trailing slash).
 * In dev, throws if missing so misconfiguration is obvious.
 */
export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!url) {
    if (process.env.NODE_ENV === "development") {
      throw new Error(
        "NEXT_PUBLIC_API_BASE_URL is not set. Add it to .env.local (e.g. http://localhost:1111)."
      );
    }
    return "";
  }
  return url.replace(/\/$/, "");
}

function getFullUrl(path: string): string {
  const base = getApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pathWithBase = normalizedPath.startsWith(API_BASE_PATH)
    ? normalizedPath
    : `${API_BASE_PATH}${normalizedPath}`;
  return `${base}${pathWithBase}`;
}

function buildHeaders(
  method: string,
  body?: unknown,
  options: ApiRequestOptions = {}
): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }
  if (options.tenantId) {
    headers["X-Tenant-Id"] = options.tenantId;
  }
  return headers;
}

async function handleResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const raw = await res.json().catch(() => ({}));
  const payload: ApiResponse<T> =
    typeof raw.status_code === "number"
      ? raw
      : {
          status_code: res.status,
          message: raw.message ?? res.statusText ?? "Request failed",
          data: raw.data ?? null,
        };

  if (!res.ok) {
    const err = new ApiError(
      payload.message,
      res.status,
      payload.data as ApiFieldError[] | null
    );
    throw err;
  }

  return payload;
}

/**
 * Thrown when the backend returns a non-2xx status.
 * message and statusCode match the response; data may contain field errors.
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public data: ApiFieldError[] | null = null
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Callbacks for 401 handling: refresh token then retry; on failure clear and redirect (Step 11.3). */
export interface ApiAuthHandler {
  getToken: () => string | null;
  refreshAuth: () => Promise<string | null>;
  clearTokens: () => void;
  onSessionExpired?: () => void;
}

let apiAuthHandler: ApiAuthHandler | null = null;

export function setApiAuthHandler(handler: ApiAuthHandler | null): void {
  apiAuthHandler = handler;
}

async function executeWith401Retry<T>(
  request: (opts: ApiRequestOptions) => Promise<ApiResponse<T>>,
  options: ApiRequestOptions
): Promise<ApiResponse<T>> {
  try {
    return await request(options);
  } catch (err) {
    if (
      err instanceof ApiError &&
      err.statusCode === 401 &&
      options.token &&
      apiAuthHandler
    ) {
      const newToken = await apiAuthHandler.refreshAuth();
      if (newToken) {
        try {
          return await request({ ...options, token: newToken });
        } catch (retryErr) {
          if (retryErr instanceof ApiError && retryErr.statusCode === 401) {
            apiAuthHandler.clearTokens();
            apiAuthHandler.onSessionExpired?.();
          }
          throw retryErr;
        }
      }
      apiAuthHandler.clearTokens();
      apiAuthHandler.onSessionExpired?.();
    }
    throw err;
  }
}

/**
 * Shared API client: builds full URL, sets JSON and auth/tenant headers,
 * parses JSON and throws ApiError on non-2xx.
 * On 401 with token: tries refresh once, retries request; on failure clears tokens and calls onSessionExpired.
 */
export const apiClient = {
  async get<T>(
    path: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return executeWith401Retry(
      (opts) => {
        const url = getFullUrl(path);
        return fetch(url, {
          method: "GET",
          headers: buildHeaders("GET", undefined, opts),
        }).then(handleResponse<T>);
      },
      options
    );
  },

  async post<T>(
    path: string,
    body?: unknown,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return executeWith401Retry(
      (opts) => {
        const url = getFullUrl(path);
        return fetch(url, {
          method: "POST",
          headers: buildHeaders("POST", body, opts),
          body: body != null ? JSON.stringify(body) : undefined,
        }).then(handleResponse<T>);
      },
      options
    );
  },

  async put<T>(
    path: string,
    body?: unknown,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    return executeWith401Retry(
      (opts) => {
        const url = getFullUrl(path);
        return fetch(url, {
          method: "PUT",
          headers: buildHeaders("PUT", body, opts),
          body: body != null ? JSON.stringify(body) : undefined,
        }).then(handleResponse<T>);
      },
      options
    );
  },
};
