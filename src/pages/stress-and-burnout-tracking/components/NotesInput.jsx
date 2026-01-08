import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotesInput = ({ notes, onNotesChange, onSave }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 shadow-soft-md">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Additional Notes
        </h3>
        <Icon name="FileText" size={24} className="text-primary" />
      </div>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e?.target?.value)}
        placeholder="What's on your mind? Describe what's causing stress or how you're feeling..."
        className="w-full min-h-[120px] md:min-h-[150px] p-4 bg-background border border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-smooth resize-none"
        rows={6}
      />
      <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-6">
        <Button
          variant="default"
          iconName="Save"
          iconPosition="left"
          onClick={onSave}
          fullWidth
          className="sm:flex-1"
        >
          Save Entry
        </Button>
        <Button
          variant="outline"
          iconName="Calendar"
          iconPosition="left"
          fullWidth
          className="sm:flex-1"
        >
          Schedule Check-in
        </Button>
      </div>
    </div>
  );
};

export default NotesInput;