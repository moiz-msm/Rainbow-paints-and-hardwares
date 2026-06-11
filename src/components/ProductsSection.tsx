import React, { useState, useEffect, memo, useRef, useMemo } from "react";
import { Heart, Filter, ChevronDown, SortAsc, Plus, Search, X, Minus, Share2, ShoppingCart, ShieldCheck, Coins, Truck, Award, Tags } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockProducts, subCategories, brands } from "../data";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { shadeService, Shade } from "../services/shadeService";
import { useDebounce } from "../hooks/useDebounce";

import { useProductSearchStore } from '../store/useProductSearchStore';
import AsianPaintsPlainFinishesShowroom from "./AsianPaintsPlainFinishesShowroom";
import { useWishlistStore } from "../store/useWishlistStore";
import { exportElementAsImage } from "../lib/exportUtils";
import { useAuthStore } from "../store/useAuthStore";
import DeliveryEstimator from "./DeliveryEstimator";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const SIZES = [1, 4, 10, 20];

export const DEFAULT_WHITES: Record<string, { name: string, code: string, hex: string }> = {
  'Asian Paints': { name: 'White', code: '', hex: '#FFFFFF' },
  'Berger Paints': { name: 'White', code: '', hex: '#FFFFFF' },
  'MRF Paints': { name: 'White', code: '', hex: '#FFFFFF' },
  'MRF Vapocure': { name: 'White', code: '', hex: '#FFFFFF' },
  'default': { name: 'White', code: '', hex: '#FFFFFF' }
};

