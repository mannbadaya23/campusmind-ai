import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const UserProfileDropdown = ({ user, isCollapsed = false, onLogout, onSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSettingsClick = () => {
    setIsOpen(false);
    if (onSettings) onSettings();
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className={`flex items-center w-full h-12 px-4 rounded-md transition-smooth hover:bg-muted ${
          isCollapsed ? 'justify-center' : ''
        }`}
        aria-expanded={isOpen}
        aria-label="User menu"
      >
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full text-white font-medium text-sm flex-shrink-0">
          {user?.name?.charAt(0)}
        </div>
        {!isCollapsed && (
          <>
            <div className="ml-3 text-left flex-1">
              <div className="text-sm font-medium text-foreground">
                {user?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {user?.university}
              </div>
            </div>
            <Icon
              name="ChevronUp"
              size={16}
              className={`transition-smooth ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>
      {isOpen && (
        <div
          className={`absolute bottom-full mb-2 bg-popover border border-border rounded-md shadow-soft-lg overflow-hidden z-[1200] ${
            isCollapsed ? 'left-0 w-48' : 'left-0 right-0'
          }`}
        >
          <button
            onClick={handleSettingsClick}
            className="flex items-center w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-smooth"
          >
            <Icon name="Settings" size={16} className="mr-3" />
            Settings
          </button>
          <button
            onClick={handleLogoutClick}
            className="flex items-center w-full px-4 py-3 text-sm text-destructive hover:bg-muted transition-smooth"
          >
            <Icon name="LogOut" size={16} className="mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;