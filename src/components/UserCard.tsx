import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onSelect) onSelect(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Search input:", e.target.value);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem 0', borderRadius: '4px' }}>
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
      <div>
        <input
          type="text"
          placeholder="Quick note..."
          onChange={handleChange}
          style={{ marginRight: '0.5rem', padding: '0.3rem' }}
        />
        <button onClick={handleClick} style={{ padding: '0.3rem 1rem', cursor: 'pointer' }}>
          Select
        </button>
      </div>
    </div>
  );
}

export default UserCard;