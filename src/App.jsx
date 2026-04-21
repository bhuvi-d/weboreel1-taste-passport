import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, AnimatePresence } from 'framer-motion';
import useSound from 'use-sound';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './pages/Hero';
import { Selection } from './pages/Selection';
import { DNASection } from './pages/DNASection';
import { GlobalReel } from './pages/GlobalReel';

// Hooks & Data
import { useAppStore } from './hooks/useAppStore';
import { INDIAN_DISHES } from './data/foodData';

function App() {
  const { 
    step, 
    selectedDishes, 
    isAudioEnabled, 
    toggleDish, 
    nextStep, 
    toggleAudio, 
    reset 
  } = useAppStore();

  // Smooth Scroll Initialization (Lenis)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.0, // Snappier duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2, // Slightly more responsive
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Audio Logic (Using robust public URLs with fallbacks)
  const [playClick] = useSound('https://actions.google.com/sounds/v1/ui/beep_short.ogg', { 
    volume: 0.25, 
    soundEnabled: isAudioEnabled 
  });
  
  const [playSuccess] = useSound('https://actions.google.com/sounds/v1/ui/simple_notification.ogg', { 
    volume: 0.4, 
    soundEnabled: isAudioEnabled 
  });

  const handleToggleDish = (id) => {
    playClick();
    toggleDish(id);
  };

  const handleNextStep = (next) => {
    playSuccess();
    nextStep(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <main className="font-sans antialiased text-spice-black bg-cream-base min-h-screen overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-white focus:text-spice-black focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:outline focus:outline-2 focus:outline-saffron-500"
      >
        Skip to main content
      </a>
      <Navbar
        isAudioEnabled={isAudioEnabled}
        toggleAudio={toggleAudio}
        onReset={reset}
        step={step}
      />

      <div id="main-content" tabIndex={-1}>
      <AnimatePresence mode="wait">
        {step === 'hero' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.55 }}
          >
            <Hero onStart={() => handleNextStep('selection')} />
          </motion.div>
        )}

        {step === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Selection 
              dishes={INDIAN_DISHES} 
              selectedDishes={selectedDishes} 
              onToggle={handleToggleDish}
              onNext={() => handleNextStep('dna')}
            />
          </motion.div>
        )}

        {step === 'dna' && (
          <motion.div
            key="dna"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DNASection 
              selectedDishes={selectedDishes} 
              dishes={INDIAN_DISHES} 
              onComplete={() => handleNextStep('reel')}
            />
          </motion.div>
        )}

        {step === 'reel' && (
          <motion.div
            key="reel"
            initial={{ opacity: 0, filter: "blur(40px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9 }}
          >
            <GlobalReel 
              selectedDishes={selectedDishes} 
              dishes={INDIAN_DISHES} 
              onRestart={reset}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* Robust Ambient Background Music */}
      <audio
        id="bg-music"
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
        ref={(el) => {
          if (el) {
            el.volume = 0.15;
            if (isAudioEnabled) {
              el.play().catch(() => console.log("Ambient blocked by browser policies until interaction."));
            } else {
              el.pause();
            }
          }
        }}
        className="hidden"
      />
    </main>
  );
}

export default App;
