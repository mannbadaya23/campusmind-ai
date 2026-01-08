import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: '256-bit SSL Encryption'
    },
    {
      icon: 'Lock',
      text: 'Secure Authentication'
    },
    {
      icon: 'Eye',
      text: 'Privacy Protected'
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
      {securityFeatures?.map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <Icon name={feature?.icon} size={16} className="text-primary" />
          <span className="text-xs md:text-sm font-medium">{feature?.text}</span>
        </div>
      ))}
    </div>
  );
};

export default SecurityBadges;