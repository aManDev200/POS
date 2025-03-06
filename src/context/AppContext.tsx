import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

// Define screen types
type ScreenType = 
  'login' | 
  'dashboard' | 
  'products' | 
  'paymentOptions' | 
  'upiPayment' | 
  'cardPayment' | 
  'contactlessPayment' | 
  'loyaltyProgram' | 
  'giftCard' | 
  'brandSelection' | 
  'payment' | 
  'paymentSuccess' |
  'merchant' |
  'analytics' |
  'statements' |
  'messages' |
  'business' |
  'additional' |
  'transactions';

interface User {
  id: string;
  username: string;
  name: string;
  role: string;
}

interface Transaction {
  id: string;
  amount: number;
  type: 'card' | 'upi' | 'contactless' | 'loyalty' | 'gift';
  date: string;
  status: 'success' | 'failed';
  customerPhone?: string;
}

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  amount: number;
  setAmount: (amount: number) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [amount, setAmount] = useState<number>(1999);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Check for logged in user on app load
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
      setCurrentScreen('dashboard');
    }
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: 'TXN' + Date.now().toString().slice(-8),
      date: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  useEffect(() => {
    if (user) {
      // fetchTransactions(); // Uncomment when API is ready
    }
  }, [user]);

  const value = {
    currentScreen,
    setCurrentScreen,
    amount,
    setAmount,
    user,
    setUser,
    transactions,
    addTransaction
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};