import React, { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import MentorsTab from "./components/MentorsTab";
import NotesTab from "./components/NotesTab";
import PYQsTab from "./components/PYQsTab";
import ImportantTopicsTab from "./components/ImportantTopicsTab";
import PracticeTab from "./components/PracticeTab";
import YTLecturesTab from "./components/YTLecturesTab";
import AINotesTab from "./components/AINotesTab";

const TABS = [
  { id: "mentors", label: "👨‍🏫 Mentors", icon: "🎓" },
  { id: "notes", label: "📝 Notes", icon: "📝" },
  { id: "pyqs", label: "📄 PYQs", icon: "📄" },
  { id: "topics", label: "⭐ Imp Topics", icon: "⭐" },
  { id: "practice", label: "💪 Practice", icon: "💪" },
  { id: "yt", label: "🎥 YT Lectures", icon: "🎥" },
  { id: "ainotes", label: "🤖 AI Notes", icon: "🤖" },
];

export default function GuidanceHub() {
  const [activeTab, setActiveTab] = useState("mentors");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "mentors": return <MentorsTab />;
      case "notes": return <NotesTab />;
      case "pyqs": return <PYQsTab />;
      case "topics": return <ImportantTopicsTab />;
      case "practice": return <PracticeTab />;
      case "yt": return <YTLecturesTab />;
      case "ainotes": return <AINotesTab />;
      default: return <MentorsTab />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <main className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-60"}`}>
        {/* Header */}
        <div className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md hover:bg-muted">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold font-heading text-foreground">Guidance Hub 🎓</h1>
              <p className="text-sm text-muted-foreground">Connect with mentors, access notes, PYQs & more</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}
