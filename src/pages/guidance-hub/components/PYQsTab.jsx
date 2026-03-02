import React, { useState, useRef } from "react";

const SAMPLE_PYQS = [
  { id: 1, title: "Data Structures & Algorithms - End Sem 2023", university: "IIT Delhi", subject: "Computer Science", semester: "End Sem", year: "2023", type: "PDF", downloads: 1240, likes: 345, color: "from-indigo-400 to-violet-500" },
  { id: 2, title: "Engineering Mathematics - Mid Sem 2024", university: "NIT Trichy", subject: "Engineering", semester: "Mid Sem", year: "2024", type: "PDF", downloads: 890, likes: 234, color: "from-blue-400 to-indigo-500" },
  { id: 3, title: "Organic Chemistry - End Sem 2023", university: "Delhi University", subject: "Science", semester: "End Sem", year: "2023", type: "JPG", downloads: 675, likes: 189, color: "from-pink-400 to-rose-500" },
  { id: 4, title: "Operating Systems - Mid Sem 2024", university: "BITS Pilani", subject: "Computer Science", semester: "Mid Sem", year: "2024", type: "PDF", downloads: 1100, likes: 310, color: "from-amber-400 to-orange-500" },
  { id: 5, title: "Constitutional Law - End Sem 2023", university: "NLU Delhi", subject: "Law", semester: "End Sem", year: "2023", type: "PDF", downloads: 445, likes: 123, color: "from-purple-400 to-violet-500" },
  { id: 6, title: "Microeconomics - Mid Sem 2024", university: "IIM Ahmedabad", subject: "Business", semester: "Mid Sem", year: "2024", type: "JPG", downloads: 780, likes: 210, color: "from-emerald-400 to-teal-500" },
];

const SUBJECTS = ["All", "Computer Science", "Engineering", "Science", "Business", "Law", "Medicine", "Arts"];
const SEMESTERS = ["All", "Mid Sem", "End Sem"];
const YEARS = ["All", "2024", "2023", "2022", "2021", "2020"];

export default function PYQsTab() {
  const [semester, setSemester] = useState("All");
  const [subject, setSubject] = useState("All");
  const [year, setYear] = useState("All");
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadData, setUploadData] = useState({ title: "", university: "", subject: "Computer Science", semester: "Mid Sem", year: "2024" });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef();

  const filtered = SAMPLE_PYQS.filter((p) => {
    const matchSemester = semester === "All" || p.semester === semester;
    const matchSubject = subject === "All" || p.subject === subject;
    const matchYear = year === "All" || p.year === year;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.university.toLowerCase().includes(search.toLowerCase());
    return matchSemester && matchSubject && matchYear && matchSearch;
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedFile(file);
  };

  const handleUpload = () => {
    if (!uploadedFile || !uploadData.title || !uploadData.university) return;
    setUploaded(true);
    setTimeout(() => {
      setShowUpload(false);
      setUploaded(false);
      setUploadedFile(null);
      setUploadData({ title: "", university: "", subject: "Computer Science", semester: "Mid Sem", year: "2024" });
    }, 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">📄 Previous Year Question Papers</h2>
          <p className="text-sm text-muted-foreground">College and university mid-sem and end-sem papers shared by students</p>
        </div>
        <button onClick={() => setShowUpload(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-all">
          + Upload Paper
        </button>
      </div>

      <div className="relative mb-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by paper name or university..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex gap-2">
          {SEMESTERS.map((s) => (
            <button key={s} onClick={() => setSemester(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${semester === s ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
              {s === "All" ? "📋 All" : s === "Mid Sem" ? "📝 Mid Sem" : "📄 End Sem"}
            </button>
          ))}
        </div>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}
          className="px-4 py-2 rounded-xl border border-border bg-card text-foreground text-sm outline-none">
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)}
          className="px-4 py-2 rounded-xl border border-border bg-card text-foreground text-sm outline-none">
          {YEARS.map((y) => <option key={y}>{y === "All" ? "All Years" : y}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total Papers", value: "1.2K+", icon: "📄" },
          { label: "Universities", value: "200+", icon: "🏫" },
          { label: "Downloads", value: "50K+", icon: "📥" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-2xl">{s.icon}</p>
            <p className="font-bold text-foreground text-lg">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((pyq) => (
          <div key={pyq.id} className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pyq.color} flex items-center justify-center text-white text-2xl flex-shrink-0`}>
                {pyq.type === "PDF" ? "📄" : "🖼️"}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm leading-tight">{pyq.title}</h3>
                <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">🏫 {pyq.university}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pyq.semester === "Mid Sem" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" : "bg-purple-100 dark:bg-purple-900/30 text-purple-600"}`}>
                    {pyq.semester === "Mid Sem" ? "📝 Mid Sem" : "📄 End Sem"}
                  </span>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">📅 {pyq.year}</span>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{pyq.type}</span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>📥 {pyq.downloads}</span>
                  <span>❤️ {pyq.likes}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-all">
                📥 Download {pyq.type}
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

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-3">📄</p>
          <p className="font-medium">No papers found</p>
          <p className="text-sm">Try different filters or upload a paper!</p>
        </div>
      )}

      {showUpload && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-t-2xl p-5 text-white">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Upload Question Paper 📄</h2>
                <button onClick={() => { setShowUpload(false); setUploadedFile(null); }} className="text-white/70 hover:text-white">✕</button>
              </div>
              <p className="text-white/80 text-sm mt-1">Share your college papers with everyone!</p>
            </div>
            <div className="p-5 space-y-4">
              {uploaded ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-3">✅</div>
                  <h3 className="font-bold text-lg text-foreground">Uploaded Successfully!</h3>
                  <p className="text-sm text-muted-foreground mt-1">Thank you for sharing! 🎉</p>
                </div>
              ) : (
                <>
                  <input placeholder="Paper title (e.g. Data Structures Mid Sem 2024)"
                    value={uploadData.title}
                    onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
                  <input placeholder="Your university/college name"
                    value={uploadData.university}
                    onChange={(e) => setUploadData({ ...uploadData, university: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
                  <div className="grid grid-cols-2 gap-3">
                    <select value={uploadData.subject} onChange={(e) => setUploadData({ ...uploadData, subject: e.target.value })}
                      className="px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none">
                      {SUBJECTS.filter(s => s !== "All").map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select value={uploadData.semester} onChange={(e) => setUploadData({ ...uploadData, semester: e.target.value })}
                      className="px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none">
                      <option>Mid Sem</option>
                      <option>End Sem</option>
                    </select>
                  </div>
                  <select value={uploadData.year} onChange={(e) => setUploadData({ ...uploadData, year: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none">
                    {YEARS.filter(y => y !== "All").map(y => <option key={y}>{y}</option>)}
                  </select>
                  <div onClick={() => fileRef.current.click()}
                    className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-all">
                    {uploadedFile ? (
                      <>
                        <p className="text-3xl mb-2">{uploadedFile.name.endsWith(".pdf") ? "📄" : "🖼️"}</p>
                        <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </>
                    ) : (
                      <>
                        <p className="text-3xl mb-2">📤</p>
                        <p className="text-sm font-medium text-foreground">Click to upload paper</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF or JPG/PNG • Max 20MB</p>
                      </>
                    )}
                    <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileChange}/>
                  </div>
                  <button onClick={handleUpload}
                    disabled={!uploadedFile || !uploadData.title || !uploadData.university}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    Upload Paper 🚀
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
