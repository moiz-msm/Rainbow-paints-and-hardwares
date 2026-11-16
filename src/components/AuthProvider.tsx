import React, { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { 
  doc, 
  getDoc, 
  getDocFromCache, 
  setDoc, 
  collection, 
  query, 
  limit, 
  getDocs, 
  writeBatch 
} from 'firebase/firestore';
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
          console.warn('Deferred wishlist sync (offline/background):', err?.message || err);
        });

        // Sync orders with Firestore in background on login
        try {
          useOrderStore.getState().syncWithFirestore(user.uid).catch((err) => {
            console.warn('Deferred orders sync (offline/background):', err?.message || err);
          });
        } catch (err) {
          console.warn('Deferred orders sync setup:', err);
        }

        const isOwnerEmail = user.email?.toLowerCase() === 'moizmiyaji30@gmail.com';
        let assignedRole = isOwnerEmail ? 'owner' : 'customer';

        try {
          const userDocRef = doc(db, 'users', user.uid);
          let userDoc = null;

          try {
            userDoc = await getDoc(userDocRef);
          } catch (offlineErr: any) {
            // Attempt to resolve from offline persistent cache
            try {
              userDoc = await getDocFromCache(userDocRef);
            } catch {
              // Cache not yet populated
            }
          }
          
          if (userDoc && userDoc.exists()) {
            setUser(user, userDoc.data().role || assignedRole);
          } else {
            // Document might be missing due to earlier failure, try to recover it
            try {
              const usersQ = query(collection(db, 'users'), limit(1));
              let isFirstUser = false;
              try {
                const snap = await getDocs(usersQ);
                isFirstUser = snap.empty;
              } catch {
                // If offline, check owner email
              }

              if (isFirstUser || isOwnerEmail) {
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

              // Write to Firestore asynchronously without blocking auth state
              if (isFirstUser) {
                const batch = writeBatch(db);
                batch.set(userDocRef, userData);
                batch.set(doc(db, 'system', 'config'), { setupComplete: true, ownerId: user.uid, createdAt: Date.now() });
                batch.commit().catch(() => {});
              } else {
                setDoc(userDocRef, userData, { merge: true }).catch(() => {});
              }
              
              setUser(user, assignedRole);
            } catch (err) {
              setUser(user, assignedRole);
            }
          }
        } catch (error) {
          // Graceful fallback to designated role (e.g. owner for Moiz) when completely offline
          setUser(user, assignedRole);
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
