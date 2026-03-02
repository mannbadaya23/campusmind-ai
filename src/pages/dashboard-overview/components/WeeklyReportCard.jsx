import React, { useState } from 'react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function WeeklyReportCard() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [{ text: `Generate a motivating weekly academic performance report for a college student with these stats:
- Study hours this week: 42.5 hours
- Tasks completed: 24 out of 30
- Study streak: 12 days
- Productivity: 87%
- Stress level: 7/10
- Subjects studied: Data Structures, Maths, OS

Generate a report with:
1. Overall grade (A/B/C with emoji)
2. Top achievement (1 line)
3. Area to improve (1 line)
4. Motivational tip (1 line)
5. Next week goal (1 line)

Keep it short, friendly and motivating! Use emojis. Format as JSON with keys: grade, achievement, improve, tip, goal` }]
            }],
            generationConfig: { maxOutputTokens: 400, temperature: 0.8 },
          }),
        }
      );
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setReport(parsed);
    } catch (err) {
      setReport({
        grade: 'B+ 🌟',
        achievement: 'Completed 24/30 tasks with 87% productivity!',
        improve: 'Try to reduce stress levels through regular breaks',
        tip: 'Use Pomodoro technique for better focus',
        goal: 'Complete all 30 tasks next week!',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base md:text-lg font-semibold text-foreground">📊 Weekly Report Card</h3>
        <button onClick={generateReport} disabled={loading}
          className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 disabled:opacity-50">
          {loading ? '⏳ Generating...' : '✨ Generate AI Report'}
        </button>
      </div>

      {!report && !loading && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-4xl mb-3">📋</p>
          <p className="text-sm font-medium">Click "Generate AI Report" to get your weekly performance summary!</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm text-muted-foreground">AI is analyzing your week...</p>
        </div>
      )}

      {report && !loading && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl p-4 text-white text-center">
            <p className="text-sm opacity-80 mb-1">Your Weekly Grade</p>
            <p className="text-4xl font-bold">{report.grade}</p>
          </div>
          {[
            { icon: '🏆', label: 'Achievement', value: report.achievement, color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
            { icon: '📈', label: 'Improve', value: report.improve, color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' },
            { icon: '💡', label: 'Tip', value: report.tip, color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
            { icon: '🎯', label: 'Next Week Goal', value: report.goal, color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' },
          ].map(item => (
            <div key={item.label} className={`${item.color} border rounded-xl p-3`}>
              <p className="text-xs font-semibold text-muted-foreground mb-1">{item.icon} {item.label}</p>
              <p className="text-sm text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
