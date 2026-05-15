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
import { useFirestore } from '../../hooks/useFirestore';
import WelcomePopup from '../../components/ui/WelcomePopup';

const badges = [
  { id: 1, name: '7-Day Streak', icon: 'Flame', earned: true, earnedDate: 'Jan 10' },
  { id: 2, name: 'Early Bird', icon: 'Sun', earned: true, earnedDate: 'Jan 12' },
  { id: 3, name: 'Study Master', icon: 'BookOpen', earned: true, earnedDate: 'Jan 15' },
  { id: 4, name: 'Stress Free', icon: 'Heart', earned: false, earnedDate: '' },
  { id: 5, name: 'Top Scorer', icon: 'Trophy', earned: false, earnedDate: '' },
  { id: 6, name: 'Night Owl', icon: 'Moon', earned: false, earnedDate: '' },
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
  const [tasks, setTasks] = useState([]);
  const [stressLevel, setStressLevel] = useState(0);
  const [studyStreak, setStudyStreak] = useState(0);
  const [totalStudyHours, setTotalStudyHours] = useState(0);
  const [productivity, setProductivity] = useState(0);
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', studyHours: 0, stressLevel: 0 },
    { day: 'Tue', studyHours: 0, stressLevel: 0 },
    { day: 'Wed', studyHours: 0, stressLevel: 0 },
    { day: 'Thu', studyHours: 0, stressLevel: 0 },
    { day: 'Fri', studyHours: 0, stressLevel: 0 },
    { day: 'Sat', studyHours: 0, stressLevel: 0 },
    { day: 'Sun', studyHours: 0, stressLevel: 0 },
  ]);

  const { loadTasks, loadStressLogs, loadWeeklyStats } = useFirestore();

  if (!user) return <Navigate to="/login" replace />;

  useEffect(() => {
    const fetchAll = async () => {
      const savedTasks = await loadTasks();
      if (savedTasks && savedTasks.length > 0) {
        setTasks(savedTasks);
        const completed = savedTasks.filter(t => t.completed).length;
        const total = savedTasks.length;
        setProductivity(total > 0 ? Math.round((completed / total) * 100) : 0);
      }

      const stressLogs = await loadStressLogs();
      if (stressLogs && stressLogs.length > 0) {
        setStressLevel(stressLogs[0]?.stressLevel || 0);
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const today = new Date();
        const chartData = days.map((day, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (6 - i));
          const dateStr = d.toISOString().split('T')[0];
          const log = stressLogs.find(l => l.date === dateStr);
          return { day, studyHours: log?.studyHours || 0, stressLevel: log?.stressLevel || 0 };
        });
        setWeeklyData(chartData);
        let streak = 0;
        for (let i = 0; i < stressLogs.length; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          const ds = d.toISOString().split('T')[0];
          if (stressLogs.find(l => l.date === ds)) streak++;
          else break;
        }
        setStudyStreak(streak);
      }

      const weekStats = await loadWeeklyStats();
      if (weekStats && weekStats.length > 0) {
        const totalHours = weekStats.reduce((sum, s) => sum + (s.studyHours || 0), 0);
        setTotalStudyHours(totalHours.toFixed(1));
      }
    };
    fetchAll();
  }, []);

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
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="min-h-screen bg-background">
      <MobileMenuToggle isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed(p => !p)}
      />

      <main className={`pt-20 lg:pt-8 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-1">Welcome back, {displayName}! 👋</h1>
          <p className="text-muted-foreground mb-6">{formattedDate}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="Flame" label="Study Streak" value={studyStreak > 0 ? `${studyStreak} days` : 'Start today!'} />
            <StatsCard icon="Target" label="Tasks Completed" value={totalTasks > 0 ? `${completedTasks}/${totalTasks}` : 'No tasks yet'} />
            <StatsCard icon="Clock" label="Study Hours" value={totalStudyHours > 0 ? `${totalStudyHours}h` : 'Log stress to track'} />
            <StatsCard icon="TrendingUp" label="Productivity" value={totalTasks > 0 ? `${productivity}%` : 'Add tasks first'} />
          </div>

          <QuickActionsPanel />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <StressLevelWidget currentLevel={stressLevel} weeklyAverage={weeklyData.reduce((s, d) => s + d.stressLevel, 0) / 7 || 0} lastUpdated="Today" />
            <div className="lg:col-span-2">
              <UpcomingTasksWidget tasks={tasks.filter(t => !t.completed).slice(0, 4)} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ExamCountdown />
            <WeeklyReportCard />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <WeeklyProgressChart data={weeklyData} />
            <AICoachWidget recentChats={recentChats} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BurnoutAlertWidget
              riskLevel={stressLevel >= 7 ? 'high' : stressLevel >= 5 ? 'medium' : 'low'}
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

      <WelcomePopup />

      {showNotifPopup && (
        <div className="fixed bottom-5 right-5 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-[2000] border border-border">
          <p className="mb-2 text-sm text-foreground">Enable notifications</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-primary text-white rounded text-sm"
              onClick={() => { requestNotificationPermission(); setShowNotifPopup(false); }}>
              Allow
            </button>
            <button className="px-3 py-1 border border-border rounded text-sm"
              onClick={() => setShowNotifPopup(false)}>
              Not now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;