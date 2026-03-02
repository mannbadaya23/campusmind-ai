import React, { useState } from "react";

const NOTES = [
  { id: 1, title: "Data Structures Complete Notes", subject: "Computer Science", author: "Priya Sharma", university: "IIT Delhi", downloads: 1240, likes: 345, size: "2.4 MB", type: "PDF", date: "2 days ago", color: "from-indigo-400 to-violet-500" },
  { id: 2, title: "Operating Systems Hand Written Notes", subject: "Computer Science", author: "Rahul Gupta", university: "NIT Trichy", downloads: 890, likes: 234, size: "5.1 MB", type: "PDF", date: "1 week ago", color: "from-blue-400 to-indigo-500" },
  { id: 3, title: "Organic Chemistry Revision Notes", subject: "Science", author: "Anjali Singh", university: "DU", downloads: 675, likes: 189, size: "3.2 MB", type: "PDF", date: "3 days ago", color: "from-pink-400 to-rose-500" },
  { id: 4, title: "Engineering Mathematics Formula Sheet", subject: "Engineering", author: "Vikram Mehta", university: "BITS Pilani", downloads: 2100, likes: 567, size: "1.1 MB", type: "PDF", date: "5 days ago", color: "from-amber-400 to-orange-500" },
  { id: 5, title: "Constitutional Law Complete Notes", subject: "Law", author: "Sneha Patel", university: "NLU Delhi", downloads: 445, likes: 123, size: "4.5 MB", type: "PDF", date: "1 week ago", color: "from-purple-400 to-violet-500" },
  { id: 6, title: "Microeconomics Notes with Diagrams", subject: "Business", author: "Arjun Kumar", university: "IIM Ahmedabad", downloads: 780, likes: 210, size: "2.8 MB", type: "PDF", date: "4 days ago", color: "from-emerald-400 to-teal-500" },
];

const SUBJECTS = ["All", "Computer Science", "Engineering", "Science", "Business", "Law", "Medicine"];

export default function NotesTab() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [showUpload, setShowUpload] = useState(false);

  const filtered = NOTES.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.author.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subject === "All" || n.subject === subject;
    return matchSearch && matchSubject;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">📝 Study Notes</h2>
          <p className="text-sm text-muted-foreground">Community shared notes from top universities</p>
        </div>
        <button onClick={() => setShowUpload(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-all">
          + Upload Notes
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
        </div>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none">
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((note) => (
          <div key={note.id} className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${note.color} flex items-center justify-center text-white text-xl flex-shrink-0`}>
                📄
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm leading-tight">{note.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">by {note.author} • {note.university}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>📥 {note.downloads}</span>
                  <span>❤️ {note.likes}</span>
                  <span>📦 {note.size}</span>
                  <span>{note.date}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-all">
                📥 Download
              </button>
              <button className="px-3 py-2 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all text-sm">
                👁️ Preview
              </button>
              <button className="px-3 py-2 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all text-sm">
                ❤️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg text-foreground">Upload Notes 📝</h2>
              <button onClick={() => setShowUpload(false)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="space-y-3">
              <input placeholder="Notes title" className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
              <select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none">
                {SUBJECTS.filter(s => s !== "All").map(s => <option key={s}>{s}</option>)}
              </select>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-all">
                <p className="text-3xl mb-2">📄</p>
                <p className="text-sm font-medium text-foreground">Drop your PDF here</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, DOC • Max 20MB</p>
              </div>
              <button onClick={() => setShowUpload(false)} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium">
                Upload Notes 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
