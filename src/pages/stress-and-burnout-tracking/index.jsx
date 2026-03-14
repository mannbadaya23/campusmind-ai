import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import MobileMenuToggle from '../../components/ui/MobileMenuToggle';
import StressLevelInput from './components/StressLevelInput';
import QuickStressorButtons from './components/QuickStressorButtons';
import NotesInput from './components/NotesInput';
import StressTrendChart from './components/StressTrendChart';
import BurnoutRiskIndicator from './components/BurnoutRiskIndicator';
import CorrelationAnalysis from './components/CorrelationAnalysis';
import WeeklySummary from './components/WeeklySummary';
import AlertNotification from './components/AlertNotification';
import MoodTracker from './components/MoodTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useFirestore } from '../../hooks/useFirestore';

const StressAndBurnoutTracking = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [stressLevel, setStressLevel] = useState(5);
  const [selectedMood, setSelectedMood] = useState('neutral');
  const [notes, setNotes] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [stressTrendData, setStressTrendData] = useState([
    { date: '01/01', level: 4.2 }, { date: '01/02', level: 5.8 },
    { date: '01/03', level: 7.1 }, { date: '01/04', level: 6.3 },
    { date: '01/05', level: 4.9 }, { date: '01/06', level: 3.5 },
    { date: '01/07', level: 5.4 }
  ]);
  const [dismissedAlerts, setDismissedAlerts] = useState([]);

  const { saveStressLog, loadStressLogs } = useFirestore();

  // Load stress history on mount
  useEffect(() => {
    const fetch = async () => {
      const logs = await loadStressLogs();
      if (logs && logs.length > 0) {
        const chartData = logs.slice(0, 7).reverse().map(log => ({
          date: log.date?.slice(5) || '',
          level: log.stressLevel || 5
        }));
        setStressTrendData(chartData);
        // Set today's stress if already logged
        if (logs[0]) {
          setStressLevel(logs[0].stressLevel || 5);
          setSelectedMood(logs[0].mood || 'neutral');
        }
      }
    };
    fetch();
  }, []);

  const handleLogStress = async () => {
    setSaving(true);
    await saveStressLog(stressLevel, selectedMood, notes);
    // Update chart
    const today = new Date().toISOString().split('T')[0].slice(5);
    setStressTrendData(prev => {
      const updated = [...prev, { date: today, level: stressLevel }];
      return updated.slice(-7);
    });
    setSaved(true);
    setSaving(false);
    setNotes('');
    setTimeout(() => setSaved(false), 3000);
  };

  const correlationData = [
    { day: 'Mon', stress: 6, studyHours: 8 }, { day: 'Tue', stress: 7, studyHours: 9 },
    { day: 'Wed', stress: 5, studyHours: 6 }, { day: 'Thu', stress: 8, studyHours: 10 },
    { day: 'Fri', stress: 4, studyHours: 5 }, { day: 'Sat', stress: 3, studyHours: 3 },
    { day: 'Sun', stress: 4, studyHours: 4 }
  ];

  const burnoutFactors = [
    { name: 'Sleep Deprivation', icon: 'Moon', severity: 'high' },
    { name: 'Academic Workload', icon: 'BookOpen', severity: 'high' },
    { name: 'Social Isolation', icon: 'Users', severity: 'medium' },
    { name: 'Physical Activity', icon: 'Activity', severity: 'low' }
  ];

  const weeklySummary = { avgStress: '5.4', goodDays: '4', highStressDays: '2' };

  const alerts = stressLevel >= 7 ? [{
    id: 1, severity: 'high', icon: 'AlertTriangle',
    title: 'High Stress Detected',
    message: 'Your current stress level is high. Take care of yourself!',
    suggestions: [
      'Take a 10-minute break right now',
      'Practice deep breathing',
      'Talk to someone you trust',
      'Ensure proper sleep tonight'
    ],
    resourceType: 'mental-health'
  }] : [];

  const visibleAlerts = alerts.filter(a => !dismissedAlerts.includes(a.id));

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed(p => !p)}
      />

      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'}`}>
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-md hover:bg-muted">
              <Icon name="Menu" size={20} />
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                <Icon name="Heart" size={28} className="text-pink-500" />
                Stress & Wellness Tracking
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Monitor your mental wellness and stress patterns</p>
            </div>
          </div>

          {/* Alerts */}
          {visibleAlerts.length > 0 && (
            <div className="mb-6">
              <AlertNotification
                alerts={visibleAlerts}
                onDismiss={(id) => setDismissedAlerts(p => [...p, id])}
                onViewResources={() => {}}
              />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-1 space-y-6">
              <StressLevelInput
                stressLevel={stressLevel}
                onStressLevelChange={setStressLevel}
                selectedMood={selectedMood}
                onMoodChange={setSelectedMood}
              />
              <NotesInput notes={notes} onNotesChange={setNotes} />
              <QuickStressorButtons />

              {/* Log Stress Button */}
              <button onClick={handleLogStress} disabled={saving}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:opacity-90 disabled:opacity-60 transition-all">
                {saving ? '⏳ Saving...' : saved ? '✅ Stress Logged!' : '📊 Log My Stress'}
              </button>

              <MoodTracker />
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-6">
              <StressTrendChart data={stressTrendData} dateRange={dateRange} onDateRangeChange={setDateRange} />
              <BurnoutRiskIndicator factors={burnoutFactors} />
              <CorrelationAnalysis data={correlationData} />
              <WeeklySummary summary={weeklySummary} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StressAndBurnoutTracking;
