import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const SUBJECTS = ['Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Law', 'History', 'Geography'];
const FREE_LIMIT = 3;

export default function AINotesTab() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [level, setLevel] = useState('Intermediate');
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showProPopup, setShowProPopup] = useState(false);
  const [usageCount, setUsageCount] = useState(() => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('aiNotes_usage');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) return parsed.count;
    }
    return 0;
  });

  const updateUsage = () => {
    const today = new Date().toDateString();
    const newCount = usageCount + 1;
    localStorage.setItem('aiNotes_usage', JSON.stringify({ date: today, count: newCount }));
    setUsageCount(newCount);
  };

  const generateNotes = async () => {
    if (!topic.trim()) return;

    // Check free limit
    if (usageCount >= FREE_LIMIT) {
      setShowProPopup(true);
      return;
    }

    setLoading(true);
    setNotes(null);
    setError('');

    try {
      const prompt = `You are an expert academic tutor. Generate comprehensive, detailed study notes for a college student.

Topic: "${topic}"
Subject: ${subject}
Level: ${level}

Create thorough, accurate and educational notes. Return ONLY a valid JSON object with exactly these keys:
{
  "title": "exact topic name",
  "summary": "3-4 sentence detailed overview of the topic",
  "keyPoints": ["detailed point 1", "detailed point 2", "detailed point 3", "detailed point 4", "detailed point 5", "detailed point 6"],
  "definitions": [
    {"term": "term1", "definition": "clear detailed definition"},
    {"term": "term2", "definition": "clear detailed definition"},
    {"term": "term3", "definition": "clear detailed definition"}
  ],
  "examTips": ["specific exam tip 1", "specific exam tip 2", "specific exam tip 3", "specific exam tip 4"],
  "quickRevision": ["key revision point 1", "key revision point 2", "key revision point 3", "key revision point 4"]
}

IMPORTANT: Return ONLY the JSON. No markdown, no backticks, no extra text.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 2000, temperature: 0.5 },
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error.message || 'API error');
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setNotes(parsed);
      updateUsage();
    } catch (err) {
      console.error('AI Notes error:', err);
      setError('Failed to generate notes. Please try again with a more specific topic!');
    } finally {
      setLoading(false);
    }
  };

  const copyNotes = () => {
    if (!notes) return;
    const text = `# ${notes.title}\n\n## Summary\n${notes.summary}\n\n## Key Points\n${notes.keyPoints.map(p => '• ' + p).join('\n')}\n\n## Key Terms\n${notes.definitions.map(d => `${d.term}: ${d.definition}`).join('\n')}\n\n## Exam Tips\n${notes.examTips.map(t => '• ' + t).join('\n')}\n\n## Quick Revision\n${notes.quickRevision.map(r => '• ' + r).join('\n')}`;
    navigator.clipboard.writeText(text);
    alert('Notes copied! 📋');
  };

  return (
    <div>
      {/* Pro Popup */}
      {showProPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 p-6 text-white text-center">
              <p className="text-4xl mb-2">🔒</p>
              <h2 className="text-xl font-bold">Daily Limit Reached!</h2>
              <p className="text-white/80 text-sm mt-1">You have used all {FREE_LIMIT} free AI Notes today</p>
            </div>
            <div className="p-5">
              <div className="space-y-2 mb-4">
                {['Unlimited AI Notes generation', 'Unlimited AI Coach messages', 'Full PYQs access', 'Advanced analytics'].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-indigo-500">✓</span>{f}
                  </div>
                ))}
              </div>
              <button onClick={() => { setShowProPopup(false); navigate('/pricing'); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold mb-2">
                Upgrade to Pro — ₹99/month 🚀
              </button>
              <button onClick={() => setShowProPopup(false)}
                className="w-full py-2 rounded-xl border border-border text-muted-foreground text-sm">
                Try again tomorrow
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">🤖 AI Study Notes Generator</h2>
          <p className="text-sm text-muted-foreground">Enter any topic and get instant comprehensive study notes</p>
        </div>
        <div className={`text-xs px-3 py-1.5 rounded-full font-medium ${usageCount >= FREE_LIMIT ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {FREE_LIMIT - usageCount} free notes left today
        </div>
      </div>

      {/* Input */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Topic / Chapter Name</label>
            <input value={topic} onChange={e => setTopic(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && generateNotes()}
              placeholder="e.g. Binary Search Trees, Thermodynamics, Monopoly Market..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Subject</label>
              <select value={subject} onChange={e => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none">
                {SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Level</label>
              <select value={level} onChange={e => setLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none">
                {['Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={generateNotes} disabled={!topic.trim() || loading || usageCount >= FREE_LIMIT}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 disabled:opacity-40 transition-all">
            {loading ? '⏳ Generating Notes...' : usageCount >= FREE_LIMIT ? '🔒 Upgrade to Generate More' : '✨ Generate Study Notes'}
          </button>
          {usageCount >= FREE_LIMIT && (
            <p className="text-center text-xs text-muted-foreground">
              Daily limit reached — <button onClick={() => navigate('/pricing')} className="text-indigo-500 font-medium">Upgrade to Pro</button> for unlimited notes!
            </p>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">AI is creating your personalized study notes...</p>
          <p className="text-xs text-muted-foreground mt-1">This takes 10-15 seconds</p>
        </div>
      )}

      {/* Notes output */}
      {notes && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">📝 {notes.title}</h3>
            <button onClick={copyNotes}
              className="text-sm px-4 py-2 rounded-xl border border-indigo-300 text-indigo-600 hover:bg-indigo-50 transition-all">
              📋 Copy Notes
            </button>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
            <p className="text-sm font-semibold text-indigo-600 mb-2">📖 Overview</p>
            <p className="text-sm text-foreground leading-relaxed">{notes.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-semibold text-foreground mb-3">🔑 Key Points</p>
              <ul className="space-y-2">
                {notes.keyPoints?.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-semibold text-foreground mb-3">📚 Key Terms</p>
              <div className="space-y-2">
                {notes.definitions?.map((d, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-medium text-indigo-600">{d.term}: </span>
                    <span className="text-muted-foreground">{d.definition}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-700 mb-3">💡 Exam Tips</p>
              <ul className="space-y-1">
                {notes.examTips?.map((t, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-500">•</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-green-700 mb-3">⚡ Quick Revision</p>
              <ul className="space-y-1">
                {notes.quickRevision?.map((r, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-500">✓</span>{r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
