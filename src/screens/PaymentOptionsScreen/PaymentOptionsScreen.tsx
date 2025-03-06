import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './PaymentOptionsScreen.module.css';
import NumPad from '../../components/NumPad/NumPad';

interface PaymentOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'upi',
    name: 'UPI Payment',
    icon: '📱',
    description: 'Pay using UPI apps',
    color: '#4CAF50'
  },
  {
    id: 'card',
    name: 'Card Payment',
    icon: '💳',
    description: 'Credit/Debit card',
    color: '#2196F3'
  },
  {
    id: 'contactless',
    name: 'Contactless',
    icon: '🔒',
    description: 'Tap to pay',
    color: '#9C27B0'
  },
  {
    id: 'loyalty',
    name: 'Loyalty Program',
    icon: '🎯',
    description: 'Use loyalty points',
    color: '#FF9800'
  },
  {
    id: 'gift',
    name: 'Gift Card',
    icon: '🎁',
    description: 'Redeem gift card',
    color: '#E91E63'
  }
];

const PaymentOptionsScreen: React.FC = () => {
  const { setCurrentScreen, amount, setAmount } = useAppContext();
  const [inputAmount, setInputAmount] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const handleBack = () => {
    if (showPaymentOptions) {
      setShowPaymentOptions(false);
      setInputAmount('');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleAmountEnter = () => {
    if (inputAmount && parseFloat(inputAmount) > 0) {
      setAmount(parseFloat(inputAmount));
      setShowPaymentOptions(true);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    switch (optionId) {
      case 'upi':
        setCurrentScreen('upiPayment');
        break;
      case 'card':
        setCurrentScreen('cardPayment');
        break;
      case 'contactless':
        setCurrentScreen('contactlessPayment');
        break;
      case 'loyalty':
        setCurrentScreen('loyaltyProgram');
        break;
      case 'gift':
        setCurrentScreen('giftCard');
        break;
    }
  };

  return (
    <div className={styles.paymentScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          aria-label="Back"
        >
          ←
        </button>
        <h2>{showPaymentOptions ? 'Select Payment Method' : 'Enter Amount'}</h2>
        {showPaymentOptions && amount > 0 && (
          <div className={styles.amount}>
            ₹{amount.toLocaleString()}
          </div>
        )}
      </div>

      {!showPaymentOptions ? (
        <div className={styles.amountInput}>
          <NumPad
            value={inputAmount}
            onChange={setInputAmount}
            title="Enter Amount"
            showDecimal={true}
            onEnter={handleAmountEnter}
            maxLength={10}
          />
        </div>
      ) : (
        <div className={styles.optionsGrid}>
          {paymentOptions.map(option => (
            <button
              key={option.id}
              className={styles.optionCard}
              onClick={() => handleOptionSelect(option.id)}
              style={{ borderColor: option.color }}
            >
              <span className={styles.optionIcon}>{option.icon}</span>
              <h3 className={styles.optionName}>{option.name}</h3>
              <p className={styles.optionDescription}>{option.description}</p>
              <div 
                className={styles.optionArrow}
                style={{ backgroundColor: option.color }}
              >
                →
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentOptionsScreen; 