import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CONTACT_EMAIL = 'mannbadaya64@gmail.com';

const FREE_FEATURES = [
  '5 AI Coach messages/day',
  '3 AI Notes generations/day',
  '2 Exam Countdowns',
  'Basic Stress Tracking',
  'Daily Mood Tracker',
  'Basic Habit Tracker',
  'View Study Groups',
  'Access PYQs (Limited)',
  'YouTube Lectures',
];

const PRO_FEATURES = [
  'Unlimited AI Coach messages',
  'Unlimited AI Notes',
  'Unlimited Exam Countdowns',
  'Advanced Stress Analytics',
  'Full Mood History',
  'Custom Habit Tracker',
  'Create & Join Study Groups',
  'Full PYQs Access',
  'Priority Support',
  'Weekly AI Report Card',
  'Burnout Predictor',
  'Focus Music Player',
];

const COLLEGE_FEATURES = [
  'Everything in Pro for all students',
  'College Admin Dashboard',
  'Student Progress Analytics',
  'Custom Branding',
  'Bulk Student Onboarding',
  'Dedicated Account Manager',
  'API Access',
  'Priority 24/7 Support',
  'Custom Integrations',
  'Data Export & Reports',
];

const COLLEGE_PLANS = [
  { duration: '1 Month', price: '₹4,999', tag: 'Try it out', color: 'from-blue-500 to-indigo-600' },
  { duration: '3 Months', price: '₹12,999', tag: 'Save ₹2,000', color: 'from-indigo-500 to-violet-600', popular: true },
  { duration: '6 Months', price: 'Custom', tag: 'Best Value', color: 'from-violet-500 to-purple-600' },
  { duration: '1 Year', price: 'Custom', tag: 'Max Savings', color: 'from-purple-500 to-pink-600' },
];

