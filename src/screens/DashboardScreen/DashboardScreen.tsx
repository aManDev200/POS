import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './DashboardScreen.module.css';

const menuItems = [
  {
    id: 'merchant',
    icon: '👤',
    title: 'Merchant Information',
    description: 'View and manage your merchant details'
  },
  {
    id: 'analytics',
    icon: '📊',
    title: 'Analytics Dashboard',
    description: 'View sales and performance metrics'
  },
  {
    id: 'brandSelection',
    icon: '🏷️',
    title: 'Brand EMI',
    description: 'Manage brand-specific EMI options'
  },
  {
    id: 'statements',
    icon: '📝',
    title: 'Statements and Invoices',
    description: 'Access your financial documents'
  },
  {
    id: 'paymentOptions',
    icon: '💳',
    title: 'Pay Now',
    description: 'Process new transactions'
  },
  {
    id: 'transactions',
    icon: '📋',
    title: 'Recent Transactions',
    description: 'View transaction history'
  },
  {
    id: 'messages',
    icon: '✉️',
    title: 'Messages',
    description: 'View your notifications'
  },
  {
    id: 'business',
    icon: '🏢',
    title: 'My Business',
    description: 'Manage your business settings'
  },
  {
    id: 'additional',
    icon: '🔗',
    title: 'Additional Links',
    description: 'Access more features'
  }
];

const DashboardScreen: React.FC = () => {
  const { setCurrentScreen, user, setUser } = useAppContext();

  const handleMenuClick = (menuId: string) => {
    // Map menu IDs to screen types
    const screenMap: { [key: string]: string } = {
      merchant: 'merchant',
      analytics: 'analytics',
      brandSelection: 'brandSelection',
      statements: 'statements',
      paymentOptions: 'paymentOptions',
      transactions: 'transactions',
      messages: 'messages',
      business: 'business',
      additional: 'additional'
    };

    const targetScreen = screenMap[menuId];
    if (targetScreen) {
      setCurrentScreen(targetScreen as any);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  return (
    <div className={styles.dashboardScreen}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.merchantName}>{user?.name}</div>
          <button className={styles.signOutButton} onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </div>

      <div className={styles.menuGrid}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={styles.menuItem}
            onClick={() => handleMenuClick(item.id)}
          >
            <span className={styles.icon}>{item.icon}</span>
            <div className={styles.itemContent}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </button>
        ))}
      </div>

      <div className={styles.footer}>
        <img 
          src="/images/Fiserv_logo.svg.png" 
          alt="Fiserv" 
          className={styles.fiservLogo}
        />
        <p>Powered by Fiserv</p>
      </div>
    </div>
  );
};

export default DashboardScreen;
