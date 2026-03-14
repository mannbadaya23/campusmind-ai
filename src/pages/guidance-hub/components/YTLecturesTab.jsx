import React, { useState } from "react";

const LECTURES = [
  { id: 1, title: "Complete DSA Course - Striver", channel: "take U forward", subject: "Computer Science", topic: "DSA", duration: "150+ hrs", views: "2.1M", thumbnail: "🖥️", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz", rating: 4.9, level: "Beginner to Advanced", color: "from-indigo-400 to-violet-500" },
  { id: 2, title: "GATE CS Full Course 2024", channel: "Gate Smashers", subject: "Computer Science", topic: "GATE Prep", duration: "200+ hrs", views: "1.5M", thumbnail: "🎯", url: "https://www.youtube.com/c/GateSmashers", rating: 4.8, level: "Intermediate", color: "from-blue-400 to-indigo-500" },
  { id: 3, title: "JEE Physics - Motion & Mechanics", channel: "Physics Wallah", subject: "Engineering", topic: "Physics", duration: "80 hrs", views: "5.2M", thumbnail: "⚡", url: "https://www.youtube.com/@PhysicsWallah", rating: 4.9, level: "Beginner", color: "from-amber-400 to-orange-500" },
  { id: 4, title: "NEET Biology Full Syllabus", channel: "Unacademy NEET", subject: "Medicine", topic: "Biology", duration: "120 hrs", views: "3.8M", thumbnail: "🧬", url: "https://www.youtube.com/@unacademyneetug", rating: 4.7, level: "Beginner to Advanced", color: "from-pink-400 to-rose-500" },
  { id: 5, title: "CAT Quantitative Aptitude", channel: "2IIM CAT", subject: "Business", topic: "Quant", duration: "60 hrs", views: "890K", thumbnail: "📊", url: "https://www.youtube.com/@2IIM", rating: 4.8, level: "Intermediate", color: "from-emerald-400 to-teal-500" },
  { id: 6, title: "Machine Learning Full Course", channel: "Andrej Karpathy", subject: "Computer Science", topic: "AI/ML", duration: "40 hrs", views: "1.2M", thumbnail: "🤖", url: "https://www.youtube.com/@AndrejKarpathy", rating: 5.0, level: "Intermediate", color: "from-violet-400 to-purple-500" },
  { id: 7, title: "Web Development Bootcamp 2024", channel: "Traversy Media", subject: "Computer Science", topic: "Web Dev", duration: "70 hrs", views: "4.5M", thumbnail: "🌐", url: "https://www.youtube.com/@TraversyMedia", rating: 4.9, level: "Beginner", color: "from-cyan-400 to-blue-500" },
  { id: 8, title: "Constitutional Law Lectures", channel: "LawSikho", subject: "Law", topic: "Constitutional Law", duration: "30 hrs", views: "340K", thumbnail: "⚖️", url: "https://www.youtube.com/@LawSikho", rating: 4.6, level: "Intermediate", color: "from-purple-400 to-violet-500" },
  { id: 9, title: "Organic Chemistry Full Course", channel: "Khan Academy", subject: "Chemistry", topic: "Organic Chemistry", duration: "50 hrs", views: "2.3M", thumbnail: "🧪", url: "https://www.youtube.com/playlist?list=PLSQl0a2vh4HC5feHa6Rc5c0wbRTx56nF7", rating: 4.8, level: "Beginner to Advanced", color: "from-green-400 to-emerald-500" },
  { id: 10, title: "Data Science with Python", channel: "freeCodeCamp", subject: "Computer Science", topic: "Data Science", duration: "90 hrs", views: "6.1M", thumbnail: "📈", url: "https://www.youtube.com/@freecodecamp", rating: 4.9, level: "Beginner", color: "from-rose-400 to-pink-500" },
];

const SUBJECTS = ["All", "Computer Science", "Engineering", "Medicine", "Business", "Law", "Chemistry"];
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

  const openVideo = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">🎥 YouTube Lecture Recommendations</h2>
        <p className="text-sm text-muted-foreground">Best free lectures curated by toppers and mentors — click to open directly on YouTube!</p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lectures, channels, topics..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400" />
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

      {/* Lectures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((lecture) => (
          <div key={lecture.id}
            className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
            onClick={() => openVideo(lecture.url)}>
            {/* Thumbnail */}
            <div className={`bg-gradient-to-r ${lecture.color} p-6 flex items-center justify-center`}>
              <span className="text-5xl">{lecture.thumbnail}</span>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-foreground text-sm leading-tight">{lecture.title}</h3>
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full flex-shrink-0">
                  ⭐ {lecture.rating}
                </span>
              </div>
              <p className="text-xs text-indigo-500 font-medium mb-3">📺 {lecture.channel}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">⏱️ {lecture.duration}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">👁️ {lecture.views}</span>
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">📊 {lecture.level}</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); openVideo(lecture.url); }}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2">
                ▶ Watch on YouTube
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No lectures found!</p>
          <p className="text-sm mt-1">Try different filters or search terms</p>
        </div>
      )}
    </div>
  );
}
