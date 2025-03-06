// TODO: Replace with actual API endpoints when ready
// const API_BASE_URL = 'https://api.example.com/v1';

// Temporary mock data for development
const mockBrands = [
  { id: '1', name: 'Samsung', logo: '/images/samsung.png' },
  { id: '2', name: 'Apple', logo: '/images/apple.png' },
  { id: '3', name: 'Sony', logo: '/images/sony.png' },
  { id: '4', name: 'LG', logo: '/images/LG.png' },
];

const mockProducts = [
  { id: '1', brandId: '1', name: 'Galaxy S21', category: 'Smartphones' },
  { id: '2', brandId: '1', name: 'Galaxy Tab S7', category: 'Tablets' },
  { id: '3', brandId: '2', name: 'iPhone 13', category: 'Smartphones' },
  { id: '4', brandId: '2', name: 'iPad Pro', category: 'Tablets' },
  { id: '5', brandId: '3', name: 'WH-1000XM4', category: 'Audio' },
  { id: '6', brandId: '4', name: 'OLED C1', category: 'TVs' },
];

const mockBanks = [
  { id: '1', name: 'HDFC Bank', logo: '/images/hdfcbank.png' },
  { id: '2', name: 'ICICI Bank', logo: '/images/icicibank.png' },
  { id: '3', name: 'SBI', logo: '/images/sbibank.png' },
  { id: '4', name: 'Axis Bank', logo: '/images/axisbank.png' },
];

const mockOffers = [
  {
    id: '1',
    bankId: '1',
    brandId: '1',
    productId: '1',
    name: 'Zero Cost EMI',
    description: 'No cost EMI with processing fee',
    processingFee: '₹1,000',
    minAmount: '₹10,000',
    maxAmount: '₹1,00,000',
    tenures: [3, 6, 9, 12, 18, 24],
    interestRate: '0%',
  },
  {
    id: '2',
    bankId: '2',
    brandId: '2',
    productId: '3',
    name: 'Special Festival Offer',
    description: 'Special rates for festival season',
    processingFee: '₹500',
    minAmount: '₹5,000',
    maxAmount: '₹50,000',
    tenures: [3, 6, 9, 12],
    interestRate: '5%',
  },
];

export const brandEmiService = {
  // TODO: Replace with actual API calls
  // async getBrands() {
  //   const response = await fetch(`${API_BASE_URL}/brands`);
  //   return response.json();
  // },

  // Temporary mock implementations
  async getBrands() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBrands;
  },

  async getProducts(brandId: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProducts.filter(product => product.brandId === brandId);
  },

  async getBanks() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBanks;
  },

  async getOffers(filters: {
    brandId?: string;
    productId?: string;
    bankId?: string;
  }) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOffers.filter(offer => {
      if (filters.brandId && offer.brandId !== filters.brandId) return false;
      if (filters.productId && offer.productId !== filters.productId) return false;
      if (filters.bankId && offer.bankId !== filters.bankId) return false;
      return true;
    });
  },

  calculateEMI(amount: number, tenure: number, interestRate: number) {
    const monthlyRate = interestRate / 12 / 100;
    const emi = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  }
}; 