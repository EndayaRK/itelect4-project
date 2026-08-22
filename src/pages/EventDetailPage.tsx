import { useParams, useNavigate } from "react-router";
import { mockEvents } from "../data/mockData";
import EventCard from "../components/EventCard";

function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === Number(id));

  if (!event) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-700">Event not found.</div>;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">{event.title}</h2>
      <div className="max-w-sm">
        <EventCard event={event} />
      </div>
      <button onClick={() => navigate("/events")} className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-white">
        Back to Events
      </button>
    </div>
  );
}

export default EventDetailPage;