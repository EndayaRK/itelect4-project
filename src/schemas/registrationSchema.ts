import { z } from "zod";
import { RegistrationStatus } from "../types/index";

export const registrationSchema = z
  .object({
    // Rule 1: an event must be picked. The id is a MongoDB hex string,
    // not a number, so this is a non-empty-string check.
    eventId: z.string().min(1, "Pick an event."),

    // Rule 2: status must be one of the enum values
    status: z.nativeEnum(RegistrationStatus, {
      message: "Please select a valid status",
    }),

    // Rule 3: notes is optional but max 200 characters
    notes: z.string().max(200, "Notes cannot exceed 200 characters").optional(),
  })
  .refine(
    // Rule 4: if notes is provided, it must not be blank
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

export type RegistrationFormData = z.infer<typeof registrationSchema>;