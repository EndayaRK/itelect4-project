import type { Event, Registration, ApiRegistration, NewRegistration } from "../types/index";

export const API_URL = "http://localhost:3001";

// ===== EVENTS =====

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(`${API_URL}/events`);
  if (!res.ok) {
    throw new Error("Could not load events");
  }
  return res.json();
}

export async function fetchEventById(id: string): Promise<Event> {
  const res = await fetch(`${API_URL}/events/${id}`);
  if (!res.ok) {
    throw new Error(`Could not load event with ID "${id}"`);
  }
  return res.json();
}

// ===== REGISTRATIONS =====

export async function fetchRegistrations(): Promise<ApiRegistration[]> {
  const res = await fetch(`${API_URL}/registrations`);
  if (!res.ok) {
    throw new Error("Could not load registrations");
  }
  return res.json();
}

export function toRegistration(api: ApiRegistration): Registration {
  return {
    id: Number(api.id),
    eventId: Number(api.eventId),
    userId: api.userId,
    status: api.status,
    registeredAt: new Date(api.registeredAt),
    notes: api.notes,
  };
}

export async function createRegistration(
  newRegistration: NewRegistration
): Promise<ApiRegistration> {
  const res = await fetch(`${API_URL}/registrations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRegistration),
  });
  if (!res.ok) {
    throw new Error("Could not save registration");
  }
  return res.json();
}