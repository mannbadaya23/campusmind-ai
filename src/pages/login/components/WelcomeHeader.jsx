import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      <div className="flex justify-center">
        <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl">
          <Icon name="Brain" size={32} color="var(--color-primary)" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
          Welcome Back
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
          Sign in to continue your wellness journey and access your personalized academic dashboard
        </p>
      </div>
    </div>
  );
};

export default WelcomeHeader;