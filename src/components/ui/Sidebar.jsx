import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isCollapsed = false }) => {
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard-overview',
      icon: 'LayoutDashboard',
      badge: null,
    },
    {
      label: 'Stress & Wellness',
      path: '/stress-and-burnout-tracking',
      icon: 'Heart',
      badge: null,
    },
    {
      label: 'Study Planner',
      path: '/study-planner',
      icon: 'Calendar',
      badge: 3,
    },
    {
      label: 'AI Coach',
      path: '/ai-coach',
      icon: 'MessageSquare',
      badge: null,
    },
    {
      label: 'Resources',
      path: '/resources',
      icon: 'BookOpen',
      badge: null,
    },
  ];

  const userProfile = {
    name: 'Alex Johnson',
    university: 'State University',
    avatar: null,
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  return (
    <aside
      className={`fixed lg:fixed top-0 left-0 h-full bg-card border-r border-border transition-smooth z-[1000] ${
        isCollapsed ? 'w-20 sidebar-collapsed' : 'w-60'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Icon name="Brain" size={24} color="var(--color-primary)" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-lg font-heading font-semibold text-foreground">
              CampusMind AI
            </span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-3 overflow-y-auto">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <NavLink
                key={item?.path}
                to={item?.path}
                className={`flex items-center h-12 px-4 rounded-md transition-smooth group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary' :'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title={isCollapsed ? item?.label : undefined}
              >
                <Icon
                  name={item?.icon}
                  size={20}
                  className={`flex-shrink-0 ${isActive ? 'text-primary' : ''}`}
                />
                {!isCollapsed && (
                  <>
                    <span className="ml-3 font-medium text-base">{item?.label}</span>
                    {item?.badge && (
                      <span className="ml-auto flex items-center justify-center w-5 h-5 text-xs font-medium bg-accent text-accent-foreground rounded-full">
                        {item?.badge}
                      </span>
                    )}
                  </>
                )}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`flex items-center w-full h-12 px-4 rounded-md transition-smooth hover:bg-muted ${
                isCollapsed ? 'justify-center' : ''
              }`}
              aria-expanded={userMenuOpen}
              aria-label="User menu"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full text-white font-medium text-sm flex-shrink-0">
                {userProfile?.name?.charAt(0)}
              </div>
              {!isCollapsed && (
                <>
                  <div className="ml-3 text-left flex-1">
                    <div className="text-sm font-medium text-foreground">
                      {userProfile?.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {userProfile?.university}
                    </div>
                  </div>
                  <Icon
                    name="ChevronUp"
                    size={16}
                    className={`transition-smooth ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </>
              )}
            </button>

            {userMenuOpen && (
              <div
                className={`absolute bottom-full mb-2 bg-popover border border-border rounded-md shadow-soft-lg overflow-hidden z-[1200] ${
                  isCollapsed ? 'left-0 w-48' : 'left-0 right-0'
                }`}
              >
                <button
                  onClick={handleSettings}
                  className="flex items-center w-full px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="Settings" size={16} className="mr-3" />
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm text-destructive hover:bg-muted transition-smooth"
                >
                  <Icon name="LogOut" size={16} className="mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;