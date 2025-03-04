import axios from 'axios';
import { EMICalculation } from './brandService';

const API_URL = 'http://localhost:3002';

export interface Transaction {
  id?: number;
  merchantId: string;
  amount: number;
  type: 'EMI' | 'REGULAR';
  brand?: string;
  offer?: {
    id: number;
    title: string;
    tenure: number;
    interestRate: number;
    processingFee: number;
  };
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

export const createTransaction = async (
  merchantId: string,
  amount: number,
  type: 'EMI' | 'REGULAR',
  emiDetails?: {
    brand: string;
    offer: {
      id: number;
      title: string;
      tenure: number;
      interestRate: number;
      processingFee: number;
    };
  }
): Promise<Transaction> => {
  const transaction: Omit<Transaction, 'id'> = {
    merchantId,
    amount,
    type,
    status: 'pending',
    date: new Date().toISOString(),
    ...(emiDetails && {
      brand: emiDetails.brand,
      offer: emiDetails.offer
    })
  };

  const response = await axios.post(`${API_URL}/transactions`, transaction);
  return response.data;
};

export const getTransactions = async (merchantId: string): Promise<Transaction[]> => {
  const response = await axios.get(`${API_URL}/transactions?merchantId=${merchantId}`);
  return response.data;
};

export const updateTransactionStatus = async (
  transactionId: number,
  status: 'completed' | 'failed'
): Promise<Transaction> => {
  const response = await axios.patch(`${API_URL}/transactions/${transactionId}`, { status });
  return response.data;
}; 