export interface Merchant {
    id: string;
    name: string;
    terminalId: string;
    deviceName: string;
  }
  
  export interface Brand {
    id: number;
    name: string;
    logo: string;
  }
  
  export interface Service {
    id: number;
    name: string;
    icon: string;
  }
  
  export interface POSFrameProps {
    children: React.ReactNode;
  }
  
  export interface NumpadProps {
    onValueChange: (value: string) => void;
    value: string;
    onConfirm: () => void;
  }
  
  export interface ActionButtonProps {
    label: string;
    onClick: () => void;
    variant?: string;
  }
  
  export interface ServiceCardProps {
    service: Service;
    onClick: () => void;
  }
  
  export interface AppContextType {
    currentScreen: string;
    setCurrentScreen: (screen: string) => void;
    merchant: Merchant | null;
    setMerchant: (merchant: Merchant | null) => void;
    saleAmount: string;
    setSaleAmount: (amount: string) => void;
  }