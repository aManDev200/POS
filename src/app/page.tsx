'use client';

import React from 'react';
import { AppProvider } from '../context/AppContext';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import BrandSelectionScreen from '../screens/BrandSelectionScreen/BrandSelectionScreen';
import PaymentOptionsScreen from '../screens/PaymentOptionsScreen/PaymentOptionsScreen';
import UPIPaymentScreen from '../screens/UPIPaymentScreen/UPIPaymentScreen';
import CardPaymentScreen from '../screens/CardPaymentScreen/CardPaymentScreen';
import ContactlessPaymentScreen from '../screens/ContactlessPaymentScreen/ContactlessPaymentScreen';
import LoyaltyProgramScreen from '../screens/LoyaltyProgramScreen/LoyaltyProgramScreen';
import GiftCardScreen from '../screens/GiftCardScreen/GiftCardScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen/PaymentSuccessScreen';
import MerchantScreen from '../screens/MerchantScreen/MerchantScreen';
import AnalyticsDashboard from '../screens/AnalyticsDashboard/AnalyticsDashboard';
import StatementsScreen from '../screens/StatementsScreen/StatementsScreen';
import MessagesScreen from '../screens/MessagesScreen/MessagesScreen';
import BusinessScreen from '../screens/BusinessScreen/BusinessScreen';
import AdditionalScreen from '../screens/AdditionalScreen/AdditionalScreen';
import TransactionsScreen from '../screens/TransactionsScreen/TransactionsScreen';
import POSFrame from '../components/POSFrame/POSFrame';
import { useAppContext } from '../context/AppContext';
import styles from './page.module.css';

const AppContent: React.FC = () => {
  const { currentScreen } = useAppContext();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'brandSelection':
        return <BrandSelectionScreen />;
      case 'paymentOptions':
        return <PaymentOptionsScreen />;
      case 'upiPayment':
        return <UPIPaymentScreen />;
      case 'cardPayment':
        return <CardPaymentScreen />;
      case 'contactlessPayment':
        return <ContactlessPaymentScreen />;
      case 'loyaltyProgram':
        return <LoyaltyProgramScreen />;
      case 'giftCard':
        return <GiftCardScreen />;
      case 'paymentSuccess':
        return <PaymentSuccessScreen />;
      case 'merchant':
        return <MerchantScreen />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'statements':
        return <StatementsScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'business':
        return <BusinessScreen />;
      case 'additional':
        return <AdditionalScreen />;
      case 'transactions':
        return <TransactionsScreen />;
      default:
        return <LoginScreen />;
    }
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.appWrapper}>
        <POSFrame>
          {renderScreen()}
        </POSFrame>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}