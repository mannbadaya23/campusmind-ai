import React from 'react';
import Icon from '../../../components/AppIcon';

const BurnoutAlertWidget = ({ riskLevel, recommendations }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'low':
        return {
          bg: 'from-success/10 to-success/5',
          text: 'text-success',
          icon: 'CheckCircle',
        };
      case 'medium':
        return {
          bg: 'from-warning/10 to-warning/5',
          text: 'text-warning',
          icon: 'AlertTriangle',
        };
      case 'high':
        return {
          bg: 'from-error/10 to-error/5',
          text: 'text-error',
          icon: 'AlertCircle',
        };
      default:
        return {
          bg: 'from-muted/10 to-muted/5',
          text: 'text-muted-foreground',
          icon: 'Info',
        };
    }
  };

  const riskConfig = getRiskColor(riskLevel);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">Burnout Risk</h3>
        <Icon name="Heart" size={20} className="text-muted-foreground" />
      </div>
      <div className={`bg-gradient-to-r ${riskConfig?.bg} rounded-lg p-4 md:p-6 mb-4 md:mb-6`}>
        <div className="flex items-center gap-3 mb-3 md:mb-4">
          <Icon name={riskConfig?.icon} size={32} className={`${riskConfig?.text} md:w-10 md:h-10`} />
          <div>
            <p className={`text-xl md:text-2xl font-heading font-semibold ${riskConfig?.text} capitalize`}>
              {riskLevel} Risk
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">Based on recent activity patterns</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 md:space-y-3">
        <p className="text-sm md:text-base font-medium text-foreground">Recommendations:</p>
        {recommendations?.map((rec, index) => (
          <div key={index} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
            <Icon name="Check" size={16} className="text-primary flex-shrink-0 mt-0.5" />
            <span>{rec}</span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border mt-4 md:mt-6">
        <button className="w-full flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base font-medium text-primary hover:text-primary/80 transition-smooth">
          <Icon name="TrendingUp" size={18} />
          View Detailed Analysis
        </button>
      </div>
    </div>
  );
};

export default BurnoutAlertWidget;