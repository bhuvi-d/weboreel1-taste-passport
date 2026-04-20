import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Globe, User, CheckCircle } from 'lucide-react';

const ProgressBar = ({ progress }) => (
  <div className="w-full h-1 bg-saffron-100/30 rounded-full overflow-hidden">
    <motion.div 
      className="h-full bg-saffron-500 shadow-[0_0_15px_rgba(255,106,19,0.5)]"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
    />
  </div>
);

export const DNASection = ({ selectedDishes, dishes, onComplete }) => {
  const [stage, setStage] = useState('analyzing');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const selectedData = selectedDishes.map(id => dishes.find(d => d.id === id));
  const traits = [...new Set(selectedData.flatMap(d => d.traits))];

  useEffect(() => {
    if (stage === 'analyzing') {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage('reveal'), 800);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <section className="min-h-screen w-full bg-[#0a0604] text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      <AnimatePresence mode="wait">
        {stage === 'analyzing' && (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-2xl text-center"
          >
            <div className="mb-16 relative">
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="w-56 h-56 border-2 border-dashed border-saffron-500/20 rounded-full mx-auto flex items-center justify-center p-10"
               >
                 <User size={80} className="text-saffron-500 animate-pulse" />
               </motion.div>
               <motion.div 
                 className="absolute inset-x-0 top-0 w-56 h-56 border-2 border-saffron-500 rounded-full mx-auto"
                 animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                 transition={{ duration: 3, repeat: Infinity }}
               />
               <div className="absolute inset-0 bg-saffron-500/5 blur-3xl rounded-full" />
            </div>

            <h2 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter leading-none">
              Sequencing Your <br />
              <span className="text-saffron-500 italic font-serif-italic">Flavor DNA</span>
            </h2>
            <p className="text-saffron-100/30 text-xs md:text-sm mb-16 uppercase tracking-[0.4em] font-black">
              Parsing {selectedDishes.length} distinct culinary memories...
            </p>

            <div className="max-w-md mx-auto">
              <ProgressBar progress={analysisProgress} />
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {traits.map((trait, i) => (
                <motion.div
                  key={trait}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: analysisProgress > (i * 12) ? 1 : 0.1, y: 0 }}
                  className={`text-[10px] font-black px-5 py-2 rounded-full border transition-all duration-500 uppercase tracking-widest ${
                    analysisProgress > (i * 12) ? 'border-saffron-500/40 text-saffron-400 bg-saffron-500/10 shadow-[0_0_15px_rgba(255,106,19,0.1)]' : 'border-white/5 text-white/10'
                  }`}
                >
                  {trait}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div 
            key="reveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-5xl text-center"
          >
            {/* Verified Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 3, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 12 }}
              transition={{ delay: 0.8, type: 'spring', damping: 12, stiffness: 100 }}
              className="absolute top-[-80px] right-2 md:right-[-40px] z-50 pointer-events-none"
            >
              <div className="w-36 h-36 md:w-56 md:h-56 border-[8px] md:border-[16px] border-saffron-500 rounded-full flex items-center justify-center bg-[#0a0604] shadow-[0_0_50px_rgba(255,106,19,0.3)]">
                 <div className="flex flex-col items-center -rotate-12">
                   <CheckCircle size={56} className="text-saffron-500 mb-2" />
                   <span className="text-saffron-500 font-black text-xs md:text-base tracking-[0.2em] uppercase">Verified</span>
                   <span className="text-spice-black font-black text-[10px] md:text-xs bg-saffron-500 px-3 py-1 mt-2 rounded-sm">PASSPORT GRANTED</span>
                 </div>
              </div>
            </motion.div>

            <div className="mb-16">
               <Globe size={140} className="text-saffron-500 mx-auto animate-pulse-slow opacity-80" />
            </div>

            <h2 className="text-7xl md:text-[10rem] font-display font-black leading-[0.8] mb-12 tracking-tighter">
              ACCESS <br className="md:hidden" /> <span className="text-saffron-500">GRANTED</span>
            </h2>
            
            <p className="text-2xl md:text-5xl text-saffron-100/50 font-medium mb-20 max-w-3xl mx-auto leading-tight tracking-tight">
              Analysis confirms. Your profile is <br className="hidden md:block" /> 
              <span className="text-white font-black italic underline decoration-saffron-500 decoration-8 underline-offset-8">“Comfort with Adventurous DNA.”</span>
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="btn-experience group text-2xl px-16 py-8"
            >
              <Sparkles className="animate-pulse" />
              <span>Explore My World Palate</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:40px_40px]" />
    </section>
  );
};
