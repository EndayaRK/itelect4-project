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
  onConfirm,
}: RegistrationBadgeProps) {
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onCancel) onCancel(registration);
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onConfirm) onConfirm(registration);
  };

  const statusColor = {
    pending: '#ffc107',
    confirmed: '#28a745',
    cancelled: '#dc3545',
    waitlisted: '#6c757d',
  }[registration.status] || '#6c757d';

  return (
    <div style={{ border: '1px solid #28a745', padding: '1rem', margin: '0.5rem 0', borderRadius: '4px' }}>
      <h4>Registration #{registration.id}</h4>
      {user && <p><strong>User:</strong> {user.name} ({user.email})</p>}
      {event && <p><strong>Event:</strong> {event.title}</p>}
      <p><strong>Status:</strong> <span style={{ color: statusColor }}>{registration.status}</span></p>
      <p><strong>Registered:</strong> {new Date(registration.registeredAt).toLocaleString()}</p>
      {registration.notes && <p><strong>Notes:</strong> {registration.notes}</p>}
      <div>
        {registration.status === 'pending' && (
          <button onClick={handleConfirm} style={{ marginRight: '0.5rem', padding: '0.3rem 1rem', cursor: 'pointer' }}>
            Confirm
          </button>
        )}
        {registration.status !== 'cancelled' && (
          <button onClick={handleCancel} style={{ padding: '0.3rem 1rem', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default RegistrationBadge;