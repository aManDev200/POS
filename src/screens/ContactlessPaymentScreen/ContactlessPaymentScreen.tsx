import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './ContactlessPaymentScreen.module.css';

const ContactlessPaymentScreen: React.FC = () => {
  const { setCurrentScreen, amount } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('waiting');
  const [countdown, setCountdown] = useState(20);

  const handleBack = () => {
    setCurrentScreen('paymentOptions');
  };

  useEffect(() => {
    // Simulate the tap card prompt
    const timer = setTimeout(() => {
      if (status === 'waiting') {
        setStatus('detected');
        setIsProcessing(true);
        // Simulate processing and success
        setTimeout(() => {
          setCurrentScreen('paymentSuccess');
        }, 3000);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [status, setCurrentScreen]);

  useEffect(() => {
    if (countdown > 0 && status === 'waiting') {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, status]);

  return (
    <div className={styles.contactlessScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          disabled={isProcessing}
        >
          ←
        </button>
        <h2>Contactless Payment</h2>
        <div className={styles.amount}>
          ₹{amount.toLocaleString()}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.readerContainer}>
          <div className={`${styles.reader} ${status === 'detected' ? styles.active : ''}`}>
            <div className={styles.readerIcon}>
              <span className={styles.waveIcon}>〜</span>
              <span className={styles.cardIcon}>💳</span>
            </div>
            <div className={styles.status}>
              {status === 'waiting' ? (
                <>Tap your card, phone, or wearable</>
              ) : (
                <>Card detected, please hold...</>
              )}
            </div>
          </div>
          {status === 'waiting' && (
            <div className={styles.countdown}>
              Waiting for card... {countdown}s
            </div>
          )}
        </div>

        <div className={styles.instructions}>
          <h3>How to pay:</h3>
          <ol>
            <li>Hold your contactless card near the reader</li>
            <li>Wait for the confirmation beep</li>
            <li>Don't remove your card until prompted</li>
          </ol>
        </div>

        <div className={styles.supportedMethods}>
          <h3>Supported Methods</h3>
          <div className={styles.methodsGrid}>
            <div className={styles.method}>
              <span className={styles.methodIcon}>💳</span>
              <span>Contactless Cards</span>
            </div>
            <div className={styles.method}>
              <span className={styles.methodIcon}>📱</span>
              <span>Mobile Wallets</span>
            </div>
            <div className={styles.method}>
              <span className={styles.methodIcon}>⌚</span>
              <span>Smartwatches</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactlessPaymentScreen; 