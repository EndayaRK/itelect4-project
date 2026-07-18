import type { User, Event, Registration } from "../types/index";
import { EventStatus, RegistrationStatus } from "../types/index";

// ===== MOCK USERS =====
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    role: "student",
    isActive: true,
    createdAt: new Date("2026-01-15"),
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    role: "organizer",
    isActive: true,
    createdAt: new Date("2026-01-10"),
  },
  {
    id: 3,
    name: "Jose Rizal",
    email: "jose@example.com",
    role: "admin",
    isActive: true,
    createdAt: new Date("2026-01-05"),
  },
  {
    id: 4,
    name: "Ana Reyes",
    email: "ana@example.com",
    role: "student",
    isActive: false,
    createdAt: new Date("2026-02-01"),
  },
];

// ===== MOCK EVENTS =====
export const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Talk: AI in Education",
    description: "Join us for an exciting talk about how AI is transforming education.",
    category: "academic",
    capacity: 50,
    status: EventStatus.Open,
    startDate: new Date("2026-08-15T14:00:00"),
    endDate: new Date("2026-08-15T17:00:00"),
    organizerId: 2,
    location: "Engineering Building, Room 301",
    createdAt: new Date("2026-07-01"),
  },
  {
    id: 2,
    title: "Campus Sports Fest",
    description: "Annual sports competition with basketball, volleyball, and more!",
    category: "sports",
    capacity: 100,
    status: EventStatus.Ongoing,
    startDate: new Date("2026-07-20T08:00:00"),
    endDate: new Date("2026-07-22T18:00:00"),
    organizerId: 2,
    location: "University Gymnasium",
    createdAt: new Date("2026-06-15"),
  },
  {
    id: 3,
    title: "Career Fair 2026",
    description: "Connect with top companies and explore job opportunities.",
    category: "career",
    capacity: 200,
    status: EventStatus.Closed,
    startDate: new Date("2026-06-10T09:00:00"),
    endDate: new Date("2026-06-10T17:00:00"),
    organizerId: 3,
    location: "Student Center, Hall A",
    createdAt: new Date("2026-05-01"),
  },
  {
    id: 4,
    title: "Hackathon 2026",
    description: "48-hour coding competition with exciting prizes!",
    category: "academic",
    capacity: 80,
    status: EventStatus.Draft,
    startDate: new Date("2026-09-05T10:00:00"),
    endDate: new Date("2026-09-07T18:00:00"),
    organizerId: 2,
    location: "Innovation Hub, Floor 2",
    createdAt: new Date("2026-07-10"),
  },
];

// ===== MOCK REGISTRATIONS =====
export const mockRegistrations: Registration[] = [
  {
    id: 1,
    eventId: 1,
    userId: 1,
    status: RegistrationStatus.Confirmed,
    registeredAt: new Date("2026-07-02"),
    notes: "Interested in AI ethics discussion.",
  },
  {
    id: 2,
    eventId: 1,
    userId: 4,
    status: RegistrationStatus.Pending,
    registeredAt: new Date("2026-07-15"),
  },
  {
    id: 3,
    eventId: 2,
    userId: 1,
    status: RegistrationStatus.Confirmed,
    registeredAt: new Date("2026-07-01"),
  },
  {
    id: 4,
    eventId: 3,
    userId: 1,
    status: RegistrationStatus.Cancelled,
    registeredAt: new Date("2026-05-15"),
  },
  {
    id: 5,
    eventId: 3,
    userId: 4,
    status: RegistrationStatus.Confirmed,
    registeredAt: new Date("2026-05-20"),
  },
];