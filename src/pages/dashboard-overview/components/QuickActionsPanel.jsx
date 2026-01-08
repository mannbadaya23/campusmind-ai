import React from 'react';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      label: 'Log Stress',
      icon: 'Activity',
      color: 'from-primary/10 to-primary/5 text-primary hover:from-primary/20 hover:to-primary/10',
      onClick: () => navigate('/stress-and-burnout-tracking'),
    },
    {
      id: 2,
      label: 'Add Task',
      icon: 'Plus',
      color: 'from-secondary/10 to-secondary/5 text-secondary hover:from-secondary/20 hover:to-secondary/10',
      onClick: () => navigate('/study-planner'),
    },
    {
      id: 3,
      label: 'AI Coach',
      icon: 'MessageSquare',
      color: 'from-accent/10 to-accent/5 text-accent hover:from-accent/20 hover:to-accent/10',
      onClick: () => console.log('AI Coach clicked'),
    },
    {
      id: 4,
      label: 'Resources',
      icon: 'BookOpen',
      color: 'from-success/10 to-success/5 text-success hover:from-success/20 hover:to-success/10',
      onClick: () => console.log('Resources clicked'),
    },
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4 md:mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={action?.onClick}
            className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-lg bg-gradient-to-br ${action?.color} transition-smooth`}
          >
            <Icon name={action?.icon} size={24} className="mb-2 md:mb-3 md:w-7 md:h-7" />
            <span className="text-xs md:text-sm font-medium text-center">{action?.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;