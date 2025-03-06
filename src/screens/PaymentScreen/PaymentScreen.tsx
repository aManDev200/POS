import React, { useState } from 'react';
import styles from './PaymentScreen.module.css';
import { useAppContext } from '../../context/AppContext';
import { getServices } from '../../services/api';
import { Service } from '../../types';
import ServiceCard from '../../components/ServiceCard/ServiceCard';

interface EMIOption {
  months: number;
  interestRate: number;
  monthlyAmount: number;
  totalAmount: number;
}

const PaymentScreen: React.FC = () => {
  const { amount, selectedBrand, setCurrentScreen } = useAppContext();
  const [selectedEMI, setSelectedEMI] = useState<EMIOption | null>(null);
  const [processing, setProcessing] = useState(false);
  const [services, setServices] = React.useState<Service[]>([]);

  React.useEffect(() => {
    const loadServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Failed to load services:', error);
      }
    };

    loadServices();
  }, []);

  // Calculate EMI options
  const calculateEMIOptions = (amount: number): EMIOption[] => {
    return [3, 6, 9, 12].map(months => {
      const interestRate = months <= 6 ? 13 : 15;
      const monthlyInterest = interestRate / 12 / 100;
      const emi = (amount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) / 
                 (Math.pow(1 + monthlyInterest, months) - 1);
      
      return {
        months,
        interestRate,
        monthlyAmount: Math.ceil(emi),
        totalAmount: Math.ceil(emi * months),
      };
    });
  };

  const emiOptions = calculateEMIOptions(amount);

  const handleEMISelect = (option: EMIOption) => {
    setSelectedEMI(option);
  };

  const handlePayment = async () => {
    if (!selectedEMI) return;
    
    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
    
    // Navigate to success screen (to be implemented)
    setCurrentScreen('success');
  };

  const formatAmount = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleServiceSelect = (serviceId: number) => {
    // Handle service selection
    console.log(`Selected service: ${serviceId}`);
  };

  return (
    <div className={styles.paymentScreen}>
      <div className={styles.header}>
        <button className={styles.backBtn}>←</button>
        <h2>EMI Options</h2>
        <div className={styles.summary}>
          <div className={styles.amount}>Amount: {formatAmount(amount)}</div>
          <div className={styles.brand}>Brand: {selectedBrand}</div>
        </div>
        <button className={styles.closeBtn} onClick={() => setCurrentScreen('sale')}>×</button>
      </div>
      
      <div className={styles.amountDisplay}>
        <label>Enter payment amount</label>
        <div className={styles.amount}>
          {parseFloat(amount).toFixed(2)} <span className={styles.currency}>PLN</span>
        </div>
        <div className={styles.exampleText}>Example text (not mandatory)</div>
      </div>
      
      <div className={styles.paymentButton}>
        Payment
      </div>
      
      <div className={styles.servicesGrid}>
        {services.slice(0, 4).map(service => (
          <ServiceCard 
            key={service.id}
            service={service}
            onClick={() => handleServiceSelect(service.id)}
          />
        ))}
      </div>
      
      <div className={styles.servicesGrid}>
        {services.slice(4).map(service => (
          <ServiceCard 
            key={service.id}
            service={service}
            onClick={() => handleServiceSelect(service.id)}
          />
        ))}
      </div>

      <div className={styles.emiOptions}>
        {emiOptions.map((option, index) => (
          <button
            key={index}
            className={`${styles.emiCard} ${selectedEMI === option ? styles.selected : ''}`}
            onClick={() => handleEMISelect(option)}
          >
            <div className={styles.months}>{option.months} Months</div>
            <div className={styles.rate}>{option.interestRate}% p.a.</div>
            <div className={styles.monthly}>
              <span className={styles.label}>Monthly</span>
              <span className={styles.value}>{formatAmount(option.monthlyAmount)}</span>
            </div>
            <div className={styles.total}>
              <span className={styles.label}>Total</span>
              <span className={styles.value}>{formatAmount(option.totalAmount)}</span>
            </div>
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.backButton}
          onClick={() => setCurrentScreen('brand')}
          disabled={processing}
        >
          ←
        </button>
        <button
          className={styles.payButton}
          onClick={handlePayment}
          disabled={!selectedEMI || processing}
        >
          {processing ? 'Processing...' : 'Proceed to Pay'}
        </button>
      </div>
    </div>
  );
};

export default PaymentScreen;