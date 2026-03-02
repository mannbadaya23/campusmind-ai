import React, { useState, useRef, useEffect } from "react";
import Sidebar from "../../components/ui/Sidebar";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const QUICK_PROMPTS = [
  { label: "📅 Make my study schedule", prompt: "Create a detailed weekly study schedule for me. Ask me about my subjects, exams, and available hours first." },
  { label: "😰 I'm feeling overwhelmed", prompt: "I'm feeling really overwhelmed with studies and pressure. Help me manage this stress." },
  { label: "🧠 Help me focus better", prompt: "I'm having trouble focusing while studying. Give me practical tips to improve my concentration." },
  { label: "😴 Sleep & energy tips", prompt: "I'm not sleeping well due to study stress. Give me tips to improve sleep and maintain energy during exams." },
  { label: "📚 Plan my topics", prompt: "Help me plan which topics to study first and how to prioritize them for my exams." },
  { label: "💪 Motivate me!", prompt: "I'm losing motivation to study. Give me a motivational boost and some practical advice to get back on track." },
  { label: "🧘 Mental health tips", prompt: "Give me mental health tips for students dealing with academic pressure and anxiety." },
  { label: "⏰ Time management", prompt: "I struggle with time management as a student. Help me create a system that works." },
];

const SYSTEM_PROMPT = `You are CampusMind AI Coach, a highly supportive and expert AI assistant specifically designed for college and university students. You are like a caring senior mentor, therapist, and academic advisor all in one.

Your expertise covers:
1. STUDY PLANNING: Create personalized study schedules, topic prioritization, exam preparation strategies, subject-wise tips
2. MENTAL HEALTH: Help with stress, anxiety, overwhelm, burnout, loneliness, imposter syndrome — with empathy and practical advice
3. PHYSICAL WELLNESS: Sleep hygiene, exercise routines for students, nutrition tips, energy management
4. MOTIVATION: Inspire students, help with procrastination, goal setting, building confidence
5. ACADEMIC SUPPORT: Study techniques (Pomodoro, spaced repetition, active recall), note-taking, exam strategies
6. PRESSURE MANAGEMENT: Dealing with parental pressure, peer pressure, performance anxiety, fear of failure

Your personality:
- Warm, empathetic, and non-judgmental
- Like a caring senior who has been through it all
- Practical and actionable — always give specific steps
- Use emojis occasionally to keep it friendly
- Ask follow-up questions to personalize advice
- Keep responses concise but impactful (max 250 words unless making a schedule)
- Always end with an encouraging note or a question to continue the conversation

Remember: Students come to you when they're struggling. Be their safe space. 🌟`;

const BOT_AVATAR = (
  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 shadow-md">
    <span className="text-white text-sm font-bold">AI</span>
  </div>
);

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      {BOT_AVATAR}
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-2 h-2 rounded-full bg-indigo-400"
              style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-end gap-2 mb-4 ${isUser ? "flex-row-reverse" : ""}`}>
      {!isUser && BOT_AVATAR}
      {isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">U</span>
        </div>
      )}
      <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-sm"
          : "bg-card text-foreground border border-border rounded-bl-sm"
      }`}>
        {msg.text}
      </div>
    </div>
  );
}

export default function AICoach() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hey there! 👋 I'm your CampusMind AI Coach — your personal guide for studies, stress, mental health, and everything in between!\n\nI'm here to help you:\n📚 Plan your studies & topics\n😌 Manage stress & anxiety\n💪 Stay motivated & focused\n🧘 Take care of your mental health\n⏰ Master time management\n\nWhat's on your mind today? Tell me anything — I'm your safe space! 🌟",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState("chat");
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const TRACKS = [
    { name: "Lofi Study Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", emoji: "🎵" },
    { name: "Deep Focus", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", emoji: "🧠" },
    { name: "Calm Piano", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", emoji: "🎹" },
    { name: "White Noise", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", emoji: "🌊" },
  ];
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;
    setInput("");

    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const history = newMessages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: history,
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            generationConfig: { maxOutputTokens: 800, temperature: 0.8 },
          }),
        }
      );

      const data = await res.json();
      const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that. Please try again! 🙏";

      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "Oops! Something went wrong. Please check your connection. 😅" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: "bot",
      text: "Chat cleared! 🌟 How can I help you today?",
    }]);
  };

  return (
    <>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      <div className="flex h-screen bg-background overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-60"}`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md text-white/70 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <p className="text-white font-bold text-lg">CampusMind AI Coach</p>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <p className="text-white/80 text-xs">Online • Your personal mentor 🌟</p>
                </div>
              </div>
            </div>
            <button onClick={clearChat} className="text-white/70 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-all">
              🗑️ Clear
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="bg-card border-b border-border px-4 py-3">
            <p className="text-xs text-muted-foreground mb-2 font-medium">Quick Help:</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {QUICK_PROMPTS.map((qp) => (
                <button key={qp.label} onClick={() => sendMessage(qp.prompt)}
                  disabled={isLoading}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 transition-colors font-medium disabled:opacity-40">
                  {qp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            <div className="max-w-3xl mx-auto">
              {messages.map((msg, i) => (
                <Message key={i} msg={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="bg-card border-t border-border px-4 md:px-8 py-4">
            <div className="max-w-3xl mx-auto flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Talk to your AI Coach... (Enter to send, Shift+Enter for new line)"
                rows={1}
                className="flex-1 resize-none bg-muted text-foreground text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 placeholder-muted-foreground max-h-32 overflow-y-auto transition-all"
                style={{ lineHeight: "1.5" }}
              />
              <button onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
            {/* Focus Music Player */}
            <div className="mt-3 bg-muted/40 rounded-xl p-3 flex items-center gap-3">
              <span className="text-lg">{TRACKS[currentTrack].emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{TRACKS[currentTrack].name}</p>
                <p className="text-xs text-muted-foreground">Focus Music</p>
              </div>
              <div className="flex gap-1">
                {TRACKS.map((t, i) => (
                  <button key={i} onClick={() => { setCurrentTrack(i); setMusicPlaying(false); }}
                    className={`w-6 h-6 rounded-full text-xs flex items-center justify-center transition-all ${currentTrack === i ? 'bg-indigo-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                    {t.emoji}
                  </button>
                ))}
              </div>
              <button onClick={() => setMusicPlaying(p => !p)}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-sm hover:opacity-90">
                {musicPlaying ? '⏸' : '▶'}
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">Powered by Gemini AI • Your conversations are private 🔒</p>
          </div>
        </main>
      </div>
    </>
  );
}
