import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";

import NotFound from "pages/NotFound";
import DashboardOverview from "./pages/dashboard-overview";
import Login from "./pages/login";
import StressAndBurnoutTracking from "./pages/stress-and-burnout-tracking";
import LandingPage from "./pages/landing-page";
import StudyPlanner from "./pages/study-planner";
import Signup from "./pages/signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />

        <RouterRoutes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard-overview"
            element={
              <ProtectedRoute>
                <DashboardOverview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/study-planner"
            element={
              <ProtectedRoute>
                <StudyPlanner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/stress-and-burnout-tracking"
            element={
              <ProtectedRoute>
                <StressAndBurnoutTracking />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>

      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
