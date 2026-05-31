
export interface LocalPincodeData {
  pincode: string;
  zoneId: string;
  name: string;
  distanceKm: number;
  lat: number;
  lon: number;
}

// Comprehensive Coimbatore City and District Pincode Database
export const COIMBATORE_PINCODES_DB: Record<string, LocalPincodeData> = {
  // Zone A (0-8 km)
  '641009': { pincode: '641009', zoneId: 'A', name: 'Ganapathy (Store Area H.Q.)', distanceKm: 0.1, lat: 11.00284, lon: 76.96918 },
  '641006': { pincode: '641006', zoneId: 'A', name: 'Ganapathy West / Rathinapuri', distanceKm: 2.2, lat: 11.0260, lon: 76.9800 },
  '641003': { pincode: '641003', zoneId: 'A', name: 'Tatabad', distanceKm: 1.8, lat: 11.0185, lon: 76.9535 },
  '641012': { pincode: '641012', zoneId: 'A', name: 'Gandhipuram Central', distanceKm: 2.5, lat: 11.0183, lon: 76.9634 },
  '641013': { pincode: '641013', zoneId: 'A', name: 'Pappanaickenpalayam', distanceKm: 3.2, lat: 11.0125, lon: 76.9782 },
  '641002': { pincode: '641002', zoneId: 'A', name: 'R.S. Puram / Coimbatore Central', distanceKm: 4.8, lat: 11.0003, lon: 76.9531 },
  '641011': { pincode: '641011', zoneId: 'A', name: 'Saibaba Colony', distanceKm: 5.1, lat: 11.0232, lon: 76.9419 },
  '641045': { pincode: '641045', zoneId: 'A', name: 'Puliyakulam', distanceKm: 4.5, lat: 11.0069, lon: 76.9866 },
  '641030': { pincode: '641030', zoneId: 'A', name: 'Kavundampalayam', distanceKm: 5.8, lat: 11.0345, lon: 76.9422 },
  '641018': { pincode: '641018', zoneId: 'A', name: 'Coimbatore Southern / Ramanathapuram West', distanceKm: 5.3, lat: 11.0012, lon: 76.9610 },

  // Zone B (8-15 km)
  '641001': { pincode: '641001', zoneId: 'B', name: 'Coimbatore Head Office / Town Hall', distanceKm: 6.2, lat: 10.9961, lon: 76.9609 },
  '641004': { pincode: '641004', zoneId: 'B', name: 'Peelamedu / PSG Tech Area', distanceKm: 8.4, lat: 11.0272, lon: 77.0018 },
  '641035': { pincode: '641035', zoneId: 'B', name: 'Saravanampatty IT Corridor', distanceKm: 8.2, lat: 11.0772, lon: 77.0101 },
  '641049': { pincode: '641049', zoneId: 'B', name: 'Vadavalli', distanceKm: 9.3, lat: 11.0284, lon: 76.9016 },
  '641034': { pincode: '641034', zoneId: 'B', name: 'Vilankurichi', distanceKm: 8.1, lat: 11.0505, lon: 77.0142 },
  '641015': { pincode: '641015', zoneId: 'B', name: 'Ramanathapuram East / Trichy Road', distanceKm: 8.5, lat: 10.9982, lon: 76.9954 },
  '641016': { pincode: '641016', zoneId: 'B', name: 'Sowripalayam', distanceKm: 9.0, lat: 11.0044, lon: 77.0051 },
  '641026': { pincode: '641026', zoneId: 'B', name: 'Sathy Road / Saravanampatti North', distanceKm: 10.2, lat: 11.0890, lon: 77.0210 },
  '641027': { pincode: '641027', zoneId: 'B', name: 'Vellakinar / Urumandampalayam', distanceKm: 10.8, lat: 11.0694, lon: 76.9535 },
  '641028': { pincode: '641028', zoneId: 'B', name: 'Kurudampalayam / Vadamadurai', distanceKm: 11.5, lat: 11.0754, lon: 76.9412 },
  '641029': { pincode: '641029', zoneId: 'B', name: 'Kalapatti', distanceKm: 11.1, lat: 11.0612, lon: 77.0392 },
  '641031': { pincode: '641031', zoneId: 'B', name: 'Thudiyalur', distanceKm: 9.8, lat: 11.0762, lon: 76.9384 },
  '641032': { pincode: '641032', zoneId: 'B', name: 'Vellalore', distanceKm: 12.2, lat: 10.9715, lon: 77.0084 },
  '641033': { pincode: '641033', zoneId: 'B', name: 'Varadharajapuram / Singanallur North', distanceKm: 10.5, lat: 11.0112, lon: 77.0094 },
  '641037': { pincode: '641037', zoneId: 'B', name: 'Civil Aerodrome / Coimbatore Airport', distanceKm: 12.0, lat: 11.0264, lon: 77.0422 },
  '641042': { pincode: '641042', zoneId: 'B', name: 'Sowripalayam Housing Unit', distanceKm: 9.2, lat: 11.0052, lon: 77.0110 },
  '641048': { pincode: '641048', zoneId: 'B', name: 'Chinnavedampatti', distanceKm: 8.0, lat: 11.0592, lon: 76.9854 },
  '641005': { pincode: '641005', zoneId: 'B', name: 'Singanallur', distanceKm: 11.4, lat: 11.0028, lon: 77.0252 },
  '641014': { pincode: '641014', zoneId: 'B', name: 'Ondipudur / Peelamedu East', distanceKm: 12.5, lat: 11.0090, lon: 77.0350 },
  '641025': { pincode: '641025', zoneId: 'B', name: 'Perur Temple Town', distanceKm: 13.8, lat: 10.9782, lon: 76.9022 },
  '641020': { pincode: '641020', zoneId: 'B', name: 'Kuniyamuthur', distanceKm: 12.9, lat: 10.9634, lon: 76.9382 },
  '641113': { pincode: '641113', zoneId: 'B', name: 'Somayampalayam / Kanuvai', distanceKm: 11.0, lat: 11.0450, lon: 76.9010 },

  // Zone C (15-25 km)
  '641007': { pincode: '641007', zoneId: 'C', name: 'Keeranatham Tech Park', distanceKm: 15.8, lat: 11.0945, lon: 77.0210 },
  '641008': { pincode: '641008', zoneId: 'C', name: 'Kurichi Industrial Estate / SIDCO', distanceKm: 16.5, lat: 10.9540, lon: 76.9712 },
  '641010': { pincode: '641010', zoneId: 'C', name: 'Podanur Junction Area', distanceKm: 15.6, lat: 10.9642, lon: 76.9922 },
  '641021': { pincode: '641021', zoneId: 'C', name: 'Kurumbapalayam / Sathy Road Outward', distanceKm: 16.2, lat: 11.1090, lon: 77.0298 },
  '641022': { pincode: '641022', zoneId: 'C', name: 'Madukkarai Cement Town', distanceKm: 21.4, lat: 10.9023, lon: 76.9242 },
  '641023': { pincode: '641023', zoneId: 'C', name: 'Podanur East / Chettipalayam Road', distanceKm: 17.5, lat: 10.9412, lon: 77.0125 },
  '641041': { pincode: '641041', zoneId: 'C', name: 'Kovaipudur Academic Hills', distanceKm: 18.2, lat: 10.9410, lon: 76.8992 },
  '641043': { pincode: '641043', zoneId: 'C', name: 'Karparayanpalayam', distanceKm: 17.8, lat: 11.0360, lon: 77.0890 },
  '641044': { pincode: '641044', zoneId: 'C', name: 'Sundarapuram Bypass', distanceKm: 15.2, lat: 10.9520, lon: 76.9810 },
  '641046': { pincode: '641046', zoneId: 'C', name: 'Maruthamalai Foothills / Bharathiar University', distanceKm: 16.0, lat: 11.0398, lon: 76.8835 },
  '641047': { pincode: '641047', zoneId: 'C', name: 'Periyanaickenpalayam Industrial Zone', distanceKm: 18.2, lat: 11.1390, lon: 76.9380 },
  '641653': { pincode: '641653', zoneId: 'C', name: 'Kaniyur Toll Plaza / Coimbatore Border', distanceKm: 22.0, lat: 11.0694, lon: 77.1684 },
  '641659': { pincode: '641659', zoneId: 'C', name: 'Karumathampatti Junction', distanceKm: 24.8, lat: 11.0712, lon: 77.1852 },

  // Zone D (25-40 km)
  '641019': { pincode: '641019', zoneId: 'D', name: 'Eachanari / Othakkalmandapam NH Corridor', distanceKm: 26.4, lat: 10.8920, lon: 76.9854 },
  '641024': { pincode: '641024', zoneId: 'D', name: 'Kallipalayam Annur Link', distanceKm: 27.5, lat: 11.1345, lon: 77.0792 },
  '641697': { pincode: '641697', zoneId: 'D', name: 'Arasur Industrial Park', distanceKm: 28.0, lat: 11.0592, lon: 77.1292 },
  '641109': { pincode: '641109', zoneId: 'D', name: 'Mathampatti / Siruvani Main Road', distanceKm: 25.4, lat: 10.9712, lon: 76.8190 },
  '641301': { pincode: '641301', zoneId: 'D', name: 'Mettupalayam Town Gate', distanceKm: 38.0, lat: 11.3005, lon: 76.9405 },
  '641652': { pincode: '641652', zoneId: 'D', name: 'Palladam West Area / Border', distanceKm: 34.0, lat: 11.0112, lon: 77.2450 },

  // Zone E (40-65 km)
  '641601': { pincode: '641601', zoneId: 'E', name: 'Tiruppur City Centre H.O.', distanceKm: 47.5, lat: 11.1075, lon: 77.3411 },
  '642001': { pincode: '642001', zoneId: 'E', name: 'Pollachi Town Sub-Hub', distanceKm: 42.8, lat: 10.6580, lon: 77.0090 },
  '641602': { pincode: '641602', zoneId: 'E', name: 'Tiruppur South / Khaderpet', distanceKm: 48.2, lat: 11.0950, lon: 77.3520 },
  '641603': { pincode: '641603', zoneId: 'E', name: 'Tiruppur North / Boyampalayam', distanceKm: 49.5, lat: 11.1350, lon: 77.3380 },
  '642002': { pincode: '642002', zoneId: 'E', name: 'Pollachi East / Mahalingapuram', distanceKm: 44.1, lat: 10.6690, lon: 77.0240 },
  '641664': { pincode: '641664', zoneId: 'E', name: 'Avinashi Bypass Town', distanceKm: 41.5, lat: 11.1912, lon: 77.2710 },

  // Zone F (65+ km) - Outside automatic shipping
  '642126': { pincode: '642126', zoneId: 'F', name: 'Udumalpet Main / Western Ghats Border', distanceKm: 72.5, lat: 10.5840, lon: 77.2435 },
  '643001': { pincode: '643001', zoneId: 'F', name: 'Ooty / Udhagamandalam Hill Station', distanceKm: 85.0, lat: 11.4102, lon: 76.6950 },
  '643101': { pincode: '643101', zoneId: 'F', name: 'Coonoor Hill Station Gate', distanceKm: 68.4, lat: 11.3530, lon: 76.7950 }
};

/**
 * Checks database for absolute instant mapping.
 * Avoids any geocoding overhead for predefined locations.
 */
export function lookupLocalPincode(pincode: string): LocalPincodeData | null {
  const cleanedPincode = pincode.replace(/\s+/g, '').trim();
  return COIMBATORE_PINCODES_DB[cleanedPincode] || null;
}
