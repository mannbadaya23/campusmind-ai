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
import ExamCountdown from './components/ExamCountdown';
import WeeklyReportCard from './components/WeeklyReportCard';

const weeklyData = [
  { day: 'Mon', studyHours: 3, stressLevel: 4 },
  { day: 'Tue', studyHours: 5, stressLevel: 6 },
  { day: 'Wed', studyHours: 4, stressLevel: 5 },
  { day: 'Thu', studyHours: 6, stressLevel: 3 },
  { day: 'Fri', studyHours: 7, stressLevel: 4 },
  { day: 'Sat', studyHours: 5, stressLevel: 2 },
  { day: 'Sun', studyHours: 3, stressLevel: 3 },
];

const badges = [
  { id: 1, name: '7-Day Streak', icon: 'Flame', earned: true, earnedDate: 'Jan 10' },
  { id: 2, name: 'Early Bird', icon: 'Sun', earned: true, earnedDate: 'Jan 12' },
  { id: 3, name: 'Study Master', icon: 'BookOpen', earned: true, earnedDate: 'Jan 15' },
  { id: 4, name: 'Stress Free', icon: 'Heart', earned: false, earnedDate: '' },
  { id: 5, name: 'Top Scorer', icon: 'Trophy', earned: false, earnedDate: '' },
  { id: 6, name: 'Night Owl', icon: 'Moon', earned: false, earnedDate: '' },
];

const tasks = [
  { id: 1, title: 'Complete Data Structures Assignment', dueDate: 'Mar 2', dueTime: '11:59 PM', priority: 'high' },
  { id: 2, title: 'Read Chapter 5 - Operating Systems', dueDate: 'Mar 3', dueTime: '6:00 PM', priority: 'medium' },
  { id: 3, title: 'Practice 10 DSA problems', dueDate: 'Mar 4', dueTime: '8:00 PM', priority: 'medium' },
  { id: 4, title: 'Submit Lab Report', dueDate: 'Mar 5', dueTime: '5:00 PM', priority: 'low' },
];

const recentChats = [
  { id: 1, message: 'How can I improve my study schedule for exams?', timestamp: '2 hours ago' },
  { id: 2, message: 'I am feeling overwhelmed with assignments', timestamp: 'Yesterday' },
];

const DashboardOverview = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotifPopup, setShowNotifPopup] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [isSidebarOpen]);

  useEffect(() => {
    if (Notification.permission === 'default') setShowNotifPopup(true);
  }, []);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const displayName = user?.email?.split('@')[0] || 'Student';

  return (
    <div className="min-h-screen bg-background">
      <MobileMenuToggle isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed((p) => !p)}
      />

      <main className={`pt-20 lg:pt-8 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pb-10">
          <h1 className="text-2xl font-semibold mb-1">Welcome back, {displayName}! 👋</h1>
          <p className="text-muted-foreground mb-6">{formattedDate}</p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="Flame" label="Study Streak" value="12 days" />
            <StatsCard icon="Target" label="Tasks Completed" value="24/30" />
            <StatsCard icon="Clock" label="Study Hours" value="42.5h" />
            <StatsCard icon="TrendingUp" label="Productivity" value="87%" />
          </div>

          {/* Quick Actions */}
          <QuickActionsPanel />

          {/* Stress + Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <StressLevelWidget currentLevel={7} weeklyAverage={5.4} lastUpdated="Today 2PM" />
            <div className="lg:col-span-2">
              <UpcomingTasksWidget tasks={tasks} />
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <WeeklyProgressChart data={weeklyData} />
            <AICoachWidget recentChats={recentChats} />
          </div>

          {/* Exam Countdown + Weekly Report */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ExamCountdown />
            <WeeklyReportCard />
          </div>

          {/* Burnout + Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BurnoutAlertWidget
              riskLevel="medium"
              recommendations={[
                'Take a 10-minute break every hour',
                'Get at least 7-8 hours of sleep',
                'Try meditation or deep breathing',
                'Exercise for 30 minutes daily',
              ]}
            />
            <AchievementBadges badges={badges} />
          </div>
        </div>
      </main>

      {showNotifPopup && (
        <div className="fixed bottom-5 right-5 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-[2000] border border-border">
          <p className="mb-2 text-sm text-foreground">Enable notifications</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-primary text-white rounded text-sm"
              onClick={() => { requestNotificationPermission(); setShowNotifPopup(false); }}>Allow</button>
            <button className="px-3 py-1 border border-border rounded text-sm"
              onClick={() => setShowNotifPopup(false)}>Not now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
