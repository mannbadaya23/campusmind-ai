import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ badges }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">Achievements</h3>
        <Icon name="Award" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {badges?.map((badge) => (
          <div
            key={badge?.id}
            className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-lg transition-smooth ${
              badge?.earned
                ? 'bg-gradient-to-br from-primary/10 to-secondary/10 cursor-pointer hover:from-primary/20 hover:to-secondary/20' :'bg-muted/30 opacity-50'
            }`}
          >
            <div
              className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3 ${
                badge?.earned
                  ? 'bg-gradient-to-br from-primary to-secondary' :'bg-muted'
              }`}
            >
              <Icon name={badge?.icon} size={24} className={badge?.earned ? 'text-white' : 'text-muted-foreground'} />
            </div>
            <p className="text-xs md:text-sm font-medium text-center text-foreground line-clamp-2">{badge?.name}</p>
            {badge?.earned && (
              <p className="text-xs text-muted-foreground mt-1">{badge?.earnedDate}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;