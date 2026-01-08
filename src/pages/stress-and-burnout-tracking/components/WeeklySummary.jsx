import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeeklySummary = ({ summary, recommendations }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 shadow-soft-md">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <Icon name="Calendar" size={24} className="text-primary" />
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Weekly Summary
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Activity" size={24} className="text-primary" />
            <Icon name="TrendingDown" size={20} className="text-success" />
          </div>
          <div className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
            {summary?.avgStress}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">Average Stress</div>
          <div className="text-xs text-success mt-1">↓ 15% from last week</div>
        </div>

        <div className="bg-gradient-to-br from-success/10 to-accent/10 border border-success/20 rounded-lg p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Smile" size={24} className="text-success" />
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
          <div className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
            {summary?.goodDays}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">Good Days</div>
          <div className="text-xs text-success mt-1">↑ 2 more than last week</div>
        </div>

        <div className="bg-gradient-to-br from-warning/10 to-error/10 border border-warning/20 rounded-lg p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <Icon name="AlertTriangle" size={24} className="text-warning" />
            <Icon name="TrendingDown" size={20} className="text-success" />
          </div>
          <div className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
            {summary?.highStressDays}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground">High Stress Days</div>
          <div className="text-xs text-success mt-1">↓ 1 less than last week</div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-secondary/5 to-primary/5 border border-secondary/20 rounded-lg p-4 md:p-6 mb-4 md:mb-6">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Icon name="Sparkles" size={20} className="text-secondary" />
          <h4 className="text-base md:text-lg font-heading font-semibold text-foreground">
            AI Recommendations
          </h4>
        </div>
        <div className="space-y-3">
          {recommendations?.map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-card rounded-lg">
              <Icon name={rec?.icon} size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base font-medium text-foreground mb-1">
                  {rec?.title}
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {rec?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          iconName="Download"
          iconPosition="left"
          fullWidth
          className="sm:flex-1"
        >
          Export Report
        </Button>
        <Button
          variant="outline"
          iconName="Share2"
          iconPosition="left"
          fullWidth
          className="sm:flex-1"
        >
          Share with Counselor
        </Button>
      </div>
    </div>
  );
};

export default WeeklySummary;