'use client';

import React from 'react';
import { AppProvider, useAppContext } from '../context/AppContext';
import POSFrame from '../components/POSFrame/POSFrame';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SaleScreen from '../screens/SaleScreen/SaleScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import BrandSelectionScreen from '../screens/BrandSelectionScreen/BrandSelectionScreen';
import styles from './page.module.css';

const MainContent: React.FC = () => {
  const { currentScreen } = useAppContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'sale':
        return <SaleScreen />;
      case 'payment':
        return <PaymentScreen />;
      case 'brand':
        return <BrandSelectionScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <div className={styles.appContainer}>
      <POSFrame>
        {renderScreen()}
      </POSFrame>
    </div>
  );
};

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}