import React from 'react';
import { Volume2, VolumeX, Globe, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = ({ isAudioEnabled, toggleAudio }) => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center"
    >
      {/* Brand Layer */}
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 bg-saffron-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-saffron-500/30"
        >
          <Globe size={28} />
        </motion.div>
        <div className="flex flex-col">
          <span className="font-display font-black text-2xl tracking-tighter text-spice-black leading-none">
            TASTE PASSPORT
          </span>
          <span className="text-[10px] font-black text-saffron-600 uppercase tracking-[0.3em] mt-1">
            Global Flavor Map
          </span>
        </div>
      </div>

      {/* Controls Layer */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleAudio}
          className="w-14 h-14 glass-saffron rounded-full flex items-center justify-center text-saffron-600 transition-all hover:scale-110 active:scale-95 shadow-xl border border-saffron-200/50"
        >
          {isAudioEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
        <button className="w-14 h-14 bg-spice-black text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl">
          <Menu size={24} />
        </button>
      </div>
    </motion.nav>
  );
};
