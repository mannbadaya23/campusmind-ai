import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertNotification = ({ alerts, onDismiss, onViewResources }) => {
  if (!alerts || alerts?.length === 0) return null;

  return (
    <div className="space-y-3 md:space-y-4">
      {alerts?.map((alert) => (
        <div
          key={alert?.id}
          className={`border-2 rounded-xl p-4 md:p-6 shadow-soft-md ${
            alert?.severity === 'high' ?'bg-destructive/10 border-destructive/30'
              : alert?.severity === 'medium' ?'bg-warning/10 border-warning/30' :'bg-primary/10 border-primary/30'
          }`}
        >
          <div className="flex items-start gap-3 md:gap-4">
            <Icon
              name={alert?.icon}
              size={24}
              className={`flex-shrink-0 mt-1 ${
                alert?.severity === 'high' ?'text-destructive'
                  : alert?.severity === 'medium' ?'text-warning' :'text-primary'
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="text-base md:text-lg font-heading font-semibold text-foreground">
                  {alert?.title}
                </h4>
                <button
                  onClick={() => onDismiss(alert?.id)}
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label="Dismiss alert"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              <p className="text-sm md:text-base text-foreground mb-3 md:mb-4">
                {alert?.message}
              </p>
              <div className="bg-card/50 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                <div className="text-xs md:text-sm font-medium text-foreground mb-2">
                  Suggested Actions:
                </div>
                <ul className="space-y-2">
                  {alert?.suggestions?.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-muted-foreground">
                      <Icon name="CheckCircle" size={16} className="flex-shrink-0 mt-0.5 text-success" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <Button
                  variant="default"
                  size="sm"
                  iconName="BookOpen"
                  iconPosition="left"
                  onClick={() => onViewResources(alert?.resourceType)}
                  className="sm:flex-1"
                >
                  View Resources
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MessageSquare"
                  iconPosition="left"
                  className="sm:flex-1"
                >
                  Talk to AI Coach
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertNotification;