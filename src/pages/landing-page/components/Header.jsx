import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: "Features", path: "/landing-page" },
    { label: "Dashboard", path: "/dashboard-overview" },
    { label: "Study Planner", path: "/study-planner" },
    { label: "Stress Tracking", path: "/stress-and-burnout-tracking" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-soft-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => navigate('/landing-page')}
            className="flex items-center gap-3 group"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg group-hover:scale-105 transition-smooth">
              <Icon name="Brain" size={24} className="text-white" />
            </div>
            <span className="text-lg md:text-xl font-heading font-bold text-foreground">
              CampusMind AI
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems?.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item?.path)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
              >
                {item?.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="default"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button
              variant="default"
              size="default"
              iconName="Rocket"
              iconPosition="right"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-muted transition-smooth"
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border shadow-soft-lg">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            {navigationItems?.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item?.path);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-smooth"
              >
                {item?.label}
              </button>
            ))}

            <div className="pt-4 border-t border-border space-y-3">
              <Button
                variant="outline"
                size="default"
                fullWidth
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button
                variant="default"
                size="default"
                fullWidth
                iconName="Rocket"
                iconPosition="right"
                onClick={() => {
                  navigate('/signup');
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;