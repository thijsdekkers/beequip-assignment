import { ReactNode } from 'react';

export interface LeaseCalculationInput {
  purchasePrice: string;
  object: {
    brand: string;
    type: string;
    year: string;
  }
}


export interface CalculationInput {
  objectBrand: string;
  objectType: string;
  objectYear: string;
  purchasePrice: string;
}

export interface CalculationResponse {
  monthlyPayment: number;
  downPayment: number;
  balloonPayment: number;
  tenor: number;
}

export interface Calculation extends CalculationInput, CalculationResponse {}

export interface LeaseContextType {
  calculations: Calculation[];
  addCalculation: (calc: Calculation) => void;
}

export interface LeaseProviderProps {
  children: ReactNode;
}