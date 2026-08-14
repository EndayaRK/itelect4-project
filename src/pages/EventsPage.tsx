import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { mockEvents } from "../data/mockData";
import EventCard from "../components/EventCard";
import usePrevious from "../hooks/usePrevious";
import type { Event } from "../types/index";

function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  const previousSearch = usePrevious(searchTerm);

  useEffect(() => {
    setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
    }, 500);
  }, []);

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="animate-pulse p-6">Loading events...</div>;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Events</h2>
      <input
        ref={searchInputRef}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search events..."
        className="w-full rounded border p-2"
      />
      {previousSearch && previousSearch !== searchTerm && (
        <p className="text-sm text-gray-500">Previous search: "{previousSearch}"</p>
      )}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(event => (
          <Link key={event.id} to={`/events/${event.id}`}>
            <EventCard event={event} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;