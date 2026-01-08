import React, { useState } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import MobileMenuToggle from '../../components/ui/MobileMenuToggle';
import Icon from '../../components/AppIcon';
import StatsCard from './components/StatsCard';
import StressLevelWidget from './components/StressLevelWidget';
import UpcomingTasksWidget from './components/UpcomingTasksWidget';
import WeeklyProgressChart from './components/WeeklyProgressChart';
import AICoachWidget from './components/AICoachWidget';
import AchievementBadges from './components/AchievementBadges';
import BurnoutAlertWidget from './components/BurnoutAlertWidget';
import QuickActionsPanel from './components/QuickActionsPanel';

const DashboardOverview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const currentDate = new Date();
  const formattedDate = currentDate?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const statsData = [
    {
      icon: 'Flame',
      label: 'Study Streak',
      value: '12 days',
      trend: 'up',
      trendValue: '+3 days',
      color: 'primary',
    },
    {
      icon: 'Target',
      label: 'Tasks Completed',
      value: '24/30',
      trend: 'up',
      trendValue: '80%',
      color: 'success',
    },
    {
      icon: 'Clock',
      label: 'Study Hours',
      value: '42.5h',
      trend: 'up',
      trendValue: '+5.2h',
      color: 'secondary',
    },
    {
      icon: 'TrendingUp',
      label: 'Productivity',
      value: '87%',
      trend: 'up',
      trendValue: '+12%',
      color: 'accent',
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Complete Data Structures Assignment',
      dueDate: 'Jan 10, 2026',
      dueTime: '11:59 PM',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Review Calculus Chapter 5',
      dueDate: 'Jan 09, 2026',
      dueTime: '3:00 PM',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Prepare for Physics Lab',
      dueDate: 'Jan 08, 2026',
      dueTime: '9:00 AM',
      priority: 'high',
    },
    {
      id: 4,
      title: 'Read English Literature Chapters 3-4',
      dueDate: 'Jan 11, 2026',
      dueTime: '5:00 PM',
      priority: 'low',
    },
  ];

  const weeklyProgressData = [
    { day: 'Mon', studyHours: 6, stressLevel: 4 },
    { day: 'Tue', studyHours: 7, stressLevel: 5 },
    { day: 'Wed', studyHours: 5, stressLevel: 3 },
    { day: 'Thu', studyHours: 8, stressLevel: 6 },
    { day: 'Fri', studyHours: 6, stressLevel: 4 },
    { day: 'Sat', studyHours: 4, stressLevel: 2 },
    { day: 'Sun', studyHours: 6, stressLevel: 3 },
  ];

  const recentAIChats = [
    {
      id: 1,
      message: 'How can I improve my time management for upcoming exams?',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      message: 'What are some effective stress relief techniques during finals week?',
      timestamp: 'Yesterday',
    },
    {
      id: 3,
      message: 'Can you help me create a study schedule for next week?',
      timestamp: '2 days ago',
    },
  ];

  const achievementBadges = [
    {
      id: 1,
      name: 'Week Warrior',
      icon: 'Trophy',
      earned: true,
      earnedDate: 'Jan 5, 2026',
    },
    {
      id: 2,
      name: 'Stress Master',
      icon: 'Heart',
      earned: true,
      earnedDate: 'Jan 3, 2026',
    },
    {
      id: 3,
      name: 'Early Bird',
      icon: 'Sunrise',
      earned: true,
      earnedDate: 'Jan 1, 2026',
    },
    {
      id: 4,
      name: 'Task Crusher',
      icon: 'Zap',
      earned: false,
      earnedDate: null,
    },
    {
      id: 5,
      name: 'Study Marathon',
      icon: 'Award',
      earned: false,
      earnedDate: null,
    },
    {
      id: 6,
      name: 'Wellness Champion',
      icon: 'Star',
      earned: false,
      earnedDate: null,
    },
  ];

  const burnoutRecommendations = [
    'Take regular 10-minute breaks every hour',
    'Practice mindfulness meditation for 5 minutes daily',
    'Ensure 7-8 hours of sleep each night',
    'Engage in physical activity for at least 30 minutes',
  ];

  return (
    <div className="min-h-screen bg-background">
      <MobileMenuToggle isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={`lg:hidden fixed inset-0 bg-black/50 z-[999] transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />
      <div className={`fixed lg:fixed transition-transform z-[1000] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>
      <main className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="p-4 md:p-6 lg:p-8 pt-20 lg:pt-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                  Welcome back, Alex! 👋
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">{formattedDate}</p>
              </div>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-smooth"
              >
                <Icon name={isSidebarCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
                <span className="text-sm font-medium">{isSidebarCollapsed ? 'Expand' : 'Collapse'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {statsData?.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            <div className="mb-6 md:mb-8">
              <QuickActionsPanel />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="lg:col-span-1">
                <StressLevelWidget currentLevel={5} weeklyAverage={4.2} lastUpdated="2 hours ago" />
              </div>
              <div className="lg:col-span-2">
                <UpcomingTasksWidget tasks={upcomingTasks} />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <WeeklyProgressChart data={weeklyProgressData} />
              <AICoachWidget recentChats={recentAIChats} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <BurnoutAlertWidget riskLevel="low" recommendations={burnoutRecommendations} />
              <AchievementBadges badges={achievementBadges} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;