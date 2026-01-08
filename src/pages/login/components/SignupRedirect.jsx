import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const SignupRedirect = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground font-medium">
            New to CampusMind AI?
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Join thousands of students managing stress and achieving academic success
        </p>
        <Button
          variant="outline"
          fullWidth
          onClick={() => navigate('/signup')}
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Free Account
        </Button>
      </div>
    </div>
  );
};

export default SignupRedirect;