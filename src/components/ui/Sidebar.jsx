import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({
  isOpen = false,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, loading } = useAuth();

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard-overview', icon: 'LayoutDashboard' },
    { label: 'Stress & Wellness', path: '/stress-and-burnout-tracking', icon: 'Heart' },
    { label: 'Study Planner', path: '/study-planner', icon: 'Calendar' },
    { label: 'AI Coach', path: '/ai-coach', icon: 'MessageSquare' },
    { label: 'Resources', path: '/resources', icon: 'BookOpen' },
  ];

  const displayName = loading
    ? 'Loading…'
    : user?.email?.split('@')[0] || 'Student';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[900] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-[1000]
          transition-transform duration-300
          ${isCollapsed ? 'w-20' : 'w-60'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* HEADER */}
          <div className="flex items-center gap-3 px-4 py-4">
            <Icon name="Brain" size={24} className="text-primary" />
            {!isCollapsed && (
              <span className="text-lg font-semibold">CampusMind AI</span>
            )}
          </div>

          {/* NAV */}
          <nav className="flex-1 px-3 space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center h-11 px-3 rounded-md transition
                   ${
                     isActive
                       ? 'bg-primary/10 text-primary'
                       : 'text-muted-foreground hover:bg-muted'
                   }`
                }
              >
                <Icon name={item.icon} size={20} />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </NavLink>
            ))}
          </nav>

          {/* USER */}
          <div className="p-4 border-t border-border space-y-3">
            {!isCollapsed && (
              <div className="text-sm text-muted-foreground">
                Logged in as <br />
                <span className="font-medium text-foreground">
                  {displayName}
                </span>
              </div>
            )}

            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex items-center gap-2 px-3 py-2 text-sm border rounded-md"
            >
              <Icon name={isCollapsed ? 'PanelLeftOpen' : 'PanelLeftClose'} size={16} />
              {!isCollapsed && 'Collapse'}
            </button>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted rounded-md"
            >
              <Icon name="LogOut" size={18} />
              {!isCollapsed && 'Logout'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
