import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useOrderStore, Address } from '../store/useOrderStore';
import { useAuthStore } from '../store/useAuthStore';
import { useDeliveryStore } from '../store/useDeliveryStore';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  MapPin, 
  Truck, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight, 
  AlertTriangle, 
  Sparkles, 
  Navigation, 
  ChevronDown 
} from 'lucide-react';
import { useUserAddresses } from '../hooks/useUserAddresses';
import { useDebounce } from '../hooks/useDebounce';
import GoogleReviewsSection from '../components/GoogleReviewsSection';
import { analytics } from '../lib/firebase';
import { logEvent } from 'firebase/analytics';
import Breadcrumb from '../components/Breadcrumb';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const { setCurrentOrderDraft } = useOrderStore();
  const { user, openAuthModal } = useAuthStore();
  
  const { 
    pincode: deliveryPincode, 
    locationName, 
    estimation, 
    trackingStatus, 
    updateLocationByPincode, 
    updateLocationByCoordinates,
    deliveryDetails,
    updateCartSubtotal
  } = useDeliveryStore();

  const { addresses, saveAddress } = useUserAddresses();

  const [detecting, setDetecting] = useState(false);
  const [saveToFirebase, setSaveToFirebase] = useState(true);

  const [address, setAddress] = useState<Address>({
    name: '',
    phone: '',
    email: '',
    doorNo: '',
    street: '',
    area: '',
    line1: '',
    landmark: '',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: ''
  });
  const [phoneError, setPhoneError] = useState('');

  // Automated Profile and Current GPS location auto-fill on change or mount
  useEffect(() => {
    setAddress(prev => {
      const locationArea = (locationName && locationName !== 'Current Location' && locationName !== 'Estimated Location') ? locationName : '';
      const newArea = prev.area || locationArea;
      
      // Only set line1 if it's currently empty, to not override manually typed values when user or delivery changes
      const newLine1 = prev.line1 || locationArea;

      return {
        ...prev,
        name: prev.name || user?.displayName || user?.email?.split('@')[0] || '',
        email: prev.email || user?.email || '',
        pincode: prev.pincode || deliveryPincode || '',
        line1: newLine1,
        area: newArea,
        city: 'Coimbatore',
        state: 'Tamil Nadu'
      };
    });
  }, [user, deliveryPincode, locationName]);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Autocomplete search states
  const [autocompleteInput, setAutocompleteInput] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const debouncedQuery = useDebounce(autocompleteInput, 350);

  // Sync autocomplete input state when address.area updates
  useEffect(() => {
    if (address.area !== undefined && address.area !== autocompleteInput) {
      setAutocompleteInput(address.area);
    }
  }, [address.area]);

  // Fetch autocomplete suggestions from secure proxy
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery || debouncedQuery.length < 3) {
        setPredictions([]);
        return;
      }
      try {
        const response = await fetch(`/api/delivery/autocomplete?input=${encodeURIComponent(debouncedQuery)}`);
        if (response.ok) {
          const data = await response.json();
          setPredictions(data.predictions || []);
        }
      } catch (err) {
        console.error("Autocomplete fetch error:", err);
      }
    };
    fetchSuggestions();
  }, [debouncedQuery]);

  const subtotal = items.reduce((sum, item) => sum + (item.unitPrice * item.size * item.quantity), 0);
  const totalAfterDiscount = Math.max(0, subtotal - discount);
  const gst = totalAfterDiscount * 0.18; // 18% GST

  // Track initial checkout step
  useEffect(() => {
    if (items.length > 0 && analytics) {
      logEvent(analytics, 'begin_checkout', {
        currency: 'INR',
        value: subtotal,
        items: items.map(item => ({
          item_id: item.id,
          item_name: item.name,
          item_brand: item.brand,
          price: item.unitPrice * item.size,
          quantity: item.quantity
        }))
      });
    }
  }, [items]);

  // Live trigger store shipping calculations based on active checkout subtotals
  useEffect(() => {
    updateCartSubtotal(totalAfterDiscount);
    
    // Track cart abandonment in CRM
    const captureAbandonment = async () => {
       if (address.phone && address.phone.length > 9 && items.length > 0) {
          try {
             const { crmService } = await import('../lib/crm');
             // Uses a setDoc with user signature to constantly update their "abandoned cart" status until they order
             await crmService.logAbandonedCart(user?.uid || 'temp_'+address.phone, address.phone, items, totalAfterDiscount);
          } catch (err) {}
       }
    };
    const timer = setTimeout(captureAbandonment, 3000); // debounce 3s
    return () => clearTimeout(timer);
  }, [totalAfterDiscount, updateCartSubtotal, address.phone, items, user]);

  if (items.length === 0) {
    return (
      <div className="bg-royale-bg min-h-screen pt-24 pb-12 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/buy-paint-online')}
          className="px-6 py-3 bg-gradient-gold text-white rounded-lg font-bold hover:opacity-90 transition-colors"
        >
          Browse Products
        </button>
      </div>
    );
  }

  // Read shipping calculations from active store state
  const deliveryFee = deliveryDetails ? deliveryDetails.shippingFee : 150;
  const deliveryZone = deliveryDetails ? deliveryDetails.zone : null;
  const isDirectServiceable = deliveryDetails ? deliveryDetails.serviceable : true;
  const freeThresholdRemaining = deliveryDetails ? deliveryDetails.freeThresholdRemaining : 0;
  const roadDistance = deliveryDetails ? deliveryDetails.distanceKm : null;
  
  const grandTotal = totalAfterDiscount + gst + deliveryFee;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'RAINBOW10') {
      setDiscount(subtotal * 0.1); // 10% off
    } else if (couponCode) {
      setDiscount(0);
      alert('Invalid coupon code. Try RAINBOW10');
    }
  };

  const handleDetectLocation = async () => {
    setDetecting(true);
    const triggerAutofill = (pCode: string, name: string) => {
      setAddress(prev => {
        const newLine1 = [prev.doorNo, prev.street, name].filter(Boolean).join(', ');
        return {
          ...prev,
          pincode: pCode,
          line1: newLine1,
          area: name,
          city: 'Coimbatore',
          state: 'Tamil Nadu',
          name: prev.name || user?.displayName || user?.email?.split('@')[0] || ''
        };
      });
    };

    try {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        setDetecting(false);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await updateLocationByCoordinates(latitude, longitude, undefined, totalAfterDiscount);
          
          const storeState = useDeliveryStore.getState();
          triggerAutofill(storeState.pincode || '641009', storeState.locationName || 'Coimbatore');
          setDetecting(false);
        },
        async (err) => {
          console.warn("Geolocation permission error:", err);
          alert("Location lookup was blocked. Please enable geolocation permissions or enter your pincode and address fields manually.");
          setDetecting(false);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    } catch (err) {
      console.error(err);
      setDetecting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setAddress({...address, phone: value});
    if (value && value.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Phone number
    if (address.phone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number');
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    // Validate required address fields
    if (!address.name || !address.phone || (!address.line1 && (!address.doorNo || !address.street || !address.area)) || !address.city || !address.pincode) {
      alert('Please fill out all required fields: Door No, Street, Area, City, and Pincode.');
      return;
    }

    if (!isDirectServiceable) {
      alert('Your address falls outside our default shipping range. Please contact support via WhatsApp to request custom shipping.');
      return;
    }

    // Attempt to save address in background for logged-in user
    if (user && saveToFirebase) {
      try {
        await saveAddress({
          name: address.name,
          phone: address.phone,
          doorNo: address.doorNo,
          street: address.street,
          area: address.area,
          line1: address.line1,
          landmark: address.landmark || '',
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          isDefault: addresses.length === 0,
          lat: useDeliveryStore.getState().latitude || undefined,
          lon: useDeliveryStore.getState().longitude || undefined
        });
      } catch (err) {
        console.warn("Firebase address saving failed background:", err);
      }
    }

    // Set order draft for checkout routing
    setCurrentOrderDraft({
      items,
      shippingAddress: address,
      subtotal,
      gst,
      deliveryFee,
      total: grandTotal,
      estimatedDelivery: estimation 
        ? estimation.text.replace(/Estimated delivery:\s*(ETA:\s*)?/g, '')
        : deliveryZone 
          ? deliveryZone.eta
          : 'Fast delivery'
    });

    navigate('/payment');
  };

  return (
    <div className="bg-royale-bg min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Breadcrumb 
          items={[
            { label: 'Cart', href: '/buy-paint-online' },
            { label: 'Checkout', href: '/checkout' },
            { label: 'Payment' }
          ]} 
        />

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Form */}
          <div className="w-full lg:w-2/3 space-y-6">

            {/* Profile Saved Addresses Drawer component */}
            {user && addresses.length > 0 && (
              <div className="bg-royale-surface rounded-2xl shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 pb-3">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <h3 className="font-bold text-gray-900 text-lg">Use Your Saved Addresses</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((saved) => {
                    const isSelected = address.line1 === saved.line1 && address.pincode === saved.pincode;
                    return (
                      <div 
                        key={saved.id}
                        onClick={async () => {
                          setSaveToFirebase(false);
                          setAddress({
                            name: saved.name,
                            phone: saved.phone,
                            email: saved.email || user?.email || '',
                            doorNo: saved.doorNo || '',
                            street: saved.street || '',
                            area: saved.area || '',
                            line1: saved.line1,
                            landmark: saved.landmark || '',
                            city: saved.city,
                            state: saved.state,
                            pincode: saved.pincode
                          });
                          
                          if (saved.lat !== undefined && saved.lon !== undefined) {
                            await updateLocationByCoordinates(saved.lat, saved.lon, saved.line1, totalAfterDiscount);
                          } else {
                            await updateLocationByPincode(saved.pincode, totalAfterDiscount);
                          }
                        }}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-gold bg-gold/5 ring-1 ring-gold shadow-sm' 
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-gray-900 truncate text-sm">{saved.name}</span>
                          {saved.isDefault && (
                            <span className="text-[10px] uppercase font-bold text-gold bg-zinc-950 px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-zinc-600 text-xs truncate">{saved.line1}</p>
                        <p className="text-zinc-600 text-[11px] mt-1">{saved.city}, TN {saved.pincode}</p>
                        <p className="text-zinc-900 text-xs font-semibold mt-2">{saved.phone}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <form id="checkout-form" onSubmit={handleSubmit} className="bg-royale-surface rounded-2xl shadow-sm p-6 sm:p-8">
              
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3 border-b border-zinc-100 pb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  Delivery Address Details
                </h2>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={detecting}
                    className="px-3.5 py-2 text-xs font-bold text-zinc-700 hover:text-black bg-white hover:bg-zinc-50 border border-zinc-200 hover:border-zinc-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-60"
                  >
                    <Navigation className={`w-3.5 h-3.5 text-gold fill-gold/15 ${detecting ? 'animate-spin' : ''}`} />
                    {detecting ? 'Locating...' : 'Use Current Location'}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name *</label>
                  <input required name="name" autoComplete="name" type="text" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                  <input required name="phone" autoComplete="tel" type="tel" value={address.phone} onChange={handlePhoneChange} className={`w-full p-3 border ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-gold focus:ring-gold'} bg-gray-50 rounded-xl outline-none focus:ring-1 transition-all`} placeholder="10-digit mobile number" maxLength={10} />
                  {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    {!user && (
                      <button 
                        type="button" 
                        onClick={() => openAuthModal()}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200"
                      >
                        Have an account? Sign In
                      </button>
                    )}
                  </div>
                  <input type="email" name="email" autoComplete="email" value={address.email || ''} onChange={e => setAddress({...address, email: e.target.value})} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="Enter email to receive order updates" />
                  {!user && <p className="text-xs text-zinc-600 mt-1">Enter email to receive order updates, or sign in to track orders easily.</p>}
                </div>

                {/* Free Nominatim Autocomplete Address search field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Door No / Flat No *</label>
                  <input required name="doorNo" autoComplete="address-line1" type="text" value={address.doorNo || ''} onChange={e => {
                    const doorNo = e.target.value;
                    setAddress(prev => ({...prev, doorNo, line1: [doorNo, prev.street, prev.area].filter(Boolean).join(', ')}));
                  }} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="E.g. Flat 101, B Block" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Street Name *</label>
                  <input required name="street" autoComplete="address-line2" type="text" value={address.street || ''} onChange={e => {
                    const street = e.target.value;
                    setAddress(prev => ({...prev, street, line1: [prev.doorNo, street, prev.area].filter(Boolean).join(', ')}));
                  }} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="E.g. 1st Main Road" />
                </div>

                <div className="space-y-2 md:col-span-2 relative">
                  <label className="text-sm font-medium text-gray-700">Area / Locality *</label>
                  <div className="relative">
                    <input 
                      required 
                      name="area"
                      autoComplete="address-line3"
                      type="text" 
                      value={autocompleteInput} 
                      onChange={e => {
                        const area = e.target.value;
                        setAutocompleteInput(area);
                        setAddress(prev => ({...prev, area, line1: [prev.doorNo, prev.street, area].filter(Boolean).join(', ')}));
                        setShowPredictions(true);
                      }}
                      onFocus={() => setShowPredictions(true)}
                      className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all pr-10" 
                      placeholder="Start typing your Coimbatore street or community..." 
                    />
                    <div className="absolute right-3.5 top-3.5 text-zinc-600">
                      <ChevronDown className="w-4 h-4" />
                    </div>

                    <AnimatePresence>
                      {showPredictions && predictions.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-50 left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
                        >
                          {predictions.map((p) => (
                            <div 
                              key={p.place_id} 
                              onClick={async () => {
                                setAutocompleteInput(p.description);
                                setAddress(prev => ({
                                  ...prev,
                                  area: p.description,
                                  line1: [prev.doorNo, prev.street, p.description].filter(Boolean).join(', ')
                                }));
                                setPredictions([]);
                                setShowPredictions(false);

                                try {
                                  const response = await fetch('/api/delivery/geocode', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify({ 
                                      placeId: p.place_id, 
                                      lat: p.lat, 
                                      lon: p.lon,
                                      address: p.description,
                                      pincode: p.pincode
                                    })
                                  });
                                  if (response.ok) {
                                    const geo = await response.json();
                                    if (geo && typeof geo.lat === 'number') {
                                      setAddress(prev => ({
                                        ...prev,
                                        pincode: geo.pincode || prev.pincode,
                                        city: 'Coimbatore',
                                        state: 'Tamil Nadu'
                                      }));
                                      await updateLocationByCoordinates(geo.lat, geo.lon, p.description, totalAfterDiscount);
                                    }
                                  }
                                } catch (err) {
                                  console.error("Geocoding failed on click:", err);
                                }
                              }}
                              className="p-3 hover:bg-zinc-50 border-b border-zinc-100 last:border-0 cursor-pointer text-sm text-zinc-800 text-left"
                            >
                              <div className="font-semibold text-zinc-900">{p.structured_formatting.main_text}</div>
                              <div className="text-zinc-600 text-xs">{p.structured_formatting.secondary_text}</div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {showPredictions && predictions.length > 0 && (
                    <div className="fixed inset-0 z-40" onClick={() => setShowPredictions(false)} />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Landmark (Optional)</label>
                  <input name="landmark" type="text" value={address.landmark} onChange={e => setAddress({...address, landmark: e.target.value})} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="E.g. Near Apollo Hospital" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City *</label>
                  <input required name="city" autoComplete="address-level2" type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="City" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State *</label>
                  <input required name="state" autoComplete="address-level1" type="text" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" placeholder="State" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Pincode *</label>
                  <input 
                    required 
                    name="pincode"
                    autoComplete="postal-code"
                    type="text" 
                    value={address.pincode} 
                    onChange={e => {
                      const pin = e.target.value;
                      setAddress({...address, pincode: pin});
                      if (pin.length === 6 && /^\d{6}$/.test(pin)) {
                        updateLocationByPincode(pin, totalAfterDiscount);
                      }
                    }} 
                    className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" 
                    placeholder="6 Digits [0-9]" 
                  />
                </div>
              </div>

              {/* Checkbox to save address inside user's Firebase account */}
              {user && (
                <div className="mt-5 flex items-center gap-2">
                  <input 
                    id="save_addr_firebase" 
                    type="checkbox" 
                    checked={saveToFirebase} 
                    onChange={e => setSaveToFirebase(e.target.checked)}
                    className="w-4 h-4 text-gold border-zinc-300 rounded focus:ring-gold"
                  />
                  <label htmlFor="save_addr_firebase" className="text-xs text-zinc-600 font-medium cursor-pointer">
                    Save this address to my profile for future orders
                  </label>
                </div>
              )}

              <div className="mt-8 space-y-2">
                <label className="text-sm font-medium text-gray-700">Delivery Instructions (Optional)</label>
                <textarea 
                  value={deliveryInstructions} 
                  onChange={e => setDeliveryInstructions(e.target.value)} 
                  rows={2}
                  className="w-full p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all" 
                  placeholder="E.g. Please leave at the reception"
                />
              </div>

              {/* Delivery Availability Card / Zone Badge / Delivery Status Indicators */}
              <div className="mt-6">
                {isDirectServiceable && deliveryZone ? (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-left">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <span className="text-emerald-800 font-bold block">
                          {estimation ? estimation.text.replace(/Estimated delivery:\s*(ETA:\s*)?/g, '') : deliveryZone.eta}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : !isDirectServiceable && deliveryZone ? (
                  <div className="flex flex-col gap-3 p-4 bg-rose-500/10 rounded-xl border border-rose-500/25 text-left">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-rose-800">Outside Auto-Checkout Range</p>
                          <span className="text-[10px] uppercase font-bold text-[#fce8e6] bg-rose-950 border border-rose-800 px-2.5 py-0.5 rounded-full">
                            Zone F (65+ KM)
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-600 mt-1 leading-relaxed">
                          Your selected delivery point is {roadDistance} KM away, exceeding our automated courier range. 
                          <strong> Delivery available on special request only. </strong>
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-rose-200/40">
                      <a 
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Rainbow Paints & Hardware! I am trying to order paints of total subtotal ₹${subtotal} to Pincode ${address.pincode || '641009'}. Since it exceeds 65km auto shipping, can you help me coordinate a special carrier dispatch?`)}`} 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="w-full inline-flex items-center justify-center p-3 text-sm bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-xl shadow-md transition-colors"
                      >
                        Request Special Delivery via WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-200 text-left">
                    <Truck className="w-5 h-5 text-zinc-600 shrink-0" />
                    <div className="text-sm">
                      <span className="font-semibold text-zinc-700">Estimated Delivery: </span>
                      <span className="text-zinc-800 font-medium">Please enter Coimbatore address or pincode to calculate accurate road distance ETA</span>
                    </div>
                  </div>
                )}
              </div>

            </form>
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-royale-surface rounded-2xl shadow-sm p-6 sticky top-[102px] sm:top-[126px] lg:top-[142px]">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-zinc-50 pb-3 last:border-0 last:pb-0">
                    <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-zinc-100">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-600">No Image</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                      <div className="text-xs text-zinc-600 mt-1 flex flex-wrap items-center gap-2">
                        <span>{item.size}L x {item.quantity}</span>
                        {item.shade && (
                          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                            <div className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: item.shade.hex }} />
                            <span>{item.shade.name} {item.shade.code ? `(${item.shade.code})` : '(White)'}</span>
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-sm text-gray-900 mt-1">
                        ₹{(item.unitPrice * item.size * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon input field */}
              <div className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  placeholder="Coupon code (Try RAINBOW10)" 
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 p-3 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm uppercase"
                />
                <button 
                  type="button" 
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-gray-900 text-[#ffffff] rounded-xl text-sm font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {/* Dynamic Shipping Threshold progress bar indicator */}
              {isDirectServiceable && freeThresholdRemaining > 0 && deliveryZone && deliveryZone.freeThreshold < 999999 && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 text-left">
                  <div className="flex justify-between items-center text-xs text-amber-900 font-bold mb-1.5">
                    <span>Free shipping target ({deliveryZone.name})</span>
                    <span>₹{totalAfterDiscount.toLocaleString()} / ₹{deliveryZone.freeThreshold.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold transition-all duration-500 rounded-full"
                      style={{ width: `${Math.min(100, (totalAfterDiscount / deliveryZone.freeThreshold) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-amber-800 mt-2 font-medium flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
                    <span>Add <strong>₹{freeThresholdRemaining.toLocaleString()}</strong> more for FREE shipping!</span>
                  </p>
                </div>
              )}

              {/* Cost Breakdown */}
              <div className="space-y-3 pt-6 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 relative">
                  <div className="flex items-center gap-1 cursor-help group">
                    <span className="border-b border-dashed border-gray-400">Delivery Fee</span>
                    {deliveryZone && (
                       <div className="absolute left-0 bottom-full mb-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-64 bg-gray-900 text-white text-xs rounded-lg shadow-xl p-3 z-30 pointer-events-none">
                          <p className="font-semibold text-gray-200 mb-1.5 uppercase tracking-wider text-[10px]">Fee Calculation</p>
                          <div className="space-y-1 text-gray-300">
                             <div className="flex justify-between">
                               <span>Zone:</span>
                               <span className="font-medium text-white">{deliveryZone.name} (Zone {deliveryZone.id})</span>
                             </div>
                             {roadDistance !== null && (
                               <div className="flex justify-between">
                                 <span>Road Distance:</span>
                                 <span className="font-medium text-white">{roadDistance} km</span>
                               </div>
                             )}
                             <div className="flex justify-between">
                               <span>Base Charge:</span>
                               <span className="font-medium text-white">₹{deliveryZone.charge.toLocaleString()}</span>
                             </div>
                             {deliveryZone.freeThreshold < 999999 && (
                               <div className="flex justify-between pt-1 mt-1 border-t border-gray-700">
                                 <span>Free Shipping Target:</span>
                                 <span className="font-medium text-emerald-400">₹{deliveryZone.freeThreshold.toLocaleString()}</span>
                               </div>
                             )}
                          </div>
                          {deliveryFee === 0 && (
                            <div className="mt-2 text-emerald-400 font-medium bg-emerald-500/10 -mx-3 -mb-3 p-2 rounded-b-lg text-center">
                              ✅ Target Reached! Fast Delivery Free.
                            </div>
                          )}
                          <div className="absolute top-full left-4 -mt-px border-4 border-transparent border-t-gray-900 border-t-8 w-0 h-0"></div>
                       </div>
                    )}
                  </div>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-bold">FREE</span>
                  ) : (
                    <span>₹{deliveryFee.toLocaleString()}</span>
                  )}
                </div>
                {deliveryZone && isDirectServiceable && (
                  <div className="flex justify-between text-xs text-emerald-600 font-medium bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      Estimated Delivery
                    </span>
                    <span className="font-bold">
                      {estimation ? estimation.text.replace(/Estimated delivery:\s*(ETA:\s*)?/g, '') : deliveryZone.eta}
                    </span>
                  </div>
                )}
              </div>

              {/* Grand Total */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>

                <div className="mb-6 bg-white border border-zinc-200 rounded-xl p-4 sm:p-5 relative overflow-hidden shadow-sm">
                  {/* Background ambient gold orb */}
                  <div className="absolute -top-10 -right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-[13px] text-zinc-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      <span>Authorised Dealer</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-zinc-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      <span>Genuine Products</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-zinc-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      <span>GST Invoice Included</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-zinc-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-gold" />
                      <span>Free Delivery in Coimbatore</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  form="checkout-form"
                  disabled={!isDirectServiceable}
                  className="w-full flex items-center justify-center py-4 bg-gradient-gold text-white rounded-xl font-bold text-lg hover:opacity-90 shadow-lg shadow-gold/20 transition-all outline-none disabled:bg-zinc-300 disabled:text-zinc-600 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {isDirectServiceable ? 'Proceed to Payment' : 'Auto Checkout Blocked'}
                </button>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-600">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Secure 128-bit SSL encrypted checkout</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <GoogleReviewsSection />
    </div>
  );
}
