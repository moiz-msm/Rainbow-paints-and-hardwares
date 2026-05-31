import { collection, addDoc, serverTimestamp, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export type LeadType = 'QUOTE' | 'MEASUREMENT' | 'VISIT' | 'CONTRACTOR' | 'DESIGNER' | 'VISUALIZER';

export interface LeadData {
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  metadata?: any;
  status: 'NEW' | 'FOLLOW_UP' | 'CONVERTED' | 'CLOSED';
}

export const crmService = {
  // Capture a new lead
  addLead: async (data: Omit<LeadData, 'status'>) => {
    try {
      const leadsRef = collection(db, 'leads');
      const docRef = await addDoc(leadsRef, {
        ...data,
        status: 'NEW',
        createdAt: serverTimestamp(),
      });
      
      // Also write to notifications
      await crmService.notifyAdmin({
        title: `New ${data.type} Request`,
        message: `${data.name} has requested a ${data.type.toLowerCase()}.`,
        type: 'LEAD',
        linkId: docRef.id
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding lead:', error);
      throw error;
    }
  },

  updateLeadStatus: async (leadId: string, status: LeadData['status']) => {
    try {
      const docRef = doc(db, 'leads', leadId);
      await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
    } catch (error) {
      console.error('Error updating lead status:', error);
      throw error;
    }
  },

  // Log Cart Abandonment
  logAbandonedCart: async (userId: string, phone: string | undefined, items: any[], total: number) => {
    if (!items || items.length === 0) return;
    try {
      const cartRef = doc(db, 'abandoned_carts', userId || 'anonymous_' + Date.now());
      await setDoc(cartRef, {
        userId,
        phone,
        items,
        total,
        lastActive: serverTimestamp(),
        status: 'OPEN'
      });
    } catch (error) {
      console.error('Error logging abandoned cart:', error);
    }
  },

  // Notify Admin (Creates a notification doc, which FCM / email systems would watch or we can push to via API)
  notifyAdmin: async (notification: { title: string; message: string; type: string; linkId?: string }) => {
    try {
      const notifRef = collection(db, 'admin_notifications');
      await addDoc(notifRef, {
        ...notification,
        read: false,
        createdAt: serverTimestamp()
      });
      
      // Trigger Email/FCM backend (fire and forget)
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notification)
      }).catch(e => console.error("Notification webhook failed", e));
      
    } catch (error) {
      console.error('Error sending admin notification:', error);
    }
  },

  updateCustomerProfile: async (userId: string, changes: any) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...changes,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating customer profile:", error);
    }
  }
};
