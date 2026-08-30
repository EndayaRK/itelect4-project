import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationFormData } from "@/schemas/registrationSchema";
import { RegistrationStatus } from "../types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
  isPending?: boolean;
}

export function RegistrationForm({ onSubmit, isPending = false }: RegistrationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
    defaultValues: {
      userId: 1,
      status: RegistrationStatus.Pending,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Event ID */}
      <div className="grid gap-1.5">
        <Label htmlFor="eventId" className="text-foreground">
          Event ID
        </Label>
        <Input
          id="eventId"
          type="number"
          {...register("eventId", { valueAsNumber: true })}
          aria-invalid={errors.eventId ? true : undefined}
          placeholder="Enter event ID (e.g., 1)"
        />
        {errors.eventId && (
          <p className="text-sm text-red-600">{errors.eventId.message}</p>
        )}
      </div>

      {/* User ID */}
      <div className="grid gap-1.5">
        <Label htmlFor="userId" className="text-foreground">
          User ID
        </Label>
        <Input
          id="userId"
          type="number"
          {...register("userId", { valueAsNumber: true })}
          aria-invalid={errors.userId ? true : undefined}
          placeholder="Enter user ID"
        />
        {errors.userId && (
          <p className="text-sm text-red-600">{errors.userId.message}</p>
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

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isPending}
        className="justify-self-start"
      >
        {isPending ? "Saving..." : "Register"}
      </Button>
    </form>
  );
}