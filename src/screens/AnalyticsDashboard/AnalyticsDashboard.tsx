import React from 'react';
import { useAppContext } from '../../context/AppContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import styles from './AnalyticsDashboard.module.css';

const salesData = [
  { date: 'Mon', amount: 25000 },
  { date: 'Tue', amount: 35000 },
  { date: 'Wed', amount: 45000 },
  { date: 'Thu', amount: 30000 },
  { date: 'Fri', amount: 50000 },
  { date: 'Sat', amount: 60000 },
  { date: 'Sun', amount: 40000 },
];

const brandData = [
  { name: 'Samsung', value: 35 },
  { name: 'Apple', value: 30 },
  { name: 'Sony', value: 20 },
  { name: 'LG', value: 15 },
];

const emiData = [
  { tenure: '3 Months', count: 45 },
  { tenure: '6 Months', count: 65 },
  { tenure: '9 Months', count: 35 },
  { tenure: '12 Months', count: 50 },
];

const COLORS = ['#ff6b00', '#ff9248', '#ffb37e', '#ffd4b3'];

const AnalyticsDashboard: React.FC = () => {
  const { setCurrentScreen, user } = useAppContext();

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className={styles.dashboardScreen}>
      <div className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={() => setCurrentScreen('dashboard')}
        >
          ← Back
        </button>
        <h2>Analytics Dashboard</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Today&apos;s Sales</span>
            <span className={styles.statValue}>₹60,000</span>
            <span className={styles.statChange + ' ' + styles.positive}>+12.5%</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Total EMI Sales</span>
            <span className={styles.statValue}>₹2,85,000</span>
            <span className={styles.statChange + ' ' + styles.positive}>+8.3%</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Transactions</span>
            <span className={styles.statValue}>195</span>
            <span className={styles.statChange + ' ' + styles.positive}>+5.2%</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Avg. Transaction</span>
            <span className={styles.statValue}>₹15,000</span>
            <span className={styles.statChange + ' ' + styles.negative}>-2.1%</span>
          </div>
        </div>

        <div className={styles.chartGrid}>
          <div className={styles.chartCard}>
            <h3>Weekly Sales Trend</h3>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatCurrency} />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#ff6b00" 
                    fill="#fff3e6" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.chartRow}>
            <div className={styles.chartCard}>
              <h3>EMI Tenures</h3>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={emiData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tenure" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#ff6b00" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={styles.chartCard}>
              <h3>Sales by Brand</h3>
              <div className={styles.chartContainer}>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={brandData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {brandData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.merchantInfo}>
          <span>{user?.name}</span>
          <span>|</span>
          <span>ID: {user?.merchantId}</span>
        </div>
        <img 
          src="/images/Fiserv_logo.svg.png" 
          alt="Fiserv" 
          className={styles.fiservLogo}
        />
        <p>Powered by Fiserv</p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 