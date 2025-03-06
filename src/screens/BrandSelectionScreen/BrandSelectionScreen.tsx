import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import BrandEmiSelector from '../../components/BrandEmiSelector/BrandEmiSelector';
import styles from './BrandSelectionScreen.module.css';

const BrandSelectionScreen: React.FC = () => {
  const { setCurrentScreen, amount } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const handleComplete = async (offer: any, tenure: number) => {
    setIsProcessing(true);
    try {
      // TODO: Implement the actual EMI processing logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing
      setCurrentScreen('payment');
    } catch (error) {
      console.error('Error processing EMI:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.brandScreen}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ←
        </button>
        <h2>Brand EMI Selection</h2>
      </div>

      <div className={styles.content}>
        {isProcessing ? (
          <div className={styles.processingContainer}>
            <div className={styles.spinner}></div>
            <p>Processing your EMI request...</p>
          </div>
        ) : (
          <BrandEmiSelector
            amount={amount}
            onComplete={handleComplete}
          />
        )}
      </div>
    </div>
  );
};

export default BrandSelectionScreen;
