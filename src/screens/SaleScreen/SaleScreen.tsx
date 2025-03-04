import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Numpad from '../../components/Numpad/Numpad';
import styles from './SaleScreen.module.css';

const SaleScreen: React.FC = () => {
  const { setCurrentScreen, setAmount, user } = useAppContext();
  const [displayAmount, setDisplayAmount] = useState<string>('0');
  const [error, setError] = useState<string>('');

  const handleNumberClick = (num: string) => {
    setError('');
    if (num === '.' && displayAmount.includes('.')) return;
    
    let newAmount = displayAmount;
    if (displayAmount === '0' && num !== '.') {
      newAmount = num;
    } else {
      newAmount = displayAmount + num;
    }
    
    // Validate decimal places
    const parts = newAmount.split('.');
    if (parts[1] && parts[1].length > 2) return;
    
    // Maximum amount validation
    if (parseFloat(newAmount) > 500000) {
      setError('Amount cannot exceed ₹5,00,000');
      return;
    }
    
    setDisplayAmount(newAmount);
  };

  const handleClear = () => {
    if (displayAmount.length <= 1) {
      setDisplayAmount('0');
    } else {
      setDisplayAmount(prev => prev.slice(0, -1));
    }
    setError('');
  };

  const handleEnter = () => {
    const finalAmount = parseFloat(displayAmount);
    if (finalAmount < 1000) {
      setError('Minimum amount for EMI is ₹1,000');
      return;
    }
    setAmount(finalAmount);
    setCurrentScreen('brand');
  };

  const formatAmount = (amount: string): string => {
    const number = parseFloat(amount);
    if (isNaN(number)) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(number);
  };

  return (
    <div className={styles.saleScreen}>
      <div className={styles.header}>
        <h2>Enter Sale Amount</h2>
        <p className={styles.subtitle}>Enter the total purchase amount</p>
      </div>

      <div className={styles.amountDisplay}>
        <div className={styles.amount}>{formatAmount(displayAmount)}</div>
        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Min Amount</span>
          <span className={styles.value}>₹1,000</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Max Amount</span>
          <span className={styles.value}>₹5,00,000</span>
        </div>
      </div>

      <div className={styles.numpadContainer}>
        <Numpad
          onNumberClick={handleNumberClick}
          onClear={handleClear}
          onEnter={handleEnter}
          showDot={true}
        />
      </div>
    </div>
  );
};

export default SaleScreen;