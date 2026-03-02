import React, { useState, useEffect } from 'react';

const INITIAL_EXAMS = [
  { id: 1, name: 'Data Structures Mid Sem', date: '2026-03-15', color: 'from-indigo-500 to-violet-600' },
  { id: 2, name: 'Engineering Maths End Sem', date: '2026-03-28', color: 'from-pink-500 to-rose-600' },
  { id: 3, name: 'Operating Systems', date: '2026-04-10', color: 'from-amber-500 to-orange-600' },
];

function getTimeLeft(dateStr) {
  const diff = new Date(dateStr) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
  };
}

export default function ExamCountdown() {
  const [exams, setExams] = useState(INITIAL_EXAMS);
  const [times, setTimes] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newExam, setNewExam] = useState({ name: '', date: '' });

  useEffect(() => {
    const update = () => {
      const t = {};
      exams.forEach(e => { t[e.id] = getTimeLeft(e.date); });
      setTimes(t);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [exams]);

  const addExam = () => {
    if (!newExam.name || !newExam.date) return;
    const colors = ['from-indigo-500 to-violet-600', 'from-pink-500 to-rose-600', 'from-emerald-500 to-teal-600', 'from-amber-500 to-orange-600'];
    setExams(prev => [...prev, { id: Date.now(), ...newExam, color: colors[prev.length % colors.length] }]);
    setNewExam({ name: '', date: '' });
    setShowAdd(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">⏰ Exam Countdown</h3>
        <button onClick={() => setShowAdd(!showAdd)}
          className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90">
          + Add Exam
        </button>
      </div>

      {showAdd && (
        <div className="mb-4 p-3 bg-muted/40 rounded-xl space-y-2">
          <input value={newExam.name} onChange={e => setNewExam(p => ({ ...p, name: e.target.value }))}
            placeholder="Exam name..." className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          <input type="date" value={newExam.date} onChange={e => setNewExam(p => ({ ...p, date: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          <button onClick={addExam} className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium">Add ✅</button>
        </div>
      )}

      <div className="space-y-3">
        {exams.map(exam => {
          const t = times[exam.id] || { days: 0, hours: 0, minutes: 0 };
          return (
            <div key={exam.id} className={`bg-gradient-to-r ${exam.color} rounded-xl p-4 text-white`}>
              <p className="font-semibold text-sm mb-2">{exam.name}</p>
              <div className="flex gap-3">
                {[['Days', t.days], ['Hours', t.hours], ['Mins', t.minutes]].map(([label, val]) => (
                  <div key={label} className="text-center bg-white/20 rounded-lg px-3 py-1.5">
                    <p className="text-xl font-bold">{val}</p>
                    <p className="text-xs opacity-80">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
