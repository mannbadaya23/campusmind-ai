import React from 'react';
import Icon from '../../../components/AppIcon';

const BurnoutRiskIndicator = ({ riskLevel, factors }) => {
  const getRiskColor = (level) => {
    if (level === 'low') return { bg: 'bg-success/10', border: 'border-success/20', text: 'text-success', icon: 'CheckCircle' };
    if (level === 'moderate') return { bg: 'bg-warning/10', border: 'border-warning/20', text: 'text-warning', icon: 'AlertCircle' };
    return { bg: 'bg-destructive/10', border: 'border-destructive/20', text: 'text-destructive', icon: 'AlertTriangle' };
  };

  const riskColors = getRiskColor(riskLevel);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 shadow-soft-md">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <Icon name="Activity" size={24} className="text-primary" />
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Burnout Risk Assessment
        </h3>
      </div>
      <div className={`${riskColors?.bg} border-2 ${riskColors?.border} rounded-xl p-4 md:p-6 mb-4 md:mb-6`}>
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-3">
            <Icon name={riskColors?.icon} size={32} className={riskColors?.text} />
            <div>
              <div className="text-xs md:text-sm text-muted-foreground">Current Risk Level</div>
              <div className={`text-xl md:text-2xl lg:text-3xl font-heading font-bold ${riskColors?.text} capitalize`}>
                {riskLevel}
              </div>
            </div>
          </div>
          <div className={`text-3xl md:text-4xl lg:text-5xl font-heading font-bold ${riskColors?.text}`}>
            {riskLevel === 'low' ? '32%' : riskLevel === 'moderate' ? '58%' : '84%'}
          </div>
        </div>
        
        <div className="w-full bg-background rounded-full h-3 md:h-4 overflow-hidden">
          <div 
            className={`h-full ${riskColors?.text?.replace('text-', 'bg-')} transition-smooth`}
            style={{ width: riskLevel === 'low' ? '32%' : riskLevel === 'moderate' ? '58%' : '84%' }}
          />
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        <h4 className="text-sm md:text-base font-medium text-foreground">Contributing Factors:</h4>
        {factors?.map((factor, index) => (
          <div key={index} className="flex items-start gap-3 p-3 md:p-4 bg-muted rounded-lg">
            <Icon 
              name={factor?.icon} 
              size={20} 
              className={`flex-shrink-0 mt-0.5 ${factor?.severity === 'high' ? 'text-destructive' : factor?.severity === 'medium' ? 'text-warning' : 'text-muted-foreground'}`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm md:text-base font-medium text-foreground">{factor?.name}</span>
                <span className={`text-xs md:text-sm font-medium px-2 py-1 rounded ${
                  factor?.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                  factor?.severity === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                }`}>
                  {factor?.severity}
                </span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">{factor?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BurnoutRiskIndicator;