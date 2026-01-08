import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProgressSteps from './components/ProgressSteps';
import AccountStep from './components/AccountStep';
import ProfileStep from './components/ProfileStep';
import CompletionStep from './components/CompletionStep';

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    university: '',
    academicYear: '',
    major: '',
    agreeToTerms: false,
    receiveUpdates: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData?.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 2) {
      if (!formData?.fullName) {
        newErrors.fullName = 'Full name is required';
      } else if (formData?.fullName?.length < 2) {
        newErrors.fullName = 'Please enter your full name';
      }

      if (!formData?.university) {
        newErrors.university = 'Please select your university';
      }

      if (!formData?.academicYear) {
        newErrors.academicYear = 'Please select your academic year';
      }
    }

    if (step === 3) {
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms to continue';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(3)) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard-overview');
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountStep
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        );
      case 2:
        return (
          <ProfileStep
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        );
      case 3:
        return (
          <CompletionStep
            formData={formData}
            errors={errors}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-card rounded-2xl shadow-soft-2xl p-6 md:p-8 lg:p-10">
          <div className="text-center mb-6 md:mb-8">
            <Link to="/landing-page" className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-primary to-secondary rounded-xl mb-4 shadow-soft-lg">
              <Icon name="Brain" size={32} color="white" />
            </Link>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
              Join CampusMind AI
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Start your journey to better wellness and academic success
            </p>
          </div>

          <ProgressSteps currentStep={currentStep} totalSteps={3} />

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  iconName="ChevronLeft"
                  iconPosition="left"
                  fullWidth
                  className="sm:flex-1"
                >
                  Back
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button
                  type="button"
                  variant="default"
                  onClick={handleNext}
                  iconName="ChevronRight"
                  iconPosition="right"
                  fullWidth
                  className="sm:flex-1"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  loading={loading}
                  iconName="CheckCircle"
                  iconPosition="right"
                  fullWidth
                  className="sm:flex-1"
                >
                  Create Account
                </Button>
              )}
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80 transition-smooth"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm rounded-full">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">
              Secure SSL encrypted registration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;