import { useState, useCallback } from 'react';

export const useAppStore = () => {
  const [step, setStep] = useState('hero'); // hero, selection, dna, reel, result
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const toggleDish = useCallback((dishId) => {
    setSelectedDishes(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  }, []);

  const nextStep = useCallback((targetStep) => {
    setStep(targetStep);
  }, []);

  const toggleAudio = useCallback(() => {
    setIsAudioEnabled(prev => !prev);
  }, []);

  const reset = useCallback(() => {
    setStep('hero');
    setSelectedDishes([]);
  }, []);

  return {
    step,
    selectedDishes,
    isAudioEnabled,
    toggleDish,
    nextStep,
    toggleAudio,
    reset
  };
};
