import React, { useState } from 'react';
import { currentUser } from '../data/mockData';
import type { User } from '../types';
import { AuthContext } from './auth';

const STORAGE_KEY = 'ecotrophy.mockUser';

const getStoredUser = () => {
  const storedUser = window.localStorage.getItem(STORAGE_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const loading = false;

  const login = async (email: string, pass: string) => {
    if (!email || pass.length < 6) {
      throw new Error('Enter an email and a password with at least 6 characters.');
    }

    const mockUser = { ...currentUser, email };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signUp = async (email: string, pass: string) => {
    await login(email, pass);
  };

  const loginWithGoogle = async () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    setUser(currentUser);
  };

  const logout = async () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, loginWithGoogle, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
