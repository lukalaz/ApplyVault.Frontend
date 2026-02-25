const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  if (res.status === 204) return null as T;

  return res.json() as Promise<T>;
}

async function requestRaw(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T = null>(path: string) => request<T>(path, { method: "DELETE" }),
  getRaw: (path: string, init?: RequestInit) =>
    requestRaw(path, { method: "GET", ...init }),
  postRaw: (path: string, body?: BodyInit | null, init?: RequestInit) =>
    requestRaw(path, { method: "POST", body: body ?? null, ...init }),
  putRaw: (path: string, body?: BodyInit | null, init?: RequestInit) =>
    requestRaw(path, { method: "PUT", body: body ?? null, ...init }),
};
