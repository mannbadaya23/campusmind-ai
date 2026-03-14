import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';

const MOODS = [
  { emoji: '😄', label: 'Great', value: 5, color: 'bg-green-100 dark:bg-green-900/30 border-green-400' },
  { emoji: '🙂', label: 'Good', value: 4, color: 'bg-lime-100 dark:bg-lime-900/30 border-lime-400' },
  { emoji: '😐', label: 'Okay', value: 3, color: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-400' },
  { emoji: '😔', label: 'Low', value: 2, color: 'bg-orange-100 dark:bg-orange-900/30 border-orange-400' },
  { emoji: '😢', label: 'Terrible', value: 1, color: 'bg-red-100 dark:bg-red-900/30 border-red-400' },
];

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function MoodTracker() {
  const { saveMood, loadMoodHistory } = useFirestore();
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');
  const [logged, setLogged] = useState(false);
  const [history, setHistory] = useState([null, null, null, null, null, null, null]);
  const [saving, setSaving] = useState(false);

  // Load mood history from Firestore
  useEffect(() => {
    const fetch = async () => {
      const logs = await loadMoodHistory();
      if (logs && logs.length > 0) {
        // Map last 7 days
        const today = new Date();
        const week = Array(7).fill(null).map((_, i) => {
          const d = new Date(today);
          d.setDate(today.getDate() - (6 - i));
          const dateStr = d.toISOString().split('T')[0];
          const log = logs.find(l => l.date === dateStr);
          return log ? log.moodValue : null;
        });
        setHistory(week);

        // Check if already logged today
        const todayStr = today.toISOString().split('T')[0];
        const todayLog = logs.find(l => l.date === todayStr);
        if (todayLog) {
          const mood = MOODS.find(m => m.value === todayLog.moodValue);
          setSelected(mood);
          setLogged(true);
        }
      }
    };
    fetch();
  }, []);

  const logMood = async () => {
    if (!selected) return;
    setSaving(true);
    await saveMood(selected.value, note);
    // Update local history
    const newHistory = [...history];
    newHistory[6] = selected.value;
    setHistory(newHistory);
    setLogged(true);
    setSaving(false);
    setTimeout(() => setLogged(false), 3000);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">😊 Daily Mood Tracker</h3>

      <p className="text-sm text-muted-foreground mb-3">How are you feeling today?</p>
      <div className="flex gap-2 mb-4">
        {MOODS.map(mood => (
          <button key={mood.value} onClick={() => { setSelected(mood); setLogged(false); }}
            className={`flex-1 flex flex-col items-center p-3 rounded-xl border-2 transition-all ${selected?.value === mood.value ? mood.color + ' border-2' : 'border-transparent bg-muted/40 hover:bg-muted/70'}`}>
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs mt-1 text-foreground">{mood.label}</span>
          </button>
        ))}
      </div>

      {selected && (
        <>
          <textarea value={note} onChange={e => setNote(e.target.value)}
            placeholder="What's on your mind? (optional)"
            rows={2}
            className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400 resize-none mb-3" />
          <button onClick={logMood} disabled={saving}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 mb-4 disabled:opacity-60">
            {saving ? '⏳ Saving...' : logged ? '✅ Mood Saved!' : 'Log My Mood'}
          </button>
        </>
      )}

      {/* Weekly history */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-2">This Week</p>
        <div className="flex gap-2">
          {WEEK_DAYS.map((day, i) => {
            const val = history[i];
            const mood = MOODS.find(m => m.value === val);
            return (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-lg ${val ? 'bg-muted/60' : 'bg-muted/20'}`}>
                  {mood ? mood.emoji : <span className="text-muted-foreground text-xs">—</span>}
                </div>
                <span className="text-xs text-muted-foreground mt-1">{day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
