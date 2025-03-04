import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';

type Screen = 
  | 'login' 
  | 'sale' 
  | 'payment' 
  | 'brand' 
  | 'dashboard'
  | 'merchant'
  | 'statements'
  | 'messages'
  | 'business'
  | 'additional'
  | 'analytics'
  | 'success';

interface User {
  id: number;
  username: string;
  name: string;
  merchantId: string;
  storeLocation: string;
}

interface AppContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;
  amount: number;
  setAmount: (amount: number) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);

  // Check for logged in user on app load
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
      setCurrentScreen('sale');
    }
  }, []);

  const value = {
    currentScreen,
    setCurrentScreen,
    selectedBrand,
    setSelectedBrand,
    amount,
    setAmount,
    user,
    setUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};