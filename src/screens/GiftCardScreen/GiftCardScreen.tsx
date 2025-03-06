import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './GiftCardScreen.module.css';

const GiftCardScreen: React.FC = () => {
  const { setCurrentScreen, amount } = useAppContext();
  const [giftCardCode, setGiftCardCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [cardDetails, setCardDetails] = useState<null | { balance: number; expiryDate: string }>(null);

  const handleBack = () => {
    setCurrentScreen('paymentOptions');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGiftCardCode(e.target.value.toUpperCase());
    setError('');
  };

  const handleVerify = async () => {
    if (giftCardCode.trim().length < 8) {
      setError('Please enter a valid gift card code');
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate gift card verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, show card details if code is "GIFT1234"
      if (giftCardCode === 'GIFT1234') {
        setCardDetails({
          balance: 5000,
          expiryDate: '2023-12-31'
        });
        setError('');
      } else {
        setError('Invalid gift card code. Please try again.');
        setCardDetails(null);
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApply = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentScreen('paymentSuccess');
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className={styles.giftCardScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          disabled={isProcessing}
        >
          ←
        </button>
        <h2>Gift Card</h2>
        <div className={styles.amount}>
          ₹{amount.toLocaleString()}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.cardEntryContainer}>
          <div className={styles.giftCardIcon}>🎁</div>
          <h3>Enter Gift Card Code</h3>
          
          <div className={styles.inputGroup}>
            <input
              type="text"
              value={giftCardCode}
              onChange={handleInputChange}
              placeholder="e.g. GIFT1234"
              className={styles.giftCardInput}
              disabled={isProcessing || !!cardDetails}
              maxLength={16}
            />
            <button
              onClick={handleVerify}
              className={styles.verifyButton}
              disabled={isProcessing || !!cardDetails || giftCardCode.length < 4}
            >
              Verify
            </button>
          </div>
          
          {error && <div className={styles.error}>{error}</div>}
          
          {cardDetails && (
            <div className={styles.cardDetails}>
              <div className={styles.cardBalance}>
                <span>Card Balance:</span>
                <strong>₹{cardDetails.balance.toLocaleString()}</strong>
              </div>
              <div className={styles.cardExpiry}>
                <span>Valid Until:</span>
                <strong>{formatDate(cardDetails.expiryDate)}</strong>
              </div>
              
              <button
                onClick={handleApply}
                className={styles.applyButton}
                disabled={isProcessing || cardDetails.balance < amount}
              >
                {cardDetails.balance < amount
                  ? 'Insufficient Balance'
                  : 'Apply & Complete Payment'}
              </button>
              
              {cardDetails.balance < amount && (
                <div className={styles.balanceWarning}>
                  The gift card balance is less than the transaction amount.
                </div>
              )}
            </div>
          )}
        </div>

        <div className={styles.instructions}>
          <h3>How to use your gift card:</h3>
          <ol>
            <li>Enter the 8-16 digit code from your gift card</li>
            <li>Click "Verify" to check card balance</li>
            <li>Apply gift card to complete your payment</li>
          </ol>
          <p className={styles.tip}>
            <strong>Tip:</strong> For this demo, try using the code "GIFT1234"
          </p>
        </div>

        {isProcessing && (
          <div className={styles.processingOverlay}>
            <div className={styles.spinner}></div>
            <p>{cardDetails ? 'Processing payment...' : 'Verifying gift card...'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftCardScreen; 