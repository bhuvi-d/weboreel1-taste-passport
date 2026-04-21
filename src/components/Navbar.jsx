import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Globe, Menu, X, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = ({ isAudioEnabled, toggleAudio, onReset, step }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  useEffect(() => {
    if (!isMenuOpen) {
      if (lastFocusedElementRef.current && typeof lastFocusedElementRef.current.focus === 'function') {
        lastFocusedElementRef.current.focus();
      } else if (menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
      return undefined;
    }

    lastFocusedElementRef.current = document.activeElement;
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const getFocusable = () =>
      Array.from(drawerRef.current?.querySelectorAll(focusableSelector) || []).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
      );

    const heading = drawerRef.current?.querySelector('#mobile-nav-drawer-title');
    if (heading && typeof heading.focus === 'function') {
      heading.focus();
    } else {
      const initialFocusable = getFocusable();
      if (initialFocusable[0]) {
        initialFocusable[0].focus();
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);

      if (event.key !== 'Tab') return;
      const focusableElements = getFocusable();
      if (!focusableElements.length) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [step]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-[100] section-shell py-3 sm:py-4 flex justify-between items-center bg-cream-base/75 backdrop-blur-xl border-b border-saffron-200/40"
      >
        {/* Brand Layer */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-saffron-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-saffron-500/30 shrink-0"
          >
            <Globe size={22} className="sm:w-7 sm:h-7" />
          </motion.div>
          <div className="flex flex-col min-w-0">
            <span className="font-display font-black text-lg sm:text-2xl tracking-tight text-spice-black leading-none truncate">
              TASTE PASSPORT
            </span>
            <span className="text-[9px] sm:text-[10px] font-black text-saffron-600 uppercase tracking-[0.25em] sm:tracking-[0.3em] mt-1 truncate">
              Global Flavor Map
            </span>
          </div>
        </div>

        {/* Controls Layer */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleAudio}
            type="button"
            className="w-10 h-10 sm:w-12 sm:h-12 glass-saffron rounded-full flex items-center justify-center text-saffron-600 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg border border-saffron-200/60 cursor-pointer"
            aria-label={isAudioEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            ref={menuButtonRef}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-spice-black text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[120]">
          <button
            type="button"
            className="absolute inset-0 bg-spice-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <motion.aside
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-nav-drawer-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-cream-base border-l border-saffron-200 shadow-2xl p-6 pt-24 overflow-y-auto"
          >
            <div className="space-y-6">
              <h2
                id="mobile-nav-drawer-title"
                tabIndex={-1}
                className="text-lg font-black tracking-tight text-spice-black"
              >
                Navigation Menu
              </h2>
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] font-black text-saffron-600">Quick Actions</p>
                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      toggleAudio();
                      setIsMenuOpen(false);
                    }}
                    className="w-full rounded-2xl border border-saffron-200 bg-white px-4 py-3 flex items-center justify-between font-bold text-spice-black hover:border-saffron-400 transition-colors"
                  >
                    <span>{isAudioEnabled ? 'Mute audio' : 'Enable audio'}</span>
                    {isAudioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onReset();
                      setIsMenuOpen(false);
                    }}
                    className="w-full rounded-2xl bg-saffron-500 text-white px-4 py-3 flex items-center justify-between font-bold hover:bg-saffron-600 transition-colors"
                  >
                    <span>Restart journey</span>
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-saffron-50 border border-saffron-100 p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-saffron-700 mb-3">Keyboard Tips</p>
                <ul className="space-y-2 text-sm text-saffron-900/90">
                  <li>Use <strong>Tab</strong> to move between buttons.</li>
                  <li>Use <strong>Enter</strong> or <strong>Space</strong> to activate actions.</li>
                  <li>Press <strong>Esc</strong> to close this menu.</li>
                </ul>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </>
  );
};
