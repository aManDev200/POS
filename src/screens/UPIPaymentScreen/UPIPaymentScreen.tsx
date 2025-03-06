import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './UPIPaymentScreen.module.css';

const UPIPaymentScreen: React.FC = () => {
  const { setCurrentScreen, amount } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    setCurrentScreen('paymentOptions');
  };

  const handlePaymentComplete = async () => {
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
  };

  return (
    <div className={styles.upiScreen}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ←
        </button>
        <h2>UPI Payment</h2>
        <div className={styles.amount}>
          ₹{amount.toLocaleString()}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.qrContainer}>
          <div className={styles.qrCode}>
            {/* Placeholder QR code - will be replaced with actual QR code */}
            <div className={styles.qrPlaceholder}>
              <span className={styles.qrIcon}>📱</span>
            </div>
          </div>
          <p className={styles.qrInstructions}>
            Scan this QR code with any UPI app to pay
          </p>
        </div>

        <div className={styles.instructions}>
          <h3>How to pay:</h3>
          <ol>
            <li>Open any UPI app on your phone</li>
            <li>Tap on "Scan QR Code"</li>
            <li>Point your camera at the QR code</li>
            <li>Enter your UPI PIN to complete payment</li>
          </ol>
        </div>

        <div className={styles.supportedApps}>
          <h3>Supported UPI Apps</h3>
          <div className={styles.appIcons}>
            <span>Google Pay</span>
            <span>PhonePe</span>
            <span>Paytm</span>
            <span>BHIM</span>
          </div>
        </div>

        {isProcessing && (
          <div className={styles.processingOverlay}>
            <div className={styles.spinner}></div>
            <p>Processing payment...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UPIPaymentScreen; 