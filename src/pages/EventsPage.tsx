import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { mockEvents } from "../data/mockData";
import EventCard from "../components/EventCard";
import usePrevious from "../hooks/usePrevious";
import type { Event } from "../types/index";

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious(searchTerm);
  const navigate = useNavigate();

  // Handler for "Details" button - navigates to event detail page
  const handleViewDetails = (event: Event): void => {
    navigate(`/events/${event.id}`);
  };

  // Handler for "Register" button
  const handleRegister = (event: Event): void => {
    alert(`Registration for "${event.title}" submitted!`);
  };

  useEffect(() => {
    setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 500);
  }, []);

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="animate-pulse p-6">Loading events...</div>;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Events
      </h2>

      <input
        ref={searchInputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search events..."
        className="w-full rounded border border-gray-300 p-2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />

      {previousSearch && previousSearch !== searchTerm && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Previous search: "{previousSearch}"
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`}>
            <EventCard
              event={event}
              onRegister={handleRegister}
              onViewDetails={handleViewDetails}  // ← Pass the handler!
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;