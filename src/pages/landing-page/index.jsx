import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>CampusMind AI - AI-Powered Student Wellness & Academic Management</title>
        <meta
          name="description"
          content="Transform your college experience with CampusMind AI. Manage stress, organize studies, and achieve academic excellence with AI-powered insights and personalized coaching."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection />
          <FeaturesSection />
          <StatsSection />
          <TestimonialsSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LandingPage;