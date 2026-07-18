import type { User } from "../types/index";

interface UserCardProps {
  user: User;
  onSelect?: (user: User) => void;
}

function UserCard({ user, onSelect }: UserCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (onSelect) {
      onSelect(user);
    }
    console.log("User selected:", user.name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("Search input:", e.target.value);
  };

  return (
    <div className="user-card" style={{ 
      border: '1px solid #ccc', 
      padding: '1rem', 
      margin: '1rem 0', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Status:</strong> {user.isActive ? '✅ Active' : '❌ Inactive'}</p>
      
      <div style={{ marginTop: '0.5rem' }}>
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={handleChange}
          style={{ 
            marginRight: '0.5rem', 
            padding: '0.3rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={handleClick} 
          style={{ 
            padding: '0.3rem 1rem', 
            cursor: 'pointer',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Select User
        </button>
      </div>
    </div>
  );
}

export default UserCard;