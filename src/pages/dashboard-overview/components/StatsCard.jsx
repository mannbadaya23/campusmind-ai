import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ icon, label, value, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary/10 to-primary/5 text-primary',
    secondary: 'from-secondary/10 to-secondary/5 text-secondary',
    success: 'from-success/10 to-success/5 text-success',
    warning: 'from-warning/10 to-warning/5 text-warning',
    error: 'from-error/10 to-error/5 text-error',
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft hover:shadow-soft-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${colorClasses?.[color]}`}>
          <Icon name={icon} size={24} className="md:w-7 md:h-7" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs md:text-sm font-medium ${trendColors?.[trend]}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={16} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">{value}</p>
        <p className="text-sm md:text-base text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;