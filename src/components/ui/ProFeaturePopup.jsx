import React from 'react';
import { useNavigate } from 'react-router-dom';

// Usage: <ProFeaturePopup show={show} onClose={() => setShow(false)} feature="AI Notes" />
export default function ProFeaturePopup({ show, onClose, feature = 'this feature' }) {
  const navigate = useNavigate();
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 p-6 text-white text-center relative">
          <button onClick={onClose}
            className="absolute top-3 right-3 text-white/60 hover:text-white text-xl">✕</button>
          <p className="text-4xl mb-3">🔒</p>
          <h2 className="text-xl font-bold mb-1">Pro Feature!</h2>
          <p className="text-white/80 text-sm">{feature} is available on Pro plan</p>
        </div>
        <div className="p-6">
          <div className="space-y-2 mb-5">
            {['Unlimited AI Coach', 'Unlimited AI Notes', 'Full PYQs Access', 'Advanced Analytics'].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                <span className="text-indigo-500">✓</span>{f}
              </div>
            ))}
          </div>
          <button onClick={() => { onClose(); navigate('/pricing'); }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold hover:opacity-90 transition-all mb-3">
            Upgrade to Pro — ₹99/month 🚀
          </button>
          <button onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted transition-all">
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
