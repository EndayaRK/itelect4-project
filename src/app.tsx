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

  // Loading
  if (isLoading) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>Event Tracker</h1>
        <p>Loading events...</p>
      </div>
    );
  }

  // Main render
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Event Tracker</h1>
     
      {/* Search */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '0.5rem',
            width: '100%',
            maxWidth: '350px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        />
        {previousSearch !== undefined && previousSearch !== searchTerm && (
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Previous search: "{previousSearch}"
          </p>
        )}
      </div>

      <hr />

      {/* User Selection */}
      <h2>Users</h2>
      <UserCard user={mockUsers[0]} onSelect={handleUserSelect} />
      <UserCard user={mockUsers[1]} onSelect={handleUserSelect} />

      {selectedUser && (
        <p style={{ color: '#28a745', fontWeight: 'bold' }}>
          Selected: {selectedUser.name} ({selectedUser.role})
        </p>
      )}

      <button
        onClick={toggleDetails}
        style={{
          padding: '0.4rem 1rem',
          cursor: 'pointer',
          background: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          marginTop: '1rem',
        }}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
          <h4>Statistics</h4>
          <p>Total Events: {events.length}</p>
          <p>Total Registrations: {registrations.length}</p>
          <p>Active Events: {events.filter(e => e.status === 'open').length}</p>
        </div>
      )}

      <hr />

      {/* Events */}
      <h2>Events ({filteredEvents.length})</h2>
      {filteredEvents.length === 0 ? (
        <p>No events found matching "{searchTerm}"</p>
      ) : (
        filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            registrations={registrations}
            onRegister={handleEventRegister}
            onViewDetails={handleEventViewDetails}
          />
        ))
      )}

      <hr />

      {/* Registrations */}
      <h2>Registrations</h2>
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
  );
}

export default App;