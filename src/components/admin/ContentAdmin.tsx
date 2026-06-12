import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Type, Save, CheckCircle, Smartphone, Layout, Megaphone } from 'lucide-react';

export default function ContentAdmin() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Banner state
  const [bannerActive, setBannerActive] = useState(true);
  const [bannerText, setBannerText] = useState("FREE DELIVERY ON ALL ORDERS OVER ₹5,000");
  const [bannerLink, setBannerLink] = useState("/buy-paint-online");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const bannerDoc = await getDoc(doc(db, 'content', 'announcement_banner'));
      if (bannerDoc.exists()) {
        const data = bannerDoc.data();
        setBannerActive(data.active ?? true);
        setBannerText(data.text ?? "FREE DELIVERY ON ALL ORDERS OVER ₹5,000");
        setBannerLink(data.link ?? "/buy-paint-online");
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await setDoc(doc(db, 'content', 'announcement_banner'), {
        active: bannerActive,
        text: bannerText,
        link: bannerLink,
        updatedAt: new Date()
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Layout className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-display font-bold text-zinc-900">Content Management</h2>
        </div>
        <p className="text-sm text-zinc-600">
          Manage text, banners, and layout content across the website.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-800 font-bold">
              <Megaphone className="w-4 h-4 text-amber-500" />
              Promotion Banner (Header)
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox"
                checked={bannerActive}
                onChange={(e) => setBannerActive(e.target.checked)}
                className="w-5 h-5 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <span className="block text-sm font-semibold text-zinc-900">Show Announcement Banner</span>
                <span className="block text-xs text-zinc-600 mt-0.5">Display the promotional sliding banner at the very top of the website.</span>
              </div>
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wider">Banner Text</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="text"
                    value={bannerText}
                    onChange={(e) => setBannerText(e.target.value)}
                    disabled={!bannerActive}
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1.5 uppercase tracking-wider">Click Link (Optional)</label>
                <input
                  type="text"
                  value={bannerLink}
                  onChange={(e) => setBannerLink(e.target.value)}
                  disabled={!bannerActive}
                  placeholder="e.g. /buy-paint-online"
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50"
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl border border-dashed border-zinc-300 bg-zinc-50">
              <span className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Live Preview Preview</span>
              {bannerActive ? (
                <div className="bg-[#0B1021] text-ivory py-2 px-4 rounded-md text-center text-xs font-medium border-b border-white/10 uppercase tracking-widest truncate">
                  {bannerText}
                </div>
              ) : (
                <div className="text-center text-xs text-zinc-600 py-2">
                  Banner is currently disabled.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Management Placeholder */}
        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-800 font-bold">
              <Type className="w-4 h-4 text-emerald-500" />
              Store Information & FAQs
            </div>
            <button type="button" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
              Manage +
            </button>
          </div>
          <div className="p-6">
            <p className="text-sm text-zinc-600 mb-4">Edit shop-specific details or Frequently Asked Questions to help customers buy.</p>
            <div className="text-center p-8 bg-zinc-50 border border-dashed border-zinc-300 rounded-xl">
              <span className="text-sm font-medium text-zinc-600">FAQ Editor Module (Coming soon)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-2">
          {success && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <CheckCircle className="w-4 h-4" /> Saved Successfully
            </span>
          )}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Content
          </button>
        </div>
      </form>
    </div>
  );
}
