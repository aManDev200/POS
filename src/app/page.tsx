'use client';

import React from 'react';
import { AppProvider, useAppContext } from '../context/AppContext';
import POSFrame from '../components/POSFrame/POSFrame';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SaleScreen from '../screens/SaleScreen/SaleScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import BrandSelectionScreen from '../screens/BrandSelectionScreen/BrandSelectionScreen';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import MerchantScreen from '../screens/MerchantScreen/MerchantScreen';
import MessagesScreen from '../screens/MessagesScreen/MessagesScreen';
import AnalyticsDashboard from '../screens/AnalyticsDashboard/AnalyticsDashboard';
import styles from './page.module.css';

const MainContent: React.FC = () => {
  const { currentScreen } = useAppContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'sale':
        return <SaleScreen />;
      case 'payment':
        return <PaymentScreen />;
      case 'brand':
        return <BrandSelectionScreen />;
      case 'merchant':
        return <MerchantScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'statements':
      case 'business':
      case 'additional':
        // Temporarily return to dashboard for unimplemented screens
        return <DashboardScreen />;
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