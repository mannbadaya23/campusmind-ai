import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const stats = [
    {
      icon: "Users",
      value: "15,000+",
      label: "Active Students",
      description: "Across 200+ universities"
    },
    {
      icon: "TrendingUp",
      value: "92%",
      label: "Success Rate",
      description: "Improved academic performance"
    },
    {
      icon: "Clock",
      value: "500K+",
      label: "Study Hours",
      description: "Optimized with AI insights"
    },
    {
      icon: "Award",
      value: "4.9/5",
      label: "Student Rating",
      description: "Based on 3,000+ reviews"
    }
  ];

  return (
    <section className="px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats?.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 md:p-8 text-center shadow-soft hover:shadow-soft-lg transition-smooth"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4">
                <Icon name={stat?.icon} size={24} className="text-white" />
              </div>

              <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                {stat?.value}
              </div>

              <div className="text-base md:text-lg font-semibold text-foreground mb-1">
                {stat?.label}
              </div>

              <div className="text-sm text-muted-foreground">
                {stat?.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;