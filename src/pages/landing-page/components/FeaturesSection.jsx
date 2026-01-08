import React from 'react';
import FeatureCard from './FeatureCard';
import Icon from '../../../components/AppIcon';


const FeaturesSection = () => {
  const features = [
    {
      icon: "Heart",
      title: "Stress & Burnout Tracking",
      description: "Monitor your mental wellness with intelligent stress tracking, burnout alerts, and personalized recommendations to maintain healthy balance throughout your academic journey.",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: "Brain",
      title: "AI-Powered Coach",
      description: "Get instant support from your personal AI wellness coach. Receive guidance on stress management, study techniques, and academic challenges through natural conversations.",
      gradient: "from-primary to-secondary"
    },
    {
      icon: "Calendar",
      title: "Smart Study Planner",
      description: "Organize your academic life with AI-driven study planning. Create schedules, set reminders, and receive intelligent suggestions to optimize your learning efficiency.",
      gradient: "from-accent to-orange-500"
    },
    {
      icon: "BookOpen",
      title: "Senior Resources Hub",
      description: "Access curated notes, study materials, and insights from successful seniors. Learn from those who've walked the path and accelerate your academic success.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: "BarChart3",
      title: "Progress Analytics",
      description: "Visualize your academic journey with comprehensive analytics. Track study patterns, stress trends, and achievement milestones with beautiful data visualizations.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "Zap",
      title: "Real-time Insights",
      description: "Receive instant notifications and actionable insights based on your activity patterns. Stay ahead with proactive recommendations for better academic performance.",
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  return (
    <section className="px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm md:text-base font-medium">
            <Icon name="Sparkles" size={16} />
            <span>Powerful Features</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Everything You Need to
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Succeed in College
            </span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive tools designed specifically for college students to manage stress, organize studies, and achieve academic excellence with AI-powered assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features?.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature?.icon}
              title={feature?.title}
              description={feature?.description}
              gradient={feature?.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;