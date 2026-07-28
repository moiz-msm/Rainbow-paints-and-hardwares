import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/useOrderStore';
import { Package, Download, ChevronLeft, MapPin, CreditCard, HelpCircle } from 'lucide-react';
import { generateInvoice } from '../utils/invoiceGenerator';
import SEO from '../components/SEO';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="bg-royale-bg min-h-screen pt-24 pb-12 flex flex-col items-center justify-center">
        <SEO title="Order Not Found | Rainbow Paints" noindex={true} />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h1>
        <button onClick={() => navigate('/my-orders')} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
          <ChevronLeft className="w-5 h-5" /> Back to My Orders
        </button>
      </div>
    );
  }

  const timelineSteps = [
    { key: 'PROCESSING', label: 'Ordered', desc: 'Order placed successfully' },
    { key: 'CONFIRMED', label: 'Confirmed', desc: 'Seller has confirmed order' },
    { key: 'PACKED', label: 'Packed', desc: 'Item ready for pickup' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Out for delivery in your area' },
    { key: 'DELIVERED', label: 'Delivered', desc: 'Item delivered' },
  ];

  const currentStepIndex = timelineSteps.findIndex(s => s.key === order.status);
  const isCancelled = order.status === 'CANCELLED';

  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <SEO title={`Order #${order.id} | Rainbow Paints`} noindex={true} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate('/my-orders')} className="text-zinc-600 hover:text-gray-900 font-semibold flex items-center gap-2 mb-6">
          <ChevronLeft className="w-5 h-5" /> Back to My Orders
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order #{order.id}</h1>
            <p className="text-zinc-600 mt-1">Placed on {new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <button 
            onClick={() => generateInvoice(order)}
            className="flex items-center gap-2 px-4 py-2 bg-royale-surface border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold shadow-sm transition-colors"
          >
            <Download className="w-5 h-5" /> Invoice
          </button>
        </div>

        {/* Timeline Tracker */}
        <div className="bg-royale-surface rounded-2xl shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-8">Order Status</h2>
          
          {isCancelled ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 font-semibold text-center">
              This order has been cancelled.
            </div>
          ) : (
            <div className="relative">
              <div className="absolute left-[19px] sm:left-1/2 sm:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-gray-200 -z-10 hidden sm:block"></div>
              <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-200 -z-10 sm:hidden"></div>
              
              <div className="flex flex-col sm:flex-row justify-between relative gap-8 sm:gap-4">
                {timelineSteps.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  
                  return (
                    <div key={step.key} className="flex sm:flex-col items-center sm:text-center relative z-10 w-full sm:w-1/5">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        isCompleted ? 'bg-gold border-gold text-black' : 'bg-royale-surface border-gray-300 text-gray-300'
                      } ${isCurrent ? 'ring-4 ring-gold/20' : ''}`}>
                        {isCompleted ? <CheckIcon /> : <ClockIcon />}
                      </div>
                      
                      <div className="ml-4 sm:ml-0 sm:mt-4">
                        <div className={`font-bold ${isCompleted ? 'text-gray-900' : 'text-zinc-600'}`}>{step.label}</div>
                        <div className="text-xs text-zinc-600 mt-1 hidden sm:block">{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Order Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Products List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-royale-surface rounded-2xl shadow-sm p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Package className="w-5 h-5 text-zinc-600" /> Items in this Order
              </h2>
              
              <div className="space-y-6">
                {order.items.map(item => (
                  <div key={item.id} className="flex gap-4 sm:gap-6 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-600">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-zinc-600 mt-1 truncate">{item.brand}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded-md">Size: {item.size}L</span>
                        <span className="bg-gray-100 px-2 py-1 rounded-md">Qty: {item.quantity}</span>
                      </div>
                      {item.shade && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg break-words max-w-full">
                          <div className="w-4 h-4 rounded-full border border-gray-200 shrink-0" style={{ backgroundColor: item.shade.hex }} />
                          <span className="truncate">{item.shade.code} ({item.shade.name})</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <div className="font-bold text-gray-900">₹{(item.unitPrice * item.size * item.quantity).toLocaleString()}</div>
                      <div className="text-xs text-zinc-600 mt-1">₹{item.unitPrice}/L</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-royale-surface rounded-2xl shadow-sm p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="font-bold text-gray-900">Need help with your order?</h3>
                  <p className="text-sm text-zinc-600">Contact our support team for assistance.</p>
                </div>
              </div>
              <a 
                href="https://wa.me/918072442930" 
                target="_blank" 
                rel="noreferrer"
                className="px-4 py-2 bg-green-50 text-green-700 font-semibold rounded-lg hover:bg-green-100 transition-colors border border-green-200"
              >
                Chat Support
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-royale-surface rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{order.gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 pb-3 border-b border-gray-100">
                  <span>Delivery Fee</span>
                  <span>{order.deliveryFee === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `₹${order.deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-1">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>

            <div className="bg-royale-surface rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                <MapPin className="w-5 h-5 text-zinc-600" /> Shipping Info
              </h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p className="font-semibold text-gray-900 text-base">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.landmark && <p>Landmark: {order.shippingAddress.landmark}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                <p className="pt-2 font-medium">Phone: {order.shippingAddress.phone}</p>
                {order.shippingAddress.email && <p className="font-medium text-zinc-600">Email: {order.shippingAddress.email}</p>}
              </div>
            </div>

            <div className="bg-royale-surface rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
                <CreditCard className="w-5 h-5 text-zinc-600" /> Payment Info
              </h2>
              <div className="text-sm text-gray-600">
                <p>Method: <span className="font-semibold text-gray-900">{order.paymentMethod}</span></p>
                <p className="mt-1">Status: <span className="font-semibold text-green-600">Paid</span></p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );
}
