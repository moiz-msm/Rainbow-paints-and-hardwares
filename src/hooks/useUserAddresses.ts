import { useState, useEffect, useCallback } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, getDocs, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';
import { Address } from '../store/useOrderStore';

export interface SavedAddress extends Address {
  id: string;
  isDefault: boolean;
  lat?: number;
  lon?: number;
}

export function useUserAddresses() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) {
      setAddresses([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const addressesRef = collection(db, 'users', user.uid, 'addresses');
      const q = query(addressesRef);
      const querySnapshot = await getDocs(q);
      
      const list: SavedAddress[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as SavedAddress);
      });
      
      // Sort default first
      list.sort((a, b) => (a.isDefault ? -1 : 1));
      setAddresses(list);
    } catch (err: any) {
      console.error("Error fetching addresses:", err);
      setError("Failed to fetch saved addresses.");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveAddress = async (newAddr: Omit<SavedAddress, 'id'>) => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Must be signed in to save addresses.");
    }

    setLoading(true);
    setError(null);
    try {
      const addressId = 'addr_' + Math.random().toString(36).substring(2, 9);
      const addressesRef = collection(db, 'users', user.uid, 'addresses');
      
      if (newAddr.isDefault) {
        // Unset any existing defaults
        const qSnapshot = await getDocs(addressesRef);
        const batch = writeBatch(db);
        qSnapshot.forEach((docSnap) => {
          if (docSnap.data().isDefault) {
            batch.update(doc(db, 'users', user.uid, 'addresses', docSnap.id), { isDefault: false });
          }
        });
        await batch.commit();
      }

      const docRef = doc(db, 'users', user.uid, 'addresses', addressId);
      await setDoc(docRef, {
        name: newAddr.name,
        phone: newAddr.phone,
        doorNo: newAddr.doorNo || '',
        street: newAddr.street || '',
        area: newAddr.area || '',
        line1: newAddr.line1,
        landmark: newAddr.landmark || '',
        city: newAddr.city,
        state: newAddr.state,
        pincode: newAddr.pincode,
        isDefault: newAddr.isDefault,
        lat: newAddr.lat || null,
        lon: newAddr.lon || null,
        createdAt: new Date().toISOString()
      });

      await fetchAddresses();
    } catch (err: any) {
      console.error("Error saving address:", err);
      setError("Failed to save address to Firebase.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setDefaultAddress = async (addressId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      const addressesRef = collection(db, 'users', user.uid, 'addresses');
      const qSnapshot = await getDocs(addressesRef);
      const batch = writeBatch(db);
      
      qSnapshot.forEach((docSnap) => {
        batch.update(doc(db, 'users', user.uid, 'addresses', docSnap.id), {
          isDefault: docSnap.id === addressId
        });
      });
      
      await batch.commit();
      await fetchAddresses();
    } catch (err: any) {
      console.error("Error setting default address:", err);
      setError("Failed to set default address.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (addressId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      const docRef = doc(db, 'users', user.uid, 'addresses', addressId);
      await deleteDoc(docRef);
      await fetchAddresses();
    } catch (err: any) {
      console.error("Error deleting address:", err);
      setError("Failed to delete address.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Listen for auth state initialization
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchAddresses();
      } else {
        setAddresses([]);
      }
    });
    return () => unsubscribe();
  }, [fetchAddresses]);

  return {
    addresses,
    loading,
    error,
    fetchAddresses,
    saveAddress,
    setDefaultAddress,
    deleteAddress
  };
}
