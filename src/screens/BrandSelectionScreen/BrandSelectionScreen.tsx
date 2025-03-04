import React from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './BrandSelectionScreen.module.css';

interface Brand {
  id: string;
  name: string;
  logo: string;
  categories: string[];
}

const brands: Brand[] = [
  {
    id: 'samsung',
    name: 'Samsung',
    logo: '/images/samsung-logo.png',
    categories: ['Mobile', 'TV', 'Appliances']
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: '/images/apple-logo.png',
    categories: ['iPhone', 'iPad', 'MacBook']
  },
  {
    id: 'sony',
    name: 'Sony',
    logo: '/images/sony-logo.png',
    categories: ['TV', 'Audio', 'PlayStation']
  },
  {
    id: 'lg',
    name: 'LG',
    logo: '/images/lg-logo.png',
    categories: ['TV', 'Appliances', 'Mobile']
  }
];

const BrandSelectionScreen: React.FC = () => {
  const { setCurrentScreen, setSelectedBrand, user } = useAppContext();

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    setCurrentScreen('sale');
  };

  return (
    <div className={styles.brandScreen}>
      <div className={styles.header}>
        <h2>Select Brand</h2>
        <div className={styles.userInfo}>
          <span>{user?.name}</span>
          <span>|</span>
          <span>ID: {user?.merchantId}</span>
        </div>
      </div>

      <div className={styles.brandGrid}>
        {brands.map((brand) => (
          <button
            key={brand.id}
            className={styles.brandCard}
            onClick={() => handleBrandSelect(brand.id)}
          >
            <div className={styles.brandLogo}>
              <img src={brand.logo} alt={brand.name} />
            </div>
            <div className={styles.brandInfo}>
              <h3>{brand.name}</h3>
              <div className={styles.categories}>
                {brand.categories.map((category, index) => (
                  <span key={index} className={styles.category}>
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandSelectionScreen;
