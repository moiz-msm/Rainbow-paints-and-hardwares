import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Check,
  X,
  Layers,
  Droplet,
  Sun,
  Home,
  Maximize,
  AlertCircle,
  Info,
  Plus,
  ChevronDown,
  CheckCircle2,
  Coins,
  Calculator,
} from "lucide-react";
import SEO from "../components/SEO";

interface PaintModel {
  id: string;
  name: string;
  brand: "Asian Paints" | "Berger Paints" | "MRF Vapocure";
  type: "Interior" | "Exterior";
  category: "Super Luxury" | "Premium" | "Standard" | "Economy";
  pricePerLiter: number;
  sheenLevel: number; // 0 to 10
  sheenText: string;
  washability?: number; // 0 to 10
  stainResistance?: "Excellent" | "High" | "Moderate" | "Basic";
  antiAlgal?: "Excellent" | "High" | "Moderate" | "Basic";
  waterResistance?: "Excellent" | "High" | "Moderate" | "Basic";
  dustResistance?: "Excellent" | "High" | "Moderate" | "Basic";
  durability: number; // 0 to 10
  warrantyYears: number | "None";
  coverage: string;
  vocEmissions: string;
  coreAdvantages: string[];
  keyFeatures: string[];
  bestSuitedFor: string;
  description: string;
  image: string;
}

const ALL_PAINTS: PaintModel[] = [
  // INTERIOR
  {
    id: "ap-royale-glitz",
    name: "Royale Glitz",
    brand: "Asian Paints",
    type: "Interior",
    category: "Super Luxury",
    pricePerLiter: 1250,
    sheenLevel: 9,
    sheenText: "Ultra High Sheen",
    washability: 10,
    durability: 10,
    warrantyYears: 8,
    coverage: "140 - 150 sq.ft/L",
    stainResistance: "Excellent",
    vocEmissions: "Low VOC, Green Assured",
    coreAdvantages: [
      "Teflon™ Surface Protector",
      "Ultra Stain-Repellent",
      "Crack Bridging",
    ],
    keyFeatures: [
      "Teflon™ Surface Protector",
      "Ultra Stain-Repellent",
      "Crack Bridging",
    ],
    bestSuitedFor: "Luxury Living Rooms & High-traffic accent walls demanding a rich high-gloss luster.",
    description:
      "Luxury interior paint delivering a rich, ultra-high sheen finish with unparalleled stain resistance.",
    image:
      "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-glitz-asian-paints.png",
  },
  {
    id: "ap-royale-luxury",
    name: "Royale Luxury Emulsion",
    brand: "Asian Paints",
    type: "Interior",
    category: "Premium",
    pricePerLiter: 850,
    sheenLevel: 7,
    sheenText: "Soft Sheen",
    washability: 8,
    durability: 8,
    warrantyYears: 5,
    coverage: "140 - 150 sq.ft/L",
    stainResistance: "High",
    vocEmissions: "Low VOC",
    coreAdvantages: ["Green Assured", "Anti-bacterial", "Smooth pearl finish"],
    keyFeatures: ["Green Assured", "Anti-bacterial", "Smooth pearl finish"],
    bestSuitedFor: "Elegant bedrooms and hallways requesting a soothing, soft, pearl-like shine.",
    description:
      "The classic choice for premium interiors, offering a soothing, soft pearl-like glow and easy washability.",
    image:
      "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-luxury-emulsion-asian-paints.png",
  },
  {
    id: "ap-apcolite-premium",
    name: "Apcolite Premium Emulsion",
    brand: "Asian Paints",
    type: "Interior",
    category: "Standard",
    pricePerLiter: 450,
    sheenLevel: 3,
    sheenText: "Rich Matte",
    washability: 6,
    durability: 7,
    warrantyYears: 5,
    coverage: "120 - 140 sq.ft/L",
    stainResistance: "Moderate",
    vocEmissions: "Standard VOC",
    coreAdvantages: [
      "Rich Matte Finish",
      "Fungus & Mildew Resistance",
      "Long-lasting",
    ],
    keyFeatures: [
      "Rich Matte Finish",
      "Fungus & Mildew Resistance",
      "Long-lasting",
    ],
    bestSuitedFor: "Premium budget homes wanting deep, cozy, flat matte colors that conceal wall flaws.",
    description:
      "A highly dependable matte finish emulsion known for its rich appearance and tough durability.",
    image:
      "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-premium-emulsion-asian-paints.png",
  },
  {
    id: "ap-tractor-emulsion",
    name: "Tractor Emulsion",
    brand: "Asian Paints",
    type: "Interior",
    category: "Economy",
    pricePerLiter: 220,
    sheenLevel: 2,
    sheenText: "Smooth Matte",
    washability: 3,
    durability: 5,
    warrantyYears: "None",
    coverage: "130 - 150 sq.ft/L",
    stainResistance: "Basic",
    vocEmissions: "Standard VOC",
    coreAdvantages: [
      "1.5x more coverage than distemper",
      "Affordable setup",
      "Smooth finish",
    ],
    keyFeatures: [
      "1.5x more coverage than distemper",
      "Affordable setup",
      "Smooth finish",
    ],
    bestSuitedFor: "Rental properties and economic upgrades from distemper to high-coverage plastic paint.",
    description:
      "The perfect upgrade from distemper, offering a smooth finish and excellent coverage for budget projects.",
    image:
      "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-emulsion-asian-paints.png",
  },
  {
    id: "bp-silk-glamor",
    name: "Silk Glamor",
    brand: "Berger Paints",
    type: "Interior",
    category: "Super Luxury",
    pricePerLiter: 1100,
    sheenLevel: 9,
    sheenText: "High Metallic Sheen",
    washability: 9,
    durability: 9,
    warrantyYears: 8,
    coverage: "130 - 150 sq.ft/L",
    stainResistance: "Excellent",
    vocEmissions: "Standard VOC",
    coreAdvantages: [
      "Crystal Reflective Technology",
      "Elastomeric Film",
      "Superior Washability",
    ],
    keyFeatures: [
      "Crystal Reflective Technology",
      "Elastomeric Film",
      "Superior Washability",
    ],
    bestSuitedFor: "Ultra Glamorous Sheen for premium living spaces.",
    description:
      "Formulated with crystal reflective technology to give walls an ultra-glamorous, rich look.",
    image: "https://www.bergerpaints.com/products/packshots/silk-glamor.png",
  },
  {
    id: "bp-easy-clean",
    name: "Easy Clean Fresh",
    brand: "Berger Paints",
    type: "Interior",
    category: "Premium",
    pricePerLiter: 650,
    sheenLevel: 6,
    sheenText: "Satin Luster",
    washability: 9,
    durability: 8,
    warrantyYears: 5,
    coverage: "120 - 140 sq.ft/L",
    stainResistance: "High",
    vocEmissions: "Standard VOC",
    coreAdvantages: [
      "Cross-linking Polymers",
      "Fresh Fragrance",
      "Highly Washable",
    ],
    keyFeatures: [
      "Cross-linking Polymers",
      "Fresh Fragrance",
      "Highly Washable",
    ],
    bestSuitedFor: "Homes with children requiring frequent cleaning and stain resistance.",
    description:
      "Specially designed for homes with kids, featuring cross-linking polymers that make stains easily wipeable.",
    image:
      "https://www.bergerpaints.com/products/packshots/easy-clean-fresh.png",
  },
  {
    id: "mrf-ruca-luxury",
    name: "RUCA Luxury",
    brand: "MRF Vapocure",
    type: "Interior",
    category: "Super Luxury",
    pricePerLiter: 1150,
    sheenLevel: 7,
    sheenText: "Soft Pearl Sheen",
    washability: 9,
    durability: 9,
    warrantyYears: 10,
    coverage: "140 - 160 sq.ft/L",
    stainResistance: "High",
    vocEmissions: "Low VOC",
    coreAdvantages: [
      "10-Year Warranty",
      "Anti-Bacterial",
      "PU Enriched Formula",
    ],
    keyFeatures: ["10-Year Warranty", "Anti-Bacterial", "PU Enriched Formula"],
    bestSuitedFor: "Luxury living spaces with high washability needs.",
    description:
      "A specialized luxury interior paint from MRF utilizing polyurethane technology for exceptional durability.",
    image: "https://www.mrfpaints.com/images/products/ruca.png", // placeholder
  },
  // EXTERIOR
  {
    id: "ap-ultima-protek",
    name: "Ultima Protek",
    brand: "Asian Paints",
    type: "Exterior",
    category: "Super Luxury",
    pricePerLiter: 980,
    sheenLevel: 6,
    sheenText: "Soft Sheen",
    antiAlgal: "Excellent",
    waterResistance: "Excellent",
    dustResistance: "Excellent",
    durability: 10,
    warrantyYears: 12,
    coverage: "130 sq.ft/L",
    vocEmissions: "Low VOC",
    coreAdvantages: [
      "Lamination Guard",
      "Graphene Technology",
      "Structural Protection",
    ],
    keyFeatures: [
      "Lamination Guard",
      "Graphene Technology",
      "Structural Protection",
    ],
    bestSuitedFor: "Heavy rainfall regions and premium exteriors requiring maximum protection against the elements.",
    description:
      "The ultimate exterior armor, providing lamination-like protection against harsh weather, algae, and cracks.",
    image:
      "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-ultima-protek-topcoat-new-asian-paints.png",
  },
  {
    id: "ap-apex-ultima",
    name: "Apex Ultima",
    brand: "Asian Paints",
    type: "Exterior",
    category: "Premium",
    pricePerLiter: 620,
    sheenLevel: 5,
    sheenText: "Satin Sheen",
    antiAlgal: "Excellent",
    waterResistance: "High",
    dustResistance: "High",
    durability: 8,
    warrantyYears: 7,
    coverage: "110 - 130 sq.ft/L",
    vocEmissions: "Standard VOC",
    coreAdvantages: [
      "Advanced Anti-Algal",
      "Color Stay Technology",
      "Dirt Pick-up Resistance",
    ],
    keyFeatures: [
      "Advanced Anti-Algal",
      "Color Stay Technology",
      "Dirt Pick-up Resistance",
    ],
    bestSuitedFor: "General exterior walls requiring protection from dust, algae, and UV rays.",
    description:
      "A high-performance exterior emulsion that keeps walls looking vibrant and protected from algae for years.",
    image:
      "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-ultima-asian-paints.png",
  },
  {
    id: "bp-weathercoat-longlife",
    name: "Weathercoat Long Life",
    brand: "Berger Paints",
    type: "Exterior",
    category: "Super Luxury",
    pricePerLiter: 920,
    sheenLevel: 6,
    sheenText: "Rich Sheen",
    antiAlgal: "High",
    waterResistance: "Excellent",
    dustResistance: "High",
    durability: 10,
    warrantyYears: 10,
    coverage: "120 - 140 sq.ft/L",
    vocEmissions: "Low VOC",
    coreAdvantages: [
      "PU & Silicon Technology",
      "Heavy Rainfall Protection",
      "10-Year Warranty",
    ],
    keyFeatures: [
      "PU & Silicon Technology",
      "Heavy Rainfall Protection",
      "10-Year Warranty",
    ],
    bestSuitedFor: "Extreme weather areas and coastal regions needing heavy-duty weatherproofing.",
    description:
      "Formulated with PU and Silicon, offering unmatched water repellency and protection against extreme weather.",
    image:
      "https://www.bergerpaints.com/products/packshots/weathercoat-long-life.png",
  },
];

const ProgressMeter = ({
  value,
  max = 10,
  colorClass = "bg-gold",
}: {
  value: number;
  max?: number;
  colorClass?: string;
}) => {
  return (
    <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden mt-1.5">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`h-full ${colorClass}`}
      />
    </div>
  );
};

export default function ComparePaintsPage() {
  const [filterType, setFilterType] = useState<"Interior" | "Exterior">(
    "Interior",
  );

  const [interiorSlots, setInteriorSlots] = useState<(string | null)[]>([
    "ap-royale-glitz",
    "bp-silk-glamor",
    "ap-royale-luxury",
    null,
  ]);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );
  const [exteriorSlots, setExteriorSlots] = useState<(string | null)[]>([
    "ap-ultima-protek",
    "bp-weathercoat-longlife",
    "ap-apex-ultima",
    null,
  ]);

  const activeSlots = filterType === "Interior" ? interiorSlots : exteriorSlots;
  const setSlots =
    filterType === "Interior" ? setInteriorSlots : setExteriorSlots;

  const selectedProducts = useMemo(() => {
    return activeSlots.map((id) =>
      id ? ALL_PAINTS.find((p) => p.id === id) || null : null,
    );
  }, [activeSlots]);

  const availableToPick = useMemo(() => {
    return ALL_PAINTS.filter((p) => p.type === filterType);
  }, [filterType]);

  const getAvgCoverage = (coverage: string) => {
    const nums = coverage.match(/\d+/g);
    if (!nums) return 100;
    if (nums.length === 1) return parseInt(nums[0]);
    return (parseInt(nums[0]) + parseInt(nums[1])) / 2;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pt-28 pb-20">
      <SEO
        title="Compare Premium Paints | Rainbow Paint and Hardwares"
        description="Compare premium interior and exterior emulsion wall paints side-by-side. Analyze sheen, washability, durability, and key features to find the perfect paint for your home."
        url="https://www.rainbowpaint.in/compare-paints"
      />

      {/* Hero Section */}
      <div className="max-w-[1400px] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1A365D] tracking-tight leading-none mb-6"
        >
          Compare Wall Paints
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-[#1A365D]/80 text-lg md:text-xl font-light"
        >
          Make an informed decision. Select up to 4 wall paints to compare
          sheen, washability, coverage, and value side-by-side.
        </motion.p>
      </div>

      <div className="max-w-[1400px] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-zinc-100 mb-8 gap-4">
          <div className="flex items-center p-1 bg-zinc-100 rounded-lg">
            {(["Interior", "Exterior"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${filterType === type ? "bg-white shadow-sm text-gold" : "text-zinc-600 hover:text-zinc-900"}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 overflow-hidden relative">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[700px] sm:min-w-[800px]">
              {/* Header Row (Products) */}
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="p-4 sm:p-6 bg-zinc-50/50 w-28 sm:w-[20%] sticky left-0 z-20 shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100 align-bottom">
                    <div className="text-lg sm:text-xl font-serif text-zinc-900">
                      Compare
                    </div>
                    <div className="text-xs sm:text-sm font-light text-zinc-500 mt-1">
                      Side-by-side analysis
                    </div>
                  </th>
                  {activeSlots.map((slotId, index) => {
                    const p = selectedProducts[index];
                    return (
                      <th
                        key={`col-${index}`}
                        className="p-4 sm:p-6 w-[20%] relative group min-w-[180px] sm:min-w-[240px] align-top bg-white border-l border-zinc-100"
                      >
                        {/* Dropdown Selector */}
                        <div className="relative mb-6">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenDropdownIndex(
                                openDropdownIndex === index ? null : index,
                              )
                            }
                            className="w-full flex items-center justify-between text-left p-2.5 border border-zinc-200 rounded-lg text-xs sm:text-sm bg-zinc-50 font-medium text-zinc-800 transition-colors focus:ring-1 focus:ring-gold focus:border-gold hover:bg-zinc-100"
                          >
                            <span className="truncate">
                              {p
                                ? `${p.name} (${p.category})`
                                : "-- Select Paint --"}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-300 ${openDropdownIndex === index ? "rotate-180" : ""}`}
                            />
                          </button>
                          {openDropdownIndex === index && (
                            <>
                              <div
                                className="fixed inset-0 z-40"
                                onClick={() => setOpenDropdownIndex(null)}
                              />
                              <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-y-auto max-h-[220px] divide-y divide-zinc-100 z-50 animate-fade-in custom-scrollbar">
                                {availableToPick.map((paint) => (
                                  <button
                                    key={paint.id}
                                    type="button"
                                    onClick={() => {
                                      const newSlots = [...activeSlots];
                                      newSlots[index] = paint.id;
                                      setSlots(newSlots);
                                      setOpenDropdownIndex(null);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs font-semibold transition-colors ${slotId === paint.id ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-650 hover:bg-zinc-50"}`}
                                  >
                                    {paint.name} ({paint.category})
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        {p ? (
                          <>
                            <button
                              onClick={() => {
                                const newSlots = [...activeSlots];
                                newSlots[index] = null;
                                setSlots(newSlots);
                              }}
                              className="absolute top-[88px] right-6 p-1.5 bg-white text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors opacity-0 group-hover:opacity-100 shadow-sm border border-zinc-100 z-10"
                              title="Remove from comparison"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <div className="h-32 flex items-center justify-center mb-4 relative p-4 bg-zinc-50 rounded-2xl">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="h-full object-contain mix-blend-multiply"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-glitz-asian-paints.png";
                                }}
                              />
                              <div
                                className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                  p.category === "Super Luxury"
                                    ? "bg-amber-100 text-amber-800"
                                    : p.category === "Premium"
                                      ? "bg-purple-100 text-purple-800"
                                      : p.category === "Standard"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-zinc-200 text-zinc-700"
                                }`}
                              >
                                {p.category}
                              </div>
                            </div>
                            <h3 className="font-serif text-xl text-zinc-900 leading-tight mb-1">
                              {p.name}
                            </h3>
                            <p className="text-xs font-medium text-gold uppercase tracking-wider mb-2">
                              {p.brand}
                            </p>
                            <p className="text-xs text-zinc-500 font-light leading-relaxed min-h-[48px]">
                              {p.description}
                            </p>
                          </>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center opacity-50 mt-12">
                            <div className="w-12 h-12 rounded-full border-2 border-dashed border-zinc-300 flex items-center justify-center mb-3 bg-zinc-50">
                              <Plus className="w-5 h-5 text-zinc-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-500">
                              Select Paint
                            </span>
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {/* Basic Info */}
                <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                      <Home className="w-4 h-4 text-gold shrink-0" />{" "}
                      <span className="hidden sm:inline">Application</span>
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td
                      key={`app-${idx}`}
                      className={`p-4 sm:p-6 text-xs sm:text-sm text-zinc-700 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                    >
                      {p ? `${p.type} Wall Paint` : null}
                    </td>
                  ))}
                </tr>

                {/* Price Row */}
                <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                      <AlertCircle className="w-4 h-4 text-gold shrink-0" />{" "}
                      <span className="hidden sm:inline">Approx. Price</span>
                      <span className="sm:hidden">Price</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-zinc-400 font-light mt-1">
                      Per Liter (MRP)
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td
                      key={`price-${idx}`}
                      className={`p-4 sm:p-6 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                    >
                      {p ? (
                        <>
                          <div className="text-lg sm:text-xl font-medium text-zinc-900">
                            ₹{p.pricePerLiter}
                          </div>
                          <div className="text-[10px] sm:text-xs text-zinc-500 mt-1">
                            / Liter
                          </div>
                        </>
                      ) : null}
                    </td>
                  ))}
                </tr>

                {/* Sheen Level */}
                <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                      <Sun className="w-4 h-4 text-gold shrink-0" />{" "}
                      <span className="hidden sm:inline">
                        Sheen / Gloss Level
                      </span>
                      <span className="sm:hidden">Sheen</span>
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td
                      key={`sheen-${idx}`}
                      className={`p-4 sm:p-6 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                    >
                      {p ? (
                        <>
                          <div className="text-xs sm:text-sm font-medium text-zinc-800 mb-2">
                            {p.sheenText}
                          </div>
                          <ProgressMeter
                            value={p.sheenLevel}
                            colorClass="bg-gradient-to-r from-amber-200 to-amber-500"
                          />
                        </>
                      ) : null}
                    </td>
                  ))}
                </tr>

                {filterType === "Interior" && (
                  <>
                    {/* Washability */}
                    <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                          <Droplet className="w-4 h-4 text-gold shrink-0" />{" "}
                          <span className="hidden sm:inline">Washability</span>
                          <span className="sm:hidden">Wash</span>
                        </div>
                        <div className="text-[9px] sm:text-[10px] text-zinc-400 font-light mt-1">
                          Stain removal ease
                        </div>
                      </td>
                      {selectedProducts.map((p, idx) => (
                        <td
                          key={`wash-${idx}`}
                          className={`p-4 sm:p-6 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                        >
                          {p ? (
                            <>
                              <div className="text-xs sm:text-sm font-medium text-zinc-800 mb-2">
                                {p.washability || 0}/10
                              </div>
                              <ProgressMeter
                                value={p.washability || 0}
                                colorClass="bg-gradient-to-r from-blue-300 to-blue-500"
                              />
                            </>
                          ) : null}
                        </td>
                      ))}
                    </tr>

                    {/* Stain Resistance */}
                    <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                          <ShieldCheck className="w-4 h-4 text-gold shrink-0" />{" "}
                          <span className="hidden sm:inline">
                            Stain Resistance
                          </span>
                          <span className="sm:hidden">Stain Res.</span>
                        </div>
                      </td>
                      {selectedProducts.map((p, idx) => (
                        <td
                          key={`stain-${idx}`}
                          className={`p-4 sm:p-6 text-xs sm:text-sm text-zinc-700 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                        >
                          {p ? p.stainResistance : null}
                        </td>
                      ))}
                    </tr>
                  </>
                )}

                {filterType === "Exterior" && (
                  <>
                    {/* Anti Algal */}
                    <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                          <ShieldCheck className="w-4 h-4 text-gold shrink-0" />{" "}
                          <span className="hidden sm:inline">
                            Anti-Algal Protection
                          </span>
                          <span className="sm:hidden">Anti-Algal</span>
                        </div>
                      </td>
                      {selectedProducts.map((p, idx) => (
                        <td
                          key={`algal-${idx}`}
                          className={`p-4 sm:p-6 text-xs sm:text-sm text-zinc-700 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                        >
                          {p ? p.antiAlgal : null}
                        </td>
                      ))}
                    </tr>

                    {/* Water Resistance */}
                    <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                          <Droplet className="w-4 h-4 text-gold shrink-0" />{" "}
                          <span className="hidden sm:inline">
                            Water Resistance
                          </span>
                          <span className="sm:hidden">Water Res.</span>
                        </div>
                      </td>
                      {selectedProducts.map((p, idx) => (
                        <td
                          key={`water-${idx}`}
                          className={`p-4 sm:p-6 text-xs sm:text-sm text-zinc-700 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                        >
                          {p ? p.waterResistance : null}
                        </td>
                      ))}
                    </tr>

                    {/* Dust Resistance */}
                    <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                      <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                          <Sparkles className="w-4 h-4 text-gold shrink-0" />{" "}
                          <span className="hidden sm:inline">
                            Dust Resistance
                          </span>
                          <span className="sm:hidden">Dust Res.</span>
                        </div>
                      </td>
                      {selectedProducts.map((p, idx) => (
                        <td
                          key={`dust-${idx}`}
                          className={`p-4 sm:p-6 text-xs sm:text-sm text-zinc-700 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                        >
                          {p ? p.dustResistance : null}
                        </td>
                      ))}
                    </tr>
                  </>
                )}

                {/* Durability */}
                <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                      <ShieldCheck className="w-4 h-4 text-gold shrink-0" />{" "}
                      <span className="hidden sm:inline">
                        Durability / Life
                      </span>
                      <span className="sm:hidden">Life</span>
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td
                      key={`dur-${idx}`}
                      className={`p-4 sm:p-6 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                    >
                      {p ? (
                        <>
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-xs sm:text-sm font-medium text-zinc-800">
                              {p.warrantyYears !== "None"
                                ? `${p.warrantyYears} Years`
                                : "Standard"}
                            </span>
                            {p.warrantyYears !== "None" && (
                              <span className="text-[8px] sm:text-[9px] text-zinc-500 uppercase tracking-wider hidden sm:inline">
                                Warranty
                              </span>
                            )}
                          </div>
                          <ProgressMeter
                            value={p.durability}
                            colorClass="bg-gradient-to-r from-emerald-300 to-emerald-500"
                          />
                        </>
                      ) : null}
                    </td>
                  ))}
                </tr>

                {/* Coverage */}
                <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                      <Maximize className="w-4 h-4 text-gold shrink-0" />{" "}
                      <span className="hidden sm:inline">Coverage</span>
                      <span className="sm:hidden">Cov.</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-zinc-400 font-light mt-1">
                      2 Coats (sq.ft/L)
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td
                      key={`cov-${idx}`}
                      className={`p-4 sm:p-6 text-xs sm:text-sm font-medium text-zinc-800 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                    >
                      {p ? p.coverage : null}
                    </td>
                  ))}
                </tr>

                {/* Value Analysis */}
                <tr className="border-b border-zinc-100 bg-gold/5 hover:bg-gold/10 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gold">
                      <Coins className="w-4 h-4 shrink-0" />{" "}
                      <span className="hidden sm:inline">Value Analysis</span>
                      <span className="sm:hidden">Value</span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-zinc-500 font-light mt-1">
                      Cost Breakdown
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => {
                    if (!p)
                      return (
                        <td
                          key={`val-${idx}`}
                          className="p-4 sm:p-6 border-l border-zinc-100 border-dashed bg-zinc-50/30"
                        ></td>
                      );
                    const avgCov = getAvgCoverage(p.coverage);
                    const costPerSqFt = p.pricePerLiter / avgCov;
                    const costPer1000SqFt = costPerSqFt * 1000;
                    const warrantyYears =
                      p.warrantyYears === "None" ? 3 : p.warrantyYears;
                    const yearlyCost1000SqFt = costPer1000SqFt / warrantyYears;

                    return (
                      <td
                        key={`val-${idx}`}
                        className="p-4 sm:p-6 text-xs sm:text-sm"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-zinc-200/50 pb-2">
                            <span className="text-zinc-500 text-[10px] sm:text-xs">
                              Cost / 1000 sq.ft:
                            </span>
                            <span className="font-medium text-zinc-900">
                              ₹{costPer1000SqFt.toFixed(0)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm border border-gold/20">
                            <span className="text-gold text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                              <span className="hidden sm:inline">
                                Per Year Lifetime{" "}
                              </span>
                              Cost:
                            </span>
                            <div className="text-right">
                              <span className="font-bold text-zinc-900 text-xs sm:text-sm">
                                ₹{yearlyCost1000SqFt.toFixed(0)}
                              </span>
                              <span className="text-[8px] sm:text-[9px] text-zinc-400 block -mt-1 font-light">
                                / yr / 1000 sq.ft
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* VOC Emissions */}
                <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                      <Info className="w-4 h-4 text-gold shrink-0" />{" "}
                      <span className="hidden sm:inline">VOC Emissions</span>
                      <span className="sm:hidden">VOC</span>
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td
                      key={`voc-${idx}`}
                      className={`p-4 sm:p-6 text-xs sm:text-sm text-zinc-700 ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                    >
                      {p ? p.vocEmissions : null}
                    </td>
                  ))}
                </tr>

                {/* Key Features */}
                <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                      <Layers className="w-4 h-4 text-gold shrink-0" />{" "}
                      <span className="hidden sm:inline">Key Features</span>
                      <span className="sm:hidden">Features</span>
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td
                      key={`feat-${idx}`}
                      className={`p-4 sm:p-6 align-top ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                    >
                      {p ? (
                        <ul className="space-y-3">
                          {p.keyFeatures.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-zinc-700 leading-snug">
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </td>
                  ))}
                </tr>

                {/* Best Suited For */}
                <tr className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-zinc-900">
                      <Home className="w-4 h-4 text-gold shrink-0" />{" "}
                      <span className="hidden sm:inline">Best Suited For</span>
                      <span className="sm:hidden">Best For</span>
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td
                      key={`suit-${idx}`}
                      className={`p-4 sm:p-6 align-top ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                    >
                      {p ? (
                        <p className="text-[10px] sm:text-xs text-zinc-600 leading-tight italic">
                          {p.bestSuitedFor}
                        </p>
                      ) : null}
                    </td>
                  ))}
                </tr>

                {/* CTA Row */}
                <tr className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 sm:p-6 sticky left-0 z-20 bg-white shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)] border-r border-zinc-100">
                    <div className="text-xs sm:text-sm font-medium text-zinc-500">
                      Ready to buy?
                    </div>
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td
                      key={`cta-${idx}`}
                      className={`p-4 sm:p-6 align-middle text-center ${!p ? "border-l border-zinc-100 border-dashed bg-zinc-50/30" : ""}`}
                    >
                      {p ? (
                        <a
                          href="/shop"
                          className="inline-block px-4 py-2 bg-gold text-white text-xs sm:text-sm font-medium rounded-full hover:bg-gold/90 transition-colors"
                        >
                          Buy {p.name}
                        </a>
                      ) : null}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
