import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, query, limit, getDocs, writeBatch } from 'firebase/firestore';
import { useAuthStore } from '../store/useAuthStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useOrderStore } from '../store/useOrderStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Sync wishlist with Firestore in background on login
        useWishlistStore.getState().syncWithFirestore(user.uid).catch((err) => {
          console.error('Failed to sync wishlist on login:', err);
        });

        // Sync orders with Firestore in background on login
        try {
          useOrderStore.getState().syncWithFirestore(user.uid).catch((err) => {
            console.error('Failed to sync orders on login:', err);
          });
        } catch (err) {
          console.error('Failed to lazily sync orders store:', err);
        }

        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            setUser(user, userDoc.data().role);
          } else {
            // Document might be missing due to earlier failure, try to recover it
            try {
              const usersQ = query(collection(db, 'users'), limit(1));
              const snap = await getDocs(usersQ);
              const isFirstUser = snap.empty;

              let assignedRole = 'customer';
              if (isFirstUser) {
                assignedRole = 'owner';
              } else if (user.email?.toLowerCase() === 'moizmiyaji30@gmail.com') {
                assignedRole = 'owner';
              }

              const userData = {
                uid: user.uid,
                email: user.email || '',
                name: user.displayName || 'User',
                role: assignedRole,
                createdAt: Date.now(),
                isActive: true
              };

              if (isFirstUser) {
                const batch = writeBatch(db);
                batch.set(userDocRef, userData);
                batch.set(doc(db, 'system', 'config'), { setupComplete: true, ownerId: user.uid, createdAt: Date.now() });
                await batch.commit();
              } else {
                await setDoc(userDocRef, userData);
              }
              
              setUser(user, assignedRole);
            } catch (err) {
              console.error('Failed to auto-create user document:', err);
              // Fallback
              const fallbackRole = user.email?.toLowerCase() === 'moizmiyaji30@gmail.com' ? 'owner' : 'customer';
              setUser(user, fallbackRole);
            }
          }
        } catch (error) {
          console.error("Error fetching user role", error);
          setUser(user, 'customer');
        }
      } else {
        setUser(null, null);
        try {
          useOrderStore.setState({ orders: [], currentOrderDraft: null });
        } catch (e) {}
        try {
          useWishlistStore.setState({ items: [] });
        } catch (e) {}
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [setUser, setLoading]);

  return <>{children}</>;
}
