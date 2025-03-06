import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './LoyaltyProgramScreen.module.css';

const LoyaltyProgramScreen: React.FC = () => {
  const { setCurrentScreen, amount } = useAppContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: '',
    dob: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleBack = () => {
    setCurrentScreen('paymentOptions');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms to continue';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    try {
      // Simulate enrollment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentScreen('paymentSuccess');
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.loyaltyScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={handleBack}
          disabled={isProcessing}
        >
          ←
        </button>
        <h2>Loyalty Program</h2>
        <div className={styles.amount}>
          ₹{amount.toLocaleString()}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.programInfo}>
          <h3>Join Our Loyalty Program</h3>
          <p>Earn points with every purchase and enjoy exclusive rewards!</p>
          <ul className={styles.benefits}>
            <li>5% cashback on every transaction</li>
            <li>Special birthday rewards</li>
            <li>Early access to sales</li>
            <li>Exclusive member-only offers</li>
          </ul>
        </div>

        <form className={styles.enrollmentForm} onSubmit={handleSubmit}>
          <h3>Customer Information</h3>
          
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter 10-digit phone number"
              disabled={isProcessing}
              maxLength={10}
            />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              disabled={isProcessing}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              disabled={isProcessing}
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              disabled={isProcessing}
            />
          </div>
          
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              disabled={isProcessing}
            />
            <label htmlFor="acceptTerms">
              I agree to the terms and conditions of the loyalty program
            </label>
          </div>
          {errors.acceptTerms && (
            <span className={styles.error}>{errors.acceptTerms}</span>
          )}
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Enroll & Complete Payment'}
          </button>
        </form>

        {isProcessing && (
          <div className={styles.processingOverlay}>
            <div className={styles.spinner}></div>
            <p>Enrolling in loyalty program...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoyaltyProgramScreen; 