const ShadeSelector = ({ brand, onSelect, onCancel, currentShade }: { 
  brand: string, 
  onSelect: (shade: Shade) => void,
  onCancel: () => void,
  currentShade?: Shade | null
}) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Shade[]>([]);
  const [loading, setLoading] = useState(false);
  const deferredSearch = useDebounce(search, 300);

  useEffect(() => {
    if (deferredSearch.length < 1) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      const { shades: data } = await shadeService.getShades({
        brand: brand === 'All Brands' ? 'all' : brand,
        search: deferredSearch,
        limit: 8
      });
      setSuggestions(data);
      setLoading(false);
    };

    fetchSuggestions();
  }, [deferredSearch, brand]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute inset-0 bg-royale-bg/95 backdrop-blur-md z-[60] flex flex-col p-4 duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-[10px] font-display font-bold text-gold uppercase tracking-widest">Select Color</h4>
        <button onClick={onCancel} className="p-1 hover:bg-black/10 rounded-full transition-colors">
          <X className="w-3.5 h-3.5 text-ivory/50" />
        </button>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ivory/30" />
        <input 
          autoFocus
          type="text"
          placeholder="Name or shade code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white shadow-sm border border-zinc-200 rounded-lg py-2 pl-8 pr-3 text-[10px] text-ivory focus:border-gold/50 outline-none transition-all placeholder:text-ivory/20"
        />
        {loading && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <div className="w-2.5 h-2.5 border border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 shadow-inner rounded-lg">
        {/* Reset to White Option */}
        {!search && (
          <button
            onClick={() => {
              const def = DEFAULT_WHITES[brand] || DEFAULT_WHITES.default;
              onSelect({
                id: `white-${brand}`,
                name: def.name,
                shadeCode: def.code,
                hex: def.hex,
                brand: brand,
                family: 'whites'
              } as Shade);
            }}
            className="w-full flex items-center gap-3 p-2 rounded-lg bg-white shadow-sm border border-zinc-200 hover:border-black/30 transition-all group"
          >
            <div className="w-8 h-8 rounded border border-black/20 bg-white shrink-0" />
            <div className="text-left">
              <p className="text-[10px] font-medium text-ivory">White</p>
              <p className="text-[8px] text-gold">Readymade Color</p>
            </div>
          </button>
        )}

        {suggestions.map(shade => (
          <button
            key={shade.id}
            onClick={() => onSelect(shade)}
            className="w-full flex items-center gap-3 p-2 rounded-lg bg-white shadow-sm border border-zinc-200 hover:border-gold/30 transition-all group"
          >
            <div className="w-8 h-8 rounded border border-black/20 shrink-0" style={{ backgroundColor: shade.hex }} />
            <div className="text-left">
              <p className="text-[10px] font-medium text-ivory group-hover:text-gold truncate max-w-[120px]">{shade.name}</p>
              <p className="text-[8px] text-gold font-mono">{shade.shadeCode}</p>
            </div>
          </button>
        ))}
        
        {search.length >= 1 && suggestions.length === 0 && !loading && (
          <div className="py-8 text-center flex flex-col items-center gap-2">
            <Search className="w-6 h-6 text-ivory/10" />
            <p className="text-[8px] text-gold uppercase tracking-widest">No matching shades</p>
          </div>
        )}

        {search.length === 0 && (
          <div className="py-4 text-center">
            <p className="text-[7px] text-gold uppercase tracking-[0.2em]">Start typing to search colors</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};


export const InlineShadePicker = ({ brand, onSelect, currentShade }: { 
  brand: string, 
  onSelect: (shade: Shade) => void,
  currentShade?: Shade | null
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Shade[]>([]);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(search, 300);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsSearching(false);
    };
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, []);

  useEffect(() => {
    if (debounced.length < 1) {
      setResults([]);
      return;
    }
    setLoading(true);
    shadeService.getShades({ brand, search: debounced, limit: 5 })
      .then(res => setResults(res.shades))
      .finally(() => setLoading(false));
  }, [debounced, brand]);

  return (
    <div ref={ref} className="relative w-full flex flex-col gap-2 sm:gap-2.5">
      {/* Selected Shade Display */}
      <div className="flex items-center justify-between gap-2 w-full bg-zinc-50/50 p-2 sm:p-2.5 rounded-lg border border-zinc-100 mb-1">
        <span className="text-[10px] sm:text-xs text-zinc-500 font-bold uppercase tracking-wider shrink-0 mt-0.5">
          Shade:
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 min-w-0 flex-1">
          <span className="text-xs sm:text-sm font-bold text-ivory break-words leading-tight">
            {currentShade?.name || 'White'}
          </span>
          {currentShade?.shadeCode && (
            <span className="text-[10px] sm:text-xs text-gold font-bold font-mono shrink-0">
              {currentShade.shadeCode}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div 
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-black/20 shadow-sm"
            style={{ backgroundColor: currentShade?.hex || '#FFFFFF' }}
          />
          {currentShade?.shadeCode && (
            <button
              onClick={() => {
                const def = DEFAULT_WHITES[brand] || DEFAULT_WHITES.default;
                onSelect({
                  id: `default-${brand}-${def.code}`,
                  name: def.name,
                  shadeCode: def.code,
                  hex: def.hex,
                  brand: brand,
                  family: 'whites'
                } as Shade);
              }}
              className="p-1 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              title="Reset to default white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="relative w-full">
        {isSearching ? (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 border border-zinc-300 w-full shadow-inner animate-in fade-in zoom-in-[0.99] duration-300">
             <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
             <input 
               autoFocus
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Name / Code"
               className="bg-transparent border-none outline-none text-xs text-zinc-900 placeholder:text-zinc-500 w-full font-medium"
             />
             {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-gold border-t-transparent rounded-full animate-spin shrink-0" />
             ) : (
               <X className="w-3.5 h-3.5 text-zinc-400 cursor-pointer hover:text-zinc-700 shrink-0" onClick={() => setIsSearching(false)} />
             )}
          </div>
        ) : (
          <button 
            onClick={() => setIsSearching(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-50/80 border border-zinc-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] hover:border-gold/30 hover:bg-zinc-50 transition-all group w-full justify-between cursor-text"
          >
            <div className="flex items-center gap-2 overflow-hidden flex-1 text-left">
              <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-gold/70 shrink-0 transition-colors" />
              <p className="text-[10px] sm:text-xs text-zinc-500 font-medium whitespace-nowrap truncate tracking-tight">
                 Search name or code...
              </p>
            </div>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isSearching && (results.length > 0 || (search.length > 0 && !loading)) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            className="absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 w-[calc(100%+16px)] -ml-2 sm:ml-0 sm:w-[280px] mt-1 bg-[#ffffff]/95 border border-zinc-200 rounded-lg shadow-2xl z-[100] overflow-hidden backdrop-blur-md"
          >
             {results.length > 0 ? (
               <div className="p-1 max-h-[220px] overflow-y-auto custom-scrollbar">
                  {results.map(shade => (
                    <button 
                      key={shade.id}
                      onClick={() => { onSelect(shade); setIsSearching(false); setSearch(""); }}
                      className="w-full flex items-center gap-3 p-2 rounded hover:bg-black/5 transition-colors text-left group"
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded border border-zinc-200 shadow-sm shrink-0" style={{ backgroundColor: shade.hex }} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] sm:text-xs font-medium text-zinc-900 group-hover:text-gold truncate">{shade.name}</p>
                        <p className="text-[8px] sm:text-[10px] text-gold font-bold font-mono">{shade.shadeCode}</p>
                      </div>
                    </button>
                  ))}
               </div>
             ) : (
               <div className="p-4 text-center">
                 <p className="text-[10px] text-gold uppercase tracking-widest font-bold">No Match</p>
               </div>
             )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AddToCartModal = ({ product, onClose }: { product: any, onClose: () => void }) => {
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedShade, setSelectedShade] = useState<Shade | any>(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const isPaint = useMemo(() => {
    return product.subCategory?.toLowerCase().includes('wall') || 
           product.subCategory?.toLowerCase().includes('interior') || 
           product.subCategory?.toLowerCase().includes('exterior') ||
           product.topCategory?.toLowerCase() === 'decorative' && (
             product.name?.toLowerCase().includes('emulsion') || 
             product.name?.toLowerCase().includes('paint')
           );
  }, [product.subCategory, product.topCategory, product.name]);

  useEffect(() => {
    if (isPaint) {
      const def = DEFAULT_WHITES[product.brand] || DEFAULT_WHITES.default || { name: 'White', code: '', hex: '#FFFFFF' };
      setSelectedShade({
        id: `default-${product.brand}-${def.code}`,
        name: def.name,
        shadeCode: def.code,
        hex: def.hex,
        brand: product.brand
      });
    }
  }, [isPaint, product.brand]);

  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === 'number') return priceVal;
    if (typeof priceVal === 'string') return parseFloat(priceVal.replace(/[^0-9.]/g, ""));
    return 0;
  };
  const unitPrice = parsePrice(product.price);
  
  const totalPrice = useMemo(() => {
    let discountFactor = 1;
    if (selectedSize === 4) discountFactor = 0.96;
    if (selectedSize === 10) discountFactor = 0.92;
    if (selectedSize === 20) discountFactor = 0.88;
    return Math.round(unitPrice * selectedSize * discountFactor);
  }, [unitPrice, selectedSize]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: `${product.id}-${selectedSize}${selectedShade && selectedShade.shadeCode ? `-${selectedShade.shadeCode}` : '-white'}`,
      productId: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      size: selectedSize,
      quantity: quantity,
      unitPrice: totalPrice / selectedSize,
      shade: selectedShade ? {
        name: selectedShade.name,
        code: selectedShade.shadeCode,
        hex: selectedShade.hex
      } : undefined
    });
    setJustAdded(true);
    setTimeout(() => {
        setJustAdded(false);
        setQuantity(1);
        onClose();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl shadow-xl overflow-hidden bg-white"
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-base font-bold text-zinc-900 line-clamp-1">{product.name}</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-zinc-200/60 text-zinc-500 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4 space-y-5">
          <div className="flex gap-4">
            <div className="w-2/5 shrink-0 flex items-center justify-center p-2 bg-zinc-50 rounded-lg border border-zinc-100 rounded-xl overflow-hidden relative">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
              ) : (
                <div className="text-[10px] text-zinc-400 font-medium uppercase tracking-widest text-center">No Image</div>
              )}
            </div>
            <div className="flex-1">
              {product.properties && product.properties.length > 0 ? (
                <div>
                  <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">Key Features</h3>
                  <ul className="text-[11px] font-medium text-zinc-700 space-y-2">
                    {product.properties.slice(0, 3).map((prop: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 leading-tight">
                        <div className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                        <span className="line-clamp-2 title-case">{prop}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center">
                  <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">{product.brand}</p>
                  <p className="text-xs font-medium text-zinc-700 line-clamp-3">{product.name}</p>
                </div>
              )}
            </div>
          </div>

          {isPaint && (
            <div className="pt-2 border-t border-zinc-100">
              <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">Color Shade</h3>
              <InlineShadePicker 
                brand={product.brand}
                currentShade={selectedShade}
                onSelect={(shade) => setSelectedShade(shade)}
              />
            </div>
          )}

          <div className="pt-2 border-t border-zinc-100">
            <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">Select Size</h3>
            <div className="flex items-center gap-2 flex-wrap">
              {[1, 4, 10, 20].map(size => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setQuantity(1); }}
                  className={`flex-1 py-2 rounded-lg border font-bold text-xs transition-all ${
                    selectedSize === size
                      ? "bg-gradient-gold text-white border-transparent shadow-md"
                      : "bg-white border-zinc-200 text-zinc-500 hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {size}L
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
             <div className="flex justify-between items-end mb-4 bg-zinc-50 rounded-xl p-3 border border-zinc-100">
               <div>
                 <p className="text-[10px] text-gold font-bold uppercase">{selectedSize}L pack {quantity > 1 ? `x ${quantity}` : ''}</p>
                 <p className="text-xl font-bold text-zinc-900 leading-none mt-1.5 mb-0.5">₹{totalPrice.toLocaleString()}</p>
                 <p className="text-[9px] text-zinc-500 font-medium tracking-wide">Incl. of all taxes</p>
                 {selectedSize > 1 && (
                   <p className="text-[10px] text-zinc-400 mt-1.5 uppercase tracking-wider">₹{Math.round(totalPrice / selectedSize).toLocaleString()} / Liter</p>
                 )}
               </div>
               
               <div className="flex items-center border border-zinc-200 rounded-lg p-0.5 bg-white shadow-sm">
                 <button 
                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
                   className="p-1.5 hover:bg-zinc-100 rounded text-zinc-500 transition-colors"
                 >
                   <Minus className="w-3 h-3" />
                 </button>
                 <span className="font-bold text-xs text-zinc-900 select-none w-6 text-center">{quantity}</span>
                 <button 
                   onClick={() => setQuantity(quantity + 1)}
                   className="p-1.5 hover:bg-zinc-100 rounded text-zinc-500 transition-colors"
                 >
                   <Plus className="w-3 h-3" />
                 </button>
               </div>
             </div>

             <button 
                onClick={handleAddToCart}
                disabled={justAdded}
                className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                  justAdded 
                  ? 'bg-green-500 text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)]' 
                  : 'bg-gradient-gold hover:opacity-90 text-white shadow-[0_8px_20px_rgba(184,151,90,0.25)] active:scale-[0.98]'
                }`}
              >
                {justAdded ? 'Added to Cart' : '+ Add to Cart'}
              </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const getCategoryBadgeStyle = (category: string) => {
  if (!category) return "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200";
  const cat = category.toLowerCase();
  if (cat.includes('interior')) return "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100";
  if (cat.includes('exterior')) return "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100";
  if (cat.includes('primer')) return "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100";
  if (cat.includes('waterproof')) return "bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100";
  if (cat.includes('wood')) return "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100";
  if (cat.includes('metal') || cat.includes('grill')) return "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100";
  if (cat.includes('epoxy') || cat.includes('pu ') || cat.includes('enamel')) return "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100";
  if (cat.includes('industrial')) return "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100";
  return "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200";
};

const ProductCard = memo(({ product }: { product: any }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const { items: wishlistItems, addItem: wishlistAddItem, removeItem: wishlistRemoveItem, addToast } = useWishlistStore();
  const { user, openAuthModal } = useAuthStore();

  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === 'number') return priceVal;
    if (typeof priceVal === 'string') return parseFloat(priceVal.replace(/[^0-9.]/g, ""));
    return 0;
  };
  const unitPrice = parsePrice(product.price);

  const isWishlisted = useMemo(() => {
    return wishlistItems.some(item => item.id.startsWith(`prod_${product.id}`));
  }, [wishlistItems, product.id]);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      addToast({
        productName: product.name,
        message: 'Please sign in to add products to your wishlist.',
        isError: true,
      });
      openAuthModal();
      return;
    }
    if (isWishlisted) {
      const itemToRemove = wishlistItems.find(item => item.id.startsWith(`prod_${product.id}`));
      if (itemToRemove) {
        wishlistRemoveItem(itemToRemove.id, user?.uid || null);
      }
    } else {
      wishlistAddItem({
        type: 'product',
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size: 1,
        shadeName: 'White',
        shadeCode: 'white',
        shadeHex: '#FFFFFF'
      }, user?.uid || null);
    }
  };

  return (
    <>
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={() => navigate(`/p/${product.name.replace(/\s+/g, '-').toLowerCase()}`)}
      className="group relative rounded-2xl bg-white border border-zinc-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-zinc-300 hover:-translate-y-1 cursor-pointer h-full"
    >
      {product.popular && (
        <div className="absolute top-0 left-0 z-20">
          <span className="bg-gradient-gold text-white text-[8px] font-bold px-1.5 py-0.5 rounded-br-lg shadow-sm uppercase tracking-widest inline-block">
            Popular
          </span>
        </div>
      )}
      
      <button 
        onClick={handleToggleWishlist}
        className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-white/90 hover:bg-white backdrop-blur shadow-sm border border-zinc-100 transition-all active:scale-95 group/heart"
      >
        <Heart className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-400 group-hover/heart:text-red-500'}`} />
      </button>

      <div className="relative flex items-center justify-center bg-white shrink-0 group-hover:bg-zinc-50 transition-colors border-b border-zinc-100 overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 sm:h-40 object-contain object-center group-hover:scale-105 transition-transform duration-500 mix-blend-multiply block"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-zinc-300">
            <span className="text-[10px] font-medium uppercase tracking-widest">No Image</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <div className="flex items-center justify-between mb-1 gap-2">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold">{product.brand}</p>
          {product.subCategory && (
            <span className={`text-[7px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest truncate shrink-0 max-w-[110px] border transition-colors ${getCategoryBadgeStyle(product.subCategory)}`} title={product.subCategory}>
              {product.subCategory}
            </span>
          )}
        </div>
        <h3 className="text-xs sm:text-[13px] font-bold text-zinc-900 leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-zinc-100">
          <div className="flex items-center justify-between mb-2.5 sm:mb-3">
             <div className="flex items-baseline gap-1.5 ">
               <p className="text-[9px] sm:text-[10px] text-gold font-bold uppercase tracking-wider">From</p>
               <p className="text-sm sm:text-base font-bold text-zinc-900 tracking-tight">₹{unitPrice.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-auto">
            <button 
              onClick={(e) => { e.stopPropagation(); navigate(`/p/${product.name.replace(/\s+/g, '-').toLowerCase()}`); }}
              className="py-1.5 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-bold text-zinc-600 bg-zinc-100 hover:bg-zinc-200 hover:text-zinc-900 transition-colors uppercase tracking-widest text-center"
            >
              Details
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowAddModal(true); }}
              className="flex items-center justify-center gap-1.5 py-1.5 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-bold text-white bg-gradient-gold hover:opacity-90 transition-all shadow-sm shadow-gold/20 uppercase tracking-widest text-center"
            >
              <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
              Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>

    <AnimatePresence>
      {showAddModal && (
         <AddToCartModal product={product} onClose={() => setShowAddModal(false)} />
      )}
    </AnimatePresence>
    </>
  );
});

export default function ProductsSection({ initialCategory, initialBrand }: { initialCategory?: string, initialBrand?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParam = initialBrand || searchParams.get('brand') || "All Brands";
  
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(initialCategory || "All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const categoryRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (categoryRef.current && !categoryRef.current.contains(target)) {
        setIsCategoryOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(target)) {
        setIsBrandOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [activeBrand, setActiveBrand] = useState(brandParam);
  const [sortOption, setSortOption] = useState("Most Popular");
  const { searchQuery } = useProductSearchStore();
  const [showAsianFinishesShowroom, setShowAsianFinishesShowroom] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbBrands, setDbBrands] = useState<string[]>([]);
  const [dbCategories, setDbCategories] = useState<{name: string, subCategories: string[]}[]>([]);

  useEffect(() => {
    setActiveBrand(brandParam);
  }, [brandParam]);

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach(d => list.push({ id: d.id, ...d.data() }));
      setDbProducts(list);
    }, (error) => {
      console.warn("Products listener error:", error);
    });

    const unsubBrands = onSnapshot(collection(db, 'brands'), (snapshot) => {
      const list: string[] = [];
      snapshot.forEach(d => list.push(d.data().name));
      setDbBrands(list);
    }, (error) => {
      console.warn("Brands listener error:", error);
    });

    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const catMap: Record<string, Set<string>> = {};
      snapshot.forEach(d => {
         const name = d.data().name;
         if (!catMap[name]) catMap[name] = new Set();
      });
      // also scrape subcategories from dbProducts to populate the UI realistically
      setDbCategories(Object.keys(catMap).map(k => ({ name: k, subCategories: [] })));
    }, (error) => {
      console.warn("Categories listener error:", error);
    });

    return () => {
      unsubProducts();
      unsubBrands();
      unsubCategories();
    };
  }, []);

  // Compute dynamic subcategories from productList (so mock products work too)
  const productList = useMemo(() => {
    if (dbProducts.length === 0) return mockProducts;
    // Combine them, preferring dbProducts if names match to avoid duplicates and UI jumps
    const map = new Map();
    mockProducts.forEach(p => {
      const key = p.name ? p.name.trim().toLowerCase() : p.id?.toString();
      map.set(key, p);
    });
    dbProducts.forEach(p => {
      const key = p.name ? p.name.trim().toLowerCase() : p.id?.toString();
      map.set(key, p);
    });
    return Array.from(map.values());
  }, [dbProducts]);
  const availableBrands = useMemo(() => {
    const fromProducts = Array.from(new Set(productList.map(p => p.brand).filter(Boolean)));
    const merged = new Set([...fromProducts, ...dbBrands]);
    return Array.from(merged);
  }, [productList, dbBrands]);

  const dynamicCategories = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    dbCategories.forEach(c => map[c.name] = new Set());
    
    productList.forEach(p => {
       if (p.topCategory) {
         if (!map[p.topCategory]) map[p.topCategory] = new Set();
         if (p.subCategory) {
            map[p.topCategory].add(p.subCategory);
         }
       }
    });
    
    // Add default mock categories if map is empty
    if (Object.keys(map).length === 0) {
      map['Exterior'] = new Set(['Exterior Wall Paints']);
      map['Interior'] = new Set(['Interior Wall Paints']);
      map['Waterproofing'] = new Set(['Waterproofing Solutions']);
    }

    return Object.keys(map).map(k => ({
      name: k,
      subCategories: Array.from(map[k])
    }));
  }, [dbCategories, productList]);

  const totalSubCategories = useMemo(() => dynamicCategories.reduce((acc, cat) => acc + cat.subCategories.length, 0), [dynamicCategories]);

  const handleBrandChange = (brand: string) => {
    if (brand === "All Brands") {
      searchParams.delete('brand');
    } else {
      searchParams.set('brand', brand);
    }
    setSearchParams(searchParams);
  };

  const filtered = productList.filter((p) => {
    const matchCat =
      activeCategoryFilter === "All Categories" ||
      (activeCategoryFilter.startsWith("All ") && p.topCategory === activeCategoryFilter.replace("All ", "")) ||
      (p.subCategory && p.subCategory.toLowerCase() === activeCategoryFilter.toLowerCase());
    const matchBrand = activeBrand === "All Brands" || p.brand.toLowerCase() === activeBrand.toLowerCase();
    
    // Check if searchQuery is in product name or properties or subCategory
    const searchLower = searchQuery.toLowerCase();
    const matchSearch =
      searchQuery === "" ||
      (p.name && p.name.toLowerCase().includes(searchLower)) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(searchLower)) ||
      (p.properties && p.properties.some((prop: string) => prop.toLowerCase().includes(searchLower)));

    return matchCat && matchBrand && matchSearch;
  });

  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === 'number') return priceVal;
    if (typeof priceVal === 'string') return parseFloat(priceVal.replace(/[^0-9.]/g, ""));
    return 0;
  };

  const getFinishValue = (product: any) => {
    const text = (product.name + " " + (product.properties?.join(" ") || "")).toLowerCase();
    if (text.includes("matt")) return "matt";
    if (text.includes("sheen") || text.includes("shyne")) return "sheen";
    return "other";
  };

  const sortedAndFiltered = [...filtered].sort((a, b) => {
    if (sortOption === "Most Popular") {
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    } else if (sortOption === "Price - High to Low") {
      return parsePrice(b.price) - parsePrice(a.price);
    } else if (sortOption === "Price - Low to High") {
      return parsePrice(a.price) - parsePrice(b.price);
    } else if (sortOption === "Finish - Matt First") {
      const finishA = getFinishValue(a) === "matt" ? 1 : 0;
      const finishB = getFinishValue(b) === "matt" ? 1 : 0;
      return finishB - finishA;
    } else if (sortOption === "Finish - Sheen First") {
      const finishA = getFinishValue(a) === "sheen" ? 1 : 0;
      const finishB = getFinishValue(b) === "sheen" ? 1 : 0;
      return finishB - finishA;
    }
    return 0;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategoryFilter, activeBrand, sortOption, searchQuery]);

  const totalPages = Math.ceil(sortedAndFiltered.length / productsPerPage);
  const currentProducts = sortedAndFiltered.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return pages;
  };

  return (
    <section
      id="products"
      className="relative"
    >
            {/* Refined Filters & Sort Bar Edge-to-Edge */}
      <div className="sticky top-[102px] sm:top-[126px] lg:top-[142px] z-[70] bg-white border-y border-zinc-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] transition-all mb-6 sm:mb-8 w-full left-0">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-black/10 to-transparent pointer-events-none" />
        
        <div className="max-w-[1400px] lg:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between gap-3 sm:gap-6 py-2 sm:py-3 w-full relative z-10">
            
            {/* Category Filter */}
            <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0 relative z-10" ref={categoryRef}>
              <div className="flex items-center justify-between px-1">
                <span className="text-[9px] sm:text-[10px] text-zinc-900/70 uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 shrink-0">
                  <Filter className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-900/80" /> Category
                </span>
                <span className="text-[9px] font-bold tracking-widest text-zinc-900 uppercase">
                  {totalSubCategories + 1}
                </span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 transition-all rounded-xl py-2 sm:py-2.5 pl-3 sm:pl-4 pr-8 sm:pr-10 text-[10px] sm:text-xs font-display font-bold text-zinc-900 outline-none shadow-sm w-full text-left truncate flex items-center justify-between group backdrop-blur-sm"
                >
                  <span className="truncate">{activeCategoryFilter === "All Categories" ? "All Categories" : activeCategoryFilter}</span>
                  <ChevronDown className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-zinc-900/60 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-[calc(100%+12px)] left-0 w-[85vw] sm:w-[500px] max-w-[600px] bg-[#ffffff]/95 backdrop-blur-2xl border border-zinc-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_30px_-5px_rgba(0,0,0,0.05)] rounded-2xl p-4 sm:p-6 z-[100] overflow-hidden flex flex-col max-h-[50vh] sm:max-h-[calc(100vh-220px)]"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.03),transparent_50%)] pointer-events-none" />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] invert mix-blend-overlay pointer-events-none" />
                      
                      <div className="relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <button 
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-display font-medium mb-6 transition-all ${activeCategoryFilter === "All Categories" ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-600 hover:bg-zinc-50/80 hover:text-zinc-900 hover:pl-5 border border-transparent'}`}
                          onClick={() => { setActiveCategoryFilter("All Categories"); setIsCategoryOpen(false); }}
                        >
                          All Categories
                        </button>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                          {dynamicCategories.map(cat => (
                            <div key={cat.name}>
                              <div className="flex items-center gap-2 mb-3 sm:mb-4 pb-2 border-b border-zinc-200">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-900/40" />
                                <h4 className="text-[10px] sm:text-[11px] uppercase font-bold text-zinc-900/60 tracking-[0.2em] m-0">{cat.name}</h4>
                              </div>
                              <div className="flex flex-col gap-1">
                                <button
                                  onClick={() => { setActiveCategoryFilter(`All ${cat.name}`); setIsCategoryOpen(false); }}
                                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${activeCategoryFilter === `All ${cat.name}` ? 'bg-zinc-100 text-zinc-900 font-bold translate-x-1' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 hover:translate-x-1'}`}
                                >
                                  All {cat.name}
                                </button>
                                {cat.subCategories.map(sub => (
                                  <button
                                    key={sub}
                                    onClick={() => { setActiveCategoryFilter(sub); setIsCategoryOpen(false); }}
                                    className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${activeCategoryFilter === sub ? 'bg-zinc-100 text-zinc-900 font-bold translate-x-1' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 hover:translate-x-1'}`}
                                  >
                                    {sub}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0 border-l border-zinc-200 pl-3 sm:pl-6 relative z-10" ref={brandRef}>
              <div className="flex items-center justify-between px-1">
                <span className="text-[9px] sm:text-[10px] text-zinc-900/70 uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 shrink-0">
                  <Filter className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-900/80" /> Brand
                </span>
                <span className="text-[9px] font-bold tracking-widest text-zinc-900 uppercase">
                  {availableBrands.length}
                </span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsBrandOpen(!isBrandOpen)}
                  className="bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 transition-all rounded-xl py-2 sm:py-2.5 pl-3 sm:pl-4 pr-8 sm:pr-10 text-[10px] sm:text-xs font-display font-bold text-zinc-900 outline-none shadow-sm w-full text-left truncate flex items-center justify-between group backdrop-blur-sm"
                >
                  <span className="truncate">{activeBrand === "All Brands" ? "All Brands" : activeBrand}</span>
                  <ChevronDown className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-zinc-900/60 transition-transform duration-300 ${isBrandOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isBrandOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[85vw] sm:w-[320px] max-w-[400px] bg-[#ffffff]/95 backdrop-blur-2xl border border-zinc-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_30px_-5px_rgba(0,0,0,0.05)] rounded-2xl p-4 sm:p-6 z-[100] overflow-hidden flex flex-col max-h-[50vh] sm:max-h-[calc(100vh-220px)]"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.03),transparent_50%)] pointer-events-none" />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] invert mix-blend-overlay pointer-events-none" />

                      <div className="relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <button 
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-display font-medium mb-4 transition-all ${activeBrand === "All Brands" ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-600 hover:bg-zinc-50/80 hover:text-zinc-900 hover:pl-5 border border-transparent'}`}
                          onClick={() => { handleBrandChange("All Brands"); setIsBrandOpen(false); }}
                        >
                          All Brands
                        </button>
                        
                        <div className="flex flex-col gap-1">
                          {availableBrands.filter(b => b !== "All Brands").map(brand => (
                            <button
                              key={brand as string}
                              onClick={() => { handleBrandChange(brand); setIsBrandOpen(false); }}
                              className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 ${activeBrand === brand ? 'bg-zinc-100 text-zinc-900 font-bold translate-x-1' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 hover:translate-x-1'}`}
                            >
                              {brand}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sort Controls */}
            <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0 border-l border-zinc-200 pl-3 sm:pl-6 relative z-10" ref={sortRef}>
              <div className="flex items-center justify-between px-1">
                <span className="text-[9px] sm:text-[10px] text-zinc-900/70 uppercase tracking-[0.2em] font-bold flex items-center gap-1.5 shrink-0">
                  <SortAsc className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-zinc-900/80" /> Sort By
                </span>
                <span className="text-[9px] font-bold tracking-widest text-zinc-900 uppercase">
                  5
                </span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 transition-all rounded-xl py-2 sm:py-2.5 pl-3 sm:pl-4 pr-8 sm:pr-10 text-[10px] sm:text-xs font-display font-bold text-zinc-900 outline-none shadow-sm w-full text-left truncate flex items-center justify-between group backdrop-blur-sm"
                >
                  <span className="truncate">
                    {sortOption === "Most Popular" ? "Popular" : 
                     sortOption === "Price - High to Low" ? "Price ↓" : 
                     sortOption === "Price - Low to High" ? "Price ↑" : 
                     sortOption === "Finish - Matt First" ? "Matt First" : 
                     "Sheen First"}
                  </span>
                  <ChevronDown className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-3 sm:h-4 text-zinc-900/60 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-[calc(100%+12px)] right-0 w-[85vw] sm:w-[280px] bg-[#ffffff]/95 backdrop-blur-2xl border border-zinc-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_30px_-5px_rgba(0,0,0,0.05)] rounded-2xl p-4 sm:p-6 z-[100] overflow-hidden flex flex-col max-h-[50vh] sm:max-h-[calc(100vh-220px)]"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.03),transparent_50%)] pointer-events-none" />
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] invert mix-blend-overlay pointer-events-none" />

                      <div className="relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="flex flex-col gap-1">
                          {[
                            { value: "Most Popular", label: "Most Popular" },
                            { value: "Price - High to Low", label: "Price: High to Low" },
                            { value: "Price - Low to High", label: "Price: Low to High" },
                            { value: "Finish - Matt First", label: "Finish: Matt First" },
                            { value: "Finish - Sheen First", label: "Finish: Sheen First" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => { setSortOption(option.value); setIsSortOpen(false); }}
                              className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 ${sortOption === option.value ? 'bg-zinc-100 text-zinc-900 font-bold translate-x-1' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 hover:translate-x-1'}`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        </div>


        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Geolocation & Delivery Estimation Header */}

        {/* Page Title & Badges Below Header Filters */}
        <div className="mb-8">
          {/* Title and stats section */}

          <div className="max-w-6xl mx-auto mb-10">
            <div className="grid grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4">
              {[
                { icon: ShieldCheck, title: "Authorized distributors", sub: "for featured products" },
                { icon: Tags, title: "Same Price as In-Store", sub: "no online extra charge" },
                { icon: Truck, title: "Doorstep delivery", sub: "skip the trip, we deliver" },
                { icon: Award, title: "20+ yrs trusted", sub: "msme/gst certified" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                <div key={idx} className="flex flex-col items-center justify-start sm:justify-center text-center p-2 sm:p-3 md:p-4 rounded-[10px] sm:rounded-2xl border border-gold/20 bg-gradient-to-b from-white to-gold/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group hover:shadow-[0_15px_40px_-5px_rgba(184,151,90,0.15)] hover:border-gold/40 hover:-translate-y-1">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-1.5 sm:mb-2 rounded-lg sm:rounded-[14px] bg-white shadow-[0_4px_15px_rgba(184,151,90,0.1)] flex items-center justify-center border border-gold/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <span className="text-gold drop-shadow-[0_2px_5px_rgba(184,151,90,0.2)]">
                      <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 sm:gap-1 items-center">
                    <p className="text-[7.5px] sm:text-[10px] md:text-xs font-display font-bold text-zinc-900 uppercase tracking-tight sm:tracking-widest leading-[1.1] sm:leading-tight group-hover:text-gold transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[6.5px] sm:text-[9px] md:text-[10px] text-zinc-500 font-sans tracking-tight sm:tracking-wide leading-tight max-w-[150px]">
                      {item.sub}
                    </p>
                  </div>
                </div>
              )})}
            </div>
          </div>
        </div>

      {/* Featured Plain Finishes Studio Banner Card */}
      <div className="mb-6 bg-white border border-zinc-200 rounded-xl p-3 sm:p-4 relative overflow-hidden shadow-sm">
        {/* Background ambient gold orb */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="space-y-1 text-left">
            <h3 className="font-serif font-bold text-sm sm:text-base text-zinc-900 tracking-tight leading-tight">
              Wall paint buying guide
            </h3>
            <p className="text-[10px] sm:text-xs text-zinc-600 font-sans leading-tight mt-0">
              Compare products, calculate cost & quantity, choose finishes best suitable for you.
            </p>
          </div>

          <button
            onClick={() => {
              setShowAsianFinishesShowroom(!showAsianFinishesShowroom);
            }}
            className="flex items-center gap-1.5 px-4 py-2 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-white bg-gradient-gold hover:opacity-90 active:scale-95 border border-transparent rounded-lg transition-all shadow-md shrink-0 cursor-pointer select-none"
          >
            {showAsianFinishesShowroom ? "Minimize Tool ✦" : "Open Wall Paint Buying Guide ✦"}
          </button>
        </div>

        {/* Asian Paints Plain Finishes Showroom (Expanded inside/under banner) */}
        <AnimatePresence>
          {showAsianFinishesShowroom && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="w-full origin-top border-t border-zinc-805 border-zinc-800 pt-6"
            >
              <AsianPaintsPlainFinishesShowroom />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Grid Header */}
      <div className="flex flex-col gap-3 mb-4">
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
          <p className="text-[10px] sm:text-sm text-ivory/60 font-medium font-sans whitespace-nowrap shrink-0">
            Showing <span className="text-ivory">{sortedAndFiltered.length}</span> {sortedAndFiltered.length === 1 ? 'product' : 'products'}
          </p>
          <div className="w-auto flex-1 max-w-[280px] sm:max-w-md">
            <DeliveryEstimator />
          </div>
        </div>
      </div>

      {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-5">
          <AnimatePresence mode="popLayout">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-10 mb-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-zinc-600 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div className="flex items-center gap-1">
              {getPageNumbers().map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                    currentPage === num
                      ? 'bg-gradient-gold text-white border-transparent'
                      : 'border border-transparent bg-white hover:bg-zinc-50 hover:border-zinc-200 text-zinc-600'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-zinc-600 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
