import React, { useState } from "react";

const SUBJECTS = ["All", "Computer Science", "Engineering", "Medicine", "Business", "Arts", "Law", "Science"];

const MOCK_MENTORS = [
  {
    id: 1,
    name: "Priya Sharma",
    university: "IIT Delhi",
    year: "4th Year",
    subject: "Computer Science",
    expertise: ["DSA", "Web Dev", "Machine Learning"],
    rating: 4.9,
    reviews: 128,
    sessions: 245,
    avatar: "PS",
    color: "from-indigo-400 to-violet-500",
    bio: "Passionate about helping juniors crack placements and ace their academics.",
    available: true,
    price: "Free",
  },
  {
    id: 2,
    name: "Rahul Verma",
    university: "NIT Trichy",
    year: "Alumni 2023",
    subject: "Engineering",
    expertise: ["VLSI", "Embedded Systems", "Circuit Design"],
    rating: 4.8,
    reviews: 95,
    sessions: 180,
    avatar: "RV",
    color: "from-blue-400 to-indigo-500",
    bio: "Currently working at Qualcomm. Love to guide students in core electronics.",
    available: true,
    price: "Free",
  },
  {
    id: 3,
    name: "Anjali Gupta",
    university: "AIIMS Delhi",
    year: "Intern",
    subject: "Medicine",
    expertise: ["NEET Prep", "Anatomy", "Biochemistry"],
    rating: 4.7,
    reviews: 67,
    sessions: 120,
    avatar: "AG",
    color: "from-pink-400 to-rose-500",
    bio: "Cleared NEET with AIR 142. Here to help aspiring doctors.",
    available: false,
    price: "Free",
  },
  {
    id: 4,
    name: "Arjun Mehta",
    university: "IIM Bangalore",
    year: "Alumni 2022",
    subject: "Business",
    expertise: ["CAT Prep", "Finance", "Marketing", "Case Studies"],
    rating: 4.9,
    reviews: 210,
    sessions: 380,
    avatar: "AM",
    color: "from-amber-400 to-orange-500",
    bio: "CAT 99.8 percentiler. Cracked IIM, now helping others do the same.",
    available: true,
    price: "Free",
  },
  {
    id: 5,
    name: "Sneha Patel",
    university: "BITS Pilani",
    year: "3rd Year",
    subject: "Computer Science",
    expertise: ["Python", "Data Science", "AI/ML"],
    rating: 4.6,
    reviews: 43,
    sessions: 89,
    avatar: "SP",
    color: "from-emerald-400 to-teal-500",
    bio: "GSoC contributor. Passionate about open source and data science.",
    available: true,
    price: "Free",
  },
  {
    id: 6,
    name: "Vikram Singh",
    university: "Delhi University",
    year: "Alumni 2021",
    subject: "Law",
    expertise: ["Constitutional Law", "CLAT Prep", "Moot Court"],
    rating: 4.8,
    reviews: 56,
    sessions: 134,
    avatar: "VS",
    color: "from-purple-400 to-violet-500",
    bio: "Advocate at Delhi High Court. Guiding law aspirants since 2021.",
    available: true,
    price: "Free",
  },
];

