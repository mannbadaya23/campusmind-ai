import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_NOTES = [
  { id: 1, title: 'Data Structures Complete Notes', author: 'Priya Sharma', university: 'IIT Delhi', subject: 'Computer Science', downloads: 1240, likes: 345, size: '2.4 MB', uploadedAt: '2 days ago', color: 'from-indigo-400 to-violet-500', emoji: '💻' },
  { id: 2, title: 'Operating Systems Hand Written Notes', author: 'Rahul Gupta', university: 'NIT Trichy', subject: 'Computer Science', downloads: 890, likes: 234, size: '5.1 MB', uploadedAt: '1 week ago', color: 'from-blue-400 to-indigo-500', emoji: '🖥️' },
  { id: 3, title: 'Organic Chemistry Revision Notes', author: 'Anjali Singh', university: 'Delhi University', subject: 'Chemistry', downloads: 675, likes: 189, size: '3.2 MB', uploadedAt: '3 days ago', color: 'from-pink-400 to-rose-500', emoji: '🧪' },
  { id: 4, title: 'Engineering Mathematics Formula Sheet', author: 'Vikram Mehta', university: 'BITS Pilani', subject: 'Mathematics', downloads: 2100, likes: 567, size: '1.1 MB', uploadedAt: '5 days ago', color: 'from-amber-400 to-orange-500', emoji: '📐' },
  { id: 5, title: 'Constitutional Law Complete Notes', author: 'Sneha Patel', university: 'NLU Delhi', subject: 'Law', downloads: 445, likes: 123, size: '4.5 MB', uploadedAt: '1 week ago', color: 'from-purple-400 to-violet-500', emoji: '⚖️' },
  { id: 6, title: 'Microeconomics Notes with Diagrams', author: 'Arjun Kumar', university: 'IIM Ahmedabad', subject: 'Economics', downloads: 780, likes: 210, size: '2.8 MB', uploadedAt: '4 days ago', color: 'from-green-400 to-emerald-500', emoji: '📈' },
];

const SUBJECTS = ['All', 'Computer Science', 'Mathematics', 'Chemistry', 'Physics', 'Law', 'Economics', 'Biology'];

export default function NotesTab() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [showUpload, setShowUpload] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', subject: 'Computer Science', description: '' });
  const [liked, setLiked] = useState({});

  const filtered = DEFAULT_NOTES.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.author.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subject === 'All' || n.subject === subject;
    return matchSearch && matchSubject;
  });

  const handleUpload = () => {
    if (!newNote.title) return;
    setUploaded(true);
    setTimeout(() => {
      setShowUpload(false);
      setUploaded(false);
      setNewNote({ title: '', subject: 'Computer Science', description: '' });
    }, 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">📚 Notes Repository</h2>
          <p className="text-sm text-muted-foreground">Study notes shared by toppers from top universities</p>
        </div>
        <button onClick={() => setShowUpload(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90">
          + Upload Notes
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search notes, authors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
        </div>
        <select value={subject} onChange={e => setSubject(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none">
          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[{ label: 'Notes Available', value: '500+', icon: '📝' }, { label: 'Universities', value: '80+', icon: '🏫' }, { label: 'Downloads', value: '50K+', icon: '⬇️' }].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-xl">{s.icon}</p>
            <p className="font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(note => (
          <div key={note.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
            <div className={`bg-gradient-to-r ${note.color} p-4 flex items-center gap-3`}>
              <span className="text-3xl">{note.emoji}</span>
              <div>
                <p className="text-white font-bold text-sm">{note.title}</p>
                <p className="text-white/70 text-xs">by {note.author} • {note.university}</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>⬇️ {note.downloads}</span>
                <span>❤️ {note.likes}</span>
                <span>📦 {note.size}</span>
                <span>🕒 {note.uploadedAt}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => alert('Download feature coming soon! 🚀')}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90">
                  📥 Download
                </button>
                <button onClick={() => alert('Preview coming soon! 👀')}
                  className="px-3 py-2 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted">
                  👁️ Preview
                </button>
                <button onClick={() => setLiked(p => ({ ...p, [note.id]: !p[note.id] }))}
                  className={`px-3 py-2 rounded-xl border text-sm ${liked[note.id] ? 'border-red-300 text-red-500 bg-red-50' : 'border-border text-muted-foreground hover:bg-muted'}`}>
                  {liked[note.id] ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-muted-foreground">No notes found! Try different search terms.</p>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 p-5 text-white">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">📤 Upload Notes</h2>
                <button onClick={() => setShowUpload(false)} className="text-white/70 hover:text-white">✕</button>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {uploaded ? (
                <div className="text-center py-6">
                  <p className="text-5xl mb-3">🎉</p>
                  <h3 className="font-bold text-lg text-foreground">Notes Uploaded!</h3>
                  <p className="text-sm text-muted-foreground">Your notes will be reviewed and published soon!</p>
                </div>
              ) : (
                <>
                  <input placeholder="Notes title (e.g. Data Structures Complete Notes)"
                    value={newNote.title} onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
                  <select value={newNote.subject} onChange={e => setNewNote({ ...newNote, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none">
                    {SUBJECTS.filter(s => s !== 'All').map(s => <option key={s}>{s}</option>)}
                  </select>
                  <textarea placeholder="Brief description of your notes..."
                    value={newNote.description} onChange={e => setNewNote({ ...newNote, description: e.target.value })}
                    rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400 resize-none" />
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center text-muted-foreground text-sm">
                    <p className="text-2xl mb-2">📁</p>
                    <p>Click to upload PDF or image</p>
                    <p className="text-xs mt-1">Max 10MB</p>
                  </div>
                  <button onClick={handleUpload} disabled={!newNote.title}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 disabled:opacity-40">
                    Upload Notes 🚀
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
