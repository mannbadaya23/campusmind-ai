import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { requestNotificationPermission } from '../../firebase';

import Sidebar from '../../components/ui/Sidebar';
import MobileMenuToggle from '../../components/ui/MobileMenuToggle';

import StatsCard from './components/StatsCard';
import StressLevelWidget from './components/StressLevelWidget';
import UpcomingTasksWidget from './components/UpcomingTasksWidget';
import WeeklyProgressChart from './components/WeeklyProgressChart';
import AICoachWidget from './components/AICoachWidget';
import AchievementBadges from './components/AchievementBadges';
import BurnoutAlertWidget from './components/BurnoutAlertWidget';
import QuickActionsPanel from './components/QuickActionsPanel';

const DashboardOverview = () => {
  const { user } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotifPopup, setShowNotifPopup] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => (document.body.style.overflow = '');
  }, [isSidebarOpen]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      setShowNotifPopup(true);
    }
  }, []);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const displayName = user?.email?.split('@')[0] || 'Student';

  return (
    <div className="min-h-screen bg-background">
      <MobileMenuToggle
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(true)}
      />

      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed((p) => !p)}
      />

      <main
        className={`
          pt-20 lg:pt-8 transition-all duration-300
          ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}
        `}
      >
        <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-1">
            Welcome back, {displayName}! 👋
          </h1>
          <p className="text-muted-foreground mb-6">{formattedDate}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="Flame" label="Study Streak" value="12 days" />
            <StatsCard icon="Target" label="Tasks Completed" value="24/30" />
            <StatsCard icon="Clock" label="Study Hours" value="42.5h" />
            <StatsCard icon="TrendingUp" label="Productivity" value="87%" />
          </div>

          <QuickActionsPanel />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <StressLevelWidget />
            <UpcomingTasksWidget />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <WeeklyProgressChart />
            <AICoachWidget />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BurnoutAlertWidget />
            <AchievementBadges />
          </div>
        </div>
      </main>

      {showNotifPopup && (
        <div className="fixed bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg z-[2000]">
          <p className="mb-2 text-sm">Enable notifications</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 bg-primary text-white rounded"
              onClick={() => {
                requestNotificationPermission();
                setShowNotifPopup(false);
              }}
            >
              Allow
            </button>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setShowNotifPopup(false)}
            >
              Not now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
