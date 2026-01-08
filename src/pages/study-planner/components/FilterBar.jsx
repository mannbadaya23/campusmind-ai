import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterBar = ({ filters, onFilterChange, onClearFilters }) => {
  const courseOptions = [
    { value: 'all', label: 'All Courses' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'English Literature', label: 'English Literature' },
    { value: 'History', label: 'History' },
    { value: 'Psychology', label: 'Psychology' },
    { value: 'Economics', label: 'Economics' },
    { value: 'Business Administration', label: 'Business Administration' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'progress', label: 'Progress' },
    { value: 'course', label: 'Course' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        <Input
          type="search"
          placeholder="Search tasks..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        <Select
          placeholder="Filter by course"
          options={courseOptions}
          value={filters?.course}
          onChange={(value) => onFilterChange('course', value)}
        />

        <Select
          placeholder="Filter by priority"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => onFilterChange('priority', value)}
        />

        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <div className="flex items-center gap-2">
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={filters?.sortBy}
            onChange={(value) => onFilterChange('sortBy', value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={onClearFilters}
            iconName="X"
            iconSize={16}
            className="w-10 h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;