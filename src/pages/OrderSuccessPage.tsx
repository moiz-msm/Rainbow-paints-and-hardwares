import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Download, Package, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { useOrderStore, Order } from '../store/useOrderStore';
import { generateInvoice } from '../utils/invoiceGenerator';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const { orders } = useOrderStore();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderId) {
      const foundOrder = orders.find(o => o.id === orderId);
      if (foundOrder) setOrder(foundOrder);
    }
  }, [orderId, orders]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <RefreshCw className="animate-spin w-8 h-8 text-gold mx-auto mb-4" />
          <p className="text-zinc-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    generateInvoice(order);
  };

  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="bg-royale-surface rounded-3xl shadow-sm p-8 md:p-12 text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4 relative">
              <CheckCircle2 className="w-16 h-16 text-green-600 relative z-10" />
              <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 animate-ping"></div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg mb-2">Thank you for shopping with Rainbow Paints & Hardwares.</p>
          <p className="text-zinc-600 mb-8">Your order <span className="font-bold text-black">{order.id}</span> has been placed successfully.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate(`/order/${order.id}`)}
              className="px-8 py-3 bg-gray-900 text-[#ffffff] rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <Eye className="w-5 h-5" /> View Order details
            </button>
            <button 
              onClick={() => navigate('/buy-paint-online')}
              className="px-8 py-3 bg-gradient-gold text-white rounded-xl font-bold hover:opacity-90 transition-colors flex items-center justify-center gap-2"
            >
              Continue Shopping <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-royale-surface p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-zinc-600" /> Order Summary
            </h2>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.name} ({item.size}L)
                    {item.shade ? ` - ${item.shade.name}${item.shade.code ? ` (${item.shade.code})` : ''}` : ''}
                  </span>
                  <span className="font-semibold text-gray-900">₹{(item.quantity * item.size * item.unitPrice).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 my-1">
                  <span>GST (18%)</span>
                  <span>₹{order.gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Delivery</span>
                  <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-gray-100 pt-2">
                  <span>Total Paid</span>
                  <span>₹{order.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-royale-surface p-6 rounded-2xl shadow-sm space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-zinc-600 uppercase tracking-wider mb-2">Delivery Details</h2>
              <p className="font-semibold text-gray-900">{order.shippingAddress.name}</p>
              <p className="text-gray-600 text-sm mt-1">{order.shippingAddress.line1}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
              <p className="text-gray-600 text-sm mt-1">Phone: {order.shippingAddress.phone}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-semibold text-zinc-600 uppercase tracking-wider mb-2">Estimated Delivery</h2>
              <p className="font-semibold text-black bg-blue-50 px-3 py-2 rounded-lg inline-block border border-blue-100">
                {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div>
              <h2 className="text-sm font-semibold text-zinc-600 uppercase tracking-wider mb-2">Payment Mode</h2>
              <p className="font-semibold text-gray-900">{order.paymentMethod}</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={handleDownloadInvoice}
            className="text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center gap-2 mx-auto"
          >
            <Download className="w-5 h-5" /> Download Tax Invoice (PDF)
          </button>
        </div>

      </div>
    </div>
  );
}
