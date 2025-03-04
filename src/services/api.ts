import axios from 'axios';
import { Merchant, Brand, Service } from '../types';

const API_URL = 'http://localhost:3001';

export const getMerchantById = async (id: string): Promise<Merchant> => {
  const response = await axios.get(`${API_URL}/merchants?id=${id}`);
  return response.data[0];
};

export const getBrands = async (): Promise<Brand[]> => {
  const response = await axios.get(`${API_URL}/brands`);
  return response.data;
};

export const getServices = async (): Promise<Service[]> => {
  const response = await axios.get(`${API_URL}/services`);
  return response.data;
};