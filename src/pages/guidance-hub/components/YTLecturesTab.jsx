import React, { useState } from "react";

const LECTURES = [
  { id: 1, title: "Complete DSA Course - Striver", channel: "take U forward", subject: "Computer Science", topic: "DSA", duration: "150+ hrs", views: "2.1M", thumbnail: "🖥️", url: "https://youtube.com", rating: 4.9, level: "Beginner to Advanced", color: "from-indigo-400 to-violet-500" },
  { id: 2, title: "GATE CS Full Course 2024", channel: "Gate Smashers", subject: "Computer Science", topic: "GATE Prep", duration: "200+ hrs", views: "1.5M", thumbnail: "🎯", url: "https://youtube.com", rating: 4.8, level: "Intermediate", color: "from-blue-400 to-indigo-500" },
  { id: 3, title: "JEE Physics - Motion & Mechanics", channel: "Physics Wallah", subject: "Engineering", topic: "Physics", duration: "80 hrs", views: "5.2M", thumbnail: "⚡", url: "https://youtube.com", rating: 4.9, level: "Beginner", color: "from-amber-400 to-orange-500" },
  { id: 4, title: "NEET Biology Full Syllabus", channel: "Unacademy NEET", subject: "Medicine", topic: "Biology", duration: "120 hrs", views: "3.8M", thumbnail: "🧬", url: "https://youtube.com", rating: 4.7, level: "Beginner to Advanced", color: "from-pink-400 to-rose-500" },
  { id: 5, title: "CAT Quantitative Aptitude", channel: "2IIM CAT", subject: "Business", topic: "Quant", duration: "60 hrs", views: "890K", thumbnail: "📊", url: "https://youtube.com", rating: 4.8, level: "Intermediate", color: "from-emerald-400 to-teal-500" },
  { id: 6, title: "Machine Learning Full Course", channel: "Andrej Karpathy", subject: "Computer Science", topic: "AI/ML", duration: "40 hrs", views: "1.2M", thumbnail: "🤖", url: "https://youtube.com", rating: 5.0, level: "Intermediate", color: "from-violet-400 to-purple-500" },
  { id: 7, title: "Web Development Bootcamp 2024", channel: "Traversy Media", subject: "Computer Science", topic: "Web Dev", duration: "70 hrs", views: "4.5M", thumbnail: "🌐", url: "https://youtube.com", rating: 4.9, level: "Beginner", color: "from-cyan-400 to-blue-500" },
  { id: 8, title: "Constitutional Law Lectures", channel: "LawSikho", subject: "Law", topic: "Constitutional Law", duration: "30 hrs", views: "340K", thumbnail: "⚖️", url: "https://youtube.com", rating: 4.6, level: "Intermediate", color: "from-purple-400 to-violet-500" },
];

const SUBJECTS = ["All", "Computer Science", "Engineering", "Medicine", "Business", "Law"];
const LEVELS = ["All Levels", "Beginner", "Intermediate", "Beginner to Advanced"];

export default function YTLecturesTab() {
  const [subject, setSubject] = useState("All");
  const [level, setLevel] = useState("All Levels");
  const [search, setSearch] = useState("");

  const filtered = LECTURES.filter((l) => {
    const matchSubject = subject === "All" || l.subject === subject;
    const matchLevel = level === "All Levels" || l.level === level;
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.channel.toLowerCase().includes(search.toLowerCase()) ||
      l.topic.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchLevel && matchSearch;
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">🎥 YouTube Lecture Recommendations</h2>
        <p className="text-sm text-muted-foreground">Best free lectures curated by toppers and mentors</p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lectures, channels, topics..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
        </div>
        <select value={level} onChange={(e) => setLevel(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none">
          {LEVELS.map((l) => <option key={l}>{l}</option>)}
        </select>
      </div>

      {/* Subject Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {SUBJECTS.map((s) => (
          <button key={s} onClick={() => setSubject(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${subject === s ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Lecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((lecture) => (
          <div key={lecture.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            {/* Thumbnail */}
            <div className={`bg-gradient-to-br ${lecture.color} h-32 flex items-center justify-center text-6xl`}>
              {lecture.thumbnail}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-foreground text-sm leading-tight">{lecture.title}</h3>
                <span className="text-amber-500 text-sm flex-shrink-0">⭐ {lecture.rating}</span>
              </div>
              <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1 font-medium">📺 {lecture.channel}</p>

              <div className="flex flex-wrap gap-2 mt-2 text-xs text-muted-foreground">
                <span>⏱️ {lecture.duration}</span>
                <span>👁️ {lecture.views} views</span>
                <span className="bg-muted px-2 py-0.5 rounded-full">{lecture.level}</span>
              </div>

              <div className="flex gap-2 mt-3">
                <a href={lecture.url} target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium hover:opacity-90 transition-all text-center">
                  ▶️ Watch on YouTube
                </a>
                <button className="px-3 py-2 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all text-sm">
                  🔖 Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-3">🎥</p>
          <p className="font-medium">No lectures found</p>
          <p className="text-sm">Try a different search or filter</p>
        </div>
      )}
    </div>
  );
}
