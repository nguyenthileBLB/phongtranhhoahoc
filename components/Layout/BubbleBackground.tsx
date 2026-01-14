import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BubbleBackground: React.FC = () => {
  // Use state to prevent hydration mismatch, only render bubbles on client
  const [bubbles, setBubbles] = useState<{ id: number; size: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20, // 20px to 80px
      left: Math.random() * 100, // 0% to 100%
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5, // 5s to 10s
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-gradient-to-t from-cream-100 to-blue-50">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border border-white bg-white/30 backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: -100,
            boxShadow: 'inset 0 0 10px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.2)',
          }}
          animate={{
            y: '-120vh',
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default BubbleBackground;