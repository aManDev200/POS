import React, { useState, useEffect } from 'react';
import { brandEmiService } from '../../services/brandEmiService';
import styles from './BrandEmiSelector.module.css';

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

interface Bank {
  id: string;
  name: string;
  logo: string;
}

interface Offer {
  id: string;
  name: string;
  description: string;
  processingFee: string;
  minAmount: string;
  maxAmount: string;
  tenures: number[];
  interestRate: string;
}

interface BrandEmiSelectorProps {
  amount: number;
  onComplete: (offer: Offer, tenure: number) => void;
}

const BrandEmiSelector: React.FC<BrandEmiSelectorProps> = ({ amount, onComplete }) => {
  const [step, setStep] = useState(1);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedTenure, setSelectedTenure] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [brandsData, banksData] = await Promise.all([
          brandEmiService.getBrands(),
          brandEmiService.getBanks()
        ]);
        setBrands(brandsData);
        setBanks(banksData);
      } catch (err) {
        setError('Failed to load initial data');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

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

  // Load offers when product and bank are selected
  useEffect(() => {
    const loadOffers = async () => {
      if (selectedProduct && selectedBank) {
        try {
          setLoading(true);
          const offersData = await brandEmiService.getOffers({
            brandId: selectedBrand?.id,
            productId: selectedProduct.id,
            bankId: selectedBank.id
          });
          setOffers(offersData);
        } catch (err) {
          setError('Failed to load offers');
        } finally {
          setLoading(false);
        }
      }
    };

    loadOffers();
  }, [selectedProduct, selectedBank, selectedBrand]);

  const handleBrandSelect = (brand: Brand) => {
    setSelectedBrand(brand);
    setSelectedProduct(null);
    setSelectedBank(null);
    setSelectedOffer(null);
    setSelectedTenure(null);
    setStep(2);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setSelectedBank(null);
    setSelectedOffer(null);
    setSelectedTenure(null);
    setStep(3);
  };

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setSelectedOffer(null);
    setSelectedTenure(null);
    setStep(4);
  };

  const handleOfferSelect = (offer: Offer) => {
    setSelectedOffer(offer);
    setSelectedTenure(null);
    setStep(5);
  };

  const handleTenureSelect = (tenure: number) => {
    setSelectedTenure(tenure);
    if (selectedOffer) {
      onComplete(selectedOffer, tenure);
    }
  };

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

  const renderOfferSelection = () => (
    <div className={styles.selectionContainer}>
      <h3>Select Offer</h3>
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
              <span>Processing Fee: {offer.processingFee}</span>
              <span>Min Amount: {offer.minAmount}</span>
              <span>Max Amount: {offer.maxAmount}</span>
            </div>
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
          style={{ width: `${(step / 5) * 100}%` }}
        ></div>
      </div>
      
      <div className={styles.stepIndicator}>
        Step {step} of 5
      </div>

      {step === 1 && renderBrandSelection()}
      {step === 2 && renderProductSelection()}
      {step === 3 && renderBankSelection()}
      {step === 4 && renderOfferSelection()}
      {step === 5 && renderTenureSelection()}
    </div>
  );
};

export default BrandEmiSelector; 