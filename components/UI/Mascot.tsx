import React from 'react';
import { motion } from 'framer-motion';

const Mascot: React.FC<{ size?: number, happy?: boolean }> = ({ size = 150, happy = true }) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className="relative drop-shadow-xl"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Flask Body */}
        <path d="M70 20 L70 80 L20 230 Q10 250 100 250 Q190 250 180 230 L130 80 L130 20" fill="#E0F7FA" stroke="#4DD0E1" strokeWidth="6" />
        
        {/* Liquid */}
        <path d="M30 200 Q100 180 170 200 L180 230 Q190 250 100 250 Q10 250 20 230 Z" fill={happy ? "#FF7F50" : "#98FF98"} fillOpacity="0.8" />
        
        {/* Eyes (Glasses) */}
        <circle cx="75" cy="130" r="25" fill="white" stroke="#333" strokeWidth="4" />
        <circle cx="125" cy="130" r="25" fill="white" stroke="#333" strokeWidth="4" />
        <line x1="100" y1="130" x2="100" y2="130" stroke="#333" strokeWidth="4" /> 
        <circle cx="75" cy="130" r="5" fill="#333" />
        <circle cx="125" cy="130" r="5" fill="#333" />
        
        {/* Smile */}
        {happy ? (
           <path d="M85 170 Q100 185 115 170" stroke="#333" strokeWidth="4" strokeLinecap="round" />
        ) : (
           <circle cx="100" cy="170" r="10" stroke="#333" strokeWidth="4" />
        )}

        {/* Bubbles */}
        <motion.circle cx="100" cy="50" r="5" fill="#4DD0E1" animate={{ cy: [50, 20], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} />
        <motion.circle cx="90" cy="60" r="3" fill="#4DD0E1" animate={{ cy: [60, 30], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} />
      </svg>
    </motion.div>
  );
};

export default Mascot;