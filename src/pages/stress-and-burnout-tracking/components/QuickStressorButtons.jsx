import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStressorButtons = ({ onStressorSelect }) => {
  const stressors = [
    { id: 'exam', label: 'Exam', icon: 'BookOpen', color: 'bg-error/10 text-error border-error/20' },
    { id: 'deadline', label: 'Deadline', icon: 'Clock', color: 'bg-warning/10 text-warning border-warning/20' },
    { id: 'social', label: 'Social', icon: 'Users', color: 'bg-secondary/10 text-secondary border-secondary/20' },
    { id: 'financial', label: 'Financial', icon: 'DollarSign', color: 'bg-accent/10 text-accent border-accent/20' },
    { id: 'health', label: 'Health', icon: 'Heart', color: 'bg-destructive/10 text-destructive border-destructive/20' },
    { id: 'family', label: 'Family', icon: 'Home', color: 'bg-primary/10 text-primary border-primary/20' }
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 shadow-soft-md">
      <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground mb-4 md:mb-6">
        Quick Stressor Log
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
        Tap to quickly log what's causing stress right now
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {stressors?.map((stressor) => (
          <button
            key={stressor?.id}
            onClick={() => onStressorSelect(stressor?.id)}
            className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-lg border-2 transition-smooth hover:scale-105 active:scale-95 ${stressor?.color}`}
          >
            <Icon name={stressor?.icon} size={32} className="mb-2 md:mb-3" />
            <span className="text-sm md:text-base font-medium">
              {stressor?.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickStressorButtons;