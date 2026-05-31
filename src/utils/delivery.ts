import { SHIPPING_ZONES, ShippingZone, SHOP_DETAILS } from './deliveryConfig';

export const SHOP_COORDINATES = {
  lat: SHOP_DETAILS.coordinates.lat,
  lon: SHOP_DETAILS.coordinates.lon,
  pincode: SHOP_DETAILS.coordinates.pincode,
  name: 'Ganapathy, Coimbatore'
};

// Local Coimbatore pincodes mapped to coordinates for lookup
export const LOCAL_COIMBATORE_PINCODES: Record<string, { lat: number; lon: number; name: string }> = {
  '641009': { lat: 11.0310, lon: 76.9740, name: 'Ganapathy Store Area' },
  '641035': { lat: 11.0772, lon: 77.0101, name: 'Saravanampatty' },
  '641006': { lat: 11.0260, lon: 76.9800, name: 'Ganapathy West' },
  '641012': { lat: 11.0183, lon: 76.9634, name: 'Gandhipuram' },
  '641004': { lat: 11.0272, lon: 77.0018, name: 'Peelamedu' },
  '641014': { lat: 11.0190, lon: 77.0250, name: 'Peelamedu East' },
  '641018': { lat: 11.0100, lon: 76.9600, name: 'Coimbatore Town' },
  '641011': { lat: 11.0232, lon: 76.9419, name: 'Saibaba Colony' },
  '641049': { lat: 11.0284, lon: 76.9016, name: 'Vadavalli' },
  '641001': { lat: 10.9961, lon: 76.9609, name: 'Coimbatore Head Office' },
  '641002': { lat: 11.0003, lon: 76.9531, name: 'Coimbatore Central' },
  '641045': { lat: 11.0069, lon: 76.9866, name: 'Puliyakulam' },
};

/**
 * Calculates straight line distance using Haversine formula
 */
export function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLatVal = ((lat2 - lat1) * Math.PI) / 180;
  const dLonVal = ((lon2 - lon1) * Math.PI) / 180;
  
  const a =
    Math.sin(dLatVal / 2) * Math.sin(dLatVal / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLonVal / 2) *
      Math.sin(dLonVal / 2);
      
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface EstimationResult {
  serviceable: boolean;
  distance: number | null;
  durationMin: number | null;
  text: string;
}

/**
 * Basic estimator for backward compatibility
 */
export function calculateDeliveryTime(distanceInKm: number): EstimationResult {
  const zone = SHIPPING_ZONES.find(
    (z) => distanceInKm >= z.minKm && distanceInKm < z.maxKm
  ) || SHIPPING_ZONES[SHIPPING_ZONES.length - 1];

  const serviceable = zone.id !== 'F';
  // 1 hr processing + travel time based on 25 km/h avg speed
  const processingMin = 60;
  const travelMin = Math.round((distanceInKm / 25) * 60);
  const totalDurationMin = processingMin + travelMin;

  let timeStr = '';
  if (serviceable) {
    const hours = Math.floor(totalDurationMin / 60);
    const mins = totalDurationMin % 60;
    timeStr = hours > 0 ? `${hours} hr ${mins} mins` : `${mins} mins`;
  }

  return {
    serviceable,
    distance: parseFloat(distanceInKm.toFixed(1)),
    durationMin: serviceable ? totalDurationMin : null,
    text: serviceable 
      ? `ETA: ${timeStr}`
      : `Outside direct coverage.`
  };
}

export interface DeliveryDetails {
  zone: ShippingZone;
  distanceKm: number;
  durationText: string;
  durationMin: number;
  shippingFee: number;
  isFree: boolean;
  freeThresholdRemaining: number;
  eta: string;
  serviceable: boolean;
}

/**
 * Calculates delivery eligibility, pricing, thresholds, and ETAs based on road distance
 */
