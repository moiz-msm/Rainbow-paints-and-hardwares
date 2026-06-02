import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Trash2, ShoppingCart, Plus, Palette, Layers, Check, Copy, Info, Share2 } from 'lucide-react';
import { useWishlistStore, WishlistProductItem, WishlistShadeItem, WishlistCombinationItem } from '../store/useWishlistStore';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';

// Standard base shades for quick combination building
const COMBINATION_PALETTE_COLORS = [
  { name: "Royale White", hex: "#F8F6F0", shadeCode: "AP-01", family: "White" },
  { name: "Classic Ivory", hex: "#FFFDD0", shadeCode: "AP-02", family: "Yellow" },
  { name: "Velvet Plum", hex: "#4B2840", shadeCode: "AP-15", family: "Purple" },
  { name: "Teal Royale", hex: "#124E54", shadeCode: "AP-24", family: "Blue-Green" },
  { name: "Warm Terracotta", hex: "#D36E59", shadeCode: "AP-11", family: "Orange" },
  { name: "Mint Frost", hex: "#E3ECE9", shadeCode: "AP-04", family: "Green" },
  { name: "Sunset Gold", hex: "#F3A953", shadeCode: "AP-48", family: "Yellow" },
  { name: "Soft Sage", hex: "#9CAF88", shadeCode: "AP-32", family: "Green" },
  { name: "Slate Mist", hex: "#7E8F95", shadeCode: "AP-67", family: "Grey" },
  { name: "Deep Navy", hex: "#1D2D44", shadeCode: "AP-89", family: "Blue" },
];

