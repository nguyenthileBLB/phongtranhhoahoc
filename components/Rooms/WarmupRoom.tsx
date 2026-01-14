import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for Warmup
const MEMES = [
  "https://picsum.photos/id/101/400/400",
  "https://picsum.photos/id/102/400/400",
  "https://picsum.photos/id/103/400/400",
  "https://picsum.photos/id/104/400/400",
  "https://picsum.photos/id/106/400/400",
  "https://picsum.photos/id/108/400/400",
];

const WarmupRoom: React.FC = () => {
  const [rotation, setRotation] = useState(0);

  const rotate = (dir: number) => {
    setRotation(prev => prev + dir * 60);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 perspective-1000">
      
      <div className="absolute top-8 left-8 z-10">
        <h2 className="text-4xl font-bold text-purple-600 font-sans">Phòng Khởi Động</h2>
        <p className="text-slate-500 font-hand text-xl">Xoay để xem ảnh vui nhộn nhé!</p>
      </div>

      {/* 3D Scene Container */}
      <div className="relative w-[300px] h-[300px] preserve-3d" 
           style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
        
        <motion.div 
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: rotation }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        >
          {MEMES.map((url, index) => {
            const angle = index * 60; // 360 / 6 items
            return (
              <div 
                key={index}
                className="absolute inset-0 w-full h-full flex items-center justify-center p-2 bg-white rounded-2xl shadow-2xl border-4 border-purple-200"
                style={{ 
                  transform: `rotateY(${angle}deg) translateZ(350px)`,
                  backfaceVisibility: 'hidden'
                }}
              >
                <img src={url} alt="Meme" className="w-full h-full object-cover rounded-xl" />
                <div className="absolute -bottom-10 bg-white px-4 py-1 rounded-full text-purple-600 font-bold shadow-sm">
                  Tranh số #{index + 1}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 flex gap-8">
        <button 
          onClick={() => rotate(1)} 
          className="w-16 h-16 rounded-full bg-white shadow-lg text-3xl text-purple-500 hover:scale-110 transition-transform"
        >
          👈
        </button>
        <button 
          onClick={() => rotate(-1)} 
          className="w-16 h-16 rounded-full bg-white shadow-lg text-3xl text-purple-500 hover:scale-110 transition-transform"
        >
          👉
        </button>
      </div>
    </div>
  );
};

export default WarmupRoom;