import React, { createContext, useState } from 'react';
import { Calculation, LeaseContextType, LeaseProviderProps } from '../types';

export const LeaseContext = createContext<LeaseContextType>({
  calculations: [],
  addCalculation: () => {},
});

export const LeaseProvider: React.FC<LeaseProviderProps> = ({ children }) => {
  const [calculations, setCalculations] = useState<Calculation[]>([]);

  const addCalculation = (calc: Calculation) => {
    setCalculations((prev) => [...prev, calc]);
  };

  return (
    <LeaseContext.Provider value={{ calculations, addCalculation }}>
      {children}
    </LeaseContext.Provider>
  );
};