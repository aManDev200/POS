import React, { useState, useEffect } from 'react';
import { brandEmiService, OfferResponse } from '../../services/brandEmiService';
import styles from './BrandEmiSelector.module.css';

interface Bank {
  id: string;
  name: string;
  logo: string;
}

interface PaymentMethod {
  id: string;
  type: 'CARD' | 'UPI' | 'CONTACTLESS';
  name: string;
  icon: string;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
}

interface Offer extends OfferResponse {}

interface BrandEmiSelectorProps {
  amount: number;
  onComplete: (offer: Offer, tenure: number) => void;
}

const BrandEmiSelector: React.FC<BrandEmiSelectorProps> = ({ amount, onComplete }) => {
  const [step, setStep] = useState(1);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedTenure, setSelectedTenure] = useState<number | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [banksData, paymentMethodsData] = await Promise.all([
          brandEmiService.getBanks(),
          brandEmiService.getPaymentMethods()
        ]);
        setBanks(banksData);
        setPaymentMethods(paymentMethodsData);
      } catch (err) {
        setError('Failed to load initial data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Load brands when payment method is selected
  useEffect(() => {
    const loadBrands = async () => {
      if (selectedPaymentMethod && selectedBank) {
        try {
          setLoading(true);
          const brandsData = await brandEmiService.getBrandsByPaymentMethod(
            selectedBank.id,
            selectedPaymentMethod.id
          );
          setBrands(brandsData);
        } catch (err) {
          setError('Failed to load brands');
        } finally {
          setLoading(false);
        }
      }
    };

    loadBrands();
  }, [selectedPaymentMethod, selectedBank]);

  // Load products when brand is selected
  useEffect(() => {
    const loadProducts = async () => {
      if (selectedBrand) {
        try {
          setLoading(true);
          const productsData = await brandEmiService.getProducts(selectedBrand.id);
          setProducts(productsData);
        } catch (err) {
          setError('Failed to load products');
        } finally {
          setLoading(false);
        }
      }
    };

    loadProducts();
  }, [selectedBrand]);

  // Check offer eligibility when product is selected
  useEffect(() => {
    const checkOfferEligibility = async () => {
      if (selectedProduct && selectedBank && selectedPaymentMethod) {
        try {
          setLoading(true);
          const offersData = await brandEmiService.checkOfferEligibility({
            bankId: selectedBank.id,
            paymentMethodId: selectedPaymentMethod.id,
            brandId: selectedBrand?.id,
            productId: selectedProduct.id,
            amount
          });
          setOffers(offersData);
        } catch (err) {
          setError('Failed to check offer eligibility');
        } finally {
          setLoading(false);
        }
      }
    };

    checkOfferEligibility();
  }, [selectedProduct, selectedBank, selectedPaymentMethod, selectedBrand, amount]);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setSelectedPaymentMethod(null);
    setSelectedBrand(null);
    setSelectedProduct(null);
    setSelectedOffer(null);
    setSelectedTenure(null);
    setStep(2);
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setSelectedBrand(null);
    setSelectedProduct(null);
    setSelectedOffer(null);
    setSelectedTenure(null);
    setStep(3);
  };

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedProduct(null);
    setSelectedOffer(null);
    setSelectedTenure(null);
    setStep(4);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedOffer(null);
    setSelectedTenure(null);
    setStep(5);
  };

  const handleOfferSelect = (offer: Offer) => {
    setSelectedOffer(offer);
    setSelectedTenure(null);
    setStep(6);
  };

  const handleTenureSelect = (tenure: number) => {
    setSelectedTenure(tenure);
    if (selectedOffer) {
      onComplete(selectedOffer, tenure);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderBankSelection = () => (
    <div className={styles.selectionContainer}>
      <h3>Select Bank</h3>
      <div className={styles.optionsList}>
        {banks.map(bank => (
          <div
            key={bank.id}
            className={`${styles.optionItem} ${selectedBank?.id === bank.id ? styles.selected : ''}`}
            onClick={() => handleBankSelect(bank)}
          >
            <span className={styles.optionName}>{bank.name}</span>
            <img src={bank.logo} alt={bank.name} className={styles.optionLogo} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentMethodSelection = () => (
    <div className={styles.selectionContainer}>
      <h3>Select Payment Method</h3>
      <div className={styles.optionsList}>
        {paymentMethods.map(method => (
          <div
            key={method.id}
            className={`${styles.optionItem} ${selectedPaymentMethod?.id === method.id ? styles.selected : ''}`}
            onClick={() => handlePaymentMethodSelect(method)}
          >
            <span className={styles.optionName}>{method.name}</span>
            <img src={method.icon} alt={method.name} className={styles.optionLogo} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderBrandSelection = () => (
    <div className={styles.selectionContainer}>
      <h3>Select Brand</h3>
      <div className={styles.optionsList}>
        {brands.map(brand => (
          <div
            key={brand.id}
            className={`${styles.optionItem} ${selectedBrand?.id === brand.id ? styles.selected : ''}`}
            onClick={() => handleBrandSelect(brand)}
          >
            <span className={styles.optionName}>{brand.name}</span>
            <img src={brand.logo} alt={brand.name} className={styles.optionLogo} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderProductSelection = () => (
    <div className={styles.selectionContainer}>
      <h3>Select Product</h3>
      <div className={styles.optionsList}>
        {products.map(product => (
          <div
            key={product.id}
            className={`${styles.optionItem} ${selectedProduct?.id === product.id ? styles.selected : ''}`}
            onClick={() => handleProductSelect(product)}
          >
            <span className={styles.optionName}>{product.name}</span>
            <span className={styles.optionCategory}>{product.category}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOfferSelection = () => (
    <div className={styles.selectionContainer}>
      <h3>Available Offers</h3>
      <div className={styles.optionsList}>
        {offers.map(offer => (
          <div
            key={offer.id}
            className={`${styles.optionItem} ${selectedOffer?.id === offer.id ? styles.selected : ''}`}
            onClick={() => handleOfferSelect(offer)}
          >
            <div className={styles.offerHeader}>
              <span className={styles.offerName}>{offer.name}</span>
              <span className={styles.offerRate}>{offer.interestRate}</span>
            </div>
            <p className={styles.offerDescription}>{offer.description}</p>
            <div className={styles.offerDetails}>
              <div className={styles.offerDetail}>
                <span className={styles.detailLabel}>Processing Fee:</span>
                <span className={styles.detailValue}>{offer.processingFee}</span>
              </div>
              <div className={styles.offerDetail}>
                <span className={styles.detailLabel}>Amount Range:</span>
                <span className={styles.detailValue}>{offer.minAmount} - {offer.maxAmount}</span>
              </div>
              <div className={styles.offerDetail}>
                <span className={styles.detailLabel}>Valid Period:</span>
                <span className={styles.detailValue}>
                  {formatDate(offer.validFrom)} - {formatDate(offer.validTo)}
                </span>
              </div>
            </div>
            {offer.terms.length > 0 && (
              <div className={styles.offerTerms}>
                <h4>Terms & Conditions:</h4>
                <ul>
                  {offer.terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTenureSelection = () => (
    <div className={styles.selectionContainer}>
      <h3>Select Tenure</h3>
      <div className={styles.tenureGrid}>
        {selectedOffer?.tenures.map(tenure => (
          <div
            key={tenure}
            className={`${styles.tenureOption} ${selectedTenure === tenure ? styles.selected : ''}`}
            onClick={() => handleTenureSelect(tenure)}
          >
            <span className={styles.tenureMonths}>{tenure} months</span>
            <span className={styles.tenureEMI}>
              ₹{brandEmiService.calculateEMI(amount, tenure, parseFloat(selectedOffer?.interestRate || '0'))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className={styles.selectorContainer}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${(step / 6) * 100}%` }}
        ></div>
      </div>
      
      <div className={styles.stepIndicator}>
        Step {step} of 6
      </div>

      {step === 1 && renderBankSelection()}
      {step === 2 && renderPaymentMethodSelection()}
      {step === 3 && renderBrandSelection()}
      {step === 4 && renderProductSelection()}
      {step === 5 && renderOfferSelection()}
      {step === 6 && renderTenureSelection()}
    </div>
  );
};

export default BrandEmiSelector; 