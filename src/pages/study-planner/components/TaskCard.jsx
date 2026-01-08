import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const priorityColors = {
    high: 'bg-error/10 text-error border-error/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    low: 'bg-success/10 text-success border-success/20'
  };

  const priorityIcons = {
    high: 'AlertCircle',
    medium: 'AlertTriangle',
    low: 'CheckCircle'
  };

  const getTimeRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', color: 'text-error' };
    if (diffDays === 0) return { text: 'Due today', color: 'text-warning' };
    if (diffDays === 1) return { text: 'Due tomorrow', color: 'text-warning' };
    return { text: `${diffDays} days left`, color: 'text-muted-foreground' };
  };

  const timeRemaining = getTimeRemaining(task?.dueDate);

  return (
    <div className={`bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6 transition-smooth hover:shadow-soft-md ${task?.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <button
            onClick={() => onToggleComplete(task?.id)}
            className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded border-2 transition-smooth flex items-center justify-center ${
              task?.completed
                ? 'bg-primary border-primary' :'border-border hover:border-primary'
            }`}
            aria-label={task?.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {task?.completed && <Icon name="Check" size={14} color="white" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-base md:text-lg font-semibold text-foreground mb-1 ${task?.completed ? 'line-through' : ''}`}>
              {task?.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {task?.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${priorityColors?.[task?.priority]}`}>
                <Icon name={priorityIcons?.[task?.priority]} size={14} />
                {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-muted-foreground">
                <Icon name="BookOpen" size={14} />
                {task?.course}
              </span>
              <span className={`inline-flex items-center gap-1 ${timeRemaining?.color}`}>
                <Icon name="Clock" size={14} />
                {timeRemaining?.text}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(task)}
            iconName="Edit2"
            iconSize={16}
            className="w-8 h-8"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task?.id)}
            iconName="Trash2"
            iconSize={16}
            className="w-8 h-8 text-error hover:text-error"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs md:text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{task?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-smooth"
            style={{ width: `${task?.progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Icon name="Timer" size={12} />
            Est. {task?.estimatedTime}h
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="Calendar" size={12} />
            Due: {new Date(task.dueDate)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;