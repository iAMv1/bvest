"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';

const IntroContext = createContext(false);
const IntroSetContext = createContext<(() => void) | null>(null);

export const IntroProvider = ({ children }: { children: React.ReactNode }) => {
  const [introDone, setIntroDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const markDone = useCallback(() => {
    setIntroDone(true);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion) {
      const raf = requestAnimationFrame(() => setIntroDone(true));
      return () => cancelAnimationFrame(raf);
    }

    // IntroOverlay dismiss timer is 5500ms.
    // Exit animation duration is 750ms.
    // Total wait ~6250ms.
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 2300);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <IntroSetContext.Provider value={markDone}>
      <IntroContext.Provider value={introDone}>
        {children}
      </IntroContext.Provider>
    </IntroSetContext.Provider>
  );
};

export const useIntro = () => useContext(IntroContext);
export const useSetIntroDone = () => useContext(IntroSetContext);