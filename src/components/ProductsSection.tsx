import React, { useState, useEffect, memo, useRef, useMemo } from "react";
import { Heart, Filter, ChevronDown, SortAsc, Plus, Search, X, Minus, Share2 } from "lucide-react";
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

const ProductCard = memo(({ product }: { product: any }) => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedShade, setSelectedShade] = useState<Shade | any>(null);
  const [justAdded, setJustAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const { items: wishlistItems, addItem: wishlistAddItem, removeItem: wishlistRemoveItem, addToast } = useWishlistStore();
  const { user, openAuthModal } = useAuthStore();

  const expectedWishlistId = useMemo(() => {
    const sizePart = selectedSize !== undefined ? `_${selectedSize}` : '_1';
    const shadePart = selectedShade && selectedShade.shadeCode ? `_${selectedShade.shadeCode}` : '_white';
    return `prod_${product.id}${sizePart}${shadePart}`;
  }, [product.id, selectedSize, selectedShade]);

  const isWishlisted = useMemo(() => {
    return wishlistItems.some(item => item.id === expectedWishlistId);
  }, [wishlistItems, expectedWishlistId]);

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
      wishlistRemoveItem(expectedWishlistId, user?.uid || null);
    } else {
      wishlistAddItem({
        type: 'product',
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size: selectedSize,
        shadeName: selectedShade ? selectedShade.name : 'White',
        shadeCode: selectedShade && selectedShade.shadeCode ? selectedShade.shadeCode : 'white',
        shadeHex: selectedShade ? selectedShade.hex : '#FFFFFF'
      }, user?.uid || null);
    }
  };
  
  const isPaint = useMemo(() => {
    return product.subCategory.toLowerCase().includes('wall') || 
           product.subCategory.toLowerCase().includes('interior') || 
           product.subCategory.toLowerCase().includes('exterior') ||
           product.topCategory.toLowerCase() === 'decorative' && (
             product.name.toLowerCase().includes('emulsion') || 
             product.name.toLowerCase().includes('paint')
           );
  }, [product.subCategory, product.topCategory, product.name]);

  useEffect(() => {
    if (isPaint) {
      const def = DEFAULT_WHITES[product.brand] || DEFAULT_WHITES.default;
      setSelectedShade({
        id: `default-${product.brand}-${def.code}`,
        name: def.name,
        shadeCode: def.code,
        hex: def.hex,
        brand: product.brand
      });
    }
  }, [isPaint, product.brand]);

  const addItem = useCartStore((state) => state.addItem);
  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === 'number') return priceVal;
    if (typeof priceVal === 'string') return parseFloat(priceVal.replace(/[^0-9.]/g, ""));
    return 0;
  };
  const unitPrice = parsePrice(product.price);
  
  const totalPrice = useMemo(() => {
    let discountFactor = 1;
    if (selectedSize === 4) discountFactor = 0.96; // 4% bulk discount
    if (selectedSize === 10) discountFactor = 0.92; // 8% bulk discount
    if (selectedSize === 20) discountFactor = 0.88; // 12% bulk discount
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
      unitPrice: totalPrice / selectedSize, // Effective unit price after discount
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
    }, 2000);
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={() => navigate(`/p/${product.name.replace(/\s+/g, '-').toLowerCase()}`)}
      className="group relative rounded-2xl bg-[#ffffff] flex flex-col p-3 sm:p-5 border border-zinc-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] will-change-transform transition-all duration-500 hover:shadow-[0_8px_40px_rgba(212,175,55,0.12)] hover:-translate-y-1 hover:border-gold/40 cursor-pointer"
    >
      {/* Badges */}
      {product.popular && (
        <div className="absolute top-2 left-2 z-20">
          <span className="bg-gold/90 text-royale-bg text-[6px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded shadow-lg uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      {/* Heart & Share Action */}
      <div className="absolute top-1.5 right-1.5 z-20 flex flex-col gap-1.5">
        <button 
          onClick={handleToggleWishlist}
          className={`p-1.5 rounded-full border bg-white/90 hover:bg-white border-zinc-200 transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center select-none ${
            isWishlisted 
              ? 'text-red-500 hover:text-red-600 scale-105 shadow-md border-red-100' 
              : 'text-zinc-400 hover:text-red-500 shadow-sm'
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            exportElementAsImage(`product-card-${product.id}`, `rainbowpaint-product-${product.name.replace(/\s+/g, '-')}.png`);
          }}
          className="p-1.5 rounded-full border bg-white/90 hover:bg-white border-zinc-200 transition-all duration-300 transform hover:scale-110 cursor-pointer flex items-center justify-center select-none text-zinc-400 hover:text-gold shadow-sm opacity-0 group-hover:opacity-100"
          title="Share Product"
        >
          <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>

      {/* Image */}
      <div className="-mt-3 sm:-mt-4 h-28 sm:h-36 w-full mb-2 flex items-center justify-center relative z-10 drop-shadow-[0_8px_15px_rgba(0,0,0,0.1)]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full bg-zinc-100/50 rounded-xl flex flex-col items-center justify-center text-zinc-400">
            <span className="text-[10px] font-medium tracking-widest uppercase">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow items-center text-center">
        <h3 className="text-[10px] sm:text-sm font-sans font-bold mb-1 text-ivory leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Feature List (Reference inspired) */}
        <ul className="flex flex-col items-start gap-1 mb-3 text-[9px] sm:text-[11px] font-sans font-medium text-zinc-600 text-left w-full px-2">
          {product.properties?.slice(0, 3).map((prop: string, idx: number) => (
            <li key={idx} className="flex items-start gap-1.5 leading-tight group/item">
              <div className="w-1 h-1 rounded-full bg-gradient-to-r from-gold to-[#D4B572] mt-1.5 shrink-0 opacity-70 group-hover/item:opacity-100 transition-opacity" />
              <span className="group-hover/item:text-gold transition-colors">{prop}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto w-full space-y-3">
            {/* Shade Selector */}
            {isPaint && (
              <div className="pt-2 border-t border-zinc-200" onClick={(e) => e.stopPropagation()}>
                <InlineShadePicker 
                  brand={product.brand}
                  currentShade={selectedShade}
                  onSelect={(shade) => setSelectedShade(shade)}
                />
              </div>
            )}

            {/* Size Dots (Mobile compact) */}
            <div className={`flex items-center justify-center gap-1.5 sm:gap-2 ${!isPaint ? "pt-2 border-t border-zinc-200" : ""}`}>
              {SIZES.map(size => (
                <button
                  key={size}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setSelectedSize(size); 
                    setQuantity(1);
                  }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center text-[11px] sm:text-[13px] font-display font-bold transition-all duration-300 ${
                    selectedSize === size
                      ? "bg-gradient-to-r from-gold to-[#D4B572] text-white border-gold shadow-md scale-110"
                      : "bg-white shadow-sm border border-zinc-200 text-zinc-500 hover:border-gold/50 hover:text-gold hover:bg-gold/5"
                  }`}
                >
                  {size}L
                </button>
              ))}
            </div>

            <div className="pt-1 flex flex-col items-center">
              <div className="flex items-baseline justify-center gap-1.5 flex-wrap">
                <p className="text-[9px] sm:text-[10px] text-zinc-400 font-sans tracking-tight font-bold uppercase shrink-0">
                  {selectedSize}L pack {quantity > 1 && `x ${quantity}`}
                </p>
                <p className="text-base sm:text-lg font-bold text-ivory shrink-0">
                  ₹{totalPrice.toLocaleString()}
                </p>
                <span className="text-[8px] sm:text-[9px] text-gold font-semibold tracking-tight uppercase shrink-0">incl GST</span>
              </div>
              {selectedSize > 1 && (
                <p className="text-[9px] sm:text-[10px] text-zinc-400 mt-0.5 font-medium">
                  Effective Price: ₹{Math.round(totalPrice / selectedSize).toLocaleString()} / L
                </p>
              )}
            </div>

            <div className="flex gap-1.5 sm:gap-2 items-stretch w-full mt-2">
              <div className="flex items-center justify-between border border-zinc-200 rounded-lg p-0.5 sm:p-1 flex-shrink-0 w-[55px] sm:w-[70px] bg-black/[0.02]">
                <button 
                  onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
                  className="p-0.5 sm:p-1 hover:bg-black/5 rounded text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                </button>
                <span className="text-[9px] sm:text-[11px] font-bold text-zinc-900 select-none w-2 sm:w-3 text-center">{quantity}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); setQuantity(quantity + 1); }}
                  className="p-0.5 sm:p-1 hover:bg-black/5 rounded text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                </button>
              </div>
              <button 
                onClick={(e) => handleAddToCart(e)}
                disabled={justAdded}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 rounded-lg py-2 sm:py-2.5 px-2 sm:px-3 text-[9px] sm:text-xs font-sans font-bold transition-all uppercase tracking-widest h-full min-h-[36px] sm:min-h-[42px] whitespace-nowrap ${justAdded ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'bg-gradient-to-r from-gold to-[#D4B572] hover:from-[#D4B572] hover:to-gold text-white shadow-[0_4px_15px_-5px_rgba(184,151,90,0.2)] hover:shadow-[0_10px_25px_-5px_rgba(184,151,90,0.3)] border-0'}`}
              >
                {justAdded ? (
                  <>Added!</>
                ) : (
                  <>Add to Cart</>
                )}
              </button>
            </div>
        </div>
      </div>
    </motion.div>
  );
});

export default function ProductsSection({ initialCategory, initialBrand }: { initialCategory?: string, initialBrand?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParam = initialBrand || searchParams.get('brand') || "All Brands";
  
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(initialCategory || "All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
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
  const productList = dbProducts.length > 0 ? dbProducts : mockProducts;
  const availableBrands = dbBrands.length > 0 ? dbBrands : Array.from(new Set(productList.map(p => p.brand).filter(Boolean)));

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
    const matchBrand = activeBrand === "All Brands" || p.brand === activeBrand;
    
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
            <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
              {[
                { emoji: "✅", title: "Authorized distributors", sub: "for featured products" },
                { emoji: "💰", title: "Same Price as In-Store", sub: "no online extra charge" },
                { emoji: "🚚", title: "Doorstep delivery", sub: "skip the trip, we deliver" },
                { emoji: "🧾", title: "20+ yrs trusted", sub: "msme/gst certified" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-1 sm:p-5 rounded-2xl border border-zinc-200 bg-royale-surface/50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group hover-gold-glow hover:-translate-y-1">
                  <span className="text-base sm:text-3xl mb-0.5 sm:mb-2 drop-shadow-[0_4px_10px_rgba(184,151,90,0.2)] group-hover:scale-110 transition-transform duration-500">{item.emoji}</span>
                  <div className="flex flex-col gap-0.5 sm:gap-1">
                    <p className="text-[7.5px] sm:text-xs font-display font-bold text-ivory uppercase tracking-tight leading-tight group-hover:text-gold transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[6.5px] sm:text-[10px] text-zinc-500 font-sans leading-tight mt-0 sm:mt-0.5">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
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
            className="flex items-center gap-1.5 px-4 py-2 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-white bg-gold hover:bg-gold/90 active:scale-95 border border-transparent rounded-lg transition-all shadow-md shrink-0 cursor-pointer select-none"
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {sortedAndFiltered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