const FAQ = [
  { q: 'Can I cancel anytime?', a: 'Yes! You can cancel your subscription anytime. No questions asked. You will retain access until the end of your billing period.' },
  { q: 'Is my data safe?', a: 'Absolutely. We use Firebase with bank-grade encryption. Your data is private and never shared with anyone.' },
  { q: 'What payment methods are accepted?', a: 'We accept UPI, Credit/Debit Cards, Net Banking and all major wallets.' },
  { q: 'Is there a student discount?', a: 'Our Pro plan at ₹99/month is already student-priced! We also offer special deals for college ambassadors.' },
  { q: 'How does the college plan work?', a: 'We onboard your entire college. Students get Pro access, and college admin gets a dashboard to track progress.' },
  { q: 'What if I need a refund?', a: 'We offer a 7-day money back guarantee. Contact us at ' + CONTACT_EMAIL },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(null);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistPlan, setWaitlistPlan] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleWaitlist = (plan) => {
    setWaitlistPlan(plan);
    setShowWaitlist(true);
  };

  const handleSubmit = () => {
    if (!waitlistEmail) return;
    setSubmitted(true);
    setTimeout(() => {
      setShowWaitlist(false);
      setSubmitted(false);
      setWaitlistEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)}
          className="text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 text-sm">
          ← Back
        </button>
        <h1 className="font-bold text-foreground text-lg">CampusMind AI Pricing</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🎓 Student-First Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Invest in Your
            <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent"> Academic Success</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free, upgrade when you need more. No hidden fees, no surprises.
            Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted rounded-xl p-1">
            <button onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-card shadow text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </button>
            <button onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${billingCycle === 'yearly' ? 'bg-card shadow text-foreground' : 'text-muted-foreground'}`}>
              Yearly
              <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Student Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">

          {/* Free Plan */}
          <div className="bg-card border border-border rounded-2xl p-8 relative">
            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-2">FREE</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-bold text-foreground">₹0</span>
                <span className="text-muted-foreground mb-2">/forever</span>
              </div>
              <p className="text-sm text-muted-foreground">Perfect to get started</p>
            </div>
            <button onClick={() => navigate('/signup')}
              className="w-full py-3 rounded-xl border-2 border-border text-foreground font-medium hover:bg-muted transition-all mb-8">
              Get Started Free
            </button>
            <div className="space-y-3">
              {FREE_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-8 relative text-white shadow-2xl scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full">
                ⭐ MOST POPULAR
              </span>
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-white/70 mb-2">STUDENT PRO</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-bold">
                  {billingCycle === 'monthly' ? '₹99' : '₹79'}
                </span>
                <span className="text-white/70 mb-2">/month</span>
              </div>
              {billingCycle === 'yearly' && (
                <p className="text-xs text-white/70 line-through">₹99/month</p>
              )}
              <p className="text-sm text-white/70">Everything you need to excel</p>
            </div>
            <button onClick={() => handleWaitlist('Student Pro')}
              className="w-full py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-white/90 transition-all mb-8">
              Join Waitlist 🚀
            </button>
            <div className="space-y-3">
              {PRO_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-white/90">
                  <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Pro */}
          <div className="bg-card border border-border rounded-2xl p-8 relative">
            <div className="mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-2">ADVANCED PRO</p>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-bold text-foreground">
                  {billingCycle === 'monthly' ? '₹199' : '₹159'}
                </span>
                <span className="text-muted-foreground mb-2">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">For serious achievers</p>
            </div>
            <button onClick={() => handleWaitlist('Advanced Pro')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 transition-all mb-8">
              Join Waitlist 🚀
            </button>
            <div className="space-y-3">
              {[...PRO_FEATURES, 'Personal AI Study Coach', '1-on-1 Mentor Sessions', 'Placement Preparation Kit'].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* College Plans */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🏫 College & University Plans
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Empower your entire institution. Get dedicated support, admin dashboard and custom branding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {COLLEGE_PLANS.map((plan, i) => (
              <div key={i} className={`relative rounded-2xl p-6 text-white bg-gradient-to-br ${plan.color} ${plan.popular ? 'ring-4 ring-amber-400 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
                  </div>
                )}
                <p className="text-white/70 text-xs font-medium mb-1">{plan.tag}</p>
                <h3 className="font-bold text-lg mb-2">{plan.duration}</h3>
                <p className="text-3xl font-bold mb-4">{plan.price}</p>
                <button onClick={() => handleWaitlist(`College ${plan.duration}`)}
                  className="w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-all">
                  {plan.price === 'Custom' ? 'Get Quote' : 'Join Waitlist'}
                </button>
              </div>
            ))}
          </div>

          {/* College Features */}
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-8">
            <h3 className="font-bold text-foreground text-lg mb-6">Everything included in College Plan:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {COLLEGE_FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs flex-shrink-0">✓</span>
                  {f}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-indigo-200 dark:border-indigo-800">
              <p className="text-sm text-muted-foreground">
                📧 For custom pricing and enterprise solutions contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-500 font-medium">{CONTACT_EMAIL}</a>
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Compare Plans</h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium">Feature</th>
                  <th className="text-center p-4 text-muted-foreground font-medium">Free</th>
                  <th className="text-center p-4 text-indigo-500 font-bold">Pro</th>
                  <th className="text-center p-4 text-muted-foreground font-medium">College</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['AI Coach Messages', '5/day', 'Unlimited', 'Unlimited'],
                  ['AI Notes Generator', '3/day', 'Unlimited', 'Unlimited'],
                  ['Exam Countdowns', '2', 'Unlimited', 'Unlimited'],
                  ['Study Groups', 'View Only', '✓', '✓'],
                  ['PYQs Access', 'Limited', 'Full', 'Full'],
                  ['Weekly AI Report', '✗', '✓', '✓'],
                  ['Admin Dashboard', '✗', '✗', '✓'],
                  ['Custom Branding', '✗', '✗', '✓'],
                  ['Priority Support', '✗', '✓', '24/7'],
                ].map(([feature, free, pro, college], i) => (
                  <tr key={i} className={`border-b border-border ${i % 2 === 0 ? 'bg-muted/20' : ''}`}>
                    <td className="p-4 text-sm text-foreground">{feature}</td>
                    <td className="p-4 text-sm text-center text-muted-foreground">{free}</td>
                    <td className="p-4 text-sm text-center text-indigo-500 font-medium">{pro}</td>
                    <td className="p-4 text-sm text-center text-muted-foreground">{college}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-all">
                  <span className="font-medium text-foreground">{item.q}</span>
                  <span className="text-muted-foreground text-xl">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Academic Journey? 🚀</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Join thousands of students who are already using CampusMind AI to excel in their studies and maintain mental wellness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-white/90 transition-all">
              Start Free Today ✨
            </button>
            <button onClick={() => handleWaitlist('Pro')}
              className="px-8 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all border border-white/30">
              Join Pro Waitlist 🎯
            </button>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-violet-600 p-6 text-white text-center">
              <p className="text-4xl mb-3">🎯</p>
              <h2 className="text-2xl font-bold mb-2">Join the Waitlist!</h2>
              <p className="text-white/80 text-sm">Be the first to know when <strong>{waitlistPlan}</strong> launches!</p>
            </div>
            <div className="p-6">
              {submitted ? (
                <div className="text-center py-4">
                  <p className="text-4xl mb-3">🎉</p>
                  <h3 className="font-bold text-lg text-foreground">You're on the list!</h3>
                  <p className="text-sm text-muted-foreground mt-1">We'll notify you at launch with an exclusive discount!</p>
                </div>
              ) : (
                <>
                  <input
                    value={waitlistEmail}
                    onChange={e => setWaitlistEmail(e.target.value)}
                    placeholder="Enter your email address"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
                  />
                  <button onClick={handleSubmit}
                    disabled={!waitlistEmail}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold hover:opacity-90 disabled:opacity-40 transition-all mb-3">
                    Join Waitlist 🚀
                  </button>
                  <button onClick={() => setShowWaitlist(false)}
                    className="w-full py-3 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted transition-all">
                    Maybe Later
                  </button>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    🔒 No spam. Unsubscribe anytime. Early birds get 30% off!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
