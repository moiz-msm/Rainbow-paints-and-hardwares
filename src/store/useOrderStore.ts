import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './useCartStore';
import { db, auth } from '../lib/firebase';
import { doc, getDocs, collection, query, where, setDoc, updateDoc } from 'firebase/firestore';
import { logActivity } from '../lib/activityLogger';

export interface Address {
  name: string;
  phone: string;
  email?: string;
  doorNo?: string;
  street?: string;
  area?: string;
  line1: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus = 'PROCESSING' | 'CONFIRMED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
export type PaymentMethod = 'UPI' | 'CARD' | 'NET_BANKING' | 'WALLET' | 'COD';

export interface Order {
  id: string; // e.g. RP1023
  date: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  gst: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  estimatedDelivery: string;
}

interface OrderStore {
  orders: Order[];
  currentOrderDraft: Partial<Order> | null;
  addOrder: (order: Order, userId?: string | null) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  syncWithFirestore: (userId: string) => Promise<void>;
  setCurrentOrderDraft: (draft: Partial<Order>) => void;
  clearCurrentOrderDraft: () => void;
}

// Initial mock orders to simulate history
const mockOrders: Order[] = [
  {
    id: "RP1001",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    items: [
      {
        id: "1-4L",
        productId: 1,
        name: "Asian Paints Royale Luxury",
        brand: "Asian Paints",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
        size: 4,
        quantity: 1,
        unitPrice: 380,
      }
    ],
    shippingAddress: {
      name: "John Doe",
      phone: "9876543210",
      line1: "123 Paint Street",
      city: "Coimbatore",
      state: "Tamil Nadu",
      pincode: "641001"
    },
    paymentMethod: "UPI",
    subtotal: 1520,
    gst: 273.6,
    deliveryFee: 150,
    total: 1943.6,
    status: "DELIVERED",
    estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: mockOrders,
      currentOrderDraft: null,

      addOrder: async (order, userId) => {
        // Update state locally
        set((state) => ({ orders: [order, ...state.orders] }));

        const activeUserId = userId || auth.currentUser?.uid || 'GUEST';
        
        let orderData: any = null;
        try {
          const orderRef = doc(db, 'orders', order.id);
          orderData = {
            userId: activeUserId,
            products: order.items.map(it => ({
              productId: String(it.productId),
              name: it.name,
              quantity: it.quantity,
              price: it.unitPrice,
              image: it.image,
              size: it.size || 4,
              brand: it.brand || '',
              ...(it.shade ? { shade: { name: it.shade.name, code: it.shade.code, hex: it.shade.hex } } : {})
            })),
            status: order.status,
            paymentStatus: 'PAID',
            deliveryAddress: {
              name: order.shippingAddress.name,
              phone: order.shippingAddress.phone,
              line1: order.shippingAddress.line1,
              landmark: order.shippingAddress.landmark || '',
              city: order.shippingAddress.city,
              state: order.shippingAddress.state,
              pincode: order.shippingAddress.pincode
            },
            phone: order.shippingAddress.phone || '',
            subtotal: Number(order.subtotal || 0),
            deliveryCharge: Number(order.deliveryFee || 0),
            total: Number(order.total || 0),
            createdAt: Date.now()
          };
          await setDoc(orderRef, orderData);

          // Log activity log
          await logActivity('ORDER_PLACED', `New order ${order.id} placed by ${order.shippingAddress.name} for ₹${order.total}`, {
            orderId: order.id,
            total: order.total,
            customerName: order.shippingAddress.name
          });

          // Also send realtime Admin Notification using CRM service
          try {
            const { crmService } = await import('../lib/crm');
            
            // Clear abandoned cart status 
            try {
              const { doc, updateDoc } = await import('firebase/firestore');
              await updateDoc(doc(db, 'abandoned_carts', activeUserId || 'temp_'+order.shippingAddress.phone), {
                 status: 'ORDERED'
              });
            } catch (e) {}
            
            await crmService.notifyAdmin({
              title: `New Order Placed: ₹${order.total}`,
              message: `Order ID: ${order.id} from ${order.shippingAddress.name}`,
              type: 'ORDER',
              linkId: order.id
            });
          } catch (crmError) {
            console.error("CRM notification failed:", crmError);
          }
        } catch (err) {
          console.error('Failed to sync order save to Firestore with details:', {
            error: err,
            message: err instanceof Error ? err.message : String(err),
            orderId: order.id,
            userId: activeUserId,
            orderData
          });
        }
      },

      updateOrderStatus: async (id, status) => {
        // Update local status
        set((state) => ({
          orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
        }));

        try {
          const orderRef = doc(db, 'orders', id);
          await updateDoc(orderRef, { status });

          // Log order status update activity
          await logActivity('STATUS_CHANGE', `Order ${id} is now ${status}`, {
            orderId: id,
            status: status
          });
        } catch (err) {
          console.warn('Status sync to Firestore skipped (either offline/guest or not found):', err);
        }
      },

      syncWithFirestore: async (userId) => {
        if (!userId) return;
        try {
          const q = query(
            collection(db, 'orders'),
            where('userId', '==', userId)
          );
          const snap = await getDocs(q);
          const fetchedOrders: Order[] = snap.docs.map(doc => {
            const data = doc.data();
            const products = data.products || [];
            
            return {
              id: doc.id,
              date: new Date(data.createdAt || Date.now()).toISOString(),
              items: products.map((p: any, idx: number) => ({
                id: p.id || `item_${idx}`,
                productId: Number(p.productId || 1),
                name: p.name || 'Paint product',
                brand: p.brand || 'Asian Paints',
                image: p.image || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f',
                size: p.size || 4,
                quantity: p.quantity || 1,
                unitPrice: p.price || p.unitPrice || 380,
                ...(p.shade ? { shade: { name: p.shade.name, code: p.shade.code, hex: p.shade.hex } } : {})
              })),
              shippingAddress: {
                name: data.deliveryAddress?.name || 'Customer',
                phone: data.deliveryAddress?.phone || data.phone || '',
                line1: data.deliveryAddress?.line1 || 'Saved Address',
                landmark: data.deliveryAddress?.landmark || '',
                city: data.deliveryAddress?.city || 'Coimbatore',
                state: data.deliveryAddress?.state || 'Tamil Nadu',
                pincode: data.deliveryAddress?.pincode || ''
              },
              paymentMethod: 'CARD',
              subtotal: data.subtotal || data.total,
              gst: 0,
              deliveryFee: data.deliveryCharge || 0,
              total: data.total,
              status: data.status as OrderStatus,
              estimatedDelivery: 'Express Delivery'
            };
          });

          // Sort by creation TS descending
          fetchedOrders.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

          if (fetchedOrders.length > 0) {
            set({ orders: fetchedOrders });
          }
        } catch (err) {
          console.error("Failed to sync orders with Firestore:", err);
        }
      },

      setCurrentOrderDraft: (draft) => set({ currentOrderDraft: draft }),
      clearCurrentOrderDraft: () => set({ currentOrderDraft: null }),
    }),
    {
      name: 'order-storage',
    }
  )
);
