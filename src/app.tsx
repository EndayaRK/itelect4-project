import UserCard from "./components/UserCard";
import EventCard from "./components/EventCard";
import RegistrationBadge from "./components/RegistrationBadge";
import { mockUsers, mockEvents, mockRegistrations } from "./data/mockData";
import type { User, Event, Registration } from "./types/index";

function App() {
  const handleUserSelect = (user: User): void => {
    console.log("User selected:", user.name);
    alert(`Selected: ${user.name}`);
  };

  const handleEventRegister = (event: Event): void => {
    console.log("Registering for event:", event.title);
    alert(`Registration for "${event.title}" submitted!`);
  };

  const handleEventViewDetails = (event: Event): void => {
    console.log("Viewing details for:", event.title);
    const registrations = mockRegistrations.filter((r) => r.eventId === event.id);
    const confirmedCount = registrations.filter(
      (r) => r.status === "confirmed"
    ).length;
    alert(
      `📋 ${event.title}\n\n` +
      `📝 ${event.description}\n` +
      `📍 ${event.location}\n` +
      `📅 ${new Date(event.startDate).toLocaleString()}\n` +
      `✅ ${confirmedCount}/${event.capacity} registered`
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

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <h1>🎪 Campus Event & Activity Tracker</h1>
      <p style={{ color: '#666' }}>GT2 Part 1 - React + TypeScript Components</p>

      <hr style={{ margin: '2rem 0' }} />

      <h2>👤 User Card</h2>
      <UserCard user={mockUsers[0]} onSelect={handleUserSelect} />

      <h2>👤 Another User</h2>
      <UserCard user={mockUsers[1]} onSelect={handleUserSelect} />

      <hr style={{ margin: '2rem 0' }} />

      <h2>📅 Event Card</h2>
      <EventCard 
        event={mockEvents[0]} 
        registrations={mockRegistrations}
        onRegister={handleEventRegister}
        onViewDetails={handleEventViewDetails}
      />

      <h2>📅 Another Event</h2>
      <EventCard 
        event={mockEvents[1]} 
        registrations={mockRegistrations}
        onRegister={handleEventRegister}
        onViewDetails={handleEventViewDetails}
      />

      <hr style={{ margin: '2rem 0' }} />

      <h2>📋 Registration Badge</h2>
      <RegistrationBadge 
        registration={mockRegistrations[0]}
        event={mockEvents.find((e) => e.id === mockRegistrations[0].eventId)}
        user={mockUsers.find((u) => u.id === mockRegistrations[0].userId)}
        onCancel={handleRegistrationCancel}
        onConfirm={handleRegistrationConfirm}
      />

      <h2>📋 Another Registration</h2>
      <RegistrationBadge 
        registration={mockRegistrations[1]}
        event={mockEvents.find((e) => e.id === mockRegistrations[1].eventId)}
        user={mockUsers.find((u) => u.id === mockRegistrations[1].userId)}
        onCancel={handleRegistrationCancel}
        onConfirm={handleRegistrationConfirm}
      />

      <hr style={{ margin: '2rem 0' }} />

      <h3>📊 Live Feature Demo: Remaining Spots</h3>
      <p>Event: <strong>{mockEvents[0].title}</strong></p>
      <p>Capacity: {mockEvents[0].capacity}</p>
      <p>Confirmed Registrations: {mockRegistrations.filter(
        r => r.eventId === mockEvents[0].id && r.status === "confirmed"
      ).length}</p>
      <p style={{ color: '#28a745', fontWeight: 'bold' }}>
        Remaining Spots: {mockEvents[0].capacity - mockRegistrations.filter(
          r => r.eventId === mockEvents[0].id && r.status === "confirmed"
        ).length}
      </p>
    </div>
  );
}

export default App;