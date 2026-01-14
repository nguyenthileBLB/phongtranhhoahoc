import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store';
import { ZoomIn, X } from 'lucide-react';

const ContentRoom: React.FC = () => {
  const { currentUser } = useAppStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock Content
  const CONTENTS = [
    { id: 1, type: 'teacher', url: 'https://picsum.photos/id/20/800/800', title: 'Bài Giảng 1', author: 'GV. Bình' },
    { id: 2, type: 'teacher', url: 'https://picsum.photos/id/24/800/800', title: 'Sơ đồ tư duy', author: 'GV. Bình' },
    { id: 3, type: 'student', url: 'https://picsum.photos/id/28/800/800', title: 'Bài làm của Lan', author: 'Lan Chi' },
    { id: 4, type: 'student', url: 'https://picsum.photos/id/29/800/800', title: 'Vở ghi chép', author: 'Minh Tuấn' },
    { id: 5, type: 'student', url: 'https://picsum.photos/id/36/800/800', title: 'Bài tập về nhà', author: 'Hùng Dũng' },
  ];

  return (
    <div className="w-full h-full p-8 overflow-y-auto pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h2 className="text-4xl font-bold text-mint-500 font-sans">Phòng Nội Dung</h2>
           <p className="text-slate-500 font-serif italic">"Kiến thức là chìa khóa vạn năng"</p>
        </div>
        {currentUser?.role === 'teacher' && (
          <button className="bg-mint-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-mint-600 transition-colors">
            + Đăng Bài Mới
          </button>
        )}
      </div>

      {/* Honeycomb Grid Layout */}
      <div className="flex flex-wrap justify-center gap-8">
        {CONTENTS.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className={`relative w-64 h-72 cursor-pointer group`}
            onClick={() => setSelectedImage(item.url)}
          >
             {/* Hexagon Mask */}
            <div className={`w-full h-full hexagon overflow-hidden p-1 shadow-xl ${item.type === 'teacher' ? 'bg-yellow-400' : 'bg-mint-400'}`}>
               <div className="w-full h-full hexagon overflow-hidden bg-white relative">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                    <ZoomIn size={32} />
                    <span className="font-bold mt-2">Xem chi tiết</span>
                  </div>
               </div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md whitespace-nowrap border border-slate-100">
               <p className="text-sm font-bold text-slate-700">{item.title}</p>
               <p className="text-xs text-slate-400 text-center">{item.author}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Deep Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
             <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-coral-500 z-50 bg-black/50 rounded-full p-2"
             >
               <X size={32} />
             </button>
             
             {/* Simple Pan/Zoom implementation using Framer Motion drag */}
             <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                <motion.img 
                  src={selectedImage} 
                  alt="Full view"
                  drag
                  dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                  whileHover={{ cursor: "grab" }}
                  whileTap={{ cursor: "grabbing" }}
                  initial={{ scale: 1 }}
                  style={{ maxHeight: '150vh', maxWidth: '150vw' }} // Allow growing
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute bottom-4 text-white/70 bg-black/50 px-4 py-2 rounded-full pointer-events-none">
                  Kéo để di chuyển • Cuộn chuột để zoom (Simulated)
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentRoom;