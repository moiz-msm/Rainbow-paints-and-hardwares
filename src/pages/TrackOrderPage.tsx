import React, { useState, useEffect } from 'react';
import { Package, Search, Truck, MapPin, Box, LogIn, ChevronRight, XCircle } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import SEO from '../components/SEO';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useSearchParams } from 'react-router-dom';

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user, openAuthModal } = useAuthStore();

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setOrderId(idFromUrl);
      trackOrder(idFromUrl);
    }
  }, [searchParams]);

  const trackOrder = async (idToTrack: string) => {
    if (!idToTrack.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const docRef = doc(db, 'orders', idToTrack.trim());
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setOrder({ id: docSnap.id, ...data });
      } else {
        setError('Order not found. Please check your order ID and try again.');
      }
    } catch (err) {
      console.error("Error tracking order:", err);
      setError('Unable to track order. It may be due to permission settings if the order does not exist or network issues.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    trackOrder(orderId);
  };


  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DELIVERED': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'CANCELLED': return 'text-rose-600 bg-rose-50 border-rose-200';
      case 'PROCESSING': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'OUT_FOR_DELIVERY': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'SHIPPED': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      default: return 'text-zinc-600 bg-zinc-50 border-zinc-200';
    }
  };

  const statusMap: Record<string, string> = {
    'PENDING': 'Order Placed',
    'PROCESSING': 'Processing',
    'SHIPPED': 'Shipped',
    'OUT_FOR_DELIVERY': 'Out for Delivery',
    'DELIVERED': 'Delivered',
    'CANCELLED': 'Cancelled',
  };

  const statusDesc: Record<string, string> = {
    'PENDING': 'We have received your order.',
    'PROCESSING': 'Your order is being packed & prepared.',
    'SHIPPED': 'Your order has been shipped and is on the way.',
    'OUT_FOR_DELIVERY': 'Your order is out for delivery today!',
    'DELIVERED': 'Your order has been delivered successfully.',
    'CANCELLED': 'This order was cancelled.',
  };

  const statusSteps = ['PENDING', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const currentStepIndex = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="min-h-screen bg-royale-bg py-12 px-4 sm:px-6">
      <SEO 
        title="Track Order - Rainbow Paint and Hardwares" 
        description="Track your order status and shipping updates." 
      />
      
      <div className="max-w-2xl mx-auto mt-16 sm:mt-24">
        
        {/* Track Form Section */}
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl border border-zinc-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gold/20">
              <Package className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 mb-2">Track Your Order</h1>
            <p className="text-zinc-500">Enter your order ID that we sent to your email</p>
          </div>

          <form onSubmit={handleTrack} className="mb-6 relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-zinc-400" />
              </div>
              <input
                type="text"
                placeholder="e.g. ORD-12345-ABC"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full pl-11 pr-32 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-gold/50 font-mono tracking-wide"
                required
              />
              <button
                type="submit"
                disabled={loading || !orderId.trim()}
                className="absolute inset-y-2 right-2 px-6 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-bold tracking-wider uppercase text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Track'
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
              <XCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
              <p className="text-sm text-rose-700">{error}</p>
            </div>
          )}

          {!user && (
            <div className="mt-4 pt-6 border-t border-zinc-100 text-center">
              <p className="text-sm text-zinc-600 mb-3">Want to view all your orders?</p>
              <button
                type="button"
                onClick={() => openAuthModal()}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-semibold rounded-xl text-sm transition-colors"
              >
                <LogIn className="w-4 h-4" /> Sign in to your account
              </button>
            </div>
          )}
        </div>

        {/* Order Details Section */}
        {order && (
          <div className="mt-8 bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl border border-zinc-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <p className="text-zinc-500 text-sm font-medium mb-1">Order Details</p>
                <h2 className="text-xl font-mono font-bold text-zinc-900">{order.id}</h2>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                {statusMap[order.status] || order.status}
              </div>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 mb-8">
              <h3 className="font-bold text-zinc-900 mb-1">{statusMap[order.status] || order.status}</h3>
              <p className="text-sm text-zinc-600">{statusDesc[order.status] || 'Status unavailable.'}</p>
              {order.estimatedDelivery && order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                <p className="text-sm font-semibold text-zinc-900 mt-3 pt-3 border-t border-zinc-200/60 inline-block">
                  Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>

            {/* Tracking Timeline */}
            {order.status !== 'CANCELLED' && (
              <div className="relative mb-8 pb-4">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-zinc-200" />
                <div className="space-y-6 relative">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = currentStepIndex >= idx;
                    const isCurrent = currentStepIndex === idx;
                    
                    let Icon = Box;
                    if (step === 'SHIPPED') Icon = Truck;
                    if (step === 'DELIVERED') Icon = MapPin;
                    
                    return (
                      <div key={step} className={`flex items-start gap-4 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 shrink-0 outline outline-4 outline-white ${
                          isCurrent ? 'bg-gold text-black border-none' : 
                          isCompleted ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-400 border border-zinc-300'
                        }`}>
                          {isCompleted && !isCurrent ? (
                            <div className="w-2.5 h-2.5 bg-white rounded-full" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>
                        <div className="pt-1.5">
                          <p className={`text-sm font-bold ${isCurrent ? 'text-zinc-900' : 'text-zinc-800'}`}>
                            {statusMap[step]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Items Summary */}
            <div className="border-t border-zinc-100 pt-8">
              <h3 className="font-bold text-zinc-900 mb-4 pb-2 border-b border-zinc-100">Order Items</h3>
              <div className="space-y-4">
                {order.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-zinc-50 border border-zinc-100 flex-shrink-0 flex items-center justify-center p-2">
                       {item.images?.[0] ? (
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                        ) : (
                          <div className="w-8 h-8 bg-zinc-200 rounded-full" />
                       )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-zinc-900 truncate">{item.name}</p>
                      <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              {user && (
                <div className="mt-6 pt-4 border-t border-zinc-100">
                  <Link 
                    to={`/order/${order.id}`}
                    className="flex justify-between items-center text-sm font-semibold text-gold hover:text-gold/80"
                  >
                    View detailed order summary <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
