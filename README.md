<<<<<<< HEAD
# Campus Event & Activity Tracker

## Project Concept
A React + TypeScript web application for managing campus events, user registrations, and event sign-ups. This project is built using Vite and demonstrates typed React components with TypeScript.

## Tech Stack
- React 18
- TypeScript
- Vite
- ESLint

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
=======
# ITELECT4 - TypeScript Advanced Types (GT1 Part 2)

## Project Concept
A TypeScript-based academic management system demonstrating advanced TypeScript features including generics, utility types, and enums. This project serves as the foundation for future modules covering React, routing, and real-time features.

## Core Entities

### User
- `id: number` - Unique identifier
- `name: string` - User's full name
- `email: string` - Email address
- `role: "student" | "admin" | "instructor"` - User role
- `isActive: boolean` - Account status

### Course
- `code: string` - Course code (e.g., "ITELECT4")
- `title: string` - Course title
- `units: number` - Number of units
- `semester: string` - Semester offered

### Submission
- `id: number` - Unique identifier
- `studentId: number` - Reference to student
- `courseCode: string` - Reference to course
- `submittedAt: Date` - Submission timestamp
- `score?: number` - Optional grade

## TypeScript Features Implemented

### ✅ Generics
- `ApiResponse<T>` - Generic interface for consistent API responses
- `getFirst<T>()` - Returns the first element of any array
- `getById<T extends { id: number }>()` - Finds an item by ID (constrained generic)

### ✅ Utility Types
- `Partial<User>` - All fields optional (for updates)
- `Pick<User, "id" | "name" | "role">` - Select specific fields
- `Omit<User, "email" | "isActive">` - Exclude sensitive fields
- `Record<"student" | "admin" | "instructor", number>` - Key-value mapping
- `ReturnType<typeof makeSubmission>` - Infer return type from function

### ✅ Enums
- `SubmissionStatus` - Regular enum with reverse mapping (Pending, Graded, Late)
- `Role` - Const enum with zero runtime overhead (Student, Admin, Instructor)

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/shin486/itelect4-project.git
cd itelect4-project

# Install dependencies
npm install

# Install TypeScript and ts-node (if not installed globally)
npm install -g typescript ts-node
>>>>>>> de5a1f9 (GT1 Part 2: Added generics, utility types, enums)
