import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

export const FoodCard = ({ dish, isSelected, onToggle }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onToggle(dish.id)}
      className={`relative group h-72 md:h-96 rounded-[3rem] overflow-hidden transition-all duration-700 block w-full border-none outline-none ${
        isSelected 
          ? 'ring-4 ring-saffron-500 shadow-[0_40px_80px_-20px_rgba(255,106,19,0.5)]' 
          : 'ring-1 ring-saffron-200/50 hover:ring-saffron-400 shadow-xl shadow-saffron-900/5'
      }`}
    >
      {/* Shimmer / Skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-saffron-50 to-saffron-100 animate-pulse" />
      )}

      {/* Food Photo */}
      <img
        src={dish.image}
        alt={dish.name}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          setIsLoaded(true);
          e.target.src = 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=800';
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1.5s] ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${isSelected ? 'scale-110 contrast-[1.1] saturate-[1.2]' : 'group-hover:scale-110'}`}
      />

      {/* Premium Overlay Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-t transition-all duration-700 ${
        isSelected 
          ? 'from-saffron-950 via-saffron-900/60 to-transparent opacity-95' 
          : 'from-spice-black/90 via-spice-black/20 to-transparent opacity-70 group-hover:opacity-85'
      }`} />

      {/* Info Layer */}
      <div className="absolute inset-0 p-10 flex flex-col justify-end text-left">
        <motion.div
           layout
           className="relative z-10"
        >
          <span className={`block font-display font-black text-3xl md:text-5xl text-white mb-3 tracking-tighter leading-tight transition-transform duration-700 ${
            isSelected ? 'translate-y-0' : 'translate-y-4 group-hover:translate-y-0'
          }`}>
            {dish.name}
          </span>
          
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex flex-wrap gap-2 mb-4"
              >
                {dish.traits.map(trait => (
                  <span key={trait} className="text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                    {trait}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <p className={`text-white/70 text-sm font-medium leading-relaxed tracking-tight transition-all duration-700 overflow-hidden ${
            isSelected ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0'
          }`}>
            {dish.description}
          </p>
        </motion.div>
      </div>
      
      {/* Selection Status Badge */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            className="absolute top-8 right-8 w-14 h-14 bg-white text-saffron-600 rounded-3xl flex items-center justify-center shadow-2xl z-20"
          >
            <Check size={28} strokeWidth={4} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Glow Border */}
      {isSelected && (
        <motion.div 
           className="absolute inset-0 border-[3px] border-saffron-400/30 rounded-[3rem] pointer-events-none"
           animate={{ opacity: [0.2, 0.5, 0.2] }}
           transition={{ duration: 3, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};
