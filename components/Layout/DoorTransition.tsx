import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store';

const DoorTransition: React.FC = () => {
  const { isTransitioning, setTransitioning } = useAppStore();

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setTransitioning(false);
      }, 2000); // Total transition time
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, setTransitioning]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          {/* Left Door */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
            className="w-1/2 h-full bg-cream-200 border-r-4 border-accent-coral-500 shadow-2xl flex items-center justify-end pr-8 relative overflow-hidden"
          >
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="w-4 h-64 bg-yellow-400 rounded-full shadow-lg"></div> {/* Handle */}
          </motion.div>

          {/* Right Door */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
            className="w-1/2 h-full bg-cream-200 border-l-4 border-accent-coral-500 shadow-2xl flex items-center justify-start pl-8 relative overflow-hidden"
          >
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="w-4 h-64 bg-yellow-400 rounded-full shadow-lg"></div> {/* Handle */}
          </motion.div>

          {/* Center Mascot Animation (Optional: Pop up in the middle) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white p-6 rounded-full shadow-2xl border-4 border-mint-400 text-4xl font-bold text-coral-500 font-hand">
              Đang mở phòng...
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DoorTransition;