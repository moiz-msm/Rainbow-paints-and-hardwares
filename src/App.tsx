/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
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
import { lazyWithRetry as lazy } from './utils/lazyWithRetry';

// Lazy load heavy pages
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const VisualizerPage = lazy(() => import('./pages/VisualizerPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));
const MyOrdersPage = lazy(() => import('./pages/MyOrdersPage'));
const OrderDetailsPage = lazy(() => import('./pages/OrderDetailsPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const RefundPolicyPage = lazy(() => import('./pages/RefundPolicyPage'));
const ShippingPolicyPage = lazy(() => import('./pages/ShippingPolicyPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AccountSettingsPage = lazy(() => import('./pages/AccountSettingsPage'));
const LocationSEOPage = lazy(() => import('./pages/LocationSEOPage'));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage'));

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-royale-bg text-ivory selection:bg-gold/50 selection:text-white flex flex-col">
          <Header />
          <main className="flex-grow pt-[38px] sm:pt-[44px]">
            <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div></div>}>
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
                <Route path="/track-order" element={<TrackOrderPage />} />
                
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
            </Suspense>
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
        <SpeedInsights />
      </Router>
    </AuthProvider>
    </HelmetProvider>
  );
}
