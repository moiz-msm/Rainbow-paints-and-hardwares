import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { auth, db } from '../lib/firebase';
import { logActivity } from '../lib/activityLogger';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { doc, setDoc, getDoc, writeBatch } from 'firebase/firestore';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible'
        });
      } catch (e) {
        console.error("Recaptcha error", e);
      }
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMsg('');

    try {
      if (!confirmationResult) {
        setupRecaptcha();
        const appVerifier = (window as any).recaptchaVerifier;
        let formattedPhone = phoneNumber.trim();
        if (!formattedPhone.startsWith('+')) {
          formattedPhone = '+91' + formattedPhone;
        }
        const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        setConfirmationResult(result);
        setMsg('Verification code sent! Please check your messages.');
      } else {
        const result = await confirmationResult.confirm(verificationCode);
        
        // Ensure user doc exists
        const userDocRef = doc(db, 'users', result.user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          const configDocRef = doc(db, 'system', 'config');
          const configSnap = await getDoc(configDocRef);
          const isFirstUser = !configSnap.exists();
          const assignedRole = isFirstUser ? 'owner' : 'customer';

          const userData = {
            uid: result.user.uid,
            email: result.user.email || '',
            name: result.user.displayName || result.user.phoneNumber || 'User',
            phone: result.user.phoneNumber || '',
            role: assignedRole,
            createdAt: Date.now(),
            isActive: true
          };

          if (isFirstUser) {
            const batch = writeBatch(db);
            batch.set(userDocRef, userData);
            batch.set(doc(db, 'system', 'config'), { setupComplete: true, ownerId: result.user.uid, createdAt: Date.now() });
            await batch.commit();
          } else {
            await setDoc(userDocRef, userData);
          }
          
          try {
             const { crmService } = await import('../lib/crm');
             await crmService.notifyAdmin({
               title: `New Phone Registration`,
               message: `${userData.phone} just joined.`,
               type: 'crm'
             });
          } catch (e) {}
        }

        logActivity('SIGN_IN', `User signed in via Phone: ${result.user.phoneNumber}`, { 
          name: result.user.phoneNumber || 'Phone User', 
          uid: result.user.uid 
        });
        
        closeAuthModal();
      }
    } catch (err: any) {
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format. Please add country code (e.g. +91).');
      } else if (err.code === 'auth/invalid-verification-code') {
        setError('Invalid verification code.');
      } else {
        setError(err.message || 'An error occurred during phone auth.');
      }
      
      if ((window as any).recaptchaVerifier && !confirmationResult) {
         try {
           (window as any).recaptchaVerifier.clear();
           (window as any).recaptchaVerifier = null;
         } catch(e) {}
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    setMsg('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      
      const userDocRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        const configDocRef = doc(db, 'system', 'config');
        const configSnap = await getDoc(configDocRef);
        const isFirstUser = !configSnap.exists();

        let assignedRole = 'customer';
        if (isFirstUser) {
          assignedRole = 'owner';
        } else if (result.user.email?.toLowerCase() === 'moizmiyaji30@gmail.com') {
          assignedRole = 'owner';
        }

        const userData = {
          uid: result.user.uid,
          email: result.user.email || '',
          name: result.user.displayName || 'User',
          role: assignedRole,
          createdAt: Date.now(),
          isActive: true
        };

        if (isFirstUser) {
          const batch = writeBatch(db);
          batch.set(userDocRef, userData);
          batch.set(doc(db, 'system', 'config'), { setupComplete: true, ownerId: result.user.uid, createdAt: Date.now() });
          await batch.commit();
        } else {
          await setDoc(userDocRef, userData);
        }
        
        try {
           const { crmService } = await import('../lib/crm');
           await crmService.notifyAdmin({
             title: `New Google Registration`,
             message: `${userData.name} (${userData.email}) just joined.`,
             type: 'crm'
           });
        } catch (e) {}
      }
      
      logActivity('SIGN_IN', `User signed in via Google: ${result.user.displayName || result.user.email}`, { 
        email: result.user.email || '', 
        name: result.user.displayName || 'Google User', 
        uid: result.user.uid 
      });
      closeAuthModal();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Login was cancelled. Please try again.');
      } else if (err.code === 'auth/account-exists-with-different-credential' || err.code === 'auth/credential-already-in-use') {
        setError('An account with this email address already exists. Please sign in with your original method (e.g. email/password), and link this method in Account Settings.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'An error occurred during Google sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMsg('');

    try {
      if (mode === 'signup') {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        await sendEmailVerification(cred.user);
        
        // Check if this is the first user
        const configDocRef = doc(db, 'system', 'config');
        const configSnap = await getDoc(configDocRef);
        const isFirstUser = !configSnap.exists();

        let assignedRole = 'customer';
        if (isFirstUser) {
          assignedRole = 'owner';
        } else if (email.toLowerCase() === 'moizmiyaji30@gmail.com') {
          assignedRole = 'owner';
        } else {
          // Check for pre-assigned roles
          const rolesConfigSnap = await getDoc(doc(db, 'system', 'rolesConfig'));
          if (rolesConfigSnap.exists()) {
             const pending = rolesConfigSnap.data()._pendingEmails || {};
             if (pending[email.toLowerCase()]) {
               assignedRole = pending[email.toLowerCase()];
             }
          }
        }

        const userData = {
          uid: cred.user.uid,
          email: email,
          name: name,
          role: assignedRole,
          createdAt: Date.now(),
          isActive: true
        };

        if (isFirstUser) {
          const batch = writeBatch(db);
          batch.set(doc(db, 'users', cred.user.uid), userData);
          batch.set(doc(db, 'system', 'config'), { setupComplete: true, ownerId: cred.user.uid, createdAt: Date.now() });
          await batch.commit();
        } else {
          await setDoc(doc(db, 'users', cred.user.uid), userData);
        }

        logActivity('SIGN_UP', `New user registered: ${name} (${email})`, { 
          email: email, 
          name: name, 
          uid: cred.user.uid 
        });
        
        try {
           const { crmService } = await import('../lib/crm');
           await crmService.notifyAdmin({
             title: `New Customer Registration`,
             message: `${name} (${email}) just joined.`,
             type: 'crm'
           });
        } catch (e) {}

        setMsg('Account created successfully! Please check your email to verify your account.');
        setTimeout(() => closeAuthModal(), 2000);
      } else if (mode === 'login') {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        // We do not prevent login if unverified as they might not be able to get back in to trigger verification, 
        // however, if needed, you could enforce it here.
        logActivity('SIGN_IN', `User signed in: ${cred.user.displayName || cred.user.email}`, { 
          email: cred.user.email || '', 
          name: cred.user.displayName || 'Email User', 
          uid: cred.user.uid 
        });
        closeAuthModal();
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, email);
        setMsg('Password reset email sent! Check your inbox.');
      }
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={closeAuthModal} 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          <div className="p-6 sm:p-8">
            <button 
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-serif font-medium text-zinc-900 mb-2">
              {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
            </h2>
            <p className="text-sm text-zinc-600 mb-6">
              {mode === 'login' ? 'Sign in to your account' : mode === 'signup' ? 'Join us today' : 'We will send you reset instructions'}
            </p>

            {error && <div className="p-3 mb-4 text-xs text-red-600 bg-red-50 rounded-lg border border-red-100">{error}</div>}
            {msg && <div className="p-3 mb-4 text-xs text-green-600 bg-green-50 rounded-lg border border-green-100">{msg}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                      <input 
                        type="text" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all text-zinc-900" 
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all text-zinc-900" 
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                      <input 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all text-zinc-900" 
                        placeholder="••••••••"
                      />
                    </div>
                    {mode === 'login' && (
                      <div className="flex justify-end mt-1">
                        <button type="button" onClick={() => setMode('forgot')} className="text-[10px] text-gold hover:text-gold/80 hover:underline transition-colors">Forgot password?</button>
                      </div>
                    )}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Instructions'}
                </button>
              </form>

            {mode !== 'forgot' && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-zinc-600">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors focus:ring-2 focus:ring-zinc-200 focus:outline-none"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center text-xs text-zinc-600">
              {mode === 'login' ? (
                <p>Don't have an account? <button onClick={() => setMode('signup')} className="text-zinc-900 font-medium hover:underline">Sign up</button></p>
              ) : mode === 'signup' ? (
                <p>Already have an account? <button onClick={() => setMode('login')} className="text-zinc-900 font-medium hover:underline">Sign in</button></p>
              ) : (
                <p>Remember your password? <button onClick={() => setMode('login')} className="text-zinc-900 font-medium hover:underline">Sign in</button></p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
