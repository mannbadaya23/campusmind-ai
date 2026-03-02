import React, { useState } from 'react';

const DEFAULT_HABITS = [
  { id: 1, name: 'Study 4+ hours', icon: '📚', completed: false },
  { id: 2, name: 'Exercise / Walk', icon: '🏃', completed: false },
  { id: 3, name: 'Sleep 7+ hours', icon: '😴', completed: false },
  { id: 4, name: 'No social media during study', icon: '📵', completed: false },
  { id: 5, name: 'Drink 8 glasses water', icon: '💧', completed: false },
  { id: 6, name: 'Meditate 10 mins', icon: '🧘', completed: false },
];

export default function HabitTracker() {
  const [habits, setHabits] = useState(DEFAULT_HABITS);
  const [newHabit, setNewHabit] = useState('');

  const toggle = (id) => setHabits(h => h.map(x => x.id === id ? { ...x, completed: !x.completed } : x));
  const completed = habits.filter(h => h.completed).length;
  const percent = Math.round((completed / habits.length) * 100);

  const addHabit = () => {
    if (!newHabit.trim()) return;
    setHabits(h => [...h, { id: Date.now(), name: newHabit.trim(), icon: '✅', completed: false }]);
    setNewHabit('');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">🌱 Daily Habit Tracker</h3>
        <span className="text-sm font-bold text-indigo-500">{completed}/{habits.length}</span>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Today's Progress</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500"
            style={{ width: `${percent}%` }} />
        </div>
        {percent === 100 && <p className="text-xs text-center text-green-500 font-medium mt-2">🎉 All habits done! Amazing!</p>}
      </div>

      {/* Habits list */}
      <div className="space-y-2 mb-4">
        {habits.map(habit => (
          <div key={habit.id} onClick={() => toggle(habit.id)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${habit.completed ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-muted/40 hover:bg-muted/70'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${habit.completed ? 'bg-green-500' : 'border-2 border-muted-foreground'}`}>
              {habit.completed && <span className="text-white text-xs">✓</span>}
            </div>
            <span className="text-lg">{habit.icon}</span>
            <span className={`text-sm flex-1 ${habit.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{habit.name}</span>
          </div>
        ))}
      </div>

      {/* Add habit */}
      <div className="flex gap-2">
        <input value={newHabit} onChange={e => setNewHabit(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addHabit()}
          placeholder="Add new habit..."
          className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
        <button onClick={addHabit}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90">
          +
        </button>
      </div>
    </div>
  );
}
