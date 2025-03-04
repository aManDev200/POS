import React from 'react';
import styles from './Sidebar.module.css';
import { useAppContext } from '../../context/AppContext';

const Sidebar: React.FC = () => {
  const { setCurrentScreen } = useAppContext();

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/images/fiserv-logo.png" alt="Fiserv Logo" />
        <div className={styles.slogan}>Unleash Business Potential</div>
      </div>
      
      <nav className={styles.menu}>
        <ul>
          <li onClick={() => setCurrentScreen('merchant')}>
            <span className={styles.icon}>ℹ</span>
            <span className={styles.text}>Merchant Information</span>
          </li>
          <li onClick={() => setCurrentScreen('dashboard')}>
            <span className={styles.icon}>📊</span>
            <span className={styles.text}>Dashboard</span>
          </li>
          <li onClick={() => setCurrentScreen('brand')}>
            <span className={styles.icon}>🏷️</span>
            <span className={styles.text}>Brand EMI</span>
          </li>
          <li onClick={() => setCurrentScreen('statements')}>
            <span className={styles.icon}>📝</span>
            <span className={styles.text}>Statements and Invoices</span>
          </li>
          <li onClick={() => setCurrentScreen('sale')}>
            <span className={styles.icon}>💲</span>
            <span className={styles.text}>Sale</span>
          </li>
          <li onClick={() => setCurrentScreen('messages')}>
            <span className={styles.icon}>✉️</span>
            <span className={styles.text}>Messages</span>
          </li>
          <li onClick={() => setCurrentScreen('business')}>
            <span className={styles.icon}>🏢</span>
            <span className={styles.text}>My Business</span>
          </li>
          <li onClick={() => setCurrentScreen('links')}>
            <span className={styles.icon}>🔗</span>
            <span className={styles.text}>Additional Links</span>
          </li>
        </ul>
      </nav>
      
      <div className={styles.userInfo}>
        <div className={styles.userName}>User Name: Tom</div>
        <div className={styles.merchantId}>Merchant ID: 123456789123456</div>
        <div className={styles.terminalId}>Terminal ID: 11234567</div>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.actionButton}>?</button>
        <button className={styles.actionButton}>⚙️</button>
        <button className={styles.actionButton}>ℹ</button>
        <button className={styles.actionButton}>↻</button>
      </div>
    </div>
  );
};

export default Sidebar;