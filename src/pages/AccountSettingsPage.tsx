import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useOrderStore, OrderStatus } from '../store/useOrderStore';
import { auth } from '../lib/firebase';
import { linkWithPopup, GoogleAuthProvider, linkWithPhoneNumber, RecaptchaVerifier, ConfirmationResult, unlink } from 'firebase/auth';
import { motion } from 'framer-motion';
import { User, Phone, CheckCircle2, Shield, AlertCircle, Package, ChevronRight, ArrowRight, ShoppingBag, Eye, Calendar, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

export default function AccountSettingsPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { orders, syncWithFirestore } = useOrderStore();
  
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

      if (user.uid) {
        syncWithFirestore(user.uid).catch((err) => {
          console.warn('Order sync warning on Account page:', err);
        });
      }
    }
  }, [user, syncWithFirestore]);

  // Sort orders descending by date, and take the last 5
  const sortedOrders = [...orders].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  const recentOrders = sortedOrders.slice(0, 5);

  const getStatusBadge = (status: OrderStatus | string) => {
    switch (status) {
      case 'DELIVERED':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'CANCELLED':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'PROCESSING':
        return 'text-sky-700 bg-sky-50 border-sky-200';
      case 'CONFIRMED':
      case 'PACKED':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      case 'OUT_FOR_DELIVERY':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      default:
        return 'text-zinc-700 bg-zinc-50 border-zinc-200';
    }
  };

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
        <h1 className="text-2xl font-serif text-zinc-900 mb-4">You are not signed in</h1>
        <p className="text-zinc-600 mb-8">Please sign in to view your account dashboard.</p>
        <Link to="/" className="text-gold font-medium hover:underline">Go Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-10 sm:py-12">
      <SEO title="Account Dashboard | Rainbow Paints" noindex={true} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-200/60 shadow-sm shrink-0">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-medium text-zinc-900">Account Dashboard</h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">Manage your profile, recent orders, and security settings</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/my-orders"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-xl transition-colors shadow-sm"
            >
              <Package className="w-4 h-4 text-gold" />
              All Orders ({orders.length})
            </Link>
            <Link
              to="/buy-paint-online"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-gold" />
              Shop Paints
            </Link>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200/80 rounded-full flex items-center justify-center text-gold shadow-sm shrink-0">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-serif font-medium text-zinc-900">{user.displayName || 'Valued Customer'}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Member
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  {user.email || user.phoneNumber || `ID: ${user.uid.slice(0, 12)}...`}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 sm:border-l border-zinc-100 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto justify-between sm:justify-start">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">Total Orders</span>
                <span className="text-xl font-bold text-zinc-900 mt-0.5 block">{orders.length}</span>
              </div>
              <div className="h-8 w-[1px] bg-zinc-100" />
              <div>
                <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">Auth Methods</span>
                <span className="text-xl font-bold text-zinc-900 mt-0.5 block">{user.providerData.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden mb-8">
          <div className="p-6 sm:p-8 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-amber-50 rounded-lg text-gold">
                  <Package className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-serif font-medium text-zinc-900">Recent Orders</h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">Summary of your last 5 orders</p>
            </div>
            
            {recentOrders.length > 0 && (
              <Link 
                to="/my-orders" 
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gold hover:text-amber-700 transition-colors self-start sm:self-auto"
              >
                View All Orders ({orders.length}) <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          <div>
            {recentOrders.length === 0 ? (
              <div className="py-12 px-6 text-center">
                <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3 text-zinc-400">
                  <Package className="w-7 h-7" />
                </div>
                <h3 className="text-base font-medium text-zinc-900 mb-1">No recent orders found</h3>
                <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto mb-5">
                  You haven't placed any orders yet. Discover our premium paints and get doorstep delivery.
                </p>
                <Link
                  to="/buy-paint-online"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 rounded-xl text-xs sm:text-sm font-medium transition-colors"
                >
                  Start Shopping <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50/80 text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
                      <th className="py-3.5 px-4 sm:px-6">Order ID</th>
                      <th className="py-3.5 px-4 sm:px-6">Date</th>
                      <th className="py-3.5 px-4 sm:px-6">Status</th>
                      <th className="py-3.5 px-4 sm:px-6">Total Price</th>
                      <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {recentOrders.map((order) => {
                      const formattedDate = new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      });
                      const formattedPrice = `₹${Math.round(order.total).toLocaleString('en-IN')}`;
                      const totalItems = order.items.reduce((acc, it) => acc + (it.quantity || 1), 0);
                      const primaryItemName = order.items[0]?.name || 'Paint Supply';

                      return (
                        <tr 
                          key={order.id} 
                          onClick={() => navigate(`/order/${order.id}`)}
                          className="hover:bg-zinc-50/70 transition-colors cursor-pointer group"
                        >
                          <td className="py-4 px-4 sm:px-6">
                            <div className="font-semibold text-zinc-900 group-hover:text-gold transition-colors flex items-center gap-1.5">
                              <span>#{order.id}</span>
                            </div>
                            <span className="block text-xs text-zinc-500 mt-0.5 truncate max-w-[200px] sm:max-w-xs">
                              {primaryItemName} {order.items.length > 1 ? `+${order.items.length - 1} more` : `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-zinc-600 whitespace-nowrap">
                            <span className="text-xs sm:text-sm font-medium">{formattedDate}</span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider ${getStatusBadge(order.status)}`}>
                              {order.status.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                            <span className="text-sm sm:text-base font-bold text-zinc-900">
                              {formattedPrice}
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <Link
                              to={`/order/${order.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-900 rounded-lg transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 text-zinc-500" />
                              View
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Linked Accounts & Security */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-serif font-medium text-zinc-900 mb-2">Linked Accounts / Sign In Methods</h2>
            <p className="text-xs sm:text-sm text-zinc-500 mb-6">Manage how you access your account and sync your order history</p>
            
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
                    <p className="text-xs text-zinc-600">
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
                    <p className="text-xs text-zinc-600">
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
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
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
                          <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
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
                You can link multiple sign-in methods so you can sign in using any of them, while all pointing to the same account data (orders, profile, and wishlist).
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
