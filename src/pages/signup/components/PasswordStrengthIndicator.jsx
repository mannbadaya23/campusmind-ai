import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (pwd) => {
    if (!pwd) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (pwd?.length >= 8) strength++;
    if (pwd?.length >= 12) strength++;
    if (/[a-z]/?.test(pwd) && /[A-Z]/?.test(pwd)) strength++;
    if (/\d/?.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/?.test(pwd)) strength++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Weak', color: 'bg-error' },
      { strength: 2, label: 'Fair', color: 'bg-warning' },
      { strength: 3, label: 'Good', color: 'bg-accent' },
      { strength: 4, label: 'Strong', color: 'bg-success' },
      { strength: 5, label: 'Very Strong', color: 'bg-success' }
    ];

    return levels?.[strength];
  };

  const { strength, label, color } = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full transition-smooth ${
              level <= strength ? color : 'bg-muted'
            }`}
          />
        ))}
      </div>
      {label && (
        <p className="text-xs text-muted-foreground">
          Password strength: <span className="font-medium">{label}</span>
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;