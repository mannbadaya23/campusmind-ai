import React, { useState } from "react";

const PRACTICE_SETS = [
  { id: 1, title: "DSA - Arrays & Strings", questions: 50, difficulty: "Mixed", completed: 0, subject: "Computer Science", color: "from-indigo-400 to-violet-500", time: "45 min" },
  { id: 2, title: "Quantitative Aptitude - CAT Level", questions: 30, difficulty: "Hard", completed: 0, subject: "Business", color: "from-amber-400 to-orange-500", time: "60 min" },
  { id: 3, title: "NEET Biology Mock Test", questions: 90, difficulty: "Medium", completed: 0, subject: "Medicine", color: "from-pink-400 to-rose-500", time: "90 min" },
  { id: 4, title: "JEE Physics - Mechanics", questions: 40, difficulty: "Hard", completed: 0, subject: "Engineering", color: "from-blue-400 to-indigo-500", time: "50 min" },
  { id: 5, title: "GATE - Digital Logic", questions: 35, difficulty: "Medium", completed: 0, subject: "Computer Science", color: "from-emerald-400 to-teal-500", time: "40 min" },
  { id: 6, title: "Verbal Ability - Reading Comprehension", questions: 25, difficulty: "Easy", completed: 0, subject: "General", color: "from-purple-400 to-violet-500", time: "30 min" },
];

const DIFFICULTY_COLOR = {
  "Easy": "bg-green-100 dark:bg-green-900/30 text-green-600",
  "Medium": "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
  "Hard": "bg-red-100 dark:bg-red-900/30 text-red-600",
  "Mixed": "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
};

export default function PracticeTab() {
  const [activeSet, setActiveSet] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const SAMPLE_QUESTIONS = [
    {
      q: "What is the time complexity of Binary Search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: 1,
      explanation: "Binary Search divides the search space in half each time, giving O(log n) complexity.",
    },
    {
      q: "Which data structure uses LIFO principle?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      answer: 1,
      explanation: "Stack uses Last In First Out (LIFO) — the last element added is the first to be removed.",
    },
    {
      q: "What does RAM stand for?",
      options: ["Read Access Memory", "Random Access Memory", "Read All Memory", "Random All Memory"],
      answer: 1,
      explanation: "RAM stands for Random Access Memory — it's the primary memory used by programs.",
    },
  ];

  if (activeSet) {
    const q = SAMPLE_QUESTIONS[currentQ % SAMPLE_QUESTIONS.length];
    return (
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => { setActiveSet(null); setCurrentQ(0); setSelected(null); setShowResult(false); }}
            className="p-2 rounded-xl border border-border hover:bg-muted transition-all">
            ← Back
          </button>
          <h2 className="font-bold text-foreground">{activeSet.title}</h2>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground">
          <span>Question {currentQ + 1} of {activeSet.questions}</span>
          <span>⏱️ {activeSet.time}</span>
        </div>
        <div className="h-2 bg-muted rounded-full mb-6">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all"
            style={{ width: `${((currentQ + 1) / activeSet.questions) * 100}%` }}/>
        </div>

        {/* Question */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-4">
          <p className="font-semibold text-foreground text-lg mb-6">{q.q}</p>
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => { setSelected(i); setShowResult(true); }}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm ${
                  selected !== null
                    ? i === q.answer ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700"
                    : i === selected && selected !== q.answer ? "border-red-400 bg-red-50 dark:bg-red-900/20 text-red-700"
                    : "border-border text-muted-foreground"
                  : "border-border hover:border-indigo-400 text-foreground"
                }`}>
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-300">💡 Explanation</p>
              <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">{q.explanation}</p>
            </div>
          )}
        </div>

        {showResult && (
          <button onClick={() => { setCurrentQ(prev => prev + 1); setSelected(null); setShowResult(false); }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 transition-all">
            Next Question →
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">💪 Practice Sets</h2>
        <p className="text-sm text-muted-foreground">Sharpen your skills with curated practice questions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRACTICE_SETS.map((set) => {
          const progress = Math.round((set.completed / set.questions) * 100);
          const isCompleted = set.completed === set.questions;
          return (
            <div key={set.id} className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${set.color} flex items-center justify-center text-white text-xl flex-shrink-0`}>
                  💪
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">{set.title}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${DIFFICULTY_COLOR[set.difficulty]}`}>{set.difficulty}</span>
                    <span className="text-xs text-muted-foreground">⏱️ {set.time}</span>
                    <span className="text-xs text-muted-foreground">❓ {set.questions} Qs</span>
                  </div>
                </div>
                {isCompleted && <span className="text-green-500 text-xl">✅</span>}
              </div>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{set.completed}/{set.questions} completed</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all"
                    style={{ width: `${progress}%` }}/>
                </div>
              </div>

              <button onClick={() => setActiveSet(set)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-all">
                {set.completed > 0 ? "▶️ Continue" : "🚀 Start Practice"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
