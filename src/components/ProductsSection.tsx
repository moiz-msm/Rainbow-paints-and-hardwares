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
import { HD_PACKSHOT_IMAGES, upgradeCdnImageUrl } from "../constants/hdPackshotImages";
import { getWaterBasedWallPrimerConfig } from "../utils/primerSeo";
import {
  applyStandardEnamelIndustrialShades,
  STANDARD_ENAMEL_INDUSTRIAL_SHADES,
} from "../constants/industrialEnamelShades";
import { useSearchParams, useNavigate, useLocation, useNavigationType, Link } from "react-router-dom";
import {
  getRouteKey,
  getSavedCatalogPageState,
  saveCatalogPageState,
} from "../utils/scrollRestoration";
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
  const location = useLocation();
  const navigationType = useNavigationType();
  const routeKey = getRouteKey(location.pathname, location.search);
  const brandParam = initialBrand || searchParams.get("brand") || "All Brands";

  // Capture saved catalog state synchronously on initial mount when arriving via Back/Forward (POP)
  const initialRestoredStateRef = useRef(
    navigationType === "POP" ? getSavedCatalogPageState(location.key, routeKey) : null,
  );
  const restoredState = initialRestoredStateRef.current;

  const [activeCategoryFilter, setActiveCategoryFilter] = useState(
    restoredState?.activeCategoryFilter || initialCategory || "All Categories",
  );
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    restoredState?.currentPage && restoredState.currentPage >= 1
      ? restoredState.currentPage
      : 1,
  );
  const productsPerPage = 12; // Changed to 12 for better grid alignment
  const categoryRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const brandScrollRef = useRef<HTMLDivElement>(null);
  const productGridRef = useRef<HTMLDivElement>(null);

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
  const [activeBrand, setActiveBrand] = useState(
    restoredState?.activeBrand || brandParam,
  );
  const [sortOption, setSortOption] = useState(
    restoredState?.sortOption || "Most Popular",
  );
  const { searchQuery } = useProductSearchStore();
  const [selectedSidebarBrands, setSelectedSidebarBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showAsianFinishesShowroom, setShowAsianFinishesShowroom] =
    useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [dbBrands, setDbBrands] = useState<string[]>([]);
  const [dbCategories, setDbCategories] = useState<
    { name: string; subCategories: string[] }[]
  >([]);

  const prevRoutePropsRef = useRef({
    locationKey: location.key,
    brandParam,
    initialCategory,
    pathname: location.pathname,
  });

  const prevFiltersRef = useRef({
    activeCategoryFilter,
    activeBrand,
    sortOption,
    searchQuery,
  });

  // Sync route props on PUSH/REPLACE route changes and restore saved catalog state
  // on Back/Forward (POP) even when ProductsSection stays mounted across catalog routes.
  useEffect(() => {
    const prev = prevRoutePropsRef.current;
    if (prev.locationKey === location.key && prev.pathname === location.pathname && prev.brandParam === brandParam && prev.initialCategory === initialCategory) {
      return;
    }

    if (navigationType === "POP") {
      const saved = getSavedCatalogPageState(location.key, routeKey);
      const nextCat = saved?.activeCategoryFilter || initialCategory || "All Categories";
      const nextBrand = saved?.activeBrand || brandParam;
      const nextSort = saved?.sortOption || "Most Popular";
      const nextPage = saved?.currentPage && saved.currentPage >= 1 ? saved.currentPage : 1;

      prevFiltersRef.current = {
        activeCategoryFilter: nextCat,
        activeBrand: nextBrand,
        sortOption: nextSort,
        searchQuery,
      };
      setActiveCategoryFilter(nextCat);
      setActiveBrand(nextBrand);
      setSortOption(nextSort);
      setCurrentPage(nextPage);

      if (saved) {
        window.requestAnimationFrame(() => {
          if (categoryScrollRef.current && typeof saved.categoryRailScrollLeft === "number") {
            categoryScrollRef.current.scrollLeft = saved.categoryRailScrollLeft;
          }
          if (brandScrollRef.current && typeof saved.brandRailScrollLeft === "number") {
            brandScrollRef.current.scrollLeft = saved.brandRailScrollLeft;
          }
        });
      }
    } else {
      if (prev.brandParam !== brandParam) {
        setActiveBrand(brandParam);
      }
      if (prev.initialCategory !== initialCategory) {
        setActiveCategoryFilter(initialCategory || "All Categories");
      } else if (prev.pathname !== location.pathname && !initialCategory) {
        setActiveCategoryFilter("All Categories");
      }
    }

    prevRoutePropsRef.current = {
      locationKey: location.key,
      brandParam,
      initialCategory,
      pathname: location.pathname,
    };
  }, [location.key, routeKey, navigationType, brandParam, initialCategory, location.pathname, searchQuery]);

  // Restore horizontal scroll offsets of category & brand rails on Back/Forward mount
  useEffect(() => {
    if (!restoredState) return;
    const raf = window.requestAnimationFrame(() => {
      if (
        categoryScrollRef.current &&
        typeof restoredState.categoryRailScrollLeft === "number"
      ) {
        categoryScrollRef.current.scrollLeft = restoredState.categoryRailScrollLeft;
      }
      if (
        brandScrollRef.current &&
        typeof restoredState.brandRailScrollLeft === "number"
      ) {
        brandScrollRef.current.scrollLeft = restoredState.brandRailScrollLeft;
      }
    });
    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Persist current catalog view state for this history entry so Back returns to the exact spot
  useEffect(() => {
    const persistState = () => {
      saveCatalogPageState(location.key, routeKey, {
        activeCategoryFilter,
        activeBrand,
        sortOption,
        currentPage,
        categoryRailScrollLeft: categoryScrollRef.current?.scrollLeft ?? 0,
        brandRailScrollLeft: brandScrollRef.current?.scrollLeft ?? 0,
      });
    };

    persistState();

    const catRail = categoryScrollRef.current;
    const brandRail = brandScrollRef.current;
    catRail?.addEventListener("scroll", persistState, { passive: true });
    brandRail?.addEventListener("scroll", persistState, { passive: true });

    return () => {
      catRail?.removeEventListener("scroll", persistState);
      brandRail?.removeEventListener("scroll", persistState);
    };
  }, [
    location.key,
    routeKey,
    activeCategoryFilter,
    activeBrand,
    sortOption,
    currentPage,
  ]);

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

      const primerCfg = getWaterBasedWallPrimerConfig(mergedProduct.name);
      if (primerCfg) {
        const canonicalKey = primerCfg.productName.toLowerCase();
        const existingMock = map.get(canonicalKey);
        mergedProduct = {
          ...mergedProduct,
          name: primerCfg.productName,
          slug: mergedProduct.slug || existingMock?.slug || primerCfg.canonicalSlug,
        };
        key = canonicalKey;
      }

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
      } else if (key === "mrf durothane pu wood finish" || key === "mrf durothane 2k pu paint - metal and wood finish" || key === "mrf durothane 2k pu paint -metal and wood finish") {
        mergedProduct = {
          ...mergedProduct,
          name: "MRF Durothane 2K PU Paint - Metal and Wood Finish",
          seoTitle: "MRF Durothane 2K PU Paint - Metal and Wood Finish",
          seoDescription: "Buy MRF Durothane 2K PU Paint - Metal and Wood Finish online at wholesale prices. Premium two-pack 2K polyurethane coating for wooden doors, furniture & metal surfaces with scratch, water & chemical resistance.",
          seoKeywords: "MRF Durothane 2K PU Paint, Metal and Wood Finish, MRF Durothane PU Wood Finish, 2K PU Paint for Metal and Wood, MRF Vapocure Durothane, polyurethane metal wood coating",
          properties: [
            "Premium two-pack 2K polyurethane finish for metal and wood",
            "Exceptional gloss retention, clarity & smooth film build",
            "Outstanding resistance to scratching, water, and domestic chemicals",
            "Suitable for wooden doors, furniture, gates & heavy-wear metal and wood surfaces"
          ]
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "pu enamel" || key === "luxol pu enamel paint - for metal and wood finishes") {
        mergedProduct = {
          ...mergedProduct,
          name: "Luxol PU Enamel Paint - For Metal and Wood Finishes",
          seoTitle: "Luxol PU Enamel Paint - For Metal and Wood Finishes",
          seoDescription: "Buy Berger Luxol PU Enamel Paint - For Metal and Wood Finishes online at wholesale prices. 4 Years Warranty polyurethane enamel for wooden doors, furniture, gates & metal surfaces in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
          seoKeywords: "Luxol PU Enamel Paint, Luxol PU Enamel, Metal and Wood Finishes, Berger Luxol PU Enamel, polyurethane enamel paint, RAL shade PU enamel",
          properties: [
            "Engineering Grade Polyurethane (PU) Enamel for Metal & Wood Finishes (4 Years Warranty)",
            "Extreme Hardness & Absolute Scratch Shield",
            "Maintains High Gloss and Color without Yellowing in UV",
            "Available in 8 Standard Colors & Custom RAL Shade Codes"
          ],
          image: "/assets/aistudio/Berger_Luxol_PU_Enamel_Paint_Can_fe1cf491.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "mrf zameen floor coat" || key === "mrf zameen 2k pu floor paint - for concrete and paver blocks surfaces") {
        mergedProduct = {
          ...mergedProduct,
          name: "MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces",
          seoTitle: "MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces",
          seoDescription: "Buy MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces online at wholesale prices. Heavy-duty two-pack 2K polyurethane floor coating for concrete driveways, interlocking paver blocks, garage floors & industrial bays in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
          seoKeywords: "MRF Zameen 2K PU Floor Paint, For Concrete and Paver Blocks Surfaces, MRF Zameen Floor Coat, 2K PU Floor Paint, concrete driveway paint, paver block floor coating, MRF Vapocure Zameen",
          properties: [
            "Heavy-duty 2K polyurethane floor paint for concrete and paver blocks surfaces",
            "Extreme abrasion resistance against forklift, car tire, and heavy foot traffic",
            "Superior resistance to oil, grease, detergents, water, and chemical spills",
            "Ideal for concrete driveways, paver blocks, garage floors, showrooms & walkways"
          ]
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "luxol anti rust 1k qd epoxy primer grey" || key === "luxol anti-rust quick drying epoxy primer") {
        mergedProduct = {
          ...mergedProduct,
          name: "Luxol Anti Rust 1K QD Epoxy Primer Grey",
          seoTitle: "Luxol Anti Rust 1K QD Epoxy Primer Grey by Berger Paints | Buy Online",
          seoDescription: "Buy Berger Luxol Anti Rust 1K QD Epoxy Primer Grey online at wholesale prices. Quick-drying single-pack (1K) anti-corrosive epoxy metal primer for steel, wood & masonry. Touch dry in 20 mins; available in 1L (₹440), 4L (₹1,550) & 20L (₹6,900) packs.",
          seoKeywords: "Luxol Anti Rust 1K QD Epoxy Primer Grey, Berger Luxol Quick Drying Epoxy Primer, 1K Epoxy Primer Grey, Berger anti rust metal primer, quick dry epoxy primer 1L 4L 20L",
          price: "₹ 440.00",
          sizes: [1, 4, 20],
          sizePrices: { 1: 440, 4: 1550, 20: 6900 },
          unit: "L",
          image: "/assets/aistudio/Lewis_Berger_Luxol_Anti-Rust_Primer_187bd4e7.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "mrf single pack epoxy primer grey" || key === "mrf vapocure spep single pack epoxy primer grey") {
        mergedProduct = {
          ...mergedProduct,
          name: "MRF Single Pack Epoxy Primer Grey",
          seoTitle: "MRF Single Pack Epoxy Primer Grey (SPEP) | MRF Vapocure | Buy Online",
          seoDescription: "Buy MRF Single Pack Epoxy Primer Grey (Vapocure SPEP) online at wholesale prices. Fast-drying 1K solvent-based epoxy metal primer for mild steel, industrial fabrication & automotive parts. Available in 1L (₹420) & 4L (₹1,560) packs.",
          seoKeywords: "MRF Single Pack Epoxy Primer Grey, MRF Vapocure SPEP Grey, MRF SP EP Primer Grey, 1K epoxy primer metal, single pack epoxy primer 1L 4L, anti corrosive grey primer",
          price: "₹ 420.00",
          sizes: [1, 4],
          sizePrices: { 1: 420, 4: 1560 },
          unit: "L",
          image: "/assets/aistudio/MRF_Vapocure_SPEP_Epoxy_Primer_Tin_671ab43b.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "pure turpentine oil (local brand)" || key === "turpentine oil - for thinning/drying oil paints") {
        mergedProduct = {
          ...mergedProduct,
          name: "Turpentine Oil - For Thinning/Drying Oil Paints",
          slug: "turpentine-oil-for-thinning-drying-oil-paints",
          seoTitle: "Turpentine Oil - For Thinning/Drying Oil Paints",
          seoDescription: "Buy Turpentine Oil - For Thinning/Drying Oil Paints online at wholesale prices. Pure mineral turpentine oil solvent for thinning synthetic enamels, oil paints, varnishes & cleaning painting brushes and rollers.",
          seoKeywords: "Turpentine Oil, Turpentine Oil For Thinning Drying Oil Paints, Mineral Turpentine Oil, Oil Paint Thinner, Enamel Paint Thinner, Paint Brush Cleaner, Turpentine Thinner 500ml 1L 3L 5L",
          properties: [
            "Genuine Mineral Turpentine Oil for Thinning & Drying Oil Paints",
            "Enhances Synthetic Enamel Wetting, Coverage & Brush Flow Control",
            "Effective for Cleansing Paint Brushes, Rollers & Spray Equipment",
            "Aromatic Hydrocarbon Solvent with Controlled Evaporation Rate"
          ],
          image: "/assets/aistudio/Clear_Ribbed_Water_Bottle_52311ca2.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "berger red oxide primer" || key === "berger red oxide metal primer") {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Red Oxide Primer",
          slug: "berger-red-oxide-primer",
          seoTitle: "Berger Red Oxide Primer (Solvent Thinnable) 1L & 4L | Buy Online",
          seoDescription: "Buy Berger Red Oxide Primer (Solvent Thinnable) in 1L (₹210) & 4L (₹820) tins online at wholesale prices. Alkyd-based anti-corrosive metal primer for iron gates, grills & mild steel. Surface dry in 30 mins; coverage 100-120 sq.ft/L.",
          seoKeywords: "Berger Red Oxide Primer, Berger Red Oxide Metal Primer, Solvent Thinnable Red Oxide Primer, Berger Red Oxide Primer 1L 4L price, anti rust metal primer, iron gate grill primer",
          price: "₹ 210.00",
          sizes: [1, 4],
          sizePrices: { 1: 210, 4: 820 },
          unit: "L",
          image: "/assets/aistudio/Berger_Red_Oxide_Primer_Tin_2bba15c7.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "berger bp zinc yellow primer" || key === "berger zinc yellow primer") {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger BP Zinc Yellow Primer",
          slug: "berger-bp-zinc-yellow-primer",
          seoTitle: "Berger BP Zinc Yellow Primer (Solvent Thinnable) 1L & 4L | Buy Online",
          seoDescription: "Buy Berger BP Zinc Yellow Primer (Solvent Thinnable) in 1L (₹290) & 4L (₹1,120) tins online at wholesale prices. Micro-zinc alkyd anti-corrosive primer for mild steel, GI, aluminum & coastal environments. Green Pro Certified.",
          seoKeywords: "Berger BP Zinc Yellow Primer, Berger Zinc Yellow Primer, Zinc Chromate Metal Primer 1L 4L, Berger Solvent Thinnable Zinc Yellow Primer, non ferrous metal primer, anti corrosive yellow primer",
          price: "₹ 290.00",
          sizes: [1, 4],
          sizePrices: { 1: 290, 4: 1120 },
          unit: "L",
          image: "/assets/aistudio/Berger_BP_Zinc_Yellow_Primer_Tin_147c7eea.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "mrf xuper yellow primer" || key === "mrf vapocure xuper yellow primer") {
        mergedProduct = {
          ...mergedProduct,
          name: "MRF Xuper Yellow Primer",
          slug: "mrf-xuper-yellow-primer",
          seoTitle: "MRF Xuper Yellow Primer (Vapocure V254) 1L & 4L | Buy Online",
          seoDescription: "Buy MRF Xuper Yellow Primer (MRF Vapocure V254 Zinc Chrome Yellow Metal Primer) in 1L (₹360) & 4L (₹1,420) tins online at wholesale prices. Fast-drying ~30 min surface dry anti-rust primer for iron, mild steel & structural fabrication.",
          seoKeywords: "MRF Xuper Yellow Primer, MRF Vapocure Xuper Yellow Primer, MRF Zinc Chrome Yellow Primer V254, MRF Yellow Metal Primer 1L 4L, fast dry metal primer",
          price: "₹ 360.00",
          sizes: [1, 4],
          sizePrices: { 1: 360, 4: 1420 },
          unit: "L",
          image: "/assets/aistudio/MRF_Vapocure_Xuper_Yellow_Primer_Can_117fa5e0.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "protecton bergethane pu finish" || key === "industrial 2k bergerthane pu enamel paint") {
        mergedProduct = {
          ...mergedProduct,
          name: "Industrial 2K Bergerthane PU Enamel Paint",
          slug: "industrial-2k-bergerthane-pu-enamel-paint",
          seoTitle: "Industrial 2K Bergerthane PU Enamel Paint | 11L & 20L | Berger Protecton",
          seoDescription: "Buy Industrial 2K Bergerthane PU Enamel Paint (Berger Protecton BTHANE PU) in 11L & 20L packs at wholesale prices. Two-pack 10:1 aliphatic acrylic polyurethane coating with UV & chemical resistance in standard & custom RAL shades.",
          seoKeywords: "Industrial 2K Bergerthane PU Enamel Paint, Berger Protecton Bergethane PU, BTHANE PU Glossy Finish, 2K industrial polyurethane paint 11L 20L, RAL shade 2K PU enamel, Berger Thinner 825 PU coating",
          price: "₹ 3,950.00",
          sizes: [11, 20],
          sizePrices: { 11: 3950, 20: 6950 },
          unit: "L",
          properties: [
            "Two-Pack Aliphatic 2K Acrylic Polyurethane (10:1 Mixing Ratio with Catalyst M15C70)",
            "Non-Yellowing High-Gloss UV & Weather Resistance for Tanks, Pipelines & Machinery",
            "Available in 11L (10L Base + 1L Catalyst) & 20L Industrial Packs",
            "Available in 8 Standard Colors & Custom RAL Classic Shade Codes"
          ],
          image: "/assets/aistudio/Berger_Protecton_Industrial_Paint_Pail_ee70a210.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (key === "berger industrial epilux 78 high build tank liner" || key === "epilux 78 hbtl" || key === "protecton epilux 78 hbtl") {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Industrial Epilux 78 High Build Tank Liner",
          slug: "berger-industrial-epilux-78-high-build-tank-liner",
          seoTitle: "Berger Industrial Epilux 78 High Build Tank Liner (20L) | White & Grey",
          seoDescription: "Buy Berger Industrial Epilux 78 High Build Tank Liner (HBTL) 20L Pack online at wholesale prices. CFTRI & USFDA 21 CFR 175.300 compliant 2-pack amine-adduct epoxy tank coating in White & Grey for potable water, chemical & hydrocarbon tanks.",
          seoKeywords: "Berger Industrial Epilux 78 High Build Tank Liner, Berger Epilux 78 HBTL White Grey, Epilux 78 20L Tank Coating, food grade potable water epoxy tank paint, CFTRI USFDA epoxy tank liner, Berger Catalyst 955938 Thinner 844",
          price: "₹ 9,650.00",
          sizes: [20],
          sizePrices: { 20: 9650 },
          unit: "L",
          shades: [
            { name: "White", code: "955000", hex: "#F8F9FA" },
            { name: "Grey", code: "GREY", hex: "#8D9296" }
          ],
          allowRalShades: false,
          image: "/assets/aistudio/Berger_Protecton_Green_Paint_Drum_823bd727.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "berger industrial ferrotol heat resistant aluminium paint (upto 250°c)" ||
        key === "berger ferrotol hr aluminium paint" ||
        key === "ferrotol hr aluminium medium"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Industrial Ferrotol Heat Resistant Aluminium Paint (Upto 250°C)",
          slug: "berger-industrial-ferrotol-heat-resistant-aluminium-paint-upto-250c",
          seoTitle: "Berger Industrial Ferrotol Heat Resistant Aluminium Paint (Upto 250°C) | 4L & 20L",
          seoDescription: "Buy Berger Industrial Ferrotol HR Heat Resistant Aluminium Paint (up to 250°C) in 4L (₹1,620) & 20L (₹7,880) dual packs online at wholesale prices. Dual-pack oleoresinous leafing aluminium coating for boilers, stacks, chimneys, pipes & tanks.",
          seoKeywords: "Berger Industrial Ferrotol Heat Resistant Aluminium Paint, Berger Ferrotol HR Aluminium 250C, heat resistant aluminium paint 250 degree, boiler chimney pipe heat paint, Berger Ferrotol Medium 541984 Al Paste 511985",
          price: "₹ 1,620.00",
          sizes: [4, 20],
          sizePrices: { 4: 1620, 20: 7880 },
          unit: "L",
          image: "/assets/aistudio/Berger_Ferrotol_HR_Aluminium_Paint_Drum_b3ed3008.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "berger g.p synthetic enamel paint - industrial grade" ||
        key === "berger butterfly g.p. synthetic enamel" ||
        key === "berger gp synthetic enamel paint - industrial grade"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger G.P Synthetic Enamel Paint - Industrial Grade",
          slug: "berger-gp-synthetic-enamel-paint-industrial-grade",
          seoTitle: "Berger G.P Synthetic Enamel Paint - Industrial Grade (20L) | RAL & Standard Shades",
          seoDescription: "Buy Berger Butterfly G.P. Synthetic Enamel Paint - Industrial Grade in 20L drums (₹4,530) at wholesale prices. High-gloss alkyd enamel (80±5° gloss) for mild steel grilles, gates, machinery & interior wood in White, Black, Grey, Yellow, Red, Blue, Green & custom RAL shades.",
          seoKeywords: "Berger G.P Synthetic Enamel Paint, Berger Butterfly GP Synthetic Enamel 20L, industrial synthetic enamel paint, bright grey synthetic enamel, Berger Thinner 800 enamel, RAL shade GP enamel 20L",
          price: "₹ 4,530.00",
          sizes: [20],
          sizePrices: { 20: 4530 },
          unit: "L",
          image: "/assets/aistudio/Berger_Butterfly_Burgundy_Paint_Can_0bd8ae57.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "berger torpedo quick drying enamel paint - industrial grade" ||
        key === "berger torpedo qd enamel paint - industrial grade" ||
        key === "berger torpedo qd enamel"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Torpedo Quick Drying Enamel Paint - Industrial Grade",
          slug: "berger-torpedo-quick-drying-enamel-paint-industrial-grade",
          seoTitle: "Berger Torpedo Quick Drying Enamel Paint - Industrial Grade (20L) | RAL Shades",
          seoDescription: "Buy Berger Torpedo Quick Drying (QD) Enamel Paint - Industrial Grade in 20L ColorBank drums (₹5,390) at wholesale prices. Rapid 30-min touch-dry & 60-min hard-dry alkyd enamel for machinery, fabrication & structural steel in standard & custom RAL shades.",
          seoKeywords: "Berger Torpedo Quick Drying Enamel Paint, Berger Torpedo QD Enamel 20L, industrial QAD enamel paint, fast drying metal enamel 30 min dry, Berger Protecton Torpedo N Base V92I77, RAL shade QD enamel",
          price: "₹ 5,390.00",
          sizes: [20],
          sizePrices: { 20: 5390 },
          unit: "L",
          image: "/assets/aistudio/Berger_Protecton_Green_Paint_Drum__1__0566f887.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "protecton epilux 610 epoxy primer" ||
        key === "berger epilux 610 coating grey epoxy primer - industrial grade" ||
        key === "epilux 610 coating grey"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Epilux 610 Coating Grey Epoxy Primer - Industrial Grade",
          slug: "berger-epilux-610-coating-grey-epoxy-primer-industrial-grade",
          seoTitle: "Berger Epilux 610 Coating Grey Epoxy Primer - Industrial Grade",
          seoDescription: "Buy Berger Epilux 610 Coating Grey Epoxy Primer (P43633) - Industrial Grade online at wholesale prices. Two-pack epoxy zinc phosphate anti-corrosive primer (5:1 with Catalyst P43C50) in 4L & 18L drums; Berger Thinner 844 compatible.",
          seoKeywords: "Berger Epilux 610 Coating Grey Epoxy Primer, Epilux 610 Grey P43633, Protecton Epilux 610 Epoxy Primer, Berger Catalyst P43C50, two pack epoxy grey metal primer, industrial zinc phosphate epoxy primer",
          subCategory: "Primers",
          price: "₹ 1,150.00",
          sizes: [4, 18],
          sizePrices: { 4: 1150, 18: 4140 },
          unit: "L",
          image: "/assets/aistudio/Berger_Epilux_610_Protective_Coating_Drum_7d1fa625.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "berger epoxy thinner 844 - industrial grade" ||
        key === "berger thinner 844" ||
        key === "thinner 844" ||
        key === "epoxy thinner 844"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Epoxy Thinner 844 - Industrial Grade",
          slug: "berger-epoxy-thinner-844-industrial-grade",
          seoTitle: "Berger Epoxy Thinner 844 - Industrial Grade (EP-4/5 | 20L)",
          seoDescription: "Buy Berger Protecton Epoxy Thinner 844 (EP-4/5, Code 844 900) in 20L drums at wholesale prices. Specialized solvent for Epilux 4, Epilux 5, Epilux 610 & 78.",
          seoKeywords: "Berger Epoxy Thinner 844, Berger Thinner 844 EP-4/5, Berger 844 900 Thinner 20L, Epilux Epoxy Thinner 844, Epilux 610 thinner, Epilux 78 thinner, industrial epoxy paint thinner",
          subCategory: "Thinners & Solvents",
          price: "₹ 4,200.00",
          sizes: [20],
          sizePrices: { 20: 4200 },
          unit: "L",
          image: "/assets/aistudio/Berger_Protecton_Industrial_Thinner_Drum_b565d737.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "protecton epilux 5 coal tar epoxy" ||
        key === "berger epilux 5 coal tar epoxy black" ||
        key === "epilux 5 coal tar epoxy black" ||
        key === "epilux-5 ctar epoxy-black"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Epilux 5 Coal Tar Epoxy Black",
          slug: "berger-epilux-5-coal-tar-epoxy-black",
          seoTitle: "Berger Epilux 5 Coal Tar Epoxy Black (20L Drum) | Protecton",
          seoDescription: "Buy Berger Protecton Epilux 5 Coal Tar Epoxy Black (655800) 20L drum online at wholesale price. Heavy-duty 2K waterproof & chemical resistant steel coating.",
          seoKeywords: "Berger Epilux 5 Coal Tar Epoxy Black, Epilux 5 Coal Tar Epoxy 20L, Berger 655800 655821 Catalyst, Protecton Epilux 5 Black, coal tar epoxy paint 20 litre drum, underground pipeline epoxy coating, marine hull black coal tar epoxy",
          subCategory: "Epoxy Paint",
          price: "₹ 5,150.00",
          sizes: [20],
          sizePrices: { 20: 5150 },
          unit: "L",
          image: "/assets/aistudio/Berger_Protecton_Epoxy_Paint_Drum_caad1fa1.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "mrf pu thinner for finish" ||
        key === "thinner for finish" ||
        key === "mrf thinner for finish"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "MRF PU Thinner For Finish",
          slug: "mrf-pu-thinner-for-finish",
          seoTitle: "MRF PU Thinner For Finish (TFF) | 1L, 5L & 20L | MRF Vapocure",
          seoDescription: "Buy MRF PU Thinner For Finish (Thinner For Finish TFF) in 1L, 5L & 20L packs online at wholesale price. Slow-evaporating genuine solvent for WoodCoat & MetalCoat.",
          seoKeywords: "MRF PU Thinner For Finish, MRF Thinner For Finish, MRF TFF Thinner, MRF WoodCoat Thinner, MRF MetalCoat Thinner, MRF Durothane PU Thinner 1L 5L 20L",
          subCategory: "Thinners & Solvents",
          price: "₹ 390.00",
          sizes: [1, 5, 20],
          sizePrices: { 1: 390, 5: 1920, 20: 7450 },
          unit: "L",
          image: "/assets/aistudio/Thinner_for_Finish_Product_Can_14e3833f.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "mrf epoxy thinner 1110 ep" ||
        key === "mrf thinner 1110 ep" ||
        key === "thinner 1110 ep"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "MRF Epoxy Thinner 1110 EP",
          slug: "mrf-epoxy-thinner-1110-ep",
          seoTitle: "MRF Epoxy Thinner 1110 EP | 1L, 5L & 20L | MRF Vapocure",
          seoDescription: "Buy MRF Vapocure Epoxy Thinner 1110 EP in 1L, 5L & 20L packs online at wholesale prices. Specialized epoxy dilution solvent for Epidec primers & high-build finishes.",
          seoKeywords: "MRF Epoxy Thinner 1110 EP, MRF Thinner 1110 EP, MRF Vapocure 1110 EP, MRF Epidec Epoxy Thinner, 1110EP thinner 5L 20L, industrial epoxy thinner",
          subCategory: "Thinners & Solvents",
          price: "₹ 400.00",
          sizes: [1, 5, 20],
          sizePrices: { 1: 400, 5: 1960, 20: 7650 },
          unit: "L",
          image: "/assets/aistudio/Blue_Vapocure_Paints_Thinner_Can_82b1b978.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "mrf melamine thinner 3830" ||
        key === "mrf thinner 3830" ||
        key === "thinner 3830"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "MRF Melamine Thinner 3830",
          slug: "mrf-melamine-thinner-3830",
          seoTitle: "MRF Melamine Thinner 3830 (PU & Wood) | 1L, 5L & 20L",
          seoDescription: "Buy MRF Vapocure Melamine Thinner 3830 in 1L, 5L & 20L cans online at wholesale price. Medium-drying thinner for Melamine Aura wood finish & 2K PU sealers.",
          seoKeywords: "MRF Melamine Thinner 3830, MRF Thinner 3830, MRF Vapocure 3830 Thinner 5L, MRF Melamine Aura Thinner, wood polish thinner 3830, MRF PU melamine thinner",
          subCategory: "Thinners & Solvents",
          price: "₹ 340.00",
          sizes: [1, 5, 20],
          sizePrices: { 1: 340, 5: 1650, 20: 6450 },
          unit: "L",
          image: "/assets/aistudio/MRF_Vapocure_Thinner_3830_Can_8b24fe26.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "mrf fast drying pu primer grey" ||
        key === "mrf fast dry 2:30 primer" ||
        key === "mrf 2:30 primer" ||
        key === "mrf 2k pu primer grey"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "MRF Fast Drying PU Primer Grey",
          slug: "mrf-fast-drying-pu-primer-grey",
          seoTitle: "MRF Fast Drying PU Primer Grey (2:30 Hr Dry) | 1L & 4L",
          seoDescription: "Buy MRF Vapocure Fast Dry 2:30 PU Primer Grey (with Hardener) in 1L & 4L packs online at wholesale prices. Dries in 2 Hr 30 Min @ 30°C for automotive & metal.",
          seoKeywords: "MRF Fast Drying PU Primer Grey, MRF Fast Dry 2:30 Primer, MRF Vapocure 2K PU Primer Grey, 2K PU metal primer automotive, fast dry polyurethane surfacer 1L 4L, MRF PU primer with hardener",
          subCategory: "Primers",
          price: "₹ 520.00",
          sizes: [1, 4],
          sizePrices: { 1: 520, 4: 1980 },
          unit: "L",
          image: "/assets/aistudio/MRF_Vapocure_Paints_Product_Set_c2f2bd85.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "berger acid alkali & heat resistant bituminous black is 158 paint" ||
        key === "berger acid alkali and heat resistant bituminous black is158 paint" ||
        key === "berger black bituminous is 158" ||
        key === "berger bituminous black is 158"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Acid Alkali & Heat Resistant Bituminous Black IS 158 Paint",
          slug: "berger-acid-alkali-heat-resistant-bituminous-black-is158-paint",
          seoTitle: "Berger Bituminous Black IS 158 Paint (20L) | Acid & Heat",
          seoDescription: "Buy Berger Black Bituminous IS 158 Paint (Code 767991) 20L drum online at wholesale price. Lead-free acid, alkali & heat resisting coating for steel & boilers.",
          seoKeywords: "Berger Acid Alkali and Heat Resistant Bituminous Black IS 158 Paint, Berger Black Bituminous IS 158, Berger 767991 Bituminous Paint 20L, IS 158 bituminous black paint, acid alkali heat resisting black paint, industrial black bitumen paint 20 litre drum, boiler funnel chimney black paint",
          subCategory: "Industrial Paint and Coatings",
          price: "₹ 5,100.00",
          sizes: [20],
          sizePrices: { 20: 5100 },
          unit: "L",
          image: "/assets/aistudio/Berger_Black_Bituminous_Paint_Drum_4a05332e.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "berger lumeros hot oil resistant coating white" ||
        key === "berger lumerous hot oil resistant coating white" ||
        key === "lumeros hor coating - white" ||
        key === "lumeros hor coating white"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Lumeros Hot Oil Resistant Coating White",
          slug: "berger-lumeros-hot-oil-resistant-coating-white",
          seoTitle: "Berger Lumeros Hot Oil Resistant Coating White (HOR | 20L)",
          seoDescription: "Buy Berger Protecton Lumeros HOR Coating White (R59000) 20L drum online at wholesale price. Single-pack hot oil resistant white paint for transformer tanks.",
          seoKeywords: "Berger Lumeros Hot Oil Resistant Coating White, Berger Lumerous Hot Oil Resistant Coating White, Berger Lumeros HOR Coating White R59000, transformer internal white paint 20L, hot oil resistant transformer tank coating, IS 1180 IS 2026 transformer paint, Berger Protecton HOR coating",
          subCategory: "Industrial Paint and Coatings",
          price: "₹ 7,980.00",
          sizes: [20],
          sizePrices: { 20: 7980 },
          unit: "L",
          image: "/assets/aistudio/Berger_Protecton_Green_Paint_Drum__2__9f8732f4.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "berger industrial aluminium paint is 2339 medium" ||
        key === "berger industrial aluminium paint is2339 medium" ||
        key === "berger aluminium is 2339 medium" ||
        key === "berger aluminium paint is 2339"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Industrial Aluminium Paint IS 2339 Medium",
          slug: "berger-industrial-aluminium-paint-is2339-medium",
          seoTitle: "Berger Industrial Aluminium Paint IS 2339 Medium (20L Kit)",
          seoDescription: "Buy Berger Industrial Aluminium Paint IS 2339 Medium (17.1L 661984 + 4.4Kg Paste 661985) 20L dual pack online. Reflective metallic coating up to 200°C heat.",
          seoKeywords: "Berger Industrial Aluminium Paint IS 2339 Medium, Berger Aluminium IS 2339 Medium 661984, Berger 661985 Aluminium Paste, IS 2339 dual container aluminium paint 20L, industrial heat reflective silver aluminium paint, storage tank pipeline structural steel aluminium paint, Berger Protecton aluminium paint wholesale",
          subCategory: "Industrial Paint and Coatings",
          price: "₹ 6,695.00",
          sizes: [20],
          sizePrices: { 20: 6695 },
          unit: "L",
          image: "/assets/aistudio/Berger_Green_Industrial_Paint_Drum_c47eabff.png"
        };
        key = mergedProduct.name.toLowerCase();
      } else if (
        key === "berger boiler compound heat resistant ferrotol no. 1 paint" ||
        key === "berger boiler compound heat resistant ferrotol no.1 paint" ||
        key === "berger ferrotol - 1" ||
        key === "berger ferrotol no. 1" ||
        key === "ferrotol - 1"
      ) {
        mergedProduct = {
          ...mergedProduct,
          name: "Berger Boiler Compound Heat Resistant Ferrotol No. 1 Paint",
          slug: "berger-boiler-compound-heat-resistant-ferrotol-no-1-paint",
          seoTitle: "Berger Ferrotol No. 1 Boiler Compound Paint (20L | 540°C)",
          seoDescription: "Buy Berger Protecton Ferrotol - 1 Boiler Compound Paint (Code 052991) 20L drum online. Graphite-bituminous coating for boiler interiors up to 540°C wet heat.",
          seoKeywords: "Berger Boiler Compound Heat Resistant Ferrotol No. 1 Paint, Berger Protecton Ferrotol - 1 052991, Ferrotol No 1 boiler interior paint 20L, heat resistant boiler drum tube coating 540C, graphite bituminous boiler compound paint, steam turbine economizer water wall coating, Berger Protecton industrial paint wholesale",
          subCategory: "Industrial Paint and Coatings",
          price: "₹ 5,590.00",
          sizes: [20],
          sizePrices: { 20: 5590 },
          unit: "L",
          image: "/assets/aistudio/Berger_Ferrotol_Industrial_Paint_Drum_628fd187.png"
        };
        key = mergedProduct.name.toLowerCase();
      }

      const accurateImagesMap: Record<string, string> = {
        "royale health shield": "https://5.imimg.com/data5/SELLER/Default/2023/7/326440889/MP/SF/RA/22649264/asian-paints-royale-health-shield-500x500.jpg",
        "apex tile guard matt": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-tile-guard.png",
        "apex ultima stretch": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/ultima-stretch-packshot-asian-paints.png",
        "weathercoat glow": "https://5.imimg.com/data5/SELLER/Default/2021/7/OI/YW/AW/102796245/berger-weathercoat-glow-exterior-emulsion.jpg",
        "dampstop duo interior and exterior waterproof primer": "/assets/aistudio/Berger_Dampstop_Duo_Waterproofing_Primer_Bucket__1__b4621b38.png",
        "seal o prime interior and exterior waterproof primer": "/assets/aistudio/Berger_Seal-O-Prime_White_Paint_Bucket_Mockup_10b3425f.png",
        "walmasta primer - interior and exterior primer": "/assets/aistudio/WALMASTA_Primer_Paint_Pail__1__ba227d7d.png",
        "dampshield exterior primer": "/assets/aistudio/Berger_Home_Shield_Damp_Shield_Bucket_6dcbcb7d.png",
        "bp white primer": "/assets/aistudio/Berger_Water-Thinable_Cement_Primer_Bucket_89b385b2.png",
        "home shield epoxy tile grout": "/assets/aistudio/Berger_Epoxy_Tile_Grout_Bucket_a6d61114.png",
        "imperia gold pu wood finish": "/assets/aistudio/Berger_Imperia_Gold_Paint_Can_Packshot_bc346297.png",
        "protecton epilux 4 zinc rich primer": "/assets/aistudio/Green_Berger_Protecton_Industrial_Paint_Drum_e4ebfb0a.png",
        ...HD_PACKSHOT_IMAGES
      };

      if (accurateImagesMap[key]) {
        mergedProduct.image = accurateImagesMap[key];
      } else {
        const existingMock = map.get(key);
        if (existingMock && (!mergedProduct.image || mergedProduct.image === "" || existingMock.brand === "Berger Paints")) {
          mergedProduct.image = existingMock.image;
        }
      }
      if (mergedProduct.image) {
        mergedProduct.image = upgradeCdnImageUrl(mergedProduct.image);
      }
      map.set(key, mergedProduct);
    });
    
    const removedNames = [
      'Tractor Sparc Emulsion',
      'Tractor Uno Acrylic Distemper',
      'Tractor Emulsion Shyne',
      'Apcolite Premium Satin Emulsion',
      'Apcolite Advanced Emulsion',
      'Apcolite Premium Enamel',
      'Apex Advanced',
      'Floor Epoxy Coating',
      'Food Grade Epoxy',
      'MIO Coatings',
      'BP Red Oxide Primer',
      'Luxol Metal Primer',
      'Protecton Red Oxide Metal Primer IS 2339'
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
      if (nameLower.includes("epoxy primer")) {
         subs.push("Primers", "Epoxy Paint");
      } else if (nameLower.includes("metal primer") || nameLower.includes("epoxy finish")) {
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
      "Industrial Paint and Coatings": "https://img.icons8.com/color/144/factory.png",
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

    const bubbles = Array.from(uniqueSubs)
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

    bubbles.unshift({
      name: "Industrial Paint and Coatings",
      slug: "industrial-paint-and-coatings",
      image: defaultImages["Industrial Paint and Coatings"],
    });

    return bubbles;
  }, [productList]);

  const totalSubCategories = useMemo(
    () =>
      dynamicCategories.reduce((acc, cat) => acc + cat.subCategories.length, 0),
    [dynamicCategories],
  );

  const handleBrandChange = (brand: string) => {
    setActiveBrand(brand);
    const nextParams = new URLSearchParams(searchParams);
    if (brand === "All Brands") {
      nextParams.delete("brand");
    } else {
      nextParams.set("brand", brand);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === "number") return priceVal;
    if (typeof priceVal === "string")
      return parseFloat(priceVal.replace(/[^0-9.]/g, ""));
    return 0;
  };

  const getFinishType = (product: any) => {
    const text = (
      product.name +
      " " +
      (product.subCategory || "") +
      " " +
      (product.properties?.join(" ") || "")
    ).toLowerCase();
    if (text.includes("matt") || text.includes("matte")) return "matt";
    if (text.includes("sheen") || text.includes("shyne")) return "sheen";
    if (text.includes("gloss") || text.includes("glossy")) return "gloss";
    return "other";
  };

  const filtered = productList.filter((p) => {
    const pSubs: string[] = (p as any).subCategories || (p.subCategory ? [p.subCategory] : []);
    const isIndustrialTop =
      activeCategoryFilter === "Industrial Paint and Coatings" ||
      activeCategoryFilter === "Industrial" ||
      activeCategoryFilter === "All Industrial";
    const matchCat =
      activeCategoryFilter === "All Categories" ||
      (isIndustrialTop && p.topCategory === "Industrial") ||
      (activeCategoryFilter.startsWith("All ") &&
        p.topCategory === activeCategoryFilter.replace("All ", "")) ||
      pSubs.some(sub => sub.toLowerCase() === activeCategoryFilter.toLowerCase());

    const matchBrand =
      (selectedSidebarBrands.length === 0 || selectedSidebarBrands.includes(p.brand)) &&
      (activeBrand === "All Brands" || p.brand.toLowerCase() === activeBrand.toLowerCase());

    const price = parsePrice(p.price || (p.sizes && p.sizes[0] ? p.sizes[0] * 850 : 850));
    const matchPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
      if (range === 'under-500') return price < 500;
      if (range === '500-2000') return price >= 500 && price <= 2000;
      if (range === '2000-5000') return price > 2000 && price <= 5000;
      if (range === 'above-5000') return price > 5000;
      return true;
    });

    const finish = getFinishType(p);
    const matchFinish = selectedFinishes.length === 0 || selectedFinishes.includes(finish);

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

    return matchCat && matchBrand && matchPrice && matchFinish && matchSearch;
  });



  const getFinishValue = getFinishType;

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
    const prev = prevFiltersRef.current;
    const filtersChanged =
      prev.activeCategoryFilter !== activeCategoryFilter ||
      prev.activeBrand !== activeBrand ||
      prev.sortOption !== sortOption ||
      prev.searchQuery !== searchQuery;

    if (filtersChanged) {
      setCurrentPage(1);
    }
    prevFiltersRef.current = {
      activeCategoryFilter,
      activeBrand,
      sortOption,
      searchQuery,
    };
  }, [activeCategoryFilter, activeBrand, sortOption, searchQuery]);

  const totalPages = Math.ceil(sortedAndFiltered.length / productsPerPage);

  // Clamp currentPage if dynamic filtering reduces totalPages
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (nextPage: number) => {
    const clamped = Math.max(1, Math.min(totalPages || 1, nextPage));
    setCurrentPage(clamped);
    if (productGridRef.current) {
      const y =
        productGridRef.current.getBoundingClientRect().top +
        window.scrollY -
        110;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

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
              {!initialBrand && activeCategoryFilter !== "All Categories"
                ? activeCategoryFilter
                : pageTitle || "All Products"}
            </h1>
            <p className="text-ivory/60 mt-2 font-light max-w-2xl text-sm sm:text-base leading-relaxed">
              {pageDescription ||
                "Explore our wide range of premium paints and hardware."}
            </p>
            <nav aria-label="Related categories and brands" className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:text-xs font-sans text-ivory/65">
              {activeCategoryFilter === "Industrial Paint and Coatings" ||
              activeCategoryFilter === "Industrial" ||
              activeCategoryFilter === "All Industrial" ||
              activeCategoryFilter === "Epoxy Paint" ||
              activeCategoryFilter === "PU Paint" ||
              activeCategoryFilter === "Synthetic Enamels" ? (
                <>
                  <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Quick Links:</span>
                  <Link to="/c/industrial-paint-and-coatings" className="hover:text-gold underline decoration-gold/30 underline-offset-4 transition-colors">
                    Industrial Paint &amp; Coatings
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/epoxy-paint" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Epoxy Paints
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/pu-paint" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    2K PU Coatings
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/synthetic-enamels" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Synthetic Enamels
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/primers" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Metal Primers
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/brands/berger-paints" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Berger Paints
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/brands/mrf-vapocure" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    MRF Vapocure
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/services/industrial-flooring" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Industrial Epoxy Flooring
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Shop Categories:</span>
                  <Link to="/c/industrial-paint-and-coatings" className="hover:text-gold underline decoration-gold/30 underline-offset-4 transition-colors">
                    Industrial Paint &amp; Coatings
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/interior-paint" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Interior Paint
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/exterior-paint" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Exterior Paint
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/enamel-paint" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Enamel Paint
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/primers" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Primers
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/waterproofing" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Waterproofing
                  </Link>
                  <span className="opacity-30">&bull;</span>
                  <Link to="/c/wood-finishes" className="hover:text-gold hover:underline underline-offset-4 transition-colors">
                    Wood Finishes
                  </Link>
                </>
              )}
            </nav>
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
                    line1: "25+ yrs",
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
            {categoryBubblesData.map((cat) => {
              const isSelected =
                activeCategoryFilter === cat.name ||
                activeCategoryFilter === "All " + cat.name ||
                (cat.name === "Industrial Paint and Coatings" &&
                  (activeCategoryFilter === "Industrial" ||
                    activeCategoryFilter === "All Industrial"));
              return (
                <button
                  key={cat.slug}
                  onClick={() =>
                    setActiveCategoryFilter(
                      isSelected ? "All Categories" : cat.name,
                    )
                  }
                  className="flex flex-col items-center gap-2.5 flex-shrink-0 group w-[72px] sm:w-[90px]"
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden flex items-center justify-center p-0.5 shadow-sm border-2 transition-all duration-300 ${isSelected ? "border-gold shadow-md" : "border-transparent bg-zinc-50 group-hover:border-zinc-300 group-hover:shadow-md"}`}
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
                        className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? "bg-gold/10" : "bg-transparent group-hover:bg-black/5"}`}
                      />
                    </div>
                  </div>
                  <span
                    className={`text-[9px] sm:text-[10px] text-center font-medium leading-tight transition-colors ${isSelected ? "text-gold font-bold" : "text-zinc-600 group-hover:text-zinc-900"}`}
                  >
                    {cat.name}
                  </span>
                </button>
              );
            })}
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

        {/* Mobile Filter Button */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-4 lg:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 shadow-sm hover:bg-zinc-50"
          >
            <Filter className="w-4 h-4 text-gold" />
            <span>
              Filters {(selectedSidebarBrands.length > 0 || selectedPriceRanges.length > 0 || selectedFinishes.length > 0) && `(${selectedSidebarBrands.length + selectedPriceRanges.length + selectedFinishes.length})`}
            </span>
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        <AnimatePresence>
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-[200] flex">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileFilterOpen(false)}
                className="fixed inset-0 bg-black"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-80 max-w-full bg-white h-full shadow-2xl z-10 p-6 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gold" />
                    <span className="font-serif font-bold text-base text-zinc-900 uppercase tracking-wide">Filters</span>
                  </div>
                  <button onClick={() => setIsMobileFilterOpen(false)} className="p-1.5 hover:bg-zinc-100 rounded-full">
                    <X className="w-5 h-5 text-zinc-500" />
                  </button>
                </div>

                {/* Filter Sidebar Content */}
                <div className="space-y-6 text-zinc-800">
                  <div className="flex items-center justify-between">
                    {(selectedSidebarBrands.length > 0 || selectedPriceRanges.length > 0 || selectedFinishes.length > 0 || activeBrand !== "All Brands" || activeCategoryFilter !== "All Categories") && (
                      <button
                        onClick={() => {
                          setSelectedSidebarBrands([]);
                          setSelectedPriceRanges([]);
                          setSelectedFinishes([]);
                          setActiveBrand("All Brands");
                          setActiveCategoryFilter("All Categories");
                        }}
                        className="text-[11px] font-bold text-red-600 hover:underline uppercase tracking-wider"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div className="pb-4 border-b border-zinc-200">
                    <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-zinc-900 mb-3">Category</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                      <label className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                        <input
                          type="radio"
                          name="sidebar-category-mobile"
                          checked={activeCategoryFilter === "All Categories"}
                          onChange={() => setActiveCategoryFilter("All Categories")}
                          className="w-4 h-4 text-gold focus:ring-gold/50 cursor-pointer"
                        />
                        <span className="truncate flex-1 font-medium">All Categories</span>
                      </label>
                      {categoryBubblesData.map((cat) => {
                        const isSelected = activeCategoryFilter === cat.name || activeCategoryFilter === "All " + cat.name;
                        return (
                          <label key={cat.slug} className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                            <input
                              type="radio"
                              name="sidebar-category-mobile"
                              checked={isSelected}
                              onChange={() => setActiveCategoryFilter(cat.name)}
                              className="w-4 h-4 text-gold focus:ring-gold/50 cursor-pointer"
                            />
                            <span className="truncate flex-1">{cat.name}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-zinc-900 mb-3">Brand</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                      {availableBrands.map((brand) => {
                        const isChecked = selectedSidebarBrands.includes(brand) || activeBrand === brand;
                        return (
                          <label key={brand} className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedSidebarBrands(prev => [...prev, brand]);
                                } else {
                                  setSelectedSidebarBrands(prev => prev.filter(b => b !== brand));
                                  if (activeBrand === brand) setActiveBrand("All Brands");
                                }
                              }}
                              className="w-4 h-4 rounded border-zinc-300 text-gold focus:ring-gold/50 cursor-pointer"
                            />
                            <span className="truncate flex-1">{brand}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="pt-4 border-t border-zinc-200">
                    <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-zinc-900 mb-3">Price Range</h3>
                    <div className="space-y-2">
                      {[
                        { id: 'under-500', label: 'Under ₹500' },
                        { id: '500-2000', label: '₹500 – ₹2,000' },
                        { id: '2000-5000', label: '₹2,000 – ₹5,000' },
                        { id: 'above-5000', label: 'Above ₹5,000' },
                      ].map((range) => (
                        <label key={range.id} className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                          <input
                            type="checkbox"
                            checked={selectedPriceRanges.includes(range.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPriceRanges(prev => [...prev, range.id]);
                              } else {
                                setSelectedPriceRanges(prev => prev.filter(r => r !== range.id));
                              }
                            }}
                            className="w-4 h-4 rounded border-zinc-300 text-gold focus:ring-gold/50 cursor-pointer"
                          />
                          <span className="truncate flex-1">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Paint Finish Filter */}
                  <div className="pt-4 border-t border-zinc-200">
                    <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-zinc-900 mb-3">Paint Finish</h3>
                    <div className="space-y-2">
                      {[
                        { id: 'matt', label: 'Matte (Matt)' },
                        { id: 'sheen', label: 'Sheen / Shyne' },
                        { id: 'gloss', label: 'Gloss / Glossy' },
                      ].map((finish) => (
                        <label key={finish.id} className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                          <input
                            type="checkbox"
                            checked={selectedFinishes.includes(finish.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFinishes(prev => [...prev, finish.id]);
                              } else {
                                setSelectedFinishes(prev => prev.filter(f => f !== finish.id));
                              }
                            }}
                            className="w-4 h-4 rounded border-zinc-300 text-gold focus:ring-gold/50 cursor-pointer"
                          />
                          <span className="truncate flex-1">{finish.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full py-3 bg-gradient-gold text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-md"
                  >
                    Apply Filters ({sortedAndFiltered.length} Products)
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Desktop Sidebar + Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Desktop Sticky Sidebar */}
          <div className="hidden lg:block lg:col-span-1 bg-white border border-zinc-200/80 rounded-2xl p-5 shadow-sm sticky top-28">
            <div className="space-y-6 text-zinc-800">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gold" />
                  <span className="font-serif font-bold text-sm tracking-wide text-zinc-900 uppercase">Filters</span>
                </div>
                {(selectedSidebarBrands.length > 0 || selectedPriceRanges.length > 0 || selectedFinishes.length > 0 || activeBrand !== "All Brands" || activeCategoryFilter !== "All Categories") && (
                  <button
                    onClick={() => {
                      setSelectedSidebarBrands([]);
                      setSelectedPriceRanges([]);
                      setSelectedFinishes([]);
                      setActiveBrand("All Brands");
                      setActiveCategoryFilter("All Categories");
                    }}
                    className="text-[11px] font-bold text-red-600 hover:underline uppercase tracking-wider"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="pb-4 border-b border-zinc-200">
                <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-zinc-900 mb-3">Category</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  <label className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                    <input
                      type="radio"
                      name="sidebar-category-desktop"
                      checked={activeCategoryFilter === "All Categories"}
                      onChange={() => setActiveCategoryFilter("All Categories")}
                      className="w-4 h-4 text-gold focus:ring-gold/50 cursor-pointer"
                    />
                    <span className="truncate flex-1 font-medium">All Categories</span>
                  </label>
                  {categoryBubblesData.map((cat) => {
                    const isSelected = activeCategoryFilter === cat.name || activeCategoryFilter === "All " + cat.name;
                    return (
                      <label key={cat.slug} className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                        <input
                          type="radio"
                          name="sidebar-category-desktop"
                          checked={isSelected}
                          onChange={() => setActiveCategoryFilter(cat.name)}
                          className="w-4 h-4 text-gold focus:ring-gold/50 cursor-pointer"
                        />
                        <span className="truncate flex-1">{cat.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-zinc-900 mb-3">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                  {availableBrands.map((brand) => {
                    const isChecked = selectedSidebarBrands.includes(brand) || activeBrand === brand;
                    return (
                      <label key={brand} className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSidebarBrands(prev => [...prev, brand]);
                            } else {
                              setSelectedSidebarBrands(prev => prev.filter(b => b !== brand));
                              if (activeBrand === brand) setActiveBrand("All Brands");
                            }
                          }}
                          className="w-4 h-4 rounded border-zinc-300 text-gold focus:ring-gold/50 cursor-pointer"
                        />
                        <span className="truncate flex-1">{brand}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="pt-4 border-t border-zinc-200">
                <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-zinc-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  {[
                    { id: 'under-500', label: 'Under ₹500' },
                    { id: '500-2000', label: '₹500 – ₹2,000' },
                    { id: '2000-5000', label: '₹2,000 – ₹5,000' },
                    { id: 'above-5000', label: 'Above ₹5,000' },
                  ].map((range) => (
                    <label key={range.id} className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPriceRanges(prev => [...prev, range.id]);
                          } else {
                            setSelectedPriceRanges(prev => prev.filter(r => r !== range.id));
                          }
                        }}
                        className="w-4 h-4 rounded border-zinc-300 text-gold focus:ring-gold/50 cursor-pointer"
                      />
                      <span className="truncate flex-1">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Paint Finish Filter */}
              <div className="pt-4 border-t border-zinc-200">
                <h3 className="text-xs font-bold font-serif uppercase tracking-wider text-zinc-900 mb-3">Paint Finish</h3>
                <div className="space-y-2">
                  {[
                    { id: 'matt', label: 'Matte (Matt)' },
                    { id: 'sheen', label: 'Sheen / Shyne' },
                    { id: 'gloss', label: 'Gloss / Glossy' },
                  ].map((finish) => (
                    <label key={finish.id} className="flex items-center gap-2.5 text-xs text-zinc-700 cursor-pointer hover:text-zinc-900 select-none">
                      <input
                        type="checkbox"
                        checked={selectedFinishes.includes(finish.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFinishes(prev => [...prev, finish.id]);
                          } else {
                            setSelectedFinishes(prev => prev.filter(f => f !== finish.id));
                          }
                        }}
                        className="w-4 h-4 rounded border-zinc-300 text-gold focus:ring-gold/50 cursor-pointer"
                      />
                      <span className="truncate flex-1">{finish.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid & Pagination Area */}
          <div className="lg:col-span-3">
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
            <div
              ref={productGridRef}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-5"
            >
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
                  onClick={() => handlePageChange(currentPage - 1)}
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
                        onClick={() => handlePageChange(item)}
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
                  onClick={() => handlePageChange(currentPage + 1)}
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
        </div>
      </div>

      <CategorySeoBlock category={activeCategoryFilter} />
    </section>
  );
}
