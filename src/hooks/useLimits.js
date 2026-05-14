// src/hooks/useLimits.js
// Manages free plan limits across the app

export const FREE_LIMITS = {
  aiCoach: 10,      // messages per day
  aiNotes: 3,       // generations per day
  examCountdowns: 2, // max saved
  studyGroups: 0,   // can only view, not create
};

export const getUsage = (feature) => {
  const today = new Date().toDateString();
  const stored = localStorage.getItem(`limit_${feature}`);
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed.date === today) return parsed.count;
  }
  return 0;
};

export const incrementUsage = (feature) => {
  const today = new Date().toDateString();
  const current = getUsage(feature);
  localStorage.setItem(`limit_${feature}`, JSON.stringify({
    date: today,
    count: current + 1
  }));
  return current + 1;
};

export const isLimitReached = (feature) => {
  return getUsage(feature) >= FREE_LIMITS[feature];
};

export const getRemainingUsage = (feature) => {
  return Math.max(0, FREE_LIMITS[feature] - getUsage(feature));
};
