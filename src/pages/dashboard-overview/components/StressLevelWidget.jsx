import React from 'react';
import Icon from '../../../components/AppIcon';

const StressLevelWidget = ({ currentLevel, weeklyAverage, lastUpdated }) => {
  const getStressColor = (level) => {
    if (level <= 3) return 'text-success';
    if (level <= 6) return 'text-warning';
    return 'text-error';
  };

  const getStressLabel = (level) => {
    if (level <= 3) return 'Low Stress';
    if (level <= 6) return 'Moderate Stress';
    return 'High Stress';
  };

  const stressColor = getStressColor(currentLevel);
  const stressLabel = getStressLabel(currentLevel);

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">Current Stress Level</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>

      <div className="flex flex-col items-center justify-center py-4 md:py-6">
        <div className={`text-5xl md:text-6xl lg:text-7xl font-heading font-bold ${stressColor} mb-2 md:mb-3`}>
          {currentLevel}
        </div>
        <div className={`text-base md:text-lg font-medium ${stressColor} mb-4 md:mb-6`}>
          {stressLabel}
        </div>

        <div className="w-full bg-muted rounded-full h-3 md:h-4 mb-4 md:mb-6 overflow-hidden">
          <div
            className={`h-full rounded-full transition-smooth ${
              currentLevel <= 3 ? 'bg-success' : currentLevel <= 6 ? 'bg-warning' : 'bg-error'
            }`}
            style={{ width: `${(currentLevel / 10) * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-xs md:text-sm text-muted-foreground">
          <span>Weekly Avg: {weeklyAverage}/10</span>
          <span>Updated: {lastUpdated}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base font-medium text-primary hover:text-primary/80 transition-smooth">
          <Icon name="Plus" size={18} />
          Log Stress Entry
        </button>
      </div>
    </div>
  );
};

export default StressLevelWidget;