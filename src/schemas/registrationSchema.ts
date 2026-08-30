import { z } from "zod";
import { RegistrationStatus } from "../types/index";

export const registrationSchema = z.object({
  // Rule 1: Event ID must be a positive number
  eventId: z.number()
    .min(1, "Event ID must be at least 1")
    .positive("Event ID must be a positive number"),

  // Rule 2: User ID must be a positive number
  userId: z.number()
    .min(1, "User ID is required")
    .positive("User ID must be positive"),

  // Rule 3: Status must be one of the enum values
  status: z.nativeEnum(RegistrationStatus, {
    message: "Please select a valid status",
  }),

  // Rule 4: Notes is optional but max 200 characters
  notes: z.string()
    .max(200, "Notes cannot exceed 200 characters")
    .optional(),
}).refine(
  // Rule 5: .refine() – if notes is provided, it must not be empty
  (data) => {
    if (data.notes !== undefined && data.notes.trim() === "") {
      return false;
    }
    return true;
  },
  {
    message: "Notes cannot be empty if provided",
    path: ["notes"],
  }
);

// z.infer – the TypeScript type comes from the schema
export type RegistrationFormData = z.infer<typeof registrationSchema>;