import React from 'react';
import { useAppStore } from './store';
import LoginRoom from './components/Rooms/LoginRoom';
import WarmupRoom from './components/Rooms/WarmupRoom';
import ContentRoom from './components/Rooms/ContentRoom';
import PracticeRoom from './components/Rooms/PracticeRoom';
import ApplicationRoom from './components/Rooms/ApplicationRoom';
import DoorTransition from './components/Layout/DoorTransition';
import { Beaker, BookOpen, Puzzle, Film, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const { currentRoom, setRoom, logout, currentUser } = useAppStore();

  const renderRoom = () => {
    switch (currentRoom) {
      case 'login': return <LoginRoom />;
      case 'warmup': return <WarmupRoom />;
      case 'content': return <ContentRoom />;
      case 'practice': return <PracticeRoom />;
      case 'application': return <ApplicationRoom />;
      default: return <LoginRoom />;
    }
  };

  if (currentRoom === 'login') {
    return (
      <>
        <DoorTransition />
        <LoginRoom />
      </>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-cream-50 font-sans">
      <DoorTransition />
      
      {/* Sidebar Navigation */}
      <motion.nav 
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className="w-20 md:w-64 bg-white border-r border-cream-200 flex flex-col justify-between shadow-xl z-20"
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8 text-coral-500">
             <div className="w-10 h-10 bg-coral-100 rounded-lg flex items-center justify-center">
               <Beaker size={24} />
             </div>
             <span className="font-bold text-xl hidden md:block">ChemGallery</span>
          </div>

          <div className="space-y-2">
            {[
              { id: 'warmup', icon: Beaker, label: 'Khởi Động' },
              { id: 'content', icon: BookOpen, label: 'Kiến Thức' },
              { id: 'practice', icon: Puzzle, label: 'Luyện Tập' },
              { id: 'application', icon: Film, label: 'Vận Dụng' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setRoom(item.id as any)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${currentRoom === item.id ? 'bg-mint-400 text-white shadow-md font-bold' : 'text-slate-500 hover:bg-cream-100'}`}
              >
                <item.icon size={20} />
                <span className="hidden md:block">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-cream-200">
           <div className="flex items-center gap-3 mb-4">
             <img src={currentUser?.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full border-2 border-mint-400 bg-cream-200" />
             <div className="hidden md:block">
               <p className="text-sm font-bold text-slate-700 truncate">{currentUser?.name}</p>
               <p className="text-xs text-slate-400 capitalize">{currentUser?.role === 'teacher' ? 'Giáo Viên' : 'Học Sinh'}</p>
             </div>
           </div>
           <button 
            onClick={logout}
            className="w-full flex items-center gap-2 text-slate-400 hover:text-coral-500 transition-colors text-sm pl-2"
           >
             <LogOut size={16} /> <span className="hidden md:inline">Đăng xuất</span>
           </button>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        <motion.div
           key={currentRoom}
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.5 }}
           className="w-full h-full"
        >
          {renderRoom()}
        </motion.div>
      </main>
    </div>
  );
};

export default App;