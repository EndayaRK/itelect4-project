import type { ApiRegistration } from "../types/index";
import { Button } from "@/components/ui/button";

interface RegistrationBadgeProps {
  registration: ApiRegistration;
  onConfirm: () => void;
  onCancel: () => void;
}

// A tiny status → class map so the badge colour reflects the status.
const statusStyles: Record<ApiRegistration["status"], string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  waitlisted: "bg-gray-200 text-gray-800",
};

export default function RegistrationBadge({
  registration,
  onConfirm,
  onCancel,
}: RegistrationBadgeProps) {
  // registeredAt is an ISO string now, so it has to be wrapped in a Date
  // before anything date-related can be done with it.
  const submitted = new Date(registration.registeredAt).toLocaleString();

  return (
    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          #{registration.id.slice(-6)}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[registration.status]}`}
        >
          {registration.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Event: {registration.eventId}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Registered: {submitted}
      </p>

      {registration.notes && (
        <p className="mt-1 text-sm italic text-gray-500">
          {registration.notes}
        </p>
      )}

      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={onConfirm}>
          Confirm
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}