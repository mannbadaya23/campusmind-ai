import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const TaskForm = ({ task = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course: '',
    priority: 'medium',
    dueDate: '',
    estimatedTime: '',
    progress: 0
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task?.title,
        description: task?.description,
        course: task?.course,
        priority: task?.priority,
        dueDate: task?.dueDate,
        estimatedTime: task?.estimatedTime,
        progress: task?.progress
      });
    }
  }, [task]);

  const courseOptions = [
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
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Task title is required';
    }
    
    if (!formData?.course) {
      newErrors.course = 'Please select a course';
    }
    
    if (!formData?.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!formData?.estimatedTime || formData?.estimatedTime <= 0) {
      newErrors.estimatedTime = 'Please enter valid estimated time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      <Input
        label="Task Title"
        type="text"
        placeholder="e.g., Complete Chapter 5 Assignment"
        value={formData?.title}
        onChange={(e) => handleChange('title', e?.target?.value)}
        error={errors?.title}
        required
      />
      <Input
        label="Description"
        type="text"
        placeholder="Add task details..."
        value={formData?.description}
        onChange={(e) => handleChange('description', e?.target?.value)}
      />
      <Select
        label="Course"
        placeholder="Select course"
        options={courseOptions}
        value={formData?.course}
        onChange={(value) => handleChange('course', value)}
        error={errors?.course}
        required
        searchable
      />
      <Select
        label="Priority"
        options={priorityOptions}
        value={formData?.priority}
        onChange={(value) => handleChange('priority', value)}
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Due Date"
          type="date"
          value={formData?.dueDate}
          onChange={(e) => handleChange('dueDate', e?.target?.value)}
          error={errors?.dueDate}
          required
        />

        <Input
          label="Estimated Time (hours)"
          type="number"
          placeholder="e.g., 2.5"
          value={formData?.estimatedTime}
          onChange={(e) => handleChange('estimatedTime', e?.target?.value)}
          error={errors?.estimatedTime}
          min="0.5"
          step="0.5"
          required
        />
      </div>
      {task && (
        <Input
          label="Progress (%)"
          type="number"
          value={formData?.progress}
          onChange={(e) => handleChange('progress', Math.min(100, Math.max(0, e?.target?.value)))}
          min="0"
          max="100"
        />
      )}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          variant="default"
          iconName="Check"
          iconPosition="left"
          fullWidth
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          iconName="X"
          iconPosition="left"
          fullWidth
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;