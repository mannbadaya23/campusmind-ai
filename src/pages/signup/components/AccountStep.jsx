import React from 'react';
import Input from '../../../components/ui/Input';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const AccountStep = ({ formData, errors, onChange }) => {
  return (
    <div className="space-y-4 md:space-y-5">
      <div>
        <Input
          type="email"
          label="Email Address"
          placeholder="your.email@university.edu"
          value={formData?.email}
          onChange={(e) => onChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={(e) => onChange('password', e?.target?.value)}
          error={errors?.password}
          required
        />
        <PasswordStrengthIndicator password={formData?.password} />
      </div>
      <div>
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={formData?.confirmPassword}
          onChange={(e) => onChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />
      </div>
      <div className="pt-2">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters for optimal security.
        </p>
      </div>
    </div>
  );
};

export default AccountStep;