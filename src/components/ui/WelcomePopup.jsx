import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomePopup() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Use a simple state-based timer — no sessionStorage needed
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 p-6 text-white text-center relative">
          <button onClick={() => setShow(false)}
            className="absolute top-3 right-3 text-white/60 hover:text-white text-xl leading-none">✕</button>
          <p className="text-5xl mb-3">🎓</p>
          <h2 className="text-2xl font-bold mb-1">Welcome to CampusMind AI!</h2>
          <p className="text-white/80 text-sm">Your AI-powered academic companion</p>
        </div>

        <div className="p-6">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-5 text-center">
            <p className="text-2xl mb-1">🎁</p>
            <p className="font-bold text-foreground">You are on the Free Plan!</p>
            <p className="text-sm text-muted-foreground mt-1">Upgrade to Pro for unlimited AI Coach, Notes and more</p>
          </div>

          <div className="space-y-2 mb-6">
            {[
              { icon: '🤖', text: 'Unlimited AI Coach conversations' },
              { icon: '📝', text: 'Unlimited AI Study Notes' },
              { icon: '📊', text: 'Advanced stress and burnout analytics' },
              { icon: '👥', text: 'Create and manage study groups' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                <span>{f.icon}</span>
                <span>{f.text}</span>
                <span className="ml-auto text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 px-2 py-0.5 rounded-full">Pro</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => { setShow(false); navigate('/pricing'); }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold hover:opacity-90 transition-all mb-3 text-sm">
            Explore Pro Plans - Starting Rs 99/month
          </button>
          <button onClick={() => setShow(false)}
            className="w-full py-3 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted transition-all">
            Continue with Free Plan
          </button>
          <p className="text-xs text-center text-muted-foreground mt-3">
            Early birds get 30% off at launch!
          </p>
        </div>
      </div>
    </div>
  );
}
