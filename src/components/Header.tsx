import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, User, Grid, LogOut, Heart, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { auth } from '../lib/firebase';
import ProductSearchInput from './ProductSearchInput';
import AnnouncementBanner from './AnnouncementBanner';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const { items, toggleCart } = useCartStore();
  const { user, role, openAuthModal } = useAuthStore();
  const { items: wishlistItems, toggleWishlist, addToast } = useWishlistStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistItems = wishlistItems.length;

  const isProductsPage = location.pathname === '/buy-paint-online';
  const showSearch = location.pathname.startsWith('/buy-paint-online') || 
                     location.pathname.startsWith('/c/') ||
                     location.pathname.startsWith('/brands/') ||
                     location.pathname.startsWith('/p/') ||
                     location.pathname === '/buy-paint-online';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isProfileMenuOpen && !target.closest('.profile-menu-container')) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  const handleProfileClick = () => {
    if (!user) {
      openAuthModal();
    } else {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    }
  };

  const navLinks = [
    { name: 'Shop', href: '/buy-paint-online' },
    { name: 'Colors & Visualizer', href: '/visualizer' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Compare', href: '/compare-paints' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/#faqs' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <div className="fixed top-0 inset-x-0 z-[80] flex flex-col w-full">
      <AnnouncementBanner />
      <header className={`w-full transition-all duration-300 transform-gpu will-change-transform py-2 sm:py-3 ${
        isMobileMenuOpen 
          ? 'bg-royale-bg border-b border-zinc-200' 
          : (isScrolled || location.pathname !== '/') 
            ? 'glass-header border-b border-royale-accent' 
            : 'bg-transparent'
      }`}>
        <div className="max-w-[1400px] lg:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center w-full">
            
            {/* Logo */}
            <Link to="/" title="Home" aria-label="Home" className="flex items-center gap-2 sm:gap-3 group relative shrink-0">
              <div className="flex items-center justify-center shrink-0 group-hover:opacity-80 transition-opacity duration-300">
                <img 
                  src="/mascot.webp" 
                  alt="Rainbow Paint and Hardwares" 
                  referrerPolicy="no-referrer"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  width="100"
                  height="80"
                  className="w-auto h-12 sm:h-16 lg:h-20 object-contain rounded-lg shrink-0" 
                />
              </div>
              <div className={`flex flex-col shrink-0 ${showSearch ? 'hidden xl:flex' : 'flex'}`}>
                <span className="font-serif font-medium text-[19px] sm:text-xl tracking-[0.1em] sm:tracking-[0.25em] leading-none text-ivory uppercase">RAINBOW</span>
                <span className="text-[6.5px] sm:text-[7px] uppercase tracking-[0.12em] sm:tracking-[0.4em] text-gold font-display font-medium mt-1 whitespace-nowrap">PAINT AND HARDWARES</span>
              </div>
            </Link>

            {/* Desktop Nav - Inline for non-products page */}
            {!isProductsPage && (
              <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1.5 xl:gap-5">
                {navLinks.map((link) => (
                  link.href.startsWith('/') ? (
                    <Link key={link.name} to={link.href} className="text-[8px] xl:text-[9.5px] font-display font-semibold text-gold/80 hover:text-gold transition-colors tracking-[0.05em] xl:tracking-[0.15em] uppercase whitespace-nowrap">
                      {link.name}
                    </Link>
                  ) : (
                    <a key={link.name} href={link.href} className="text-[8px] xl:text-[9.5px] font-display font-semibold text-gold/80 hover:text-gold transition-colors tracking-[0.05em] xl:tracking-[0.15em] uppercase whitespace-nowrap">
                      {link.name}
                    </a>
                  )
                ))}
              </nav>
            )}

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-1.5 shrink-0">
              {showSearch && (
                <div className="w-40 xl:w-72 mr-2">
                  <ProductSearchInput />
                </div>
              )}
              <div className="relative profile-menu-container">
                <button aria-label={user ? user.displayName || 'Profile' : 'Sign In'} title={user ? user.displayName || 'Profile' : 'Sign In'} onClick={handleProfileClick} className={`p-2 transition-colors rounded-xl flex items-center justify-center text-gold hover:bg-black/5`}>
                  {user ? <span className="text-[10px] uppercase font-bold px-1">{user.displayName?.charAt(0) || 'U'}</span> : <User className="w-5 h-5 text-gold" />}
                </button>
                <AnimatePresence>
                  {isProfileMenuOpen && user && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 top-full mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden z-[100]">
                      <div className="px-4 py-3 border-b border-zinc-100">
                        <p className="text-xs font-medium text-zinc-900 truncate">{user.displayName || 'User'}</p>
                        <p className="text-[10px] text-zinc-600 truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-gold/10 text-gold text-[9px] font-bold uppercase rounded">{role || 'Customer'}</span>
                      </div>
                      <div className="p-1">
                        {(role === 'owner' || role === 'admin' || role === 'staff') && (
                          <Link to="/admin" onClick={() => setIsProfileMenuOpen(false)} className="w-full text-left px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 rounded-lg flex items-center gap-2">
                            <Grid className="w-3.5 h-3.5 text-gold" /> Admin Dashboard
                          </Link>
                        )}
                        <Link to="/my-orders" onClick={() => setIsProfileMenuOpen(false)} className="w-full text-left px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 rounded-lg flex items-center gap-2">
                          <ShoppingCart className="w-3.5 h-3.5 text-gold" /> My Orders
                        </Link>
                        <button onClick={() => { setIsProfileMenuOpen(false); toggleWishlist(); }} className="w-full text-left px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 rounded-lg flex items-center gap-2">
                          <Heart className="w-3.5 h-3.5 text-gold" /> My Wishlist
                        </button>
                        <Link to="/settings" onClick={() => setIsProfileMenuOpen(false)} className="w-full text-left px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 rounded-lg flex items-center gap-2">
                          <Settings className="w-3.5 h-3.5 text-gold" /> Account Settings
                        </Link>
                        <button onClick={() => { auth.signOut(); setIsProfileMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 mt-1 border-t border-zinc-100 pt-2">
                          <LogOut className="w-3.5 h-3.5 text-gold" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (!user) {
                    addToast({
                      productName: 'Wishlist & Palette Studio',
                      message: 'Please sign in to save items to your wishlist and palettes.',
                      isError: true,
                    });
                    openAuthModal();
                  } else {
                    toggleWishlist(); 
                  }
                }} 
                className="p-2 text-gold/80 hover:text-gold transition-colors relative hover:bg-black/5 rounded-xl mr-1 select-none cursor-pointer"
                title="Wishlist & Palette Studio"
                aria-label="Wishlist & Palette Studio"
              >
                <Heart className="w-5 h-5 text-gold fill-gold/20" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white ring-2 ring-royale-bg">
                    {totalWishlistItems}
                  </span>
                )}
              </button>
              <motion.button 
                key={`desktop-cart-${totalItems}`}
                onClick={(e) => { e.stopPropagation(); toggleCart(); }} 
                className="p-2 text-gold/80 hover:text-gold transition-colors relative hover:bg-black/5 rounded-xl"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3 }}
                title="View Cart"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5 text-gold" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-royale-bg">
                    {totalItems}
                  </span>
                )}
              </motion.button>
              {isProductsPage && (
                <button 
                  className="p-1.5 sm:p-2 z-[90] relative shrink-0 ml-1"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  title={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                  aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-gold drop-shadow-md" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />}
                </button>
              )}
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 flex-1 justify-end ml-2 min-w-0">
            {showSearch && (
              <div className="flex-1 min-w-[70px]">
                <ProductSearchInput />
              </div>
            )}
            <div className="relative shrink-0 profile-menu-container">
              <button aria-label={user ? user.displayName || 'Profile' : 'Sign In'} title={user ? user.displayName || 'Profile' : 'Sign In'} onClick={handleProfileClick} className={`p-1.5 sm:p-2 transition-colors rounded-xl flex items-center justify-center text-gold hover:bg-black/5`}>
                {user ? <span className="text-[10px] uppercase font-bold px-1">{user.displayName?.charAt(0) || 'U'}</span> : <User className="w-4 h-4 text-gold" />}
              </button>
              <AnimatePresence>
                {isProfileMenuOpen && user && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 top-full mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden z-[100]">
                    <div className="px-4 py-3 border-b border-zinc-100 text-left">
                      <p className="text-xs font-medium text-zinc-900 truncate">{user.displayName || 'User'}</p>
                      <p className="text-[10px] text-zinc-600 truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 bg-gold/10 text-gold text-[9px] font-bold uppercase rounded">{role || 'Customer'}</span>
                    </div>
                    <div className="p-1">
                      {(role === 'owner' || role === 'admin' || role === 'staff') && (
                        <Link to="/admin" onClick={() => setIsProfileMenuOpen(false)} className="w-full text-left px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 rounded-lg flex items-center gap-2">
                          <Grid className="w-3.5 h-3.5 text-gold" /> Admin Dashboard
                        </Link>
                      )}
                      <Link to="/my-orders" onClick={() => setIsProfileMenuOpen(false)} className="w-full text-left px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 rounded-lg flex items-center gap-2">
                        <ShoppingCart className="w-3.5 h-3.5 text-gold" /> My Orders
                      </Link>
                      <Link to="/settings" onClick={() => setIsProfileMenuOpen(false)} className="w-full text-left px-3 py-2 text-xs text-zinc-600 hover:bg-zinc-50 rounded-lg flex items-center gap-2">
                        <Settings className="w-3.5 h-3.5 text-gold" /> Account Settings
                      </Link>
                      <button onClick={() => { auth.signOut(); setIsProfileMenuOpen(false); }} className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 mt-1 border-t border-zinc-100 pt-2">
                        <LogOut className="w-3.5 h-3.5 text-gold" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                if (!user) {
                  addToast({
                    productName: 'Wishlist & Palette Studio',
                    message: 'Please sign in to save items to your wishlist and palettes.',
                    isError: true,
                  });
                  openAuthModal();
                } else {
                  toggleWishlist(); 
                }
              }} 
              className="p-1.5 sm:p-2 text-gold/80 hover:text-gold transition-colors hover:bg-black/5 rounded-xl shrink-0 mr-1 relative select-none"
              title="Wishlist & Palette Studio"
              aria-label="Wishlist & Palette Studio"
            >
              <Heart className="w-4 h-4 text-gold fill-gold/20" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gold text-[8px] font-bold text-white ring-1 ring-royale-bg">
                  {totalWishlistItems}
                </span>
              )}
            </button>
            <motion.button 
              key={`mobile-cart-${totalItems}`}
              onClick={(e) => { e.stopPropagation(); toggleCart(); }} 
              className="p-1.5 sm:p-2 text-gold/80 hover:text-gold transition-colors hover:bg-black/5 rounded-xl shrink-0 relative"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              title="View Cart"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-4 h-4 text-gold" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-1 ring-royale-bg">
                  {totalItems}
                </span>
              )}
            </motion.button>
            <button 
              className="p-1.5 sm:p-2 z-[90] relative shrink-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              title={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-gold drop-shadow-md" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />}
            </button>
          </div>
        </div>


        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            
            {/* Panel */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-auto min-w-[220px] max-h-[85vh] bg-royale-bg z-[70] border-b border-l border-zinc-200 flex flex-col px-4 pb-4 pt-[70px] shadow-2xl overflow-y-auto rounded-bl-3xl"
              onClick={(e) => {
                // If they click anywhere on the background of the menu itself, close it
                if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
              }}
            >
              <nav aria-label="Mobile Navigation" className="flex flex-col gap-1 text-right items-end w-full">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    className="w-full"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    {link.href.startsWith('/') ? (
                      <Link 
                        to={link.href} 
                        className="text-[15px] sm:text-base font-serif font-medium text-gold/80 hover:text-gold hover:bg-black/5 transition-colors block py-2 px-2 border-b border-zinc-200 rounded text-right w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a 
                        href={link.href} 
                        className="text-[15px] sm:text-base font-serif font-medium text-gold/80 hover:text-gold hover:bg-black/5 transition-colors block py-2 px-2 border-b border-zinc-200 rounded text-right w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                ))}
                
                {/* Custom mobile Wishlist menu link */}
                <motion.div
                  className="w-full mt-2 pt-2 border-t border-zinc-800"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (!user) {
                        addToast({
                          productName: 'Wishlist & Palette Studio',
                          message: 'Please sign in to save items to your wishlist and palettes.',
                          isError: true,
                        });
                        openAuthModal();
                      } else {
                        toggleWishlist();
                      }
                    }}
                    className="text-[15px] sm:text-base font-serif font-bold text-gold hover:bg-black/5 transition-colors flex items-center justify-end gap-2 py-2 px-2 rounded text-right w-full cursor-pointer select-none"
                  >
                    My Wishlist & Studio <Heart className="w-4 h-4 fill-gold/20 text-gold" />
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  </div>
  );
}
