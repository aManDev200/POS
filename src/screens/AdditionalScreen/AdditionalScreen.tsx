import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './AdditionalScreen.module.css';

const AdditionalScreen: React.FC = () => {
  const { setCurrentScreen } = useAppContext();

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className={styles.additionalScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          aria-label="Back"
        >
          ←
        </button>
        <h2>Additional Links</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.linksGrid}>
          <button className={styles.linkCard}>
            <span className={styles.linkIcon}>📱</span>
            <h3>Mobile App</h3>
            <p>Download our mobile app</p>
          </button>

          <button className={styles.linkCard}>
            <span className={styles.linkIcon}>💬</span>
            <h3>Support</h3>
            <p>Get help and support</p>
          </button>

          <button className={styles.linkCard}>
            <span className={styles.linkIcon}>📚</span>
            <h3>Documentation</h3>
            <p>User guides and manuals</p>
          </button>

          <button className={styles.linkCard}>
            <span className={styles.linkIcon}>🔒</span>
            <h3>Security</h3>
            <p>Security settings and info</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalScreen; 