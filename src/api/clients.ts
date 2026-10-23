import type {
  ApiEvent,
  ApiRegistration,
  ApiUser,
  AuthReply,
  LoginBody,
  NewRegistration,
  RegisterBody,
  AiReview,
} from "../types/index";
import useAuthStore from "../store/authStore";

// Vite bakes this in at build time. Changing it means a rebuild.
export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Copy .env.example to .env, fill it in, and restart npm run dev."
  );
}

// Every call goes through here: the host, the JSON header, the token
// when there is one, and the API's own message when it refuses.
async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed (${res.status})`);
  }

  // 204 has no body -- DELETE uses this
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

// ===== EVENTS =====

export function fetchEvents(): Promise<ApiEvent[]> {
  return request<ApiEvent[]>("/api/events");
}

export function fetchEventById(id: string): Promise<ApiEvent> {
  return request<ApiEvent>(`/api/events/${id}`);
}

// ===== REGISTRATIONS =====

export function fetchRegistrations(): Promise<ApiRegistration[]> {
  return request<ApiRegistration[]>("/api/registrations");
}

export function createRegistration(
  newRegistration: NewRegistration
): Promise<ApiRegistration> {
  return request<ApiRegistration>("/api/registrations", {
    method: "POST",
    body: JSON.stringify(newRegistration),
  });
}

export function askAi(prompt: string): Promise<AiReview> {
  return request<AiReview>("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt }),
  });
}

// ===== AUTH =====

export function registerUser(body: RegisterBody): Promise<ApiUser> {
  return request<ApiUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function loginUser(body: LoginBody): Promise<AuthReply> {
  return request<AuthReply>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });
}