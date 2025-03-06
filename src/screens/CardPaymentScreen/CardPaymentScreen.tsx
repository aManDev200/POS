import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import NumPad from '../../components/NumPad/NumPad';
import styles from './CardPaymentScreen.module.css';

const CardPaymentScreen: React.FC = () => {
  const { setCurrentScreen, amount, setAmount } = useAppContext();
  const [step, setStep] = useState<'phone' | 'amount' | 'card' | 'pin'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    if (step === 'phone') {
      setCurrentScreen('paymentOptions');
    } else if (step === 'amount') {
      setStep('phone');
      setPhoneNumber('');
    } else if (step === 'card') {
      setStep('amount');
      setInputAmount('');
    } else if (step === 'pin') {
      setStep('card');
      setPin('');
    }
  };

  const handlePhoneEnter = () => {
    if (phoneNumber.length === 10) {
      setStep('amount');
    }
  };

  const handleAmountEnter = () => {
    if (inputAmount && parseFloat(inputAmount) > 0) {
      setAmount(parseFloat(inputAmount));
      setStep('card');
    }
  };

  const handleCardEnter = () => {
    setStep('pin');
  };

  const handlePinEnter = async () => {
    if (pin.length === 4) {
      setIsProcessing(true);
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setCurrentScreen('paymentSuccess');
      } catch (error) {
        console.error('Payment failed:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'phone':
        return (
          <div className={styles.stepContainer}>
            <div className={styles.phoneContainer}>
              <div className={styles.phoneIcon}>📱</div>
              <h3>Enter Customer's Phone Number</h3>
            </div>
            <NumPad
              value={phoneNumber}
              onChange={setPhoneNumber}
              title="Phone Number"
              maxLength={10}
              onEnter={handlePhoneEnter}
            />
          </div>
        );
      case 'amount':
        return (
          <div className={styles.stepContainer}>
            <div className={styles.amountContainer}>
              <div className={styles.amountIcon}>₹</div>
              <h3>Enter Amount</h3>
            </div>
            <NumPad
              value={inputAmount}
              onChange={setInputAmount}
              title="Enter Amount"
              showDecimal={true}
              onEnter={handleAmountEnter}
              maxLength={10}
            />
          </div>
        );
      case 'card':
        return (
          <div className={styles.stepContainer}>
            <div className={styles.cardContainer}>
              <div className={styles.cardIcon}>💳</div>
              <h3>Please insert or swipe card</h3>
              <div className={styles.amount}>₹{amount.toLocaleString()}</div>
            </div>
            <button 
              className={styles.enterButton}
              onClick={handleCardEnter}
            >
              Card Inserted
            </button>
          </div>
        );
      case 'pin':
        return (
          <div className={styles.stepContainer}>
            <NumPad
              value={pin}
              onChange={setPin}
              title="Enter PIN"
              maxLength={4}
              onEnter={handlePinEnter}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.cardScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          disabled={isProcessing}
          aria-label="Back"
        >
          ←
        </button>
        <h2>Card Payment</h2>
        <div className={styles.amount}>
          ₹{amount.toLocaleString()}
        </div>
      </div>

      <div className={styles.content}>
        {renderStep()}
      </div>

      {isProcessing && (
        <div className={styles.processingOverlay}>
          <div className={styles.spinner}></div>
          <p>Processing payment...</p>
        </div>
      )}
    </div>
  );
};

export default CardPaymentScreen; 