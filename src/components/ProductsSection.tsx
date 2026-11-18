import React, { useState, useEffect, memo, useRef, useMemo } from "react";
import {
  Heart,
  Filter,
  ChevronDown,
  SortAsc,
  Plus,
  Search,
  X,
  Minus,
  Share2,
  ShoppingCart,
  ShieldCheck,
  Coins,
  Truck,
  Award,
  Tags,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockProducts, subCategories, brands, brandDetails } from "../data";
import {
  applyStandardEnamelIndustrialShades,
  STANDARD_ENAMEL_INDUSTRIAL_SHADES,
} from "../constants/industrialEnamelShades";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { shadeService, Shade } from "../services/shadeService";
import { useDebounce } from "../hooks/useDebounce";
import CategorySeoBlock from "./CategorySeoBlock";

import { useProductSearchStore } from "../store/useProductSearchStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { exportElementAsImage } from "../lib/exportUtils";
import { useAuthStore } from "../store/useAuthStore";
import DeliveryEstimator from "./DeliveryEstimator";
import { db } from "../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const SIZES = [1, 4, 10, 20];

export const DEFAULT_WHITES: Record<
  string,
  { name: string; code: string; hex: string }
> = {
  "Asian Paints": { name: "White", code: "", hex: "#FFFFFF" },
  "Berger Paints": { name: "White", code: "", hex: "#FFFFFF" },
  "MRF Paints": { name: "White", code: "", hex: "#FFFFFF" },
  "MRF Vapocure": { name: "White", code: "", hex: "#FFFFFF" },
  default: { name: "White", code: "", hex: "#FFFFFF" },
};

