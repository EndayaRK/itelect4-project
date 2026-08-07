import { useState, useEffect, useRef } from "react";
import type { User, Event, Registration } from "./types/index";
import { mockUsers, mockEvents, mockRegistrations } from "./data/mockData";
import UserCard from "./components/UserCard";
import EventCard from "./components/EventCard";
import RegistrationBadge from "./components/RegistrationBadge";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

function App() {
  // State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations] = useState<Registration[]>(mockRegistrations);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Ref
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Custom hooks
  const [showDetails, toggleDetails] = useToggle(false);
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const previousSearch = usePrevious(searchTerm);

  // Load data on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(mockEvents);
      setIsLoading(false);
      searchInputRef.current?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
    console.log("User selected:", user.name);
  };

  const handleEventRegister = (event: Event): void => {
    console.log("Registering for event:", event.title);
    alert(`Registration for "${event.title}" submitted!`);
  };

  const handleEventViewDetails = (event: Event): void => {
    const registrationsForEvent = registrations.filter(
      (r) => r.eventId === event.id
    );
    const confirmedCount = registrationsForEvent.filter(
      (r) => r.status === "confirmed"
    ).length;
    alert(
      `${event.title}\n\n` +
        `${event.description}\n` +
        `Location: ${event.location}\n` +
        `Start: ${new Date(event.startDate).toLocaleString()}\n` +
        `Registered: ${confirmedCount}/${event.capacity}`
    );
  };

  const handleRegistrationCancel = (registration: Registration): void => {
    console.log("Cancelling registration:", registration.id);
    alert(`Registration #${registration.id} cancelled!`);
  };

  const handleRegistrationConfirm = (registration: Registration): void => {
    console.log("Confirming registration:", registration.id);
    alert(`Registration #${registration.id} confirmed!`);
  };

  // Derived state
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-lg text-gray-500 dark:text-gray-400">
          Loading events...
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Event Tracker
            </h1>
            <button
              onClick={toggleDarkMode}
              className="rounded bg-gray-800 px-3 py-1.5 text-sm text-white transition hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {/* Search */}
          <div className="mt-4">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            {previousSearch !== undefined && previousSearch !== searchTerm && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Previous search: "{previousSearch}"
              </p>
            )}
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          {/* Users */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Users
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <UserCard user={mockUsers[0]} onSelect={handleUserSelect} />
            <UserCard user={mockUsers[1]} onSelect={handleUserSelect} />
          </div>

          {selectedUser && (
            <p className="mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
              Selected: {selectedUser.name} ({selectedUser.role})
            </p>
          )}

          <button
            onClick={toggleDetails}
            className="mt-3 rounded bg-gray-600 px-3 py-1.5 text-sm text-white transition hover:bg-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {showDetails ? "Hide" : "Show"} Details
          </button>

          {showDetails && (
            <div className="mt-3 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Statistics
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total Events: {events.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Total Registrations: {registrations.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Active Events: {events.filter((e) => e.status === "open").length}
              </p>
            </div>
          )}

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          {/* Events */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Events ({filteredEvents.length})
          </h2>
          {filteredEvents.length === 0 ? (
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              No events found matching "{searchTerm}"
            </p>
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  registrations={registrations}
                  variant="default"
                  onRegister={handleEventRegister}
                  onViewDetails={handleEventViewDetails}
                />
              ))}
            </div>
          )}

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          {/* Registrations */}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Registrations
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {registrations.slice(0, 2).map((registration) => (
              <RegistrationBadge
                key={registration.id}
                registration={registration}
                event={events.find((e) => e.id === registration.eventId)}
                user={mockUsers.find((u) => u.id === registration.userId)}
                onCancel={handleRegistrationCancel}
                onConfirm={handleRegistrationConfirm}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
