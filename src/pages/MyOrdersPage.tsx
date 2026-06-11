import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../store/useOrderStore';
import { Package, ChevronRight, Download } from 'lucide-react';
import { generateInvoice } from '../utils/invoiceGenerator';

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const { orders } = useOrderStore();

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'DELIVERED': return 'text-green-600 bg-green-50 border-green-200';
      case 'CANCELLED': return 'text-red-600 bg-red-50 border-red-200';
      case 'PROCESSING': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'OUT_FOR_DELIVERY': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Package className="w-8 h-8 text-gold" />
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-royale-surface rounded-2xl p-12 text-center shadow-sm">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No orders found</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate('/buy-paint-online')}
              className="px-6 py-3 bg-gradient-gold text-white rounded-lg font-bold hover:opacity-90 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-royale-surface rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-500 block">Order ID</span>
                    <span className="font-bold text-gray-900">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Date</span>
                    <span className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Total Amount</span>
                    <span className="font-bold text-gray-900">₹{order.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div>
                    <button 
                      onClick={() => navigate(`/order/${order.id}`)}
                      className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-1 text-sm bg-blue-50 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
                    >
                      View Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex gap-4 overflow-x-auto min-w-0 max-w-full pb-2">
                      {order.items.map(item => (
                        <div key={item.id} className="w-20 h-20 flex-shrink-0 border border-gray-100 rounded-xl overflow-hidden bg-royale-surface">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-400">No Image</div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:items-end gap-3 min-w-[200px]">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                      <button 
                        onClick={() => generateInvoice(order)}
                        className="text-gray-600 hover:text-gray-900 text-sm flex items-center gap-2 font-medium"
                      >
                        <Download className="w-4 h-4" /> Invoice
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
