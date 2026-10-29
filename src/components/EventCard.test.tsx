import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventCard from "./EventCard";
import {
  EventStatus,
  RegistrationStatus,
  type Event,
  type Registration,
} from "../types/index";

const event: Event = {
  id: 1,
  title: "AI in Education Summit",
  description: "A talk on AI tools for students.",
  category: "academic",
  capacity: 50,
  status: EventStatus.Open,
  startDate: new Date("2026-11-10T09:00:00"),
  endDate: new Date("2026-11-10T12:00:00"),
  organizerId: 7,
  location: "CTE Building, Room 301",
  createdAt: new Date("2026-10-01T00:00:00"),
};

describe("EventCard", () => {
  it("shows the title, status, and full capacity when there are no registrations", () => {
    render(<EventCard event={event} />);

    expect(screen.getByText("AI in Education Summit")).toBeInTheDocument();
    expect(screen.getByText("open")).toBeInTheDocument();
    expect(
      screen.getByText("Capacity: 50 | Remaining: 50"),
    ).toBeInTheDocument();
  });

  it("subtracts only confirmed registrations from the remaining spots", () => {
    const registrations: Registration[] = [
      {
        id: 1,
        eventId: 1,
        userId: 10,
        status: RegistrationStatus.Confirmed,
        registeredAt: new Date("2026-10-05T00:00:00"),
      },
      {
        id: 2,
        eventId: 1,
        userId: 11,
        status: RegistrationStatus.Confirmed,
        registeredAt: new Date("2026-10-06T00:00:00"),
      },
      {
        id: 3,
        eventId: 1,
        userId: 12,
        status: RegistrationStatus.Pending,
        registeredAt: new Date("2026-10-07T00:00:00"),
      },
    ];

    render(<EventCard event={event} registrations={registrations} />);

    // 50 capacity - 2 confirmed = 48; the pending one doesn't count
    expect(
      screen.getByText("Capacity: 50 | Remaining: 48"),
    ).toBeInTheDocument();
  });
});