export default function WishlistDrawer() {
  const { items, isOpen, toggleWishlist, removeItem, addItem } = useWishlistStore();
  const { user, openAuthModal } = useAuthStore();
  const { addItem: addToCart } = useCartStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'products' | 'shades' | 'combinations'>('products');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // States for custom combination creator
  const [isCreatingCombo, setIsCreatingCombo] = useState(false);
  const [comboName, setComboName] = useState('');
  const [selectedComboColors, setSelectedComboColors] = useState<typeof COMBINATION_PALETTE_COLORS>([]);

  // Split wishlisted items
  const productItems = items.filter(item => item.type === 'product') as WishlistProductItem[];
  const shadeItems = items.filter(item => item.type === 'shade') as WishlistShadeItem[];
  const combinationItems = items.filter(item => item.type === 'combination') as WishlistCombinationItem[];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleAddToCart = (product: WishlistProductItem) => {
    const selectedSize = product.size || 1;
    const rawPrice = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 500;
    
    let discountFactor = 1;
    if (selectedSize === 4) discountFactor = 0.96; // 4% bulk discount
    if (selectedSize === 10) discountFactor = 0.92; // 8% bulk discount
    if (selectedSize === 20) discountFactor = 0.88; // 12% bulk discount
    const totalPrice = Math.round(rawPrice * selectedSize * discountFactor);

    addToCart({
      id: `${product.productId}-${selectedSize}${product.shadeCode ? `-${product.shadeCode}` : '-white'}`,
      productId: product.productId,
      name: `${product.name} (${product.shadeName || 'White'})`,
      brand: product.brand,
      image: product.image,
      size: selectedSize,
      quantity: 1,
      unitPrice: totalPrice / selectedSize,
      shade: product.shadeCode ? {
        name: product.shadeName || 'White',
        code: product.shadeCode,
        hex: product.shadeHex || '#FFFFFF'
      } : undefined
    });
  };

  // Add a shade to candidate list of active combination builder
  const toggleColorInComboBuilder = (color: typeof COMBINATION_PALETTE_COLORS[0]) => {
    if (selectedComboColors.some(c => c.hex === color.hex)) {
      setSelectedComboColors(prev => prev.filter(c => c.hex !== color.hex));
    } else {
      if (selectedComboColors.length >= 4) {
        alert("A color combination can have at most 4 colors.");
        return;
      }
      setSelectedComboColors(prev => [...prev, color]);
    }
  };

  const handleSaveCombination = () => {
    if (!comboName.trim()) {
      alert("Please give your color combination a name.");
      return;
    }
    if (selectedComboColors.length < 2) {
      alert("Please select at least 2 colors to form a combination.");
      return;
    }

    addItem({
      type: 'combination',
      name: comboName,
      shades: selectedComboColors.map(c => ({
        shadeCode: c.shadeCode,
        name: c.name,
        hex: c.hex,
        family: c.family
      }))
    }, user?.uid || null);

    // Reset combination builder fields
    setComboName('');
    setSelectedComboColors([]);
    setIsCreatingCombo(false);
    setActiveTab('combinations');
  };

  return (
    <AnimatePresence>
      {isOpen && user && (
        <>
          {/* Opaque Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleWishlist}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[95]"
          />

          {/* Drawer Sidebar container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-[#0c101d] text-ivory z-[96] border-l border-zinc-800 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800 bg-[#080B14]">
              <div className="flex items-center gap-2.5">
                <Heart className="w-5 h-5 text-gold fill-gold/20" />
                <h2 className="text-base font-display font-bold text-white uppercase tracking-wider">My Wishlist & Studio</h2>
              </div>
              <button
                onClick={toggleWishlist}
                className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                aria-label="Close Wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Auth status announcement banner */}
            <div className="bg-[#121625]/80 border-b border-zinc-800/80 px-4 py-3 sm:px-6">
              {user ? (
                <div className="flex items-center gap-2 text-xs text-zinc-400 select-none">
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span>Logged in as <strong className="text-gold font-sans font-semibold">{user.displayName || user.email}</strong>. Data synchronized securely.</span>
                </div>
              ) : (
                <div className="flex flex-col gap-2 bg-gradient-to-br from-gold/5 via-gold/10 to-transparent border border-gold/20 rounded-xl p-3">
                  <div className="flex items-start gap-2.5 text-[11px] text-zinc-300 leading-relaxed font-sans">
                    <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>
                      <strong>Browsing as Guest:</strong> Your saved products and paint shades are saved locally. Sign in to back up and access them across all your devices securely!
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      toggleWishlist();
                      openAuthModal();
                    }}
                    className="w-full text-center py-1.5 bg-gold text-zinc-950 rounded-lg text-[10px] font-display font-bold tracking-wider uppercase hover:bg-gold/90 transition-colors cursor-pointer"
                  >
                    ✦ Sign In to Synchronize ✦
                  </button>
                </div>
              )}
            </div>

            {/* Selection Tabs */}
            <div className="flex border-b border-zinc-800 bg-[#0a0d16] select-none text-xs font-semibold">
              <button 
                onClick={() => { setActiveTab('products'); setIsCreatingCombo(false); }}
                className={`flex-1 py-3 text-center border-b-2 transition-all ${activeTab === 'products' ? 'text-gold border-gold' : 'text-zinc-400 border-transparent hover:text-zinc-200'}`}
              >
                Products ({productItems.length})
              </button>
              <button 
                onClick={() => { setActiveTab('shades'); setIsCreatingCombo(false); }}
                className={`flex-1 py-3 text-center border-b-2 transition-all ${activeTab === 'shades' ? 'text-gold border-gold' : 'text-zinc-400 border-transparent hover:text-zinc-200'}`}
              >
                Shades ({shadeItems.length})
              </button>
              <button 
                onClick={() => { setActiveTab('combinations'); }}
                className={`flex-1 py-3 text-center border-b-2 transition-all ${activeTab === 'combinations' ? 'text-gold border-gold' : 'text-zinc-400 border-transparent hover:text-zinc-200'}`}
              >
                Palettes ({combinationItems.length})
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              
              {/* CREATING CUSTOM COLOR COMBINATION PANELS */}
              {isCreatingCombo && activeTab === 'combinations' ? (
                <div className="bg-[#121625] border border-zinc-800 rounded-2xl p-4 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <h3 className="font-display font-bold text-xs uppercase text-gold flex items-center gap-2">
                      <Palette className="w-4 h-4" /> Create Custom Palette
                    </h3>
                    <button 
                      onClick={() => setIsCreatingCombo(false)}
                      className="text-zinc-400 hover:text-white text-xs underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Combination Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] uppercase tracking-wider text-zinc-400 block">Palette Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Master Bedroom Accent, Living Room Warm"
                      value={comboName}
                      onChange={(e) => setComboName(e.target.value)}
                      className="w-full bg-[#080B14] border border-zinc-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold placeholder:text-zinc-600"
                    />
                  </div>

                  {/* Active Selection swatches */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-zinc-400 flex justify-between items-center">
                      <span>Palette Colors ({selectedComboColors.length}/4)</span>
                      {selectedComboColors.length > 0 && (
                        <button 
                          onClick={() => setSelectedComboColors([])} 
                          className="text-[10px] text-red-400 hover:text-red-300"
                        >
                          Clear
                        </button>
                      )}
                    </label>
                    
                    {selectedComboColors.length === 0 ? (
                      <div className="h-12 border border-dashed border-zinc-800 rounded-xl flex items-center justify-center bg-black/10">
                        <span className="text-[10px] text-zinc-500 italic">Select colors below to form a palette</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {selectedComboColors.map((color, index) => (
                          <div key={index} className="bg-black/20 p-1.5 rounded-xl border border-zinc-800 text-center relative group">
                            <div 
                              className="w-full h-8 rounded-lg mb-1 border border-black/30"
                              style={{ backgroundColor: color.hex }}
                            />
                            <p className="text-[9px] text-[#ffffff] font-medium truncate leading-tight">{color.name}</p>
                            <button
                              onClick={() => toggleColorInComboBuilder(color)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 scale-90"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Standard Swatches pool & wishlisted shades available for selection */}
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-wider text-zinc-400 block">Select Colors Below</label>
                    
                    {/* Combine wishlisted shades first then fallback list */}
                    <div className="space-y-2 bg-black/15 p-2 rounded-xl border border-zinc-800/60 max-h-48 overflow-y-auto">
                      {shadeItems.length > 0 && (
                        <div>
                          <p className="text-[9px] text-gold uppercase tracking-widest font-bold mb-1.5">From Your Wishlisted Shades</p>
                          <div className="grid grid-cols-4 gap-1.5 mb-3">
                            {shadeItems.map((shade) => {
                              const itemColor = { name: shade.name, hex: shade.hex, shadeCode: shade.shadeCode, family: shade.family };
                              const isSelected = selectedComboColors.some(c => c.hex === shade.hex);
                              return (
                                <button
                                  key={shade.id}
                                  onClick={() => toggleColorInComboBuilder(itemColor)}
                                  className={`p-1 border rounded-lg transition-all text-center flex flex-col items-center justify-center cursor-pointer ${isSelected ? 'border-gold bg-gold/10' : 'border-zinc-800 hover:border-zinc-500 bg-[#080B14]'}`}
                                >
                                  <div className="w-5 h-5 rounded-md border border-black/20 shadow-sm" style={{ backgroundColor: shade.hex }} />
                                  <span className="text-[8px] text-zinc-300 truncate w-full font-medium mt-1 leading-none">{shade.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-1.5">Standard Premium Shades</p>
                      <div className="grid grid-cols-4 gap-1.5">
                        {COMBINATION_PALETTE_COLORS.map((color) => {
                          const isSelected = selectedComboColors.some(c => c.hex === color.hex);
                          return (
                            <button
                              key={color.shadeCode}
                              onClick={() => toggleColorInComboBuilder(color)}
                              className={`p-1.5 border rounded-lg transition-all text-center flex flex-col items-center justify-center cursor-pointer ${isSelected ? 'border-gold bg-gold/10' : 'border-zinc-800 hover:border-zinc-500 bg-[#080b15]'}`}
                            >
                              <div className="w-5 h-5 rounded-md border border-black/20 shadow-sm" style={{ backgroundColor: color.hex }} />
                              <span className="text-[8px] text-zinc-300 truncate w-full font-medium mt-1 leading-none">{color.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSaveCombination}
                    disabled={selectedComboColors.length < 2 || !comboName.trim()}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-gold disabled:bg-zinc-800 disabled:text-zinc-500 text-black text-xs font-display font-medium uppercase tracking-wider rounded-xl hover:bg-gold/90 transition-all cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" /> Save Combination Palette
                  </button>
                </div>
              ) : null}

              {/* PRODUCTS TAB */}
              {activeTab === 'products' && (
                <div className="space-y-3">
                  {productItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <Heart className="w-6 h-6 text-zinc-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-zinc-400">No products saved are in your wishlist</p>
                        <p className="text-xs text-zinc-600">Save your favorite paints to compare and buy easily!</p>
                      </div>
                      <button 
                        onClick={() => { toggleWishlist(); navigate('/buy-paint-online'); }}
                        className="px-5 py-2 bg-zinc-900 border border-zinc-800 text-gold rounded-full text-xs hover:bg-zinc-800 transition-colors mt-2"
                      >
                        Browse Products
                      </button>
                    </div>
                  ) : (
                    productItems.map((item) => (
                      <div key={item.id} className="bg-[#121625] border border-zinc-800/80 rounded-2xl p-3.5 flex gap-4 items-start relative group">
                        <div className="w-16 h-16 rounded-xl bg-zinc-900/60 overflow-hidden flex-shrink-0 border border-zinc-800">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-400">No Image</div>
                        )}
                        </div>
                        <div className="flex-1 min-w-0 pr-6">
                          <span className="text-[9px] uppercase tracking-wider text-gold bg-gold/5 px-2 py-0.5 rounded border border-gold/15 mb-1.5 inline-block">
                            {item.brand}
                          </span>
                          <h4 className="text-xs font-bold text-white leading-snug w-full truncate">{item.name}</h4>
                          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">{item.price}</p>
                          
                          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 my-1.5">
                            <span className="text-[10px] text-zinc-400 font-sans font-medium">
                              Size: <strong className="text-zinc-200">{item.size || 1}L</strong>
                            </span>
                            {item.shadeHex && (
                              <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                                <div className="w-2 h-2 rounded-full border border-zinc-700" style={{ backgroundColor: item.shadeHex }} />
                                <span className="text-[8.5px] text-zinc-300 font-mono font-bold leading-none">{item.shadeName || 'White'} {item.shadeCode ? `(${item.shadeCode})` : ''}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="px-3 py-1.5 bg-gold/10 border border-gold/20 scroll-py-1 hover:bg-gold hover:text-black rounded-lg text-[10px] uppercase font-display font-medium tracking-wider text-gold flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <ShoppingCart className="w-3 h-3" /> Add {item.size || 1}L to Cart
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, user?.uid || null)}
                          title="Remove product" aria-label="Remove product"
                          className="absolute right-3 top-3.5 p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 aria-hidden="true" className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* SHADES COLOR TAB */}
              {activeTab === 'shades' && (
                <div className="space-y-3">
                  {shadeItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                        <Palette className="w-6 h-6 text-zinc-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-zinc-400">No color shades saved to your wishlist</p>
                        <p className="text-xs text-zinc-600">Explore shades in our visualizer studio and tap the heart icon!</p>
                      </div>
                      <button 
                        onClick={() => { toggleWishlist(); navigate('/visualizer'); }}
                        className="px-5 py-2 bg-zinc-900 border border-zinc-800 text-gold rounded-full text-xs hover:bg-zinc-800 transition-colors mt-2"
                      >
                        Explore Color Studio
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2.5">
                      {shadeItems.map((item) => (
                        <div key={item.id} className="bg-[#121625] border border-zinc-800/80 rounded-2xl p-3 flex items-center justify-between gap-3 relative group">
                          <div className="flex items-center gap-3 min-w-0">
                            {/* Color Block */}
                            <div 
                              className="w-11 h-11 rounded-xl shadow-inner border border-black/30 shrink-0"
                              style={{ backgroundColor: item.hex }}
                            />
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white truncate leading-tight">{item.name}</h4>
                              <p className="text-[10px] text-zinc-400 mt-0.5 family-mono font-mono shrink-0">
                                {item.shadeCode} • {item.hex}
                              </p>
                              <span className="text-[9px] text-gold uppercase tracking-wider px-1.5 py-0.2 bg-gold/5 rounded border border-gold/15 mt-1 inline-block select-none font-sans font-medium">
                                {item.family}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0 mr-8">
                            <button
                              onClick={() => handleCopy(item.hex, item.id)}
                              title="Copy Hex Code" aria-label="Copy Hex Code"
                              className="p-1.5 text-zinc-400 hover:text-white bg-black/20 hover:bg-black/40 rounded-lg transition-colors cursor-pointer"
                            >
                              {copiedId === item.id ? <Check aria-hidden="true" className="w-3.5 h-3.5 text-green-500" /> : <Copy aria-hidden="true" className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => {
                                toggleWishlist();
                                navigate(`/visualizer?hex=${encodeURIComponent(item.hex)}`);
                              }}
                              className="px-2.5 py-1 text-[10px] font-sans font-semibold text-gold border border-gold/20 bg-gold/5 hover:bg-gold hover:text-black rounded-lg transition-colors cursor-pointer"
                              title="View in Visualizer"
                            >
                              Apply 🎨
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id, user?.uid || null)}
                            title="Remove shade" aria-label="Remove shade"
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 aria-hidden="true" className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* COMBINATIONS PALETTES TAB */}
              {activeTab === 'combinations' && (
                <div className="space-y-4">
                  
                  {/* Create New Combo CTA */}
                  {!isCreatingCombo && (
                    <button
                      onClick={() => setIsCreatingCombo(true)}
                      className="w-full py-3 bg-[#121625] hover:bg-[#161a2e] border border-dashed border-gold/35 rounded-2xl flex items-center justify-center gap-2 text-xs font-display font-bold text-gold uppercase tracking-wider transition-all hover:scale-[1.01] cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Create Custom Combination
                    </button>
                  )}

                  {combinationItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                      {!isCreatingCombo && (
                        <>
                          <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                            <Layers className="w-6 h-6 text-zinc-500" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-zinc-400">No color combinations saved</p>
                            <p className="text-xs text-zinc-600">Save matched palettes with custom names or create them above!</p>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    combinationItems.map((item) => (
                      <div key={item.id} className="bg-[#121625] border border-zinc-800/80 rounded-2xl p-4 space-y-3 relative group">
                        <div className="pr-8">
                          <h4 className="text-xs font-bold text-white tracking-wide">{item.name}</h4>
                          <span className="text-[9px] text-zinc-500">
                            Saved on {new Date(item.addedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Palette Color Bars */}
                        <div className="flex rounded-xl overflow-hidden shadow-md h-9 border border-black/30">
                          {item.shades.map((shade, idx) => (
                            <div
                              key={idx}
                              className="flex-1 h-full relative cursor-pointer group/swatch"
                              style={{ backgroundColor: shade.hex }}
                              onClick={() => handleCopy(shade.hex, `${item.id}-${idx}`)}
                              title={`${shade.name} (${shade.hex}) - Click to copy`}
                            >
                              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                                <span className="opacity-0 group-hover/swatch:opacity-100 transition-opacity text-[8px] text-white bg-black/80 px-1 py-0.5 rounded leading-none text-center">
                                  {copiedId === `${item.id}-${idx}` ? 'Copied' : shade.hex}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Labels row list */}
                        <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5">
                          {item.shades.map((shade, idx) => (
                            <div key={idx} className="bg-[#080B14] p-1 text-center rounded-lg border border-zinc-800/40">
                              <span className="text-[9px] text-zinc-200 block truncate font-medium">{shade.name}</span>
                              <span className="text-[8px] text-zinc-500 select-all family-mono shrink-0">{shade.hex}</span>
                            </div>
                          ))}
                        </div>

                        {/* Apply Palette Link & Share */}
                        <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/60">
                          <button
                            onClick={() => {
                              toggleWishlist();
                              // Navigate with first color hex or a query variable of multiple colors
                              const hexQuery = item.shades.map(s => encodeURIComponent(s.hex)).join(',');
                              navigate(`/visualizer?palette=${hexQuery}`);
                            }}
                            className="flex-1 px-3 py-1.5 bg-gold/10 border border-gold/15 text-gold text-[10px] uppercase font-display font-medium rounded-lg hover:bg-gold hover:text-black transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                          >
                            <Palette className="w-3 h-3" /> Load in room visualizer
                          </button>

                          <button
                            onClick={() => {
                              const hexQuery = item.shades.map(s => encodeURIComponent(s.hex)).join(',');
                              const shareUrl = `${window.location.origin}/visualizer?palette=${hexQuery}`;
                              navigator.clipboard.writeText(shareUrl);
                              handleCopy(shareUrl, `${item.id}-share`);
                            }}
                            title="Share combination link" aria-label="Share combination link"
                            className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 rounded-lg text-xs flex items-center justify-center transition-all cursor-pointer shadow-sm relative"
                          >
                            {copiedId === `${item.id}-share` ? (
                              <Check aria-hidden="true" className="w-3.5 h-3.5 text-green-500 animate-pulse" />
                            ) : (
                              <Share2 aria-hidden="true" className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, user?.uid || null)}
                          title="Delete Palette" aria-label="Delete Palette"
                          className="absolute right-4 top-4 p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer shadow-sm"
                        >
                          <Trash2 aria-hidden="true" className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
