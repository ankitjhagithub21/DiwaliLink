import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// LOADING ANIMATION COMPONENT
const DiwaliLoader = () => {
  // Floating diya animation
  const floatVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  // Sparkle entrance
  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  // Pulsing text
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-orange-100 via-yellow-50 to-orange-200 p-6 relative overflow-hidden">
      {/* Animated Background Glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute inset-0 bg-gradient-radial from-yellow-300/30 to-transparent blur-3xl"
      ></motion.div>

      {/* Floating Diyas */}
      <motion.div
        variants={floatVariants}
        animate="float"
        className="text-6xl md:text-8xl mb-8 relative drop-shadow-lg"
      >
        🪔
        {/* Flicker glow effect */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="absolute -inset-4 bg-yellow-300 rounded-full blur-xl opacity-60"
        ></motion.div>
      </motion.div>

      {/* Sparkles Around */}
      <div className="absolute top-1/4 left-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={sparkleVariants}
            initial="hidden"
            animate="visible"
            className="text-2xl absolute"
            style={{ left: `${i * 40}px` }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      <div className="absolute top-1/3 right-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={sparkleVariants}
            initial="hidden"
            animate="visible"
            className="text-2xl absolute"
            style={{ left: `${i * -40}px` }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* Loading Text with Pulse */}
      <motion.h2
        variants={pulseVariants}
        animate="pulse"
        className="text-xl md:text-2xl font-semibold text-orange-700 mt-6 tracking-wide"
      >
        Lighting up your Diwali wishes...
      </motion.h2>

      {/* Subtle rotating diya at bottom */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="text-4xl fixed bottom-10 opacity-40"
      >
        🪔
      </motion.div>
    </div>
  );
};

export default DiwaliLoader;