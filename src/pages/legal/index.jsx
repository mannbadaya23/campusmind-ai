import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CONTACT_EMAIL = 'mannbadaya64@gmail.com';
const WEBSITE = 'campusmind-ai.web.app';
const COMPANY = 'CampusMind AI';
const LAST_UPDATED = 'March 2026';

const SECTIONS = {
  privacy: [
    {
      title: '1. Information We Collect',
      content: `We collect the following information when you use ${COMPANY}:
• Email address (for account creation)
• Google account info (if using Google Sign-In)
• Stress levels and mood data you voluntarily log
• Tasks and study habits you create
• AI Coach conversation history
• Usage patterns and app interactions`
    },
    {
      title: '2. How We Use Your Information',
      content: `Your information is used to:
• Provide personalized AI coaching and recommendations
• Save your academic progress and wellness data
• Improve our AI models and app features
• Send important account notifications
• Generate your personal weekly reports
We NEVER sell your data to third parties.`
    },
    {
      title: '3. Data Storage & Security',
      content: `Your data is stored securely on Google Firebase servers with:
• Bank-grade AES-256 encryption
• Secure HTTPS connections
• Firebase Authentication protection
• Each user's data is completely private and isolated
• Regular security audits`
    },
    {
      title: '4. Your Rights (DPDP Act 2023)',
      content: `Under India's Digital Personal Data Protection Act 2023, you have the right to:
• Access your personal data anytime
• Correct inaccurate data
• Delete your account and all data
• Withdraw consent for data processing
• File complaints with the Data Protection Board
To exercise these rights, contact: ${CONTACT_EMAIL}`
    },
    {
      title: '5. Cookies',
      content: `We use minimal cookies for:
• Keeping you logged in (authentication)
• Remembering your preferences
• Analytics to improve the app
We do not use advertising cookies or tracking cookies.`
    },
    {
      title: '6. Third-Party Services',
      content: `We use these third-party services:
• Google Firebase — data storage and authentication
• Google Gemini AI — AI coaching features
• YouTube — educational video recommendations
Each service has its own privacy policy. We share only necessary data.`
    },
    {
      title: '7. Data Retention',
      content: `We retain your data as long as your account is active. When you delete your account:
• All personal data is deleted within 30 days
• Anonymous usage statistics may be retained
• You can request immediate deletion at ${CONTACT_EMAIL}`
    },
    {
      title: '8. Contact Us',
      content: `For privacy concerns or questions:
Email: ${CONTACT_EMAIL}
Website: ${WEBSITE}
Response time: Within 15 days (as per IT Rules 2021)`
    },
  ],
  terms: [
    {
      title: '1. Acceptance of Terms',
      content: `By using ${COMPANY}, you agree to these Terms of Service. If you disagree, please stop using the app. These terms comply with Indian IT Act 2000 and Consumer Protection Act 2019.`
    },
    {
      title: '2. Eligibility',
      content: `You must be:
• At least 13 years old to use the free plan
• At least 18 years old to purchase a subscription
• A student, educator, or institution representative
By using this service, you confirm you meet these requirements.`
    },
    {
      title: '3. User Responsibilities',
      content: `You agree to:
• Provide accurate information
• Keep your account credentials secure
• Not share your account with others
• Not use the service for harmful purposes
• Not misuse the AI coaching features
• Respect other users in study groups`
    },
    {
      title: '4. Subscription & Payments',
      content: `For paid plans:
• Payments are processed securely
• Subscriptions auto-renew unless cancelled
• You can cancel anytime before renewal
• No refunds for partial months used
• 7-day money back guarantee for new subscribers
• Prices may change with 30 days notice`
    },
    {
      title: '5. AI Coach Disclaimer',
      content: `Our AI Coach provides general academic and wellness guidance. It is NOT a substitute for:
• Professional mental health therapy
• Medical advice
• Academic counseling from your institution
If you are in crisis, please contact a mental health professional immediately.`
    },
    {
      title: '6. Intellectual Property',
      content: `All content on ${COMPANY} including:
• App design and code
• AI-generated content
• Branding and logos
Are owned by ${COMPANY}. You may not copy, distribute or reproduce without permission.`
    },
    {
      title: '7. Limitation of Liability',
      content: `${COMPANY} is not liable for:
• Academic results or performance
• Mental health outcomes
• Data loss due to technical issues
• Third-party service disruptions
Our maximum liability is limited to the amount you paid in the last 3 months.`
    },
    {
      title: '8. Governing Law',
      content: `These terms are governed by Indian law. Any disputes will be resolved under the jurisdiction of courts in India. For consumer disputes, you may approach the Consumer Forum.`
    },
    {
      title: '9. Grievance Officer',
      content: `As per IT Rules 2021, our Grievance Officer is:
Name: Mann Badaya
Email: ${CONTACT_EMAIL}
Response time: Within 15 days`
    },
  ],
  refund: [
    {
      title: '1. 7-Day Money Back Guarantee',
      content: `New subscribers are eligible for a full refund within 7 days of first purchase if:
• You are not satisfied with the service
• The service did not work as described
• Technical issues prevented you from using features
To request a refund: Email ${CONTACT_EMAIL} with your account email and reason.`
    },
    {
      title: '2. Refund Process',
      content: `Refunds are processed as follows:
• Request received and reviewed within 2 business days
• Approved refunds processed within 5-7 business days
• Refund goes to original payment method
• You will receive email confirmation`
    },
    {
      title: '3. Non-Refundable Cases',
      content: `Refunds are NOT provided for:
• Requests after 7-day period
• Violation of Terms of Service
• Change of mind after 7 days
• Partial month usage after cancellation`
    },
    {
      title: '4. College Plan Refunds',
      content: `For College/Institution plans:
• Refund requests within 14 days of purchase
• Pro-rated refunds may be offered for long-term plans
• Contact us to discuss your specific situation`
    },
    {
      title: '5. Contact for Refunds',
      content: `Email: ${CONTACT_EMAIL}
Subject: Refund Request — [Your Email]
Include: Reason for refund, date of purchase
We aim to resolve all refund requests fairly and quickly.`
    },
  ]
};

