import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { auth } from '../lib/firebase';
import { linkWithPopup, GoogleAuthProvider, linkWithPhoneNumber, RecaptchaVerifier, ConfirmationResult, unlink } from 'firebase/auth';
import { motion } from 'framer-motion';
import { User, Phone, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AccountSettingsPage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [isPhoneLinked, setIsPhoneLinked] = useState(false);
  const [isGoogleLinked, setIsGoogleLinked] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [showPhoneInput, setShowPhoneInput] = useState(false);

  useEffect(() => {
    if (user) {
      const providers = user.providerData.map(p => p.providerId);
      setIsPhoneLinked(providers.includes('phone'));
      setIsGoogleLinked(providers.includes('google.com'));
    }
  }, [user]);

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      try {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'settings-recaptcha-container', {
          'size': 'invisible'
        });
      } catch (e) {
        console.error("Recaptcha error", e);
      }
    }
  };

  const handleLinkGoogle = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const provider = new GoogleAuthProvider();
      await linkWithPopup(user, provider);
      setIsGoogleLinked(true);
      setSuccess('Google account successfully linked!');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/credential-already-in-use' || err.code === 'auth/account-exists-with-different-credential') {
        setError('This Google account is already linked to another user account. Please log in with that account directly.');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setError('Linking cancelled.');
      } else {
        setError(err.message || 'Failed to link Google account.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUnlink = async (providerId: string) => {
    if (!user) return;
    if (user.providerData.length === 1) {
      setError('You cannot unlink your only sign-in method.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await unlink(user, providerId);
      if (providerId === 'phone') setIsPhoneLinked(false);
      if (providerId === 'google.com') setIsGoogleLinked(false);
      setSuccess(`Provider ${providerId} successfully unlinked.`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || `Failed to unlink ${providerId}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      let formattedPhone = phoneNumber.trim();
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = '+91' + formattedPhone;
      }
      const result = await linkWithPhoneNumber(user, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setSuccess('Verification code sent! Please check your messages.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send verification code.');
      if ((window as any).recaptchaVerifier) {
         try {
           (window as any).recaptchaVerifier.clear();
           (window as any).recaptchaVerifier = null;
         } catch(e) {}
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult || !user) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await confirmationResult.confirm(verificationCode);
      setIsPhoneLinked(true);
      setShowPhoneInput(false);
      setSuccess('Phone number successfully linked!');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/credential-already-in-use') {
        setError('This phone number is already linked to another account. Please use a different number or log in directly with that number.');
      } else {
        setError(err.message || 'Invalid verification code or linking failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-serif text-zinc-900 mb-4">You are not signed in</h2>
        <p className="text-zinc-500 mb-8">Please sign in to view your account settings.</p>
        <Link to="/" className="text-gold font-medium hover:underline">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-gold" />
          <h1 className="text-3xl font-serif font-medium text-zinc-900">Account Settings</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-zinc-100">
            <h2 className="text-xl font-serif font-medium text-zinc-900 mb-2">Profile Details</h2>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                <User className="w-8 h-8" />
              </div>
              <div>
                <p className="text-lg font-medium text-zinc-900">{user.displayName || 'User'}</p>
                <p className="text-sm text-zinc-500">ID: {user.uid}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-serif font-medium text-zinc-900 mb-6">Linked Accounts / Sign In Methods</h2>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl flex items-start gap-3 border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm rounded-xl flex items-start gap-3 border border-green-100">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p>{success}</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Google Link Status */}
              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900">Google Account</h3>
                    <p className="text-xs text-zinc-500">
                      {isGoogleLinked ? 'Connected' : 'Not connected'}
                    </p>
                  </div>
                </div>
                <div>
                  {isGoogleLinked ? (
                    <button 
                      onClick={() => handleUnlink('google.com')}
                      disabled={loading || user.providerData.length === 1}
                      className="px-4 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Unlink
                    </button>
                  ) : (
                    <button 
                      onClick={handleLinkGoogle}
                      disabled={loading}
                      className="px-4 py-2 text-xs font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Link Google
                    </button>
                  )}
                </div>
              </div>

              {/* Phone Status */}
              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Phone className="w-5 h-5 text-zinc-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900">Phone Number (SMS)</h3>
                    <p className="text-xs text-zinc-500">
                      {isPhoneLinked ? (user.phoneNumber || 'Connected') : 'Not connected'}
                    </p>
                  </div>
                </div>
                <div>
                  {isPhoneLinked ? (
                    <button 
                      onClick={() => handleUnlink('phone')}
                      disabled={loading || user.providerData.length === 1}
                      className="px-4 py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Unlink
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowPhoneInput(!showPhoneInput)}
                      disabled={loading}
                      className="px-4 py-2 text-xs font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {showPhoneInput ? 'Cancel' : 'Link Phone'}
                    </button>
                  )}
                </div>
              </div>

              {/* Phone Input Box */}
              {showPhoneInput && !isPhoneLinked && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-white border border-zinc-200 rounded-xl"
                >
                  {!confirmationResult ? (
                    <form onSubmit={handleSendCode} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 mb-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                          <input 
                            type="tel" 
                            required 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm" 
                            placeholder="e.g. +91 9876543210"
                          />
                        </div>
                      </div>
                      <div id="settings-recaptcha-container" className="flex justify-center"></div>
                      <button 
                        type="submit" 
                        disabled={loading || !phoneNumber}
                        className="w-full py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
                      >
                        {loading ? 'Sending...' : 'Send Verification Code'}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyCode} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-700 mb-1">Verification Code</label>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                          <input 
                            type="text" 
                            required 
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm" 
                            placeholder="123456"
                          />
                        </div>
                      </div>
                      <button 
                        type="submit" 
                        disabled={loading || !verificationCode}
                        className="w-full py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 disabled:opacity-50"
                      >
                        {loading ? 'Verifying...' : 'Verify & Link'}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}

            </div>
            
            <div className="mt-8 border-t border-zinc-100 pt-6">
              <p className="text-xs text-zinc-500">
                You can link multiple providers so you can sign in using any of them, while all pointing to the same account data (orders, profile, etc.).
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
