import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import DiwaliLoader from "../components/DiwaliLoader";

export default function WishPage() {
  const { slug } = useParams();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [linkNotFound, setLinkNotFound] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchWishName = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/wish/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setDisplayName(data.name || slug.replace(/-/g, " "));
        } else if (response.status === 404) {
          setLinkNotFound(true);
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

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/diwali-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Try to autoplay immediately
    const startMusic = async () => {
      try {
        await audioRef.current.play();
        setIsMusicPlaying(true);
      } catch (error) {
        // Autoplay blocked, set up click listener
        const handleFirstClick = async () => {
          try {
            await audioRef.current.play();
            setIsMusicPlaying(true);
            document.removeEventListener('click', handleFirstClick);
          } catch (err) {
            console.log('Music play failed:', err);
          }
        };
        document.addEventListener('click', handleFirstClick);
      }
    };

    // Start music after a short delay
    const timer = setTimeout(startMusic, 500);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play().catch(console.error);
        setIsMusicPlaying(true);
      }
    }
  };

  if (loading) {
    return <DiwaliLoader />;
  }

  if (linkNotFound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 flex items-center justify-center p-6">
        <motion.div 
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-9xl mb-6"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            😔
          </motion.div>
          
          <motion.h1 
            className="text-6xl font-bold text-orange-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Oops!
          </motion.h1>
          
          <motion.p 
            className="text-2xl text-gray-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            This Diwali wish link doesn't exist or has been removed.
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            But don't worry! You can create your own beautiful Diwali wish to share with your loved ones.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              🎆 Create Your Diwali Wish
            </motion.a>
            
            <motion.button
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-orange-500 text-orange-500 text-xl font-semibold rounded-full hover:bg-orange-50 transition-all duration-300"
            >
              ← Go Back
            </motion.button>
          </motion.div>

          <motion.div 
            className="mt-12 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.div
              className="text-3xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              🪔
            </motion.div>
            <motion.div
              className="text-3xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              ✨
            </motion.div>
            <motion.div
              className="text-3xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              🎆
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-50">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-400 w-full overflow-y-scroll overflow-x-hidden" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Music Toggle Button */}
      <motion.button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 rounded-full p-3 shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {isMusicPlaying ? (
          <Volume2 className="w-6 h-6 text-orange-600" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-600" />
        )}
      </motion.button>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-cover bg-no-repeat" 
               style={{ backgroundImage: "url('/images/orange-backdrop 1.png')" }}>
        
        {/* Decorative Design */}
        <motion.img 
          src="/images/design-5 1.png" 
          alt="Design"
          className="absolute top-0 left-0 w-30 md:w-50"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Main Message */}
        <div className="flex flex-col justify-center items-start min-h-screen px-6 md:px-24">
          <motion.p 
            className="text-3xl md:text-5xl font-normal max-w-4xl leading-relaxed text-gray-800"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            Hi there,
            <br />
            Hope this brightens your day...
            <br />
            So this Diwali,
            <br />
            I wanted to share some joy with you!
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl mt-4 block text-right">
              - From {displayName} with love ❤️
            </span>
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
          className="text-2xl md:text-6xl font-normal text-center mb-8 text-gray-800"
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
              People say, "Diwali is the festival of lights."
            </p>
            <p className="text-lg md:text-xl lg:text-2xl mt-4 leading-relaxed text-gray-700">
              You know what, I can feel the positivity and happiness. {displayName} wants to share this beautiful moment with you and wishes you endless joy, prosperity, and success in life!
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
            Happy Diwali from {displayName}
          </p>
        
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

      {/* Author Section */}
      <motion.section 
        className="bg-gradient-to-b from-orange-400 to-orange-500 py-12 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="rounded-2xl p-8 ">
      
          
            
        
            <motion.div 
              className="mt-6 flex justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                🪔
              </motion.div>
              <motion.div
                className="text-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              >
                💝
              </motion.div>
              <motion.div
                className="text-2xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                🌟
              </motion.div>
            </motion.div>

            <p className=" text-white/70 mt-4">
             <span> Developed by Ankit Jha with lots of </span>  ❤️
            </p>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}