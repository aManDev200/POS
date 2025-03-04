import React from 'react';
import styles from './POSFrame.module.css';

interface POSFrameProps {
  children: React.ReactNode;
}

const POSFrame: React.FC<POSFrameProps> = ({ children }) => {
  return (
    <div className={styles.posFrameContainer}>
      <div className={styles.posFrame}>
        {/* POS Machine Header */}
        <div className={styles.posHeader}>
          <div className={styles.camera}></div>
          <div className={styles.speaker}></div>
        </div>
        
        {/* Screen Content */}
        <div className={styles.screen}>
          {children}
        </div>
        
        {/* Card Slot */}
        <div className={styles.cardSlot}></div>
        
        {/* Receipt Printer */}
        <div className={styles.receiptSlot}></div>
        
        {/* POS Machine Footer */}
        <div className={styles.posFooter}>
          <div className={styles.homeButton}></div>
        </div>
      </div>
    </div>
  );
};

export default POSFrame;