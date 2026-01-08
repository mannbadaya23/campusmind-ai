import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSteps = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'Account', icon: 'User' },
    { number: 2, label: 'Profile', icon: 'GraduationCap' },
    { number: 3, label: 'Complete', icon: 'CheckCircle' }
  ];

  return (
    <div className="w-full mb-6 md:mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-smooth"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {steps?.map((step) => (
          <div key={step?.number} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-smooth ${
                step?.number < currentStep
                  ? 'bg-gradient-to-br from-primary to-secondary text-white'
                  : step?.number === currentStep
                  ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-soft-lg'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <Icon
                name={step?.number < currentStep ? 'Check' : step?.icon}
                size={20}
              />
            </div>
            <span
              className={`mt-2 text-xs md:text-sm font-medium transition-smooth ${
                step?.number <= currentStep
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {step?.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;