const ShadeSelector = ({
  brand,
  onSelect,
  onCancel,
  currentShade,
}: {
  brand: string;
  onSelect: (shade: Shade) => void;
  onCancel: () => void;
  currentShade?: Shade | null;
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
        brand: brand === "All Brands" ? "all" : brand,
        search: deferredSearch,
        limit: 8,
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
      className="absolute inset-0 bg-transparent/95 backdrop-blur-md z-[60] flex flex-col p-4 duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-[10px] font-display font-bold text-gold uppercase tracking-widest">
          Select Color
        </div>
        <button
          onClick={onCancel}
          className="p-1 hover:bg-black/10 rounded-full transition-colors"
        >
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
                family: "whites",
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

        {suggestions.map((shade) => (
          <div key={shade.id} className="w-full flex items-center gap-2">
            <button
              onClick={() => onSelect(shade)}
              className="flex-1 flex items-center gap-3 p-2 rounded-lg bg-white shadow-sm border border-zinc-200 hover:border-gold/30 transition-all group text-left min-w-0"
            >
              <div
                className="w-8 h-8 rounded border border-black/20 shrink-0"
                style={{ backgroundColor: shade.hex }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium text-ivory group-hover:text-gold truncate max-w-[120px]">
                  {shade.name}
                </p>
                <p className="text-[8px] text-gold font-mono">
                  {shade.shadeCode}
                </p>
              </div>
            </button>
            <Link
              to={shadeService.getShadeUrl(shade)}
              onClick={(e) => e.stopPropagation()}
              className="p-2.5 rounded-lg border border-zinc-200 hover:border-gold hover:text-gold bg-white text-zinc-400 transition-colors flex items-center justify-center shrink-0"
              title="View Color Details & Buy Options"
            >
              <Info className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}

        {search.length >= 1 && suggestions.length === 0 && !loading && (
          <div className="py-8 text-center flex flex-col items-center gap-2">
            <Search className="w-6 h-6 text-ivory/10" />
            <p className="text-[8px] text-gold uppercase tracking-widest">
              No matching shades
            </p>
          </div>
        )}

        {search.length === 0 && (
          <div className="py-4 text-center">
            <p className="text-[7px] text-gold uppercase tracking-[0.2em]">
              Start typing to search colors
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const InlineShadePicker = ({
  brand,
  onSelect,
  currentShade,
}: {
  brand: string;
  onSelect: (shade: Shade) => void;
  currentShade?: Shade | null;
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Shade[]>([]);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(search, 300);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsSearching(false);
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
    shadeService
      .getShades({ brand, search: debounced, limit: 5 })
      .then((res) => setResults(res.shades))
      .finally(() => setLoading(false));
  }, [debounced, brand]);

  return (
    <div ref={ref} className="relative w-full flex flex-col gap-2 sm:gap-2.5">
      {/* Selected Shade Display */}
      <div className="flex items-center justify-between gap-2 w-full bg-zinc-50/50 p-2 sm:p-2.5 rounded-lg border border-zinc-100 mb-1">
        <span className="text-[10px] sm:text-xs text-zinc-600 font-bold uppercase tracking-wider shrink-0 mt-0.5">
          Shade:
        </span>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 min-w-0 flex-1">
          <span className="text-xs sm:text-sm font-bold text-ivory break-words leading-tight">
            {currentShade?.name || "White"}
          </span>
          {currentShade?.shadeCode && (
            <span className="text-[10px] sm:text-xs text-gold font-bold font-mono shrink-0">
              {currentShade.shadeCode}
            </span>
          )}
          {currentShade && currentShade.shadeCode && (
            <Link
              to={shadeService.getShadeUrl(currentShade)}
              className="text-[9.5px] text-gold hover:underline flex items-center gap-0.5 ml-1 select-none font-semibold shrink-0"
              title="View full shade details"
            >
              (View Details)
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-black/20 shadow-sm"
            style={{ backgroundColor: currentShade?.hex || "#FFFFFF" }}
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
                  family: "whites",
                } as Shade);
              }}
              className="p-1 text-zinc-600 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
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
            <Search className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name / Code"
              className="bg-transparent border-none outline-none text-xs text-zinc-900 placeholder:text-zinc-600 w-full font-medium"
            />
            {loading ? (
              <div className="w-3.5 h-3.5 border-2 border-gold border-t-transparent rounded-full animate-spin shrink-0" />
            ) : (
              <X
                className="w-3.5 h-3.5 text-zinc-600 cursor-pointer hover:text-zinc-700 shrink-0"
                onClick={() => setIsSearching(false)}
              />
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsSearching(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-50/80 border border-zinc-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] hover:border-gold/30 hover:bg-zinc-50 transition-all group w-full justify-between cursor-text"
          >
            <div className="flex items-center gap-2 overflow-hidden flex-1 text-left">
              <Search className="w-3.5 h-3.5 text-zinc-600 group-hover:text-gold/70 shrink-0 transition-colors" />
              <p className="text-[10px] sm:text-xs text-zinc-600 font-medium whitespace-nowrap truncate tracking-tight">
                Search name or code...
              </p>
            </div>
          </button>
        )}
      </div>

      <AnimatePresence>
        {isSearching &&
          (results.length > 0 || (search.length > 0 && !loading)) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              className="absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 w-[calc(100%+16px)] -ml-2 sm:ml-0 sm:w-[280px] mt-1 bg-[#ffffff]/95 border border-zinc-200 rounded-lg shadow-2xl z-[100] overflow-hidden backdrop-blur-md"
            >
              {results.length > 0 ? (
                <div className="p-1 max-h-[220px] overflow-y-auto custom-scrollbar">
                  {results.map((shade) => (
                    <div
                      key={shade.id}
                      className="w-full flex items-center gap-1.5 px-1 py-0.5"
                    >
                      <button
                        onClick={() => {
                          onSelect(shade);
                          setIsSearching(false);
                          setSearch("");
                        }}
                        className="flex-1 flex items-center gap-3 p-1.5 rounded hover:bg-black/5 transition-colors text-left group min-w-0"
                      >
                        <div
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded border border-zinc-200 shadow-sm shrink-0"
                          style={{ backgroundColor: shade.hex }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] sm:text-xs font-medium text-zinc-900 group-hover:text-gold truncate">
                            {shade.name}
                          </p>
                          <p className="text-[8px] sm:text-[10px] text-gold font-bold font-mono">
                            {shade.shadeCode}
                          </p>
                        </div>
                      </button>
                      <Link
                        to={shadeService.getShadeUrl(shade)}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 text-zinc-400 hover:text-gold transition-colors shrink-0"
                        title="View Color Details & Buy Options"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-[10px] text-gold uppercase tracking-widest font-bold">
                    No Match
                  </p>
                </div>
              )}
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
};

export const RalShadePicker = ({
  onSelect,
  currentShade,
}: {
  onSelect: (shade: Shade) => void;
  currentShade?: Shade | null;
}) => {
  const [ralQuery, setRalQuery] = useState("");
  const [results, setResults] = useState<Shade[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounced = useDebounce(ralQuery, 200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const q = debounced.trim();
    if (!q) {
      setResults([]);
      return;
    }
    setLoading(true);
    shadeService
      .getShades({ brand: "ral", search: q, limit: 8 })
      .then((res) => setResults(res.shades))
      .finally(() => setLoading(false));
  }, [debounced]);

  const formatRalCode = (code: string) => {
    const trimmed = code.trim();
    return /^ral\b/i.test(trimmed) ? trimmed.toUpperCase() : `RAL ${trimmed.toUpperCase()}`;
  };

  const selectOfficialRalShade = (shade: Shade) => {
    const formattedCode = formatRalCode(shade.shadeCode);
    onSelect({
      ...shade,
      shadeCode: formattedCode,
    });
    setRalQuery("");
    setShowDropdown(false);
  };

  const handleApplyCustomRal = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = ralQuery.trim();
    if (!raw) return;

    const cleanedCode = raw.replace(/^ral\s*/i, "").trim().toLowerCase();
    const res = await shadeService.getShades({ brand: "ral", search: cleanedCode, limit: 20 });
    const exactMatch = res.shades.find(
      (s) =>
        s.shadeCode.toLowerCase() === cleanedCode ||
        s.shadeCode.toLowerCase() === raw.toLowerCase() ||
        `ral ${s.shadeCode.toLowerCase()}` === raw.toLowerCase()
    );

    if (exactMatch) {
      selectOfficialRalShade(exactMatch);
      return;
    }

    const formattedCode = formatRalCode(raw);
    onSelect({
      id: `custom-ral-${formattedCode.replace(/\s+/g, "-").toLowerCase()}`,
      name: `Custom ${formattedCode}`,
      shadeCode: formattedCode,
      hex: "#6B7280",
      rgb: "107, 114, 128",
      brand: "RAL Classic",
      category: "RAL Shade",
      finish: "Industrial Epoxy",
      popular: false,
      family: "custom",
    });
    setRalQuery("");
    setShowDropdown(false);
  };

  return (
    <div ref={containerRef} className="relative mt-3 pt-3 border-t border-zinc-200/70">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">
          Or Enter / Search RAL Shade Code
        </span>
        {currentShade?.shadeCode?.startsWith("RAL") && (
          <span className="text-[10px] font-mono font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
            {currentShade.name} ({currentShade.shadeCode})
          </span>
        )}
      </div>

      <form onSubmit={handleApplyCustomRal} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={ralQuery}
            onFocus={() => setShowDropdown(true)}
            onChange={(e) => {
              setRalQuery(e.target.value);
              setShowDropdown(true);
            }}
            placeholder="e.g. RAL 7035, 9005, Light Grey..."
            className="w-full bg-white border border-zinc-200 rounded-lg py-2 pl-8 pr-7 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30"
          />
          {ralQuery && (
            <button
              type="button"
              onClick={() => {
                setRalQuery("");
                setResults([]);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!ralQuery.trim()}
          className="px-3 py-2 rounded-lg bg-zinc-900 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors disabled:opacity-40 shrink-0"
        >
          Apply RAL
        </button>
      </form>

      <p className="text-[10px] text-zinc-500 mt-1.5">
        Pick from RAL Classic suggestions or apply any custom RAL shade code.
      </p>

      <AnimatePresence>
        {showDropdown && ralQuery.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl z-[120] overflow-hidden"
          >
            {loading ? (
              <div className="p-3 text-center text-[11px] text-zinc-500">Searching RAL shades...</div>
            ) : results.length > 0 ? (
              <div className="max-h-48 overflow-y-auto custom-scrollbar divide-y divide-zinc-100">
                {results.map((shade) => (
                  <button
                    key={shade.id}
                    type="button"
                    onClick={() => selectOfficialRalShade(shade)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-zinc-50 text-left transition-colors"
                  >
                    <span
                      className="w-6 h-6 rounded-md border border-zinc-300 shrink-0 shadow-xs"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-zinc-900 truncate">{shade.name}</p>
                      <p className="text-[10px] font-mono font-bold text-gold">RAL {shade.shadeCode}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleApplyCustomRal()}
                className="w-full px-3 py-2.5 text-left text-xs text-zinc-700 hover:bg-zinc-50 flex items-center justify-between"
              >
                <span>
                  Use custom RAL code: <strong className="text-zinc-900">{formatRalCode(ralQuery)}</strong>
                </span>
                <span className="text-[10px] font-bold text-gold uppercase">Apply</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AddToCartModal = ({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) => {
  const [selectedSize, setSelectedSize] = useState(1);
  const productSizes = product.sizes && product.sizes.length > 0 ? product.sizes : SIZES;
  
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize(1);
    }
  }, [product.sizes]);

  const [selectedShade, setSelectedShade] = useState<Shade | any>(null);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const isPaint = useMemo(() => {
    return (
      product.subCategory?.toLowerCase().includes("wall") ||
      product.subCategory?.toLowerCase().includes("interior") ||
      product.subCategory?.toLowerCase().includes("exterior") ||
      (product.topCategory?.toLowerCase() === "decorative" &&
        (product.name?.toLowerCase().includes("emulsion") ||
          product.name?.toLowerCase().includes("paint")))
    );
  }, [product.subCategory, product.topCategory, product.name]);

  const hasCustomShades = !!(product.shades && product.shades.length > 0);
  const allowRalShades = !!(product as any).allowRalShades;

  useEffect(() => {
    if (product.shades && product.shades.length > 0) {
      const first = product.shades[0];
      setSelectedShade({
        id: `custom-shade-${product.id}-${first.code}`,
        name: first.name,
        shadeCode: first.code,
        hex: first.hex,
        brand: product.brand,
      });
    } else if (isPaint) {
      const def = DEFAULT_WHITES[product.brand] ||
        DEFAULT_WHITES.default || { name: "White", code: "", hex: "#FFFFFF" };
      setSelectedShade({
        id: `default-${product.brand}-${def.code}`,
        name: def.name,
        shadeCode: def.code,
        hex: def.hex,
        brand: product.brand,
      });
    }
  }, [isPaint, product]);

  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === "number") return priceVal;
    if (typeof priceVal === "string")
      return parseFloat(priceVal.replace(/[^0-9.]/g, ""));
    return 0;
  };
  const unitPrice = parsePrice(product.price);

  const totalPrice = useMemo(() => {
    if ((product as any)?.sizePrices && (product as any).sizePrices[selectedSize]) {
      return (product as any).sizePrices[selectedSize];
    }
    let discountFactor = 1;
    if (product.unit === 'kg') {
      if (selectedSize === 5) discountFactor = 0.94;
      if (selectedSize === 20) discountFactor = 0.53;
      if (selectedSize === 25) discountFactor = 0.8;
      if (selectedSize === 40) discountFactor = 0.472;
      if (selectedSize === 50) discountFactor = 0.628;
    } else {
      if (selectedSize === 4) discountFactor = 0.96;
      if (selectedSize === 10) discountFactor = 0.92;
      if (selectedSize === 20) discountFactor = 0.88;
    }
    return Math.round(unitPrice * selectedSize * discountFactor);
  }, [unitPrice, selectedSize, product.unit, (product as any)?.sizePrices]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: `${product.id}-${selectedSize}${selectedShade && selectedShade.shadeCode ? `-${selectedShade.shadeCode}` : "-white"}`,
      productId: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      size: selectedSize,
      quantity: quantity,
      unitPrice: totalPrice / selectedSize,
      shade: selectedShade
        ? {
            name: selectedShade.name,
            code: selectedShade.shadeCode,
            hex: selectedShade.hex,
          }
        : undefined,
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl bg-white"
      >
        <div className="flex justify-between items-center p-4 border-b border-zinc-100 bg-zinc-50/50">
          <h2 className="text-base font-bold text-zinc-900 line-clamp-1">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-200/60 text-zinc-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-5">
          <div className="flex gap-4">
            <div className="w-2/5 shrink-0 flex items-center justify-center p-2 bg-zinc-50 rounded-lg border border-zinc-100 rounded-xl overflow-hidden relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              ) : (
                <div className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest text-center">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-1">
              {product.properties && product.properties.length > 0 ? (
                <div>
                  <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">
                    Key Features
                  </h3>
                  <ul className="text-[11px] font-medium text-zinc-700 space-y-2">
                    {product.properties
                      .slice(0, 3)
                      .map((prop: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 leading-tight"
                        >
                          <div className="w-1 h-1 rounded-full bg-gold mt-1.5 shrink-0" />
                          <span className="line-clamp-2 title-case">
                            {prop}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <div className="h-full flex flex-col justify-center">
                  <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                    {product.brand}
                  </p>
                  <p className="text-xs font-medium text-zinc-700 line-clamp-3">
                    {product.name}
                  </p>
                </div>
              )}
            </div>
          </div>

          {hasCustomShades && (
            <div className="pt-2 border-t border-zinc-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em]">
                  Select Color / Shade
                </h3>
                {selectedShade && (
                  <span className="text-[10px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                    {selectedShade.name} ({selectedShade.shadeCode})
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {product.shades.map((shade: any) => {
                  const isSelected = selectedShade?.shadeCode === shade.code;
                  return (
                    <button
                      key={shade.code}
                      type="button"
                      onClick={() =>
                        setSelectedShade({
                          id: `custom-shade-${product.id}-${shade.code}`,
                          name: shade.name,
                          shadeCode: shade.code,
                          hex: shade.hex,
                          brand: product.brand,
                        })
                      }
                      className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-gold bg-gold/10 ring-1 ring-gold/30"
                          : "border-zinc-200 bg-white hover:border-zinc-300"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-zinc-300 shrink-0"
                        style={{ backgroundColor: shade.hex }}
                      />
                      <span className="text-xs font-semibold text-zinc-900 truncate">
                        {shade.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              {allowRalShades && (
                <RalShadePicker
                  currentShade={selectedShade}
                  onSelect={(shade) => setSelectedShade(shade)}
                />
              )}
            </div>
          )}

          {!hasCustomShades && isPaint && (
            <div className="pt-2 border-t border-zinc-100">
              <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">
                Color Shade
              </h3>
              <InlineShadePicker
                brand={product.brand}
                currentShade={selectedShade}
                onSelect={(shade) => setSelectedShade(shade)}
              />
            </div>
          )}

          <div className="pt-2 border-t border-zinc-100">
            <h3 className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-2">
              Select Size
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              {productSizes.map((size: number) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setQuantity(1);
                  }}
                  className={`flex-1 py-2 rounded-lg border font-bold text-xs transition-all ${
                    selectedSize === size
                      ? "bg-gradient-gold text-white border-transparent shadow-md"
                      : "bg-white border-zinc-200 text-zinc-600 hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {size < 1 ? `${size * 1000}ml` : `${size}${product.unit || 'L'}`}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <div className="flex justify-between items-end mb-4 bg-zinc-50 rounded-xl p-3 border border-zinc-100">
              <div>
                <p className="text-[10px] text-gold font-bold uppercase">
                  {selectedSize < 1 ? `${selectedSize * 1000}ml pack` : `${selectedSize}${product.unit || 'L'} pack`} {quantity > 1 ? `x ${quantity}` : ""}
                </p>
                <p className="text-xl font-bold text-zinc-900 leading-none mt-1.5 mb-0.5">
                  ₹{totalPrice.toLocaleString()}
                </p>
                <p className="text-[9px] text-zinc-600 font-medium tracking-wide">
                  Incl. of all taxes
                </p>
                {selectedSize > 1 && (
                  <p className="text-[10px] text-zinc-600 mt-1.5 uppercase tracking-wider">
                    ₹{Math.round(totalPrice / selectedSize).toLocaleString()} /
                    {product.unit === 'kg' ? ' Kg' : ' Liter'}
                  </p>
                )}
              </div>

              <div className="flex items-center border border-zinc-200 rounded-lg p-0.5 bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 hover:bg-zinc-100 rounded text-zinc-600 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-bold text-xs text-zinc-900 select-none w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 hover:bg-zinc-100 rounded text-zinc-600 transition-colors"
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
                  ? "bg-green-500 text-white shadow-[0_8px_20px_rgba(34,197,94,0.3)]"
                  : "bg-gradient-gold hover:opacity-90 text-white shadow-[0_8px_20px_rgba(184,151,90,0.25)] active:scale-[0.98]"
              }`}
            >
              {justAdded ? "Added to Cart" : "+ Add to Cart"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const getCategoryBadgeStyle = (category: string) => {
  if (!category)
    return "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200";
  const cat = category.toLowerCase();
  if (cat.includes("interior"))
    return "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100";
  if (cat.includes("exterior"))
    return "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100";
  if (cat.includes("primer"))
    return "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100";
  if (cat.includes("waterproof"))
    return "bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100";
  if (cat.includes("wood"))
    return "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100";
  if (cat.includes("metal") || cat.includes("grill"))
    return "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100";
  if (cat.includes("epoxy") || cat.includes("pu ") || cat.includes("enamel"))
    return "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100";
  if (cat.includes("industrial"))
    return "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100";
  return "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200";
};

const ProductCard = memo(({ product }: { product: any }) => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);

  const {
    items: wishlistItems,
    addItem: wishlistAddItem,
    removeItem: wishlistRemoveItem,
    addToast,
  } = useWishlistStore();
  const { user, openAuthModal } = useAuthStore();

  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === "number") return priceVal;
    if (typeof priceVal === "string")
      return parseFloat(priceVal.replace(/[^0-9.]/g, ""));
    return 0;
  };
  const unitPrice = parsePrice(product.price);

  const isWishlisted = useMemo(() => {
    return wishlistItems.some((item) =>
      item.id.startsWith(`prod_${product.id}`),
    );
  }, [wishlistItems, product.id]);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      addToast({
        productName: product.name,
        message: "Please sign in to add products to your wishlist.",
        isError: true,
      });
      openAuthModal();
      return;
    }
    if (isWishlisted) {
      const itemToRemove = wishlistItems.find((item) =>
        item.id.startsWith(`prod_${product.id}`),
      );
      if (itemToRemove) {
        wishlistRemoveItem(itemToRemove.id, user?.uid || null);
      }
    } else {
      wishlistAddItem(
        {
          type: "product",
          productId: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          size: (product.sizes && product.sizes[0]) || 1,
          shadeName: "White",
          shadeCode: "white",
          shadeHex: "#FFFFFF",
        },
        user?.uid || null,
      );
    }
  };

  return (
    <>
      <motion.div
        id={`product-card-${product.id}`}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative rounded-2xl bg-white border border-zinc-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-zinc-300 hover:-translate-y-1 h-full"
      >
        <Link 
          to={`/p/${product.slug || product.name.replace(/\s+/g, "-").toLowerCase()}`}
          className="absolute inset-0 z-10"
          title={`${product.name} - Buy online`}
        />
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
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-600 group-hover/heart:text-red-500"}`}
          />
        </button>

        <div className="relative flex items-center justify-center bg-white shrink-0 group-hover:bg-zinc-50 transition-colors border-b border-zinc-100 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={`${product.name} by ${product.brand} - ${product.category}`}
              title={`${product.name} - Buy online at wholesale price`}
              referrerPolicy="no-referrer"
              className="w-full h-32 sm:h-40 object-contain object-center group-hover:scale-105 transition-transform duration-500 mix-blend-multiply block"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-300">
              <span className="text-[10px] font-medium uppercase tracking-widest">
                No Image
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-1 gap-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
              {product.brand}
            </p>
            {((product as any).subCategories || (product.subCategory ? [product.subCategory] : [])).map((sub: string, index: number) => (
              <span
                key={index}
                className={`text-[7px] sm:text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest truncate shrink-0 max-w-[110px] border transition-colors ${getCategoryBadgeStyle(sub)}`}
                title={sub}
              >
                {sub}
              </span>
            ))}
          </div>
          <h3 className="text-xs sm:text-[13px] font-bold text-ivory leading-tight mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-auto pt-2.5 sm:pt-3 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-2.5 sm:mb-3">
              <div className="flex items-baseline gap-1.5 ">
                <p className="text-[9px] sm:text-[10px] text-gold font-bold uppercase tracking-wider">
                  From
                </p>
                <p className="text-sm sm:text-base font-bold text-ivory tracking-tight">
                  ₹{unitPrice.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-auto relative z-20">
              <Link
                to={`/p/${product.slug || product.name.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex items-center justify-center py-1.5 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-bold text-ivory/60 bg-zinc-100 hover:bg-zinc-200 hover:text-ivory transition-colors uppercase tracking-widest text-center"
              >
                Details
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setShowAddModal(true);
                }}
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
          <AddToCartModal
            product={product}
            onClose={() => setShowAddModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
});

export default function ProductsSection({
  initialCategory,
  initialBrand,
  pageTitle,
  pageDescription,
}: {
  initialCategory?: string;
  initialBrand?: string;
  pageTitle?: string;
  pageDescription?: string;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParam = initialBrand || searchParams.get("brand") || "All Brands";

  const [activeCategoryFilter, setActiveCategoryFilter] = useState(
    initialCategory || "All Categories",
  );
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Changed to 12 for better grid alignment
  const categoryRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const brandScrollRef = useRef<HTMLDivElement>(null);

  const scrollCircles = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [activeBrand, setActiveBrand] = useState(brandParam);
  const [sortOption, setSortOption] = useState("Most Popular");
  const { searchQuery } = useProductSearchStore();
  const [showAsianFinishesShowroom, setShowAsianFinishesShowroom] =
    useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbBrands, setDbBrands] = useState<string[]>([]);
  const [dbCategories, setDbCategories] = useState<
    { name: string; subCategories: string[] }[]
  >([]);

  useEffect(() => {
    setActiveBrand(brandParam);
  }, [brandParam]);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategoryFilter(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const unsubProducts = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const list: any[] = [];
        snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
        setDbProducts(list);
      },
      (error) => {
        console.warn("Products listener error:", error);
      },
    );

    const unsubBrands = onSnapshot(
      collection(db, "brands"),
      (snapshot) => {
        const list: string[] = [];
        snapshot.forEach((d) => list.push(d.data().name));
        setDbBrands(list);
      },
      (error) => {
        console.warn("Brands listener error:", error);
      },
    );

    const unsubCategories = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const catMap: Record<string, Set<string>> = {};
        snapshot.forEach((d) => {
          const name = d.data().name;
          if (!catMap[name]) catMap[name] = new Set();
        });
        // also scrape subcategories from dbProducts to populate the UI realistically
        setDbCategories(
          Object.keys(catMap).map((k) => ({ name: k, subCategories: [] })),
        );
      },
      (error) => {
        console.warn("Categories listener error:", error);
      },
    );

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
    mockProducts.forEach((p) => {
      const key = p.name ? p.name.trim().toLowerCase() : p.id?.toString();
      map.set(key, p);
    });
    const blacklistedIds = ['FtYxbQJggWPGiFQmCZqU', 'cfC16vcJc7Y6SuG8I0io', 'urWWhE0zkeCmRzBcTHqw', 'KQsvJ6kbraBWrRqaiLPB', 'mcHNBwzpaibtkqkGeMkE'];

    dbProducts.forEach((p) => {
      if (blacklistedIds.includes(p.id)) return;
      let mergedProduct = { ...p };
      let key = mergedProduct.name ? mergedProduct.name.trim().toLowerCase() : mergedProduct.id?.toString();

      if (key === "protecton epilux 4 mio coating" || key === "berger paints red oxide zinc chromate metal primer is2074") {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Paints Red Oxide Zinc Chromate Metal Primer IS2074",
          seoTitle: "Berger Paints Red Oxide Zinc Chromate Metal Primer IS2074",
          subCategory: "Primers",
          price: "₹ 2,834.00",
          sizes: [20],
          sizePrices: { 20: 2834 },
          unit: "L",
          properties: [
            "Red Oxide Zinc Chromate Anti-Corrosive Metal Primer conforming to IS 2074",
            "Dual active-passive rust protection for structural steel and iron surfaces",
            "Excellent adhesion, leveling, and barrier resistance in industrial environments",
            "Ideal foundation coat for synthetic enamels, alkyd, and industrial topcoats"
          ],
          image: "/assets/aistudio/berger_protection_br_rozc_prim_2074_pq_zinc_chroma_1789721975_19d96e46.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "protecton yellow zinc chromate primer" || key === "berger industrial zinc yellow primer") {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Industrial Zinc Yellow Primer",
          seoTitle: "Berger Industrial Zinc Yellow Primer",
          image: "/assets/aistudio/Berger_Industrial_Zinc_Primer_Drum_2b7eeb0c.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "protecton grey oxide zinc chromate primer" || key === "berger paints industrial bison zinc phosphate grey primer") {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Paints Industrial Bison Zinc Phosphate Grey Primer",
          seoTitle: "Berger Paints Industrial Bison Zinc Phosphate Grey Primer",
          properties: [
            "Single-Pack High Corrosion Protective Grey Metal Primer",
            "Formulated with Zinc Phosphate pigments for active anti-rust protection",
            "Outstanding adhesion on steel sheets and structural trusses",
            "Ensures high build foundation and excellent topcoat adhesion"
          ],
          image: "/assets/aistudio/5a50c524-2a35-4a96-8e39-799a97d1c66a_02114f07.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "protecton epilux 155 hb coating" || key === "berger industrial epoxy paint - epilux 155 hb enamel paint") {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint",
          seoTitle: "Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint | Buy Online",
          seoDescription: "Buy Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint in 4L (₹1,480) & 20L (₹6,800) packs. Heavy-duty two-pack polyamide epoxy coating in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
          seoKeywords: "Berger Industrial Epoxy Paint, Epilux 155 HB Enamel Paint, Berger Protecton Epilux 155 HB, industrial epoxy enamel 4L 20L, RAL shade epoxy paint, Dark Grey Smoke Grey Golden Yellow Signal Red Blue Green epoxy",
          subCategory: "Epoxy Paint",
          price: "₹ 1,480.00",
          sizes: [4, 20],
          sizePrices: { 4: 1480, 20: 6800 },
          unit: "L",
          shades: STANDARD_ENAMEL_INDUSTRIAL_SHADES,
          allowRalShades: true,
          properties: [
            "Two-Pack High-Build Polyamide-Cured Industrial Epoxy Enamel (3:1 Mixing Ratio)",
            "Superior defense against water condensation, mineral oils, and chemical splashes",
            "Hard, abrasion-resistant gloss/semi-gloss topcoat for structural steel & machinery",
            "Available in 4L & 20L packs — White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & RAL codes"
          ],
          image: "/assets/aistudio/Green_Berger_Epilux_Industrial_Paint_Drum_9548146d.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "luxol high gloss enamel" || key === "luxol high gloss enamel paint") {
        mergedProduct = {
          ...mergedProduct,
          name: "Luxol High Gloss Enamel Paint",
          seoTitle: "Luxol High Gloss Enamel Paint by Berger Paints | Buy Online",
          seoDescription: "Buy Berger Luxol High Gloss Enamel Paint online at wholesale prices. Mirror-like high-gloss solvent-based enamel for wood & metal surfaces in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
          seoKeywords: "Luxol High Gloss Enamel Paint, Berger Luxol Hi-Gloss Enamel, Luxol Enamel Paint, metal and wood enamel paint, high gloss synthetic enamel, RAL shade enamel paint",
          properties: [
            "Mirror-Like High-Gloss Enamel Finish",
            "Tough, Stain & Scratch-Resistant Protective Film",
            "Anti-Corrosive Shield for Wood, Metal Grills & Doors",
            "Available in 8 Standard Colors & Custom RAL Shade Codes"
          ],
          image: "/assets/aistudio/Lewis_Berger_LUXOL_Red_Paint_Can_98daa79b.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "just spray js1 acrylic spray paint - classic shades" || key === "acrylic spray paint just spray classic shades") {
        mergedProduct = {
          ...mergedProduct,
          name: "Acrylic Spray Paint Just Spray Classic Shades",
          seoTitle: "Acrylic Spray Paint Just Spray Classic Shades | Buy Online",
          seoDescription: "Buy Acrylic Spray Paint Just Spray Classic Shades (400ml Aerosol Can) online at wholesale prices. Fast-drying 100% pure acrylic spray paint in Glossy Black, Glossy White, Signal Red, Matt Black, Medium Yellow & Forest Green.",
          seoKeywords: "Acrylic Spray Paint Just Spray Classic Shades, Just Spray Acrylic Spray Paint, Just Spray Thailand 400ml, aerosol spray paint, fast dry acrylic spray paint, classic shades spray paint",
          image: "/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png",
          shades: Array.isArray(mergedProduct.shades)
            ? mergedProduct.shades.map((s: any) => ({
                ...s,
                image: "/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png"
              }))
            : mergedProduct.shades
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "mrf metalcoat polyurethane finish" || key === "mrf metalcoat luxury 2k pu paint finish - for metal and wood" || key === "mrf metalcoat luxury 2k pu paint - metal and wood finish") {
        mergedProduct = {
          ...mergedProduct,
          name: "MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish",
          seoTitle: "MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish",
          seoDescription: "Buy MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish online at wholesale prices. Two-component non-yellowing polyurethane coating for metal gates, grilles, wood doors & industrial structures in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
          seoKeywords: "MRF MetalCoat Luxury 2K PU Paint, Metal and Wood Finish, MRF MetalCoat PU Paint, 2K PU Paint for Metal and Wood, MRF Vapocure MetalCoat, RAL shade PU paint",
          properties: [
            "Two-component luxury 2K polyurethane (PU) finish for metal and wood",
            "Outstanding non-yellowing high-gloss or matt finish",
            "Superior abrasion, scratch, and chemical splash resistance",
            "Perfect for metal gates, wooden doors, automotive touchups & industrial structures"
          ]
        };
        key = mergedProduct.name.toLowerCase();
      }

      // Retain accurate images for specific products from mock data
      const accurateImageNames = [
        "royale glitz reserve",
        "apcolite all protek shyne",
        "royale health shield",
        "apex tile guard matt",
        "apex ultima stretch",
        "weathercoat glow"
      ];
      
      const accurateImagesMap: Record<string, string> = {
        "royale glitz reserve": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/royale-glitz-reserv-new-packshot.png",
        "apcolite all protek shyne": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-all-protek-shyne-packshot-asian-paints.png",
        "royale health shield": "https://5.imimg.com/data5/SELLER/Default/2023/7/326440889/MP/SF/RA/22649264/asian-paints-royale-health-shield-500x500.jpg",
        "apex tile guard matt": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-tile-guard.png",
        "apex ultima stretch": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/ultima-stretch-packshot-asian-paints.png",
        "weathercoat glow": "https://5.imimg.com/data5/SELLER/Default/2021/7/OI/YW/AW/102796245/berger-weathercoat-glow-exterior-emulsion.jpg"
      };

      if (accurateImageNames.includes(key)) {
        mergedProduct.image = accurateImagesMap[key];
      } else {
        const existingMock = map.get(key);
        if (existingMock && (!mergedProduct.image || mergedProduct.image === "" || existingMock.brand === "Berger Paints")) {
          mergedProduct.image = existingMock.image;
        }
      }
      map.set(key, mergedProduct);
    });
    
    const removedNames = [
      'Tractor Sparc Emulsion',
      'Tractor Uno Acrylic Distemper',
      'Tractor Emulsion Shyne',
      'Apcolite Premium Satin Emulsion',
      'Apcolite Advanced Emulsion',
      'Apex Advanced',
      'Floor Epoxy Coating',
      'Food Grade Epoxy',
      'MIO Coatings',
      'BP Red Oxide Primer',
      'Luxol Metal Primer'
    ].map(n => n.toLowerCase());

    const finalProducts = Array.from(map.values()).filter(p => !removedNames.includes(p.name?.toLowerCase()));

    // Process categories updates based on latest requirements
    let updatedProducts = finalProducts.map(p => {
      let updatedP = { ...p };
      const nameLower = updatedP.name?.toLowerCase() || '';
      
      let subs = updatedP.subCategory ? [updatedP.subCategory] : [];

      subs = subs.map(sub => {
        if (sub === "Primer" || sub === "Undercoats") return "Primers";
        if (sub === "Interior Wall") return "Interior Paint";
        if (sub === "Exterior Wall") return "Exterior Paint";
        if (sub === "Metals and Grills" || sub === "Metal and Grills") return "Enamel Paint";
        if (sub === "PU Coatings") return "PU Paint";
        if (sub === "Epoxy Coatings") return "Epoxy Paint";
        if (sub === "Color Oxides" || sub === "Colour Oxide") {
          return nameLower.includes("gorila") ? "Wood Finishes" : sub;
        }
        if (sub === "Abrasives & Sandpapers" || sub === "Abrasives and Sandpapers") return "Painting Tools";
        return sub;
      });

      if (nameLower.includes("putty") || nameLower.includes("white cement")) {
        subs.push("Primers");
      }
      if (nameLower.includes("2 in 1") || nameLower.includes("2-in-1") || nameLower.includes("two in one")) {
         subs.push("Interior Paint", "Exterior Paint");
      }
      if (nameLower.includes("exterior primer")) {
         subs.push("Exterior Paint", "Primers");
      }
      if (nameLower.includes("interior primer")) {
         subs.push("Interior Paint", "Primers");
      }
      if (nameLower.includes("damp sheath exterior") || nameLower === "damp sheath exterior") {
         subs.push("Exterior Paint", "Primers", "Waterproofing");
      }
      if (nameLower.includes("damp sheath interior")) {
         subs.push("Interior Paint", "Primers", "Waterproofing");
      }
      if (nameLower.includes("tile adhesive") || nameLower.includes("tile bonder") || nameLower.includes("grout")) {
         subs.push("Tile Adhesives", "Waterproofing");
      }
      if (nameLower.includes("damp proof") || nameLower.includes("waterproof")) {
         subs.push("Waterproofing");
      }
      if (nameLower.includes("wood primer") || nameLower.includes("wood filler")) {
         subs.push("Primers", "Wood Finishes");
      }
      if (nameLower.includes("woodtech") || nameLower.includes("trucare wood") || nameLower.includes("touchwood")) {
         subs.push("Wood Finishes");
      }
      if (nameLower.includes("enamel")) {
         subs.push("Synthetic Enamels", "Enamel Paint", "Wood Finishes");
      }
      if (nameLower.includes("metal primer") || nameLower.includes("epoxy finish")) {
         subs.push("Primers", "Enamel Paint");
      }
      if (nameLower.includes("aluminium paint") || nameLower.includes("black board paint")) {
         subs.push("Enamel Paint", "Synthetic Enamels");
      }
      
      updatedP.subCategories = Array.from(new Set(subs));
      if (updatedP.subCategories.length > 0) {
        updatedP.subCategory = updatedP.subCategories[0];
      }
      
      return applyStandardEnamelIndustrialShades(updatedP);
    });
    
    // Filter out remaining color oxides
    updatedProducts = updatedProducts.filter(p => !p.subCategories.includes("Color Oxides") && !p.subCategories.includes("Colour Oxide"));

    return updatedProducts;

  }, [dbProducts]);
  const availableBrands = useMemo(() => {
    const fromProducts = Array.from(
      new Set(productList.map((p) => p.brand).filter(Boolean)),
    );
    const merged = new Set([...fromProducts, ...dbBrands]);
    return Array.from(merged);
  }, [productList, dbBrands]);

  const dynamicCategories = useMemo(() => {
    const map: Record<string, Set<string>> = {};
    dbCategories.forEach((c) => (map[c.name] = new Set()));

    productList.forEach((p) => {
      if (p.topCategory) {
        if (!map[p.topCategory]) map[p.topCategory] = new Set();
        let subs = (p as any).subCategories || (p.subCategory ? [p.subCategory] : []);
        subs.forEach((sub: string) => {
          map[p.topCategory!].add(sub);
        });
      }
    });

    // Add default mock categories if map is empty
    if (Object.keys(map).length === 0) {
      map["Exterior"] = new Set(["Exterior Paint"]);
      map["Interior"] = new Set(["Interior Paint"]);
      map["Waterproofing"] = new Set(["Waterproofing Solutions"]);
    }

    return Object.keys(map).map((k) => ({
      name: k,
      subCategories: Array.from(map[k]),
    }));
  }, [dbCategories, productList]);

  const categoryBubblesData = useMemo(() => {
    const defaultImages: Record<string, string> = {
      "Interior Paint": "https://img.icons8.com/color/144/living-room.png",
      "Interior Wall": "https://img.icons8.com/color/144/living-room.png",
      "Exterior Paint": "https://img.icons8.com/color/144/home.png",
      "Exterior Wall": "https://img.icons8.com/color/144/home.png",
      "Primers": "https://img.icons8.com/color/144/paint-bucket.png",
      "Undercoats": "https://img.icons8.com/color/144/paint-bucket.png",
      "Primer": "https://img.icons8.com/color/144/paint-bucket.png",
      "Waterproofing": "https://img.icons8.com/color/144/water.png",
      "Wood Finishes": "https://img.icons8.com/color/144/wood.png",
      "Enamel Paint": "https://img.icons8.com/color/144/metal.png",
      "Metals and Grills": "https://img.icons8.com/color/144/metal.png",
      "PU Paint": "https://img.icons8.com/color/144/paint.png",
      "PU Coatings": "https://img.icons8.com/color/144/paint.png",
      "Epoxy Paint": "https://img.icons8.com/color/144/test-tube.png",
      "Epoxy Coatings": "https://img.icons8.com/color/144/test-tube.png",
      "Painting Tools": "https://img.icons8.com/color/144/paint-brush.png",
      "Tools": "https://img.icons8.com/color/144/paint-brush.png",
      "Power Tools": "https://img.icons8.com/color/144/drill.png",
      "Synthetic Enamels": "https://img.icons8.com/color/144/paint-can.png",
      "Industrial": "https://img.icons8.com/color/144/factory.png",
      "Tile Adhesives": "https://img.icons8.com/color/144/brick-wall.png",
      "Thinners & Solvents": "https://img.icons8.com/color/144/flask.png",
    };

    const fallbackImages = [
      "https://img.icons8.com/color/144/paint-palette.png",
    ];

    // Extract unique subcategories
    const uniqueSubs = new Set<string>();
    productList.forEach((p) => {
      let subs = (p as any).subCategories || (p.subCategory ? [p.subCategory] : []);
      subs.forEach((sub: string) => uniqueSubs.add(sub));
    });

    return Array.from(uniqueSubs)
      .sort()
      .map((name) => {
        let image = defaultImages[name];
        if (!image) {
          const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
          image = fallbackImages[hash % fallbackImages.length];
        }
        return {
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
          image,
        };
      });
  }, [productList]);

  const totalSubCategories = useMemo(
    () =>
      dynamicCategories.reduce((acc, cat) => acc + cat.subCategories.length, 0),
    [dynamicCategories],
  );

  const handleBrandChange = (brand: string) => {
    if (brand === "All Brands") {
      searchParams.delete("brand");
    } else {
      searchParams.set("brand", brand);
    }
    setSearchParams(searchParams);
  };

  const filtered = productList.filter((p) => {
    const pSubs: string[] = (p as any).subCategories || (p.subCategory ? [p.subCategory] : []);
    const matchCat =
      activeCategoryFilter === "All Categories" ||
      (activeCategoryFilter.startsWith("All ") &&
        p.topCategory === activeCategoryFilter.replace("All ", "")) ||
      pSubs.some(sub => sub.toLowerCase() === activeCategoryFilter.toLowerCase());

    const matchBrand =
      activeBrand === "All Brands" ||
      p.brand.toLowerCase() === activeBrand.toLowerCase();

    // Check if searchQuery is in product name or properties or subCategory
    const searchLower = searchQuery.toLowerCase();
    const matchSearch =
      searchQuery === "" ||
      (p.name && p.name.toLowerCase().includes(searchLower)) ||
      pSubs.some(sub => sub.toLowerCase().includes(searchLower)) ||
      (p.properties &&
        p.properties.some((prop: string) =>
          prop.toLowerCase().includes(searchLower),
        ));

    return matchCat && matchBrand && matchSearch;
  });

  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === "number") return priceVal;
    if (typeof priceVal === "string")
      return parseFloat(priceVal.replace(/[^0-9.]/g, ""));
    return 0;
  };

  const getFinishValue = (product: any) => {
    const text = (
      product.name +
      " " +
      (product.properties?.join(" ") || "")
    ).toLowerCase();
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
  const currentProducts = sortedAndFiltered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  const getPageNumbers = (): (number | 'ellipsis-left' | 'ellipsis-right')[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'ellipsis-left' | 'ellipsis-right')[] = [1];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    if (start > 2) {
      pages.push('ellipsis-left');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('ellipsis-right');
    }

    pages.push(totalPages);
    return pages;
  };

  return (
    <section id="products" className="relative">
      {/* Header and Sort By Inline */}
      <div className="max-w-[1400px] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 mt-2 relative z-50">
        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-ivory tracking-tight uppercase leading-none">
              {pageTitle || "All Products"}
            </h1>
            <p className="text-ivory/60 mt-2 font-light max-w-2xl text-sm sm:text-base leading-relaxed">
              {pageDescription ||
                "Explore our wide range of premium paints and hardware."}
            </p>
          </motion.div>

          {/* Page Trust Indicators & Badges */}
          <div className="border-t border-b border-zinc-100/10 py-1 sm:py-1.5">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-4 gap-1 sm:gap-2 lg:gap-3">
                {[
                  {
                    icon: ShieldCheck,
                    line1: "Authorized",
                    line2: "distributors",
                    sub: "for featured products",
                  },
                  {
                    icon: Tags,
                    line1: "Same Price",
                    line2: "as In-Store",
                    sub: "no online extra charge",
                  },
                  {
                    icon: Truck,
                    line1: "Doorstep",
                    line2: "delivery",
                    sub: "skip the trip, we deliver",
                  },
                  {
                    icon: Award,
                    line1: "20+ yrs",
                    line2: "trusted",
                    sub: "msme/gst certified",
                  },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-start sm:justify-center text-center p-1 sm:p-1.5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group hover:-translate-y-0.5"
                    >
                      <div className="w-5 h-5 sm:w-7 sm:h-7 mb-0.5 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <span className="text-gold drop-shadow-[0_2px_5px_rgba(184,151,90,0.2)]">
                          <Icon
                            className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5"
                            strokeWidth={1.5}
                          />
                        </span>
                      </div>
                      <div className="flex flex-col gap-0 overflow-hidden">
                        <p className="text-[6.5px] sm:text-[8px] md:text-[10px] font-display font-bold text-gold uppercase tracking-tight sm:tracking-wider leading-[1.1] transition-colors text-center w-full">
                          <span className="block">{item.line1}</span>
                          <span className="block">{item.line2}</span>
                        </p>
                        <p className="text-[5.5px] sm:text-[7.5px] md:text-[8.5px] text-ivory/60 font-sans tracking-tight sm:tracking-wide leading-tight max-w-[150px] mt-0.5">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div
            className="flex items-center justify-end gap-3 shrink-0 relative"
            ref={sortRef}
          >
            <div className="hidden sm:flex bg-white border border-zinc-200 shadow-sm rounded-full p-0.5 h-[36px] items-center">
              <button className="p-1.5 bg-zinc-100 text-zinc-900 rounded-full transition-colors">
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-full transition-colors">
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative w-auto">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="bg-white border border-zinc-200 hover:bg-zinc-50 transition-all rounded-full h-[36px] px-3 sm:px-4 text-[11px] font-medium text-zinc-700 outline-none shadow-sm flex items-center justify-between gap-2 sm:gap-3 w-full"
              >
                <span className="whitespace-nowrap">
                  Sort by:{" "}
                  <span className="font-bold text-zinc-900">
                    {sortOption === "Most Popular"
                      ? "Popularity"
                      : sortOption === "Price - High to Low"
                        ? "Price (High to Low)"
                        : sortOption === "Price - Low to High"
                          ? "Price (Low to High)"
                          : sortOption === "Finish - Matt First"
                            ? "Finish (Matt)"
                            : "Finish (Sheen)"}
                  </span>
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-zinc-500 shrink-0 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    className="absolute top-[calc(100%+8px)] right-0 w-[200px] sm:w-[220px] bg-white border border-zinc-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] rounded-xl py-1.5 z-[100]"
                  >
                    {[
                      { label: "Popularity", value: "Most Popular" },
                      {
                        label: "Price (Low to High)",
                        value: "Price - Low to High",
                      },
                      {
                        label: "Price (High to Low)",
                        value: "Price - High to Low",
                      },
                      {
                        label: "Finish (Matt First)",
                        value: "Finish - Matt First",
                      },
                      {
                        label: "Finish (Sheen First)",
                        value: "Finish - Sheen First",
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortOption(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[11px] sm:text-xs font-medium transition-colors ${sortOption === option.value ? "bg-zinc-50 text-gold font-bold" : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Categories & Brands Rows */}
      <div className="max-w-[1400px] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-1 flex flex-col gap-0">
        {/* Categories Row */}
        <div className="relative group/scroll flex items-center">
          <button
            onClick={() => scrollCircles("left", categoryScrollRef)}
            className="absolute -left-3 sm:-left-5 z-20 w-8 h-8 rounded-full bg-white border border-zinc-200 text-zinc-600 flex items-center justify-center hover:bg-zinc-50 hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover/scroll:opacity-100 shadow-md"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={categoryScrollRef}
            className="flex overflow-x-auto gap-3 sm:gap-5 pb-4 pt-2 px-1 scroll-smooth w-full"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            <style>{`
                div::-webkit-scrollbar { display: none; }
              `}</style>

            {/* All Categories Bubble */}
            <button
              onClick={() => setActiveCategoryFilter("All Categories")}
              className="flex flex-col items-center gap-2.5 flex-shrink-0 group w-[72px] sm:w-[90px]"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center p-0.5 shadow-sm border-2 transition-all duration-300 ${activeCategoryFilter === "All Categories" ? "border-gold shadow-md" : "border-transparent bg-zinc-50 group-hover:border-zinc-300 group-hover:shadow-md"}`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center text-zinc-600 group-hover:text-gold transition-colors">
                  <LayoutGrid className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <span
                className={`text-[9px] sm:text-[10px] text-center font-medium leading-tight transition-colors ${activeCategoryFilter === "All Categories" ? "text-gold font-bold" : "text-zinc-600 group-hover:text-zinc-900"}`}
              >
                All Categories
              </span>
            </button>

            {/* Category Bubbles */}
            {categoryBubblesData.map((cat) => (
              <button
                key={cat.slug}
                onClick={() =>
                  setActiveCategoryFilter(
                    activeCategoryFilter === cat.name
                      ? "All Categories"
                      : cat.name,
                  )
                }
                className="flex flex-col items-center gap-2.5 flex-shrink-0 group w-[72px] sm:w-[90px]"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center p-0.5 shadow-sm border-2 transition-all duration-300 ${activeCategoryFilter === cat.name || activeCategoryFilter === "All " + cat.name ? "border-gold shadow-md" : "border-transparent bg-zinc-50 group-hover:border-zinc-300 group-hover:shadow-md"}`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${activeCategoryFilter === cat.name || activeCategoryFilter === "All " + cat.name ? "bg-gold/10" : "bg-transparent group-hover:bg-black/5"}`}
                    />
                  </div>
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] text-center font-medium leading-tight transition-colors ${activeCategoryFilter === cat.name || activeCategoryFilter === "All " + cat.name ? "text-gold font-bold" : "text-zinc-600 group-hover:text-zinc-900"}`}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCircles("right", categoryScrollRef)}
            className="absolute -right-3 sm:-right-5 z-20 w-8 h-8 rounded-full bg-white border border-zinc-200 text-zinc-600 flex items-center justify-center hover:bg-zinc-50 hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover/scroll:opacity-100 shadow-md"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Brands Row */}
        <div className="relative group/scroll flex items-center pt-1 sm:pt-2 border-t border-zinc-100">
          <button
            onClick={() => scrollCircles("left", brandScrollRef)}
            className="absolute -left-3 sm:-left-5 z-20 w-8 h-8 rounded-full bg-white border border-zinc-200 text-zinc-600 flex items-center justify-center hover:bg-zinc-50 hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover/scroll:opacity-100 shadow-md"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={brandScrollRef}
            className="flex overflow-x-auto gap-3 sm:gap-5 pb-4 pt-2 px-1 scroll-smooth w-full"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {/* All Brands Bubble */}
            <button
              onClick={() => handleBrandChange("All Brands")}
              className="flex flex-col items-center gap-2.5 flex-shrink-0 group w-[72px] sm:w-[90px]"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center p-0.5 shadow-sm border-2 transition-all duration-300 ${activeBrand === "All Brands" ? "border-gold shadow-md" : "border-transparent bg-zinc-50 group-hover:border-zinc-300 group-hover:shadow-md"}`}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center text-zinc-600 group-hover:text-gold transition-colors">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>
              <span
                className={`text-[9px] sm:text-[10px] text-center font-medium leading-tight transition-colors ${activeBrand === "All Brands" ? "text-gold font-bold" : "text-zinc-600 group-hover:text-zinc-900"}`}
              >
                All Brands
              </span>
            </button>

            {/* Brand Bubbles */}
            {brandDetails.map((brand) => (
              <button
                key={brand.name}
                onClick={() =>
                  handleBrandChange(
                    activeBrand === brand.name ? "All Brands" : brand.name,
                  )
                }
                className="flex flex-col items-center gap-2.5 flex-shrink-0 group w-[72px] sm:w-[90px]"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center p-0.5 shadow-sm border-2 transition-all duration-300 ${activeBrand === brand.name ? "border-gold shadow-md" : "border-transparent bg-zinc-50 group-hover:border-zinc-300 group-hover:shadow-md"}`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-2 sm:p-2.5">
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-[8px] font-bold text-zinc-400">
                        {brand.name}
                      </span>
                    )}
                  </div>
                </div>
                <span
                  className={`text-[9px] sm:text-[10px] text-center font-medium leading-tight transition-colors ${activeBrand === brand.name ? "text-gold font-bold" : "text-zinc-600 group-hover:text-zinc-900"}`}
                >
                  {brand.name}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollCircles("right", brandScrollRef)}
            className="absolute -right-3 sm:-right-5 z-20 w-8 h-8 rounded-full bg-white border border-zinc-200 text-zinc-600 flex items-center justify-center hover:bg-zinc-50 hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover/scroll:opacity-100 shadow-md"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Active Filters Summary */}
        {(activeCategoryFilter !== "All Categories" ||
          activeBrand !== "All Brands" ||
          searchQuery) && (
          <div className="flex items-center gap-2 mb-1 overflow-x-auto pb-1 custom-scrollbar">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest shrink-0">
              Active Filters:
            </span>

            {searchQuery && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-full shrink-0">
                <Search className="w-3 h-3 text-zinc-500" />
                <span className="text-[10px] font-medium text-zinc-700">
                  "{searchQuery}"
                </span>
              </div>
            )}

            {activeCategoryFilter !== "All Categories" && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-full shrink-0 group">
                <span className="text-[10px] font-medium text-zinc-700">
                  {activeCategoryFilter}
                </span>
                <button
                  onClick={() => setActiveCategoryFilter("All Categories")}
                  className="text-zinc-400 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {activeBrand !== "All Brands" && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-full shrink-0 group">
                <span className="text-[10px] font-medium text-zinc-700">
                  {activeBrand}
                </span>
                <button
                  onClick={() => handleBrandChange("All Brands")}
                  className="text-zinc-400 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Geolocation & Delivery Estimation Header */}

        {/* Product Grid Header */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
            <p className="text-[10px] sm:text-sm text-ivory/60 font-medium font-sans whitespace-nowrap shrink-0">
              Showing{" "}
              <span className="text-ivory">{sortedAndFiltered.length}</span>{" "}
              {sortedAndFiltered.length === 1 ? "product" : "products"}
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
          <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-1.5 mt-10 mb-6 w-full max-w-full px-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-zinc-600 active:scale-95"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex items-center gap-1 max-w-full overflow-x-auto no-scrollbar">
              {getPageNumbers().map((item) =>
                typeof item === "string" ? (
                  <span
                    key={item}
                    className="w-5 sm:w-7 h-8 sm:h-10 shrink-0 flex items-center justify-center text-xs font-bold text-zinc-400 select-none"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => setCurrentPage(item)}
                    aria-current={currentPage === item ? "page" : undefined}
                    className={`min-w-8 h-8 px-1.5 sm:min-w-10 sm:h-10 sm:px-2.5 shrink-0 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                      currentPage === item
                        ? "bg-gradient-gold text-white border-transparent shadow-sm"
                        : "border border-transparent bg-white hover:bg-zinc-50 hover:border-zinc-200 text-zinc-600"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-zinc-600 active:scale-95"
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <CategorySeoBlock category={activeCategoryFilter} />
    </section>
  );
}
