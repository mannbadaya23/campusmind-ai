import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../components/ui/Sidebar';
import MobileMenuToggle from '../../components/ui/MobileMenuToggle';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import AIRecommendationPanel from './components/AIRecommendationPanel';
import WeeklyCalendar from './components/WeeklyCalendar';
import StatsOverview from './components/StatsOverview';
import FilterBar from './components/FilterBar';
import PomodoroTimer from './components/PomodoroTimer';
import HabitTracker from './components/HabitTracker';
import { useFirestore } from '../../hooks/useFirestore';

const StudyPlanner = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeView, setActiveView] = useState('list');
  const [loading, setLoading] = useState(true);
  const { saveTasks, loadTasks } = useFirestore();

  const [tasks, setTasks] = useState([]);

  // Load tasks from Firestore on mount
  useEffect(() => {
    const fetch = async () => {
      const saved = await loadTasks();
      if (saved && saved.length > 0) {
        setTasks(saved);
      } else {
        // Default tasks for new users
        setTasks([
          { id: 1, title: "Complete Data Structures Assignment", description: "Implement binary search tree.", course: "Computer Science", priority: "high", dueDate: "2026-04-10", estimatedTime: 4, progress: 65, completed: false },
          { id: 2, title: "Study Calculus Chapter 7", description: "Review integration techniques.", course: "Mathematics", priority: "medium", dueDate: "2026-04-09", estimatedTime: 3, progress: 40, completed: false },
          { id: 3, title: "Physics Lab Report", description: "Write lab report on Newton's laws.", course: "Physics", priority: "high", dueDate: "2026-04-08", estimatedTime: 5, progress: 80, completed: false },
        ]);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const [filters, setFilters] = useState({ search: '', course: 'all', priority: 'all', status: 'all', sortBy: 'dueDate' });

  const aiRecommendations = [
    { id: 1, type: "schedule", title: "Optimize Study Schedule", description: "Schedule high-priority tasks during your peak hours (9 AM - 12 PM).", impact: "High", details: ["Move Data Structures to morning", "Reserve afternoons for reading tasks"] },
    { id: 2, type: "break", title: "Take Strategic Breaks", description: "Use Pomodoro technique — 25 min study, 5 min break improves retention by 34%.", impact: "Medium", details: ["Use built-in Pomodoro timer", "Take 15-min break every 2 hours"] },
    { id: 3, type: "priority", title: "Adjust Task Priorities", description: "Focus on tasks due soonest to avoid last-minute stress.", impact: "High", details: ["Complete high priority tasks first", "Request extension if needed"] },
  ];

  const stats = {
    totalTasks: tasks?.length,
    completedTasks: tasks?.filter(t => t?.completed)?.length,
    inProgressTasks: tasks?.filter(t => !t?.completed && t?.progress > 0)?.length,
    totalHours: tasks?.reduce((sum, task) => sum + parseFloat(task?.estimatedTime || 0), 0)
  };

  const handleFilterChange = (field, value) => setFilters(prev => ({ ...prev, [field]: value }));
  const handleClearFilters = () => setFilters({ search: '', course: 'all', priority: 'all', status: 'all', sortBy: 'dueDate' });

  const getFilteredTasks = () => {
    let filtered = [...tasks];
    if (filters?.search) filtered = filtered.filter(t => t?.title?.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters?.course !== 'all') filtered = filtered.filter(t => t?.course === filters.course);
    if (filters?.priority !== 'all') filtered = filtered.filter(t => t?.priority === filters.priority);
    if (filters?.status !== 'all') {
      if (filters.status === 'completed') filtered = filtered.filter(t => t?.completed);
      else if (filters.status === 'in-progress') filtered = filtered.filter(t => !t?.completed && t?.progress > 0);
      else if (filters.status === 'pending') filtered = filtered.filter(t => !t?.completed && t?.progress === 0);
    }
    filtered.sort((a, b) => {
      if (filters.sortBy === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
      if (filters.sortBy === 'priority') return ({ high: 0, medium: 1, low: 2 }[a.priority] - { high: 0, medium: 1, low: 2 }[b.priority]);
      if (filters.sortBy === 'progress') return b.progress - a.progress;
      return 0;
    });
    return filtered;
  };

  const handleCreateTask = async (taskData) => {
    const newTask = { id: Date.now(), ...taskData, completed: false };
    const updated = [...tasks, newTask];
    setTasks(updated);
    await saveTasks(updated); // Save to Firestore
    setShowTaskForm(false);
  };

  const handleUpdateTask = async (taskData) => {
    const updated = tasks.map(t => t?.id === editingTask?.id ? { ...t, ...taskData } : t);
    setTasks(updated);
    await saveTasks(updated); // Save to Firestore
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updated = tasks.filter(t => t?.id !== taskId);
      setTasks(updated);
      await saveTasks(updated); // Save to Firestore
    }
  };

  const handleToggleComplete = async (taskId) => {
    const updated = tasks.map(t => t?.id === taskId ? { ...t, completed: !t?.completed, progress: !t?.completed ? 100 : t?.progress } : t);
    setTasks(updated);
    await saveTasks(updated); // Save to Firestore
  };

  const handleEditTask = (task) => { setEditingTask(task); setShowTaskForm(true); };
  const filteredTasks = getFilteredTasks();

  return (
    <>
      <Helmet>
        <title>Study Planner - CampusMind AI</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <MobileMenuToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </div>

        <main className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'} pt-20 lg:pt-0`}>
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-[1600px] mx-auto">
              {/* Header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">Study Planner</h1>
                  <p className="text-sm md:text-base text-muted-foreground">Organize your academic tasks with AI-powered insights</p>
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <Button variant="outline" size="default" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} iconName={isSidebarCollapsed ? 'PanelLeftOpen' : 'PanelLeftClose'} iconPosition="left" className="hidden lg:flex">
                    {isSidebarCollapsed ? 'Expand' : 'Collapse'}
                  </Button>
                  <Button variant="default" size="default" onClick={() => { setEditingTask(null); setShowTaskForm(true); }} iconName="Plus" iconPosition="left" fullWidth className="lg:w-auto">
                    New Task
                  </Button>
                </div>
              </div>

              <div className="mb-6 md:mb-8"><StatsOverview stats={stats} /></div>
              <div className="mb-6 md:mb-8"><FilterBar filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} /></div>

              <div className="flex items-center gap-2 mb-6">
                <Button variant={activeView === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setActiveView('list')} iconName="List" iconPosition="left">List View</Button>
                <Button variant={activeView === 'calendar' ? 'default' : 'outline'} size="sm" onClick={() => setActiveView('calendar')} iconName="Calendar" iconPosition="left">Calendar View</Button>
              </div>

              {/* Task Form Modal */}
              {showTaskForm && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
                  <div className="bg-card border border-border rounded-lg shadow-soft-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl md:text-2xl font-semibold text-foreground">{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
                      <Button variant="ghost" size="icon" onClick={() => { setShowTaskForm(false); setEditingTask(null); }} iconName="X" iconSize={20} />
                    </div>
                    <TaskForm task={editingTask} onSubmit={editingTask ? handleUpdateTask : handleCreateTask} onCancel={() => { setShowTaskForm(false); setEditingTask(null); }} />
                  </div>
                </div>
              )}

              {/* Main grid - Tasks + AI Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {activeView === 'list' ? (
                    loading ? (
                      <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : filteredTasks?.length === 0 ? (
                      <div className="bg-card border border-border rounded-lg p-8 text-center">
                        <Icon name="ListTodo" size={32} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No tasks found</h3>
                        <p className="text-sm text-muted-foreground mb-6">Get started by creating your first study task!</p>
                        <Button variant="default" onClick={() => { setEditingTask(null); setShowTaskForm(true); }} iconName="Plus" iconPosition="left">Create Task</Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredTasks?.map(task => (
                          <TaskCard key={task?.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} onToggleComplete={handleToggleComplete} />
                        ))}
                      </div>
                    )
                  ) : (
                    <WeeklyCalendar tasks={tasks} onTaskClick={handleEditTask} />
                  )}
                </div>

                <div className="space-y-6">
                  <AIRecommendationPanel recommendations={aiRecommendations} onApplyRecommendation={(r) => alert(`Applied: ${r?.title}`)} />
                </div>
              </div>

              {/* Pomodoro + Habit Tracker - Full width below */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <PomodoroTimer />
                <HabitTracker />
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudyPlanner;
