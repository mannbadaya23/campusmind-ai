import React, { useState } from 'react';
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

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StressAndBurnoutTracking = () => {
  // ✅ SAME SIDEBAR STATE AS DASHBOARD & STUDY PLANNER
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [stressLevel, setStressLevel] = useState(5);
  const [selectedMood, setSelectedMood] = useState('neutral');
  const [notes, setNotes] = useState('');
  const [dateRange, setDateRange] = useState('7d');

  /* ---------- STATIC DATA (UNCHANGED) ---------- */
  const stressTrendData = [
    { date: '01/01', level: 4.2 },
    { date: '01/02', level: 5.8 },
    { date: '01/03', level: 7.1 },
    { date: '01/04', level: 6.3 },
    { date: '01/05', level: 4.9 },
    { date: '01/06', level: 3.5 },
    { date: '01/07', level: 5.4 }
  ];

  const correlationData = [
    { day: 'Mon', stress: 6, studyHours: 8 },
    { day: 'Tue', stress: 7, studyHours: 9 },
    { day: 'Wed', stress: 5, studyHours: 6 },
    { day: 'Thu', stress: 8, studyHours: 10 },
    { day: 'Fri', stress: 4, studyHours: 5 },
    { day: 'Sat', stress: 3, studyHours: 3 },
    { day: 'Sun', stress: 4, studyHours: 4 }
  ];

  const burnoutFactors = [
    { name: 'Sleep Deprivation', icon: 'Moon', severity: 'high' },
    { name: 'Academic Workload', icon: 'BookOpen', severity: 'high' },
    { name: 'Social Isolation', icon: 'Users', severity: 'medium' },
    { name: 'Physical Activity', icon: 'Activity', severity: 'low' }
  ];

  const weeklySummary = { avgStress: '5.4', goodDays: '4', highStressDays: '2' };

  const alerts = [
    {
      id: 1,
      severity: 'high',
      icon: 'AlertTriangle',
      title: 'High Burnout Risk Detected',
      message:
        'Your stress levels have been consistently high for 5 consecutive days.',
      suggestions: [
        'Schedule an appointment with campus counseling services',
        'Review your workload',
        'Practice mindfulness',
        'Ensure proper sleep'
      ],
      resourceType: 'mental-health'
    }
  ];

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-background flex">
      {/* ✅ SIDEBAR */}
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() =>
          setIsSidebarCollapsed((prev) => !prev)
        }
      />

      {/* ✅ MAIN CONTENT (RESPONDS TO COLLAPSE) */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* MOBILE TOGGLE */}
        <MobileMenuToggle
          isOpen={isSidebarOpen}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="px-4 md:px-6 lg:px-8 py-6 pt-20 lg:pt-8 max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Heart" size={32} className="text-primary" />
                <h1 className="text-2xl md:text-3xl font-bold">
                  Stress & Wellness Tracking
                </h1>
              </div>
              <p className="text-muted-foreground">
                Monitor your mental wellness and stress patterns
              </p>
            </div>

            {/* ✅ COLLAPSE BUTTON (SAME AS STUDY PLANNER) */}
            <Button
              variant="outline"
              onClick={() =>
                setIsSidebarCollapsed((prev) => !prev)
              }
              iconName={
                isSidebarCollapsed
                  ? 'PanelLeftOpen'
                  : 'PanelLeftClose'
              }
              iconPosition="left"
              className="hidden lg:flex"
            >
              {isSidebarCollapsed ? 'Expand' : 'Collapse'}
            </Button>
          </div>

          {/* ALERT */}
          <AlertNotification alerts={alerts} />

          {/* CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="space-y-6">
              <StressLevelInput
                stressLevel={stressLevel}
                onStressLevelChange={setStressLevel}
                selectedMood={selectedMood}
                onMoodChange={setSelectedMood}
              />
              <QuickStressorButtons />
              <NotesInput notes={notes} onNotesChange={setNotes} />
            </div>

            <div className="space-y-6">
              <StressTrendChart
                data={stressTrendData}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
              <BurnoutRiskIndicator
                riskLevel="moderate"
                factors={burnoutFactors}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CorrelationAnalysis data={correlationData} />
            <WeeklySummary summary={weeklySummary} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressAndBurnoutTracking;
