import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './TransactionsScreen.module.css';

const TransactionsScreen: React.FC = () => {
  const { setCurrentScreen, transactions } = useAppContext();

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className={styles.transactionsScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          aria-label="Back"
        >
          ←
        </button>
        <h2>Recent Transactions</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.transactionsList}>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.id} className={styles.transactionItem}>
                <div className={styles.transactionHeader}>
                  <span className={styles.transactionId}>{transaction.id}</span>
                  <span className={styles.transactionDate}>{transaction.date}</span>
                </div>
                <div className={styles.transactionDetails}>
                  <span className={styles.transactionAmount}>₹{transaction.amount.toLocaleString()}</span>
                  <span className={`${styles.transactionStatus} ${styles[transaction.status]}`}>
                    {transaction.status}
                  </span>
                </div>
                <div className={styles.transactionFooter}>
                  <span className={styles.transactionType}>{transaction.type}</span>
                  {transaction.customerPhone && (
                    <span className={styles.customerPhone}>{transaction.customerPhone}</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noTransactions}>
              No recent transactions
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsScreen; 