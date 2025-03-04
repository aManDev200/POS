import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { getBrands, calculateEMI, Brand, EMIOffer, EMICalculation } from '../../services/brandService';
import styles from './BrandSelectionScreen.module.css';

const BrandSelectionScreen: React.FC = () => {
  const { setCurrentScreen, amount } = useAppContext();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<EMIOffer | null>(null);
  const [selectedTenure, setSelectedTenure] = useState<number | null>(null);
  const [emiCalculation, setEmiCalculation] = useState<EMICalculation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load brands. Please try again.');
      setLoading(false);
    }
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedOffer(null);
    setSelectedTenure(null);
    setEmiCalculation(null);
  };

  const handleOfferSelect = (offer: EMIOffer) => {
    setSelectedOffer(offer);
    setSelectedTenure(null);
    setEmiCalculation(null);
  };

  const handleTenureSelect = (tenure: number) => {
    setSelectedTenure(tenure);
    if (selectedOffer && amount) {
      const calculation = calculateEMI(
        amount,
        tenure,
        selectedOffer.interestRate,
        selectedOffer.processingFee
      );
      setEmiCalculation(calculation);
    }
  };

  const handleProceed = () => {
    if (emiCalculation) {
      // Here you would typically save the EMI selection and proceed
      setCurrentScreen('payment');
    }
  };

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading brands...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={loadBrands}>Retry</button>
      </div>
    );
  }

  return (
    <div className={styles.brandScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => setCurrentScreen('dashboard')}
        >
          ← Back
        </button>
        <h2>Select Brand EMI</h2>
        <p className={styles.amount}>Amount: {formatCurrency(amount)}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.brandsSection}>
          <h3>Available Brands</h3>
          <div className={styles.brandGrid}>
            {brands.map(brand => (
              <button
                key={brand.id}
                className={`${styles.brandCard} ${selectedBrand?.id === brand.id ? styles.selected : ''}`}
                onClick={() => handleBrandSelect(brand)}
              >
                <img src={brand.logo} alt={brand.name} />
                <span>{brand.name}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedBrand && (
          <div className={styles.offersSection}>
            <h3>Available Offers</h3>
            <div className={styles.offerGrid}>
              {selectedBrand.offers.map(offer => (
                <div
                  key={offer.id}
                  className={`${styles.offerCard} ${selectedOffer?.id === offer.id ? styles.selected : ''}`}
                  onClick={() => handleOfferSelect(offer)}
                >
                  <h4>{offer.title}</h4>
                  <p>{offer.description}</p>
                  <div className={styles.offerDetails}>
                    <span>Min: {formatCurrency(offer.minAmount)}</span>
                    <span>Max: {formatCurrency(offer.maxAmount)}</span>
                    <span>Interest: {offer.interestRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedOffer && (
          <div className={styles.tenureSection}>
            <h3>Select Tenure</h3>
            <div className={styles.tenureGrid}>
              {selectedOffer.tenures.map(tenure => (
                <button
                  key={tenure}
                  className={`${styles.tenureCard} ${selectedTenure === tenure ? styles.selected : ''}`}
                  onClick={() => handleTenureSelect(tenure)}
                >
                  {tenure} Months
                </button>
              ))}
            </div>
          </div>
        )}

        {emiCalculation && (
          <div className={styles.emiDetails}>
            <h3>EMI Details</h3>
            <div className={styles.emiGrid}>
              <div className={styles.emiItem}>
                <span>Monthly EMI</span>
                <strong>{formatCurrency(Math.round(emiCalculation.monthlyEMI))}</strong>
              </div>
              <div className={styles.emiItem}>
                <span>Total Interest</span>
                <strong>{formatCurrency(Math.round(emiCalculation.totalInterest))}</strong>
              </div>
              <div className={styles.emiItem}>
                <span>Processing Fee</span>
                <strong>{formatCurrency(emiCalculation.processingFee)}</strong>
              </div>
              <div className={styles.emiItem}>
                <span>Total Amount</span>
                <strong>{formatCurrency(Math.round(emiCalculation.totalAmount))}</strong>
              </div>
            </div>

            <button 
              className={styles.proceedButton}
              onClick={handleProceed}
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandSelectionScreen;
