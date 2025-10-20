import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function WishPage() {
  const { name } = useParams();
  const displayName = name.replace(/-/g, " ");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-orange-100 to-yellow-200 text-center p-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-orange-600"
      >
        🪔 Happy Diwali from {displayName}!
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
        className="mt-8 btn btn-warning"
      >
        Create Your Own Link
      </a>
    </div>
  );
}
