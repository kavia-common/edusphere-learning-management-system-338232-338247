"use client";

import useSWR from "swr";

export type ApiConfig = {
  baseUrl: string;
};

function getApiConfig(): ApiConfig {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    // Do not throw at import-time; keep the app usable in static export without env configured.
    console.warn(
      "[ApiConfig] NEXT_PUBLIC_API_BASE_URL is not set; API calls will fail. Configure it in .env."
    );
  }
  return { baseUrl: baseUrl ?? "" };
}

/**
 * PUBLIC_INTERFACE
 * ApiFetchFlow is the single reusable flow for HTTP requests to the backend.
 *
 * Contract:
 * - Inputs: path (starting with '/'), init options.
 * - Outputs: parsed JSON on success.
 * - Errors: throws Error with contextual message; caller decides UI handling.
 * - Side effects: network calls to configured API base URL.
 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const cfg = getApiConfig();
  const url = `${cfg.baseUrl}${path}`;
  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`API error ${res.status} on ${path}. Body: ${text.slice(0, 500)}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    console.error("[ApiFetchFlow] Request failed", { path, url, err });
    throw err;
  }
}

/**
 * PUBLIC_INTERFACE
 * useHealthCheck reads backend health status (from OpenAPI currently only "/").
 */
export function useHealthCheck() {
  return useSWR("health-check", () => apiFetch<Record<string, unknown>>("/"));
}
