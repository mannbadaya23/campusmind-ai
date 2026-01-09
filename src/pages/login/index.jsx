import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeHeader from './components/WelcomeHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import SignupRedirect from './components/SignupRedirect';
import Icon from '../../components/AppIcon';

import { auth } from '../../firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const Login = () => {
  const navigate = useNavigate();

  // ✅ STATE (SAFE – NO UI CHANGE)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ EMAIL LOGIN ONLY (NO SIGNUP HERE)
  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard-overview');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard-overview');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/landing-page')}
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth mb-6 md:mb-8"
        >
          <Icon name="ArrowLeft" size={16} />
          <span>Back to Home</span>
        </button>

        <div className="bg-card border border-border rounded-2xl shadow-soft-xl p-6 md:p-8 lg:p-10 space-y-8">
          <WelcomeHeader />

          {/* ✅ LOGIN FORM (NO UI CHANGE) */}
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            loading={loading}
            onEmailAuth={handleEmailLogin}
            onGoogleAuth={handleGoogleLogin}
          />

          <SignupRedirect />
          <SecurityBadges />
        </div>
      </div>
    </div>
  );
};

export default Login;
