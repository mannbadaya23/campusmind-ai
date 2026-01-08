import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendationPanel = ({ recommendations, onApplyRecommendation }) => {
  const getRecommendationIcon = (type) => {
    const icons = {
      schedule: 'Calendar',
      break: 'Coffee',
      priority: 'AlertCircle',
      balance: 'Scale',
      focus: 'Target'
    };
    return icons?.[type] || 'Lightbulb';
  };

  const getRecommendationColor = (type) => {
    const colors = {
      schedule: 'from-primary/10 to-secondary/10 border-primary/20',
      break: 'from-accent/10 to-warning/10 border-accent/20',
      priority: 'from-error/10 to-warning/10 border-error/20',
      balance: 'from-success/10 to-primary/10 border-success/20',
      focus: 'from-secondary/10 to-primary/10 border-secondary/20'
    };
    return colors?.[type] || 'from-muted to-muted border-border';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6">
      <div className="flex items-center gap-3 mb-4 md:mb-5">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-secondary rounded-lg">
          <Icon name="Sparkles" size={20} color="white" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground">AI Recommendations</h2>
          <p className="text-xs md:text-sm text-muted-foreground">Personalized study insights</p>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {recommendations?.map((rec) => (
          <div
            key={rec?.id}
            className={`bg-gradient-to-br ${getRecommendationColor(rec?.type)} border rounded-lg p-4 transition-smooth hover:shadow-soft-md`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-card rounded-lg flex items-center justify-center">
                <Icon name={getRecommendationIcon(rec?.type)} size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
                  {rec?.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-3">
                  {rec?.description}
                </p>
              </div>
            </div>

            {rec?.details && (
              <div className="bg-card/50 rounded-md p-3 mb-3 space-y-2">
                {rec?.details?.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs md:text-sm">
                    <Icon name="ChevronRight" size={14} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{detail}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <Icon name="TrendingUp" size={12} />
                {rec?.impact} impact
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onApplyRecommendation(rec)}
                iconName="Check"
                iconPosition="left"
              >
                Apply
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-5 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">AI Confidence</span>
          <span className="font-medium text-success">92%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div className="bg-gradient-to-r from-success to-primary h-2 rounded-full" style={{ width: '92%' }} />
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationPanel;