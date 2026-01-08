import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialCard = ({ name, university, major, image, imageAlt, quote, rating }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-soft hover:shadow-soft-lg transition-smooth">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)]?.map((_, index) => (
          <Icon
            key={index}
            name="Star"
            size={16}
            className={index < rating ? "text-accent fill-accent" : "text-muted"}
          />
        ))}
      </div>
      <p className="text-sm md:text-base text-foreground leading-relaxed mb-6">
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h4 className="text-sm md:text-base font-semibold text-foreground">
            {name}
          </h4>
          <p className="text-xs md:text-sm text-muted-foreground">
            {major}
          </p>
          <p className="text-xs text-muted-foreground">
            {university}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;