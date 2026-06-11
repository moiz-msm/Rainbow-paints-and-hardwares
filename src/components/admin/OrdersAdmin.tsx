import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { Download, Search, Trash2, CheckCircle, User, FileText } from "lucide-react";
import { downloadExcel } from "../../utils/excelExport";
import { generateInvoice } from "../../utils/invoiceGenerator";

const ORDER_STATUSES = ["PROCESSING", "CONFIRMED", "PACKED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState("");

  useEffect(() => {
    const unsubOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setOrders(list);
      setLoading(false);
    });

    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setUsers(list);
    });

    return () => {
      unsubOrders();
      unsubUsers();
    };
  }, []);

  const handleExport = () => {
    const flattenedData = orders.map((o) => {
      const user = users.find(u => u.id === o.userId);
      return {
        OrderID: o.id,
        Date: new Date(o.createdAt || Date.now()).toLocaleString(),
        AccountEmail: user?.email || 'Guest',
        CustomerName: o.deliveryAddress?.name || "",
        CustomerPhone: o.phone || o.deliveryAddress?.phone || "",
        City: o.deliveryAddress?.city || "",
        TotalAmount: o.total,
        Status: o.status,
        PaymentStatus: o.paymentStatus || "",
        ItemCount: o.products?.length || 0,
        ProductNames: o.products?.map((p: any) => p.name).join(", ") || "",
      };
    });
    downloadExcel(flattenedData, "Orders_Export");
  };

  const saveStatus = async (id: string, orderData: any) => {
    if (!editStatus) return;
    try {
      await updateDoc(doc(db, "orders", id), {
        status: editStatus.toUpperCase(),
      });
      setEditingId(null);

      // Trigger email if OUT_FOR_DELIVERY or DELIVERED
      if (editStatus.toUpperCase() === 'OUT_FOR_DELIVERY' || editStatus.toUpperCase() === 'DELIVERED') {
        const customerEmail = orderData.deliveryAddress?.email || users.find(u => u.id === orderData.userId)?.email;
        if (customerEmail) {
          fetch('/api/transaction/status-update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: id,
              status: editStatus.toUpperCase(),
              customerEmail,
              customerName: orderData.deliveryAddress?.name
            })
          }).catch(console.error);
        }
      }
    } catch (e) {
      alert("Error updating order");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await deleteDoc(doc(db, "orders", id));
    }
  };

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

  const filtered = orders.filter((o) => {
    const term = search.toLowerCase();
    const user = users.find(u => u.id === o.userId);
    return (
      o.id.toLowerCase().includes(term) ||
      (o.deliveryAddress?.name || "").toLowerCase().includes(term) ||
      (user?.email || "").toLowerCase().includes(term)
    );
  });

  if (loading)
    return (
      <div className="p-10 text-center text-zinc-500">Loading Orders...</div>
    );

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-50">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search orders or user email..."
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
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Account / Customer</th>
              <th className="px-6 py-4 font-semibold">Amount</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((order) => {
              const account = users.find(u => u.id === order.userId);
              return (
                <tr key={order.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-900 font-mono text-xs">
                    {order.id.slice(0, 8)}...
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {account ? (
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <User className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="text-xs font-medium text-indigo-600">{account.email}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="text-xs font-medium text-zinc-500">Guest Order</span>
                      </div>
                    )}
                    <span className="font-semibold block text-zinc-900">{order.deliveryAddress?.name}</span>
                    <span className="text-xs text-zinc-400 block">
                      {order.phone || order.deliveryAddress?.phone}
                    </span>
                    {order.deliveryAddress?.email && (
                      <span className="text-xs text-zinc-500 mt-0.5 block">
                        {order.deliveryAddress.email}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold text-zinc-900">
                    ₹{order.total?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === order.id ? (
                      <div className="flex items-center gap-2">
                         <select 
                           className="text-xs border border-zinc-300 rounded px-2 py-1 outline-none focus:border-emerald-500"
                           value={editStatus}
                           onChange={e => setEditStatus(e.target.value)}
                         >
                           {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                         <button onClick={() => saveStatus(order.id, order)} className="text-emerald-600 hover:text-emerald-700">
                           <CheckCircle className="w-4 h-4" />
                         </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => { setEditingId(order.id); setEditStatus(order.status); }}
                        className={`px-2.5 py-1 text-xs rounded-md font-semibold border transition-colors
                          ${order.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                            order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-zinc-100 text-zinc-800 border-zinc-200 hover:border-zinc-300'}`}
                        title="Click to edit status"
                      >
                        {order.status}
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleDownloadInvoice(order)}
                      className="p-1.5 text-zinc-400 hover:text-indigo-600 transition-colors"
                      title="Download Invoice"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="p-1.5 text-zinc-400 hover:text-red-600 transition-colors ml-1"
                      title="Delete"
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
                  colSpan={6}
                  className="px-6 py-10 text-center text-zinc-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
