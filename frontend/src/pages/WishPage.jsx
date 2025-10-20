import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DiwaliLoader from "../components/DiwaliLoader";

export default function WishPage() {
  const { slug } = useParams();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishName = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/wish/${slug}`);
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
    return <DiwaliLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-50">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-400" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-cover bg-no-repeat" 
               style={{ backgroundImage: "url('/images/orange-backdrop 1.png')" }}>
        
        {/* Decorative Design */}
        <motion.img 
          src="/images/design-5 1.png" 
          alt="Design"
          className="absolute top-0 left-0 w-72 md:w-80"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Main Message */}
        <div className="flex flex-col justify-center items-start min-h-screen px-6 md:px-24 ">
          <motion.p 
            className="text-3xl md:text-5xl lg:text-6xl font-normal max-w-4xl leading-relaxed text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            Hi {displayName},
            <br />
            You mean the world to me...
            <br />
            So this Diwali,
            <br />
            I made something for you!
          </motion.p>
        </div>

        {/* Floating Diyas */}
        <motion.img 
          src="/images/deepak 2.png" 
          alt="Diya"
          className="absolute bottom-10 right-10 w-24 md:w-32 hidden md:block"
          animate={{ 
            rotate: [0, 5, -5, 0],
            y: [0, -10, 0] 
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity },
            y: { duration: 2, repeat: Infinity }
          }}
        />
        
        <motion.img 
          src="/images/deepak 2.png" 
          alt="Diya"
          className="absolute bottom-20 left-20 w-20 md:w-28"
          animate={{ 
            rotate: [0, -5, 5, 0],
            y: [0, -15, 0] 
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, delay: 1 },
            y: { duration: 2.5, repeat: Infinity, delay: 0.5 }
          }}
        />
      </section>

      {/* Divider */}
      <motion.div 
        className="bg-orange-400 flex justify-center items-center gap-3 py-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-0.5 w-96 md:w-[468px] bg-yellow-100"></div>
        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
        <div className="h-0.5 w-96 md:w-[468px] bg-yellow-100"></div>
      </motion.div>

      {/* Section 2 - Blessings */}
      <section className="bg-orange-400 py-12 px-4">
        <motion.img 
          src="/images/lakshmi maa and ganesh ji 1.png" 
          alt="Lord Ganesha and Lakshmi"
          className="max-w-4xl w-full block mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        />

        <motion.h2 
          className="text-4xl md:text-6xl font-normal text-center mb-8 text-gray-800"
          style={{ fontFamily: 'Style Script, serif' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Wishing You a Blessed and Prosperous Deepawali
        </motion.h2>

        {/* Divider */}
        <motion.div 
          className="flex justify-center items-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="h-0.5 w-96 md:w-[468px] bg-yellow-100"></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          <div className="h-0.5 w-96 md:w-[468px] bg-yellow-100"></div>
        </motion.div>

        {/* Card Container */}
        <div className="flex justify-center items-center relative">
          <motion.div 
            className="bg-white rounded-3xl p-8 max-w-3xl mx-4 md:mx-24 text-center relative z-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-gray-800">
              Dear {displayName}, Diwali is the festival of lights and today I want to share this beautiful moment with you!
            </p>
            <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-relaxed text-gray-700">
              May this festival bring endless joy, prosperity, and happiness to your life. You deserve all the wonderful things this world has to offer!
            </p>
          </motion.div>

          <motion.img 
            src="/images/little-girl.png" 
            alt="Little Girl"
            className="absolute right-0 w-72 md:w-96 -mr-16 md:-mr-32 hidden lg:block"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            viewport={{ once: true }}
          />
        </div>
      </section>

      {/* Divider */}
      <motion.div 
        className="bg-orange-400 flex justify-center items-center gap-3 py-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="h-0.5 w-96 md:w-[468px] bg-yellow-100"></div>
        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
        <div className="h-0.5 w-96 md:w-[468px] bg-yellow-100"></div>
      </motion.div>

      {/* Section 3 - Final Message */}
      <section className="bg-orange-400 py-16 px-4">
        <motion.div 
          className="flex justify-center items-center max-w-4xl bg-white rounded-3xl p-8 mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.img 
            src="/images/lakshmi.png" 
            alt="Lakshmi"
            className="w-1/2"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.img 
            src="/images/ganesh.png" 
            alt="Ganesh"
            className="w-1/2"
            animate={{ rotate: [0, -2, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-2xl md:text-4xl text-gray-800 mb-4">
            Happy Diwali {displayName}, and
          </p>
          <h2 className="text-4xl md:text-6xl font-normal text-gray-800 inline"
              style={{ fontFamily: 'Style Script, serif' }}>
            Thank You For Everything..
          </h2>
        </motion.div>

        {/* Create Your Own Link Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🎆 Create Your Own Diwali Wish
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}