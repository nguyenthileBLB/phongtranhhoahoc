import React, { useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';

const ApplicationRoom: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-white overflow-hidden">
      {/* Theater Header */}
      <div className="p-6 bg-slate-800 shadow-md border-b border-slate-700 flex justify-between items-center z-10">
        <div>
           <h2 className="text-3xl font-bold text-lemon-400 tracking-wider">RẠP CHIẾU PHIM HÓA HỌC</h2>
           <p className="text-slate-400 text-sm">Phòng Vận Dụng - Quan sát hiện tượng thực tế</p>
        </div>
        <button 
          onClick={handleReplay}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition-colors border border-slate-600"
        >
          <RotateCcw size={18} /> Xem lại
        </button>
      </div>

      {/* Screen Area */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')]">
        <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-[0_0_50px_rgba(250,204,21,0.2)] border-4 border-slate-800 overflow-hidden group">
          <video 
            ref={videoRef}
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" 
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
          />
          
          {/* Decorative Curtains */}
          <div className="absolute top-0 left-0 h-full w-12 bg-red-900 shadow-2xl z-10 transform -skew-x-6 origin-top"></div>
          <div className="absolute top-0 right-0 h-full w-12 bg-red-900 shadow-2xl z-10 transform skew-x-6 origin-top"></div>
        </div>
      </div>
      
      {/* Seats (Visual Only) */}
      <div className="h-32 bg-slate-800 relative overflow-hidden flex items-end justify-center gap-1 pb-0 opacity-50">
         {Array.from({ length: 20 }).map((_, i) => (
           <div key={i} className="w-16 h-20 bg-red-900 rounded-t-lg border-t-4 border-red-800 mx-1"></div>
         ))}
      </div>
    </div>
  );
};

export default ApplicationRoom;