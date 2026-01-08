import React, { useState } from 'react';
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

const StudyPlanner = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeView, setActiveView] = useState('list');

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Data Structures Assignment",
      description: "Implement binary search tree with insertion, deletion, and traversal methods. Include unit tests and documentation.",
      course: "Computer Science",
      priority: "high",
      dueDate: "2026-01-10",
      estimatedTime: 4,
      progress: 65,
      completed: false
    },
    {
      id: 2,
      title: "Study Calculus Chapter 7",
      description: "Review integration techniques including substitution, integration by parts, and partial fractions. Complete practice problems 1-25.",
      course: "Mathematics",
      priority: "medium",
      dueDate: "2026-01-09",
      estimatedTime: 3,
      progress: 40,
      completed: false
    },
    {
      id: 3,
      title: "Physics Lab Report",
      description: "Write comprehensive lab report on Newton's laws experiment. Include data analysis, graphs, error calculations, and conclusions.",
      course: "Physics",
      priority: "high",
      dueDate: "2026-01-08",
      estimatedTime: 5,
      progress: 80,
      completed: false
    },
    {
      id: 4,
      title: "Read Psychology Chapters 4-5",
      description: "Complete reading on cognitive development and learning theories. Take detailed notes and prepare for discussion questions.",
      course: "Psychology",
      priority: "low",
      dueDate: "2026-01-12",
      estimatedTime: 2.5,
      progress: 20,
      completed: false
    },
    {
      id: 5,
      title: "Chemistry Problem Set",
      description: "Solve thermodynamics problems from textbook pages 245-260. Focus on enthalpy, entropy, and Gibbs free energy calculations.",
      course: "Chemistry",
      priority: "medium",
      dueDate: "2026-01-11",
      estimatedTime: 3.5,
      progress: 0,
      completed: false
    },
    {
      id: 6,
      title: "English Essay Draft",
      description: "Write first draft of literary analysis essay on Shakespeare\'s Hamlet. Focus on themes of revenge and madness. Minimum 1500 words.",
      course: "English Literature",
      priority: "high",
      dueDate: "2026-01-13",
      estimatedTime: 6,
      progress: 30,
      completed: false
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    course: 'all',
    priority: 'all',
    status: 'all',
    sortBy: 'dueDate'
  });

  const aiRecommendations = [
    {
      id: 1,
      type: "schedule",
      title: "Optimize Study Schedule",
      description: "Based on your peak productivity hours (9 AM - 12 PM), schedule high-priority tasks during this window for better focus and retention.",
      impact: "High",
      details: [
        "Move Data Structures assignment to morning slot",
        "Schedule Physics lab report for 9-11 AM tomorrow",
        "Reserve afternoons for lighter reading tasks"
      ]
    },
    {
      id: 2,
      type: "break",
      title: "Take Strategic Breaks",
      description: "You\'ve been studying for 3 hours straight. Research shows 25-minute study sessions with 5-minute breaks improve retention by 34%.",
      impact: "Medium",
      details: [
        "Use Pomodoro technique for next session",
        "Take 15-minute break every 2 hours",
        "Include physical activity during breaks"
      ]
    },
    {
      id: 3,
      type: "priority",
      title: "Adjust Task Priorities",
      description: "Physics lab report due in 1 day should be elevated to urgent priority. Consider delegating or postponing lower-priority tasks.",
      impact: "High",
      details: [
        "Focus on Physics lab report today",
        "Request extension for Psychology reading if needed",
        "Complete Chemistry problems after lab report"
      ]
    },
    {
      id: 4,
      type: "balance",
      title: "Balance Course Load",
      description: "You have 3 STEM assignments due this week. Consider spacing out similar subjects to prevent cognitive overload and maintain variety.",
      impact: "Medium",
      details: [
        "Alternate between technical and reading tasks",
        "Schedule English essay work between STEM subjects",
        "Use Psychology reading as mental break from calculations"
      ]
    }
  ];

  const stats = {
    totalTasks: tasks?.length,
    completedTasks: tasks?.filter(t => t?.completed)?.length,
    inProgressTasks: tasks?.filter(t => !t?.completed && t?.progress > 0)?.length,
    totalHours: tasks?.reduce((sum, task) => sum + parseFloat(task?.estimatedTime), 0)
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      course: 'all',
      priority: 'all',
      status: 'all',
      sortBy: 'dueDate'
    });
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (filters?.search) {
      filtered = filtered?.filter(task =>
        task?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        task?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.course !== 'all') {
      filtered = filtered?.filter(task => task?.course === filters?.course);
    }

    if (filters?.priority !== 'all') {
      filtered = filtered?.filter(task => task?.priority === filters?.priority);
    }

    if (filters?.status !== 'all') {
      if (filters?.status === 'completed') {
        filtered = filtered?.filter(task => task?.completed);
      } else if (filters?.status === 'in-progress') {
        filtered = filtered?.filter(task => !task?.completed && task?.progress > 0);
      } else if (filters?.status === 'pending') {
        filtered = filtered?.filter(task => !task?.completed && task?.progress === 0);
      }
    }

    filtered?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder?.[a?.priority] - priorityOrder?.[b?.priority];
        case 'progress':
          return b?.progress - a?.progress;
        case 'course':
          return a?.course?.localeCompare(b?.course);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const handleCreateTask = (taskData) => {
    const newTask = {
      id: tasks?.length + 1,
      ...taskData,
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskData) => {
    setTasks(prev =>
      prev?.map(task =>
        task?.id === editingTask?.id ? { ...task, ...taskData } : task
      )
    );
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev?.filter(task => task?.id !== taskId));
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prev =>
      prev?.map(task =>
        task?.id === taskId
          ? { ...task, completed: !task?.completed, progress: !task?.completed ? 100 : task?.progress }
          : task
      )
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleApplyRecommendation = (recommendation) => {
    console.log('Applying recommendation:', recommendation);
    alert(`Applied recommendation: ${recommendation?.title}`);
  };

  const handleTaskClick = (task) => {
    handleEditTask(task);
  };

  const filteredTasks = getFilteredTasks();

  return (
    <>
      <Helmet>
        <title>Study Planner - CampusMind AI</title>
        <meta name="description" content="Manage your academic tasks with AI-powered scheduling recommendations and intelligent study planning" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <MobileMenuToggle
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </div>

        <main className={`transition-smooth ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-60'} pt-20 lg:pt-0`}>
          <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-[1600px] mx-auto">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 md:mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                    Study Planner
                  </h1>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Organize your academic tasks with AI-powered insights
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    iconName={isSidebarCollapsed ? 'PanelLeftOpen' : 'PanelLeftClose'}
                    iconPosition="left"
                    className="hidden lg:flex"
                  >
                    {isSidebarCollapsed ? 'Expand' : 'Collapse'}
                  </Button>
                  <Button
                    variant="default"
                    size="default"
                    onClick={() => {
                      setEditingTask(null);
                      setShowTaskForm(true);
                    }}
                    iconName="Plus"
                    iconPosition="left"
                    fullWidth
                    className="lg:w-auto"
                  >
                    New Task
                  </Button>
                </div>
              </div>

              <div className="mb-6 md:mb-8">
                <StatsOverview stats={stats} />
              </div>

              <div className="mb-6 md:mb-8">
                <FilterBar
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Button
                  variant={activeView === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveView('list')}
                  iconName="List"
                  iconPosition="left"
                >
                  List View
                </Button>
                <Button
                  variant={activeView === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveView('calendar')}
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Calendar View
                </Button>
              </div>

              {showTaskForm && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
                  <div className="bg-card border border-border rounded-lg shadow-soft-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl md:text-2xl font-semibold text-foreground">
                        {editingTask ? 'Edit Task' : 'Create New Task'}
                      </h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setShowTaskForm(false);
                          setEditingTask(null);
                        }}
                        iconName="X"
                        iconSize={20}
                      />
                    </div>
                    <TaskForm
                      task={editingTask}
                      onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                      onCancel={() => {
                        setShowTaskForm(false);
                        setEditingTask(null);
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {activeView === 'list' ? (
                    <>
                      {filteredTasks?.length === 0 ? (
                        <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
                          <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-muted rounded-full mx-auto mb-4">
                            <Icon name="ListTodo" size={32} className="text-muted-foreground" />
                          </div>
                          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                            No tasks found
                          </h3>
                          <p className="text-sm md:text-base text-muted-foreground mb-6">
                            {filters?.search || filters?.course !== 'all' || filters?.priority !== 'all' || filters?.status !== 'all' ?'Try adjusting your filters or create a new task' :'Get started by creating your first study task'}
                          </p>
                          <Button
                            variant="default"
                            onClick={() => {
                              setEditingTask(null);
                              setShowTaskForm(true);
                            }}
                            iconName="Plus"
                            iconPosition="left"
                          >
                            Create Task
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredTasks?.map(task => (
                            <TaskCard
                              key={task?.id}
                              task={task}
                              onEdit={handleEditTask}
                              onDelete={handleDeleteTask}
                              onToggleComplete={handleToggleComplete}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <WeeklyCalendar tasks={tasks} onTaskClick={handleTaskClick} />
                  )}
                </div>

                <div className="space-y-6">
                  <AIRecommendationPanel
                    recommendations={aiRecommendations}
                    onApplyRecommendation={handleApplyRecommendation}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default StudyPlanner;