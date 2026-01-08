import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      id: 1,
      label: 'Total Tasks',
      value: stats?.totalTasks,
      icon: 'ListTodo',
      color: 'from-primary to-secondary',
      change: '+12%',
      changeType: 'positive'
    },
    {
      id: 2,
      label: 'Completed',
      value: stats?.completedTasks,
      icon: 'CheckCircle2',
      color: 'from-success to-primary',
      change: '+8%',
      changeType: 'positive'
    },
    {
      id: 3,
      label: 'In Progress',
      value: stats?.inProgressTasks,
      icon: 'Clock',
      color: 'from-warning to-accent',
      change: '-3%',
      changeType: 'negative'
    },
    {
      id: 4,
      label: 'Study Hours',
      value: `${stats?.totalHours}h`,
      icon: 'Timer',
      color: 'from-secondary to-primary',
      change: '+15%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
      {statCards?.map((stat) => (
        <div
          key={stat?.id}
          className="bg-card border border-border rounded-lg p-4 md:p-5 transition-smooth hover:shadow-soft-md"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${stat?.color} rounded-lg`}>
              <Icon name={stat?.icon} size={20} color="white" />
            </div>
            <span className={`text-xs md:text-sm font-medium px-2 py-1 rounded ${
              stat?.changeType === 'positive' ?'bg-success/10 text-success' :'bg-error/10 text-error'
            }`}>
              {stat?.change}
            </span>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              {stat?.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;