export function determineDeliveryDetails(distanceKm: number, cartSubtotal: number, apiDurationMin?: number | null): DeliveryDetails {
  // Find Zone by thresholds
  const zone = SHIPPING_ZONES.find(
    (z) => distanceKm >= z.minKm && distanceKm < z.maxKm
  ) || SHIPPING_ZONES[SHIPPING_ZONES.length - 1]; // Fallback to last zone

  const isFree = cartSubtotal >= zone.freeThreshold;
  const shippingFee = isFree ? 0 : zone.charge;
  const freeThresholdRemaining = Math.max(0, zone.freeThreshold - cartSubtotal);
  const serviceable = zone.id !== 'F';

  // 1 hr processing + API provided time, OR fallback to Approx travel (25 km/h)
  const processingMin = 60;
  const travelMin = typeof apiDurationMin === 'number' ? apiDurationMin : Math.round((distanceKm / 25) * 60);
  const durationMin = processingMin + travelMin;
  
  let durationText = `${durationMin} mins`;
  if (durationMin >= 60) {
    const h = Math.floor(durationMin / 60);
    const m = durationMin % 60;
    durationText = m > 0 ? `${h} hr ${m} mins` : `${h} hr`;
  }
  
  // Return the stable zone ETA text instead of fluctuating minutes
  const etaText = zone.eta;

  return {
    zone,
    distanceKm: parseFloat(distanceKm.toFixed(1)),
    durationText,
    durationMin,
    shippingFee,
    isFree,
    freeThresholdRemaining,
    eta: etaText,
    serviceable
  };
}

/**
 * Find the closest Coimbatore pincode from our local list based on distance
 */
export function findNearestLocalPincode(lat: number, lon: number): string | null {
  let closestPincode: string | null = null;
  let minDistance = Infinity;
  
  for (const [pincode, data] of Object.entries(LOCAL_COIMBATORE_PINCODES)) {
    const dist = getHaversineDistance(lat, lon, data.lat, data.lon);
    if (dist < minDistance) {
      minDistance = dist;
      closestPincode = pincode;
    }
  }
  
  // Snap only if the closest pincode is within 15 km of the coordinates (Coimbatore region)
  if (closestPincode && minDistance < 15) {
    return closestPincode;
  }
  return null;
}

/**
 * OpenStreetMap (OSM) Reverse Geocoder as fallback with localized nearest-neighbor pincode snapping
 */
export async function reverseGeocodeLatLng(lat: number, lon: number): Promise<{ pincode: string | null; name: string | null }> {
  const localPincode = findNearestLocalPincode(lat, lon);
  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );
    if (!response.ok) throw new Error('Geocoding response failed');
    const data = await response.json();
    
    // Prefer the mathematically closest local pincode if the coordinates are in the Coimbatore region,
    // as OSM Nominatim often resolves postcodes for the entire Coimbatore region broadly to the main head office post code '641001'.
    const pincode = localPincode || data?.address?.postcode || null;
    const city = data?.address?.city || data?.address?.town || data?.address?.suburb || data?.address?.state_district || 'Nearby Area';
    const road = data?.address?.road || '';
    const displayName = road ? `${road}, ${city}` : city;
    
    return { pincode, name: displayName };
  } catch (error) {
    console.error('Failed to reverse geocode:', error);
    return { 
      pincode: localPincode, 
      name: localPincode ? `${LOCAL_COIMBATORE_PINCODES[localPincode].name}, Coimbatore` : null 
    };
  }
}

/**
 * Chained Free IP Geolocation Lookup
 * Chain multiple free keyless IP Geolocation services with automatic fallbacks for maximum resilience
 */
export interface FreeIPLocationResult {
  lat: number;
  lon: number;
  pincode: string | null;
  city: string;
  region: string;
}

/**
 * OpenStreetMap Geocoder as fallback
 */
export async function geocodePincode(pincode: string): Promise<{ lat: number; lon: number; name: string } | null> {
  if (LOCAL_COIMBATORE_PINCODES[pincode]) {
    const cached = LOCAL_COIMBATORE_PINCODES[pincode];
    return { lat: cached.lat, lon: cached.lon, name: cached.name };
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${pincode}&country=India&format=json&limit=1`
    );
    if (!response.ok) throw new Error('Pincode lookup failed');
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        name: result.display_name?.split(',')[0] || `Pincode ${pincode}`
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to geocode pincode:', error);
    return null;
  }
}
