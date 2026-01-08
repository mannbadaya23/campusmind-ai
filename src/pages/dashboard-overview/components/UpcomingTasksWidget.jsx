import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingTasksWidget = ({ tasks }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">Upcoming Tasks</h3>
        <Icon name="CheckSquare" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
        {tasks?.slice(0, 4)?.map((task) => (
          <div
            key={task?.id}
            className="flex items-start gap-3 p-3 md:p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-5 h-5 md:w-6 md:h-6 rounded border-2 border-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-medium text-foreground mb-1 line-clamp-1">{task?.title}</p>
              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={14} />
                  {task?.dueDate}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  {task?.dueTime}
                </span>
              </div>
            </div>
            <span className={`flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task?.priority)}`}>
              {task?.priority}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base font-medium text-primary hover:text-primary/80 transition-smooth">
          <Icon name="Plus" size={18} />
          Add New Task
        </button>
      </div>
    </div>
  );
};

export default UpcomingTasksWidget;