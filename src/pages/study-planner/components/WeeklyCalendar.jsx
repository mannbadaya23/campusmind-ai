import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const WeeklyCalendar = ({ tasks, onTaskClick }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today?.getDay();
    const diff = today?.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  });

  const courseColors = {
    'Computer Science': 'bg-primary/20 border-primary text-primary',
    'Mathematics': 'bg-secondary/20 border-secondary text-secondary',
    'Physics': 'bg-accent/20 border-accent text-accent',
    'Chemistry': 'bg-success/20 border-success text-success',
    'Biology': 'bg-warning/20 border-warning text-warning',
    'English Literature': 'bg-error/20 border-error text-error',
    'History': 'bg-primary/20 border-primary text-primary',
    'Psychology': 'bg-secondary/20 border-secondary text-secondary',
    'Economics': 'bg-accent/20 border-accent text-accent',
    'Business Administration': 'bg-success/20 border-success text-success'
  };

  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date?.setDate(currentWeekStart?.getDate() + i);
      days?.push(date);
    }
    return days;
  };

  const getTasksForDate = (date) => {
    return tasks?.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate?.toDateString() === date?.toDateString();
    });
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeekStart);
    newDate?.setDate(currentWeekStart?.getDate() + (direction * 7));
    setCurrentWeekStart(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    const dayOfWeek = today?.getDay();
    const diff = today?.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    setCurrentWeekStart(new Date(today.setDate(diff)));
  };

  const weekDays = getWeekDays();
  const today = new Date();

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Weekly Schedule</h2>
          <p className="text-xs md:text-sm text-muted-foreground">
            {weekDays?.[0]?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {weekDays?.[6]?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateWeek(-1)}
            iconName="ChevronLeft"
            iconSize={16}
            className="w-8 h-8"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateWeek(1)}
            iconName="ChevronRight"
            iconSize={16}
            className="w-8 h-8"
          />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 md:gap-3">
        {weekDays?.map((day, index) => {
          const isToday = day?.toDateString() === today?.toDateString();
          const dayTasks = getTasksForDate(day);
          
          return (
            <div
              key={index}
              className={`min-h-[120px] md:min-h-[160px] rounded-lg border-2 p-2 md:p-3 transition-smooth ${
                isToday
                  ? 'bg-primary/5 border-primary' :'bg-muted/30 border-border hover:border-primary/30'
              }`}
            >
              <div className="text-center mb-2">
                <div className="text-xs md:text-sm font-medium text-muted-foreground">
                  {day?.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-base md:text-lg font-semibold ${
                  isToday ? 'text-primary' : 'text-foreground'
                }`}>
                  {day?.getDate()}
                </div>
              </div>
              <div className="space-y-1.5">
                {dayTasks?.slice(0, 3)?.map((task) => (
                  <button
                    key={task?.id}
                    onClick={() => onTaskClick(task)}
                    className={`w-full text-left px-2 py-1.5 rounded border text-xs transition-smooth hover:shadow-soft ${
                      courseColors?.[task?.course] || 'bg-muted border-border text-foreground'
                    }`}
                  >
                    <div className="font-medium line-clamp-1">{task?.title}</div>
                    <div className="opacity-75 line-clamp-1">{task?.course}</div>
                  </button>
                ))}
                {dayTasks?.length > 3 && (
                  <div className="text-xs text-center text-muted-foreground py-1">
                    +{dayTasks?.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 md:mt-5 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="text-muted-foreground">Legend:</span>
          {Object.entries(courseColors)?.slice(0, 5)?.map(([course, colorClass]) => (
            <div key={course} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded border ${colorClass}`} />
              <span className="text-muted-foreground">{course}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;