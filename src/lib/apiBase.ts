/**
 * Backend base URL helper. Extracted to avoid circular deps between api.ts and tokenManager.ts.
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

export function getTenantId(): string {
  return process.env.NEXT_PUBLIC_TENANT_ID ?? "";
}
