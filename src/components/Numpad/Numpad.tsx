import React from 'react';
import styles from './Numpad.module.css';

interface NumpadProps {
  onNumberClick: (num: string) => void;
  onClear: () => void;
  onEnter: () => void;
  showDot?: boolean;
}

const Numpad: React.FC<NumpadProps> = ({
  onNumberClick,
  onClear,
  onEnter,
  showDot = true,
}) => {
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', showDot ? '.' : '', '0', '⌫'];

  return (
    <div className={styles.numpad}>
      {numbers.map((num, index) => (
        <button
          key={index}
          className={`${styles.numpadButton} ${num === '⌫' ? styles.clear : ''}`}
          onClick={() => {
            if (num === '⌫') {
              onClear();
            } else {
              onNumberClick(num);
            }
          }}
        >
          {num}
        </button>
      ))}
      <button
        className={`${styles.numpadButton} ${styles.enter}`}
        onClick={onEnter}
      >
        ENTER
      </button>
    </div>
  );
};

export default Numpad;