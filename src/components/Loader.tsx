import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-luxury-beige"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <svg 
                width="100" 
                height="100" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-luxury-gold"
              >
                {/* stylized bouquet animation */}
                <motion.g
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  <motion.path
                    d="M50 85L50 60"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                  />
                  <motion.path
                    d="M50 85L35 65"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  <motion.path
                    d="M50 85L65 65"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.1 }}
                  />
                  <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8, duration: 1, type: "spring" }}>
                    <circle cx="50" cy="55" r="5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
                    {[0, 72, 144, 216, 288].map((angle) => (
                      <motion.path
                        key={angle}
                        d="M50 55C50 55 46 45 50 40C54 45 50 55 50 55Z"
                        stroke="currentColor"
                        strokeWidth="1"
                        style={{ originX: "50px", originY: "55px", rotate: `${angle}deg` }}
                      />
                    ))}
                  </motion.g>
                  <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 1, type: "spring" }}>
                    <circle cx="35" cy="60" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
                    {[0, 90, 180, 270].map((angle) => (
                      <motion.path
                        key={angle}
                        d="M35 60C35 60 32 52 35 48C38 52 35 60 35 60Z"
                        stroke="currentColor"
                        strokeWidth="1"
                        style={{ originX: "35px", originY: "60px", rotate: `${angle}deg` }}
                      />
                    ))}
                  </motion.g>
                  <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, duration: 1, type: "spring" }}>
                    <circle cx="65" cy="60" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" />
                    {[0, 90, 180, 270].map((angle) => (
                      <motion.path
                        key={angle}
                        d="M65 60C65 60 62 52 65 48C68 52 65 60 65 60Z"
                        stroke="currentColor"
                        strokeWidth="1"
                        style={{ originX: "65px", originY: "60px", rotate: `${angle}deg` }}
                      />
                    ))}
                  </motion.g>
                  <motion.path
                    d="M42 78C42 78 50 82 58 78"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  />
                </motion.g>
              </svg>
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                className="text-2xl font-serif tracking-[0.3em] uppercase text-luxury-ink"
              >
                Ô Belles Fleurs
              </motion.h1>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
              className="h-[1px] bg-luxury-gold mt-4"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
