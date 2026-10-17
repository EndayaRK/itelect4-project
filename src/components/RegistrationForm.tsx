import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  type RegistrationFormData,
} from "@/schemas/registrationSchema";
import { RegistrationStatus } from "../types/index";
import { fetchEvents } from "../api/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
  isPending?: boolean;
}

export function RegistrationForm({
  onSubmit,
  isPending = false,
}: RegistrationFormProps) {
  const { data: events, isPending: eventsLoading } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    defaultValues: {
      eventId: "",
      status: RegistrationStatus.Pending,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Event -- dropdown, pulled from the API */}
      <div className="grid gap-1.5">
        <Label htmlFor="eventId" className="text-foreground">
          Event
        </Label>
        <select
          id="eventId"
          {...register("eventId")}
          disabled={eventsLoading}
          aria-invalid={errors.eventId ? true : undefined}
          className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground"
        >
          <option value="">
            {eventsLoading ? "Loading events..." : "Pick an event"}
          </option>
          {events?.map((event) => (
            <option key={event.id} value={event.id}>
              {event.title}
            </option>
          ))}
        </select>
        {errors.eventId && (
          <p className="text-sm text-red-600">{errors.eventId.message}</p>
        )}
        {events && events.length === 0 && (
          <p className="text-sm text-amber-600">
            No events yet — create one in Postman first, or have another
            organizer create one.
          </p>
        )}
      </div>

      {/* Status */}
      <div className="grid gap-1.5">
        <Label htmlFor="status" className="text-foreground">
          Status
        </Label>
        <select
          id="status"
          {...register("status")}
          className="h-8 rounded-lg border border-input bg-background px-2.5 text-sm text-foreground"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="waitlisted">Waitlisted</option>
        </select>
        {errors.status && (
          <p className="text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      {/* Notes */}
      <div className="grid gap-1.5">
        <Label htmlFor="notes" className="text-foreground">
          Notes (optional)
        </Label>
        <Input
          id="notes"
          {...register("notes")}
          aria-invalid={errors.notes ? true : undefined}
          placeholder="Any special requests?"
        />
        {errors.notes && (
          <p className="text-sm text-red-600">{errors.notes.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="justify-self-start">
        {isPending ? "Saving..." : "Register"}
      </Button>
    </form>
  );
}