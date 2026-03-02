import React, { useState } from "react";

const TOPICS = {
  "Computer Science": [
    { topic: "Arrays & Strings", importance: "Very High", asked: "95%", subtopics: ["Two Pointers", "Sliding Window", "Kadane's Algorithm"], done: false },
    { topic: "Linked Lists", importance: "High", asked: "88%", subtopics: ["Reversal", "Cycle Detection", "Merge Lists"], done: false },
    { topic: "Trees & Graphs", importance: "Very High", asked: "92%", subtopics: ["BFS/DFS", "BST", "Dijkstra"], done: true },
    { topic: "Dynamic Programming", importance: "Very High", asked: "90%", subtopics: ["Memoization", "Tabulation", "LCS/LIS"], done: false },
    { topic: "System Design", importance: "High", asked: "85%", subtopics: ["Load Balancing", "Caching", "Databases"], done: false },
    { topic: "OS Concepts", importance: "Medium", asked: "75%", subtopics: ["Processes", "Threads", "Deadlocks"], done: true },
  ],
  "Engineering": [
    { topic: "Signals & Systems", importance: "Very High", asked: "90%", subtopics: ["Fourier Transform", "Laplace", "Z-Transform"], done: false },
    { topic: "Control Systems", importance: "High", asked: "85%", subtopics: ["Transfer Functions", "Root Locus", "Bode Plot"], done: false },
    { topic: "Digital Electronics", importance: "High", asked: "88%", subtopics: ["Logic Gates", "Flip Flops", "Counters"], done: true },
    { topic: "Electromagnetic Theory", importance: "Medium", asked: "70%", subtopics: ["Maxwell Equations", "Wave Propagation"], done: false },
  ],
  "Medicine": [
    { topic: "Anatomy - Upper Limb", importance: "Very High", asked: "95%", subtopics: ["Brachial Plexus", "Rotator Cuff", "Cubital Fossa"], done: false },
    { topic: "Biochemistry - Enzymes", importance: "High", asked: "88%", subtopics: ["Km & Vmax", "Inhibition", "Allosteric Regulation"], done: true },
    { topic: "Physiology - CVS", importance: "Very High", asked: "92%", subtopics: ["Cardiac Cycle", "ECG", "Blood Pressure"], done: false },
  ],
  "Business": [
    { topic: "Financial Accounting", importance: "Very High", asked: "90%", subtopics: ["Balance Sheet", "P&L", "Cash Flow"], done: false },
    { topic: "Marketing Management", importance: "High", asked: "85%", subtopics: ["4Ps", "STP", "Brand Management"], done: true },
    { topic: "Operations Management", importance: "Medium", asked: "75%", subtopics: ["Supply Chain", "Inventory", "Quality"], done: false },
  ],
};

const SUBJECTS = Object.keys(TOPICS);
const IMPORTANCE_COLOR = {
  "Very High": "bg-red-100 dark:bg-red-900/30 text-red-600",
  "High": "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
  "Medium": "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
};

export default function ImportantTopicsTab() {
  const [subject, setSubject] = useState("Computer Science");
  const [done, setDone] = useState({});

  const topics = TOPICS[subject] || [];
  const completedCount = topics.filter((_, i) => done[`${subject}-${i}`] !== undefined ? done[`${subject}-${i}`] : _.done).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">⭐ Important Topics</h2>
        <p className="text-sm text-muted-foreground">Most asked topics in exams — curated by toppers</p>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {SUBJECTS.map((s) => (
          <button key={s} onClick={() => setSubject(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${subject === s ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Your Progress</span>
          <span className="text-sm text-muted-foreground">{completedCount}/{topics.length} completed</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / topics.length) * 100}%` }}/>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-3">
        {topics.map((t, i) => {
          const isDone = done[`${subject}-${i}`] !== undefined ? done[`${subject}-${i}`] : t.done;
          return (
            <div key={i} className={`bg-card border rounded-2xl p-4 transition-all ${isDone ? "border-green-300 dark:border-green-800 opacity-75" : "border-border hover:shadow-md"}`}>
              <div className="flex items-start gap-3">
                <button onClick={() => setDone(prev => ({ ...prev, [`${subject}-${i}`]: !isDone }))}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${isDone ? "border-green-500 bg-green-500 text-white" : "border-border hover:border-indigo-400"}`}>
                  {isDone && "✓"}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-semibold text-sm ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>{t.topic}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${IMPORTANCE_COLOR[t.importance]}`}>{t.importance}</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Asked in {t.asked} exams</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {t.subtopics.map((s) => (
                      <span key={s} className="text-xs px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all">📝 Notes</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-all">🎥 Video</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
