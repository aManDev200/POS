import React from 'react';
import styles from './NumPad.module.css';

interface NumPadProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  title: string;
  showDecimal?: boolean;
  onEnter?: () => void;
  onBackspace?: () => void;
  onClear?: () => void;
}

const NumPad: React.FC<NumPadProps> = ({
  value,
  onChange,
  maxLength = 10,
  title,
  showDecimal = false,
  onEnter,
  onBackspace,
  onClear
}) => {
  const handleNumberClick = (num: string) => {
    if (value.length < maxLength) {
      onChange(value + num);
    }
  };

  const handleDecimalClick = () => {
    if (!value.includes('.') && value.length < maxLength) {
      onChange(value + '.');
    }
  };

  const handleBackspace = () => {
    if (onBackspace) {
      onBackspace();
    } else {
      onChange(value.slice(0, -1));
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      onChange('');
    }
  };

  const handleEnter = () => {
    if (onEnter) {
      onEnter();
    }
  };

  return (
    <div className={styles.numPadContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.display}>{value || '0'}</div>
      <div className={styles.numPad}>
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        {showDecimal ? (
          <button onClick={handleDecimalClick}>.</button>
        ) : (
          <button onClick={handleClear}>C</button>
        )}
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={handleBackspace}>←</button>
        <button onClick={handleEnter} className={styles.enterButton}>
          Enter
        </button>
      </div>
    </div>
  );
};

export default NumPad;