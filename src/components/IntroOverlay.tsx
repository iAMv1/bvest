"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BvestLogo } from '@/components/BvestLogo';

export const IntroOverlay = () => {
  const [visible, setVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible(false);
      return;
    }
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);
    // Slide in + display animation ~4s + exit
    const doneTimer = setTimeout(dismiss, 2000);
    return () => { clearTimeout(skipTimer); clearTimeout(doneTimer); };
  }, [shouldReduceMotion]);

  const dismiss = () => {
    
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-overlay-wrapper"
          className="fixed inset-0 z-50 bg-black"
          exit={{ y: '-100%' }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1], // Sharp cubic bezier
          }}
        >
          <motion.div
            className="absolute inset-0 bg-[#060D17] dark:bg-[#04080F] flex flex-col items-center justify-center overflow-hidden px-4"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1], // Sharp cubic bezier for curtain slide
            }}
          >
          {/* Ambient subtle glow behind the logo */}
          <div className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-tr from-blue-500/10 via-emerald-500/10 to-rose-500/10 blur-3xl pointer-events-none" />

          {/* Inner content */}
          <motion.div
            className="flex flex-col items-center relative z-10"
            initial="hidden"
            animate="show"
          >
            {/* "BVCOE presents" */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: -20 },
                show:   { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5, ease: 'easeOut' } },
              }}
              className="font-sans text-xs md:text-sm font-semibold tracking-[0.35em] uppercase text-gray-400 mb-8 md:mb-12 select-none"
            >
              BVCOE presents
            </motion.p>

            {/* Finalized Animated BVEST Logo */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                show:   { opacity: 1, scale: 1, transition: { delay: 0.8, duration: 0.7, ease: 'easeOut' } },
              }}
              className="flex items-center justify-center text-white"
            >
              {/* Desktop Logo */}
              <div className="hidden sm:block">
                <BvestLogo size={240} showSubtitle={true} animated={true} />
              </div>
              {/* Mobile Logo */}
              <div className="block sm:hidden">
                <BvestLogo size={140} showSubtitle={true} animated={true} />
              </div>
            </motion.div>
          </motion.div>

          {/* Skip button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                key="skip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={dismiss}
                className="absolute bottom-8 right-8 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-xs font-semibold tracking-wider uppercase transition-colors backdrop-blur-sm"
              >
                Skip &rarr;
              </motion.button>
            )}
          </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
