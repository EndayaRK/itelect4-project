import type { Event, Registration } from "../types/index";
import { getRemainingSpots } from "../types/index";

interface EventCardProps {
  event: Event;
  registrations?: Registration[];
  variant?: "default" | "compact";
  onRegister?: (event: Event) => void;
  onViewDetails?: (event: Event) => void;
}

function EventCard({
  event,
  registrations = [],
  variant = "default",
  onRegister,
  onViewDetails,
}: EventCardProps) {
  const isCompact = variant === "compact";

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
    draft: "text-gray-500 dark:text-gray-400",
    open: "text-green-600 dark:text-green-400",
    ongoing: "text-yellow-600 dark:text-yellow-400",
    closed: "text-red-600 dark:text-red-400",
  }[event.status] || "text-gray-500 dark:text-gray-400";

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700 ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <h3
        className={`font-bold text-gray-900 dark:text-white ${
          isCompact ? "text-sm" : "text-lg"
        }`}
      >
        {event.title}
      </h3>
      {!isCompact && (
        <>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {event.description}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Category: {event.category}
          </p>
        </>
      )}
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Status: <span className={statusColor}>{event.status}</span>
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Capacity: {event.capacity} | Remaining: {remainingSpots}
      </p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Location: {event.location}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={handleViewDetails}
          className="rounded bg-gray-600 px-3 py-1 text-sm text-white transition hover:bg-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Details
        </button>
        <button
          onClick={handleRegister}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default EventCard;