export default function TermsAndPrivacy() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('privacy');

  const tabs = [
    { id: 'privacy', label: '🔒 Privacy Policy' },
    { id: 'terms', label: '📋 Terms of Service' },
    { id: 'refund', label: '💰 Refund Policy' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-8 text-white text-center">
        <button onClick={() => navigate(-1)}
          className="absolute left-6 top-6 text-white/70 hover:text-white text-sm flex items-center gap-2">
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-2">Legal & Policies</h1>
        <p className="text-white/80 text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 bg-card border-b border-border z-10">
        <div className="max-w-4xl mx-auto px-4 flex gap-1 py-3 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white' : 'text-muted-foreground hover:bg-muted'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Intro box */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5 mb-8">
          <p className="text-sm text-indigo-700 dark:text-indigo-300">
            {activeTab === 'privacy' && `This Privacy Policy explains how ${COMPANY} collects, uses and protects your personal information in compliance with India's IT Act 2000, IT Rules 2021 and DPDP Act 2023.`}
            {activeTab === 'terms' && `These Terms of Service govern your use of ${COMPANY}. By using our service, you agree to these terms. Please read them carefully.`}
            {activeTab === 'refund' && `Our Refund Policy ensures fair treatment for all users. We offer a 7-day money-back guarantee for new subscribers.`}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {SECTIONS[activeTab].map((section, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-foreground text-lg mb-3">{section.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-2">Questions about our policies?</p>
          <a href={`mailto:${CONTACT_EMAIL}`}
            className="text-indigo-500 font-medium hover:underline">{CONTACT_EMAIL}</a>
        </div>
      </div>
    </div>
  );
}
