import type { Registration, Event, User } from "../types/index";
import { RegistrationStatus } from "../types/index";

interface RegistrationBadgeProps {
  registration: Registration;
  event?: Event;
  user?: User;
  onCancel?: (registration: Registration) => void;
  onConfirm?: (registration: Registration) => void;
}

function RegistrationBadge({ 
  registration, 
  event, 
  user, 
  onCancel, 
  onConfirm 
}: RegistrationBadgeProps) {
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onCancel) {
      onCancel(registration);
    }
    console.log("Cancelling registration:", registration.id);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm(registration);
    }
    console.log("Confirming registration:", registration.id);
  };

  const getStatusColor = (status: RegistrationStatus): string => {
    switch (status) {
      case RegistrationStatus.Confirmed: return '#28a745';
      case RegistrationStatus.Pending: return '#ffc107';
      case RegistrationStatus.Cancelled: return '#dc3545';
      case RegistrationStatus.Waitlisted: return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="registration-badge" style={{ 
      border: '1px solid #28a745', 
      padding: '1rem', 
      margin: '1rem 0', 
      borderRadius: '8px',
      backgroundColor: '#f0fff0'
    }}>
      <h4>📋 Registration #{registration.id}</h4>
      
      {user && (
        <p><strong>User:</strong> {user.name} ({user.email})</p>
      )}
      
      {event && (
        <p><strong>Event:</strong> {event.title}</p>
      )}
      
      <p><strong>Status:</strong> 
        <span style={{ 
          color: getStatusColor(registration.status),
          fontWeight: 'bold',
          marginLeft: '0.3rem'
        }}>
          {registration.status}
        </span>
      </p>
      
      <p><strong>Registered:</strong> {new Date(registration.registeredAt).toLocaleString()}</p>
      
      {registration.notes && (
        <p><strong>Notes:</strong> {registration.notes}</p>
      )}
      
      <div style={{ marginTop: '0.5rem' }}>
        {registration.status === RegistrationStatus.Pending && (
          <button 
            onClick={handleConfirm}
            style={{ 
              padding: '0.3rem 1rem', 
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginRight: '0.5rem'
            }}
          >
            Confirm
          </button>
        )}
        
        {registration.status !== RegistrationStatus.Cancelled && (
          <button 
            onClick={handleCancel}
            style={{ 
              padding: '0.3rem 1rem', 
              cursor: 'pointer',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Cancel Registration
          </button>
        )}
      </div>
    </div>
  );
}

export default RegistrationBadge;