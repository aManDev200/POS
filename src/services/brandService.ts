import axios from 'axios';

const API_URL = 'http://localhost:3002';

export interface Brand {
  id: number;
  name: string;
  logo: string;
  offers: EMIOffer[];
}

export interface EMIOffer {
  id: number;
  title: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  tenures: number[];
  interestRate: number;
  processingFee: number;
}

export interface EMICalculation {
  amount: number;
  tenure: number;
  interestRate: number;
  processingFee: number;
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
}

export const getBrands = async (): Promise<Brand[]> => {
  const response = await axios.get(`${API_URL}/brands`);
  return response.data;
};

export const calculateEMI = (
  amount: number,
  tenure: number,
  interestRate: number,
  processingFee: number
): EMICalculation => {
  // Convert annual interest rate to monthly
  const monthlyRate = (interestRate / 12) / 100;
  
  // Calculate monthly EMI using formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  let monthlyEMI = amount;
  if (interestRate > 0) {
    monthlyEMI = amount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                 (Math.pow(1 + monthlyRate, tenure) - 1);
  } else {
    monthlyEMI = amount / tenure;
  }

  const totalAmount = (monthlyEMI * tenure) + processingFee;
  const totalInterest = totalAmount - amount - processingFee;

  return {
    amount,
    tenure,
    interestRate,
    processingFee,
    monthlyEMI,
    totalAmount,
    totalInterest
  };
}; 