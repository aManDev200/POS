import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './MerchantScreen.module.css';

const MerchantScreen: React.FC = () => {
  const { user, setCurrentScreen } = useAppContext();

  return (
    <div className={styles.merchantScreen}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => setCurrentScreen('dashboard')}>
          ← Back
        </button>
        <h2>Merchant Information</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.infoCard}>
          <h3>Business Details</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Merchant Name</span>
              <span className={styles.value}>{user?.name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Merchant ID</span>
              <span className={styles.value}>{user?.merchantId}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Store Location</span>
              <span className={styles.value}>{user?.storeLocation}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Terminal ID</span>
              <span className={styles.value}>{user?.terminalId || 'T001'}</span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3>Contact Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Phone Number</span>
              <span className={styles.value}>{user?.phone || '+91 9876543210'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Email</span>
              <span className={styles.value}>{user?.email || 'merchant@example.com'}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Address</span>
              <span className={styles.value}>{user?.address || '123 Business Street, City'}</span>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <h3>Business Hours</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Weekdays</span>
              <span className={styles.value}>9:00 AM - 6:00 PM</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Weekends</span>
              <span className={styles.value}>10:00 AM - 4:00 PM</span>
            </div>
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

export default MerchantScreen; 