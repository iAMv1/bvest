"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

const IntroContext = createContext(false);

export const IntroProvider = ({ children }: { children: React.ReactNode }) => {
  const [introDone, setIntroDone] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setIntroDone(true);
      return;
    }
    
    // IntroOverlay dismiss timer is 2000ms.
    // Exit animation duration is 750ms.
    // Total wait ~2750ms.
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 2800);
    
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <IntroContext.Provider value={introDone}>
      {children}
    </IntroContext.Provider>
  );
};

export const useIntro = () => useContext(IntroContext);
