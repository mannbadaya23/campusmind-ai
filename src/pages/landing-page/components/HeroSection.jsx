import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm md:text-base font-medium">
              <Icon name="Sparkles" size={16} />
              <span>AI-Powered Student Wellness Platform</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
              Master Your Mind,
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Excel in Studies
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              CampusMind AI helps college students manage stress, organize studies, and achieve academic success through intelligent insights and personalized AI coaching.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Rocket"
                iconPosition="right"
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto"
              >
                Get Started Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="LogIn"
                iconPosition="right"
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto"
              >
                Sign In
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="text-sm md:text-base text-muted-foreground">
                  <strong className="text-foreground">15,000+</strong> Students
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Star" size={20} className="text-accent" />
                <span className="text-sm md:text-base text-muted-foreground">
                  <strong className="text-foreground">4.9/5</strong> Rating
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="text-sm md:text-base text-muted-foreground">
                  <strong className="text-foreground">100%</strong> Secure
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl"></div>
              <div className="relative bg-card border border-border rounded-2xl shadow-soft-2xl p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl">
                    <Icon name="Brain" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                      AI Coach Active
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Your personal wellness assistant
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Icon name="CheckCircle2" size={20} className="text-success flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-foreground">
                        Stress Level: Low
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Great job maintaining balance!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Icon name="Calendar" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-foreground">
                        3 Tasks Due Today
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Stay on track with your study plan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Icon name="TrendingUp" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm md:text-base font-medium text-foreground">
                        85% Weekly Progress
                      </p>
                      <p className="text-xs md:text-sm text-muted-foreground">
                        You're doing amazing this week!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;