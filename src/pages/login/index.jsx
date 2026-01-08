import React from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import SignupRedirect from './components/SignupRedirect';
import Icon from '../../components/AppIcon';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/landing-page')}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth mb-6 md:mb-8"
          aria-label="Back to home"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>Back to Home</span>
        </button>

        <div className="bg-card border border-border rounded-2xl shadow-soft-xl p-6 md:p-8 lg:p-10 space-y-8">
          <WelcomeHeader />
          
          <LoginForm />
          
          <SignupRedirect />
          
          <SecurityBadges />
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our{' '}
            <button className="text-primary hover:text-primary/80 transition-smooth font-medium">
              Terms of Service
            </button>
            {' '}and{' '}
            <button className="text-primary hover:text-primary/80 transition-smooth font-medium">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;