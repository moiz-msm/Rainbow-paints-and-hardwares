import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Download, Search, Trash2, CheckCircle, ShoppingBag, X, FileText } from "lucide-react";
import { downloadExcel } from "../../utils/excelExport";
import { generateInvoice } from "../../utils/invoiceGenerator";

const USER_ROLES = ["customer", "staff", "admin", "owner"];

export default function UsersAdmin() {
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState("");
  const [viewingUserOrders, setViewingUserOrders] = useState<any | null>(null);

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setUsers(list);
      setLoading(false);
    });
    const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setOrders(list);
    });
    return () => {
      unsubUsers();
      unsubOrders();
    };
  }, []);

  const handleExport = () => {
    const flattenedData = users.map((u) => {
      const userOrders = orders.filter((o) => o.userId === u.id);
      const totalSpent = userOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      return {
        UID: u.id,
        DateJoined: u.createdAt ? new Date(u.createdAt).toLocaleString() : "N/A",
        Name: u.name,
        Email: u.email,
        Phone: u.phone || "",
        Role: u.role,
        TotalOrders: userOrders.length,
        TotalSpent: totalSpent,
        IsActive: u.isActive !== false ? "Yes" : "No",
      };
    });
    downloadExcel(flattenedData, "Users_Export");
  };

  const saveRole = async (id: string) => {
    if (!editRole) return;
    try {
      await updateDoc(doc(db, "users", id), { role: editRole.toLowerCase() });
      setEditingId(null);
    } catch (e) {
      alert("Error updating role");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user record from the database?",
      )
    ) {
      await deleteDoc(doc(db, "users", id));
    }
  };

  const filtered = users.filter((u) => {
    const term = search.toLowerCase();
    return (
      (u.name || "").toLowerCase().includes(term) ||
      (u.email || "").toLowerCase().includes(term)
    );
  });

  const handleDownloadInvoice = (docData: any) => {
    const mappedOrder = {
      id: docData.id,
      items: docData.products?.map((p: any) => ({
        productId: p.productId,
        name: p.name,
        brand: p.brand || "",
        shade: p.shade || null,
        size: p.size || 1,
        quantity: p.quantity || 1,
        unitPrice: p.price || 0,
      })) || [],
      subtotal: docData.subtotal || docData.total || 0,
      gst: docData.total ? docData.total - (docData.total / 1.18) : 0,
      deliveryFee: docData.deliveryCharge || 0,
      total: docData.total || 0,
      shippingAddress: docData.deliveryAddress || {},
      paymentMethod: docData.paymentMethod || 'Online Payment',
      date: docData.createdAt ? new Date(docData.createdAt).toISOString() : new Date().toISOString(),
      status: docData.status || 'PROCESSING'
    };
    generateInvoice(mappedOrder as any);
  };

  if (loading)
    return (
      <div className="p-10 text-center text-zinc-500">Loading Users...</div>
    );

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-50">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={handleExport}
          className="w-full md:w-auto px-5 py-2.5 bg-emerald-50 text-emerald-700 font-semibold text-sm rounded-xl hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors border border-emerald-100"
        >
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-zinc-50/50 text-zinc-500 border-b border-zinc-200">
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Contact</th>
              <th className="px-6 py-4 font-semibold">Orders</th>
              <th className="px-6 py-4 font-semibold">Role</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((user) => {
              const userOrders = orders.filter((o) => o.userId === user.id);
              return (
                <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-zinc-900 block">
                      {user.name}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      {user.id.slice(0, 8)}...
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-600">
                    <span className="block">{user.email}</span>
                    <span className="text-xs text-zinc-400">
                      {user.phone || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    <span className="font-semibold text-zinc-900">{userOrders.length}</span> orders
                    <button 
                      onClick={() => setViewingUserOrders(user)}
                      className="ml-3 px-2 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs rounded transition-colors"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {editingId === user.id ? (
                      <div className="flex items-center gap-2">
                         <select 
                           className="text-xs border border-zinc-300 rounded px-2 py-1 outline-none focus:border-emerald-500"
                           value={editRole}
                           onChange={e => setEditRole(e.target.value)}
                         >
                           {USER_ROLES.map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                         <button onClick={() => saveRole(user.id)} className="text-emerald-600 hover:text-emerald-700">
                           <CheckCircle className="w-4 h-4" />
                         </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setEditingId(user.id); setEditRole(user.role || 'customer'); }}
                        className={`px-2.5 py-1 text-xs rounded-md font-semibold border transition-colors capitalize
                          ${user.role === 'admin' || user.role === 'owner' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                            user.role === 'staff' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-zinc-100 text-zinc-800 border-zinc-200 hover:border-zinc-300'}`}
                        title="Click to edit role"
                      >
                        {user.role || 'customer'}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors ml-2"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-zinc-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {viewingUserOrders && (
        <div className="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in overflow-hidden">
            <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 text-lg">Order History</h3>
                  <p className="text-sm text-zinc-500">{viewingUserOrders.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setViewingUserOrders(null)}
                className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-5">
              {orders.filter(o => o.userId === viewingUserOrders.id).length === 0 ? (
                <div className="text-center py-10 text-zinc-500">
                  <ShoppingBag className="w-12 h-12 mx-auto text-zinc-200 mb-3" />
                  <p>This user hasn't placed any orders yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.filter(o => o.userId === viewingUserOrders.id)
                    .sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0))
                    .map(order => (
                    <div key={order.id} className="border border-zinc-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm font-semibold text-zinc-900">{order.id}</span>
                          <span className="text-xs text-zinc-400">•</span>
                          <span className="text-xs text-zinc-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-zinc-600">
                          {order.products?.length || 0} items • ₹{order.total?.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 text-xs rounded-md font-semibold border ${
                          order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {order.status}
                        </span>
                        <button
                          onClick={() => handleDownloadInvoice(order)}
                          className="p-1.5 text-zinc-400 hover:text-indigo-600 transition-colors ml-2"
                          title="Download Invoice"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

