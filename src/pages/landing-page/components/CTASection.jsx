import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

          <div className="relative z-10 text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm md:text-base font-medium">
              <Icon name="Rocket" size={16} />
              <span>Start Your Journey Today</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
              Ready to Transform Your
              <br />
              Academic Experience?
            </h2>

            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              Join 15,000+ students who are already achieving better grades, managing stress effectively, and building successful academic careers with CampusMind AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="secondary"
                size="lg"
                iconName="Sparkles"
                iconPosition="right"
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
              >
                Create Free Account
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="MessageSquare"
                iconPosition="right"
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                Talk to AI Coach
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-6">
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Check" size={20} />
                <span className="text-sm md:text-base">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Check" size={20} />
                <span className="text-sm md:text-base">Free forever plan</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Icon name="Check" size={20} />
                <span className="text-sm md:text-base">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;