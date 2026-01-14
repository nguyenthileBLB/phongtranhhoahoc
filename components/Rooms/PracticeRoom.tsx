import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  { id: 1, question: "Ký hiệu hóa học của Sắt là gì?", options: ["Fe", "Cu", "Zn", "Ag"], correct: 0 },
  { id: 2, question: "Công thức của nước?", options: ["HO", "H2O", "H2O2", "HO2"], correct: 1 },
  { id: 3, question: "Axit nào có trong dạ dày?", options: ["H2SO4", "HNO3", "HCl", "CH3COOH"], correct: 2 },
];

const PracticeRoom: React.FC = () => {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
  const [solved, setSolved] = useState<number[]>([]);
  const [wrong, setWrong] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const currentQ = QUESTIONS.find(q => q.id === activeQuiz);
    if (!currentQ) return;

    if (optionIndex === currentQ.correct) {
      // Correct
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setSolved([...solved, activeQuiz!]);
      setActiveQuiz(null);
    } else {
      // Wrong
      setWrong(true);
      setTimeout(() => setWrong(false), 500);
    }
  };

  return (
    <div className="w-full h-full p-8 overflow-y-auto">
      <div className="mb-8 text-center">
         <h2 className="text-4xl font-bold text-coral-500 font-sans">Phòng Luyện Tập</h2>
         <p className="text-slate-500 font-hand text-xl">Giải đố để mở khóa các bức tranh bí ẩn!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {QUESTIONS.map((q, index) => {
          const isSolved = solved.includes(q.id);
          return (
            <motion.div 
              key={q.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => !isSolved && setActiveQuiz(q.id)}
              className={`relative aspect-[3/4] rounded-2xl shadow-xl overflow-hidden cursor-pointer border-4 ${isSolved ? 'border-mint-400' : 'border-slate-200'}`}
            >
              {isSolved ? (
                <>
                  <img src={`https://picsum.photos/id/${150 + index}/400/600`} alt="Revealed" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                     <span className="text-white font-bold flex items-center gap-2"><CheckCircle /> Đã mở khóa</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 gap-4">
                  <Lock size={48} />
                  <span className="font-bold text-lg">Bí ẩn #{index + 1}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {activeQuiz !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ 
                scale: 1, 
                y: 0, 
                x: wrong ? [0, -10, 10, -10, 10, 0] : 0 
              }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border-b-8 border-coral-200"
            >
               <div className="flex justify-between items-start mb-6">
                 <h3 className="text-2xl font-bold text-coral-600 font-serif">Câu hỏi thử thách</h3>
                 <button onClick={() => setActiveQuiz(null)} className="text-slate-400 hover:text-slate-600"><XCircle /></button>
               </div>
               
               <p className="text-xl text-slate-800 mb-8 font-serif">
                 {QUESTIONS.find(q => q.id === activeQuiz)?.question}
               </p>

               <div className="grid gap-3">
                 {QUESTIONS.find(q => q.id === activeQuiz)?.options.map((opt, idx) => (
                   <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-mint-400 hover:bg-mint-50 transition-all font-sans font-semibold text-slate-600"
                   >
                     {String.fromCharCode(65 + idx)}. {opt}
                   </button>
                 ))}
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PracticeRoom;