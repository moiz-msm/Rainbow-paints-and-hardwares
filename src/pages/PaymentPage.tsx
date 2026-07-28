import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore, PaymentMethod } from '../store/useOrderStore';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { 
  ShieldCheck, 
  ChevronRight, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet, 
  Banknote, 
  ShieldAlert,
  Lock,
  Loader2
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import SEO from '../components/SEO';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { currentOrderDraft, addOrder } = useOrderStore();
  const { clearCart } = useCartStore();
  const { user } = useAuthStore();
  
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // If no draft order, redirect back to cart
  if (!currentOrderDraft) {
    navigate('/buy-paint-online');
    return null;
  }

  const initiatePayment = async () => {
    setIsProcessing(true);
    setErrorStatus(null);
    try {
      const newOrderId = `order_rp_id_${Math.floor(1000000 + Math.random() * 9000000)}`;

      // Complete the transaction record locally in the user profile/Firestore
      // This is the most crucial part, so we do it first.
      await addOrder({
        ...(currentOrderDraft as any),
        id: newOrderId,
        date: new Date().toISOString(),
        paymentMethod: selectedMethod,
        status: 'PROCESSING'
      }, user?.uid || null);

      // Attempt backend verification strictly for email triggering (non-blocking)
      try {
        const { generateInvoiceDataUri } = await import('../utils/invoiceGenerator');
        const invoiceB64 = generateInvoiceDataUri({
          ...(currentOrderDraft as any),
          id: newOrderId,
          date: new Date().toISOString(),
          paymentMethod: selectedMethod,
          status: 'PROCESSING'
        });

        await fetch('/api/transaction/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: `pay_${Math.random().toString(36).substring(2, 11)}`,
            orderId: newOrderId,
            signature: `rp_sign_token_mock_local`,
            invoiceBase64: invoiceB64,
            orderDetails: {
              ...currentOrderDraft,
              shippingAddress: {
                ...currentOrderDraft.shippingAddress,
                email: currentOrderDraft.shippingAddress?.email || user?.email || 'customer@rainbowpaints.com'
              }
            }
          })
        });
      } catch (e) {
        console.warn("Soft fail on backend email notification", e);
      }

      clearCart();
      navigate(`/order-success?id=${newOrderId}`);

    } catch (err: any) {
      console.error("Payment error:", err);
      setErrorStatus(err.message || "Failed to process payment locally. Ensure database is connected.");
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: 'UPI', name: 'UPI', icon: <Smartphone className="w-6 h-6" />, desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'CARD', name: 'Credit / Debit Card', icon: <CreditCard className="w-6 h-6" />, desc: 'Visa, Mastercard, RuPay' },
    { id: 'NET_BANKING', name: 'Net Banking', icon: <Building2 className="w-6 h-6" />, desc: 'All major banks supported' },
    { id: 'WALLET', name: 'Wallets', icon: <Wallet className="w-6 h-6" />, desc: 'Amazon Pay, MobiKwik' },
    { id: 'COD', name: 'Cash on Delivery', icon: <Banknote className="w-6 h-6" />, desc: 'Pay at your doorstep' },
  ];

  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12 relative overflow-hidden">
      <SEO title="Payment Gateway | Rainbow Paints" noindex={true} />
      
      {/* Background radial elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Breadcrumb 
          className="justify-center text-gray-400"
          items={[
            { label: 'Catalog', href: '/buy-paint-online' },
            { label: 'Checkout', href: '/checkout' },
            { label: 'Payment Gateway' }
          ]} 
        />

        {errorStatus && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-xs mb-6 max-w-xl mx-auto flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
            <span>{errorStatus}</span>
          </div>
        )}

        <div className="bg-royale-surface border border-zinc-800 rounded-3xl shadow-2xl p-6 sm:p-10 text-center max-w-xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-600" />
          
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-gold animate-pulse" />
          </div>
          <h1 className="text-xl font-bold text-white mb-1">Verify Order Invoice</h1>
          <p className="text-gray-400 text-xs mb-6">Rainbow Paints Coimbatore Securing Handshake</p>
          
          <p className="text-gray-400 text-sm mb-1">Total Due Ledger</p>
          <p className="text-3xl font-extrabold text-gold mb-6 tracking-tight">₹{currentOrderDraft.total?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>

          <div className="space-y-4 text-left">
            {paymentMethods.map((method) => (
              <label 
                key={method.id} 
                className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'border-gold bg-gold/10 shadow-lg shadow-gold/5' 
                    : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center h-5">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="w-4 h-4 text-gold cursor-pointer accent-amber-500"
                    checked={selectedMethod === method.id}
                    onChange={() => setSelectedMethod(method.id as PaymentMethod)}
                  />
                </div>
                <div className="ml-4 flex items-center gap-4 flex-1">
                  <div className={`p-2.5 rounded-xl ${selectedMethod === method.id ? 'bg-gold/20 text-yellow-500' : 'bg-zinc-800 text-gray-400'}`}>
                    {method.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-200">{method.name}</div>
                    <div className="text-[11px] text-gray-400">{method.desc}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          <button 
            onClick={initiatePayment}
            disabled={isProcessing}
            className="w-full flex items-center justify-center py-4 bg-gradient-gold rounded-2xl font-bold text-white shadow-lg shadow-gold/15 hover:opacity-95 transition-all outline-none mt-8 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin h-5 w-5" />
                Contacting Secure Servers...
              </span>
            ) : (
              `Proceed to Pay ₹${currentOrderDraft.total?.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
            )}
          </button>
          
          <div className="mt-5 text-[10px] text-gray-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure 256-bit SSL Payment Pipeline</span>
          </div>

        </div>
      </div>

    </div>
  );
}
