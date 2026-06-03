import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  reverseGeocodeLatLng,
  geocodePincode,
  determineDeliveryDetails,
  EstimationResult,
  DeliveryDetails,
  findNearestLocalPincode
} from '../utils/delivery';
import { lookupLocalPincode } from '../utils/deliveryZones';

// Fallback results session cache to avoid repeat API hits as requested
const sessionFallbackCache = new Map<string, any>();

// Utility helper to request road distance via our secure proxy service
async function fetchRoadDistance(lat: number, lon: number): Promise<{ distance: number; durationText: string; durationMin: number }> {
  const cacheKey = `dist_${lat.toFixed(4)}_${lon.toFixed(4)}`;
  if (sessionFallbackCache.has(cacheKey)) {
    return sessionFallbackCache.get(cacheKey);
  }

  const originLat = 11.00284; // 54 Cox Street Coimbatore
  const originLon = 76.96918;

  try {
    const response = await fetch('/api/delivery/distance', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destLat: lat, destLon: lon })
    });
    
    if (response.ok) {
      const result = await response.json();
      sessionFallbackCache.set(cacheKey, result);
      return result;
    }
  } catch (err) {
    console.warn("Proxy Route distance lookup failed, falling back to Haversine * 1.25 multiplier:", err);
  }

  // Fallback Haversine * 1.25 road multiplier
  const dLat = ((lat - originLat) * Math.PI) / 180;
  const dLon = ((lon - originLon) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((originLat * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const estDistanceKm = parseFloat((6371 * c * 1.25).toFixed(1));
  const durationMin = Math.round((estDistanceKm / 25) * 60); // Travel time only

  const durationText = durationMin >= 60 
    ? `${Math.floor(durationMin / 60)} hr ${durationMin % 60 > 0 ? durationMin % 60 + ' mins' : ''}`.trim()
    : `${durationMin} mins`;

  const fallbackResult = {
    distance: estDistanceKm,
    durationText: durationText,
    durationMin
  };
  sessionFallbackCache.set(cacheKey, fallbackResult);
  return fallbackResult;
}

// Utility helper to query geocoding / address details via OSM Nominatim
async function fetchGeocodeByPincode(pincode: string): Promise<{ lat: number; lon: number; address: string; pincode: string } | null> {
  const cacheKey = `geo_${pincode}`;
  if (sessionFallbackCache.has(cacheKey)) {
    return sessionFallbackCache.get(cacheKey);
  }

  // Now query OSM Nominatim API
  const osmResult = await geocodePincode(pincode);
  if (osmResult) {
    const result = {
      lat: osmResult.lat,
      lon: osmResult.lon,
      address: osmResult.name,
      pincode
    };
    sessionFallbackCache.set(cacheKey, result);
    return result;
  }

  return null;
}

interface DeliveryState {
  pincode: string | null;
  locationName: string | null;
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
  trackingStatus: 'idle' | 'prompting' | 'serviceable' | 'not-serviceable' | 'denied' | 'error';
  estimation: EstimationResult | null;
  
  // Core high-performance matrix fields
  distanceKm: number | null;
  durationText: string | null;
  durationMin: number | null;
  deliveryDetails: DeliveryDetails | null;
  hasRequestedPermission: boolean;
  cartSubtotal: number;
  
  trackUserLocation: (force?: boolean, currentSubtotal?: number) => Promise<void>;
  updateLocationByCoordinates: (lat: number, lon: number, customName?: string, currentSubtotal?: number) => Promise<void>;
  updateLocationByPincode: (pincode: string, currentSubtotal?: number) => Promise<boolean>;
  updateCartSubtotal: (subtotal: number) => void;
  clearLocation: () => void;
}

export const useDeliveryStore = create<DeliveryState>()(
  persist(
    (set, get) => ({
      pincode: null,
      locationName: null,
      latitude: null,
      longitude: null,
      loading: false,
      error: null,
      trackingStatus: 'idle',
      estimation: null,
      
      distanceKm: null,
      durationText: null,
      durationMin: null,
      deliveryDetails: null,
      hasRequestedPermission: false,
      cartSubtotal: 0,

      trackUserLocation: async (force = false, currentSubtotal) => {
        const subtotal = currentSubtotal !== undefined ? currentSubtotal : get().cartSubtotal;
        
        if (!navigator.geolocation) {
          set({
            error: 'Geolocation is not supported by your browser.',
            trackingStatus: 'error'
          });
          return;
        }

        if (!force && get().pincode) {
          return;
        }

        set({ loading: true, trackingStatus: 'prompting', hasRequestedPermission: true, error: null });

        return new Promise<void>((resolve) => {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Call Distance proxy
              const roadData = await fetchRoadDistance(latitude, longitude);
              const geoDetails = await reverseGeocodeLatLng(latitude, longitude);

              const activeDetails = determineDeliveryDetails(roadData.distance, subtotal, roadData.durationMin);
              
              // Set compatible EstimationResult for existing legacy elements
              const legacyEstimation: EstimationResult = {
                serviceable: activeDetails.serviceable,
                distance: activeDetails.distanceKm,
                durationMin: roadData.durationMin,
                text: activeDetails.serviceable 
                  ? `Estimated delivery: ${activeDetails.eta}`
                  : `Outside direct coverage range.`
              };

              set({
                latitude,
                longitude,
                pincode: geoDetails.pincode || '641009',
                locationName: geoDetails.name || 'Current GPS Location',
                distanceKm: roadData.distance,
                durationText: roadData.durationText,
                durationMin: roadData.durationMin,
                deliveryDetails: activeDetails,
                estimation: legacyEstimation,
                trackingStatus: activeDetails.serviceable ? 'serviceable' : 'not-serviceable',
                loading: false,
                cartSubtotal: subtotal,
                error: null
              });
              resolve();
            },
            async (err) => {
              console.warn('Geolocation failed:', err);

              let errorMsg = 'We need your location to estimate serviceability and delivery times. Please grant permission or enter your pincode below.';
              
              set({
                error: errorMsg,
                trackingStatus: 'denied',
                loading: false
              });
              resolve();
            },
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
          );
        });
      },

      updateLocationByCoordinates: async (lat: number, lon: number, customName?: string, currentSubtotal?: number) => {
        const subtotal = currentSubtotal !== undefined ? currentSubtotal : get().cartSubtotal;
        set({ loading: true, error: null });
        
        const roadData = await fetchRoadDistance(lat, lon);
        const geoDetails = await reverseGeocodeLatLng(lat, lon);
        const activeDetails = determineDeliveryDetails(roadData.distance, subtotal, roadData.durationMin);

        const legacyEstimation: EstimationResult = {
          serviceable: activeDetails.serviceable,
          distance: activeDetails.distanceKm,
          durationMin: roadData.durationMin,
          text: activeDetails.serviceable 
            ? `Estimated delivery: ${activeDetails.eta}`
            : `Outside direct coverage range.`
        };

        set({
          latitude: lat,
          longitude: lon,
          pincode: geoDetails.pincode || '641001',
          locationName: customName || geoDetails.name || 'Selected Location',
          distanceKm: roadData.distance,
          durationText: roadData.durationText,
          durationMin: roadData.durationMin,
          deliveryDetails: activeDetails,
          estimation: legacyEstimation,
          trackingStatus: activeDetails.serviceable ? 'serviceable' : 'not-serviceable',
          loading: false,
          cartSubtotal: subtotal,
          error: null,
          hasRequestedPermission: true
        });
      },

      updateLocationByPincode: async (pincodeStr: string, currentSubtotal?: number) => {
        const subtotal = currentSubtotal !== undefined ? currentSubtotal : get().cartSubtotal;
        const cleanedPincode = pincodeStr.replace(/\s+/g, '').trim();
        if (!/^\d{6}$/.test(cleanedPincode)) {
          set({ error: 'Please enter a valid 6-digit Indian pincode.' });
          return false;
        }

        set({ loading: true, error: null });

        // --- METHOD 1: LOCAL PINCODE DATABASE LOOKUP (OFFLINE FALLBACK) ---
        const localMatch = lookupLocalPincode(cleanedPincode);
        let lat: number, lon: number, locationName: string;
        
        if (localMatch) {
          lat = localMatch.lat;
          lon = localMatch.lon;
          locationName = `${localMatch.name}, Coimbatore`;
        } else {
          // --- METHOD 2: FREE API FALLBACK SYSTEM (Pincode not in local DB) ---
          const locationData = await fetchGeocodeByPincode(cleanedPincode);
          if (!locationData) {
            set({
              loading: false,
              error: 'Pincode unreachable. Please check entry and retry.'
            });
            return false;
          }
          lat = locationData.lat;
          lon = locationData.lon;
          locationName = locationData.address;
        }

        const roadData = await fetchRoadDistance(lat, lon);
        const activeDetails = determineDeliveryDetails(roadData.distance, subtotal, roadData.durationMin);

        const legacyEstimation: EstimationResult = {
          serviceable: activeDetails.serviceable,
          distance: activeDetails.distanceKm,
          durationMin: roadData.durationMin,
          text: activeDetails.serviceable 
            ? `Estimated delivery: ${activeDetails.eta}`
            : `Outside direct coverage range.`
        };

        set({
          pincode: cleanedPincode,
          locationName,
          latitude: lat,
          longitude: lon,
          distanceKm: roadData.distance,
          durationText: roadData.durationText,
          durationMin: roadData.durationMin,
          deliveryDetails: activeDetails,
          estimation: legacyEstimation,
          trackingStatus: activeDetails.serviceable ? 'serviceable' : 'not-serviceable',
          loading: false,
          cartSubtotal: subtotal,
          error: null,
          hasRequestedPermission: true
        });

        return true;
      },

      updateCartSubtotal: (subtotal: number) => {
        const currentDistance = get().distanceKm;
        set({ cartSubtotal: subtotal });

        if (currentDistance !== null) {
          const activeDetails = determineDeliveryDetails(currentDistance, subtotal, get().durationMin);
          set({ deliveryDetails: activeDetails });
        }
      },

      clearLocation: () => {
        set({
          pincode: null,
          locationName: null,
          latitude: null,
          longitude: null,
          distanceKm: null,
          durationText: null,
          durationMin: null,
          deliveryDetails: null,
          estimation: null,
          trackingStatus: 'idle',
          error: null,
          hasRequestedPermission: false
        });
      }
    }),
    {
      name: 'delivery-location-storage',
      partialize: (state) => ({
        pincode: state.pincode,
        locationName: state.locationName,
        latitude: state.latitude,
        longitude: state.longitude,
        distanceKm: state.distanceKm,
        durationText: state.durationText,
        durationMin: state.durationMin,
        deliveryDetails: state.deliveryDetails,
        trackingStatus: state.trackingStatus,
        hasRequestedPermission: state.hasRequestedPermission,
        cartSubtotal: state.cartSubtotal
      })
    }
  )
);
