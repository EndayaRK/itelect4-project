import { mockRegistrations } from "../data/mockData";
import RegistrationBadge from "../components/RegistrationBadge";

function SubmissionsPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">My Registrations</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mockRegistrations.map(reg => (
          <RegistrationBadge key={reg.id} registration={reg} />
        ))}
      </div>
    </div>
  );
}

export default SubmissionsPage;