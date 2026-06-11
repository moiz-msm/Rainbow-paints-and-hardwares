import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, Phone, ShieldCheck, Award, Truck } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCartStore();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const total = items.reduce((sum, item) => sum + (item.unitPrice * item.size * item.quantity), 0);

  const handleWhatsAppOrder = () => {
    const phoneNumber = "918072442930"; // Assuming this from Header
    let message = "Hello, I would like to place an order:\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.brand})\n`;
      if (item.shade) {
        message += `   Shade: ${item.shade.name} ${item.shade.code ? `(${item.shade.code})` : ''}\n`;
      }
      message += `   Size: ${item.size}L | Qty: ${item.quantity}\n`;
      message += `   Price: ₹${(item.unitPrice * item.size * item.quantity).toLocaleString()}\n\n`;
    });
    
    message += `*Total Order Value: ₹${total.toLocaleString()}*\n\n`;
    message += "Please let me know the payment details and delivery time.";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-sm bg-royale-bg z-[100] border-l border-zinc-200 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-200">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-gold" />
                <h2 className="text-lg font-display font-bold text-ivory uppercase tracking-wider">Your Cart</h2>
              </div>
              <button 
                onClick={toggleCart}
                title="Close Cart"
                aria-label="Close Cart"
                className="p-2 text-zinc-500 hover:text-ivory rounded-full hover:bg-black/5 transition-colors"
              >
                <X aria-hidden="true" className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-zinc-200 flex items-center justify-center">
                    <ShoppingCart className="w-8 h-8 text-zinc-300" />
                  </div>
                  <div>
                    <p className="text-zinc-600 font-sans">Your cart is empty</p>
                    <button 
                      onClick={toggleCart}
                      className="mt-4 px-6 py-2 bg-gold/20 text-gold rounded-full font-medium text-sm hover:bg-gold/30 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-white shadow-sm border border-zinc-200 rounded-xl relative group">
                      <div className="w-16 h-16 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-400">No Image</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-ivory truncate">{item.name}</h3>
                        <p className="text-xs text-zinc-500">{item.brand} • {item.size}L Pack</p>
                        
                        {item.shade && (
                          <div className="mt-1.5 flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full border border-black/20" 
                              style={{ backgroundColor: item.shade.hex }}
                            />
                            <span className="text-[10px] text-ivory font-medium">
                              {item.shade.name} {item.shade.code && <span className="text-gold text-[9px]">({item.shade.code})</span>}
                            </span>
                          </div>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-zinc-100 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              title="Decrease quantity" aria-label="Decrease quantity"
                              className="p-1 hover:bg-black/5 rounded text-zinc-500 hover:text-ivory transition-colors"
                            >
                              <Minus aria-hidden="true" className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-ivory">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              title="Increase quantity" aria-label="Increase quantity"
                              className="p-1 hover:bg-black/5 rounded text-zinc-500 hover:text-ivory transition-colors"
                            >
                              <Plus aria-hidden="true" className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm font-semibold text-gold">
                            ₹{(item.unitPrice * item.size * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        title="Remove item" aria-label="Remove item"
                        className="absolute right-2 top-2 p-1.5 opacity-100 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-ivory transition-all"
                      >
                        <Trash2 aria-hidden="true" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-zinc-200 bg-zinc-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-zinc-700 font-display">Subtotal</span>
                  <span className="text-xl font-bold text-ivory">₹{total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    toggleCart();
                    navigate('/checkout');
                  }}
                  className="w-full mb-3 flex items-center justify-center gap-2 py-3.5 bg-gradient-gold hover:opacity-90 text-white rounded-xl font-bold transition-all outline-none shadow-lg shadow-gold/20"
                >
                  Proceed to Checkout
                </button>
                <button 
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white rounded-xl font-medium shadow-lg shadow-green-500/25 transition-all outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <Phone className="w-5 h-5 fill-current" />
                  Place Order via WhatsApp
                </button>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-4 text-[10px] text-zinc-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-gold" />
                    <span>Genuine Products</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Tracked Delivery</span>
                  </div>
                </div>
                <p className="text-[9px] text-center text-zinc-400 mt-3 font-sans max-w-[250px] mx-auto leading-tight">
                  You will be redirected to WhatsApp to confirm your order details securely.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
