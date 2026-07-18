// ============================================
// INTERFACES (GT1 Part 1)
// ============================================

export interface User {
  id: number;
  name: string;
  email: string;
  role: "student" | "admin" | "instructor";
  isActive: boolean;
}

export interface Course {
  code: string;
  title: string;
  units: number;
  semester: string;
}

export interface Submission {
  id: number;
  studentId: number;
  courseCode: string;
  submittedAt: Date;
  score?: number;
}

// ============================================
// GENERIC INTERFACE (GT1 Part 2)
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ============================================
// GENERIC FUNCTIONS (GT1 Part 2)
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
// UTILITY TYPES (GT1 Part 2)
// ============================================

export type UserUpdate = Partial<User>;
export type UserPreview = Pick<User, "id" | "name" | "role">;
export type PublicUser = Omit<User, "email" | "isActive">;
export type RoleCount = Record<"student" | "admin" | "instructor", number>;

// ============================================
// ENUMS (GT1 Part 2)
// ============================================

export enum SubmissionStatus {
  Pending,
  Graded,
  Late,
}

export const enum Role {
  Student = "student",
  Admin = "admin",
  Instructor = "instructor",
}