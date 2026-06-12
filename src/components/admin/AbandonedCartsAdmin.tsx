import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ShoppingCart, Clock, Mail, Trash2, Search } from 'lucide-react';
import { CartItem } from '../../store/useCartStore';

interface AbandonedCart {
  id: string;
  items: CartItem[];
  updatedAt: any;
  itemCount: number;
  userId: string | null;
  userEmail?: string;
}

export default function AbandonedCartsAdmin() {
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [emailsFetched, setEmailsFetched] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'abandoned_carts'), orderBy('updatedAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      let cartsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AbandonedCart[];
      
      // Fetch user emails if userId exists
      cartsData = await Promise.all(cartsData.map(async (cart) => {
        if (cart.userId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', cart.userId));
            if (userDoc.exists()) {
              cart.userEmail = userDoc.data().email;
            }
          } catch (e) {
            console.error("Error fetching user email:", e);
          }
        }
        return cart;
      }));
      
      setCarts(cartsData);
      setLoading(false);
      setEmailsFetched(true);
    }, (error) => {
      console.error("Error fetching abandoned carts:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this abandoned cart record?')) {
      try {
        await deleteDoc(doc(db, 'abandoned_carts', id));
      } catch (error) {
        console.error('Error deleting cart:', error);
        alert('Failed to delete cart record.');
      }
    }
  };
  
  const handleRemind = (email?: string) => {
    if (email) {
      window.location.href = `mailto:${email}?subject=You left items in your cart at Rainbow Paints&body=Hi there,%0A%0AWe noticed you left some items in your cart. Complete your checkout today and get 10%25 off your order with code RECOVER10!%0A%0AVisit https://rainbowpaint.in to checkout.`;
    } else {
      alert("No email found for this user.");
    }
  };

  const filteredCarts = carts.filter(cart => 
    cart.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cart.userId && cart.userId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.unitPrice * item.size * item.quantity), 0);
  };

  const formatDistanceToNow = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
        <div>
          <h2 className="text-xl font-display font-bold text-zinc-900">Abandoned Carts</h2>
          <p className="text-sm text-zinc-600 mt-1">
            Track and recover potential lost sales. {carts.length} carts abandoned.
          </p>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search by ID or User..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredCarts.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-zinc-100 text-center text-zinc-600 shadow-sm">
            <ShoppingCart className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <p>No abandoned carts found.</p>
          </div>
        ) : (
          filteredCarts.map(cart => {
            const total = calculateTotal(cart.items);
            return (
              <div key={cart.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/50">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-zinc-200 text-zinc-700 px-2.5 py-1 rounded-md">
                        {cart.id.substring(0, 8)}...
                      </span>
                      {cart.userEmail && (
                        <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {cart.userEmail}
                        </span>
                      )}
                      {!cart.userEmail && cart.userId && (
                        <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                          <ShoppingCart className="w-3 h-3" /> User: {cart.userId.substring(0, 8)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-600">
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {formatDistanceToNow(cart.updatedAt)}</span>
                      <span className="font-medium text-zinc-900 border-l border-zinc-300 pl-4">₹{total.toLocaleString()} Value</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {cart.userEmail && (
                      <button 
                        onClick={() => handleRemind(cart.userEmail)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" /> Remind
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(cart.id)}
                      className="p-1.5 text-zinc-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cart.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-zinc-100 bg-zinc-50/50">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-contain rounded-lg bg-white p-1 border border-zinc-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-zinc-900 truncate" title={item.name}>{item.name}</p>
                          <p className="text-xs text-zinc-600 capitalize">{item.brand}</p>
                          <div className="flex items-center justify-between mt-1 pt-1 border-t border-zinc-200/60">
                            <span className="text-xs font-semibold text-zinc-700">{item.size}L × {item.quantity}</span>
                            <span className="text-xs font-bold text-zinc-900">₹{(item.unitPrice * item.size * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
