<<<<<<< HEAD
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
=======
import type {
  User,
  Course,
  ApiResponse,
  UserUpdate,
  UserPreview,
  PublicUser,
  RoleCount,
} from "../types/index";
import {
  SubmissionStatus,
  Role,
  getFirst,
  getById,
} from "../types/index";

// ============================================
// MOCK DATA
// ============================================

const student: User = {
  id: 1,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  role: "student",
  isActive: true,
};

const course: Course = {
  code: "ITELECT4",
  title: "TypeScript Advanced Types",
  units: 3,
  semester: "1st Semester 2026-2027",
};

console.log("=== GT1 Part 2: TypeScript Advanced Types ===\n");

// ============================================
// GENERICS
// ============================================

console.log("--- GENERICS ---");
const firstUser = getFirst<User>([student]);
const foundUser = getById<User>([student], 1);
console.log("First user:", firstUser?.name);
console.log("Found user:", foundUser?.email);

// Generic interface
const userResponse: ApiResponse<User> = {
  success: true,
  data: student,
  message: "User retrieved successfully",
};
console.log("API Response data:", userResponse.data.name);

// ============================================
// UTILITY TYPES
// ============================================

console.log("\n--- UTILITY TYPES ---");

// Partial
const patch: UserUpdate = { name: "Juan D. Cruz" };
console.log("Partial update:", patch);

// Pick
const preview: UserPreview = {
  id: 1,
  name: "Juan dela Cruz",
  role: "student",
};
console.log("Preview:", preview);

// Omit
const publicProfile: PublicUser = {
  id: 1,
  name: "Juan dela Cruz",
  role: "student",
};
console.log("Public profile:", publicProfile);

// Record
const roleCount: RoleCount = {
  student: 45,
  admin: 2,
  instructor: 3,
};
console.log("Role counts:", roleCount);

// ============================================
// RETURN TYPE
// ============================================

console.log("\n--- RETURN TYPE ---");
function makeSubmission(courseCode: string) {
  return {
    id: 1,
    studentId: 1,
    courseCode,
    submittedAt: new Date(),
  };
>>>>>>> de5a1f9 (GT1 Part 2: Added generics, utility types, enums)
}
type NewSubmission = ReturnType<typeof makeSubmission>;
const gt1Submission: NewSubmission = makeSubmission("ITELECT4");
console.log("New submission:", gt1Submission);

// ============================================
<<<<<<< HEAD
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
=======
// ENUMS
// ============================================

console.log("\n--- ENUMS ---");

// Regular enum (reverse mapping works with numeric enums)
let submissionStatus: SubmissionStatus = SubmissionStatus.Pending;
console.log("Status value:", submissionStatus);
console.log("Reverse mapping:", SubmissionStatus[submissionStatus]); // "Pending"

submissionStatus = SubmissionStatus.Graded;
console.log("Updated status:", submissionStatus);
console.log("Is graded?", submissionStatus === SubmissionStatus.Graded); // true

// Const enum (inlined)
const currentRole: Role = Role.Student;
console.log("Const enum role:", currentRole); // "student"

console.log("\n✅ GT1 Part 2 completed successfully!");
>>>>>>> de5a1f9 (GT1 Part 2: Added generics, utility types, enums)