function MentorCard({ mentor, onBook }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${mentor.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
          {mentor.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-foreground">{mentor.name}</h3>
            <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full">✅ Verified</span>
            {mentor.available
              ? <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-0.5 rounded-full">● Available</span>
              : <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">● Busy</span>
            }
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{mentor.university} • {mentor.year}</p>
          <p className="text-xs text-muted-foreground mt-1">{mentor.bio}</p>
        </div>
      </div>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {mentor.expertise.map((e) => (
          <span key={e} className="text-xs px-2 py-1 bg-muted rounded-lg text-muted-foreground">{e}</span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 mt-3 text-sm">
        <span className="flex items-center gap-1 text-amber-500">⭐ {mentor.rating}</span>
        <span className="text-muted-foreground">({mentor.reviews} reviews)</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{mentor.sessions} sessions</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onBook(mentor)}
          disabled={!mentor.available}
          className="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          📅 Book Session
        </button>
        <button className="px-3 py-2 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all text-sm">
          💬 Chat
        </button>
        <button className="px-3 py-2 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-all text-sm">
          👤 Profile
        </button>
      </div>
    </div>
  );
}

function BookingModal({ mentor, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [topic, setTopic] = useState("");
  const [meetType, setMeetType] = useState("video");

  const handleBook = () => {
    setStep(3);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-t-2xl p-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">Book Session</h2>
            <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mentor.color} flex items-center justify-center font-bold`}>
              {mentor.avatar}
            </div>
            <div>
              <p className="font-medium">{mentor.name}</p>
              <p className="text-white/70 text-sm">{mentor.university}</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Session Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[{id:"video", label:"🎥 Video"}, {id:"voice", label:"🎙️ Voice"}, {id:"chat", label:"💬 Chat"}].map((t) => (
                    <button key={t.id} onClick={() => setMeetType(t.id)}
                      className={`py-2 rounded-xl text-sm border transition-all ${meetType === t.id ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600" : "border-border text-muted-foreground"}`}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Select Date</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM", "8:00 PM"].map((t) => (
                    <button key={t} onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-xl text-xs border transition-all ${selectedTime === t ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600" : "border-border text-muted-foreground"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">What do you want to discuss?</label>
                <textarea value={topic} onChange={(e) => setTopic(e.target.value)} rows={3} placeholder="e.g. Need help with DSA interview prep..."
                  className="w-full px-3 py-2 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400 resize-none"/>
              </div>
              <button onClick={handleBook} disabled={!selectedDate || !selectedTime}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                Confirm Booking 🚀
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto text-3xl mb-4">✅</div>
              <h3 className="font-bold text-lg text-foreground mb-2">Session Booked!</h3>
              <p className="text-muted-foreground text-sm mb-1">with <strong>{mentor.name}</strong></p>
              <p className="text-muted-foreground text-sm mb-4">{selectedDate} at {selectedTime}</p>
              <p className="text-xs text-muted-foreground bg-muted rounded-xl p-3">A Google Meet link will be sent to your email 30 minutes before the session 📧</p>
              <button onClick={onClose} className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium">
                Done 🎉
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MentorsTab() {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [bookingMentor, setBookingMentor] = useState(null);
  const [verifyStep, setVerifyStep] = useState(1);
  const [verifyMethod, setVerifyMethod] = useState("");

  const filtered = MOCK_MENTORS.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.university.toLowerCase().includes(search.toLowerCase()) ||
      m.expertise.some((e) => e.toLowerCase().includes(search.toLowerCase()));
    const matchSubject = selectedSubject === "All" || m.subject === selectedSubject;
    return matchSearch && matchSubject;
  });

  return (
    <div>
      {/* Become a Mentor Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl p-5 mb-6 text-white flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-bold text-lg">Are you a Senior or Alumni? 🎓</h2>
          <p className="text-white/80 text-sm mt-1">Join as a verified mentor and guide the next generation!</p>
        </div>
        <button onClick={() => setShowVerifyModal(true)}
          className="px-5 py-2.5 bg-white text-indigo-600 rounded-xl font-semibold text-sm hover:bg-white/90 transition-all flex-shrink-0">
          Become a Mentor ✨
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mentors, universities, subjects..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
        </div>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400">
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Active Mentors", value: "240+", icon: "👨‍🏫" },
          { label: "Sessions Done", value: "1.2K+", icon: "📅" },
          { label: "Universities", value: "85+", icon: "🏫" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-2xl">{s.icon}</p>
            <p className="font-bold text-foreground text-lg">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Mentor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} onBook={setBookingMentor} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-medium">No mentors found</p>
          <p className="text-sm">Try a different search or subject filter</p>
        </div>
      )}

      {/* Booking Modal */}
      {bookingMentor && <BookingModal mentor={bookingMentor} onClose={() => setBookingMentor(null)} />}

      {/* Become Mentor Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-t-2xl p-5 text-white">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Become a Mentor</h2>
                <button onClick={() => { setShowVerifyModal(false); setVerifyStep(1); }} className="text-white/70 hover:text-white">✕</button>
              </div>
              <p className="text-white/80 text-sm mt-1">Get verified and start helping students!</p>
            </div>

            <div className="p-5">
              {verifyStep === 1 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-foreground">Choose verification method:</p>
                  <div className="space-y-3">
                    <button onClick={() => setVerifyMethod("email")}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${verifyMethod === "email" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30" : "border-border"}`}>
                      <p className="font-medium text-foreground">📧 College Email Verification</p>
                      <p className="text-xs text-muted-foreground mt-1">Instant verification with your .edu or university email</p>
                    </button>
                    <button onClick={() => setVerifyMethod("id")}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${verifyMethod === "id" ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30" : "border-border"}`}>
                      <p className="font-medium text-foreground">🪪 College ID Card Upload</p>
                      <p className="text-xs text-muted-foreground mt-1">Upload your ID card — admin reviews within 24 hours</p>
                    </button>
                  </div>
                  <button onClick={() => verifyMethod && setVerifyStep(2)} disabled={!verifyMethod}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                    Continue →
                  </button>
                </div>
              )}

              {verifyStep === 2 && verifyMethod === "email" && (
                <div className="space-y-4">
                  <input placeholder="Your college email (e.g. john@iit.ac.in)"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
                  <input placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
                  <input placeholder="University/College name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
                  <input placeholder="Your expertise (e.g. DSA, Web Dev)"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
                  <button onClick={() => setVerifyStep(3)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium">
                    Send Verification Email 📧
                  </button>
                </div>
              )}

              {verifyStep === 2 && verifyMethod === "id" && (
                <div className="space-y-4">
                  <input placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
                  <input placeholder="University/College name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400"/>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-all">
                    <p className="text-3xl mb-2">🪪</p>
                    <p className="text-sm font-medium text-foreground">Upload College ID Card</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG or PDF • Max 5MB</p>
                  </div>
                  <button onClick={() => setVerifyStep(3)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium">
                    Submit for Review 📋
                  </button>
                </div>
              )}

              {verifyStep === 3 && (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">{verifyMethod === "email" ? "📧" : "⏳"}</div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {verifyMethod === "email" ? "Check Your Email!" : "Application Submitted!"}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {verifyMethod === "email"
                      ? "We've sent a verification link to your college email. Click the link to get verified instantly!"
                      : "Our team will review your ID card within 24 hours. You'll get an email once approved!"}
                  </p>
                  <button onClick={() => { setShowVerifyModal(false); setVerifyStep(1); }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium">
                    Got it! 🎉
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
