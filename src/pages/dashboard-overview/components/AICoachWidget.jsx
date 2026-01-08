import React from 'react';
import Icon from '../../../components/AppIcon';


const AICoachWidget = ({ recentChats }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">AI Coach</h3>
        <Icon name="MessageSquare" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
        {recentChats?.map((chat) => (
          <div
            key={chat?.id}
            className="flex items-start gap-3 p-3 md:p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg hover:from-primary/10 hover:to-secondary/10 transition-smooth cursor-pointer"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Bot" size={20} className="text-white md:w-6 md:h-6" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-medium text-foreground mb-1 line-clamp-2">{chat?.message}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{chat?.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base font-medium text-primary hover:text-primary/80 transition-smooth">
          <Icon name="MessageCircle" size={18} />
          Start New Conversation
        </button>
      </div>
    </div>
  );
};

export default AICoachWidget;