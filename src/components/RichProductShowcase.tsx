import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, Check, ChevronDown, Package, ShoppingCart } from 'lucide-react';
import { RichProductContent } from '../data/richProductContent';

interface RichProductShowcaseProps {
  content: RichProductContent;
  productName: string;
  availableSizes: number[];
  basePricePerLitre: number;
  sizePrices?: Record<number, number>;
  selectedSize: number;
  currentPrice: number;
  unit?: string;
  onSelectPackSize: (size: number) => void;
  onAddToCart: () => void;
}

function getShortUnit(unit?: string): 'L' | 'kg' | 'pc' {
  const lower = (unit || 'L').toLowerCase();
  if (lower.includes('kg') || lower.includes('gm') || lower.includes('gram')) return 'kg';
  if (lower.includes('pc') || lower.includes('piece') || lower.includes('unit') || lower.includes('roll') || lower.includes('set')) return 'pc';
  return 'L';
}

function formatPackLabel(size: number, unit?: string): string {
  const short = getShortUnit(unit);
  if (short === 'pc') return size === 1 ? '1 Unit' : `${size} Units`;
  if (short === 'kg') {
    if (size < 1) return `${Math.round(size * 1000)}g`;
    return `${size}kg`;
  }
  if (size < 1) return `${Math.round(size * 1000)}ml`;
  return `${size}L`;
}

