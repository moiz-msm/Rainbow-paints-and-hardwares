export interface ShippingZone {
  id: string; // 'A', 'B', 'C', 'D', 'E', 'F'
  name: string;
  minKm: number;
  maxKm: number;
  charge: number;
  freeThreshold: number;
  eta: string;
}

export const SHIPPING_ZONES: ShippingZone[] = [
  {
    id: 'A',
    name: 'ZONE A',
    minKm: 0,
    maxKm: 8,
    charge: 79,
    freeThreshold: 3500,
    eta: 'Same day'
  },
  {
    id: 'B',
    name: 'ZONE B',
    minKm: 8,
    maxKm: 15,
    charge: 149,
    freeThreshold: 7000,
    eta: 'Same day or next day'
  },
  {
    id: 'C',
    name: 'ZONE C',
    minKm: 15,
    maxKm: 25,
    charge: 249,
    freeThreshold: 12000,
    eta: 'Next day'
  },
  {
    id: 'D',
    name: 'ZONE D',
    minKm: 25,
    maxKm: 40,
    charge: 399,
    freeThreshold: 20000,
    eta: '1–2 days'
  },
  {
    id: 'E',
    name: 'ZONE E',
    minKm: 40,
    maxKm: 65,
    charge: 699,
    freeThreshold: 35000,
    eta: '2–3 days'
  },
  {
    id: 'F',
    name: 'ZONE F',
    minKm: 65,
    maxKm: 999999,
    charge: 0,
    freeThreshold: 999999,
    eta: 'Special query'
  }
];

export const SHOP_DETAILS = {
  name: "Rainbow Paints & Hardware",
  address: "Rainbow Paints & Hardwares, 54 Cox Street, Kattoor, Ramnagar, Coimbatore, Tamil Nadu 641009",
  coordinates: {
    lat: 11.00284,
    lon: 76.96918,
    pincode: '641009'
  }
};
