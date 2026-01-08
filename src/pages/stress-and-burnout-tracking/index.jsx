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

const StressAndBurnoutTracking = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stressLevel, setStressLevel] = useState(5);
  const [selectedMood, setSelectedMood] = useState('neutral');
  const [notes, setNotes] = useState('');
  const [dateRange, setDateRange] = useState('7d');

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
    {
      name: 'Sleep Deprivation',
      icon: 'Moon',
      severity: 'high',
      description: 'Average 4.5 hours sleep per night this week'
    },
    {
      name: 'Academic Workload',
      icon: 'BookOpen',
      severity: 'high',
      description: '3 major assignments due within 5 days'
    },
    {
      name: 'Social Isolation',
      icon: 'Users',
      severity: 'medium',
      description: 'Limited social interactions detected'
    },
    {
      name: 'Physical Activity',
      icon: 'Activity',
      severity: 'low',
      description: 'Regular exercise routine maintained'
    }
  ];

  const weeklySummary = {
    avgStress: '5.4',
    goodDays: '4',
    highStressDays: '2'
  };

  const recommendations = [
    {
      icon: 'Moon',
      title: 'Prioritize Sleep',
      description: 'Your stress levels are 40% higher on days with less than 6 hours of sleep. Try to maintain a consistent sleep schedule.'
    },
    {
      icon: 'Coffee',
      title: 'Take Regular Breaks',
      description: 'Studies show that 5-minute breaks every hour can reduce stress by 25%. Use the Pomodoro technique.'
    },
    {
      icon: 'Users',
      title: 'Connect with Friends',
      description: 'Social support is crucial. Schedule time with friends or join a study group to combat isolation.'
    }
  ];

  const alerts = [
    {
      id: 1,
      severity: 'high',
      icon: 'AlertTriangle',
      title: 'High Burnout Risk Detected',
      message: 'Your stress levels have been consistently high for 5 consecutive days. This pattern indicates increased burnout risk.',
      suggestions: [
        'Schedule an appointment with campus counseling services',
        'Review your current workload and consider adjusting deadlines',
        'Practice daily mindfulness or meditation for 10 minutes',
        'Ensure you are getting at least 7 hours of sleep'
      ],
      resourceType: 'mental-health'
    }
  ];

  const handleStressorSelect = (stressorId) => {
    console.log('Stressor selected:', stressorId);
  };

  const handleSaveEntry = () => {
    console.log('Saving entry:', { stressLevel, selectedMood, notes });
  };

  const handleDismissAlert = (alertId) => {
    console.log('Dismissing alert:', alertId);
  };

  const handleViewResources = (resourceType) => {
    console.log('Viewing resources:', resourceType);
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileMenuToggle
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        className={`fixed inset-0 bg-black/50 z-[999] lg:hidden transition-smooth ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full z-[1000] transition-smooth lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar isCollapsed={false} />
      </div>

      <main className="lg:ml-60 min-h-screen">
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10 pt-20 lg:pt-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Heart" size={32} className="text-primary" />
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                  Stress & Wellness Tracking
                </h1>
              </div>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                Monitor your mental wellness and track stress patterns for better self-care
              </p>
            </div>

            <div className="mb-6 md:mb-8">
              <AlertNotification
                alerts={alerts}
                onDismiss={handleDismissAlert}
                onViewResources={handleViewResources}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8">
              <div className="space-y-4 md:space-y-6">
                <StressLevelInput
                  stressLevel={stressLevel}
                  onStressLevelChange={setStressLevel}
                  selectedMood={selectedMood}
                  onMoodChange={setSelectedMood}
                />
                <QuickStressorButtons onStressorSelect={handleStressorSelect} />
                <NotesInput
                  notes={notes}
                  onNotesChange={setNotes}
                  onSave={handleSaveEntry}
                />
              </div>

              <div className="space-y-4 md:space-y-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <CorrelationAnalysis data={correlationData} />
              <WeeklySummary
                summary={weeklySummary}
                recommendations={recommendations}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StressAndBurnoutTracking;