import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const CompletionStep = ({ formData, errors, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full">
          <Icon name="Sparkles" size={32} className="text-primary" />
        </div>
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
          Almost There!
        </h3>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
          Review your information and agree to our terms to complete your registration and start your wellness journey.
        </p>
      </div>
      <div className="bg-muted/50 rounded-lg p-4 md:p-6 space-y-3">
        <div className="flex items-start gap-3">
          <Icon name="Mail" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium text-foreground">{formData?.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="User" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Full Name</p>
            <p className="text-sm font-medium text-foreground">{formData?.fullName}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="GraduationCap" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">University</p>
            <p className="text-sm font-medium text-foreground">
              {formData?.university ? 
                universityOptions?.find(u => u?.value === formData?.university)?.label : 
                'Not specified'}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon name="BookOpen" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground">Academic Year</p>
            <p className="text-sm font-medium text-foreground">
              {formData?.academicYear ? 
                academicYearOptions?.find(y => y?.value === formData?.academicYear)?.label : 
                'Not specified'}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          description="By checking this box, you acknowledge that you have read and agree to our terms"
          checked={formData?.agreeToTerms}
          onChange={(e) => onChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label="Send me updates about new features and wellness tips"
          description="Optional - You can change this preference anytime in settings"
          checked={formData?.receiveUpdates}
          onChange={(e) => onChange('receiveUpdates', e?.target?.checked)}
        />
      </div>
    </div>
  );
};

const universityOptions = [
  { value: 'stanford', label: 'Stanford University' },
  { value: 'mit', label: 'Massachusetts Institute of Technology' },
  { value: 'harvard', label: 'Harvard University' },
  { value: 'berkeley', label: 'UC Berkeley' },
  { value: 'caltech', label: 'California Institute of Technology' },
  { value: 'princeton', label: 'Princeton University' },
  { value: 'yale', label: 'Yale University' },
  { value: 'columbia', label: 'Columbia University' },
  { value: 'chicago', label: 'University of Chicago' },
  { value: 'penn', label: 'University of Pennsylvania' },
  { value: 'other', label: 'Other University' }
];

const academicYearOptions = [
  { value: 'freshman', label: 'Freshman (1st Year)' },
  { value: 'sophomore', label: 'Sophomore (2nd Year)' },
  { value: 'junior', label: 'Junior (3rd Year)' },
  { value: 'senior', label: 'Senior (4th Year)' },
  { value: 'graduate', label: 'Graduate Student' },
  { value: 'phd', label: 'PhD Candidate' }
];

export default CompletionStep;