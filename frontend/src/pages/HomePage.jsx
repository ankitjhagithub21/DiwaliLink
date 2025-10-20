import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/wish/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
            window.location.href = data.url;
        } else {
          console.error('API response indicated failure');
        }
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('Error making API request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-100">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">🪔 Happy Diwali!</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered"
          disabled={loading}
        />
        <button type="submit" className="btn btn-warning" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
    </div>
  );
}
