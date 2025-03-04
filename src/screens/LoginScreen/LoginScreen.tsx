// src/screens/LoginScreen/LoginScreen.tsx
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { login, setCurrentUser } from '../../services/authService';
import styles from './LoginScreen.module.css';

const LoginScreen: React.FC = () => {
  const { setCurrentScreen, setUser } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await login({ username, password });
      
      if (response.success && response.user) {
        setCurrentUser(response.user);
        setUser(response.user);
        setCurrentScreen('brand');
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginScreen}>
        <div className={styles.header}>
          <img 
            src="/images/fiserv-logo.png" 
            alt="Fiserv Logo" 
            className={styles.logo}
          />
          <h2>Welcome to Fiserv POS</h2>
          <p className={styles.subtitle}>Login to continue</p>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              disabled={isLoading}
              autoComplete="username"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className={styles.helpText}>
          <p>Default credentials:</p>
          <p>Username: merchant1</p>
          <p>Password: 1234</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;