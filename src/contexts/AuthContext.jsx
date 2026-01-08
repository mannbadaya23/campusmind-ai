import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Auth state listener (MUST be sync)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // 📧 Email login
  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return { user: res.user, error: null };
    } catch (error) {
      return { error };
    }
  };

  // 📝 Email signup
  const signup = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      return { user: res.user, error: null };
    } catch (error) {
      return { error };
    }
  };

  // 🔑 Google login
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      return { user: res.user, error: null };
    } catch (error) {
      return { error };
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    signup,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
