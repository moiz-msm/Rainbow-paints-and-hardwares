/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import OfferPopup from './components/OfferPopup';
import AuthProvider from './components/AuthProvider';
import AuthModal from './components/AuthModal';
import ProductAssistant from './components/ProductAssistant';
import WishlistDrawer from './components/WishlistDrawer';
import WishlistToastContainer from './components/WishlistToastContainer';
import AdminNotificationToast from './components/AdminNotificationToast';
import AddedToCartBanner from './components/AddedToCartBanner';

import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import VisualizerPage from './pages/VisualizerPage';
import CalculatorPage from './pages/CalculatorPage';
import FaqPage from './pages/FaqPage';
import AboutPage from './pages/AboutPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyOrdersPage from './pages/MyOrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import AdminDashboard from './pages/AdminDashboard';
import AccountSettingsPage from './pages/AccountSettingsPage';
import LocationSEOPage from './pages/LocationSEOPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-royale-bg text-ivory selection:bg-gold/50 selection:text-white flex flex-col">
          <Header />
          <main className="flex-grow pt-[38px] sm:pt-[44px]">
            <Routes>
              {/* Core Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faqs" element={<FaqPage />} />
              
              {/* SEO E-Commerce Routes */}
              <Route path="/buy-paint-online" element={<ProductsPage />} />
              <Route path="/c/:categorySlug" element={<ProductsPage />} />
              <Route path="/brands/:brandSlug" element={<ProductsPage />} />
              <Route path="/p/:productSlug" element={<ProductDetailPage />} />
              
              {/* Local SEO Routs */}
              <Route path="/store/:locationSlug" element={<LocationSEOPage />} />

              {/* Tools */}
              <Route path="/visualizer" element={<VisualizerPage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              
              {/* E-Commerce Flow */}
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              
              {/* Account / Dashboard */}
              <Route path="/settings" element={<AccountSettingsPage />} />
              <Route path="/my-orders" element={<MyOrdersPage />} />
              <Route path="/order/:id" element={<OrderDetailsPage />} />
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Policies */}
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/refund-policy" element={<RefundPolicyPage />} />
              <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <OfferPopup />
        <CartDrawer />
        <WishlistDrawer />
        <WishlistToastContainer />
        <AdminNotificationToast />
        <AddedToCartBanner />
        <AuthModal />
        <ProductAssistant />
      </Router>
    </AuthProvider>
  );
}
