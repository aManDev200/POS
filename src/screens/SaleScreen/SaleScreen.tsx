import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { createTransaction } from '../../services/transactionService';
import styles from './SaleScreen.module.css';

const SaleScreen: React.FC = () => {
  const { setCurrentScreen, user } = useAppContext();
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNumberClick = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(prev => prev + num);
    }
  };

  const handleClear = () => {
    setAmount('');
    setError('');
  };

  const handleBackspace = () => {
    setAmount(prev => prev.slice(0, -1));
    setError('');
  };

  const handleProceed = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const transaction = await createTransaction(
        user?.merchantId || '',
        parseFloat(amount),
        'REGULAR'
      );

      if (transaction) {
        setCurrentScreen('brand');
      }
    } catch (err) {
      setError('Failed to process transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (!numericValue) return '₹0';
    return `₹${parseInt(numericValue).toLocaleString('en-IN')}`;
  };

  return (
    <div className={styles.saleScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => setCurrentScreen('dashboard')}
        >
          ←
        </button>
        <h2>Enter Sale Amount</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.amountDisplay}>
          <span className={styles.amount}>{formatAmount(amount)}</span>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.numpad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              className={styles.numpadButton}
              onClick={() => handleNumberClick(num.toString())}
              disabled={loading}
            >
              {num}
            </button>
          ))}
          <button
            className={styles.numpadButton}
            onClick={() => handleClear()}
            disabled={loading}
          >
            C
          </button>
          <button
            className={styles.numpadButton}
            onClick={() => handleNumberClick('0')}
            disabled={loading}
          >
            0
          </button>
          <button
            className={styles.numpadButton}
            onClick={() => handleBackspace()}
            disabled={loading}
          >
            ←
          </button>
        </div>

        <button
          className={styles.proceedButton}
          onClick={handleProceed}
          disabled={loading || !amount}
        >
          {loading ? (
            <>
              <span className={styles.spinner}></span>
              Processing...
            </>
          ) : (
            'Proceed'
          )}
        </button>
      </div>

      <div className={styles.footer}>
        <div className={styles.merchantInfo}>
          <span>{user?.name}</span>
          <span>|</span>
          <span>ID: {user?.merchantId}</span>
        </div>
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

export default SaleScreen;