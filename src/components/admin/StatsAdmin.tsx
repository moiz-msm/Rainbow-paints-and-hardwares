import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Activity,
  TrendingUp,
} from "lucide-react";
import { format, subDays } from "date-fns";

export default function StatsAdmin() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeUsers: 0,
    productCount: 0,
  });

  useEffect(() => {
    const unsubOrders = onSnapshot(collection(db, "orders"), (snap) => {
      let rev = 0;
      snap.forEach((d) => {
        const order = d.data();
        if (order.status !== "CANCELLED" && order.total) {
          rev += order.total;
        }
      });
      setStats((s) => ({ ...s, totalRevenue: rev, totalOrders: snap.size }));
    });

    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      setStats((s) => ({ ...s, activeUsers: snap.size }));
    });

    const unsubProducts = onSnapshot(collection(db, "products"), (snap) => {
      setStats((s) => ({ ...s, productCount: snap.size }));
    });

    return () => {
      unsubOrders();
      unsubUsers();
      unsubProducts();
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider block mb-1">
                Total Revenue
              </span>
              <p className="text-3xl font-bold tracking-tight text-zinc-900">
                ₹{stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>All time total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider block mb-1">
                Total Orders
              </span>
              <p className="text-3xl font-bold tracking-tight text-zinc-900">
                {stats.totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center text-blue-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-blue-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Processed</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider block mb-1">
                Registered Users
              </span>
              <p className="text-3xl font-bold tracking-tight text-zinc-900">
                {stats.activeUsers}
              </p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-indigo-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active accounts</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wider block mb-1">
                Inventory Check
              </span>
              <p className="text-3xl font-bold tracking-tight text-zinc-900">
                {stats.productCount}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-center text-amber-600">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-amber-600">
            <span>Products available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
