import type { Registration, Event, User } from "../types/index";

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
    pending: "text-yellow-600 dark:text-yellow-400",
    confirmed: "text-green-600 dark:text-green-400",
    cancelled: "text-red-600 dark:text-red-400",
    waitlisted: "text-gray-500 dark:text-gray-400",
  }[registration.status] || "text-gray-500 dark:text-gray-400";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h4 className="font-bold text-gray-900 dark:text-white">
        Registration #{registration.id}
      </h4>
      {user && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          User: {user.name} ({user.email})
        </p>
      )}
      {event && (
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Event: {event.title}
        </p>
      )}
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Status: <span className={statusColor}>{registration.status}</span>
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Registered: {new Date(registration.registeredAt).toLocaleString()}
      </p>
      {registration.notes && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Notes: {registration.notes}
        </p>
      )}
      <div className="mt-3 flex gap-2">
        {registration.status === "pending" && (
          <button
            onClick={handleConfirm}
            className="rounded bg-green-600 px-3 py-1 text-sm text-white transition hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Confirm
          </button>
        )}
        {registration.status !== "cancelled" && (
          <button
            onClick={handleCancel}
            className="rounded bg-red-600 px-3 py-1 text-sm text-white transition hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default RegistrationBadge;
