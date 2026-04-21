import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChefHat } from 'lucide-react';
import { FoodCard } from '../components/FoodCard';

export const Selection = ({ dishes, selectedDishes, onToggle, onNext }) => {
  const progress = (selectedDishes.length / 3) * 100;

  return (
    <section className="min-h-screen w-full bg-cream-base page-top-offset pt-8 pb-24 sm:pb-32 section-shell relative">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-saffron-100/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16 sm:mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white shadow-xl shadow-saffron-500/5 border border-saffron-100 text-saffron-600 font-bold mb-10"
          >
            <ChefHat size={18} />
            <span className="uppercase tracking-[0.3em] text-[10px]">Step 01: The Flavor Profile</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-6xl md:text-9xl text-spice-black mb-6 sm:mb-8 tracking-tighter leading-none"
          >
            Pardon Your <br />
            <span className="text-saffron-500 font-serif-italic opacity-90 italic">Palate Prejudices</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-saffron-900/75 max-w-2xl mx-auto font-medium tracking-tight"
          >
            Choose at least 3 delicacies that define your flavor soul. <br className="hidden md:block" />
            <span className="text-saffron-600/60 font-bold italic block mt-4">“You like comfort with a bit of chaos.”</span>
          </motion.p>
        </header>

        {/* Floating Progress Indicator - Premium Redesign */}
        <div className="sticky top-[5.75rem] sm:top-24 z-40 flex justify-center mb-14 sm:mb-20 md:mb-24 pointer-events-none">
          <motion.div 
            className="glass-saffron px-4 sm:px-6 md:px-10 py-4 sm:py-5 md:py-6 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl sm:shadow-2xl flex items-center gap-4 sm:gap-6 md:gap-10 pointer-events-auto border border-saffron-200/50"
            layout
          >
            <div className="flex flex-col">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-[10px] font-black text-saffron-800/40 uppercase tracking-widest">DNA Sequencing</span>
                 <span className="text-xs font-black text-saffron-600">{Math.round(progress)}%</span>
               </div>
               <div className="w-32 sm:w-44 md:w-56 h-2 bg-saffron-100 rounded-full overflow-hidden border border-saffron-200/30">
                 <motion.div 
                   className="h-full bg-gradient-to-r from-saffron-400 via-saffron-500 to-saffron-600 shadow-[0_0_15px_rgba(255,106,19,0.4)]"
                   initial={{ width: 0 }}
                   animate={{ width: `${Math.min(progress, 100)}%` }}
                 />
               </div>
            </div>
            <div className="h-10 sm:h-12 w-px bg-saffron-200/50" />
            <div className="flex flex-col items-center">
               <span className="text-[10px] font-black text-saffron-800/40 uppercase tracking-widest mb-1">Selected</span>
               <span className="text-3xl font-black text-saffron-600 tabular-nums leading-none">{selectedDishes.length}<span className="text-saffron-200 text-lg mx-1">/</span>3</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 xl:gap-12 pb-40 sm:pb-48">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 4) * 0.1 }}
            >
              <FoodCard 
                dish={dish} 
                isSelected={selectedDishes.includes(dish.id)} 
                onToggle={onToggle}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedDishes.length >= 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-max"
            >
              <button
                onClick={onNext}
                className="btn-experience group md:scale-105 active:scale-100 whitespace-nowrap"
              >
                <Sparkles />
                <span>Crack the Code</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
