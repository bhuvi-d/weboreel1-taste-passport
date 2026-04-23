import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, RotateCcw, MapPin, Sparkles, MoveDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MAPPING } from '../data/foodData';

const DEFAULT_RECOMMENDATION_IMAGE = 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=1200';

const ReelItem = ({ trait, recommendation, index, total }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(recommendation.image || DEFAULT_RECOMMENDATION_IMAGE);

  useEffect(() => {
    setImgLoaded(false);
    setImgSrc(recommendation.image || DEFAULT_RECOMMENDATION_IMAGE);
  }, [recommendation.image]);

  return (
    <section className="min-h-screen w-full relative flex flex-col items-center justify-center bg-cream-base overflow-hidden py-20 page-top-offset">
      {/* Background Large Text - Improved cinematic effect */}
      <div className="absolute inset-0 opacity-[0.04] flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <span className="text-[28vw] font-black uppercase tracking-tighter whitespace-nowrap leading-none blur-sm">
          {recommendation.name}
        </span>
      </div>

      <div className="relative z-10 w-full max-w-7xl section-shell flex flex-col lg:flex-row items-center gap-12 md:gap-20 lg:gap-24">
        {/* Visual Content Column */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, x: -80, rotate: -10 }}
          whileInView={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-56 h-80 md:w-[380px] md:h-[520px] lg:w-[420px] lg:h-[560px] relative shrink-0"
        >
          <div className="absolute inset-6 border-[3px] border-saffron-500/10 rounded-[4rem] -rotate-6 scale-105" />
          
          <div className={`w-full h-full rounded-[4rem] bg-saffron-100/30 animate-pulse absolute inset-0 z-0 transition-opacity duration-1000 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`} />
          
          <img 
            src={imgSrc}
            alt={recommendation.name}
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              if (imgSrc !== DEFAULT_RECOMMENDATION_IMAGE) {
                setImgSrc(DEFAULT_RECOMMENDATION_IMAGE);
                return;
              }
              setImgLoaded(true);
            }}
            className={`w-full h-full object-cover rounded-[4rem] shadow-[0_60px_120px_-30px_rgba(124,45,18,0.3)] border-[12px] md:border-[16px] border-white relative z-10 transition-all duration-[1.5s] ${imgLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
          />
          
          {/* Passport Stamp - Premium Redesign */}
          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -15 }}
            transition={{ delay: 0.6, type: 'spring', damping: 15 }}
            className="absolute -bottom-14 -right-14 z-20 w-36 h-36 md:w-48 md:h-48 border-4 border-dashed border-saffron-500/40 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center p-5 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
          >
            <div className="flex flex-col items-center justify-center border-2 border-saffron-500 rounded-full w-full h-full">
              <span className="text-saffron-600 font-black text-[10px] md:text-[12px] tracking-[0.3em] uppercase mb-1">Identity</span>
              <span className="text-spice-black font-black text-sm md:text-xl tracking-tighter uppercase leading-none">{recommendation.country}</span>
              <span className="text-saffron-500 font-black text-[9px] mt-2 italic bg-saffron-100 px-2 rounded">AUTHENTIC</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Narrative Content Column */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-saffron-600 font-black mb-10 uppercase tracking-[0.3em] text-[10px]"
          >
            <div className="w-8 h-px bg-saffron-200" />
            <Sparkles size={14} className="animate-pulse" />
            <span>Echoes of {trait}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-5xl sm:text-6xl md:text-[7rem] lg:text-[8rem] text-spice-black mb-8 sm:mb-10 leading-[0.85] md:leading-[0.8] tracking-tighter"
          >
            {recommendation.name}
          </motion.h2>

          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="relative"
          >
            <p className="text-xl md:text-3xl text-saffron-900/75 leading-tight border-l-4 border-saffron-500/30 pl-8 text-left italic font-medium max-w-lg font-serif-italic">
              "{recommendation.description}"
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const GlobalReel = ({ selectedDishes, dishes, onRestart }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter recommendations to be unique and valid
  const recommendations = selectedDishes.reduce((acc, dishId) => {
    const dish = dishes.find(d => d.id === dishId);
    dish?.traits.forEach(trait => {
      const match = MAPPING[trait];
      if (match && !acc.some(item => item.rec.name === match.name)) {
        acc.push({ trait, rec: match });
      }
    });
    return acc;
  }, []);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6a13', '#ffeed6']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6a13', '#ffeed6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const height = window.innerHeight;
      const index = Math.round(scrollPos / height);
      setActiveIndex(index);

      const bottom = document.documentElement.scrollHeight - window.scrollY <= window.innerHeight + 100;
      if (bottom && !showSummary) {
        setShowSummary(true);
        triggerConfetti();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSummary]);

  return (
    <div 
      id="reel-container"
      className="bg-cream-base w-full min-h-screen flex flex-col"
    >
      {/* Navigation Indicator Overlay */}
      <div className="fixed top-[5.75rem] sm:top-24 left-4 sm:left-8 md:left-12 z-50 flex items-center gap-6 pointer-events-none">
         <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-saffron-600 mb-2">Discovery Reel</span>
            <div className="flex gap-2">
              {recommendations.map((_, i) => (
                 <div key={i} className="w-10 h-1 rounded-full bg-saffron-100 overflow-hidden relative">
                    <motion.div 
                      className="absolute inset-0 bg-saffron-500"
                      initial={false}
                      animate={{ scaleX: activeIndex === i ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                 </div>
              ))}
            </div>
         </div>
      </div>

      {recommendations.map((item, index) => (
        <ReelItem 
          key={item.trait} 
          trait={item.trait} 
          recommendation={item.rec} 
          index={index} 
          total={recommendations.length}
        />
      ))}

      {/* Final Shareable Card Section - Dark Mode Premium */}
      <section className="min-h-screen w-full bg-[#0a0604] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12 relative overflow-hidden py-16 page-top-offset">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-saffron-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-saffron-800/10 blur-[150px] rounded-full" />

        <motion.div
           initial={{ opacity: 0, y: 100, scale: 0.9 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
           className="w-full max-w-6xl bg-white rounded-[2rem] sm:rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-[0_60px_160px_-50px_rgba(0,0,0,0.8)] flex flex-col md:row-reverse md:flex-row-reverse"
        >
          {/* Action Side */}
          <div className="w-full md:w-[45%] bg-[#0a0604] p-8 sm:p-10 lg:p-16 flex flex-col justify-center items-center text-center">
             <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black mb-8 sm:mb-12 leading-[0.9] tracking-tighter">
               Your palate <br /> has <span className="text-saffron-500 italic font-serif-italic">no borders.</span>
             </h2>
             
             <div className="w-full space-y-4 max-w-xs">
                <button
                  onClick={onRestart}
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-white text-[#0a0604] px-8 py-4 rounded-full font-black text-lg sm:text-xl hover:bg-saffron-50 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                  <RotateCcw size={22} />
                  <span>Taste Again</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-saffron-500 text-white px-8 py-4 rounded-full font-black text-lg sm:text-xl hover:bg-saffron-600 transition-all duration-200 hover:scale-[1.02] shadow-xl shadow-saffron-500/30 active:scale-95"
                  onClick={() => {
                    const text = "I just discovered my global food identity with Taste Passport! 🌍🥘";
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <Share2 size={22} />
                  <span>Share Identity</span>
                </button>
             </div>
          </div>

          {/* Identity Card Side */}
          <div className="w-full md:w-[55%] p-8 sm:p-10 lg:p-16 bg-gradient-to-br from-white to-saffron-50 relative border-r border-saffron-100">
             <div className="absolute top-12 right-12 opacity-5 text-saffron-500">
               <Sparkles size={150} />
             </div>
             
             <div className="flex justify-between items-start mb-10 sm:mb-16 lg:mb-20 gap-4">
               <div className="flex flex-col">
                 <h3 className="text-[10px] font-black text-saffron-600 uppercase tracking-[0.5em] mb-4">Culinary Identity</h3>
                 <div className="h-1 w-12 bg-saffron-500 rounded-full" />
               </div>
               <span className="text-spice-black font-black text-[10px] bg-saffron-100 px-3 py-1 rounded-sm uppercase tracking-widest">Class-A Explorer</span>
             </div>
             
             <div className="mb-10 sm:mb-16 lg:mb-20">
               <span className="text-saffron-900/30 font-black text-[10px] uppercase tracking-[0.2em] block mb-4">Flavor Soul Matched</span>
               <h4 className="text-5xl sm:text-6xl lg:text-[6.5rem] font-display font-black text-spice-black leading-[0.85] tracking-tighter">
                 GLOBAL <br /> <span className="text-saffron-500">NOMAD</span>
               </h4>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
                <div>
                   <span className="text-saffron-900/30 font-black text-[10px] uppercase tracking-[0.2em] block mb-2">Palate Origin</span>
                   <span className="text-xl font-black text-spice-black uppercase tracking-tight">Hindustan</span>
                </div>
                <div>
                   <span className="text-saffron-900/30 font-black text-[10px] uppercase tracking-[0.2em] block mb-2">Destination DNA</span>
                   <div className="flex flex-wrap gap-1.5 mt-2">
                     {recommendations.slice(0, 3).map(r => (
                       <span key={r.rec.name} className="px-3 py-1 bg-white border border-saffron-200 text-saffron-700 rounded-sm font-black text-[9px] uppercase tracking-widest leading-none">{r.rec.country}</span>
                     ))}
                   </div>
                </div>
             </div>
             
             <div className="mt-10 sm:mt-14 lg:mt-20 flex items-center gap-4 opacity-40">
               <div className="w-12 h-12 rounded-full border-2 border-spice-black flex items-center justify-center p-2">
                 <MapPin size={24} />
               </div>
               <div className="h-px flex-1 bg-spice-black/20" />
               <span className="text-[10px] font-black uppercase tracking-widest">Taste Passport v1.0</span>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Navigation Hint */}
      <div className="fixed bottom-12 right-12 pointer-events-none opacity-40 hidden md:block group z-50">
        <div className="flex flex-col items-center gap-6">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-saffron-800 [writing-mode:vertical-lr] mb-2">Dive Deeper</span>
          <div className="w-px h-16 bg-gradient-to-b from-saffron-500 to-transparent relative overflow-hidden">
             <motion.div 
               animate={{ y: [0, 64] }} 
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               className="absolute top-0 left-0 w-full h-1/2 bg-white/50" 
             />
          </div>
        </div>
      </div>
    </div>
  );
};
