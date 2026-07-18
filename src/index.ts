// ============================================
// CORE INTERFACES
// ============================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "organizer" | "admin";
  isActive: boolean;
  createdAt: Date;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  category: "academic" | "social" | "sports" | "career" | "other";
  capacity: number;
  status: EventStatus;
  startDate: Date;
  endDate: Date;
  organizerId: number;
  location: string;
  createdAt: Date;
}

export interface Registration {
  id: number;
  eventId: number;
  userId: number;
  status: RegistrationStatus;
  registeredAt: Date;
  notes?: string;
}

// ============================================
// ENUMS
// ============================================

export enum EventStatus {
  Draft = "draft",
  Open = "open",
  Ongoing = "ongoing",
  Closed = "closed",
}

export enum RegistrationStatus {
  Pending = "pending",
  Confirmed = "confirmed",
  Cancelled = "cancelled",
  Waitlisted = "waitlisted",
}

// ============================================
// GENERIC INTERFACE
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: Date;
}

// ============================================
// GENERIC FUNCTIONS
// ============================================

export function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

export function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find(item => item.id === id);
}

// ============================================
// UTILITY TYPES
// ============================================

export type EventUpdate = Partial<Event>;
export type EventPreview = Pick<Event, "id" | "title" | "category" | "status" | "capacity">;
export type UserPreview = Pick<User, "id" | "name" | "role">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type CategoryCount = Record<Event["category"], number>;

// ============================================
// LIVE FEATURE HELPER
// ============================================

export function getRemainingSpots(event: Event, registrations: Registration[]): number {
  const confirmed = registrations.filter(
    (r) => r.status === RegistrationStatus.Confirmed
  ).length;
  return Math.max(0, event.capacity - confirmed);
}