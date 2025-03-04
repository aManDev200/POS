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
    id: 'brand',
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
    id: 'sale',
    icon: '💳',
    title: 'Sale',
    description: 'Process new transactions'
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
    setCurrentScreen(menuId);
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  return (
    <div className={styles.dashboardScreen}>
      <div className={styles.header}>
        <h2>Welcome, {user?.name}</h2>
        <p className={styles.subtitle}>Select an option to proceed</p>
        <button className={styles.signOutButton} onClick={handleSignOut}>
          Sign Out
        </button>
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

      <div className={styles.merchantInfo}>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Merchant ID</span>
            <span className={styles.value}>{user?.merchantId}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Terminal ID</span>
            <span className={styles.value}>{user?.terminalId || 'T001'}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}>{user?.location || 'Main Branch'}</span>
          </div>
        </div>
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
