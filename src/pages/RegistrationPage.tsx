import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiRegistration } from "../types/index";
import RegistrationBadge from "../components/RegistrationBadge";
import { RegistrationForm } from "../components/RegistrationForm";
import { fetchRegistrations, createRegistration, toRegistration } from "../api/clients";
import type { RegistrationFormData } from "@/schemas/registrationSchema";

function RegistrationsPage() {
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery<ApiRegistration[]>({
    queryKey: ["registrations"],
    queryFn: fetchRegistrations,
  });

  const addRegistration = useMutation({
    mutationFn: createRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
  });

  // ===== HANDLERS FOR CONFIRM / CANCEL =====
  const handleConfirm = (registration: ApiRegistration) => {
    alert(`Registration #${registration.id} confirmed!`);
    console.log("Confirmed:", registration.id);
    // In a real app, you would call a mutation here:
    // updateRegistration.mutate({ ...registration, status: "confirmed" });
  };

  const handleCancel = (registration: ApiRegistration) => {
    alert(`Registration #${registration.id} cancelled!`);
    console.log("Cancelled:", registration.id);
    // In a real app, you would call a mutation here:
    // updateRegistration.mutate({ ...registration, status: "cancelled" });
  };

  const handleSubmit = (formData: RegistrationFormData) => {
    addRegistration.mutate({
      eventId: formData.eventId,
      userId: formData.userId,
      status: formData.status,
      registeredAt: new Date().toISOString(),
      notes: formData.notes,
    });
  };

  if (isPending) {
    return <div className="animate-pulse p-6">Loading registrations...</div>;
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Could not load registrations.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        My Registrations
      </h2>

      <div className="mb-8 max-w-md rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <h3 className="mb-4 text-lg font-semibold">New Registration</h3>
        <RegistrationForm
          onSubmit={handleSubmit}
          isPending={addRegistration.isPending}
        />
        {addRegistration.isError && (
          <p className="mt-2 text-sm text-red-700">
            {addRegistration.error.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {data?.map((reg) => (
          <RegistrationBadge
            key={reg.id}
            registration={toRegistration(reg)}
            onConfirm={() => handleConfirm(reg)}   // ← Pass confirm handler
            onCancel={() => handleCancel(reg)}     // ← Pass cancel handler
          />
        ))}
      </div>
    </div>
  );
}

export default RegistrationsPage;