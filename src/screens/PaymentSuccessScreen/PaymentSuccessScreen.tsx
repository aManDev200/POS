import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './PaymentSuccessScreen.module.css';

const PaymentSuccessScreen: React.FC = () => {
  const { setCurrentScreen, amount, setAmount, addTransaction } = useAppContext();
  const transactionAdded = useRef(false);

  useEffect(() => {
    if (!transactionAdded.current && amount > 0) {
      // Add transaction to the list only once
      addTransaction({
        amount,
        type: 'card',
        status: 'success',
        customerPhone: localStorage.getItem('lastCustomerPhone') || undefined
      });
      transactionAdded.current = true;

      // Reset amount after showing success screen
      const timer = setTimeout(() => {
        setAmount(0);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [amount, setAmount, addTransaction]);

  const handleNewTransaction = () => {
    setCurrentScreen('paymentOptions');
  };

  const handleDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateTransactionId = () => {
    return 'TXN' + Date.now().toString().slice(-8);
  };

  return (
    <div className={styles.successScreen}>
      <div className={styles.content}>
        <div className={styles.successIcon}>✓</div>
        <h2>Payment Successful!</h2>
        
        <div className={styles.transactionDetails}>
          <div className={styles.detailRow}>
            <span>Amount:</span>
            <span className={styles.amount}>₹{amount.toLocaleString()}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Transaction ID:</span>
            <span>{generateTransactionId()}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Date & Time:</span>
            <span>{formatDate()}</span>
          </div>
          <div className={styles.detailRow}>
            <span>Status:</span>
            <span className={styles.status}>Completed</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={styles.printButton}
            onClick={() => window.print()}
          >
            Print Receipt
          </button>
          <button 
            className={styles.newTransactionButton}
            onClick={handleNewTransaction}
          >
            New Transaction
          </button>
          <button 
            className={styles.dashboardButton}
            onClick={handleDashboard}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessScreen; 