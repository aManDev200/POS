import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './StatementsScreen.module.css';

const StatementsScreen: React.FC = () => {
  const { setCurrentScreen } = useAppContext();

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className={styles.statementsScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          aria-label="Back"
        >
          ←
        </button>
        <h2>Statements & Invoices</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.filterSection}>
          <select className={styles.filterSelect}>
            <option value="all">All Statements</option>
            <option value="monthly">Monthly Statements</option>
            <option value="quarterly">Quarterly Statements</option>
            <option value="yearly">Yearly Statements</option>
          </select>
        </div>

        <div className={styles.statementsList}>
          <div className={styles.statementItem}>
            <div className={styles.statementHeader}>
              <h3>Monthly Statement</h3>
              <span className={styles.date}>March 2024</span>
            </div>
            <div className={styles.statementDetails}>
              <p>Total Transactions: 156</p>
              <p>Total Amount: ₹1,25,000</p>
            </div>
            <button className={styles.downloadButton}>
              Download PDF
            </button>
          </div>

          <div className={styles.statementItem}>
            <div className={styles.statementHeader}>
              <h3>Monthly Statement</h3>
              <span className={styles.date}>February 2024</span>
            </div>
            <div className={styles.statementDetails}>
              <p>Total Transactions: 142</p>
              <p>Total Amount: ₹1,18,000</p>
            </div>
            <button className={styles.downloadButton}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatementsScreen; 