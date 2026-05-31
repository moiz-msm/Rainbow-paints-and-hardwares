import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  Users,
  User,
  FileText,
  Search,
  Printer,
  X,
  Receipt,
} from "lucide-react";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  size: number;
}

interface OrderAddress {
  name: string;
  phone: string;
  line1: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

interface OrderData {
  id: string;
  userId: string;
  products: OrderItem[];
  status: string;
  paymentStatus: string;
  deliveryAddress: OrderAddress;
  phone: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  createdAt: any;
}

export default function CRMPanel() {
  const [activeTab, setActiveTab] = useState<"customers" | "orders">(
    "customers",
  );

  // Custom states
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected Order for Invoice view
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);

  // Filters for Orders
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState(""); // YYYY-MM-DD

  useEffect(() => {
    // 1. Fetch Users
    const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersList: any[] = [];
      snapshot.forEach((doc) => usersList.push({ id: doc.id, ...doc.data() }));
      setCustomers(usersList);
    });

    // 2. Fetch Orders
    const ordersQuery = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
    );
    const unsubOrders = onSnapshot(ordersQuery, (snapshot) => {
      const ordersList: OrderData[] = [];
      snapshot.forEach((doc) => {
        ordersList.push({ id: doc.id, ...doc.data() } as OrderData);
      });
      setOrders(ordersList);
      setLoading(false);
    });

    return () => {
      unsubUsers();
      unsubOrders();
    };
  }, []);

  // Update order status in Firebase
  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });

      // If selected order is open, update its state
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: newStatus } : null,
        );
      }
    } catch (e) {
      console.error("Error updating order status:", e);
    }
  };

  // Update payment status in Firebase
  const updatePaymentStatus = async (orderId: string, newPayStatus: string) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { paymentStatus: newPayStatus });

      // If selected order is open, update its state
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, paymentStatus: newPayStatus } : null,
        );
      }
    } catch (e) {
      console.error("Error updating payment status:", e);
    }
  };

  // Filter Logic for Orders
  const filteredOrders = orders.filter((order) => {
    // Search query
    const custName = order.deliveryAddress?.name?.toLowerCase() || "";
    const custPhone = order.phone || "";
    const orderId = order.id?.toLowerCase() || "";
    const matchesSearch =
      custName.includes(searchQuery.toLowerCase()) ||
      custPhone.includes(searchQuery) ||
      orderId.includes(searchQuery.toLowerCase());

    // Payment Filter
    const matchesPayment =
      paymentFilter === "ALL" ||
      (order.paymentStatus || "PAID").toUpperCase() === paymentFilter;

    // Status Filter
    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    // Date Filter
    let matchesDate = true;
    if (dateFilter) {
      const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
      matchesDate = orderDate === dateFilter;
    }

    return matchesSearch && matchesPayment && matchesStatus && matchesDate;
  });

  const printInvoice = () => {
    const printContent = document.getElementById("printable-invoice-area");
    const originalContent = document.body.innerHTML;
    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      // Re-trigger reload/re-render to restore React state cleanly
      window.location.reload();
    }
  };

  if (loading)
    return (
      <div className="p-8 text-center text-zinc-500">
        Loading CRM & Orders data...
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Tab Switcher Headers */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-zinc-200 pb-3">
        <div>
          <h2 className="text-2xl font-bold font-serif text-zinc-900 tracking-tight">
            Rainbow CRM Console
          </h2>
          <p className="text-xs text-zinc-500">
            Monitor customers profile data, sales inquiries, active orders, and
            professional tax invoices.
          </p>
        </div>
        <div className="flex bg-zinc-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab("customers")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "customers"
                ? "bg-white shadow-sm text-zinc-900"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Customers List ({customers.length})
          </button>
          <button
            id="btn-all-orders"
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "orders"
                ? "bg-white shadow-sm text-zinc-900"
                : "text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <Receipt className="w-3.5 h-3.5 text-gold" />
            All Orders & Invoices ({orders.length})
          </button>
        </div>
      </div>

      {/* --- TAB 1: CUSTOMERS LIST --- */}
      {activeTab === "customers" && (
        <div className="bg-royale-surface border border-zinc-150 rounded-2xl overflow-hidden shadow-sm">
          <div className="py-4 px-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
            <span className="text-xs font-bold text-zinc-650 uppercase">
              Registered Client Profiles
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-zinc-50/70 border-b border-zinc-150 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Contact & Phone</th>
                  <th className="py-4 px-6">Account Created</th>
                  <th className="py-4 px-6">Access Group</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {customers.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-zinc-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 text-sm">
                            {c.name || "Anonymous Client"}
                          </p>
                          <p className="text-[11px] text-zinc-400">
                            {c.email || "no-email@rainbowpaints.com"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-xs font-medium text-zinc-800">
                        {c.phone || "No phone supplied"}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-xs text-zinc-500">
                        {c.createdAt
                          ? new Date(c.createdAt).toLocaleDateString(
                              undefined,
                              { dateStyle: "medium" },
                            )
                          : "N/A"}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-full border uppercase ${
                          c.role === "admin"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-zinc-100 text-zinc-700 border-zinc-250"
                        }`}
                      >
                        {c.role || "retail"}
                      </span>
                    </td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-zinc-400 text-xs"
                    >
                      No customer profiles discovered.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 2: ALL ORDERS & INVOICES --- */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="bg-royale-surface border border-zinc-150 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mt-0">
              Filters & Search Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Name, Phone, ID..."
                  className="w-full text-xs pl-10 pr-4 py-2.5 bg-zinc-55 border border-zinc-200 rounded-xl outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 shrink-0">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full text-xs p-2.5 bg-zinc-55 border border-zinc-200 rounded-xl outline-none text-zinc-700"
                >
                  <option value="ALL">All Delivery Statuses</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="PACKED">Packed</option>
                  <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              {/* Payment Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 shrink-0">Payment:</span>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="w-full text-xs p-2.5 bg-zinc-55 border border-zinc-200 rounded-xl outline-none text-zinc-700"
                >
                  <option value="ALL">All Payments</option>
                  <option value="PAID">Paid</option>
                  <option value="PENDING">Pending</option>
                  <option value="COD">Cash on Delivery (COD)</option>
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 shrink-0">Date:</span>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full text-xs p-2 bg-zinc-55 border border-zinc-200 rounded-xl outline-none text-zinc-750"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter("")}
                    className="text-xs text-rose-500 font-semibold hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Orders Listing Table */}
          <div className="bg-royale-surface border border-zinc-150 rounded-2xl overflow-hidden shadow-sm">
            <div className="py-4 px-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <span className="text-xs font-bold text-zinc-700">
                Orders List Match ({filteredOrders.length})
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-zinc-50/70 border-b border-zinc-150 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="py-4 px-4">Order ID</th>
                    <th className="py-4 px-4">Customer Details</th>
                    <th className="py-4 px-4">Summary</th>
                    <th className="py-4 px-4">Value</th>
                    <th className="py-4 px-4">Status Update</th>
                    <th className="py-4 px-4 text-center">Invoices</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs">
                  {filteredOrders.map((ord) => (
                    <tr
                      key={ord.id}
                      className="hover:bg-zinc-50/50 transition-colors"
                    >
                      <td className="py-4 px-4 font-bold text-zinc-800">
                        {ord.id || "RP-TEMP"}
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-zinc-900">
                            {ord.deliveryAddress?.name || "Walk-in"}
                          </p>
                          <p className="text-[10px] text-zinc-500">
                            {ord.phone || ord.deliveryAddress?.phone}
                          </p>
                          <p className="text-[10px] text-zinc-400 truncate max-w-xs">
                            {ord.deliveryAddress?.line1},{" "}
                            {ord.deliveryAddress?.pincode}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-zinc-750 font-medium">
                            {ord.products?.length || 0} product(s)
                          </p>
                          <p className="text-[10px] text-zinc-400">
                            {ord.createdAt
                              ? new Date(ord.createdAt).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-zinc-900">
                        ₹{ord.total?.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 px-4 space-y-1.5">
                        {/* Delivery Status Select */}
                        <div className="flex items-center gap-1">
                          <select
                            value={ord.status}
                            onChange={(e) =>
                              updateStatus(ord.id, e.target.value)
                            }
                            className={`p-1 rounded text-[10px] font-bold border outline-none ${
                              ord.status === "DELIVERED"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-250"
                                : ord.status === "CANCELLED"
                                  ? "bg-rose-50 text-rose-700 border-rose-250"
                                  : "bg-amber-50 text-amber-700 border-amber-250"
                            }`}
                          >
                            <option value="PROCESSING">Processing</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="PACKED">Packed</option>
                            <option value="OUT_FOR_DELIVERY">
                              Out for Delivery
                            </option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </div>

                        {/* Payment Status Select */}
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] text-zinc-450 uppercase">
                            Pay:
                          </span>
                          <select
                            value={ord.paymentStatus || "PAID"}
                            onChange={(e) =>
                              updatePaymentStatus(ord.id, e.target.value)
                            }
                            className={`p-0.5 rounded text-[9px] font-semibold border outline-none`}
                          >
                            <option value="PAID">PAID</option>
                            <option value="PENDING">PENDING</option>
                          </select>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-2.5 py-1.5 bg-gold/15 text-gold hover:bg-gold/25 font-bold rounded-lg flex items-center gap-1.5 mx-auto transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-8 text-center text-zinc-400 text-xs"
                      >
                        No orders located for key filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- INVOICE MASTER MODAL --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-zinc-200 animate-scale-up">
            {/* Modal Header Controls */}
            <div className="bg-zinc-50 py-3.5 px-6 border-b border-zinc-150 flex justify-between items-center">
              <span className="text-xs font-bold text-zinc-550 flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-gold" />
                Official Invoice Preview
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={printInvoice}
                  className="px-3.5 py-1.5 bg-zinc-950 text-gold hover:text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print/PDF
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 text-zinc-400 hover:text-zinc-650 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Frame Area */}
            <div
              id="printable-invoice-area"
              className="p-8 space-y-6 text-zinc-800 bg-white leading-relaxed text-xs"
            >
              {/* Header Letterhead */}
              <div className="flex justify-between items-start border-b-2 border-zinc-900 pb-5">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-zinc-900 font-serif">
                    RAINBOW <span className="text-gold">PAINTS</span>
                  </h1>
                  <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">
                    Rainbow Paint & Hardwares
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    Gandhipuram, Coimbatore, Tamil Nadu - 641012
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    Contact: +91 80724 42930 | support@rainbowpaints.com
                  </p>
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-bold text-zinc-950 uppercase tracking-widest">
                    Tax Invoice
                  </h2>
                  <p className="font-semibold text-zinc-800">
                    Invoice No: {selectedOrder.id || "RP-TEMP"}
                  </p>
                  <p className="text-zinc-500">
                    Date:{" "}
                    {selectedOrder.createdAt
                      ? new Date(selectedOrder.createdAt).toLocaleDateString(
                          undefined,
                          { dateStyle: "long" },
                        )
                      : "Recent"}
                  </p>
                  <div
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                      (selectedOrder.paymentStatus || "PAID") === "PAID"
                        ? "bg-emerald-50 text-emerald-805 border-emerald-200"
                        : "bg-amber-50 text-amber-805 border-amber-200"
                    }`}
                  >
                    Payment: {selectedOrder.paymentStatus || "PAID"}
                  </div>
                </div>
              </div>

              {/* Addresses Grid */}
              <div className="grid grid-cols-2 gap-8 border-b border-zinc-150 pb-5">
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-2 text-[10px]">
                    Client / Bill To:
                  </h4>
                  <p className="font-semibold text-sm text-zinc-900">
                    {selectedOrder.deliveryAddress?.name || "Walk-in Client"}
                  </p>
                  <p className="text-zinc-650">
                    Phone:{" "}
                    {selectedOrder.phone ||
                      selectedOrder.deliveryAddress?.phone ||
                      "N/A"}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-2 text-[10px]">
                    Ship To / Delivery Address:
                  </h4>
                  <p className="font-semibold text-zinc-900">
                    {selectedOrder.deliveryAddress?.name}
                  </p>
                  <address className="not-italic text-zinc-650 space-y-0.5">
                    {selectedOrder.deliveryAddress?.line1}
                    <br />
                    {selectedOrder.deliveryAddress?.landmark && (
                      <>
                        Landmark: {selectedOrder.deliveryAddress.landmark}
                        <br />
                      </>
                    )}
                    {selectedOrder.deliveryAddress?.city},{" "}
                    {selectedOrder.deliveryAddress?.state} -{" "}
                    <span className="font-bold">
                      {selectedOrder.deliveryAddress?.pincode}
                    </span>
                  </address>
                </div>
              </div>

              {/* Products Table */}
              <div>
                <h4 className="font-bold text-zinc-900 uppercase tracking-wider mb-2 text-[10px]">
                  Order Summary
                </h4>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 text-[10px] font-bold text-zinc-800 uppercase p-2">
                      <th className="py-2">Product Name</th>
                      <th className="py-2 text-center">Volume / Size</th>
                      <th className="py-2 text-right">Price</th>
                      <th className="py-2 text-center">Qty</th>
                      <th className="py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-150">
                    {(selectedOrder.products || []).map((item, idx) => (
                      <tr key={idx} className="text-zinc-700">
                        <td className="py-2.5 font-medium text-zinc-900">
                          {item.name}
                        </td>
                        <td className="py-2.5 text-center">
                          {item.size ? `${item.size}L` : "1L"}
                        </td>
                        <td className="py-2.5 text-right">
                          ₹{item.price?.toLocaleString("en-IN") || "0"}
                        </td>
                        <td className="py-2.5 text-center">{item.quantity}</td>
                        <td className="py-2.5 text-right font-semibold text-zinc-900">
                          ₹
                          {(
                            (item.price || 0) * (item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pricing Breakdowns */}
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="text-zinc-500 text-[10px] flex flex-col justify-end">
                  <p className="font-semibold text-zinc-800">
                    Terms & Conditions:
                  </p>
                  <p>1. Goods once sold cannot be taken back or exchanged.</p>
                  <p>
                    2. Complete shade accuracy depends on the application
                    surface and lighting.
                  </p>
                  <p className="mt-2 font-serif text-[11px] text-zinc-900 italic font-bold">
                    Thank you for letting us color your beautiful spaces!
                  </p>
                </div>
                <div className="space-y-1.5 border-t border-zinc-150 pt-3 text-right">
                  <div className="flex justify-between text-zinc-650">
                    <span>Subtotal:</span>
                    <span>
                      ₹{selectedOrder.subtotal?.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-650">
                    <span>GST (Integrated 18%):</span>
                    <span>
                      ₹
                      {Math.round(selectedOrder.subtotal * 0.18).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-650">
                    <span>Express Delivery Charge:</span>
                    <span>
                      ₹{selectedOrder.deliveryCharge?.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-900 font-bold text-sm border-t-2 border-zinc-900 pt-2">
                    <span>Grand Total:</span>
                    <span className="text-zinc-950 font-serif">
                      ₹{selectedOrder.total?.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Signatures */}
              <div className="flex justify-between items-end pt-12 text-[10px]">
                <div>
                  <div className="w-32 border-b border-zinc-400"></div>
                  <p className="text-zinc-500 mt-1">Checked By</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-zinc-900">
                    For Rainbow Paint And Hardwares
                  </p>
                  <div className="h-10"></div>
                  <div className="w-48 border-b border-zinc-400 ml-auto"></div>
                  <p className="text-zinc-500 mt-1">Authorized Signatory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
