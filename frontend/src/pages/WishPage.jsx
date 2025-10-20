import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DiwaliLoader from "../components/DiwaliLoader"; // <-- Import the loader

export default function WishPage() {
  const { slug } = useParams();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishName = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/wish/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setDisplayName(data.name || slug.replace(/-/g, " "));
        } else {
          setDisplayName(slug.replace(/-/g, " "));
        }
      } catch (err) {
        setError(err.message);
        setDisplayName(slug.replace(/-/g, " "));
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchWishName();
    }
  }, [slug]);

  if (loading) {
    return <DiwaliLoader />; // ✨ Beautiful loader here!
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-50">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-orange-100 to-yellow-200 text-center p-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-orange-600"
      >
        🪔 Happy Diwali {displayName}!
      </motion.h1>

      <p className="mt-4 text-lg text-gray-700">
        Wishing you joy, prosperity, and light this festive season 🎆
      </p>

      <motion.div
        animate={{ rotate: [0, 20, -20, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-10 text-6xl"
      >
        🪔
      </motion.div>

      <a
        href="/"
        className="mt-8 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
      >
        Create Your Own Link
      </a>
    </div>
  );
}