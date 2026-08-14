import { useState } from "react";
import UserCard from "../components/UserCard";
import useToggle from "../hooks/useToggle";
import { mockUsers } from "../data/mockData";
import type { User } from "../types/index";

function DashboardPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetails, toggleDetails] = useToggle(false);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mockUsers.map(user => (
          <UserCard key={user.id} user={user} onSelect={setSelectedUser} />
        ))}
      </div>
      {selectedUser && (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Selected: {selectedUser.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {selectedUser.email}
          </p>
          <button
            onClick={toggleDetails}
            className="mt-3 rounded bg-gray-600 px-3 py-1.5 text-sm text-white transition hover:bg-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
          {showDetails && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Role: {selectedUser.role} | Status: {selectedUser.isActive ? "Active" : "Inactive"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default DashboardPage;