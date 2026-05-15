import React, { useState, useRef } from 'react';
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
  const usageRef = useRef(0);
  const [usageDisplay, setUsageDisplay] = useState(0);

  const generateNotes = async () => {
    if (!topic.trim()) return;
    if (usageRef.current >= FREE_LIMIT) {
      setShowProPopup(true);
      return;
    }

    setLoading(true);
    setNotes(null);
    setError('');

    try {
      const prompt = `You are an expert academic tutor. Generate comprehensive study notes.
Topic: "${topic}"
Subject: ${subject}
Level: ${level}
Return ONLY valid JSON (no markdown, no backticks):
{"title":"topic name","summary":"3-4 sentence overview","keyPoints":["point1","point2","point3","point4","point5"],"definitions":[{"term":"term1","definition":"def1"},{"term":"term2","definition":"def2"},{"term":"term3","definition":"def3"}],"examTips":["tip1","tip2","tip3"],"quickRevision":["point1","point2","point3"]}`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 1500, temperature: 0.4 },
          }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setNotes(parsed);
      usageRef.current += 1;
      setUsageDisplay(usageRef.current);
    } catch (err) {
      setError('Could not generate notes. Please try a more specific topic!');
    } finally {
      setLoading(false);
    }
  };

  const copyNotes = () => {
    if (!notes) return;
    const text = `# ${notes.title}\n\n## Summary\n${notes.summary}\n\n## Key Points\n${notes.keyPoints?.map(p => '• ' + p).join('\n')}\n\n## Key Terms\n${notes.definitions?.map(d => `${d.term}: ${d.definition}`).join('\n')}\n\n## Exam Tips\n${notes.examTips?.map(t => '• ' + t).join('\n')}\n\n## Quick Revision\n${notes.quickRevision?.map(r => '✓ ' + r).join('\n')}`;
    navigator.clipboard.writeText(text);
    alert('Notes copied!');
  };

  const remaining = FREE_LIMIT - usageDisplay;

  return (
    <div>
      {showProPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 p-6 text-white text-center">
              <p className="text-4xl mb-2">🔒</p>
              <h2 className="text-xl font-bold">Session Limit Reached!</h2>
              <p className="text-white/80 text-sm mt-1">You used all {FREE_LIMIT} free AI Notes this session</p>
            </div>
            <div className="p-5">
              {['Unlimited AI Notes', 'Unlimited AI Coach', 'Full PYQs Access', 'Advanced Analytics'].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground mb-2">
                  <span className="text-indigo-500">✓</span>{f}
                </div>
              ))}
              <button onClick={() => { setShowProPopup(false); navigate('/pricing'); }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold mt-3 mb-2">
                Upgrade to Pro — ₹99/month 🚀
              </button>
              <button onClick={() => setShowProPopup(false)}
                className="w-full py-2.5 rounded-xl border border-border text-muted-foreground text-sm">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">🤖 AI Study Notes Generator</h2>
          <p className="text-sm text-muted-foreground">Enter any topic and get instant comprehensive study notes</p>
        </div>
        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${remaining <= 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
          {remaining <= 0 ? '🔒 Limit reached' : `${remaining} free notes left`}
        </span>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 mb-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Topic / Chapter Name</label>
          <input value={topic} onChange={e => setTopic(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generateNotes()}
            placeholder="e.g. Binary Search Trees, Photosynthesis, Monopoly..."
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
        <button onClick={generateNotes} disabled={!topic.trim() || loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 disabled:opacity-40 transition-all">
          {loading ? '⏳ Generating...' : '✨ Generate Study Notes'}
        </button>
      </div>

      {error && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-600">⚠️ {error}</div>}

      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Generating your notes... (10-15 seconds)</p>
        </div>
      )}

      {notes && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">📝 {notes.title}</h3>
            <button onClick={copyNotes} className="text-sm px-4 py-2 rounded-xl border border-indigo-300 text-indigo-600 hover:bg-indigo-50">📋 Copy</button>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
            <p className="text-sm font-semibold text-indigo-600 mb-2">📖 Overview</p>
            <p className="text-sm text-foreground leading-relaxed">{notes.summary}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-semibold mb-3">🔑 Key Points</p>
              {notes.keyPoints?.map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs flex items-center justify-center flex-shrink-0">{i+1}</span>{p}
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-semibold mb-3">📚 Key Terms</p>
              {notes.definitions?.map((d, i) => (
                <div key={i} className="text-sm mb-2">
                  <span className="font-medium text-indigo-600">{d.term}: </span>
                  <span className="text-muted-foreground">{d.definition}</span>
                </div>
              ))}
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-700 mb-3">💡 Exam Tips</p>
              {notes.examTips?.map((t, i) => (
                <div key={i} className="text-sm text-muted-foreground mb-1 flex gap-2"><span className="text-amber-500">•</span>{t}</div>
              ))}
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-green-700 mb-3">⚡ Quick Revision</p>
              {notes.quickRevision?.map((r, i) => (
                <div key={i} className="text-sm text-muted-foreground mb-1 flex gap-2"><span className="text-green-500">✓</span>{r}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
