import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ProgressSteps from "./components/ProgressSteps";
import AccountStep from "./components/AccountStep";
import ProfileStep from "./components/ProfileStep";
import CompletionStep from "./components/CompletionStep";

const Signup = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    university: "",
    academicYear: "",
    major: "",
    agreeToTerms: false,
    receiveUpdates: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "", submit: "" }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.password || formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    if (step === 2) {
      if (!formData.fullName) newErrors.fullName = "Full name required";
      if (!formData.university) newErrors.university = "University required";
      if (!formData.academicYear)
        newErrors.academicYear = "Academic year required";
    }

    if (step === 3 && !formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must accept terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep((p) => p + 1);
  };

  const handleBack = () => setCurrentStep((p) => p - 1);

  // 🔥 REAL FIREBASE SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    setErrors({});

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.fullName,
      });

      navigate("/dashboard-overview");
    } catch (error) {
      console.error(error);

      let msg = "Signup failed";

      if (error.code === "auth/email-already-in-use")
        msg = "Email already exists";
      if (error.code === "auth/weak-password")
        msg = "Password too weak";
      if (error.code === "auth/invalid-email")
        msg = "Invalid email";

      setErrors({ submit: msg });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    if (currentStep === 1)
      return (
        <AccountStep
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />
      );

    if (currentStep === 2)
      return (
        <ProfileStep
          formData={formData}
          errors={errors}
          onChange={handleChange}
        />
      );

    return (
      <CompletionStep
        formData={formData}
        errors={errors}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl bg-card rounded-xl p-8 shadow-lg">
        <div className="text-center mb-6">
          <Icon name="Brain" size={40} className="mx-auto text-primary" />
          <h1 className="text-3xl font-semibold mt-2">Create Account</h1>
        </div>

        <ProgressSteps currentStep={currentStep} totalSteps={3} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}

          {errors.submit && (
            <p className="text-red-500 text-sm text-center">
              {errors.submit}
            </p>
          )}

          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack} fullWidth>
                Back
              </Button>
            )}

            {currentStep < 3 ? (
              <Button onClick={handleNext} fullWidth>
                Continue
              </Button>
            ) : (
              <Button type="submit" loading={loading} fullWidth>
                Create Account
              </Button>
            )}
          </div>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
