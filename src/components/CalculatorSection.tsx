import React, { useState, useEffect } from "react";
import {
  Calculator,
  ChevronDown,
  ShoppingCart,
  Check,
  X,
  Heart,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import { useWishlistStore } from "../store/useWishlistStore";
import { shadeService, Shade } from "../services/shadeService";
import { useDebounce } from "../hooks/useDebounce";
import { mockProducts } from "../data";
import { motion, AnimatePresence } from "framer-motion";

export default function CalculatorSection() {
  const [inputMode, setInputMode] = useState<"dimensions" | "area">(
    "dimensions",
  );
  const [customArea, setCustomArea] = useState<number>(350);
  const [category, setCategory] = useState<"interior" | "exterior" | "nilaya">(
    "interior",
  );
  const [len, setLen] = useState<number | "">("");
  const [wid, setWid] = useState<number | "">("");
  const [hgt, setHgt] = useState<number | "">(10);
  const [doors, setDoors] = useState<number | "">(1);
  const [wins, setWins] = useState<number | "">(2);
  const [surfs, setSurfs] = useState<Set<string>>(
    new Set(["walls", "ceiling"]),
  );
  const [coats, setCoats] = useState<number>(2);
  const [surfCond, setSurfCond] = useState<string>("repaint");
  const [quality, setQuality] = useState<string>("luxury");
  const [waste, setWaste] = useState<number>(1.1);

  const [results, setResults] = useState<any>(null);
  const { user } = useAuthStore();

  const [isCoatsOpen, setIsCoatsOpen] = useState(false);
  const [isSurfCondOpen, setIsSurfCondOpen] = useState(false);
  const [isQualityOpen, setIsQualityOpen] = useState(false);

  const [shadesSearch, setShadesSearch] = useState("");
  const [shadeSuggestions, setShadeSuggestions] = useState<Shade[]>([]);
  const [selectedShade, setSelectedShade] = useState<Shade | null>(null);
  const [loadingShades, setLoadingShades] = useState(false);
  const [addedProductIds, setAddedProductIds] = useState<Set<string>>(
    new Set(),
  );

  const debouncedShadeSearch = useDebounce(shadesSearch, 300);
  const addItem = useCartStore((state) => state.addItem);
  const {
    items: wishlistItems,
    addItem: wishlistAddItem,
    removeItem: wishlistRemoveItem,
    addToast,
  } = useWishlistStore();
  const { openAuthModal } = useAuthStore();

  useEffect(() => {
    if (debouncedShadeSearch.length < 1) {
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

  const toggleSurf = (surf: string) => {
    const newSurfs = new Set(surfs);
    if (newSurfs.has(surf)) newSurfs.delete(surf);
    else newSurfs.add(surf);
    setSurfs(newSurfs);
  };

  const paintDatabase = [
    // Interior Luxury
    {
      category: "interior",
      quality: "luxury",
      brand: "Asian Paints",
      name: "Royale Luxury Emulsion",
      price: 440,
      coverage: 150,
    },
    {
      category: "interior",
      quality: "luxury",
      brand: "Asian Paints",
      name: "Royale Aspira",
      price: 580,
      coverage: 160,
    },
    {
      category: "interior",
      quality: "luxury",
      brand: "Dulux",
      name: "Velvet Touch Pearl Glo",
      price: 425,
      coverage: 145,
    },
    {
      category: "interior",
      quality: "luxury",
      brand: "Berger",
      name: "Silk Glamor",
      price: 410,
      coverage: 145,
    },

    // Interior Mid
    {
      category: "interior",
      quality: "mid",
      brand: "Asian Paints",
      name: "Apcolite Premium Emulsion",
      price: 260,
      coverage: 125,
    },
    {
      category: "interior",
      quality: "mid",
      brand: "Berger",
      name: "Easy Clean",
      price: 285,
      coverage: 130,
    },
    {
      category: "interior",
      quality: "mid",
      brand: "Dulux",
      name: "Promise Smart Choice",
      price: 215,
      coverage: 120,
    },
    {
      category: "interior",
      quality: "mid",
      brand: "Nippon",
      name: "Spotless Nxt",
      price: 245,
      coverage: 120,
    },

    // Interior Economy
    {
      category: "interior",
      quality: "economy",
      brand: "Asian Paints",
      name: "Tractor Emulsion",
      price: 145,
      coverage: 110,
    },
    {
      category: "interior",
      quality: "economy",
      brand: "Berger",
      name: "Bison Emulsion",
      price: 135,
      coverage: 105,
    },
    {
      category: "interior",
      quality: "economy",
      brand: "Dulux",
      name: "Promise Interior",
      price: 125,
      coverage: 100,
    },

    // Exterior Luxury
    {
      category: "exterior",
      quality: "luxury",
      brand: "Asian Paints",
      name: "Ultima Protek",
      price: 680,
      coverage: 100,
    },
    {
      category: "exterior",
      quality: "luxury",
      brand: "Asian Paints",
      name: "Apex Ultima",
      price: 420,
      coverage: 110,
    },
    {
      category: "exterior",
      quality: "luxury",
      brand: "Berger",
      name: "WeatherCoat Long Life",
      price: 595,
      coverage: 105,
    },
    {
      category: "exterior",
      quality: "luxury",
      brand: "Dulux",
      name: "Weathershield Powerflex",
      price: 610,
      coverage: 95,
    },

    // Exterior Mid
    {
      category: "exterior",
      quality: "mid",
      brand: "Asian Paints",
      name: "Apex Exterior Emulsion",
      price: 245,
      coverage: 110,
    },
    {
      category: "exterior",
      quality: "mid",
      brand: "Berger",
      name: "WeatherCoat Anti Dust",
      price: 280,
      coverage: 115,
    },
    {
      category: "exterior",
      quality: "mid",
      brand: "Nippon",
      name: "Weatherbond Pro",
      price: 265,
      coverage: 110,
    },

    // Exterior Economy
    {
      category: "exterior",
      quality: "economy",
      brand: "Asian Paints",
      name: "Ace Exterior Emulsion",
      price: 165,
      coverage: 95,
    },
    {
      category: "exterior",
      quality: "economy",
      brand: "Berger",
      name: "Walmasta",
      price: 155,
      coverage: 90,
    },

    // Nilaya Wallpaper
    {
      category: "nilaya",
      quality: "luxury",
      brand: "Nilaya",
      name: "Signature Series",
      price: 6500,
      coverage: 55,
    },
    {
      category: "nilaya",
      quality: "mid",
      brand: "Nilaya",
      name: "Premium Texture",
      price: 3500,
      coverage: 55,
    },
    {
      category: "nilaya",
      quality: "economy",
      brand: "Nilaya",
      name: "Standard Vinyl",
      price: 1800,
      coverage: 55,
    },
  ];

  const calculateCost = () => {
    let paintableArea = 0;
    let netWallArea = 0;
    let ceilArea = 0;
    let floorArea = 0;
    let wallArea = 0;
    let totalOpenings = 0;

    const d = inputMode === "dimensions" ? Number(doors) : 0;
    const wi = inputMode === "dimensions" ? Number(wins) : 0;

    if (inputMode === "dimensions") {
      if (len === "" || wid === "" || Number(len) <= 0 || Number(wid) <= 0) {
        setResults(null);
        return;
      }

      const l = Number(len);
      const w = Number(wid);
      const h = Number(hgt);

      wallArea = 2 * (l + w) * h;
      ceilArea = l * w;
      floorArea = l * w;
      const doorArea = d * 21; // Standard door: 3x7 ft
      const winArea = wi * 12; // Standard window: 3x4 ft

      totalOpenings = doorArea + winArea;
      netWallArea = Math.max(0, wallArea - totalOpenings);

      if (surfs.has("walls")) paintableArea += netWallArea;
      if (surfs.has("ceiling")) paintableArea += ceilArea;
      if (surfs.has("floor")) paintableArea += floorArea;
    } else {
      paintableArea = customArea;
      netWallArea = customArea;
      totalOpenings = 0;
    }

    const isNilaya = category === "nilaya";
    const unit = isNilaya ? "Rolls" : "L";
    const unitName = isNilaya ? "rolls" : "litres";
    const _coats = isNilaya ? 1 : coats;
    const _waste = isNilaya ? 1.1 : waste; // 10% waste for pattern matching in wallpaper generally

    // Filter paints based on user selection
    const filteredPaints = paintDatabase.filter(
      (p) => p.category === category && p.quality === quality,
    );

    // Calculate litres and costs for each product
    const prodsWithCalculations = filteredPaints.map((p) => {
      // Coverage varies slightly by surface condition for paint
      let effectiveCoverage = p.coverage;
      if (!isNilaya) {
        if (surfCond === "new") effectiveCoverage *= 0.82; // Highest absorption
        if (surfCond === "rough") effectiveCoverage *= 0.88; // Medium absorption
      }

      const rawUnits = (paintableArea * _coats) / effectiveCoverage;
      const totalUnits = Math.ceil(rawUnits * _waste);
      const totalCost = totalUnits * p.price;

      return { ...p, totalUnits, totalCost, effectiveCoverage };
    });

    const avgUnits = Math.ceil(
      prodsWithCalculations.reduce((acc, p) => acc + p.totalUnits, 0) /
        prodsWithCalculations.length,
    );

    let primerUnits = 0;
    let primerCoverage = 0;
    let primerRate = 0;

    if (isNilaya) {
      primerCoverage = 55; // 1 pack per roll
      primerRate = 250;
      primerUnits = avgUnits; // 1 pack of adhesive per roll
    } else {
      if (surfCond === "new" || category === "exterior") {
        primerCoverage = category === "exterior" ? 90 : 120;
        primerUnits = Math.ceil(netWallArea / primerCoverage);
      }
      primerRate = category === "exterior" ? 185 : 135;
    }

    const primerCost = primerUnits * primerRate;

    const minCost = Math.min(...prodsWithCalculations.map((p) => p.totalCost));
    const maxCost = Math.max(...prodsWithCalculations.map((p) => p.totalCost));

    const packs = [];
    if (!isNilaya) {
      let rem = avgUnits;
      [20, 10, 4, 1].forEach((size) => {
        const count = Math.floor(rem / size);
        if (count > 0) {
          packs.push(`${count}×${size}L`);
          rem -= count * size;
        }
      });
      if (rem > 0) packs.push("1×1L");
    } else {
      packs.push(`${avgUnits} Rolls`);
    }

    const tips: string[] = [];
    if (isNilaya) {
      tips.push("Wallpaper prices listed are indicative per roll (55 sq.ft).");
      tips.push(
        "Installation requires special adhesive and expert installers.",
      );
    } else {
      if (category === "exterior")
        tips.push(
          "Exterior walls need fungal resistant base; primer is mandatory for warranty.",
        );
      if (surfCond === "new")
        tips.push(
          "Fresh plaster absorbs 15-20% more paint. Primer is non-negotiable.",
        );
      if (coats === 1)
        tips.push(
          "Single coat might show patches. 2 coats ensure true shade accuracy.",
        );
    }

    if (inputMode === "dimensions") {
      tips.push(`Calculated for standard ${d} doors and ${wi} windows.`);
    }

    setResults({
      calcCategory: category,
      unit,
      unitName,
      isNilaya,
      inputMode,
      wallArea,
      ceilArea,
      netWallArea,
      totalOpenings,
      paintableArea,
      coats: _coats,
      totalUnits: avgUnits,
      primerUnits,
      primerRate,
      primerCoverage,
      packs: packs.join(" + ") || "None",
      totalMin: minCost + primerCost,
      totalMax: maxCost + primerCost,
      prods: prodsWithCalculations,
      tips,
    });
  };

  const handleAddToCart = (productInfo: any) => {
    // Attempt to match with mockProducts
    let matchedProduct = mockProducts.find(
      (mp) => mp.name.toLowerCase() === productInfo.name.toLowerCase(),
    );

    // If not found, create a synthesized product info
    if (!matchedProduct) {
      matchedProduct = {
        id: `synth-${productInfo.name.replace(/\s+/g, "-").toLowerCase()}`,
        name: productInfo.name,
        brand: productInfo.brand,
        price: `₹ ${productInfo.price}.00`,
        image:
          "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-luxury-emulsion-asian-paints.png", // fallback image
      } as any;
    }

    // Determine the packs needed to make up the total units (similar to what is done in calculateCost)
    let rem = productInfo.totalUnits;
    const packsNeeded: { size: number; qty: number }[] = [];
    [20, 10, 4, 1].forEach((size) => {
      const count = Math.floor(rem / size);
      if (count > 0) {
        packsNeeded.push({ size, qty: count });
        rem -= count * size;
      }
    });
    if (rem > 0) packsNeeded.push({ size: 1, qty: rem });

    packsNeeded.forEach((pack) => {
      let discountFactor = 1;
      if (pack.size === 4) discountFactor = 0.96;
      if (pack.size === 10) discountFactor = 0.92;
      if (pack.size === 20) discountFactor = 0.88;

      const effectiveUnitPrice = Math.round(
        productInfo.price * pack.size * discountFactor,
      );

      addItem({
        id: `${matchedProduct!.id}-${pack.size}${selectedShade && selectedShade.shadeCode ? `-${selectedShade.shadeCode}` : "-white"}`,
        productId: matchedProduct!.id,
        name: `${matchedProduct!.name} (${selectedShade?.name || "White"})`,
        brand: matchedProduct!.brand,
        image:
          matchedProduct!.image ||
          "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-luxury-emulsion-asian-paints.png",
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

    setAddedProductIds((prev) => new Set(prev).add(productInfo.name));
    setTimeout(() => {
      setAddedProductIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productInfo.name);
        return newSet;
      });
    }, 2000);
  };

  const handleOrder = async () => {
    if (!results) return;
    const qualLabels: any = {
      luxury: "Premium Luxury",
      mid: "Standard Mid-Range",
      economy: "Value Economy",
    };

    // Log to CRM System
    try {
      const { crmService } = await import("../lib/crm");
      await crmService.addLead({
        type: "QUOTE",
        name: user?.displayName || "Unknown WhatsApp User",
        phone: user?.phoneNumber || "Unknown",
        email: user?.email || "",
        metadata: {
          category,
          area: Math.round(results.paintableArea),
          quality: qualLabels[quality],
          estimatedCost: results.totalMin,
          dimensions:
            results.inputMode === "dimensions"
              ? `${len}x${wid}x${hgt}`
              : `Area: ${customArea} sq.ft`,
        },
      });
    } catch (e) {
      console.warn("CRM logging failed for calculator quote request");
    }

    let msg = `Hi Rainbow Paints! I'd like a quote for my ${category} project.\n\n*Estimate Details:*\nCategory: ${category.toUpperCase()}\nArea: ${Math.round(results.paintableArea)} sq.ft\nQuality: ${qualLabels[quality]}\n${results.isNilaya ? "Rolls" : "Paint"} needed: ~${results.totalUnits} ${results.unit}\n`;
    if (results.primerUnits > 0)
      msg += `+ ${results.primerUnits} ${results.isNilaya ? "packs adhesive" : "L primer"}\n`;
    msg += `Estimated Budget: ₹${results.totalMin.toLocaleString("en-IN")}\n\nPlease arrange a professional visit.`;
    window.open(
      `https://wa.me/918072442930?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  return (
    <section id="calculator" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-panel p-5 sm:p-8 rounded-2xl border-zinc-200 bg-royale-surface/40 flex flex-col gap-5 sm:gap-6"
          >
            <h2 className="font-serif text-lg sm:text-xl text-gold border-b border-zinc-200 pb-3 uppercase tracking-widest flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Painting Price Calculator
            </h2>

            <div className="space-y-2">
              <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold">
                Project Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["interior", "exterior"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c as any)}
                    className={`py-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${category === c ? "bg-gold text-white border-gold shadow-[0_8px_20px_rgba(184,151,90,0.3)]" : "bg-transparent border-royale-accent text-ivory hover:border-gold/30 hover:bg-gold/5"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold">
                Input Method
              </label>
              <div className="flex bg-[#f9f6f0]/10 p-1 rounded-xl border border-gold/20 w-full mb-2">
                {[
                  { id: "dimensions", label: "Room Dimensions" },
                  { id: "area", label: "Total Area (Quick)" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setInputMode(mode.id as any)}
                    className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 ${inputMode === mode.id ? "bg-gold text-white shadow-sm" : "bg-transparent text-ivory/60 hover:text-ivory"}`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {inputMode === "dimensions" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold">
                      Room Length (ft)
                    </label>
                    <input
                      type="number"
                      value={len}
                      onChange={(e) => setLen(Number(e.target.value) || "")}
                      placeholder="e.g. 15"
                      min="1"
                      className="w-full bg-white shadow-inner border border-royale-accent rounded-lg px-4 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-sans placeholder:text-ivory/30"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold text-opacity-80">
                      Room Width (ft)
                    </label>
                    <input
                      type="number"
                      value={wid}
                      onChange={(e) => setWid(Number(e.target.value) || "")}
                      placeholder="e.g. 12"
                      min="1"
                      className="w-full bg-white shadow-inner border border-royale-accent rounded-lg px-4 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-sans placeholder:text-ivory/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold text-opacity-80">
                      Height (ft)
                    </label>
                    <input
                      type="number"
                      value={hgt}
                      onChange={(e) =>
                        setHgt(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      min="1"
                      className="w-full bg-white shadow-inner border border-royale-accent rounded-lg px-4 py-1.5 text-sm text-ivory focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-sans placeholder:text-ivory/30"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold text-opacity-80">
                      Doors
                    </label>
                    <input
                      type="number"
                      value={doors}
                      onChange={(e) =>
                        setDoors(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      min="0"
                      className="w-full bg-white shadow-inner border border-royale-accent rounded-lg px-4 py-1.5 text-sm text-ivory focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-sans placeholder:text-ivory/30"
                    />
                  </div>
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold text-opacity-80">
                      Windows
                    </label>
                    <input
                      type="number"
                      value={wins}
                      onChange={(e) =>
                        setWins(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      min="0"
                      className="w-full bg-white shadow-inner border border-royale-accent rounded-lg px-4 py-1.5 text-sm text-ivory focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-sans placeholder:text-ivory/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold">
                    Surfaces to Paint/Cover
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {(category === "interior"
                      ? ["walls", "ceiling", "floor"]
                      : ["walls"]
                    ).map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleSurf(s)}
                        className={`px-4 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-lg border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${surfs.has(s) ? "bg-gold text-white border-gold shadow-[0_4px_15px_rgba(184,151,90,0.2)]" : "bg-transparent border-royale-accent text-ivory hover:bg-gold/5 hover:border-gold/30"}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold">
                    Estimated Area
                  </label>
                  <span className="text-xs font-mono font-bold text-gold bg-white/10 px-2 py-0.5 rounded shadow-xs">
                    {customArea} sq.ft
                  </span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="3000"
                  step="25"
                  value={customArea}
                  onChange={(e) => setCustomArea(Number(e.target.value))}
                  className="w-full accent-gold bg-gold/20 h-1.5 rounded-lg cursor-pointer"
                />

                <div className="grid grid-cols-4 gap-2 pt-1.5">
                  {[
                    { label: "1 Accent Wall", val: 120 },
                    { label: "Single Room", val: 350 },
                    { label: "Large Hall", val: 750 },
                    { label: "Complete 2BHK", val: 1800 },
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCustomArea(p.val)}
                      type="button"
                      className={`py-2 px-1 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer w-full text-[9px] font-display font-medium border text-center block transition-all ${
                        customArea === p.val
                          ? "border-gold text-gold font-semibold shadow-xs bg-gold/10"
                          : "border-gold/20 text-ivory/80"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {category !== "nilaya" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 relative">
                  <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold">
                    No. of Coats
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCoatsOpen(!isCoatsOpen);
                      setIsSurfCondOpen(false);
                      setIsQualityOpen(false);
                    }}
                    className="w-full bg-white shadow-inner border border-zinc-200/80 rounded-lg px-4 py-2 text-sm text-zinc-900 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-sans flex items-center justify-between text-left"
                  >
                    <span>
                      {coats === 1
                        ? "1 Coat"
                        : coats === 2
                          ? "2 Coats (Standard)"
                          : "3 Coats (Professional)"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform duration-300 ${isCoatsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isCoatsOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsCoatsOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-zinc-250 rounded-lg shadow-xl overflow-hidden divide-y divide-zinc-100 z-50 animate-fade-in"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setCoats(1);
                              setIsCoatsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${coats === 1 ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
                          >
                            1 Coat
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCoats(2);
                              setIsCoatsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${coats === 2 ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
                          >
                            2 Coats (Standard)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCoats(3);
                              setIsCoatsOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${coats === 3 ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
                          >
                            3 Coats (Professional)
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                <div className="space-y-1.5 relative">
                  <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold text-opacity-80">
                    Condition
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSurfCondOpen(!isSurfCondOpen);
                      setIsCoatsOpen(false);
                      setIsQualityOpen(false);
                    }}
                    className="w-full bg-white shadow-inner border border-zinc-200/80 rounded-lg px-4 py-2 text-sm text-zinc-900 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-sans flex items-center justify-between text-left"
                  >
                    <span>
                      {surfCond === "new"
                        ? "New Wall (Fresh)"
                        : surfCond === "repaint"
                          ? "Repaint (Smooth)"
                          : "Rough / Damaged"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform duration-300 ${isSurfCondOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isSurfCondOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-40"
                          onClick={() => setIsSurfCondOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-zinc-250 rounded-lg shadow-xl overflow-hidden divide-y divide-zinc-100 z-50 animate-fade-in"
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setSurfCond("new");
                              setIsSurfCondOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${surfCond === "new" ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
                          >
                            New Wall (Fresh)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSurfCond("repaint");
                              setIsSurfCondOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${surfCond === "repaint" ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
                          >
                            Repaint (Smooth)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSurfCond("rough");
                              setIsSurfCondOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${surfCond === "rough" ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
                          >
                            Rough / Damaged
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            <div className="space-y-1.5 relative">
              <label className="text-[9px] sm:text-[10px] font-display font-semibold uppercase tracking-widest text-gold text-opacity-80">
                Quality Preference
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsQualityOpen(!isQualityOpen);
                  setIsCoatsOpen(false);
                  setIsSurfCondOpen(false);
                }}
                className="w-full bg-white shadow-inner border border-zinc-200/80 rounded-lg px-4 py-2 text-sm text-zinc-900 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all font-sans flex items-center justify-between text-left"
              >
                <span>
                  {quality === "luxury"
                    ? "Luxury (High Sheen / Washable)"
                    : quality === "mid"
                      ? "Mid-Range (Low Sheen / Durable)"
                      : "Economy (Matte Finish / Value)"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-600 shrink-0 transition-transform duration-300 ${isQualityOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {isQualityOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsQualityOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-zinc-250 rounded-lg shadow-xl overflow-hidden divide-y divide-zinc-100 z-50 animate-fade-in font-sans"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setQuality("luxury");
                          setIsQualityOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${quality === "luxury" ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
                      >
                        Luxury (High Sheen / Washable)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuality("mid");
                          setIsQualityOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${quality === "mid" ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
                      >
                        Mid-Range (Low Sheen / Durable)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuality("economy");
                          setIsQualityOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors ${quality === "economy" ? "bg-[#f4f2ee] text-zinc-950 font-bold" : "text-zinc-600 hover:bg-zinc-50"}`}
                      >
                        Economy (Matte Finish / Value)
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-2">
              <button
                onClick={calculateCost}
                className="w-full py-4 bg-gradient-gold hover:opacity-90 text-white rounded-xl font-display font-bold transition-all tracking-widest text-[10px] sm:text-xs uppercase shadow-xl shadow-gold/10 flex justify-center items-center gap-2"
              >
                Calculate Best Estimate
              </button>
            </div>
          </motion.div>

          {/* Results Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="glass-panel p-5 sm:p-8 rounded-2xl border-zinc-200 bg-royale-surface/60 relative overflow-hidden flex flex-col h-full"
          >
            <h2 className="font-serif text-lg sm:text-xl text-gold border-b border-zinc-200 pb-3 uppercase tracking-widest mb-6">
              📊 Your Estimate
            </h2>

            <AnimatePresence mode="wait">
              {!results ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center flex-grow text-center text-gold px-4"
                >
                  <Calculator className="w-12 h-12 mb-4 opacity-50" />
                  <p className="font-light text-sm">
                    Enter room dimensions on the left
                    <br />
                    and click calculate to see your estimate.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col space-y-6 flex-grow"
                >
                  {/* Summary Table */}
                  <div className="bg-gold/5 border border-gold/10 rounded-xl p-4 sm:p-5 space-y-3">
                    <h3 className="font-serif text-sm text-gold mb-1 uppercase tracking-widest">
                      Paint Requirement Summary
                    </h3>
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                      <span className="text-xs text-gold font-medium tracking-wide">
                        Gross Wall Area
                      </span>
                      <span className="text-sm font-serif text-ivory">
                        {Math.round(results.wallArea)} sq.ft
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                      <span className="text-xs text-gold font-medium tracking-wide">
                        Opening Deductions
                      </span>
                      <span className="text-sm font-serif text-red-400/60">
                        - {Math.round(results.totalOpenings)} sq.ft
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                      <span className="text-xs text-gold font-medium tracking-wide">
                        Net Paintable Area
                      </span>
                      <span className="text-sm font-serif text-ivory font-bold">
                        {Math.round(results.paintableArea)} sq.ft
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                      <span className="text-xs text-gold font-medium tracking-wide">
                        Number of Coats
                      </span>
                      <span className="text-sm font-serif text-ivory">
                        {results.coats} {results.coats > 1 ? "coats" : "coat"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                      <span className="text-xs text-gold font-medium tracking-wide">
                        {results.isNilaya
                          ? "Rolls Needed (+waste)"
                          : "Paint Needed (+waste)"}
                      </span>
                      <span className="text-sm font-serif text-ivory">
                        {results.totalUnits} {results.unitName}
                      </span>
                    </div>
                    {results.primerUnits > 0 && (
                      <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                        <span className="text-xs text-gold font-medium tracking-wide">
                          {results.isNilaya
                            ? "Adhesive Needed"
                            : "Primer Needed"}
                        </span>
                        <span className="text-sm font-serif text-gold">
                          {results.primerUnits}{" "}
                          {results.isNilaya ? "packs" : "litres"} (@₹
                          {results.primerRate})
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-200">
                      <span className="text-xs text-gold font-medium tracking-wide">
                        Recommended Pack Size
                      </span>
                      <span className="text-sm font-serif text-ivory">
                        {results.packs}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm text-ivory font-semibold tracking-wide">
                        Estimated Total Cost
                      </span>
                      <span className="text-lg font-serif text-gold font-semibold">
                        {results.totalMin === results.totalMax
                          ? `₹${results.totalMin.toLocaleString("en-IN")}`
                          : `₹${results.totalMin.toLocaleString("en-IN")} - ₹${results.totalMax.toLocaleString("en-IN")}`}
                      </span>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gold/10">
                      <button
                        onClick={handleOrder}
                        className="w-full py-3 bg-[#25D366] hover:bg-[#20b858] text-white rounded-xl font-display font-bold transition-colors tracking-widest text-[10px] sm:text-xs uppercase flex justify-center items-center gap-2 shadow-lg shadow-[#25D366]/20"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Get Free Quote By Expert
                      </button>
                    </div>
                  </div>

                  {/* Recommended Products */}
                  <div>
                    <h3 className="font-sans text-xs font-semibold mb-3 text-ivory">
                      Recommended Products
                    </h3>

                    {/* Shade Selection before products */}
                    <div className="bg-royale-bg border border-zinc-200/50 rounded-xl p-4 mb-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-full border border-zinc-300 shadow-inner flex items-center justify-center relative overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer"
                          style={{
                            backgroundColor: selectedShade?.hex || "#FFFFFF",
                          }}
                        >
                          {!selectedShade && (
                            <span className="text-[10px] text-zinc-400 font-medium">
                              ?
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <label className="text-[10px] sm:text-xs font-display font-semibold uppercase tracking-widest text-gold block">
                              Choose Shade For Your Paint {selectedShade ? `(${selectedShade.name})` : ""}
                            </label>
                            {selectedShade && selectedShade.shadeCode && (
                              <Link
                                to={shadeService.getShadeUrl(selectedShade)}
                                className="text-[10px] text-gold hover:underline font-semibold shrink-0"
                                title={`View detailed color details for ${selectedShade.name}`}
                              >
                                View Details &rarr;
                              </Link>
                            )}
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              value={shadesSearch}
                              onChange={(e) => setShadesSearch(e.target.value)}
                              placeholder="Search colors e.g. 'Ivory' or 'Blue'"
                              className="w-full bg-white border border-royale-accent rounded-lg px-3 py-1.5 text-sm text-zinc-900 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all shadow-inner"
                            />
                            {shadesSearch && (
                              <button
                                onClick={() => {
                                  setShadesSearch("");
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Suggestions Dropdown */}
                      <AnimatePresence>
                        {debouncedShadeSearch && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white border border-zinc-200 rounded-lg shadow-sm mt-2 overflow-hidden"
                          >
                            {loadingShades ? (
                              <div className="p-3 text-center text-zinc-400 text-xs">
                                Searching shades...
                              </div>
                            ) : shadeSuggestions.length > 0 ? (
                              <div className="max-h-48 overflow-y-auto p-1.5 space-y-1">
                                {shadeSuggestions.map((shade) => (
                                  <div
                                    key={shade.id}
                                    className="w-full flex items-center gap-1.5 p-1"
                                  >
                                    <button
                                      onClick={() => {
                                        setSelectedShade(shade);
                                        setShadesSearch("");
                                      }}
                                      className="flex-1 flex items-center justify-between p-2 rounded-md hover:bg-zinc-50 transition-colors text-left group min-w-0"
                                    >
                                      <div className="flex items-center gap-3 min-w-0">
                                        <div
                                          className="w-6 h-6 rounded-full border border-zinc-200 shadow-inner group-hover:scale-110 transition-transform shrink-0"
                                          style={{ backgroundColor: shade.hex }}
                                        />
                                        <div className="min-w-0">
                                          <div className="text-sm font-medium text-zinc-800 truncate">
                                            {shade.name}
                                          </div>
                                          <div className="text-[10px] text-zinc-500 font-mono truncate">
                                            {shade.shadeCode} &middot;{" "}
                                            {shade.brand}
                                          </div>
                                        </div>
                                      </div>
                                      {selectedShade?.id === shade.id && (
                                        <Check className="w-4 h-4 text-green-600 shrink-0 ml-1" />
                                      )}
                                    </button>
                                    <Link
                                      to={shadeService.getShadeUrl(shade)}
                                      onClick={(e) => e.stopPropagation()}
                                      className="p-2 text-zinc-400 hover:text-gold transition-colors shrink-0"
                                      title="View Color Details & Buy Options"
                                    >
                                      <Info className="w-4 h-4" />
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="p-3 text-center text-zinc-500 text-xs">
                                No shades found matching "{debouncedShadeSearch}
                                "
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="space-y-2">
                      {results.prods.map((p: any, idx: number) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                          className="bg-royale-bg border border-zinc-200 rounded-lg p-3 sm:p-4 flex justify-between items-center hover:border-gold/30 transition-colors shadow-sm"
                        >
                          <div className="flex-1 pr-4">
                            <div className="text-[10px] text-gold uppercase tracking-widest">
                              {p.brand}
                            </div>
                            <div className="text-sm font-medium text-ivory">
                              {p.name}
                            </div>
                            <div className="text-xs text-gold mt-0.5">
                              {p.totalUnits}
                              {results.isNilaya ? " Rolls" : "L"} needed
                              &middot; ₹{p.price}/
                              {results.isNilaya ? "roll" : "L"} &middot;{" "}
                              {Math.round(p.effectiveCoverage)} sq.ft/
                              {results.isNilaya ? "roll" : "L"} coverage
                            </div>
                          </div>
                          <div className="text-right flex flex-col items-end gap-2">
                            <div>
                              <div className="text-base font-serif text-gold">
                                ₹{p.totalCost.toLocaleString("en-IN")}
                              </div>
                              <div className="text-[9px] text-gold uppercase tracking-wider mb-1">
                                Estimated
                              </div>
                            </div>

                            <button
                              onClick={() => handleAddToCart(p)}
                              disabled={addedProductIds.has(p.name)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all shadow-sm ${
                                addedProductIds.has(p.name)
                                  ? "bg-green-600 text-white"
                                  : "bg-gold hover:bg-gold/90 text-white"
                              }`}
                            >
                              {addedProductIds.has(p.name) ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  Added
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-3.5 h-3.5" />
                                  Add to Cart
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ))}
                      {results.primerUnits > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: results.prods.length * 0.1,
                          }}
                          className="bg-royale-bg border border-zinc-200 rounded-lg p-3 sm:p-4 flex justify-between items-center hover:border-gold/30 transition-colors shadow-sm"
                        >
                          <div>
                            <div className="text-[10px] text-gold uppercase tracking-widest">
                              {results.isNilaya
                                ? "Nilaya"
                                : results.calcCategory === "exterior"
                                  ? "Asian Paints"
                                  : "Rainbow Specific"}
                            </div>
                            <div className="text-sm font-medium text-ivory">
                              {results.isNilaya
                                ? "Wallpaper Adhesive"
                                : results.calcCategory === "exterior"
                                  ? "Exterior Wall Primer"
                                  : "Interior Wall Primer"}
                            </div>
                            <div className="text-xs text-gold mt-0.5">
                              {results.primerUnits}
                              {results.isNilaya ? " packs" : "L"} needed
                              &middot; ₹{results.primerRate}/
                              {results.isNilaya ? "pack" : "L"} &middot;{" "}
                              {results.primerCoverage} sq.ft/
                              {results.isNilaya ? "pack" : "L"} coverage
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-base font-serif text-gold">
                              ₹
                              {(
                                results.primerUnits * results.primerRate
                              ).toLocaleString("en-IN")}
                            </div>
                            <div className="text-[9px] text-gold uppercase tracking-wider">
                              Estimated
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-royale-surface border-l-2 border-gold p-4 rounded-r-xl shadow-inner">
                    <h3 className="text-[10px] font-bold text-ivory uppercase tracking-widest mb-2">
                      Pro Tips
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {results.tips.map((tip: string, idx: number) => (
                        <li
                          key={idx}
                          className="text-xs text-ivory/80 leading-relaxed font-light"
                        >
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
