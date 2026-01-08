import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DashboardOverview from './pages/dashboard-overview';
import Login from './pages/login';
import StressAndBurnoutTracking from './pages/stress-and-burnout-tracking';
import LandingPage from './pages/landing-page';
import StudyPlanner from './pages/study-planner';
import Signup from './pages/signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard-overview" element={<DashboardOverview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/stress-and-burnout-tracking" element={<StressAndBurnoutTracking />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/study-planner" element={<StudyPlanner />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
