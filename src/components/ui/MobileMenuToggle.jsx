import React from 'react';
import Icon from '../AppIcon';

const MobileMenuToggle = ({ isOpen = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 lg:hidden flex items-center justify-center w-12 h-12 bg-card border border-border rounded-md shadow-soft-md transition-smooth hover:bg-muted active:scale-97"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <Icon
        name={isOpen ? 'X' : 'Menu'}
        size={24}
        className="text-foreground"
      />
    </button>
  );
};

export default MobileMenuToggle;