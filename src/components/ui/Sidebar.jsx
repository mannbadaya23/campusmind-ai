import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isCollapsed = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard-overview', icon: 'LayoutDashboard' },
    { label: 'Stress & Wellness', path: '/stress-and-burnout-tracking', icon: 'Heart' },
    { label: 'Study Planner', path: '/study-planner', icon: 'Calendar', badge: 3 },
    { label: 'AI Coach', path: '/ai-coach', icon: 'MessageSquare' },
    { label: 'Resources', path: '/resources', icon: 'BookOpen' },
  ];

  const displayName = user?.email?.split('@')[0] || 'Student';

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-card border-r border-border transition-smooth z-[1000] ${
        isCollapsed ? 'w-20 sidebar-collapsed' : 'w-60'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* LOGO */}
        <div className="sidebar-header flex items-center px-4 py-4">
          <Icon name="Brain" size={24} className="text-primary" />
          {!isCollapsed && (
            <span className="ml-3 text-lg font-heading font-semibold">
              CampusMind AI
            </span>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 space-y-3 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center h-12 px-4 rounded-md transition-smooth ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/10 to-secondary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon name={item.icon} size={20} />
                {!isCollapsed && (
                  <>
                    <span className="ml-3 font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto w-5 h-5 text-xs flex items-center justify-center bg-accent rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* USER SECTION */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={`flex items-center w-full h-12 px-4 rounded-md hover:bg-muted transition-smooth ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
              {displayName.charAt(0).toUpperCase()}
            </div>

            {!isCollapsed && (
              <>
                <div className="ml-3 text-left flex-1">
                  <div className="text-sm font-medium">{displayName}</div>
                  <div className="text-xs text-muted-foreground">
                    Logged in
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
            <div className="mt-2 border rounded-md overflow-hidden">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-sm text-destructive hover:bg-muted transition-smooth text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