export default function RichProductShowcase({
  content,
  productName,
  availableSizes,
  basePricePerLitre,
  sizePrices,
  selectedSize,
  currentPrice,
  unit,
  onSelectPackSize,
  onAddToCart,
}: RichProductShowcaseProps) {
  const calc = content.calculator;
  const [wallSqFt, setWallSqFt] = useState<number>(calc?.presets[1]?.wallSqFt || 600);
  const [surfaceMode, setSurfaceMode] = useState<'repaint' | 'fresh'>('repaint');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showMobileDock, setShowMobileDock] = useState(false);

  const shortUnit = getShortUnit(unit);
  const calcUnit = calc?.unit || (shortUnit === 'kg' ? 'kg' : 'L');
  const calcUnitWord = calcUnit === 'kg' ? 'kg' : 'Litres';

  // Sync preset default & FAQ accordion when navigating between different products
  useEffect(() => {
    setWallSqFt(content.calculator?.presets[1]?.wallSqFt || 600);
    setSurfaceMode('repaint');
    setOpenFaqIndex(0);
  }, [content.productKey, content.calculator]);

  // Only reveal compact mobile quick-buy dock after scrolling past the primary Add to Cart button
  useEffect(() => {
    const handleScroll = () => {
      const purchaseEl = document.getElementById('purchase-module');
      if (purchaseEl) {
        const rect = purchaseEl.getBoundingClientRect();
        setShowMobileDock(rect.bottom < 0);
      } else {
        setShowMobileDock(window.scrollY > 950);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSizePrice = (size: number) => {
    if (sizePrices && sizePrices[size]) return sizePrices[size];
    let factor = 1;
    if (shortUnit === 'kg') {
      if (size === 5) factor = 0.94;
      if (size === 20) factor = 0.53;
      if (size === 25) factor = 0.8;
      if (size === 40) factor = 0.472;
      if (size === 50) factor = 0.628;
    } else {
      if (size === 4) factor = 0.96;
      if (size === 10) factor = 0.92;
      if (size === 20) factor = 0.88;
    }
    return Math.round(basePricePerLitre * size * factor);
  };

  // Real Pack Size & Per-Unit Value Breakdown (strictly from store pricing & availableSizes)
  const packValueRows = useMemo(() => {
    if (!availableSizes || availableSizes.length <= 1 || basePricePerLitre <= 0) return [];
    const sorted = [...availableSizes].sort((a, b) => a - b);
    const rows = sorted.map((size) => {
      const price = getSizePrice(size);
      const perUnit = size > 0 ? price / size : price;
      return {
        size,
        label: formatPackLabel(size, unit),
        price,
        perUnit,
      };
    });
    const baselinePerUnit = rows[0]?.perUnit || 0;
    return rows.map((row, idx) => {
      const savingsPct =
        idx > 0 && baselinePerUnit > 0
          ? Math.round(((baselinePerUnit - row.perUnit) / baselinePerUnit) * 100)
          : 0;
      return {
        ...row,
        savingsPct: savingsPct >= 2 ? savingsPct : 0,
      };
    });
  }, [availableSizes, basePricePerLitre, sizePrices, unit]);

  const estimate = useMemo(() => {
    if (!calc) return null;
    const safeArea = Math.max(50, Math.min(20000, Number(wallSqFt) || 0));
    const effectiveCoverage =
      !calc.hidePrimerOption && surfaceMode === 'fresh'
        ? Math.max(10, Math.round(calc.coverageTwoCoatsSqFtPerLitre * 0.92))
        : calc.coverageTwoCoatsSqFtPerLitre;
    const rawQty = safeArea / effectiveCoverage;
    const qtyNeeded = Math.max(1, Math.ceil(rawQty));

    const validSizes = availableSizes.length > 0 ? availableSizes : [1, 4, 10, 20];
    const sortedDesc = [...validSizes].sort((a, b) => b - a);
    let remaining = qtyNeeded;
    const packs: { size: number; count: number }[] = [];

    for (const s of sortedDesc) {
      if (remaining >= s) {
        const count = Math.floor(remaining / s);
        packs.push({ size: s, count });
        remaining -= count * s;
      }
    }
    if (remaining > 0) {
      const smallestFitting =
        [...validSizes].sort((a, b) => a - b).find((s) => s >= remaining) ||
        sortedDesc[sortedDesc.length - 1];
      const existing = packs.find((p) => p.size === smallestFitting);
      if (existing) {
        existing.count += 1;
      } else {
        packs.push({ size: smallestFitting, count: 1 });
      }
    }

    const totalPackQty = Number(packs.reduce((sum, p) => sum + p.size * p.count, 0).toFixed(2));
    const estimatedCost = packs.reduce((sum, p) => sum + getSizePrice(p.size) * p.count, 0);
    const primaryRecommendedSize = packs[0]?.size || validSizes[0] || 4;
    const primerLitres = !calc.hidePrimerOption && surfaceMode === 'fresh' ? Math.max(1, Math.ceil(safeArea / 140)) : 0;

    return {
      qtyNeeded,
      totalPackQty,
      packs,
      estimatedCost,
      primaryRecommendedSize,
      primerLitres,
      effectiveCoverage,
    };
  }, [wallSqFt, surfaceMode, availableSizes, calc, basePricePerLitre, sizePrices, shortUnit]);

  const scrollToPurchaseModule = () => {
    const el = document.getElementById('purchase-module');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  const hasEditorialStories = Boolean(content.editorialSections && content.editorialSections.length > 0);
  const hasFeatureCards = !hasEditorialStories && Boolean(content.featureCards && content.featureCards.length > 0);
  const hasMacroStudy = Boolean(content.macroStudy);
  const hasSpecsTable = !hasMacroStudy && Boolean(content.specificationsTable && content.specificationsTable.length > 0);

  return (
    <div className="w-full min-w-0 mt-10 sm:mt-16 lg:mt-20 space-y-12 sm:space-y-16 lg:space-y-24 pb-20 md:pb-0">
      {/* 1. Performance Proof Strip (2x2 on Mobile, 4-Column Row on Desktop) */}
      <section aria-label="Key technical performance metrics" className="border-y border-zinc-200/80 py-7 sm:py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8 lg:gap-0 lg:divide-x lg:divide-zinc-200/80">
          {content.metrics.map((metric) => (
            <div key={metric.label} className="min-w-0 lg:px-8 first:lg:pl-0 last:lg:pr-0">
              <p className="text-xl sm:text-2xl lg:text-3xl font-serif font-medium text-ivory tabular-nums tracking-tight leading-tight break-words">
                {metric.value}
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gold mt-1 sm:mt-1.5 leading-snug">
                {metric.label}
              </p>
              <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed mt-1">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Interactive Paint Quantity & Budget Calculator (Only shown when official PIS coverage is verified) */}
      {calc && estimate && (
        <section aria-labelledby="paint-calculator-heading" className="bg-royale-surface border border-zinc-200 rounded-2xl p-4 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-zinc-200/80">
            <div className="max-w-2xl min-w-0">
              <p className="text-xs font-medium text-gold tracking-wide mb-1.5 sm:mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4 shrink-0" />
                Interactive Coverage Estimator
              </p>
              <h2 id="paint-calculator-heading" className="text-xl sm:text-2xl lg:text-3xl font-serif text-ivory text-balance leading-tight">
                Calculate Exact {calcUnitWord} & Cost for Your Space
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
                Eliminate guesswork before checkout. Enter your paintable area or pick a standard preset below.
              </p>
            </div>

            {!calc.hidePrimerOption && (
              <div className="grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 bg-white border border-zinc-200 rounded-xl w-full sm:w-fit shrink-0">
                <button
                  type="button"
                  onClick={() => setSurfaceMode('repaint')}
                  className={`px-2.5 sm:px-3.5 py-2.5 sm:py-2 text-[11px] sm:text-xs font-medium rounded-lg transition-colors text-center truncate ${
                    surfaceMode === 'repaint'
                      ? 'bg-ivory text-white'
                      : 'text-zinc-600 hover:text-ivory'
                  }`}
                >
                  Repainting ({calc.coatsLabel || '2 Coats'})
                </button>
                <button
                  type="button"
                  onClick={() => setSurfaceMode('fresh')}
                  className={`px-2.5 sm:px-3.5 py-2.5 sm:py-2 text-[11px] sm:text-xs font-medium rounded-lg transition-colors text-center truncate ${
                    surfaceMode === 'fresh'
                      ? 'bg-ivory text-white'
                      : 'text-zinc-600 hover:text-ivory'
                  }`}
                >
                  Fresh Plaster (+ Primer)
                </button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 pt-6 sm:pt-8 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-7 min-w-0 space-y-5 sm:space-y-6">
              <div>
                <span className="block text-xs font-medium text-zinc-700 mb-2.5 sm:mb-3">Quick Area Presets</span>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {calc.presets.map((preset) => {
                    const isSelected = wallSqFt === preset.wallSqFt;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setWallSqFt(preset.wallSqFt)}
                        className={`min-w-0 text-left px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-white border-gold ring-1 ring-gold/40'
                            : 'bg-white/70 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        <span className="block text-xs sm:text-sm font-medium text-ivory leading-snug">
                          {preset.label}
                        </span>
                        <span className="block text-[11px] sm:text-xs text-zinc-500 mt-0.5 tabular-nums leading-snug">
                          {preset.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <label htmlFor="wall-area-input" className="text-xs font-medium text-zinc-700">
                    Custom Surface Area
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id="wall-area-input"
                      type="number"
                      inputMode="numeric"
                      min={50}
                      max={20000}
                      step={50}
                      value={wallSqFt}
                      onChange={(e) => setWallSqFt(Math.max(0, Number(e.target.value)))}
                      className="w-24 px-2.5 py-1.5 text-sm font-mono tabular-nums text-right bg-white border border-zinc-300 rounded-lg text-ivory focus:outline-none focus:border-gold"
                    />
                    <span className="text-xs text-zinc-500">sq.ft</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={100}
                  max={4000}
                  step={50}
                  value={Math.min(4000, Math.max(100, wallSqFt))}
                  onChange={(e) => setWallSqFt(Number(e.target.value))}
                  aria-label="Adjust surface area in square feet"
                  className="w-full accent-[#B8975A] cursor-pointer h-2.5 bg-zinc-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] sm:text-[11px] text-zinc-500 font-mono tabular-nums mt-1.5">
                  <span>100</span>
                  <span>1,000</span>
                  <span>2,500</span>
                  <span>4,000+ sq.ft</span>
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                Based on {estimate.effectiveCoverage} sq.ft/{calcUnit} ({calc.coatsLabel || '2 Finish Coats'}). {calc.dilutionNote}
              </p>
            </div>

            {/* Right Live Output Summary */}
            <div className="lg:col-span-5 min-w-0 bg-white border border-zinc-200 rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div className="flex items-baseline justify-between gap-3 border-b border-zinc-100 pb-3.5 sm:pb-4">
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-zinc-500">Estimated Requirement</p>
                  <p className="text-2xl sm:text-3xl font-serif font-medium text-ivory tabular-nums mt-1">
                    {estimate.qtyNeeded} {calcUnitWord}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px] sm:text-xs text-zinc-500">Est. Material Total</p>
                  <p className="text-xl sm:text-2xl font-display font-semibold text-gold tabular-nums mt-1">
                    ₹{estimate.estimatedCost.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-3 text-zinc-700">
                  <span className="text-zinc-500 shrink-0">Smartest Pack Split</span>
                  <span className="font-medium text-ivory tabular-nums text-right">
                    {estimate.packs.map((p) => `${p.count} × ${formatPackLabel(p.size, unit)}`).join(' + ')} ({estimate.totalPackQty}{calcUnit})
                  </span>
                </div>
                {!calc.hidePrimerOption && surfaceMode === 'fresh' && (
                  <div className="flex items-start justify-between gap-3 text-zinc-700">
                    <span className="text-zinc-500 shrink-0">Recommended Primer</span>
                    <span className="font-medium text-ivory tabular-nums text-right">
                      ~{estimate.primerLitres}L {calc.primerLabel || 'Wall Primer'}
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between gap-3 text-zinc-700">
                  <span className="text-zinc-500 shrink-0">Cost per sq.ft ({calc.coatsLabel || '2 Coats'})</span>
                  <span className="font-medium text-ivory tabular-nums text-right">
                    ₹{(estimate.estimatedCost / Math.max(50, wallSqFt)).toFixed(2)} / sq.ft
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onSelectPackSize(estimate.primaryRecommendedSize);
                  scrollToPurchaseModule();
                }}
                className="w-full py-3.5 sm:py-3 px-4 bg-ivory hover:bg-ivory/90 text-white text-xs font-semibold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
              >
                Apply {formatPackLabel(estimate.primaryRecommendedSize, unit)} Pack Above
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2B. Pack Size & Per-Unit Value Breakdown (Shown on multi-pack products for transparent buying) */}
      {packValueRows.length > 1 && (
        <section aria-labelledby="pack-value-heading">
          <div className="max-w-2xl mb-5 sm:mb-7">
            <p className="text-xs font-medium text-gold tracking-wide mb-1.5 flex items-center gap-2">
              <Package className="w-4 h-4 shrink-0" />
              Pack Size Value Breakdown
            </p>
            <h2 id="pack-value-heading" className="text-xl sm:text-2xl lg:text-3xl font-serif text-ivory text-balance">
              Compare Pack Sizes & Per-{shortUnit === 'pc' ? 'Unit' : shortUnit} Cost
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">
              Factory-sealed Asian Paints packs at direct Rainbow Paints store rates. Tap any pack to select it above.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {packValueRows.map((row) => {
              const isSelected = selectedSize === row.size;
              return (
                <button
                  key={row.size}
                  type="button"
                  onClick={() => {
                    onSelectPackSize(row.size);
                    scrollToPurchaseModule();
                  }}
                  className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-royale-surface border-gold ring-1 ring-gold/40'
                      : 'bg-white border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-base sm:text-lg font-serif font-semibold text-ivory tabular-nums">
                      {row.label}
                    </span>
                    {row.savingsPct > 0 && (
                      <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md tabular-nums shrink-0">
                        Save {row.savingsPct}%
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-display font-semibold text-ivory tabular-nums">
                      ₹{row.price.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[11px] sm:text-xs text-zinc-500 tabular-nums mt-0.5">
                      ₹{Math.round(row.perUnit).toLocaleString('en-IN')} / {shortUnit === 'pc' ? 'unit' : shortUnit}
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-zinc-200/70 flex items-center justify-between text-[11px] sm:text-xs font-medium">
                    <span className={isSelected ? 'text-gold font-semibold' : 'text-zinc-600'}>
                      {isSelected ? 'Currently Selected' : 'Select Pack'}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-gold' : 'text-zinc-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 3A. Visual Editorial Feature Stories (Flagship pages with bespoke visual photography) */}
      {hasEditorialStories && content.editorialSections && (
        <section aria-label="Product performance stories" className="space-y-12 sm:space-y-16 lg:space-y-24">
          {content.editorialSections.map((section, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={section.eyebrow}
                className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-stretch"
              >
                {/* Media Column */}
                <div className={`lg:col-span-6 min-w-0 flex flex-col ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-royale-surface border border-zinc-200">
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-500 mt-2.5 sm:mt-3 leading-relaxed">
                    {section.imageCaption}
                  </p>
                </div>

                {/* Editorial Copy Column */}
                <div className={`lg:col-span-6 min-w-0 flex flex-col justify-center ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <p className="text-xs font-medium text-gold tracking-wide mb-2">
                    {section.eyebrow}
                  </p>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-ivory leading-snug text-balance mb-3 sm:mb-4">
                    {section.title}
                  </h2>
                  <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed mb-5 sm:mb-6">
                    {section.body}
                  </p>

                  <ul className="space-y-2.5 sm:space-y-3 border-t border-zinc-200/70 pt-4 sm:pt-5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-ivory/90">
                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mobile-Friendly Stain Cleanability Breakdown */}
                  {section.stainMatrix && (
                    <div className="mt-6 sm:mt-7 border-t border-zinc-200/80 pt-4 sm:pt-5">
                      <p className="text-xs font-semibold text-ivory mb-2.5 sm:mb-3">
                        Everyday Household Stain Cleanability
                      </p>
                      <div className="divide-y divide-zinc-200/70 text-xs">
                        {section.stainMatrix.map((row) => (
                          <div key={row.stain} className="py-2.5 flex flex-col sm:grid sm:grid-cols-12 gap-0.5 sm:gap-2 sm:items-baseline">
                            <div className="flex items-baseline justify-between gap-2 sm:contents">
                              <span className="sm:col-span-4 font-medium text-ivory">{row.stain}</span>
                              <span className="sm:hidden text-gold font-medium text-[11px] shrink-0">{row.result}</span>
                            </div>
                            <span className="sm:col-span-5 text-zinc-600 text-[11px] sm:text-xs">{row.cleanMethod}</span>
                            <span className="hidden sm:block sm:col-span-3 text-right text-gold font-medium">{row.result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* 3B. Verified Feature Highlights Grid (Typographic editorial cards — zero invented stock photos) */}
      {hasFeatureCards && content.featureCards && (
        <section aria-labelledby="feature-highlights-heading">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <p className="text-xs font-medium text-gold tracking-wide mb-1.5 sm:mb-2">Why Choose {productName}</p>
            <h2 id="feature-highlights-heading" className="text-xl sm:text-2xl lg:text-3xl font-serif text-ivory text-balance">
              Key Performance Highlights
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {content.featureCards.map((card) => (
              <div
                key={card.eyebrow}
                className="bg-royale-surface/60 border border-zinc-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-[11px] sm:text-xs font-medium text-gold tracking-wide mb-2">
                    {card.eyebrow}
                  </p>
                  <h3 className="text-base sm:text-lg font-serif font-medium text-ivory leading-snug mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {card.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4A. Official PIS Technical Summary & Finish Study (With Macro Visual) */}
      {hasMacroStudy && content.macroStudy && (
        <section className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center border-y border-zinc-200/80 py-10 sm:py-14">
          <div className="lg:col-span-5 min-w-0">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 bg-royale-surface">
              <img
                src={content.macroStudy.image}
                alt={content.macroStudy.imageAlt}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 min-w-0 space-y-5 sm:space-y-6">
            <div>
              <p className="text-xs font-medium text-gold tracking-wide mb-2">{content.macroStudy.eyebrow}</p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif text-ivory text-balance leading-snug">
                {content.macroStudy.title}
              </h2>
              <p className="text-sm sm:text-[15px] text-zinc-600 leading-relaxed mt-2.5 sm:mt-3">
                {content.macroStudy.description}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t border-zinc-200/70">
              {content.macroStudy.specs.map((spec) => (
                <div key={spec.label} className="min-w-0">
                  <p className="text-[11px] sm:text-xs text-zinc-500">{spec.label}</p>
                  <p className="text-xs sm:text-sm font-semibold text-ivory tabular-nums mt-1 leading-snug">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4B. Official Technical Specifications Table (Clean 2-Column Structured Spec Sheet) */}
      {hasSpecsTable && content.specificationsTable && (
        <section aria-labelledby="tech-specs-heading" className="border-y border-zinc-200/80 py-10 sm:py-14">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <p className="text-xs font-medium text-gold tracking-wide mb-1.5 sm:mb-2">Official Product Information</p>
            <h2 id="tech-specs-heading" className="text-xl sm:text-2xl lg:text-3xl font-serif text-ivory text-balance">
              Technical & Pack Specifications
            </h2>
          </div>

          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-0 border-t border-zinc-200/80">
            {content.specificationsTable.map((row) => (
              <div
                key={row.label}
                className="py-3.5 sm:py-4 border-b border-zinc-200/80 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
              >
                <dt className="text-xs text-zinc-500 font-medium shrink-0">{row.label}</dt>
                <dd className="text-xs sm:text-sm font-medium text-ivory sm:text-right leading-snug">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* 5. Side-by-Side Comparison (Zero Horizontal Scroll on Mobile!) */}
      {content.comparison && content.comparison.rows.length > 0 && (
        <section aria-labelledby="comparison-heading">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <p className="text-xs font-medium text-gold tracking-wide mb-1.5 sm:mb-2">Informed Selection</p>
            <h2 id="comparison-heading" className="text-xl sm:text-2xl lg:text-3xl font-serif text-ivory text-balance">
              {content.comparison.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">{content.comparison.subtitle}</p>
          </div>

          {/* Mobile Native Stacked Comparison Cards (Zero Sideways Scroll) */}
          <div className="md:hidden divide-y divide-zinc-200 border border-zinc-200 rounded-2xl bg-white overflow-hidden">
            {content.comparison.rows.map((row) => (
              <div key={row.criterion} className="p-4 space-y-2.5">
                <p className="text-xs font-semibold text-ivory">{row.criterion}</p>
                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="bg-royale-surface border border-gold/25 rounded-xl p-2.5">
                    <span className="block text-[10px] font-semibold text-gold mb-1 leading-tight">
                      {content.comparison!.featuredColumnLabel}
                    </span>
                    <span className="text-ivory font-medium leading-snug block">{row.featured}</span>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200/70 rounded-xl p-2.5">
                    <span className="block text-[10px] font-medium text-zinc-500 mb-1 leading-tight">
                      {content.comparison!.standardColumnLabel}
                    </span>
                    <span className="text-zinc-600 leading-snug block">{row.standard}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop / Tablet Clean 3-Column Table */}
          <div className="hidden md:block overflow-x-auto border border-zinc-200 rounded-2xl bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 text-xs text-zinc-500">
                  <th className="py-4 px-5 font-medium w-[28%]">Specification</th>
                  <th className="py-4 px-5 font-semibold text-ivory bg-royale-surface w-[38%]">
                    {content.comparison.featuredColumnLabel}
                  </th>
                  <th className="py-4 px-5 font-medium w-[34%]">
                    {content.comparison.standardColumnLabel}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/70 text-sm">
                {content.comparison.rows.map((row) => (
                  <tr key={row.criterion}>
                    <td className="py-4 px-5 font-medium text-ivory">{row.criterion}</td>
                    <td className="py-4 px-5 bg-royale-surface text-ivory font-medium tabular-nums">
                      {row.featured}
                    </td>
                    <td className="py-4 px-5 text-zinc-600 tabular-nums">{row.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 6. Complete 4-Step Application System Guide */}
      <section aria-labelledby="application-system-heading">
        <div className="max-w-2xl mb-7 sm:mb-10">
          <p className="text-xs font-medium text-gold tracking-wide mb-1.5 sm:mb-2">Recommended Application System</p>
          <h2 id="application-system-heading" className="text-xl sm:text-2xl lg:text-3xl font-serif text-ivory text-balance">
            {content.applicationSteps.title}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-2 leading-relaxed">
            {content.applicationSteps.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.applicationSteps.steps.map((step) => (
            <div key={step.stepNumber} className="border-t-2 border-zinc-200 pt-4 sm:pt-5 flex flex-col">
              <div className="flex items-baseline justify-between gap-2 mb-2.5 sm:mb-3">
                <span className="font-mono text-sm font-semibold text-gold tabular-nums">
                  {step.stepNumber}.
                </span>
                <span className="text-[11px] sm:text-xs text-zinc-500 text-right">{step.timing}</span>
              </div>
              <h3 className="text-sm sm:text-base font-serif font-medium text-ivory mb-1.5 sm:mb-2">{step.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed flex-1">{step.detail}</p>
              {step.linkedProductName && step.linkedProductSlug && (
                <Link
                  to={`/p/${step.linkedProductSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-ivory mt-3.5 pt-3 border-t border-zinc-200/70 transition-colors"
                >
                  Shop {step.linkedProductName}
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Interactive Buyer FAQs (Synced with FAQPage JSON-LD) */}
      <section aria-labelledby="rich-faq-heading" className="border-t border-zinc-200/80 pt-10 sm:pt-14">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 min-w-0">
            <p className="text-xs font-medium text-gold tracking-wide mb-1.5 sm:mb-2">Buyer Questions</p>
            <h2 id="rich-faq-heading" className="text-xl sm:text-2xl lg:text-3xl font-serif text-ivory text-balance">
              Frequently Asked Questions about {productName}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2.5 sm:mt-3 leading-relaxed">
              Need shade matching advice or bulk painter rates in Coimbatore? Call or message our counter specialists anytime.
            </p>
          </div>

          <div className="lg:col-span-8 min-w-0 divide-y divide-zinc-200 border-y border-zinc-200">
            {content.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full py-4 sm:py-5 min-h-[48px] flex items-center justify-between gap-3 sm:gap-4 text-left group focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <span className="text-sm sm:text-base font-medium text-ivory group-hover:text-gold transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-gold' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pb-4 sm:pb-5 pr-2 sm:pr-8 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Scroll-Triggered Floating Mobile Quick-Buy Dock (Clears bottom-right Support FAB!) */}
      <div
        className={`md:hidden fixed bottom-3.5 left-3 right-[78px] z-40 transition-all duration-200 ${
          showMobileDock
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-6 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border border-zinc-200 rounded-2xl px-3.5 py-2.5 flex items-center justify-between gap-2.5 shadow-[0_8px_28px_rgba(26,54,93,0.14)]">
          <div className="min-w-0">
            <p className="text-[11px] text-zinc-500 truncate">{formatPackLabel(selectedSize, unit)} Pack</p>
            <p className="text-base font-display font-semibold text-ivory tabular-nums leading-tight">
              ₹{currentPrice.toLocaleString()}
            </p>
          </div>
          <button
            type="button"
            onClick={onAddToCart}
            className="px-4 py-2.5 min-h-[40px] bg-gradient-gold text-white text-[11px] font-display font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 transition-transform"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

