
import React from 'react';
import styles from './ServiceCard.module.css';
import { ServiceCardProps } from '../../types';

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  // Function to render the appropriate icon based on the service.icon string
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return '🛡️';
      case 'x-circle':
        return '❌';
      case 'refresh-cw':
        return '🔄';
      case 'more-horizontal':
        return '⋯';
      case 'list':
        return '📋';
      case 'copy':
        return '📑';
      case 'file-text':
        return '📊';
      case 'user':
        return '👤';
      default:
        return '⚙️';
    }
  };

  return (
    <div className={styles.serviceCard} onClick={onClick}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{renderIcon(service.icon)}</span>
      </div>
      <div className={styles.serviceName}>{service.name}</div>
    </div>
  );
};

export default ServiceCard;