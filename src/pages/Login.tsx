import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, Zap } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, signUp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please sign in.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password sign-in is not enabled in Firebase Console.');
      } else {
        setError(err.message || (isSignUp ? 'Failed to create account.' : 'Invalid credentials. Please try again.'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google Auth error:', err);
      setError(err.message || 'Failed to sign in with Google.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ecotrophy-light flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Energetic Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ecotrophy-blue opacity-10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ecotrophy-lime opacity-10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10 animate-fade-in slide-up">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-ecotrophy-navy to-ecotrophy-blue rounded-2xl shadow-2xl mb-6">
            <Zap className="text-ecotrophy-lime drop-shadow-md" size={32} />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-ecotrophy-navy via-ecotrophy-blue to-blue-400">
            Ecotrophy <span className="text-ecotrophy-navy">OS</span>
          </h1>
          <p className="text-slate-500 font-medium">
            {isSignUp ? 'Initialize your command center.' : 'Enter the operational pulse. Enterprise-ready.'}
          </p>
        </div>

        <div className="premium-card p-8 bg-white/90 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,102,255,0.15)] border border-white/50 rounded-3xl">
          <form onSubmit={handleAuth} className="space-y-6">
            {error && (
              <div className="p-4 bg-gradient-to-r from-rose-50 to-white border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-sm font-semibold shadow-sm">
                <AlertCircle size={18} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="block text-sm font-extrabold text-ecotrophy-navy tracking-wide">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="founder@ecotrophy.com"
                  className="input-field pl-11 w-full font-medium"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-extrabold text-ecotrophy-navy tracking-wide">Password</label>
                {!isSignUp && <a href="#" className="text-xs font-bold text-ecotrophy-blue hover:text-ecotrophy-blueDark transition-colors">Forgot password?</a>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-11 w-full font-medium tracking-widest"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-ecotrophy-blue to-blue-500 text-white rounded-2xl text-lg font-extrabold tracking-wide shadow-punchy transition-all hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(0,102,255,0.35)] active:scale-[0.98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (isSignUp ? 'Creating Account...' : 'Authenticating...') : (isSignUp ? 'Create Account' : 'Sign In to OS')}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">or continue with</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <button 
            onClick={handleGoogleAuth}
            disabled={isSubmitting}
            className="mt-8 w-full py-3.5 px-4 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 text-slate-700 font-bold transition-all hover:bg-slate-50 hover:border-slate-200 hover:shadow-sm active:scale-[0.98]"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm font-bold text-ecotrophy-blue hover:text-ecotrophy-blueDark transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>

        <p className="text-center mt-10 text-xs font-medium text-slate-400">
          © 2026 Ecotrophy Innovations Private Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
};
