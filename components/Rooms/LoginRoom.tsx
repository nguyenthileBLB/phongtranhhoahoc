import React, { useState } from 'react';
import BubbleBackground from '../Layout/BubbleBackground';
import Mascot from '../UI/Mascot';
import { useAppStore } from '../../store';
import { motion } from 'framer-motion';

const LoginRoom: React.FC = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const login = useAppStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name, role);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center p-4">
      <BubbleBackground />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="z-10 bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/60 max-w-md w-full flex flex-col items-center"
      >
        <Mascot />
        <h1 className="text-3xl font-bold text-coral-600 font-sans mt-4 mb-2 text-center">ChemGallery</h1>
        <p className="text-slate-600 mb-6 font-hand text-xl text-center">Chào mừng đến với lớp học vui nhộn!</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="w-full">
            <label className="block text-sm font-bold text-slate-700 mb-1">Tên của em là:</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên..." 
              className="w-full px-4 py-3 rounded-xl border-2 border-mint-300 focus:border-mint-500 focus:outline-none bg-white/80 transition-colors"
              required
            />
          </div>

          <div className="flex gap-4 justify-center my-2">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 p-3 rounded-xl border-2 transition-all transform hover:-translate-y-1 ${role === 'student' ? 'bg-mint-400 border-mint-500 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500'}`}
            >
              Học Sinh
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`flex-1 p-3 rounded-xl border-2 transition-all transform hover:-translate-y-1 ${role === 'teacher' ? 'bg-coral-500 border-coral-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500'}`}
            >
              Giáo Viên
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-4 mt-4 bg-gradient-to-r from-lemon-400 to-yellow-500 text-white font-bold text-xl rounded-2xl shadow-lg shadow-yellow-200 hover:shadow-yellow-300 transition-all"
          >
            Vào Lớp Thôi!
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginRoom;