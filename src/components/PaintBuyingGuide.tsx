import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layers,
  Scale,
  Calculator,
  Check,
  X,
  ShoppingCart,
  Activity,
  ChevronDown,
  ShieldCheck,
  Clock,
  Package,
  ArrowUpRight,
  Info,
  Heart,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockProducts } from "../data";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { useAuthStore } from "../store/useAuthStore";
import { shadeService, Shade } from "../services/shadeService";
import { useDebounce } from "../hooks/useDebounce";

// Static details for plain finishes categorized from the official website
export interface PaintProfile {
  id: number;
  name: string;
  category: "Super Luxury" | "Premium" | "Standard" | "Economy";
  price: number;
  sheenLevel:
    | "Ultra Sheen"
    | "High Sheen"
    | "Soft Sheen"
    | "Satin Luster"
    | "Matt Finish"
    | "Dry Flat Matt";
  washability:
    | "Outstanding (10/10)"
    | "Outstanding (9/10)"
    | "Excellent (8/10)"
    | "High (7/10)"
    | "High (6/10)"
    | "Standard (4/10)"
    | "Basic (3/10)"
    | "Basic (2/10)";
  warranty: "10 Years" | "8 Years" | "6 Years" | "5 Years" | "None" | "4 Years";
  coverage:
    | "140 - 160 sq.ft/L (2 coats)"
    | "120 - 140 sq.ft/L (2 coats)"
    | "130 - 150 sq.ft/L (2 coats)"
    | "80 - 100 sq.ft/L (2 coats)"
    | "70 - 90 sq.ft/L (2 coats)";
  stainResistance:
    | "Advanced Teflon™ Barrier"
    | "High Polymeric Wipe"
    | "Moderate Wipeable"
    | "Basic Sponge wash"
    | "Dry Dust only"
    | "Cross-Link Polymers";
  airQuality:
    | "Ultra-Low VOC, Zero added Lead"
    | "Low VOC, Anti-Bacterial"
    | "Low VOC, Anti-Fungal"
    | "Standard Safe formulation";
  bestFor: string;
  advantages: string[];
}

const PAINT_PROFILES: Record<number, PaintProfile> = {
  5: {
    id: 5,
    name: "Royale Glitz (Asian Paints)",
    category: "Super Luxury",
    price: 1200,
    sheenLevel: "High Sheen",
    washability: "Outstanding (10/10)",
    warranty: "8 Years",
    coverage: "140 - 160 sq.ft/L (2 coats)",
    stainResistance: "Advanced Teflon™ Barrier",
    airQuality: "Ultra-Low VOC, Zero added Lead",
    bestFor:
      "Luxury Living Rooms & High-traffic accent walls demanding a rich high-gloss luster.",
    advantages: [
      "Teflon™ Surface Protector",
      "Ultra stain-repellent film",
      "Crack bridging technology",
      "High Washability",
    ],
  },
  2: {
    id: 2,
    name: "Silk Glamor (Berger Paints)",
    category: "Super Luxury",
    price: 850,
    sheenLevel: "High Sheen",
    washability: "Outstanding (9/10)",
    warranty: "8 Years",
    coverage: "130 - 150 sq.ft/L (2 coats)",
    stainResistance: "High Polymeric Wipe",
    airQuality: "Ultra-Low VOC, Zero added Lead",
    bestFor: "Ultra Glamorous Sheen for premium living spaces.",
    advantages: [
      "Ultra Glamorous Sheen",
      "High Stain Resistance",
      "Over 10,000+ shades",
    ],
  },
  21: {
    id: 21,
    name: "RUCA Luxury (MRF Vapocure)",
    category: "Super Luxury",
    price: 1150,
    sheenLevel: "Soft Sheen",
    washability: "Outstanding (9/10)",
    warranty: "10 Years",
    coverage: "140 - 160 sq.ft/L (2 coats)",
    stainResistance: "High Polymeric Wipe",
    airQuality: "Low VOC, Anti-Bacterial",
    bestFor: "Luxury living spaces with high washability needs.",
    advantages: ["Luxury Finish", "High Washability", "Stain Resistant"],
  },
  6: {
    id: 6,
    name: "Royale Luxury Emulsion (Asian Paints)",
    category: "Premium",
    price: 780,
    sheenLevel: "Soft Sheen",
    washability: "Excellent (8/10)",
    warranty: "5 Years",
    coverage: "140 - 160 sq.ft/L (2 coats)",
    stainResistance: "Advanced Teflon™ Barrier",
    airQuality: "Low VOC, Anti-Bacterial",
    bestFor:
      "Elegant bedrooms and hallways requesting a soothing, soft, pearl-like shine.",
    advantages: [
      "Smooth Soft Pearl finish",
      "Environmentally Green Assured",
      "Anti-bacterial formula",
      "Excellent wipe-clean life",
    ],
  },
  9: {
    id: 9,
    name: "Easy Clean Fresh (Berger Paints)",
    category: "Premium",
    price: 520,
    sheenLevel: "Satin Luster",
    washability: "Excellent (8/10)",
    warranty: "5 Years",
    coverage: "120 - 140 sq.ft/L (2 coats)",
    stainResistance: "Cross-Link Polymers",
    airQuality: "Low VOC, Anti-Bacterial",
    bestFor:
      "Homes with children requiring frequent cleaning and stain resistance.",
    advantages: ["Cross-Link Polymers", "Stain Resistant", "Fresh Fragrance"],
  },
  7: {
    id: 7,
    name: "Apcolite Premium Emulsion (Asian Paints)",
    category: "Standard",
    price: 450,
    sheenLevel: "Matt Finish",
    washability: "High (6/10)",
    warranty: "5 Years",
    coverage: "120 - 140 sq.ft/L (2 coats)",
    stainResistance: "Moderate Wipeable",
    airQuality: "Low VOC, Anti-Fungal",
    bestFor:
      "Premium budget homes wanting deep, cozy, flat matte colors that conceal wall flaws.",
    advantages: [
      "Pure velvety matt finish",
      "Superior washability for matt",
      "Anti-fungal shield",
      "High durability core",
    ],
  },
  26: {
    id: 26,
    name: "Visa Emulsion (MRF Vapocure)",
    category: "Standard",
    price: 290,
    sheenLevel: "Matt Finish",
    washability: "High (6/10)",
    warranty: "4 Years",
    coverage: "120 - 140 sq.ft/L (2 coats)",
    stainResistance: "Moderate Wipeable",
    airQuality: "Standard Safe formulation",
    bestFor:
      "Standard interior walls that require good opacity and matte finish.",
    advantages: ["Value for Money", "Matt Finish", "Good Opacity"],
  },
  29: {
    id: 29,
    name: "Tractor Emulsion (Asian Paints)",
    category: "Economy",
    price: 210,
    sheenLevel: "Matt Finish",
    washability: "Standard (4/10)",
    warranty: "None",
    coverage: "130 - 150 sq.ft/L (2 coats)",
    stainResistance: "Basic Sponge wash",
    airQuality: "Standard Safe formulation",
    bestFor:
      "Rental properties and economic upgrades from distemper to high-coverage plastic paint.",
    advantages: [
      "Smart budget economy product",
      "Provides 1.5x wider coverage",
      "Provides smooth matt finishes",
      "Affordable setup",
    ],
  },
  22: {
    id: 22,
    name: "Bison Interior Emulsion (Berger Paints)",
    category: "Economy",
    price: 280,
    sheenLevel: "Matt Finish",
    washability: "Standard (4/10)",
    warranty: "None",
    coverage: "120 - 140 sq.ft/L (2 coats)",
    stainResistance: "Basic Sponge wash",
    airQuality: "Standard Safe formulation",
    bestFor: "Budget-friendly interior painting with a matte finish.",
    advantages: ["Value for Money", "Matt Finish", "Wide Range of Colors"],
  },
};

const SHU_SIZES = [1, 4, 10, 20];

export default function PaintBuyingGuide() {
  const [activeTab, setActiveTab] = useState<
    "glossary" | "compare" | "calculator"
  >("compare");

  // Compare State
  const [compareA, setCompareA] = useState<number>(5); // Super Luxury
  const [compareB, setCompareB] = useState<number>(6); // Premium
  const [compareC, setCompareC] = useState<number>(29); // Economy

  const [isCompareADropdownOpen, setIsCompareADropdownOpen] = useState(false);
  const [isCompareBDropdownOpen, setIsCompareBDropdownOpen] = useState(false);
  const [isCompareCDropdownOpen, setIsCompareCDropdownOpen] = useState(false);
  const [isCalcProductDropdownOpen, setIsCalcProductDropdownOpen] =
    useState(false);

  // Calculator State
  const [calcProduct, setCalcProduct] = useState<number>(5);
  const [customArea, setCustomArea] = useState<number>(400); // in sq.ft
  const [coatCount, setCoatCount] = useState<number>(2);
  const [calcSize, setCalcSize] = useState<number>(10); // recommended size
  const [calcQuantity, setCalcQuantity] = useState<number>(1);
  const [shadesSearch, setShadesSearch] = useState("");
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [shadeSuggestions, setShadeSuggestions] = useState<Shade[]>([]);
  const [loadingShades, setLoadingShades] = useState(false);
  const [justAddedToCart, setJustAddedToCart] = useState(false);

  const debouncedShadeSearch = useDebounce(shadesSearch, 300);
  const addItem = useCartStore((state) => state.addItem);

  const {
    items: wishlistItems,
    addItem: wishlistAddItem,
    removeItem: wishlistRemoveItem,
    addToast,
  } = useWishlistStore();
  const { user, openAuthModal } = useAuthStore();

  // Load popular shades or autocomplete suggestions
  useEffect(() => {
    if (debouncedShadeSearch.length < 1) {
      // Load initial popular shades
      const fetchPopular = async () => {
        setLoadingShades(true);
        const shadesList = await shadeService.getPopularShades("all");
        setShadeSuggestions(shadesList.slice(0, 5));
        setLoadingShades(false);
      };
      fetchPopular();
      return;
    }

    const fetchSuggestions = async () => {
      setLoadingShades(true);
      const { shades } = await shadeService.getShades({
        brand: "all",
        search: debouncedShadeSearch,
        limit: 5,
      });
      setShadeSuggestions(shades);
      setLoadingShades(false);
    };
    fetchSuggestions();
  }, [debouncedShadeSearch]);

  // Set default white shade if none selected
  useEffect(() => {
    if (!selectedShade) {
      setSelectedShade({
        id: "default-all-white",
        name: "Classic White",
        shadeCode: "WHT-001",
        hex: "#FFFFFF",
        rgb: "255,255,255",
        brand: "All Brands",
        category: " whites",
        finish: "matt",
        popular: true,
        family: "whites",
      });
    }
  }, [selectedShade]);

  // Calculations for Estimator
  const estimatorResult = useMemo(() => {
    const profile = PAINT_PROFILES[calcProduct];
    if (!profile) return { liters: 0, cost: 0, packs: "" };

    // Standard Coverage rates
    let coveragePerLiter = 145; // average for 2 coats
    if (profile.coverage.includes("140 - 160")) coveragePerLiter = 150;
    if (profile.coverage.includes("120 - 140")) coveragePerLiter = 130;
    if (profile.coverage.includes("130 - 150")) coveragePerLiter = 140;
    if (profile.coverage.includes("80 - 100")) coveragePerLiter = 90;
    if (profile.coverage.includes("70 - 90")) coveragePerLiter = 80;

    // Adjust for coats
    const adjustedCoverage = coveragePerLiter * (2 / coatCount);
    let rawLiters = customArea / adjustedCoverage;
    if (rawLiters < 0.5) rawLiters = 0.5;

    // Ceiling rounding
    const litersRequired = Math.ceil(rawLiters);

    // Dynamic packing optimization
    let remaining = litersRequired;
    const packs: { size: number; qty: number }[] = [];

    // Greedy pack sizing: 20 -> 10 -> 4 -> 1
    const sizes = [20, 10, 4, 1];
    for (const size of sizes) {
      if (remaining >= size) {
        const qty = Math.floor(remaining / size);
        packs.push({ size, qty });
        remaining %= size;
      }
    }
    if (remaining > 0) {
      packs.push({ size: 1, qty: remaining });
    }

    // Cost calculations with bulk savings built-in
    let calculatedTotal = 0;
    packs.forEach((pack) => {
      let discountFactor = 1;
      if (pack.size === 4) discountFactor = 0.96; // 4% bulk discount
      if (pack.size === 10) discountFactor = 0.92; // 8% bulk discount
      if (pack.size === 20) discountFactor = 0.88; // 12% bulk discount

      const packUnitPrice = Math.round(
        profile.price * pack.size * discountFactor,
      );
      calculatedTotal += packUnitPrice * pack.qty;
    });

    // Formatting packs display
    const packsStr = packs.map((p) => `${p.qty}x [${p.size}L]`).join(" + ");

    // For single package selectors
    let priceForSingleClass = profile.price;
    let singleDisc = 1;
    if (calcSize === 4) singleDisc = 0.96;
    if (calcSize === 10) singleDisc = 0.92;
    if (calcSize === 20) singleDisc = 0.88;
    const singlePackCost =
      Math.round(profile.price * calcSize * singleDisc) * calcQuantity;

    return {
      litersNeeded: litersRequired,
      recommendedPacksString: packsStr || "1x [1L]",
      recommendedPacksArray: packs,
      optimizedCost: calculatedTotal,
      selectedSinglePackCost: singlePackCost,
    };
  }, [calcProduct, customArea, coatCount, calcSize, calcQuantity]);

  // Handle Add to Cart
  const handleAddCalculatedToCart = () => {
    const profile = PAINT_PROFILES[calcProduct];
    const item = mockProducts.find((p) => p.id === calcProduct);
    if (!profile || !item) return;

    // Calculate details for each packed item recommended
    estimatorResult.recommendedPacksArray.forEach((pack) => {
      let discountFactor = 1;
      if (pack.size === 4) discountFactor = 0.96;
      if (pack.size === 10) discountFactor = 0.92;
      if (pack.size === 20) discountFactor = 0.88;

      const effectiveUnitPrice = Math.round(
        profile.price * pack.size * discountFactor,
      );

      addItem({
        id: `${item.id}-${pack.size}${selectedShade && selectedShade.shadeCode ? `-${selectedShade.shadeCode}` : "-white"}`,
        productId: item.id,
        name: `${item.name} (${selectedShade?.name || "White"})`,
        brand: item.brand,
        image: item.image,
        size: pack.size,
        quantity: pack.qty,
        unitPrice: effectiveUnitPrice / pack.size,
        shade: selectedShade
          ? {
              name: selectedShade.name,
              code: selectedShade.shadeCode,
              hex: selectedShade.hex,
            }
          : undefined,
      });
    });

    setJustAddedToCart(true);
    setTimeout(() => setJustAddedToCart(false), 2500);
  };

  // Profile data reference
  const profilesArray = Object.values(PAINT_PROFILES);

  return (
    <div className="bg-white/80 border border-[#f0eadd] rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl mb-10 overflow-hidden relative shadow-lg">
      {/* Absolute ambient lights */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-gold/5 via-[#cca564]/2 to-transparent blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-gradient-to-tr from-[#B8975A]/2 via-transparent to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Action tabs selectors */}
      <div className="flex bg-[#f9f6f0] p-1 rounded-xl border border-[#f0eadd] w-full sm:w-auto overflow-x-auto mb-4 scrollbar-hide snap-x">
        {[
          { id: "compare", label: "Spec Comparer", icon: Scale },
          { id: "calculator", label: "Area Estimator", icon: Calculator },
          { id: "glossary", label: "Finish Glossary", icon: Layers },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-3 sm:py-2 text-xs font-display font-medium rounded-lg transition-all whitespace-nowrap shrink-0 snap-start cursor-pointer ${
              activeTab === tab.id
                ? "bg-gold text-white font-semibold shadow-sm"
                : "text-zinc-650 hover:text-[#0B1021] hover:bg-zinc-250/20"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5 shrink-0 text-current" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: Specs Comparer */}
        {activeTab === "compare" && (
          <motion.div
            key="compare-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
              <div className="min-w-[650px] space-y-6">
                {/* Pickers column */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="hidden sm:block"></div>
                  {/* Product Select A */}
                  <div className="space-y-1.5 relative z-[45]">
                    <label className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-600 block">
                      Product A (Super Luxury)
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCompareADropdownOpen(!isCompareADropdownOpen);
                          setIsCompareBDropdownOpen(false);
                          setIsCompareCDropdownOpen(false);
                        }}
                        className="w-full bg-white text-xs text-zinc-800 border border-zinc-200 rounded-xl px-3 py-2.5 font-sans focus:border-gold outline-none flex items-center justify-between text-left cursor-pointer shadow-sm hover:border-zinc-300 transition-all"
                      >
                        <span className="truncate">
                          {profilesArray.find((p) => p.id === compareA)?.name ||
                            "Select Product"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform duration-300 ${isCompareADropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isCompareADropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsCompareADropdownOpen(false)}
                          />
                          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-y-auto max-h-[220px] divide-y divide-zinc-100 z-50 animate-fade-in custom-scrollbar">
                            {profilesArray.map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                  setCompareA(p.id);
                                  setIsCompareADropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors ${compareA === p.id ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-650 hover:bg-zinc-50"}`}
                              >
                                {p.name} ({p.category})
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Product Select B */}
                  <div className="space-y-1.5 relative z-[44]">
                    <label className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-600 block">
                      Product B (Premium Base)
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCompareBDropdownOpen(!isCompareBDropdownOpen);
                          setIsCompareADropdownOpen(false);
                          setIsCompareCDropdownOpen(false);
                        }}
                        className="w-full bg-white text-xs text-zinc-800 border border-zinc-200 rounded-xl px-3 py-2.5 font-sans focus:border-gold outline-none flex items-center justify-between text-left cursor-pointer shadow-sm hover:border-zinc-300 transition-all"
                      >
                        <span className="truncate">
                          {profilesArray.find((p) => p.id === compareB)?.name ||
                            "Select Product"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform duration-300 ${isCompareBDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isCompareBDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsCompareBDropdownOpen(false)}
                          />
                          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-y-auto max-h-[220px] divide-y divide-zinc-100 z-50 animate-fade-in custom-scrollbar">
                            {profilesArray.map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                  setCompareB(p.id);
                                  setIsCompareBDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors ${compareB === p.id ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-650 hover:bg-zinc-50"}`}
                              >
                                {p.name} ({p.category})
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Product Select C */}
                  <div className="space-y-1.5 relative z-[43]">
                    <label className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-600 block">
                      Product C (Economy Segment)
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCompareCDropdownOpen(!isCompareCDropdownOpen);
                          setIsCompareADropdownOpen(false);
                          setIsCompareBDropdownOpen(false);
                        }}
                        className="w-full bg-white text-xs text-zinc-800 border border-zinc-200 rounded-xl px-3 py-2.5 font-sans focus:border-gold outline-none flex items-center justify-between text-left cursor-pointer shadow-sm hover:border-zinc-300 transition-all"
                      >
                        <span className="truncate">
                          {profilesArray.find((p) => p.id === compareC)?.name ||
                            "Select Product"}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform duration-300 ${isCompareCDropdownOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isCompareCDropdownOpen && (
                        <>
                          <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsCompareCDropdownOpen(false)}
                          />
                          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-y-auto max-h-[220px] divide-y divide-zinc-100 z-50 animate-fade-in custom-scrollbar">
                            {profilesArray.map((p) => (
                              <button
                                key={p.id}
                                type="button"
                                onClick={() => {
                                  setCompareC(p.id);
                                  setIsCompareCDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors ${compareC === p.id ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-650 hover:bg-zinc-50"}`}
                              >
                                {p.name} ({p.category})
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Comparison Side-by-Side Matrix Grid */}
                <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  {/* Product Headers row */}
                  <div className="grid grid-cols-4 border-b border-zinc-200 bg-[#f9f6f0]/70 py-3 text-center sm:text-left animate-fade-in">
                    <div className="p-3 text-zinc-550 text-zinc-600 font-display font-bold text-[10px] uppercase tracking-wider self-center sm:pl-6 leading-none">
                      Characteristics
                    </div>
                    {[compareA, compareB, compareC].map((prodId) => {
                      const p = PAINT_PROFILES[prodId];
                      return (
                        <div
                          key={prodId}
                          className="p-2 self-center text-center"
                        >
                          <span
                            className={`text-[8px] font-display font-bold px-1.5 py-0.5 rounded uppercase tracking-widest ${
                              p.category === "Super Luxury"
                                ? "bg-amber-50 text-amber-700 border border-amber-200/50"
                                : p.category === "Premium"
                                  ? "bg-purple-50 text-purple-700 border border-purple-200/50"
                                  : p.category === "Standard"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                    : "bg-zinc-100 text-zinc-650"
                            }`}
                          >
                            {p.category}
                          </span>
                          <div className="font-serif font-bold text-xs sm:text-sm text-[#0B1021] mt-1.5 truncate max-w-[150px] mx-auto">
                            {p.name}
                          </div>
                          <p className="text-[10px] font-mono text-gold font-bold mt-0.5">
                            ₹{p.price}{" "}
                            <span className="text-zinc-600 font-sans font-normal text-[9px]">
                              per L
                            </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Rows matching features */}
                  {[
                    {
                      label: "Sheen Level",
                      valA: PAINT_PROFILES[compareA].sheenLevel,
                      valB: PAINT_PROFILES[compareB].sheenLevel,
                      valC: PAINT_PROFILES[compareC].sheenLevel,
                      icon: Sparkles,
                    },
                    {
                      label: "Scrub & Wash",
                      valA: PAINT_PROFILES[compareA].washability,
                      valB: PAINT_PROFILES[compareB].washability,
                      valC: PAINT_PROFILES[compareC].washability,
                      icon: Activity,
                    },
                    {
                      label: "Stain Resistance",
                      valA: PAINT_PROFILES[compareA].stainResistance,
                      valB: PAINT_PROFILES[compareB].stainResistance,
                      valC: PAINT_PROFILES[compareC].stainResistance,
                      icon: ShieldCheck,
                    },
                    {
                      label: "Warranty Cover",
                      valA: PAINT_PROFILES[compareA].warranty,
                      valB: PAINT_PROFILES[compareB].warranty,
                      valC: PAINT_PROFILES[compareC].warranty,
                      icon: Clock,
                    },
                    {
                      label: "Sheet Coverage",
                      valA: PAINT_PROFILES[compareA].coverage,
                      valB: PAINT_PROFILES[compareB].coverage,
                      valC: PAINT_PROFILES[compareC].coverage,
                      icon: Package,
                    },
                    {
                      label: "VOC & Emissions",
                      valA: PAINT_PROFILES[compareA].airQuality,
                      valB: PAINT_PROFILES[compareB].airQuality,
                      valC: PAINT_PROFILES[compareC].airQuality,
                      icon: Info,
                    },
                  ].map((row, rIdx) => (
                    <div
                      key={rIdx}
                      className="grid grid-cols-4 border-b border-zinc-100 last:border-0 hover:bg-[#f9f6f0]/20 transition-colors"
                    >
                      <div className="p-3 text-zinc-600 text-xs font-sans font-medium flex items-center gap-1.5 sm:pl-6">
                        <row.icon className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                        <span>{row.label}</span>
                      </div>
                      <div className="p-3 text-center self-center text-xs text-zinc-800 font-sans font-semibold">
                        {row.valA}
                      </div>
                      <div className="p-3 text-center self-center text-xs text-zinc-800 font-sans font-semibold">
                        {row.valB}
                      </div>
                      <div className="p-3 text-center self-center text-xs text-zinc-800 font-sans font-semibold">
                        {row.valC}
                      </div>
                    </div>
                  ))}

                  {/* Specific detail advantages row */}
                  <div className="grid grid-cols-4 bg-[#f9f6f0]/30 py-4">
                    <div className="p-3 font-display font-medium text-zinc-600 text-[10px] uppercase tracking-wider sm:pl-6">
                      Core Advantages
                    </div>
                    {[compareA, compareB, compareC].map((prodId) => {
                      const p = PAINT_PROFILES[prodId];
                      return (
                        <div key={prodId} className="p-3 px-4">
                          <ul className="space-y-1.5 text-[11px] text-zinc-650 font-sans">
                            {p.advantages.map((adv, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-tight">{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  {/* Best For Row */}
                  <div className="grid grid-cols-4 border-t border-zinc-100 bg-[#f9f6f0]/10">
                    <div className="p-3 font-display font-medium text-zinc-600 text-[10px] uppercase tracking-wider self-center sm:pl-6 p-3">
                      Best Suited For
                    </div>
                    {[compareA, compareB, compareC].map((prodId) => {
                      const p = PAINT_PROFILES[prodId];
                      return (
                        <div
                          key={prodId}
                          className="p-3 text-center self-center"
                        >
                          <p className="text-[10px] text-zinc-600 leading-tight italic">
                            {p.bestFor}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Paint Coverage Estimator (Redirect to Dedicated) */}
        {activeTab === "calculator" && (
          <motion.div
            key="calc-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center p-12 bg-[#f9f6f0]/40 border border-[#f0eadd]/60 rounded-2xl shadow-sm text-center"
          >
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-4">
              <Calculator className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl font-sans font-bold text-[#0B1021] mb-2">
              Advanced Paint Cost Estimator
            </h3>
            <p className="text-sm text-zinc-650 max-w-md mb-6">
              We've upgraded our calculator! You can now estimate costs using
              both room dimensions or quick area presets, compare different
              qualities, and get precise pack recommendations.
            </p>
            <a
              href="/calculator"
              className="inline-flex items-center gap-2 bg-[#0B1021] text-white px-6 py-3 rounded-xl font-display font-bold uppercase tracking-wider text-xs hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Open Dedicated Calculator <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}

        {/* TAB 3: Glossary of Finishes */}
        {activeTab === "glossary" && (
          <motion.div
            key="gloss-tab"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {[
              {
                title: "Matt Finish",
                desc: "Zero reflectivity velvety flat texture. It completely absorbs light without reflection, absorbing glare and conceals all minor wall dents, sheet waves, and plaster marks.",
                benefit: "Best for premium aesthetics & hiding flaws",
                products: [
                  "Royale Matt Emulsion",
                  "Apcolite Premium Emulsion",
                  "Apcolite Advanced Emulsion",
                  "Tractor Emulsion",
                  "Tractor Sparc Emulsion",
                ],
              },
              {
                title: "Low Sheen / Soft Sheen",
                desc: "Beautiful, low intensity pearlescent glow. It reflects just enough light to illuminate a room nicely while offering outstanding wipe washability and water splash defense.",
                benefit: "Best for bedrooms, children rooms & kitchen margins",
                products: ["Royale Luxury Emulsion", "Royale Health Shield"],
              },
              {
                title: "High Sheen",
                desc: "Bright, rich reflective gloss. Offers supreme metallic shine that bounce light into darker spaces, providing incredible smooth sliding touch and premium status styling.",
                benefit: "Best for modern living lounges & accent panels",
                products: [
                  "Royale Glitz",
                  "Royale Shyne Luxury Emulsion",
                  "Tractor Emulsion Shyne",
                ],
              },
              {
                title: "Ultra Sheen / Silk",
                desc: "Highly luxurious reflective, slick smooth silk sheen. Moisture resistant, ultra-slippery scrub proof coating that withstands humidity, wet scrubbing & steam easily.",
                benefit: "Best for master drawings, modular spaces & ceilings",
                products: ["Royale Aspira"],
              },
            ].map((finish, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#f0eadd] p-4.5 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <h3 className="font-serif font-bold text-[#0B1021] text-base leading-none">
                      {finish.title}
                    </h3>
                  </div>
                  <p className="text-zinc-600 text-xs font-sans mb-3.5 leading-relaxed">
                    {finish.desc}
                  </p>

                  <div className="bg-[#B8975A]/15 text-[#B8975A] px-2.5 py-1.5 rounded-md border border-[#B8975A]/25 inline-block text-[10px] font-semibold mb-4">
                    ✨ {finish.benefit}
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 leading-tight">
                  <span className="text-[8px] font-display font-bold uppercase tracking-wider text-zinc-600 block mb-1.5">
                    Matching Catalog lines
                  </span>
                  <div className="flex flex-col gap-1">
                    {finish.products.map((pName, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center gap-1.5 text-[10.5px] text-zinc-700 font-sans font-medium"
                      >
                        <ArrowUpRight className="w-3 h-3 text-gold shrink-0 animate-pulse" />
                        <span>{pName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="md:col-span-4 mt-2 flex justify-center">
              <Link
                to="/blog/understanding-paint-finishes-glossary"
                className="inline-flex items-center gap-2 bg-[#0B1021] hover:bg-[#1a2342] text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-md"
              >
                <BookOpen className="w-4 h-4" />
                Read the Complete Guide on Paint Finishes
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
