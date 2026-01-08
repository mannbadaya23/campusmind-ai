import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileStep = ({ formData, errors, onChange }) => {
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

  return (
    <div className="space-y-4 md:space-y-5">
      <div>
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={(e) => onChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
        />
      </div>
      <div>
        <Select
          label="University"
          placeholder="Select your university"
          options={universityOptions}
          value={formData?.university}
          onChange={(value) => onChange('university', value)}
          error={errors?.university}
          searchable
          required
        />
      </div>
      <div>
        <Select
          label="Academic Year"
          placeholder="Select your current year"
          options={academicYearOptions}
          value={formData?.academicYear}
          onChange={(value) => onChange('academicYear', value)}
          error={errors?.academicYear}
          required
        />
      </div>
      <div>
        <Input
          type="text"
          label="Major / Field of Study"
          placeholder="e.g., Computer Science, Biology"
          value={formData?.major}
          onChange={(e) => onChange('major', e?.target?.value)}
          error={errors?.major}
        />
        <p className="mt-1 text-xs text-muted-foreground">Optional - helps personalize your experience</p>
      </div>
    </div>
  );
};

export default ProfileStep;