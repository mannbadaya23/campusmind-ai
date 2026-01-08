import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureCard = ({ icon, title, description, gradient }) => {
  return (
    <div className="group relative bg-card border border-border rounded-xl p-6 md:p-8 shadow-soft hover:shadow-soft-lg transition-smooth">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-xl transition-smooth" style={{ background: gradient }}></div>
      
      <div className="relative space-y-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${gradient}`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>

        <h3 className="text-lg md:text-xl lg:text-2xl font-heading font-semibold text-foreground">
          {title}
        </h3>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-2 text-primary text-sm md:text-base font-medium group-hover:gap-3 transition-smooth">
          <span>Learn more</span>
          <Icon name="ArrowRight" size={16} />
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;