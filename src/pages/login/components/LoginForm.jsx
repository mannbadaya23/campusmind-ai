import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      navigate('/dashboard-overview');
    } catch (error) {
      let message = 'Login failed';

      if (error.code === 'auth/user-not-found') {
        message = 'User not found';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      }

      setErrors({ submit: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="email"
        name="email"
        label="Email Address"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        disabled={isLoading}
      />

      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px]"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
        </button>
      </div>

      <Checkbox
        name="rememberMe"
        label="Remember me"
        checked={formData.rememberMe}
        onChange={handleChange}
        disabled={isLoading}
      />

      {errors.submit && (
        <p className="text-sm text-destructive">{errors.submit}</p>
      )}

      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        iconName="LogIn"
        iconPosition="right"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
