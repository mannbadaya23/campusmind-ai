import React, { useState } from 'react';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SUBJECTS = ['Computer Science', 'Engineering', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Economics', 'Law'];

export default function AINotesTab() {
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [level, setLevel] = useState('Intermediate');
  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateNotes = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setNotes(null);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [{ text: `Generate comprehensive study notes for a college student on the topic: "${topic}" 
Subject: ${subject}
Level: ${level}

Format the notes as JSON with these keys:
- title: topic title
- summary: 2-3 sentence overview
- keyPoints: array of 5-7 important points (each as string)
- definitions: array of {term, definition} objects (3-5 key terms)
- examTips: array of 3-4 exam tips
- quickRevision: 3-4 bullet points for last-minute revision

Return ONLY valid JSON, no markdown.` }]
            }],
            generationConfig: { maxOutputTokens: 1000, temperature: 0.7 },
          }),
        }
      );
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const clean = text.replace(/```json|```/g, '').trim();
      setNotes(JSON.parse(clean));
    } catch (err) {
      setNotes({
        title: topic,
        summary: 'An important topic in ' + subject + ' that covers fundamental concepts and their applications.',
        keyPoints: ['Key concept 1', 'Key concept 2', 'Key concept 3', 'Key concept 4', 'Key concept 5'],
        definitions: [{ term: 'Term 1', definition: 'Definition here' }],
        examTips: ['Focus on fundamentals', 'Practice problems daily', 'Review past papers'],
        quickRevision: ['Point 1', 'Point 2', 'Point 3'],
      });
    } finally {
      setLoading(false);
    }
  };

  const copyNotes = () => {
    if (!notes) return;
    const text = `# ${notes.title}\n\n## Summary\n${notes.summary}\n\n## Key Points\n${notes.keyPoints.map(p => '• ' + p).join('\n')}\n\n## Key Terms\n${notes.definitions.map(d => `${d.term}: ${d.definition}`).join('\n')}\n\n## Exam Tips\n${notes.examTips.map(t => '• ' + t).join('\n')}\n\n## Quick Revision\n${notes.quickRevision.map(r => '• ' + r).join('\n')}`;
    navigator.clipboard.writeText(text);
    alert('Notes copied to clipboard! 📋');
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">🤖 AI Study Notes Generator</h2>
        <p className="text-sm text-muted-foreground">Enter any topic and get instant comprehensive study notes powered by AI</p>
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
          <button onClick={generateNotes} disabled={!topic.trim() || loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 disabled:opacity-40 transition-all">
            {loading ? '⏳ Generating Notes...' : '✨ Generate Study Notes'}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">AI is creating your study notes...</p>
        </div>
      )}

      {/* Notes output */}
      {notes && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">📝 {notes.title}</h3>
            <button onClick={copyNotes}
              className="text-sm px-4 py-2 rounded-xl border border-indigo-300 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all">
              📋 Copy Notes
            </button>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">📖 Overview</p>
            <p className="text-sm text-foreground">{notes.summary}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key Points */}
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-semibold text-foreground mb-3">🔑 Key Points</p>
              <ul className="space-y-2">
                {notes.keyPoints?.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Definitions */}
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm font-semibold text-foreground mb-3">📚 Key Terms</p>
              <div className="space-y-2">
                {notes.definitions?.map((d, i) => (
                  <div key={i} className="text-sm">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">{d.term}: </span>
                    <span className="text-muted-foreground">{d.definition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Tips */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <p className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-3">💡 Exam Tips</p>
              <ul className="space-y-1">
                {notes.examTips?.map((t, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-amber-500">•</span>{t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Revision */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-3">⚡ Quick Revision</p>
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
