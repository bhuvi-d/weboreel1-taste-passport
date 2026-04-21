import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, MoveRight } from 'lucide-react';

export const Hero = ({ onStart }) => {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-cream-base section-shell page-top-offset py-16 sm:py-20">
      {/* Decorative Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] text-8xl md:text-9xl opacity-20 filter blur-[2px]"
        >
          🍛
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, 40, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[15%] right-[10%] text-7xl md:text-8xl opacity-20 filter blur-[3px]"
        >
          🌶️
        </motion.div>
        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[15%] text-6xl md:text-7xl opacity-20 filter blur-[1px]"
        >
          🥟
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl text-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-saffron-100/50 text-saffron-700 font-bold text-sm uppercase tracking-[0.3em] mb-12 shadow-sm border border-saffron-200/50 backdrop-blur-sm"
        >
          <Compass size={18} className="animate-spin-slow" />
          <span>The Culinary Odyssey Begins</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-black text-5xl sm:text-6xl md:text-[11rem] leading-[0.85] md:leading-[0.8] text-spice-black mb-10 sm:mb-12 tracking-tighter"
        >
          YOUR TASTE <br />
          <span className="text-saffron-500 font-serif-italic opacity-90 block my-4 italic">HAS A</span>
          PASSPORT
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-3xl text-saffron-900/80 font-medium max-w-2xl mx-auto mb-12 sm:mb-16 leading-tight tracking-tight"
        >
          Map your soul's flavors to their <span className="text-saffron-600 font-bold underline decoration-saffron-200/50 decoration-4 underline-offset-8">global twin</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <button
            onClick={onStart}
            className="btn-experience group"
          >
            <span className="relative z-10">Start My Journey</span>
            <MoveRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 sm:mt-24 flex justify-center items-center gap-4 sm:gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
        >
           <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-saffron-300" />
           <span className="text-[10px] font-black tracking-[0.5em] uppercase">Scroll to Discover</span>
           <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-saffron-300" />
        </motion.div>
      </div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')]" />
    </section>
  );
};
