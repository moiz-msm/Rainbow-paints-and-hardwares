import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { Download, Search, Trash2, Plus, X } from "lucide-react";
import { downloadExcel } from "../../utils/excelExport";

export default function CouponsAdmin() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderValue: "",
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "coupons"), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setCoupons(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleExport = () => {
    const flattenedData = coupons.map((c) => ({
      ID: c.id,
      Code: c.code,
      Type: c.discountType,
      Value: c.discountValue,
      MinOrder: c.minOrderValue || 0,
      Active: c.isActive !== false ? "Yes" : "No",
    }));
    downloadExcel(flattenedData, "Coupons_Export");
  };

  const handleCreate = async () => {
    if (!newCoupon.code || !newCoupon.discountValue) {
      alert("Code and Value are required");
      return;
    }
    try {
      await addDoc(collection(db, "coupons"), {
        code: newCoupon.code.toUpperCase(),
        discountType: newCoupon.discountType,
        discountValue: Number(newCoupon.discountValue),
        minOrderValue: Number(newCoupon.minOrderValue) || 0,
        isActive: true,
        createdAt: Date.now(),
      });
      setShowAddForm(false);
      setNewCoupon({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minOrderValue: "",
      });
    } catch (e) {
      alert("Error creating coupon");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this coupon code?")) {
      await deleteDoc(doc(db, "coupons", id));
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, "coupons", id), { isActive: !currentStatus });
    } catch (e) {
      alert("Error updating status");
    }
  };

  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading)
    return (
      <div className="p-10 text-center text-zinc-500">Loading Promotions...</div>
    );

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-50">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search promo codes..."
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2.5 bg-zinc-900 text-white font-semibold text-sm rounded-xl hover:bg-zinc-800 flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" /> Add Code
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2.5 bg-emerald-50 text-emerald-700 font-semibold text-sm rounded-xl hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors border border-emerald-100 w-full sm:w-auto"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="p-6 border-b border-zinc-200 bg-zinc-50/80 animate-fade-in relative block">
          <button onClick={() => setShowAddForm(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600">
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-semibold text-zinc-900 mb-4 text-sm uppercase tracking-wider">
            Create Promo Code
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Code</label>
              <input
                type="text"
                placeholder="e.g. SUMMER50"
                className="w-full border border-zinc-200 p-2.5 rounded-lg text-sm bg-white focus:ring-1 focus:ring-emerald-500 outline-none uppercase"
                value={newCoupon.code}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, code: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Type</label>
              <select
                className="w-full border border-zinc-200 p-2.5 rounded-lg text-sm bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                value={newCoupon.discountType}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, discountType: e.target.value })
                }
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Value</label>
              <input
                type="number"
                placeholder="Discount"
                className="w-full border border-zinc-200 p-2.5 rounded-lg text-sm bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                value={newCoupon.discountValue}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    discountValue: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">Min. Order (Optional)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full border border-zinc-200 p-2.5 rounded-lg text-sm bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                value={newCoupon.minOrderValue}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    minOrderValue: e.target.value,
                  })
                }
              />
            </div>
            <button
              onClick={handleCreate}
              className="bg-emerald-600 text-white p-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors w-full flex items-center justify-center h-[42px]"
            >
              Save Coupon
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-zinc-50/50 text-zinc-500 border-b border-zinc-200">
              <th className="px-6 py-4 font-semibold">Code</th>
              <th className="px-6 py-4 font-semibold">Discount</th>
              <th className="px-6 py-4 font-semibold">Conditions</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((coupon) => (
              <tr
                key={coupon.id}
                className="hover:bg-zinc-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-zinc-900 tracking-wide">
                  {coupon.code}
                </td>
                <td className="px-6 py-4 font-medium text-zinc-800">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}% OFF`
                    : `₹${coupon.discountValue} OFF`}
                </td>
                <td className="px-6 py-4 text-zinc-500">
                  {coupon.minOrderValue > 0
                    ? `Min purchase ₹${coupon.minOrderValue}`
                    : "No minimum"}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleToggleStatus(coupon.id, coupon.isActive !== false)
                    }
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors
                      ${
                        coupon.isActive !== false
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                  >
                    {coupon.isActive !== false ? "Active" : "Disabled"}
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(coupon.id)}
                    className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors ml-2"
                    title="Delete Coupon"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-zinc-500"
                >
                  No promos found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
