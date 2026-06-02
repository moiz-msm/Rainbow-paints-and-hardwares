import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { Settings, Save, Truck, DollarSign, MapPin, Loader2 } from "lucide-react";

export default function StoreSettingsAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    defaultDeliveryCharge: 150,
    freeDeliveryThreshold: 5000,
    supportEmail: "rainbow_paint@hotmail.com",
    contactPhone: "+91 80724 42930",
    storeAddress: "54 Cox Street, Kattoor, Coimbatore, Tamil Nadu - 641009",
    gstPercentage: 18,
    enableLocalDelivery: true
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "system", "storeSettings"), (docSnap) => {
      if (docSnap.exists()) {
        setSettings({ ...settings, ...docSnap.data() } as any);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "system", "storeSettings"), settings, { merge: true });
      alert("Store Settings updated successfully!");
    } catch (error) {
      console.error("Error saving settings", error);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-zinc-500">Loading Configuration...</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
      <div className="py-4 px-6 border-b border-zinc-200 flex justify-between items-center bg-zinc-50/50">
        <h2 className="text-xl font-bold font-serif text-zinc-900 tracking-tight flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-600" />
          Store Configuration
        </h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-zinc-900 text-white font-medium text-xs rounded-xl hover:bg-zinc-800 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Changes
        </button>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        
        {/* Shipping Section */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-4 flex items-center gap-2 border-b border-zinc-100 pb-2">
            <Truck className="w-4 h-4 text-emerald-600" />
            Shipping & Local Delivery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Base Delivery Charge (₹)</label>
              <input
                type="number"
                name="defaultDeliveryCharge"
                value={settings.defaultDeliveryCharge}
                onChange={handleChange}
                className="w-full text-sm p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <p className="text-[10px] text-zinc-400 mt-1">Applied if distance-based estimation fails.</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Free Delivery Threshold (₹)</label>
              <input
                type="number"
                name="freeDeliveryThreshold"
                value={settings.freeDeliveryThreshold}
                onChange={handleChange}
                className="w-full text-sm p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <p className="text-[10px] text-zinc-400 mt-1">Orders above this subtotal get free shipping.</p>
            </div>
            <div className="col-span-1 md:col-span-2 flex items-center gap-3">
              <input 
                type="checkbox" 
                id="enableLocalDelivery" 
                name="enableLocalDelivery"
                checked={settings.enableLocalDelivery}
                onChange={handleChange}
                className="w-4 h-4 text-emerald-600 rounded border-zinc-300 focus:ring-emerald-600"
              />
              <label htmlFor="enableLocalDelivery" className="text-sm font-semibold text-zinc-900">Enable Automated Hyperlocal Geography Routing</label>
            </div>
          </div>
        </section>

        {/* Store Profile Section */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-4 flex items-center gap-2 border-b border-zinc-100 pb-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            Store Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Physical Store Address</label>
              <textarea
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                rows={2}
                className="w-full text-sm p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Official Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
                className="w-full text-sm p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Contact Phone Number</label>
              <input
                type="text"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full text-sm p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </section>

        {/* Financials & Tax */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 mb-4 flex items-center gap-2 border-b border-zinc-100 pb-2">
            <DollarSign className="w-4 h-4 text-indigo-600" />
            Tax Config
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Standard GST % (Integrated/CGST+SGST)</label>
              <div className="relative">
                <input
                  type="number"
                  name="gstPercentage"
                  value={settings.gstPercentage}
                  onChange={handleChange}
                  className="w-full text-sm p-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 pr-10"
                />
                <span className="absolute right-4 top-3.5 text-zinc-400 font-bold">%</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
