import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  ShoppingCart,
  Package, 
  Ticket,
  LogOut,
  Menu,
  X,
  Store,
  Bell,
  ShieldUser,
  BarChart,
  Settings,
  Activity
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, where, doc, getDoc } from 'firebase/firestore';
import StatsAdmin from '../components/admin/StatsAdmin';
import OrdersAdmin from '../components/admin/OrdersAdmin';
import UsersAdmin from '../components/admin/UsersAdmin';
import ProductsAdmin from '../components/admin/ProductsAdmin';
import CouponsAdmin from '../components/admin/CouponsAdmin';
import StaffAdmin from '../components/admin/StaffAdmin';
import AnalyticsAdmin from '../components/admin/AnalyticsAdmin';
import LeadManagementPanel from '../components/admin/LeadManagementPanel';
import StoreSettingsAdmin from '../components/admin/StoreSettingsAdmin';
import OperationsAdmin from '../components/admin/OperationsAdmin';
import AbandonedCartsAdmin from '../components/admin/AbandonedCartsAdmin';
import ContentAdmin from '../components/admin/ContentAdmin';

export default function AdminDashboard() {
  const { user, role, loading } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'orders' | 'leads' | 'users' | 'products' | 'coupons' | 'staff' | 'settings' | 'operations' | 'abandoned_carts' | 'content'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [allowedTabs, setAllowedTabs] = useState<string[]>([]);

  useEffect(() => {
    if (!user || !role) return;
    
    // Fetch pending orders
    const q = query(collection(db, 'orders'), where('status', '==', 'PROCESSING'));
    const unsubOrders = onSnapshot(q, (snapshot) => {
      setPendingOrdersCount(snapshot.size);
    });

    // Fetch role configuration
    const unsubRoles = onSnapshot(doc(db, 'system', 'rolesConfig'), (docSnapshot) => {
      if (role === 'owner' || role === 'admin') {
        const fullAccess = ['overview', 'analytics', 'orders', 'abandoned_carts', 'content', 'leads', 'users', 'products', 'coupons', 'staff', 'settings', 'operations'];
        setAllowedTabs(fullAccess);
        if (!fullAccess.includes(activeTab)) setActiveTab('overview');
      } else {
        if (docSnapshot.exists()) {
          const config = docSnapshot.data();
          const userAccess = config[role] || [];
          setAllowedTabs(userAccess);
          
          if (!userAccess.includes(activeTab) && userAccess.length > 0) {
            setActiveTab(userAccess[0] as any);
          }
        } else {
           // Default fallback if no config
           setAllowedTabs(['overview']);
           setActiveTab('overview');
        }
      }
    });

    return () => {
      unsubOrders();
      unsubRoles();
    };
  }, [user, role, activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-zinc-50">
        <div className="w-12 h-12 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 animate-spin"></div>
      </div>
    );
  }

  // Redirect non-staff roles
  if (!user || role === 'customer' || !role) {
    return <Navigate to="/" replace />;
  }

  const handleSignOut = () => {
    signOut(auth);
  };

  const allNavItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount },
    { id: 'abandoned_carts', label: 'Abandoned Carts', icon: ShoppingCart },
    { id: 'content', label: 'Content Management', icon: LayoutDashboard },
    { id: 'leads', label: 'Lead Management', icon: Users },
    { id: 'users', label: 'Customers', icon: ShieldUser },
    { id: 'products', label: 'Inventory', icon: Package },
    { id: 'coupons', label: 'Promotions', icon: Ticket },
    { id: 'staff', label: 'Staff Configuration', icon: ShieldUser },
    { id: 'settings', label: 'Store Settings', icon: Settings },
    { id: 'operations', label: 'Store Operations', icon: Activity }
  ];

  const navItems = allNavItems.filter(item => allowedTabs.includes(item.id));

  const renderContent = () => {
    if (!allowedTabs.includes(activeTab)) {
       return <div className="p-8 text-center text-zinc-500">You do not have permission to view this section.</div>;
    }
    switch (activeTab) {
      case 'overview': return <StatsAdmin />;
      case 'analytics': return <AnalyticsAdmin />;
      case 'orders': return <OrdersAdmin />;
      case 'abandoned_carts': return <AbandonedCartsAdmin />;
      case 'content': return <ContentAdmin />;
      case 'leads': return <LeadManagementPanel />;
      case 'users': return <UsersAdmin />;
      case 'products': return <ProductsAdmin />;
      case 'coupons': return <CouponsAdmin />;
      case 'staff': return <StaffAdmin />;
      case 'settings': return <StoreSettingsAdmin />;
      case 'operations': return <OperationsAdmin />;
      default: return <StatsAdmin />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row pt-[90px] md:pt-[98px]">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-zinc-200 px-4 py-3 flex items-center justify-between z-20 fixed top-[118px] left-0 right-0">
        <div className="flex items-center gap-2 font-display font-semibold text-zinc-900">
          <Store className="w-5 h-5 text-emerald-600" />
          Admin Portal
        </div>
        <div className="flex items-center gap-3">
          {pendingOrdersCount > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[10px] sm:text-xs font-bold animate-pulse" onClick={() => setActiveTab('orders')}>
              <Bell className="w-3.5 h-3.5" /> {pendingOrdersCount} New Action Required
            </div>
          )}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-zinc-600 focus:outline-none">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-[171px] md:top-[118px] left-0 h-[calc(100vh-171px)] md:h-[calc(100vh-118px)] 
        w-64 bg-white border-r border-zinc-200 flex flex-col transition-transform duration-300 z-10
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="hidden md:flex p-6 border-b border-zinc-100 items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 ml-0.5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-zinc-900 leading-none">Admin Portal</h1>
              <p className="text-xs text-zinc-500 mt-1">Store Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-5 px-4 space-y-1">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3 px-2">Menu</p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-medium text-sm
                ${activeTab === item.id 
                  ? 'bg-zinc-900 text-white shadow-md shadow-zinc-900/10' 
                  : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-zinc-300' : 'text-zinc-400'}`} />
                {item.label}
              </div>
              {item.badge ? (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center min-w-[20px]">
                  {item.badge}
                </span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-100">
          <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-colors font-medium text-sm mb-1">
            <Store className="w-4 h-4" />
            View Store
          </Link>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto mt-[60px] md:mt-0 h-[calc(100vh-169px)] md:h-[calc(100vh-136px)] bg-zinc-50/50 relative flex flex-col">
        {pendingOrdersCount > 0 && (
          <div className="hidden md:flex bg-amber-100 border-b border-amber-200 px-6 py-3 items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3 text-amber-800 font-medium">
              <Bell className="w-5 h-5 animate-pulse" />
              You have {pendingOrdersCount} new {pendingOrdersCount === 1 ? 'order' : 'orders'} pending processing!
            </div>
            <button 
              onClick={() => setActiveTab('orders')} 
              className="text-xs bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-full font-bold transition-colors"
            >
              View Orders
            </button>
          </div>
        )}
        <div className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full animate-fade-in pb-10">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-0 md:hidden top-[125px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
