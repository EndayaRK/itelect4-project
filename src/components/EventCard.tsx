import type { Event, Registration } from "../types/index";
import { EventStatus, getRemainingSpots } from "../types/index";

interface EventCardProps {
  event: Event;
  registrations?: Registration[];
  onRegister?: (event: Event) => void;
  onViewDetails?: (event: Event) => void;
}

function EventCard({ event, registrations = [], onRegister, onViewDetails }: EventCardProps) {
  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onRegister) onRegister(event);
  };

  const handleViewDetails = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onViewDetails) onViewDetails(event);
  };

  const remainingSpots = getRemainingSpots(event, registrations);
  const statusColor = {
    draft: '#6c757d',
    open: '#28a745',
    ongoing: '#ffc107',
    closed: '#dc3545',
  }[event.status] || '#6c757d';

  return (
    <div style={{ border: '1px solid #007bff', padding: '1rem', margin: '0.5rem 0', borderRadius: '4px' }}>
      <h3>{event.title}</h3>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Status:</strong> <span style={{ color: statusColor }}>{event.status}</span></p>
      <p><strong>Capacity:</strong> {event.capacity}</p>
      <p><strong>Remaining:</strong> {remainingSpots}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Start:</strong> {new Date(event.startDate).toLocaleString()}</p>
      <div>
        <button onClick={handleViewDetails} style={{ marginRight: '0.5rem', padding: '0.3rem 1rem', cursor: 'pointer' }}>
          Details
        </button>
        <button onClick={handleRegister} style={{ padding: '0.3rem 1rem', cursor: 'pointer' }}>
          Register
        </button>
      </div>
    </div>
  );
}

export default EventCard;