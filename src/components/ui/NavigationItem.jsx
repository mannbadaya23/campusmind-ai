import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationItem = ({
  icon,
  label,
  path,
  badge = null,
  isCollapsed = false,
  isActive = false,
}) => {
  return (
    <NavLink
      to={path}
      className={`flex items-center h-12 px-4 rounded-md transition-smooth group relative ${
        isActive
          ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
      title={isCollapsed ? label : undefined}
    >
      <Icon
        name={icon}
        size={20}
        className={`flex-shrink-0 ${isActive ? 'text-primary' : ''}`}
      />
      {!isCollapsed && (
        <>
          <span className="ml-3 font-medium text-base">{label}</span>
          {badge && (
            <span className="ml-auto flex items-center justify-center w-5 h-5 text-xs font-medium bg-accent text-accent-foreground rounded-full">
              {badge}
            </span>
          )}
        </>
      )}
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
      )}
    </NavLink>
  );
};

export default NavigationItem;