import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">404 – Page Not Found</h2>
      <Link to="/" className="text-blue-600 underline">Go to Dashboard</Link>
    </div>
  );
}

export default NotFoundPage;