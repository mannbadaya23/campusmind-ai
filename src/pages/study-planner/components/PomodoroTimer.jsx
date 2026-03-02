import React, { useState, useEffect, useRef } from 'react';

const MODES = [
  { label: '🍅 Pomodoro', minutes: 25, color: 'from-red-500 to-rose-600' },
  { label: '☕ Short Break', minutes: 5, color: 'from-green-500 to-emerald-600' },
  { label: '🛌 Long Break', minutes: 15, color: 'from-blue-500 to-indigo-600' },
];

export default function PomodoroTimer() {
  const [modeIdx, setModeIdx] = useState(0);
  const [seconds, setSeconds] = useState(MODES[0].minutes * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  const mode = MODES[modeIdx];
  const total = mode.minutes * 60;
  const progress = ((total - seconds) / total) * 100;
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (modeIdx === 0) setSessions(p => p + 1);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const switchMode = (idx) => {
    setModeIdx(idx);
    setSeconds(MODES[idx].minutes * 60);
    setRunning(false);
  };

  const reset = () => {
    setSeconds(mode.minutes * 60);
    setRunning(false);
  };

  const circumference = 2 * Math.PI * 54;

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">🍅 Pomodoro Timer</h3>

      {/* Mode buttons */}
      <div className="flex gap-2 mb-6">
        {MODES.map((m, i) => (
          <button key={i} onClick={() => switchMode(i)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${modeIdx === i ? `bg-gradient-to-r ${m.color} text-white shadow-md` : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Timer circle */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-border)" strokeWidth="8" />
            <circle cx="60" cy="60" r="54" fill="none"
              stroke="url(#timerGrad)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 100) * circumference}
              style={{ transition: 'stroke-dashoffset 1s linear' }} />
            <defs>
              <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{mins}:{secs}</span>
            <span className="text-xs text-muted-foreground mt-1">{mode.label}</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-4">
        <button onClick={() => setRunning(r => !r)}
          className={`flex-1 py-3 rounded-xl font-medium text-white bg-gradient-to-r ${mode.color} hover:opacity-90 transition-all text-sm`}>
          {running ? '⏸ Pause' : '▶ Start'}
        </button>
        <button onClick={reset}
          className="px-4 py-3 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all text-sm">
          🔄 Reset
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">🍅 Sessions completed today: <span className="font-bold text-foreground">{sessions}</span></p>
      </div>
    </div>
  );
}
