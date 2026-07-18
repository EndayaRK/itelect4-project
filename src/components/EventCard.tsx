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
    if (onRegister) {
      onRegister(event);
    }
    console.log("Registering for:", event.title);
  };

  const handleViewDetails = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onViewDetails) {
      onViewDetails(event);
    }
    console.log("Viewing details:", event.title);
  };

  const remainingSpots = getRemainingSpots(event, registrations);

  const getStatusColor = (status: EventStatus): string => {
    switch (status) {
      case EventStatus.Open: return '#28a745';
      case EventStatus.Ongoing: return '#ffc107';
      case EventStatus.Closed: return '#dc3545';
      case EventStatus.Draft: return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="event-card" style={{ 
      border: '1px solid #007bff', 
      padding: '1rem', 
      margin: '1rem 0', 
      borderRadius: '8px',
      backgroundColor: '#f0f8ff'
    }}>
      <h3>{event.title}</h3>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Status:</strong> 
        <span style={{ 
          color: getStatusColor(event.status),
          fontWeight: 'bold',
          marginLeft: '0.3rem'
        }}>
          {event.status}
        </span>
      </p>
      <p><strong>Capacity:</strong> {event.capacity}</p>
      <p><strong>Remaining Spots:</strong> {remainingSpots}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Start:</strong> {new Date(event.startDate).toLocaleString()}</p>
      
      <div style={{ marginTop: '0.5rem' }}>
        <button 
          onClick={handleViewDetails}
          style={{ 
            padding: '0.3rem 1rem', 
            cursor: 'pointer',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginRight: '0.5rem'
          }}
        >
          View Details
        </button>
        <button 
          onClick={handleRegister}
          style={{ 
            padding: '0.3rem 1rem', 
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default EventCard;