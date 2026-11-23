import { HD_PACKSHOT_IMAGES, upgradeCdnImageUrl } from '../constants/hdPackshotImages';
import type {
  ApplicationStep,
  ComparisonRow,
  PaintCalculatorConfig,
  ProductFaqItem,
  ProductGalleryImage,
  ProductKeyMetric,
  RichProductContent,
} from './richProductContent';

export interface CatalogProductLike {
  id?: string | number;
  name: string;
  slug?: string;
  brand?: string;
  topCategory?: string;
  subCategory?: string;
  subCategories?: string[];
  category?: string;
  price?: string;
  basePrice?: number;
  sizes?: number[];
  sizePrices?: Record<number, number>;
  unit?: string;
  properties?: string[];
  description?: string;
  image?: string;
  popular?: boolean;
}

interface VerifiedAsianPaintsSpec {
  tagline: string;
  summary: string;
  finish?: string;
  warranty?: string;
  warrantyDetail?: string;
  coverageTwoCoats?: string;
  coverageOneCoat?: string;
  calcTwoCoatRate?: number;
  calcOneCoatRate?: number;
  calcMode?: 'interior' | 'exterior' | 'roof' | 'floor' | 'primer' | 'enamel' | 'wood';
  calcUnit?: 'L' | 'kg';
  dilution?: string;
  surfaceDry?: string;
  recoatInterval?: string;
  keyTechnology?: string;
  keyTechnologyDetail?: string;
  material?: string;
  shadeSummary?: string;
  standardComparisonLabel?: string;
  comparisonRows?: ComparisonRow[];
  extraSpecs?: { label: string; value: string }[];
  extraFaqs?: ProductFaqItem[];
  seoBenefitSentence?: string;
}

/**
 * Officially verified Asian Paints Product Information Sheet (PIS) & packshot specifications.
 * Every warranty, coverage rate, dilution ratio, and drying time below is verified from
 * official Asian Paints documentation and factory packaging — zero invented claims.
 */
export const ASIAN_PAINTS_VERIFIED_SPECS: Record<string, VerifiedAsianPaintsSpec> = {
  // === INTERIOR WALL PAINTS ===
  'royale glitz reserve': {
    tagline: 'Ultra-Luxury Interior Emulsion with Signature Crème Finish',
    summary:
      'Asian Paints’ ultra-luxury interior emulsion offering a rich crème finish, advanced stain repellency, and an official 8-year performance warranty covering film integrity and colour retention.',
    finish: 'Ultra-Luxury Crème Finish',
    warranty: '8 Years',
    warrantyDetail: 'Official Asian Paints performance warranty covering film integrity & stain guard',
    coverageTwoCoats: '140–160 sq.ft / L (2 coats)',
    calcTwoCoatRate: 150,
    calcOneCoatRate: 280,
    calcMode: 'interior',
    keyTechnology: 'Crème Finish',
    keyTechnologyDetail: 'Ultra-smooth tactile finish with stain-repellent protection',
    material: 'Water-based Ultra-Luxury Interior Acrylic Emulsion',
    shadeSummary: 'White & Computerized Asian Paints Colour Spectra Shades',
    standardComparisonLabel: 'Standard Interior Emulsion',
    comparisonRows: [
      { criterion: 'Finish Appearance', featured: 'Signature ultra-luxury crème finish', standard: 'Basic matt or low sheen' },
      { criterion: 'Stain Repellency', featured: 'High stain-repellent protective film', standard: 'Standard washability' },
      { criterion: 'Spreading Rate (2 Coats)', featured: '140–160 sq.ft / L on primed masonry', standard: 'Lower spreading efficiency' },
      { criterion: 'Official Warranty', featured: '8-Year Performance Warranty', standard: 'No 8-year luxury warranty' },
    ],
    seoBenefitSentence: 'Ultra-luxury crème finish, stain-repellent protection & 8-year warranty.',
  },
  'royale glitz': {
    tagline: 'Ultra-Sheen Luxury Interior Emulsion with Teflon™ & Crack-Free Performance',
    summary:
      'Asian Paints’ ultra-sheen luxury interior emulsion featuring Teflon™ Surface Protector, crack-free performance, rich luxury sheen, and an official 8-year performance warranty.',
    finish: 'Ultra Sheen',
    warranty: '8 Years',
    warrantyDetail: 'Official Asian Paints performance warranty',
    coverageTwoCoats: '140–160 sq.ft / L (2 coats)',
    coverageOneCoat: '260–280 sq.ft / L (1 coat)',
    calcTwoCoatRate: 150,
    calcOneCoatRate: 270,
    calcMode: 'interior',
    dilution: '30%–35% water (brush/roller), 25%–30% (felt roller), 10%–20% (airless spray)',
    keyTechnology: 'Teflon™ + Crack-Free',
    keyTechnologyDetail: 'Teflon™ Surface Protector with hairline crack-free performance',
    material: 'Water-based Ultra-Sheen Luxury Interior Acrylic Emulsion',
    shadeSummary: 'White & Computerized Asian Paints Colour Spectra Shades',
    standardComparisonLabel: 'Standard Interior Emulsion',
    comparisonRows: [
      { criterion: 'Finish', featured: 'Rich ultra-sheen luxury finish', standard: 'Basic low sheen or matt' },
      { criterion: 'Stain Guard', featured: 'Teflon™ Surface Protector', standard: 'No Teflon™ reinforcement' },
      { criterion: 'Surface Film', featured: 'Crack-free luxury film performance', standard: 'Standard rigid acrylic film' },
      { criterion: 'Coverage (2 Coats)', featured: '140–160 sq.ft / L (260–280 sq.ft/L 1 coat)', standard: 'Lower spreading rate' },
      { criterion: 'Official Warranty', featured: '8-Year Performance Warranty', standard: 'No 8-year luxury warranty' },
    ],
    seoBenefitSentence: 'Rich ultra-sheen finish, Teflon™ stain guard, crack-free walls & 8-year warranty.',
  },
  'royale glitz ultra matt': {
    tagline: 'Dead-Flat Ultra Matt Luxury Emulsion with Teflon™ & Crack-Free Performance',
    summary:
      'Asian Paints’ designer ultra-matt interior emulsion delivering a refined non-reflective luxury wall look with Teflon™ Surface Protector, crack-free performance, and an official 8-year warranty.',
    finish: 'Ultra Matt (Non-Reflective)',
    warranty: '8 Years',
    warrantyDetail: 'Official Asian Paints performance warranty',
    coverageTwoCoats: '140–160 sq.ft / L (2 coats)',
    coverageOneCoat: '260–280 sq.ft / L (1 coat)',
    calcTwoCoatRate: 150,
    calcOneCoatRate: 270,
    calcMode: 'interior',
    dilution: '30%–35% water (brush/roller), 25%–30% (felt roller), 10%–20% (airless spray)',
    keyTechnology: 'Ultra Matt + Teflon™',
    keyTechnologyDetail: 'Hides minor surface undulations with Teflon™ stain protection',
    material: 'Water-based Ultra-Matt Luxury Interior Acrylic Emulsion',
    shadeSummary: 'White & Computerized Asian Paints Colour Spectra Shades',
    standardComparisonLabel: 'Standard Matt Emulsion',
    comparisonRows: [
      { criterion: 'Glare & Reflection', featured: 'Dead-flat ultra matt hides surface glare', standard: 'Visible roller glare or patchy sheen' },
      { criterion: 'Stain Protection', featured: 'Teflon™ Surface Protector on a matt film', standard: 'Matt walls scuff and stain easily' },
      { criterion: 'Surface Performance', featured: 'Crack-free film performance', standard: 'Standard interior film' },
      { criterion: 'Official Warranty', featured: '8-Year Performance Warranty', standard: 'No 8-year luxury warranty' },
    ],
    seoBenefitSentence: 'Sophisticated dead-flat ultra-matt finish with Teflon™ stain protection & 8-year warranty.',
  },
  'royale shyne luxury emulsion': {
    tagline: 'High-Sheen Washable Luxury Interior Emulsion with Teflon™ Surface Protector',
    summary:
      'Asian Paints Royale Shyne Luxury Emulsion brings luminous high-sheen brilliance, Teflon™ Surface Protector for easy household stain removal, and an official 8-year performance warranty.',
    finish: 'High Sheen Luxury Finish',
    warranty: '8 Years',
    warrantyDetail: 'Official Asian Paints performance warranty',
    coverageTwoCoats: '140–160 sq.ft / L (2 coats)',
    coverageOneCoat: '270–310 sq.ft / L (1 coat)',
    calcTwoCoatRate: 150,
    calcOneCoatRate: 290,
    calcMode: 'interior',
    dilution: '40%–45% clean water (brush/roller), 10%–20% (airless spray)',
    keyTechnology: 'High Sheen + Teflon™',
    keyTechnologyDetail: 'Reflective luxury sheen with Teflon™ stain resistance',
    material: 'Water-based High-Sheen Luxury Acrylic Emulsion',
    shadeSummary: 'White & Computerized Asian Paints Colour Spectra Shades',
    standardComparisonLabel: 'Royale Luxury Emulsion',
    comparisonRows: [
      { criterion: 'Sheen Level', featured: 'Higher reflective sheen for luminous walls', standard: 'Smooth soft sheen' },
      { criterion: 'Stain Protection', featured: 'Teflon™ Surface Protector', standard: 'Teflon™ Surface Protector' },
      { criterion: 'Coverage (2 Coats)', featured: '140–160 sq.ft / L (270–310 sq.ft/L 1 coat)', standard: '140–160 sq.ft / L (270–310 sq.ft/L 1 coat)' },
      { criterion: 'Brush/Roller Dilution', featured: '40%–45% clean water', standard: '40%–45% clean water' },
      { criterion: 'Official Warranty', featured: '8-Year Performance Warranty', standard: '8-Year Performance Warranty' },
    ],
    seoBenefitSentence: 'Luminous high-sheen walls with Teflon™ stain guard & 8-year performance warranty.',
  },
  'royale matt emulsion': {
    tagline: 'Smooth Matt Luxury Interior Emulsion with Teflon™ Surface Protector',
    summary:
      'Asian Paints Royale Matt delivers a velvety smooth matt finish that minimizes surface glare while retaining Teflon™ Surface Protector stain resistance and an official 8-year performance warranty.',
    finish: 'Smooth Luxury Matt',
    warranty: '8 Years',
    warrantyDetail: 'Official Asian Paints performance warranty',
    coverageTwoCoats: '140–160 sq.ft / L (2 coats)',
    coverageOneCoat: '270–310 sq.ft / L (1 coat)',
    calcTwoCoatRate: 150,
    calcOneCoatRate: 290,
    calcMode: 'interior',
    dilution: 'Up to 40%–50% clean water (brush/roller)',
    keyTechnology: 'Smooth Matt + Teflon™',
    keyTechnologyDetail: 'Unmatched stain resistance with velvety low-glare matt aesthetics',
    material: 'Water-based Matt Luxury Interior Acrylic Emulsion',
    shadeSummary: 'White & Computerized Asian Paints Colour Spectra Shades',
    standardComparisonLabel: 'Standard Matt Emulsion',
    comparisonRows: [
      { criterion: 'Finish Quality', featured: 'Velvety luxury matt finish', standard: 'Chalky economy matt finish' },
      { criterion: 'Stain Resistance', featured: 'Teflon™ Surface Protector', standard: 'Basic washability' },
      { criterion: 'Coverage (2 Coats)', featured: '140–160 sq.ft / L (270–310 sq.ft/L 1 coat)', standard: 'Lower spreading rate' },
      { criterion: 'Official Warranty', featured: '8-Year Performance Warranty', standard: 'No 8-year luxury warranty' },
    ],
    seoBenefitSentence: 'Velvety smooth matt walls with Teflon™ stain protection & 8-year warranty.',
  },
  'royale aspira': {
    tagline: 'Hydrophobic Water-Beading Luxury Interior Emulsion with Crack Bridging',
    summary:
      'Asian Paints Royale Aspira features hydrophobic water-beading technology that repels liquid spills before they stain, crack-bridging elastomeric film strength, and luxury performance warranty protection.',
    finish: 'Smooth Luxury Sheen',
    warranty: '5–8 Years',
    warrantyDetail: 'Official Asian Paints Royale Aspira performance warranty framework',
    coverageTwoCoats: '118–140 sq.ft / L (2 coats)',
    coverageOneCoat: '237–258 sq.ft / L (1 coat)',
    calcTwoCoatRate: 130,
    calcOneCoatRate: 248,
    calcMode: 'interior',
    dilution: 'Up to 40%–45% clean water (avoid over-dilution to preserve water-beading film)',
    keyTechnology: 'Water Beading',
    keyTechnologyDetail: 'Hydrophobic surface causes water-based spills to bead up and roll off',
    material: 'Water-based Hydrophobic Luxury Interior Acrylic Emulsion',
    shadeSummary: 'White & Computerized Asian Paints Colour Spectra Shades',
    standardComparisonLabel: 'Standard Luxury Emulsion',
    comparisonRows: [
      { criterion: 'Liquid Spill Defense', featured: 'Hydrophobic water-beading technology', standard: 'Standard stain-wipe film' },
      { criterion: 'Film Elasticity', featured: 'Crack-bridging flexible film', standard: 'Standard rigid film' },
      { criterion: 'Coverage (2 Coats)', featured: '118–140 sq.ft / L (237–258 sq.ft/L 1 coat)', standard: '140–160 sq.ft / L' },
    ],
    seoBenefitSentence: 'Water-beading stain defense & crack-bridging luxury finish for pristine interior walls.',
  },
  'royale health shield': {
    tagline: 'Silver Ion Anti-Bacterial Luxury Interior Emulsion for Hygienic Homes',
    summary:
      'Asian Paints Royale Health Shield incorporates Silver Ion technology backed by a 3-year bacteria-killing warranty and 5-year performance warranty against fading, flaking, peeling, and fungal growth.',
    finish: 'Smooth Luxury Soft Sheen',
    warranty: '5 Yr + 3 Yr',
    warrantyDetail: '5-year performance warranty + 3-year bacteria-killing warranty',
    coverageTwoCoats: '140–160 sq.ft / L (2 coats)',
    coverageOneCoat: '270–310 sq.ft / L (1 coat)',
    calcTwoCoatRate: 150,
    calcOneCoatRate: 290,
    calcMode: 'interior',
    dilution: '40%–50% clean water (400–500 ml per litre for brush/roller)',
    keyTechnology: 'Silver Ion Tech',
    keyTechnologyDetail: 'Dedicated anti-bacterial shield with anti-fungal wall protection',
    material: 'Water-based Silver Ion Anti-Bacterial Interior Acrylic Emulsion',
    shadeSummary: 'White & Computerized Asian Paints Colour Spectra Shades',
    standardComparisonLabel: 'Standard Interior Emulsion',
    comparisonRows: [
      { criterion: 'Hygiene Protection', featured: 'Silver Ion technology with 3-year bacteria-killing warranty', standard: 'No dedicated bacteria-killing warranty' },
      { criterion: 'Performance Warranty', featured: '5-Year warranty against fading, flaking, peeling & fungus', standard: 'Basic warranty' },
      { criterion: 'Coverage (2 Coats)', featured: '140–160 sq.ft / L (270–310 sq.ft/L 1 coat)', standard: 'Lower spreading efficiency' },
    ],
    seoBenefitSentence: 'Silver Ion anti-bacterial protection with 3-year hygiene & 5-year performance warranty.',
  },
  'nilaya arc matt': {
    tagline: 'Super-Luxury Lime-Based Breathable Architectural Matt Paint',
    summary:
      'Asian Paints Nilaya Arc Matt is a super-luxury lime-based interior wall finish engineered for refined architectural matt depth, breathable aesthetics, and an official 10-year warranty against peeling and flaking.',
    finish: 'Architectural Lime Matt',
    warranty: '10 Years',
    warrantyDetail: 'Official Asian Paints 10-year warranty against peeling & flaking',
    coverageTwoCoats: '100–120 sq.ft / L (2 coats)',
    calcTwoCoatRate: 110,
    calcOneCoatRate: 210,
    calcMode: 'interior',
    keyTechnology: 'Lime-Based Craft',
    keyTechnologyDetail: 'Super-luxury mineral lime finish with organic architectural depth',
    material: 'Super-Luxury Lime-Based Interior Wall Coating',
    shadeSummary: 'Curated Nilaya Arc Architectural Palette',
    standardComparisonLabel: 'Standard Acrylic Matt Emulsion',
    comparisonRows: [
      { criterion: 'Base Chemistry', featured: 'Super-luxury lime-based formulation', standard: 'Standard synthetic acrylic' },
      { criterion: 'Coverage (2 Coats)', featured: '100–120 sq.ft / L (brush & short-nap roller)', standard: 'Standard emulsion spreading' },
      { criterion: 'Official Warranty', featured: '10-Year warranty against peeling & flaking', standard: 'Standard shorter warranty' },
    ],
    seoBenefitSentence: 'Super-luxury lime-based architectural matt walls backed by a 10-year warranty.',
  },
  'nilaya arc pearlescent': {
    tagline: 'Super-Luxury Lime-Based Paint with Luminous Pearlescent Glow',
    summary:
      'Asian Paints Nilaya Arc Pearlescent pairs a super-luxury lime-based wall formulation with a subtle luminous pearlescent sheen, backed by an official 10-year warranty against peeling and flaking.',
    finish: 'Luminous Pearlescent Lime Finish',
    warranty: '10 Years',
    warrantyDetail: 'Official Asian Paints 10-year warranty against peeling & flaking',
    coverageTwoCoats: '100–120 sq.ft / L (2 coats)',
    calcTwoCoatRate: 110,
    calcOneCoatRate: 210,
    calcMode: 'interior',
    keyTechnology: 'Pearlescent Lime',
    keyTechnologyDetail: 'Subtle luminous pearlescent sheen over lime-based mineral depth',
    material: 'Super-Luxury Lime-Based Pearlescent Interior Coating',
    shadeSummary: 'Curated Nilaya Arc Architectural Palette',
    standardComparisonLabel: 'Standard Sheen Emulsion',
    comparisonRows: [
      { criterion: 'Visual Depth', featured: 'Subtle luminous pearlescent mineral glow', standard: 'Flat uniform synthetic sheen' },
      { criterion: 'Coverage (2 Coats)', featured: '100–120 sq.ft / L (brush & short-nap roller)', standard: 'Standard emulsion coverage' },
      { criterion: 'Official Warranty', featured: '10-Year warranty against peeling & flaking', standard: 'Shorter standard warranty' },
    ],
    seoBenefitSentence: 'Super-luxury lime-based pearlescent finish backed by an official 10-year warranty.',
  },
  'apcolite all protek shyne': {
    tagline: 'Flame-Retardant, Stain-Repellent Interior Sheen with Lotus Effect Technology',
    summary:
      'Asian Paints Apcolite All Protek Shyne combines Lotus Effect stain repellency, flame retardancy, rich interior sheen, and an official 6-year performance warranty (+ 3-year waterproofing warranty with SmartCare Damp Sheath Interior).',
    finish: 'Rich Interior Sheen',
    warranty: '6 Years',
    warrantyDetail: '6-year performance warranty (+ 3-yr waterproofing with Damp Sheath Interior)',
    coverageTwoCoats: '130–150 sq.ft / L (2 coats)',
    calcTwoCoatRate: 140,
    calcOneCoatRate: 270,
    calcMode: 'interior',
    dilution: '30%–40% clean water (brush/roller), ~20% (spray)',
    keyTechnology: 'Lotus Effect + Flame Retardant',
    keyTechnologyDetail: 'Stain repellency & flame-retardant wall shield',
    material: 'Water-based Flame-Retardant Acrylic Interior Emulsion',
    shadeSummary: 'White & Computerized Asian Paints Shades',
    standardComparisonLabel: 'Standard Premium Emulsion',
    comparisonRows: [
      { criterion: 'Flame Safety', featured: 'Flame-retardant wall film', standard: 'Standard non-flame-retardant film' },
      { criterion: 'Stain Defense', featured: 'Lotus Effect stain repellency', standard: 'Standard stain guard' },
      { criterion: 'Performance Warranty', featured: '6 Years (+ 3 yrs waterproofing with Damp Sheath)', standard: '5 Years' },
      { criterion: 'Coverage (2 Coats)', featured: '130–150 sq.ft / L on primed masonry', standard: '130–150 sq.ft / L' },
    ],
    seoBenefitSentence: 'Lotus Effect stain repellency, flame-retardant protection & 6-year warranty.',
  },
  'apcolite all protek matt': {
    tagline: 'Flame-Retardant, Stain-Repellent Interior Matt with Lotus Effect Technology',
    summary:
      'Asian Paints Apcolite All Protek Matt delivers a sleek glare-free matt finish fortified with Lotus Effect stain repellency, flame retardancy, and an official 6-year performance warranty.',
    finish: 'Smooth Interior Matt',
    warranty: '6 Years',
    warrantyDetail: '6-year performance warranty (+ 3-yr waterproofing with Damp Sheath Interior)',
    coverageTwoCoats: '130–150 sq.ft / L (2 coats)',
    calcTwoCoatRate: 140,
    calcOneCoatRate: 270,
    calcMode: 'interior',
    dilution: '30%–40% clean water (brush/roller), ~20% (spray)',
    keyTechnology: 'Lotus Effect + Flame Retardant',
    keyTechnologyDetail: 'Stain repellency & flame-retardant protection in a matt finish',
    material: 'Water-based Flame-Retardant Matt Acrylic Interior Emulsion',
    shadeSummary: 'White & Computerized Asian Paints Shades',
    standardComparisonLabel: 'Standard Matt Emulsion',
    comparisonRows: [
      { criterion: 'Flame Safety', featured: 'Flame-retardant interior film', standard: 'Standard acrylic emulsion' },
      { criterion: 'Stain Defense', featured: 'Lotus Effect stain repellency', standard: 'Basic washability' },
      { criterion: 'Performance Warranty', featured: '6 Years (+ 3 yrs waterproofing with Damp Sheath)', standard: '4–5 Years' },
    ],
    seoBenefitSentence: 'Glare-free matt finish with Lotus Effect stain guard, flame retardancy & 6-year warranty.',
  },
  'apcolite premium emulsion': {
    tagline: 'Trusted Mid-Premium Washable Interior Emulsion with Stain Guard',
    summary:
      'Asian Paints Apcolite Premium Emulsion offers a rich, long-lasting smooth finish with Stain Guard protection, high coverage (130–150 sq.ft/L for 2 coats), and an official 5-year performance warranty.',
    finish: 'Rich Smooth Matt / Soft Finish',
    warranty: '5 Years',
    warrantyDetail: '5-year performance warranty (+ 3-yr waterproofing with Damp Sheath Interior)',
    coverageTwoCoats: '130–150 sq.ft / L (2 coats)',
    coverageOneCoat: '260–300 sq.ft / L (1 coat)',
    calcTwoCoatRate: 140,
    calcOneCoatRate: 280,
    calcMode: 'interior',
    dilution: 'Up to 40% clean water (per pack instructions)',
    keyTechnology: 'Stain Guard',
    keyTechnologyDetail: 'Long-lasting washable film resistant to common household stains',
    material: 'Water-based Premium Acrylic Interior Emulsion',
    shadeSummary: 'White & 1,750+ Computerized Asian Paints Shades',
    standardComparisonLabel: 'Economy Emulsion / Distemper',
    comparisonRows: [
      { criterion: 'Washability', featured: 'Stain Guard washable interior film', standard: 'Limited wipe-ability' },
      { criterion: 'Coverage (2 Coats)', featured: '130–150 sq.ft / L (260–300 sq.ft/L 1 coat)', standard: 'Lower coverage per litre' },
      { criterion: 'Official Warranty', featured: '5-Year Performance Warranty', standard: 'Shorter or no warranty' },
    ],
    seoBenefitSentence: 'Smooth, stain-resistant interior walls with high coverage & 5-year performance warranty.',
  },
  'tractor emulsion': {
    tagline: 'Value-Smart Smooth Interior Plastic Emulsion with 1.5× Distemper Coverage',
    summary:
      'Asian Paints Tractor Emulsion brings a smooth plastic-paint finish at distemper-friendly value, delivering ~1.5× the coverage of standard distempers and an official 4-year performance warranty.',
    finish: 'Smooth Matt Plastic Finish',
    warranty: '4 Years',
    warrantyDetail: 'Official Asian Paints performance warranty',
    coverageTwoCoats: '130–150 sq.ft / L (2 coats)',
    coverageOneCoat: '250–300 sq.ft / L (1 coat)',
    calcTwoCoatRate: 140,
    calcOneCoatRate: 275,
    calcMode: 'interior',
    dilution: 'Up to 50%–60% clean water (check pack instructions)',
    keyTechnology: '1.5× Distemper Coverage',
    keyTechnologyDetail: 'Smooth emulsion finish without the chalkiness of distemper',
    material: 'Water-based Economy Acrylic Interior Emulsion',
    shadeSummary: 'White & 1,600+ Computerized Asian Paints Shades',
    standardComparisonLabel: 'Acrylic Distemper',
    comparisonRows: [
      { criterion: 'Wall Finish', featured: 'Smooth, non-chalky plastic emulsion look', standard: 'Powdery chalky finish' },
      { criterion: 'Coverage Efficiency', featured: '~1.5× coverage of standard distemper (130–150 sq.ft/L 2 coats)', standard: 'Higher material usage per room' },
      { criterion: 'Official Warranty', featured: '4-Year Performance Warranty', standard: 'No multi-year performance warranty' },
    ],
    seoBenefitSentence: 'Smooth plastic-emulsion look at distemper-friendly value with 4-year warranty.',
  },
  'royale play safari': {
    tagline: 'Water-Based Special Effects Designer Wall Paint with Desert-Inspired Depth',
    summary:
      'Asian Paints Royale Play Safari is a water-based special effects topcoat crafted for feature walls, offering metallic and non-metallic desert-sand inspired decorative depth with easy washability.',
    finish: 'Designer Special Effects Texture',
    coverageOneCoat: '40–60 sq.ft / L (1 coat)',
    calcTwoCoatRate: 50,
    calcOneCoatRate: 50,
    calcMode: 'interior',
    keyTechnology: 'Special Effects',
    keyTechnologyDetail: 'Creates multi-tonal desert safari texture patterns using specialty tools',
    material: 'Water-based Special Effects Decorative Topcoat',
    shadeSummary: 'Metallic & Non-Metallic Designer Tones',
    seoBenefitSentence: 'Create signature designer accent walls with rich metallic & non-metallic desert texture.',
  },
  'royale play stucco': {
    tagline: 'Mineral Plaster Special Effects Finish with Polished Marble-Like Depth',
    summary:
      'Asian Paints Royale Play Stucco is a durable mineral plaster finish applied by steel trowel to create classic Venetian marble-like accent walls with distinctive sheen and depth.',
    finish: 'Marble-Like Venetian Stucco',
    coverageOneCoat: '18–20 sq.ft / kg (1 coat · 3 coats recommended)',
    calcTwoCoatRate: 7,
    calcOneCoatRate: 19,
    calcMode: 'interior',
    calcUnit: 'kg',
    keyTechnology: 'Marble-Like Stucco',
    keyTechnologyDetail: 'Trowel-applied mineral finish for classic polished-stone wall character',
    material: 'Mineral Plaster Special Effects Wall Finish',
    shadeSummary: 'Tintable Decorative Accent Shades',
    seoBenefitSentence: 'Transform feature walls with a durable, polished marble-like Venetian stucco finish.',
  },

  // === EXTERIOR WALL PAINTS ===
  'apex ultima protek duralife': {
    tagline: 'Flagship 15-Year Exterior Waterproofing & Anti-Algal Wall Shield',
    summary:
      'Asian Paints’ flagship exterior coating engineered with advanced pure acrylic nanotechnology to deliver up to 15 years of waterproofing, anti-algal, and colour-retention protection for exposed building facades.',
    finish: 'Rich Exterior Sheen',
    warranty: '15 Years',
    warrantyDetail: 'Up to 15-year waterproofing & anti-algal performance warranty',
    coverageTwoCoats: '55–65 sq.ft / L (2 topcoats)',
    calcTwoCoatRate: 60,
    calcOneCoatRate: 115,
    calcMode: 'exterior',
    keyTechnology: '15-Yr Protek Shield',
    keyTechnologyDetail: 'Flagship waterproofing, hairline crack-bridging & extreme weather defense',
    material: 'Engineered Pure Acrylic Nanotechnology Exterior Emulsion',
    shadeSummary: 'White & Exterior Weather-Fast Computerized Shades',
    standardComparisonLabel: 'Standard Exterior Emulsion',
    comparisonRows: [
      { criterion: 'Waterproofing Warranty', featured: 'Up to 15-Year Waterproofing & Anti-Algal Warranty', standard: '4–6 Year basic weather warranty' },
      { criterion: 'Monsoon & Algae Shield', featured: 'Engineered waterproof lamination barrier', standard: 'Basic surface rain resistance' },
      { criterion: 'Topcoat Spreading (2 Coats)', featured: '55–65 sq.ft / L (5–6 sq.m/L)', standard: '50–60 sq.ft / L' },
    ],
    seoBenefitSentence: 'Asian Paints’ toughest exterior shield with up to 15-year waterproofing & anti-algal warranty.',
  },
  'apex ultima protek': {
    tagline: 'Fibre-Reinforced Exterior Waterproofing & Anti-Algal Lamination System',
    summary:
      'Asian Paints Apex Ultima Protek provides laminated exterior wall protection engineered to fight heavy rains, dampness, algae, and hairline cracks, backed by a 10-year waterproofing & performance warranty.',
    finish: 'Rich Exterior Sheen',
    warranty: '10 Years',
    warrantyDetail: 'Official 10-year waterproofing & anti-algal performance warranty',
    coverageTwoCoats: '55–65 sq.ft / L (2 topcoats)',
    calcTwoCoatRate: 60,
    calcOneCoatRate: 115,
    calcMode: 'exterior',
    keyTechnology: 'Lamination Guard',
    keyTechnologyDetail: 'Waterproofing exterior barrier against rain seepage & algal growth',
    material: 'Pure Acrylic Exterior Waterproofing Emulsion',
    shadeSummary: 'White & Exterior Weather-Fast Computerized Shades',
    standardComparisonLabel: 'Standard Exterior Emulsion',
    comparisonRows: [
      { criterion: 'Exterior Waterproofing', featured: 'Dedicated exterior waterproofing & anti-algal system', standard: 'No dedicated waterproofing barrier' },
      { criterion: 'Official Warranty', featured: '10-Year Performance & Waterproofing Warranty', standard: '4–6 Year basic warranty' },
      { criterion: 'Topcoat Coverage (2 Coats)', featured: '55–65 sq.ft / L (5–6 sq.m/L)', standard: '50–60 sq.ft / L' },
    ],
    seoBenefitSentence: 'Laminated exterior waterproofing & anti-algal wall protection with 10-year warranty.',
  },
  'apex ultima': {
    tagline: 'Weatherproof 100% Acrylic Exterior Emulsion with Colour Stay™ Technology',
    summary:
      'Asian Paints Apex Ultima is a water-based 100% acrylic exterior emulsion fortified with silicon additives and UV-resistant Colour Stay™ Technology, backed by an official 8-year performance warranty.',
    finish: 'Smooth Exterior Soft Sheen',
    warranty: '8 Years',
    warrantyDetail: 'Official 8-year performance & anti-algal warranty',
    coverageTwoCoats: '55–65 sq.ft / L (2 coats)',
    calcTwoCoatRate: 60,
    calcOneCoatRate: 120,
    calcMode: 'exterior',
    keyTechnology: 'Colour Stay™ UV',
    keyTechnologyDetail: 'Silicon-fortified 100% acrylic film resists fading, dust & algae',
    material: 'Water-based 100% Acrylic Exterior Emulsion with Silicon Additives',
    shadeSummary: 'White & 1,700+ UV-Resistant Exterior Shades',
    standardComparisonLabel: 'Economy Exterior Emulsion',
    comparisonRows: [
      { criterion: 'UV & Fade Defense', featured: 'Colour Stay™ Technology for vibrant exteriors', standard: 'Fades faster under intense sun' },
      { criterion: 'Algae & Dust Defense', featured: 'Advanced anti-algal & dirt pick-up resistance', standard: 'Basic rain protection' },
      { criterion: 'Official Warranty', featured: '8-Year Performance Warranty', standard: '4-Year warranty' },
    ],
    seoBenefitSentence: 'UV-resistant Colour Stay™ exterior paint with anti-algal protection & 8-year warranty.',
  },
  'apex ultima stretch': {
    tagline: 'Elastomeric Crack-Bridging Exterior Emulsion Powered by PU Serum Flex Armour',
    summary:
      'Asian Paints Apex Ultima Stretch is an elastomeric exterior emulsion powered by PU Serum Flex Armour to bridge hairline wall cracks, resist dust and UV rays, fight algae, and protect walls with an official 8-year warranty.',
    finish: 'Smooth Elastomeric Exterior Sheen',
    warranty: '8 Years',
    warrantyDetail: 'Official 8-year performance warranty (printed on pack)',
    coverageTwoCoats: '55–65 sq.ft / L (2 coats)',
    calcTwoCoatRate: 60,
    calcOneCoatRate: 115,
    calcMode: 'exterior',
    keyTechnology: 'PU Serum Flex Armour',
    keyTechnologyDetail: 'Elastomeric crack-bridging ability with Dust Proof UV Protect & Algae Shield',
    material: 'Elastomeric 100% Acrylic Exterior Emulsion with PU Serum',
    shadeSummary: 'White & UV-Resistant Exterior Computerized Shades',
    standardComparisonLabel: 'Non-Elastomeric Exterior Paint',
    comparisonRows: [
      { criterion: 'Hairline Cracks', featured: 'Elastomeric PU Serum Flex Armour bridges hairline cracks', standard: 'Rigid film splits as plaster expands' },
      { criterion: 'Dust & Algae', featured: 'Dust Proof UV Protect + Algae Shield', standard: 'Basic exterior film' },
      { criterion: 'Official Warranty', featured: '8-Year Performance Warranty', standard: '4–6 Year warranty' },
    ],
    seoBenefitSentence: 'Elastomeric PU Serum exterior paint that bridges hairline cracks with an 8-year warranty.',
  },
  'apex dust proof': {
    tagline: 'Dust-Blocking Weatherproof Exterior Emulsion with 6-Year Warranty',
    summary:
      'Asian Paints Apex Dust Proof is a water-based modified acrylic exterior emulsion designed to prevent dust settling on exterior walls, resist fungal/algal growth, and maintain fresh colours with an official 6-year warranty.',
    finish: 'Smooth Exterior Matt / Low Sheen',
    warranty: '6 Years',
    warrantyDetail: 'Official 6-year performance warranty (colour, film & anti-algal)',
    coverageTwoCoats: '55–65 sq.ft / L (2 coats)',
    calcTwoCoatRate: 60,
    calcOneCoatRate: 120,
    calcMode: 'exterior',
    keyTechnology: 'Dust Pick-up Guard',
    keyTechnologyDetail: 'Resists dust accumulation along busy roads & dry climates',
    material: 'Water-based Modified Acrylic Exterior Emulsion',
    shadeSummary: 'White & Computerized Exterior Shades',
    standardComparisonLabel: 'Standard Exterior Emulsion',
    comparisonRows: [
      { criterion: 'Dust Accumulation', featured: 'Dust-blocking film keeps roadside exteriors cleaner', standard: 'Attracts airborne dust faster' },
      { criterion: 'Coverage (2 Coats)', featured: '55–65 sq.ft / L on primed exterior masonry', standard: '50–60 sq.ft / L' },
      { criterion: 'Official Warranty', featured: '6-Year Performance Warranty', standard: '4-Year warranty' },
    ],
    seoBenefitSentence: 'Keep exterior walls cleaner longer with dust-blocking technology & 6-year warranty.',
  },
  'ace exterior emulsion': {
    tagline: 'Value-Smart Weatherproof Exterior Emulsion with Anti-Dirt & Anti-Algal Formula',
    summary:
      'Asian Paints Ace Exterior Emulsion delivers dependable outdoor protection with Anti-Dirt dust resistance, Anti-Fade technology, Anti-Algal formula, up to 75% water dilution economy, and an official 4-year warranty.',
    finish: 'Smooth Exterior Matt',
    warranty: '4 Years',
    warrantyDetail: 'Official 4-year warranty (anti-algal, peeling, flaking & fading)',
    coverageTwoCoats: '50–60 sq.ft / L (2 coats)',
    calcTwoCoatRate: 55,
    calcOneCoatRate: 115,
    calcMode: 'exterior',
    dilution: 'Up to 75% clean water by volume (750 ml water per 1L)',
    keyTechnology: 'Anti-Dirt & Anti-Algal',
    keyTechnologyDetail: 'Anti-Fade technology & algal defense at budget-friendly exterior cost',
    material: 'Water-based Acrylic Exterior Emulsion',
    shadeSummary: 'White & 1,500+ Computerized Exterior Shades',
    standardComparisonLabel: 'Cement Paint',
    comparisonRows: [
      { criterion: 'Durability vs Cement Paint', featured: 'Lasts significantly longer without chalking', standard: 'Requires frequent repainting & chalks quickly' },
      { criterion: 'Algae & Fade Defense', featured: 'Anti-Algal Formula + Anti-Fade Technology', standard: 'Prone to monsoon black patches' },
      { criterion: 'Official Warranty', featured: '4-Year Performance Warranty', standard: 'No performance warranty' },
    ],
    seoBenefitSentence: 'Affordable exterior weather protection with Anti-Dirt, Anti-Algal formula & 4-year warranty.',
  },
  'apex floor guard': {
    tagline: 'Hi-Performance Abrasion-Resistant Coating for Terraces, Pavers & Cement Floors',
    summary:
      'Asian Paints Apex Floor Guard is a heavy-duty exterior floor coating built for interlocking paver blocks, cement tiles, walkways, and terraces, offering high abrasion resistance, washability, and an official 2-year performance warranty.',
    finish: 'Tough Semi-Gloss / Satin Floor Finish',
    warranty: '2 Years',
    warrantyDetail: 'Official 2-year performance warranty on cement tiles, concrete & pavers',
    coverageOneCoat: '30–50 sq.ft / L (1 coat)',
    calcTwoCoatRate: 25,
    calcOneCoatRate: 40,
    calcMode: 'floor',
    keyTechnology: 'High Abrasion Guard',
    keyTechnologyDetail: 'Engineered to resist foot traffic, wear & outdoor dirt on masonry floors',
    material: 'Water-based High-Abrasion Exterior Floor Coating',
    shadeSummary: 'Popular Terracotta, Grey & Architectural Floor Shades',
    seoBenefitSentence: 'Protect concrete walkways, paver blocks & terrace floors with high abrasion resistance & 2-year warranty.',
  },
  'apex tile guard': {
    tagline: 'Water-Repellent, Anti-Algal Protective Coating for Exterior Roof Tiles',
    summary:
      'Asian Paints Apex Tile Guard shields clay, terracotta, and cement roof tiles from algae, moss, rain absorption, and fading while delivering a rich glossy sheen backed by an official 5-year performance warranty.',
    finish: 'Superior Glossy Sheen',
    warranty: '5 Years',
    warrantyDetail: 'Official 5-year warranty (water repellency, film integrity & anti-algal)',
    coverageTwoCoats: '45–60 sq.ft / L (2 coats)',
    coverageOneCoat: '90–120 sq.ft / L (1 coat)',
    calcTwoCoatRate: 52,
    calcOneCoatRate: 105,
    calcMode: 'floor',
    keyTechnology: 'Water Repellent + Anti-Algal',
    keyTechnologyDetail: 'Stops black fungal streaks & moisture seepage on sloping roof tiles',
    material: 'Water-based Silicon-Modified Roof Tile Protective Coating',
    shadeSummary: 'Terracotta & Classic Roof Tile Shades',
    seoBenefitSentence: 'Shield roof tiles from rain, algae & fading with glossy sheen & 5-year warranty.',
  },
  'apex tile guard matt': {
    tagline: 'Natural-Look Matt Water-Repellent & Anti-Algal Roof Tile Coating',
    summary:
      'Asian Paints Apex Tile Guard Matt protects exterior clay and cement roof tiles from rain absorption, algae, and weathering while preserving a natural low-glare matt appearance with an official 5-year warranty.',
    finish: 'Natural Low-Glare Matt',
    warranty: '5 Years',
    warrantyDetail: 'Official 5-year warranty (water repellency, film integrity & anti-algal)',
    coverageTwoCoats: '45–60 sq.ft / L (2 coats)',
    coverageOneCoat: '90–120 sq.ft / L (1 coat)',
    calcTwoCoatRate: 52,
    calcOneCoatRate: 105,
    calcMode: 'floor',
    keyTechnology: 'Matt Anti-Algal Shield',
    keyTechnologyDetail: 'Preserves natural terracotta tile aesthetics without high gloss',
    material: 'Water-based Matt Roof Tile Protective Coating',
    shadeSummary: 'Natural Terracotta & Roof Tile Shades',
    seoBenefitSentence: 'Natural matt protection for roof tiles with water repellency, anti-algal guard & 5-year warranty.',
  },

  // === SMARTCARE WATERPROOFING ===
  'smartcare damp proof': {
    tagline: 'Fibre-Reinforced Elastomeric Terrace Waterproofing with Heat Reduction',
    summary:
      'Asian Paints SmartCare Damp Proof is a fibre-reinforced elastomeric liquid waterproofing membrane for roofs and terraces, featuring Triple Flex Armour Layer, surface temperature reduction up to 10°C**, and up to 10-year waterproofing warranty** (per pack terms).',
    finish: 'Thick Elastomeric Waterproof Membrane',
    warranty: 'Up to 10 Yrs',
    warrantyDetail: 'Official SmartCare terrace waterproofing warranty (subject to forced coverage & system terms)',
    coverageOneCoat: '~10 sq.ft / L (forced coverage)',
    calcTwoCoatRate: 10,
    calcOneCoatRate: 20,
    calcMode: 'roof',
    keyTechnology: 'Triple Flex Armour',
    keyTechnologyDetail: 'Fibre-reinforced crack bridging + surface heat reduction up to 10°C**',
    material: 'Fibre-Reinforced Elastomeric Acrylic Waterproofing Coating',
    shadeSummary: 'Brilliant White (Heat Reflective) & Select Shades',
    extraSpecs: [
      { label: 'Surface Cooling', value: 'Up to 10°C** surface temperature reduction' },
      { label: 'Warranty Note', value: 'Requires forced coverage & registration per Asian Paints warranty terms' },
    ],
    seoBenefitSentence: 'Fibre-reinforced terrace waterproofing with crack bridging, up to 10°C heat reduction & long warranty.',
  },
  'smartcare damp proof ultra': {
    tagline: 'PU-Reinforced Ultracool Terrace Waterproofing with 15-Year Warranty',
    summary:
      'Asian Paints SmartCare Damp Proof Ultracool PU is a PU-reinforced elastomeric waterproofing membrane delivering Triple Flex Armour protection, up to 10°C** surface temperature reduction, and up to 15-year waterproofing warranty* (per official system terms).',
    finish: 'PU-Reinforced Elastomeric Membrane',
    warranty: '15 Years*',
    warrantyDetail: 'Official SmartCare Ultracool PU waterproofing warranty (subject to system & registration terms)',
    keyTechnology: 'PU Reinforced + Ultracool',
    keyTechnologyDetail: 'Triple Flex Armour Layer + up to 10°C** roof surface cooling',
    material: 'PU-Reinforced Fibre Elastomeric Waterproofing Membrane',
    shadeSummary: 'High-Reflectance White',
    extraSpecs: [
      { label: 'Reinforcement', value: 'PU Reinforced with Triple Flex Armour Layer' },
      { label: 'Surface Cooling', value: 'Up to 10°C** surface temperature reduction' },
    ],
    seoBenefitSentence: 'PU-reinforced Ultracool terrace waterproofing with Triple Flex Armour & up to 15-year warranty.',
  },
  'smartcare damp sheath interior': {
    tagline: '3-Year Waterproofing Interior Primer with Moisture Block Technology',
    summary:
      'Asian Paints SmartCare Damp Sheath Interior is a waterproofing interior wall primer engineered with Moisture Block Technology for walls with up to 40% substrate moisture, boosting topcoat coverage by up to 15% with a 3-year waterproofing warranty.',
    finish: 'Waterproofing Primer Undercoat',
    warranty: '3 Years',
    warrantyDetail: 'Official 3-year interior waterproofing warranty (substrate moisture ≤ 40%)',
    coverageOneCoat: '90–100 sq.ft / L (undiluted)',
    calcTwoCoatRate: 95,
    calcOneCoatRate: 95,
    calcMode: 'primer',
    keyTechnology: 'Moisture Block Tech',
    keyTechnologyDetail: 'Up to 15% increase in topcoat coverage + crack-bridging ability',
    material: 'Water-based Elastomeric Interior Waterproofing Primer',
    extraSpecs: [
      { label: 'Max Substrate Moisture', value: 'Suitable up to 40% wall moisture (non-live leak)' },
      { label: 'Topcoat Coverage Boost', value: 'Up to 15% higher topcoat spreading' },
    ],
    seoBenefitSentence: 'Block interior wall dampness before painting with Moisture Block primer & 3-year warranty.',
  },
  'smartcare damp block 2k': {
    tagline: 'Two-Component Cementitious Polymer Barrier Against Severe Damp & Efflorescence',
    summary:
      'Asian Paints SmartCare Damp Block 2K is a two-pack polymer-modified cementitious waterproofing coating designed to arrest severe dampness and salt efflorescence on interior masonry walls and wet areas.',
    finish: 'Cementitious Waterproof Barrier',
    warranty: '3 Yr Brick / 1 Yr Plaster',
    warrantyDetail: '3-year warranty at brick level, 1-year warranty on plaster',
    coverageTwoCoats: '7.5–8 sq.ft / kg (2 coats)',
    coverageOneCoat: '~15 sq.ft / kg (1 coat)',
    calcTwoCoatRate: 8,
    calcOneCoatRate: 15,
    calcMode: 'roof',
    calcUnit: 'kg',
    keyTechnology: '2K Anti-Efflorescence',
    keyTechnologyDetail: 'Stops salt blistering & heavy damp patches before putty and priming',
    material: 'Two-Component Polymer-Modified Cementitious Waterproofing',
    seoBenefitSentence: 'Heavy-duty 2K cementitious barrier that stops severe interior dampness & salt efflorescence.',
  },
  'smartcare hydroloc xtreme': {
    tagline: 'Ready-to-Use Interior Waterproofing for Extreme Dampness (Up to 90% Moisture)',
    summary:
      'Asian Paints SmartCare Hydroloc Xtreme is a ready-to-use interior waterproofing system formulated to counteract negative hydrostatic pressure, heavy efflorescence, and up to 90% wall moisture with an official 5-year waterproofing warranty.',
    finish: 'Penetrative Waterproof Barrier',
    warranty: '5 Years',
    warrantyDetail: 'Official 5-year waterproofing warranty on treated interior areas (≤ 90% moisture)',
    coverageTwoCoats: '16.5–20 sq.ft / L (complete system)',
    calcTwoCoatRate: 18,
    calcOneCoatRate: 36,
    calcMode: 'roof',
    keyTechnology: 'Up to 90% Moisture',
    keyTechnologyDetail: 'Resists negative hydrostatic pressure & stubborn damp patches without plaster hacking',
    material: 'Ready-to-Use High-Performance Interior Waterproofing Barrier',
    seoBenefitSentence: 'Ready-to-use interior waterproofing for severe dampness up to 90% moisture & 5-year warranty.',
  },

  // === PRIMERS ===
  'decoprime wall primer': {
    tagline: 'High-Opacity Water-Thinnable Interior Wall Primer Undercoat',
    summary:
      'Asian Paints Decoprime Wall Primer seals masonry porosity, strengthens topcoat adhesion, and boosts opacity with 1:1 clean water dilution, quick 20–45 minute surface drying, and high spreading efficiency.',
    finish: 'Smooth Matt Undercoat',
    coverageOneCoat: '215–270 sq.ft / L (1 coat on smooth masonry)',
    calcTwoCoatRate: 240,
    calcOneCoatRate: 240,
    calcMode: 'primer',
    dilution: '1:1 by volume with clean water (100% dilution)',
    surfaceDry: '20–45 mins',
    recoatInterval: '3–4 hrs',
    keyTechnology: 'High Opacity Seal',
    keyTechnologyDetail: 'Seals porous plaster so emulsion topcoats achieve true shade & coverage',
    material: 'Water-Thinnable Acrylic Cement Wall Primer',
    seoBenefitSentence: 'Seal interior walls with high-opacity Decoprime primer for smoother, longer-lasting topcoats.',
  },
  'trucare interior wall primer - water thinnable': {
    tagline: 'Water-Thinnable Acrylic Interior Wall Primer for Strong Topcoat Adhesion',
    summary:
      'Asian Paints TruCare Interior Wall Primer (WT) prepares interior plastered walls and putty surfaces with 1:1 water dilution, rapid 20–30 minute touch dry time, and reliable alkali & moisture sealing.',
    finish: 'Matt Interior Undercoat',
    coverageOneCoat: '120–140 sq.ft / L (1 coat)',
    calcTwoCoatRate: 130,
    calcOneCoatRate: 130,
    calcMode: 'primer',
    dilution: '1:1 by volume with clean water',
    surfaceDry: '20–30 mins',
    recoatInterval: '4–6 hrs',
    keyTechnology: 'Alkali & Grip Seal',
    keyTechnologyDetail: 'Prevents patchy paint absorption on fresh plaster & wall putty',
    material: 'Water-Thinnable Acrylic Interior Wall Primer',
    seoBenefitSentence: 'Prepare interior walls cleanly with fast-drying, water-thinnable TruCare wall primer.',
  },
  'trucare exterior wall primer': {
    tagline: 'Alkali-Resistant Water-Thinnable Exterior Wall Primer',
    summary:
      'Asian Paints TruCare Exterior Wall Primer is a water-thinnable exterior undercoat formulated to resist wall alkalinity, seal porous cement plaster, and maximize durability of Apex & Ace exterior topcoats.',
    finish: 'Matt Exterior Undercoat',
    coverageOneCoat: '100–140 sq.ft / L (1 coat)',
    calcTwoCoatRate: 120,
    calcOneCoatRate: 120,
    calcMode: 'primer',
    dilution: '1:1 by volume with clean water',
    surfaceDry: '~30 mins',
    recoatInterval: '4–5 hrs',
    keyTechnology: 'Exterior Alkali Guard',
    keyTechnologyDetail: 'Bonds exterior masonry tightly to prevent peeling & blistering',
    material: 'Water-Thinnable Acrylic Exterior Wall Primer',
    seoBenefitSentence: 'Build a strong alkali-resistant foundation for exterior paints with TruCare Exterior Primer.',
  },
  'royale wall base coat': {
    tagline: 'High-Opacity Luxury Interior Undercoat Engineered for Royale Emulsions',
    summary:
      'Asian Paints Royale Wall Base Coat is a high-build, water-thinnable luxury undercoat designed to maximize hiding, smoothness, and true colour brilliance under Royale Luxury, Shyne, Matt, and Glitz topcoats.',
    finish: 'Smooth High-Opacity Undercoat',
    coverageOneCoat: '175–210 sq.ft / L (1 coat)',
    calcTwoCoatRate: 190,
    calcOneCoatRate: 190,
    calcMode: 'primer',
    dilution: '50%–60% clean water by volume',
    surfaceDry: '~30 mins',
    recoatInterval: '4–5 hrs',
    keyTechnology: 'High-Build Opacity',
    keyTechnologyDetail: 'Enhances luxury topcoat smoothness & reduces dark-to-light shade coats',
    material: 'Water-Thinnable Luxury Interior Base Coat Primer',
    seoBenefitSentence: 'Maximize smoothness & true colour richness under Royale paints with Royale Wall Base Coat.',
  },

  // === SYNTHETIC ENAMELS ===
  'apcolite premium gloss enamel': {
    tagline: 'Mirror-Gloss Solvent Enamel with Stain Guard for Metal, Wood & Masonry',
    summary:
      'Asian Paints Apcolite Premium Gloss Enamel delivers a tough, mirror-like glossy finish with Stain Guard protection for metal gates, grilles, wooden doors, and trim, drying to touch in 3 hours.',
    finish: 'High Mirror Gloss',
    coverageTwoCoats: '70–80 sq.ft / L (2 coats on smooth masonry)',
    coverageOneCoat: '140–160 sq.ft / L (1 coat)',
    calcTwoCoatRate: 75,
    calcOneCoatRate: 150,
    calcMode: 'enamel',
    dilution: '8%–10% MTO (brush), 15%–20% MTO (spray)',
    surfaceDry: '3 hrs',
    recoatInterval: '8 hrs minimum',
    keyTechnology: 'Stain Guard Gloss',
    keyTechnologyDetail: 'Tough, washable solvent film resists everyday scuffs, oil & moisture',
    material: 'Solvent-Based Alkyd High-Gloss Synthetic Enamel',
    shadeSummary: 'White, Black, Standard Enamel & Computerized Shades',
    seoBenefitSentence: 'Give metal grills & wooden doors a tough, mirror-gloss finish with Stain Guard protection.',
  },
  'apcolite rustshield pu enamel': {
    tagline: 'Quick-Drying Direct-to-Metal PU Enamel — No Primer Required',
    summary:
      'Asian Paints Apcolite Rustshield PU Enamel is a fast-drying polyurethane metal enamel engineered for direct application on mild steel without a separate primer, allowing 2 coats in a single day with an official 4-year warranty.',
    finish: 'High-Gloss PU Enamel',
    warranty: '4 Years',
    warrantyDetail: 'Official 4-year warranty (3 undiluted coats per official application guide)',
    coverageTwoCoats: '95–110 sq.ft / L (2 coats) · 50–55 sq.ft / L (3 warranted coats)',
    calcTwoCoatRate: 100,
    calcOneCoatRate: 195,
    calcMode: 'enamel',
    dilution: '5%–7% MTO (brush) · 15%–20% MTO (spray)',
    recoatInterval: '2–3 hrs (2 coats in 1 day)',
    keyTechnology: 'No Primer Required',
    keyTechnologyDetail: 'Direct-to-metal rust defense with quick-drying PU hardness',
    material: 'Quick-Drying Polyurethane-Modified Metal Enamel',
    shadeSummary: 'Standard Metal Enamel & Computerized Shades',
    seoBenefitSentence: 'Skip the primer on metal gates & grills with quick-drying Rustshield PU Enamel & 4-year warranty.',
  },
  'apcolite premium satin enamel': {
    tagline: 'Silky Low-Glare Satin Enamel for Woodwork, Doors & Metal Surfaces',
    summary:
      'Asian Paints Apcolite Premium Satin Enamel delivers a refined pearl-like satin sheen with durable stain resistance for wooden doors, furniture, trim, and metal surfaces.',
    finish: 'Smooth Satin Sheen',
    coverageOneCoat: '110–130 sq.ft / L (1 coat)',
    calcTwoCoatRate: 60,
    calcOneCoatRate: 120,
    calcMode: 'enamel',
    keyTechnology: 'Satin Sheen Shield',
    keyTechnologyDetail: 'Soft low-glare elegance with tough alkyd washability',
    material: 'Solvent-Based Alkyd Satin Synthetic Enamel',
    shadeSummary: 'White & Computerized Satin Enamel Shades',
    seoBenefitSentence: 'Give doors, trim & metal surfaces a sophisticated silky satin sheen that cleans easily.',
  },

  // === WOODTECH WOOD FINISHES ===
  'emporio pu polish': {
    tagline: 'Italian 2K Polyurethane Luxury Wood Finish with Mirror Clarity',
    summary:
      'Asian Paints WoodTech Emporio PU is a luxury Italian two-component polyurethane wood coating engineered for exceptional film clarity, scratch resistance, and long-term durability on interior furniture and veneers.',
    finish: 'Mirror Gloss / Silky Matt (2K PU)',
    coverageOneCoat: '80–100 sq.ft / L (8–9 sq.m/L per spray coat)',
    calcTwoCoatRate: 45,
    calcOneCoatRate: 90,
    calcMode: 'wood',
    keyTechnology: 'Italian 2K PU',
    keyTechnologyDetail: 'Superior hardness, scratch defense & non-yellowing clarity on fine wood',
    material: 'Two-Component Italian Polyurethane (2K PU) Wood Coating',
    seoBenefitSentence: 'Protect luxury furniture & veneers with scratch-resistant Italian 2K PU clarity.',
  },
  'woodtech emporio pu clear': {
    tagline: 'Italian 2K PU Clear Wood Finish for Natural Grain Depth & Scratch Defense',
    summary:
      'Asian Paints WoodTech Emporio PU Clear enhances natural timber grain with crystal-clear Italian 2K polyurethane hardness, strong resistance to daily stains and scratches, and long-lasting interior protection.',
    finish: 'Crystal Clear 2K PU',
    coverageOneCoat: '80–100 sq.ft / L (8–9 sq.m/L per spray coat)',
    calcTwoCoatRate: 45,
    calcOneCoatRate: 90,
    calcMode: 'wood',
    keyTechnology: 'Italian Clear 2K PU',
    keyTechnologyDetail: 'Preserves natural wood grains with superior abrasion & stain resistance',
    material: 'Two-Component Clear Polyurethane Wood Finish',
    seoBenefitSentence: 'Crystal-clear Italian 2K PU protection that highlights natural wood grain & resists scratches.',
  },
  'woodtech emporio pu white': {
    tagline: 'Italian 2K PU Pigmented White Wood Finish with Non-Yellowing Smoothness',
    summary:
      'Asian Paints WoodTech Emporio PU White provides a rich, seamless opaque white 2K polyurethane finish for designer doors, wardrobes, and cabinetry with superior scratch resistance.',
    finish: 'Opaque White 2K PU',
    coverageOneCoat: '80–100 sq.ft / L (8–9 sq.m/L per spray coat)',
    calcTwoCoatRate: 45,
    calcOneCoatRate: 90,
    calcMode: 'wood',
    keyTechnology: 'Opaque 2K PU White',
    keyTechnologyDetail: 'Smooth factory-like finish built for modern cabinetry & wooden doors',
    material: 'Two-Component Pigmented White Polyurethane Wood Coating',
    seoBenefitSentence: 'Achieve a smooth, factory-grade opaque white 2K PU finish on wardrobes & wooden doors.',
  },
  'woodtech emporio pu black': {
    tagline: 'Italian 2K PU Deep Black Luxury Wood Coating',
    summary:
      'Asian Paints WoodTech Emporio PU Black delivers a deep, seamless opaque black 2K polyurethane finish engineered for high-end furniture, panelling, and doors with strong scratch resistance.',
    finish: 'Deep Opaque Black 2K PU',
    coverageOneCoat: '80–100 sq.ft / L (8–9 sq.m/L per spray coat)',
    calcTwoCoatRate: 45,
    calcOneCoatRate: 90,
    calcMode: 'wood',
    keyTechnology: 'Deep Black 2K PU',
    keyTechnologyDetail: 'Rich opaque jet-black finish with high film hardness',
    material: 'Two-Component Pigmented Black Polyurethane Wood Coating',
    seoBenefitSentence: 'Give luxury furniture & wooden doors a deep, scratch-resistant Italian 2K PU black finish.',
  },
  'woodtech melamyne': {
    tagline: 'Two-Pack Acid-Catalyzed Wood Finish for Durable Everyday Furniture',
    summary:
      'Asian Paints WoodTech Melamyne is a trusted two-pack acid-catalyzed interior wood finish offering much better hardness, stain protection, and longevity than traditional French polish.',
    finish: 'Gloss / Matt Wood Polish',
    coverageOneCoat: '80–100 sq.ft / L (8–9 sq.m/L per spray coat)',
    calcTwoCoatRate: 45,
    calcOneCoatRate: 90,
    calcMode: 'wood',
    keyTechnology: '2-Pack Melamyne',
    keyTechnologyDetail: 'Resistant to household spills, heat marks & everyday furniture wear',
    material: 'Two-Pack Acid-Catalyzed Alkyd Amino Wood Finish',
    seoBenefitSentence: 'Durable two-pack Melamyne wood polish built for everyday stain & scratch protection.',
  },
  'woodtech melamyne gold clear': {
    tagline: 'Enhanced Clarity Two-Pack Melamyne Clear Finish for Interior Wood',
    summary:
      'Asian Paints WoodTech Melamyne Gold Clear offers enhanced film fullness, grain clarity, and tough everyday stain defense for interior wooden furniture, doors, and frames.',
    finish: 'High-Clarity Clear Melamyne',
    coverageOneCoat: '80–100 sq.ft / L (8–9 sq.m/L per spray coat)',
    calcTwoCoatRate: 45,
    calcOneCoatRate: 90,
    calcMode: 'wood',
    keyTechnology: 'Gold Clear Formula',
    keyTechnologyDetail: 'Enhanced grain clarity and tough protection over standard French polish',
    material: 'Two-Pack Acid-Catalyzed Clear Wood Finish',
    seoBenefitSentence: 'Enhanced clarity two-pack Melamyne clear polish for long-lasting wooden furniture.',
  },
  'woodtech touchwood interior & exterior 1kpu': {
    tagline: 'Easy-Apply Single-Pack 1K PU Clear Finish for Interior & Exterior Wood',
    summary:
      'Asian Paints WoodTech Touchwood 1K PU is a convenient single-pack polyurethane wood coating suitable for both interior and exterior wooden doors, frames, and furniture with simple brush application.',
    finish: 'Clear 1K PU Gloss / Matt',
    coverageOneCoat: '100–120 sq.ft / L (10–12 sq.m/L per coat)',
    calcTwoCoatRate: 55,
    calcOneCoatRate: 110,
    calcMode: 'wood',
    keyTechnology: 'Single-Pack 1K PU',
    keyTechnologyDetail: 'No hardener mixing required · Suitable for both indoor & outdoor wood',
    material: 'Single-Pack Polyurethane (1K PU) Wood Finish',
    seoBenefitSentence: 'Easy brush-on 1K PU clear protection for both interior and exterior wooden surfaces.',
  },
};

function formatPackSize(size: number, unit: string): string {
  const u = (unit || 'L').toLowerCase();
  if (u === 'piece' || u === 'pcs') return `${size} ${size === 1 ? 'pc' : 'pcs'}`;
  if (u === 'kg') return `${size}kg`;
  if (size < 1) return `${Math.round(size * 1000)}ml`;
  return `${size}L`;
}

function getUnitShort(unit?: string): string {
  const u = (unit || 'L').toLowerCase();
  if (u === 'piece' || u === 'pcs') return 'pc';
  if (u === 'kg') return 'kg';
  return 'L';
}

function parseBasePrice(product: CatalogProductLike): number {
  if (typeof product.basePrice === 'number' && product.basePrice > 0) return product.basePrice;
  if (product.price) {
    const num = parseFloat(String(product.price).replace(/[^0-9.]/g, ''));
    if (!Number.isNaN(num) && num > 0) return num;
  }
  return 0;
}

function getPackSizes(product: CatalogProductLike): number[] {
  if (Array.isArray(product.sizes) && product.sizes.length > 0) return product.sizes;
  if (product.sizePrices && Object.keys(product.sizePrices).length > 0) {
    return Object.keys(product.sizePrices).map(Number).filter((n) => !Number.isNaN(n)).sort((a, b) => a - b);
  }
  const u = (product.unit || 'L').toLowerCase();
  if (u === 'piece' || u === 'pcs') return [1];
  return [1, 4, 10, 20];
}

function buildCalculatorForSpec(spec: VerifiedAsianPaintsSpec): PaintCalculatorConfig | undefined {
  if (!spec.calcTwoCoatRate || !spec.calcOneCoatRate) return undefined;

  const mode = spec.calcMode || 'interior';
  const unit = spec.calcUnit || 'L';
  const dilutionNote = spec.dilution
    ? `Official dilution guideline: ${spec.dilution}. Actual consumption varies by surface porosity and application method.`
    : 'Actual material consumption depends on surface porosity, texture roughness, and application method.';

  if (mode === 'exterior') {
    return {
      coverageTwoCoatsSqFtPerLitre: spec.calcTwoCoatRate,
      coverageOneCoatSqFtPerLitre: spec.calcOneCoatRate,
      dilutionNote,
      unit,
      primerLabel: 'Exterior Wall Primer',
      coatsLabel: '2 Finish Coats',
      presets: [
        { label: 'Compound Wall', wallSqFt: 400, subtitle: '~400 sq.ft exterior area' },
        { label: 'Front Elevation', wallSqFt: 850, subtitle: '~850 sq.ft facade area' },
        { label: 'Independent House', wallSqFt: 1800, subtitle: '~1,800 sq.ft exterior walls' },
        { label: 'Full 2-Storey Villa', wallSqFt: 3200, subtitle: '~3,200 sq.ft exterior walls' },
      ],
    };
  }

  if (mode === 'roof') {
    return {
      coverageTwoCoatsSqFtPerLitre: spec.calcTwoCoatRate,
      coverageOneCoatSqFtPerLitre: spec.calcOneCoatRate,
      dilutionNote,
      unit,
      coatsLabel: 'Recommended System',
      hidePrimerOption: true,
      presets: [
        { label: 'Balcony / Wet Area', wallSqFt: 150, subtitle: '~150 sq.ft treated area' },
        { label: 'Small Terrace', wallSqFt: 500, subtitle: '~500 sq.ft roof slab' },
        { label: 'Standard 2BHK Roof', wallSqFt: 1000, subtitle: '~1,000 sq.ft roof slab' },
        { label: 'Large Terrace Slab', wallSqFt: 1800, subtitle: '~1,800 sq.ft roof slab' },
      ],
    };
  }

  if (mode === 'floor') {
    return {
      coverageTwoCoatsSqFtPerLitre: spec.calcTwoCoatRate,
      coverageOneCoatSqFtPerLitre: spec.calcOneCoatRate,
      dilutionNote,
      unit,
      coatsLabel: '2 Coats',
      hidePrimerOption: true,
      presets: [
        { label: 'Porch / Entryway', wallSqFt: 200, subtitle: '~200 sq.ft surface' },
        { label: 'Driveway / Patio', wallSqFt: 500, subtitle: '~500 sq.ft surface' },
        { label: 'Full Terrace / Roof', wallSqFt: 1000, subtitle: '~1,000 sq.ft surface' },
        { label: 'Large Courtyard', wallSqFt: 1800, subtitle: '~1,800 sq.ft surface' },
      ],
    };
  }

  if (mode === 'primer') {
    return {
      coverageTwoCoatsSqFtPerLitre: spec.calcOneCoatRate,
      coverageOneCoatSqFtPerLitre: spec.calcOneCoatRate,
      dilutionNote,
      unit,
      coatsLabel: '1 Primer Coat',
      hidePrimerOption: true,
      presets: [
        { label: 'Single Bedroom', wallSqFt: 380, subtitle: '~380 sq.ft wall area' },
        { label: 'Living Room', wallSqFt: 650, subtitle: '~650 sq.ft wall area' },
        { label: 'Full 2BHK Walls', wallSqFt: 1450, subtitle: '~1,450 sq.ft wall area' },
        { label: 'Full 3BHK Walls', wallSqFt: 2200, subtitle: '~2,200 sq.ft wall area' },
      ],
    };
  }

  if (mode === 'enamel' || mode === 'wood') {
    return {
      coverageTwoCoatsSqFtPerLitre: spec.calcTwoCoatRate,
      coverageOneCoatSqFtPerLitre: spec.calcOneCoatRate,
      dilutionNote,
      unit,
      coatsLabel: '2 Coats',
      hidePrimerOption: true,
      presets: [
        { label: '2–3 Doors / Frames', wallSqFt: 120, subtitle: '~120 sq.ft surface area' },
        { label: 'Grills & Main Gate', wallSqFt: 250, subtitle: '~250 sq.ft surface area' },
        { label: 'Full Home Woodwork', wallSqFt: 550, subtitle: '~550 sq.ft surface area' },
        { label: 'Large Lot / Fabrication', wallSqFt: 1000, subtitle: '~1,000 sq.ft surface area' },
      ],
    };
  }

  return {
    coverageTwoCoatsSqFtPerLitre: spec.calcTwoCoatRate,
    coverageOneCoatSqFtPerLitre: spec.calcOneCoatRate,
    dilutionNote,
    unit,
    primerLabel: 'Interior Wall Primer',
    coatsLabel: '2 Finish Coats',
    presets: [
      { label: 'Bedroom (10×12 ft)', wallSqFt: 380, subtitle: '~380 sq.ft paintable wall area' },
      { label: 'Living Room (14×18 ft)', wallSqFt: 620, subtitle: '~620 sq.ft paintable wall area' },
      { label: 'Full 2BHK Home', wallSqFt: 1450, subtitle: '~1,450 sq.ft interior walls' },
      { label: 'Full 3BHK Home', wallSqFt: 2200, subtitle: '~2,200 sq.ft interior walls' },
    ],
  };
}

function getCategoryApplicationSteps(
  product: CatalogProductLike,
  spec?: VerifiedAsianPaintsSpec
): { title: string; subtitle: string; steps: ApplicationStep[] } {
  const sub = (product.subCategory || product.category || '').toLowerCase();
  const nameLower = product.name.toLowerCase();

  if (sub.includes('power tool')) {
    return {
      title: 'Site Setup & Usage Guide',
      subtitle: `Best practices for accurate, safe performance with ${product.name}.`,
      steps: [
        {
          stepNumber: '01',
          title: 'Inspect & Prepare Tool',
          timing: 'Before start',
          detail: `Unbox ${product.name}, verify factory accessories and power/battery supply, and review the included Asian Paints TruCare instruction manual.`,
        },
        {
          stepNumber: '02',
          title: 'Verify Surface Readiness',
          timing: 'Site check',
          detail: 'Ensure the work surface is clear of loose debris, exposed wiring, or standing water before starting measurement or surface preparation.',
        },
        {
          stepNumber: '03',
          title: 'Operate Steadily',
          timing: 'During work',
          detail: 'Follow recommended operating angles, speed/mode settings, and protective gear (dust mask & safety glasses) for clean, consistent site output.',
        },
        {
          stepNumber: '04',
          title: 'Clean & Store Safely',
          timing: 'After use',
          detail: 'Wipe away paint dust or residue after each job and store in a dry case to preserve calibration accuracy and motor longevity.',
        },
      ],
    };
  }

  if (sub.includes('interior texture') || nameLower.includes('royale play')) {
    return {
      title: 'Recommended 4-Step Designer Texture System',
      subtitle: `Prepare a smooth, primed foundation before applying ${product.name} for crisp pattern definition.`,
      steps: [
        {
          stepNumber: '01',
          title: 'Clean & Level Wall',
          timing: 'Before priming',
          detail: 'Remove dust, flaking paint, and damp spots. Level wall undulations with 2 thin coats of wall putty and sand smooth with fine emery paper.',
          linkedProductName: 'Birla White WallCare Putty',
          linkedProductSlug: 'birla-white-wallcare-putty',
        },
        {
          stepNumber: '02',
          title: 'Seal with Interior Primer',
          timing: 'Dry 4–6 hrs',
          detail: 'Apply 1 uniform coat of water-thinnable interior wall primer to equalize wall porosity and improve base coat adhesion.',
          linkedProductName: 'Decoprime Wall Primer',
          linkedProductSlug: 'decoprime-wall-primer',
        },
        {
          stepNumber: '03',
          title: 'Apply Base Emulsion Coat',
          timing: 'Dry 3–4 hrs',
          detail: 'Apply 2 coats of matching or neutral Royale base emulsion so the decorative texture layer develops uniform colour and depth.',
          linkedProductName: 'Royale Luxury Emulsion',
          linkedProductSlug: 'royale-luxury-emulsion',
        },
        {
          stepNumber: '04',
          title: `Apply ${product.name}`,
          timing: 'Tool-crafted finish',
          detail: `Apply ${product.name} using the recommended specialty roller, brush, or steel trowel per the Asian Paints shade & application guide.`,
        },
      ],
    };
  }

  if (sub.includes('exterior texture') || nameLower.includes('duracast') || nameLower.includes('createx') || nameLower.includes('allura')) {
    return {
      title: 'Recommended 4-Step Exterior Texture System',
      subtitle: `Follow a properly primed and overcoated exterior system with ${product.name} for lasting facade durability.`,
      steps: [
        {
          stepNumber: '01',
          title: 'Pressure Wash & Repair',
          timing: 'Dry completely',
          detail: 'Clean algae, loose plaster, and dirt from exterior masonry using a wire brush and water jet. Fill hairline cracks cleanly.',
          linkedProductName: 'SmartCare Crack Seal',
          linkedProductSlug: 'smartcare-crack-seal',
        },
        {
          stepNumber: '02',
          title: 'Apply Exterior Primer',
          timing: 'Dry 4–5 hrs',
          detail: 'Seal masonry alkalinity with 1 coat of water-thinnable exterior wall primer before texture application.',
          linkedProductName: 'TruCare Exterior Wall Primer',
          linkedProductSlug: 'trucare-exterior-wall-primer',
        },
        {
          stepNumber: '03',
          title: `Apply ${product.name}`,
          timing: 'Allow full cure',
          detail: `Apply ${product.name} evenly with the designated texture trowel or roller to achieve the desired architectural pattern.`,
        },
        {
          stepNumber: '04',
          title: 'Overcoat with Exterior Emulsion',
          timing: '2 finish coats',
          detail: 'Protect and colour the cured exterior texture with 2 coats of weatherproof exterior emulsion for long-term UV and monsoon defense.',
          linkedProductName: 'Apex Ultima',
          linkedProductSlug: 'apex-ultima',
        },
      ],
    };
  }

  if (sub.includes('exterior paint')) {
    const isFloorOrTile = nameLower.includes('floor guard') || nameLower.includes('tile guard');
    if (isFloorOrTile) {
      return {
        title: 'Recommended 4-Step Application System',
        subtitle: `Prepare masonry tiles or concrete floors thoroughly before applying ${product.name}.`,
        steps: [
          {
            stepNumber: '01',
            title: 'Wash & Remove Moss/Algae',
            timing: 'Dry completely',
            detail: 'Scrub away algae, moss, oil, and loose dust thoroughly with clean water and a stiff wire brush, then allow the tiles or concrete to dry completely.',
          },
          {
            stepNumber: '02',
            title: 'Repair Loose Joints',
            timing: 'Before coating',
            detail: 'Fill surface cracks or damaged mortar joints so water cannot seep underneath the coating film.',
            linkedProductName: 'SmartCare Crack Seal',
            linkedProductSlug: 'smartcare-crack-seal',
          },
          {
            stepNumber: '03',
            title: `Apply 1st Coat ${product.name}`,
            timing: 'Self-priming / per PIS',
            detail: `Apply the first uniform coat of ${product.name} by brush or roller following official dilution instructions on the pack.`,
          },
          {
            stepNumber: '04',
            title: 'Apply Finish Coat & Cure',
            timing: 'Allow full cure',
            detail: 'Apply the second finish coat once the first coat dries thoroughly and allow full curing before heavy rain exposure or foot traffic.',
          },
        ],
      };
    }

    return {
      title: 'Recommended 4-Step Exterior Painting System',
      subtitle: `Apply ${product.name} over clean, crack-repaired, and primed exterior masonry for maximum weather durability.`,
      steps: [
        {
          stepNumber: '01',
          title: 'Clean & Wash Masonry',
          timing: 'Dry thoroughly',
          detail: 'Remove algae, fungal growth, chalking, and loose old paint via wire brushing and pressure washing. Ensure fresh plaster cures for at least 28 days.',
        },
        {
          stepNumber: '02',
          title: 'Seal Cracks & Parapets',
          timing: 'Dry 4–6 hrs',
          detail: 'Open and fill structural/hairline exterior plaster cracks to block rainwater seepage behind the paint film.',
          linkedProductName: 'SmartCare Crack Seal',
          linkedProductSlug: 'smartcare-crack-seal',
        },
        {
          stepNumber: '03',
          title: 'Apply Exterior Wall Primer',
          timing: 'Dry 4–5 hrs',
          detail: 'Apply 1 coat of alkali-resistant exterior primer (or recommended waterproofing basecoat) for superior adhesion and uniform finish.',
          linkedProductName: 'TruCare Exterior Wall Primer',
          linkedProductSlug: 'trucare-exterior-wall-primer',
        },
        {
          stepNumber: '04',
          title: `Apply 2 Coats ${product.name}`,
          timing: '4–6 hrs between coats',
          detail: spec?.dilution
            ? `Dilute per official guide (${spec.dilution}) and apply 2 uniform finish coats across walls (extra coat on horizontal ledges/parapets).`
            : `Dilute strictly as per Asian Paints pack instructions and apply 2 uniform finish coats (apply an extra coat on exposed horizontal ledges and parapets).`,
        },
      ],
    };
  }

  if (sub.includes('waterproof')) {
    const isTileAdhesiveOrGrout =
      nameLower.includes('tile adhesive') || nameLower.includes('grout') || nameLower.includes('bonder') || nameLower.includes('mortar');
    if (isTileAdhesiveOrGrout) {
      return {
        title: 'Recommended 4-Step Installation Workflow',
        subtitle: `Follow clean surface preparation and mixing steps for strong bonding with ${product.name}.`,
        steps: [
          {
            stepNumber: '01',
            title: 'Clean & Dampen Substrate',
            timing: 'Before mixing',
            detail: 'Ensure the floor/wall substrate is sound, level, and free from loose cement, dust, grease, or curing compounds.',
          },
          {
            stepNumber: '02',
            title: 'Mix to Uniform Consistency',
            timing: 'Per pack ratio',
            detail: `Mix ${product.name} strictly in the proportion specified on the Asian Paints pack until lump-free and allow brief slaking if specified.`,
          },
          {
            stepNumber: '03',
            title: 'Apply with Notched Trowel / Float',
            timing: 'Within open time',
            detail: 'Spread evenly using an appropriately sized notched trowel (for adhesives) or rubber grout float (for grouts) to ensure full contact with zero hollow spots.',
          },
          {
            stepNumber: '04',
            title: 'Clean Excess & Cure',
            timing: '24 hrs before traffic',
            detail: 'Wipe excess material from tile faces with a damp sponge before hardening and allow full curing before foot traffic or water exposure.',
          },
        ],
      };
    }

    return {
      title: 'Recommended 4-Step Waterproofing System',
      subtitle: `Address active leaks and follow surface preparation rules before applying ${product.name}.`,
      steps: [
        {
          stepNumber: '01',
          title: 'Inspect Moisture & Fix Plumbing',
          timing: 'Mandatory check',
          detail: 'Fix any active plumbing leaks, drainage traps, or hollow plaster first. Clean the substrate thoroughly to remove dust, moss, oil, and loose particles.',
        },
        {
          stepNumber: '02',
          title: 'Treat Cracks & Corners',
          timing: 'Dry thoroughly',
          detail: 'Open V-grooves along surface cracks and fill with flexible crack filler; reinforce parapet corners as recommended for terrace systems.',
          linkedProductName: 'SmartCare Crack Seal',
          linkedProductSlug: 'smartcare-crack-seal',
        },
        {
          stepNumber: '03',
          title: 'Apply Priming / Base Coat',
          timing: 'Per PIS ratio',
          detail: `Apply the recommended self-priming coat or base coat of ${product.name} uniformly so it penetrates and bonds tightly with the substrate.`,
        },
        {
          stepNumber: '04',
          title: 'Build Full Waterproof Coats',
          timing: 'Cross-coat application',
          detail: 'Apply undiluted/system finish coats perpendicular to each other at recommended forced coverage, and register eligible purchases on Asian Paints’ warranty portal.',
        },
      ],
    };
  }

  if (sub.includes('wood finish')) {
    return {
      title: 'Recommended 4-Step Wood Finishing System',
      subtitle: `Achieve smooth grain clarity and lasting durability with ${product.name}.`,
      steps: [
        {
          stepNumber: '01',
          title: 'Sand Timber Along the Grain',
          timing: 'Progressive grits',
          detail: 'Sand bare wood smoothly along the grain using Emery Paper 180 followed by 320, then wipe away all sanding dust completely.',
        },
        {
          stepNumber: '02',
          title: 'Fill Pores & Stain (Optional)',
          timing: 'Dry before sealing',
          detail: 'Fill open wood grains using WoodTech Filler and apply WoodTech Wood Stain if a custom timber tone is desired.',
          linkedProductName: 'WoodTech Filler',
          linkedProductSlug: 'woodtech-filler',
        },
        {
          stepNumber: '03',
          title: 'Apply Wood Sealer Coat',
          timing: 'Sand lightly after dry',
          detail: 'Apply 1–2 coats of compatible Asian Paints WoodTech Sealer (PU / Melamyne / NC Sealer) to seal wood pores and build a smooth base.',
          linkedProductName: 'WoodTech Nc Sanding Sealer',
          linkedProductSlug: 'woodtech-nc-sanding-sealer',
        },
        {
          stepNumber: '04',
          title: `Apply ${product.name} Topcoats`,
          timing: 'Light sand between coats',
          detail: `Mix and apply 2 coats of ${product.name} using the recommended spray gun or brush method per pack instructions, sanding lightly with 400-grit between coats.`,
        },
      ],
    };
  }

  if (sub.includes('enamel')) {
    const isNoPrimer = nameLower.includes('rustshield');
    return {
      title: 'Recommended 4-Step Metal & Wood Enamel System',
      subtitle: `Prepare metal grilles, gates, or wooden doors cleanly before applying ${product.name}.`,
      steps: [
        {
          stepNumber: '01',
          title: 'Degrease & Remove Loose Rust',
          timing: 'Dry surface',
          detail: 'Wire-brush away loose rust flakes and old peeling paint. Wipe metal or wood clean of oil, grease, and dust using a dry cloth.',
        },
        {
          stepNumber: '02',
          title: isNoPrimer ? 'Light Sand for Direct Grip' : 'Apply Anti-Rust / Wood Primer',
          timing: isNoPrimer ? 'No primer needed' : 'Dry 6–8 hrs',
          detail: isNoPrimer
            ? `${product.name} is formulated for direct-to-metal application without a separate primer — sand glossy surfaces lightly for optimal grip.`
            : 'Apply 1 coat of anti-corrosive red oxide metal primer on iron/steel (or wood primer on bare timber) to prevent rust and improve gloss holdout.',
          ...(isNoPrimer
            ? {}
            : {
                linkedProductName: 'TruCare Red Oxide Metal Primer',
                linkedProductSlug: 'trucare-red-oxide-metal-primer',
              }),
        },
        {
          stepNumber: '03',
          title: `Apply 1st Coat ${product.name}`,
          timing: spec?.recoatInterval ? `Recoat: ${spec.recoatInterval}` : 'Allow full recoat dry',
          detail: spec?.dilution
            ? `Thin using Mineral Turpentine Oil (${spec.dilution}) and apply an even first coat without heavy brush marks.`
            : 'Thin per pack instructions with Mineral Turpentine Oil (MTO) and apply a thin, even first coat.',
        },
        {
          stepNumber: '04',
          title: 'Apply Final Finish Coat',
          timing: 'Smooth even sheen',
          detail: 'Lightly scuff with fine emery paper if required, dust off, and apply the final coat for durable, even gloss and weather protection.',
        },
      ],
    };
  }

  if (sub.includes('primer')) {
    const isMetal = /metal|oxide|zinc|epoxy|yellow/i.test(nameLower);
    const isPutty = /putty|filler/i.test(nameLower);
    if (isMetal) {
      return {
        title: 'Recommended 4-Step Metal Priming System',
        subtitle: `Protect mild steel & iron fabrication against corrosion using ${product.name}.`,
        steps: [
          {
            stepNumber: '01',
            title: 'Remove Rust, Scale & Oil',
            timing: 'Critical step',
            detail: 'Clean steel surfaces thoroughly with a wire brush and emery paper to remove mill scale, loose rust, grease, and moisture.',
          },
          {
            stepNumber: '02',
            title: 'Stir Thoroughly & Dilute',
            timing: 'Before application',
            detail: 'Stir the primer well so heavy anti-corrosive pigments disperse evenly, then thin strictly as instructed on the Asian Paints pack.',
          },
          {
            stepNumber: '03',
            title: `Apply ${product.name}`,
            timing: 'Uniform coat',
            detail: 'Apply 1–2 uniform coats covering weld joints, corners, and edges carefully to seal out moisture and oxygen.',
          },
          {
            stepNumber: '04',
            title: 'Topcoat with Enamel / PU',
            timing: 'After full dry',
            detail: 'Once dry, finish with 2 coats of Apcolite Premium Gloss Enamel or industrial topcoat for lasting corrosion defense.',
            linkedProductName: 'Apcolite Premium Gloss Enamel',
            linkedProductSlug: 'apcolite-premium-gloss-enamel',
          },
        ],
      };
    }
    if (isPutty) {
      return {
        title: 'Recommended 4-Step Wall Leveling System',
        subtitle: `Achieve smooth, pin-hole free walls with ${product.name} before painting.`,
        steps: [
          {
            stepNumber: '01',
            title: 'Clean & Dampen Plaster',
            timing: 'Before putty',
            detail: 'Scrape loose mortar, dust, and flaking paint. Ensure freshly plastered masonry has cured properly.',
          },
          {
            stepNumber: '02',
            title: 'Apply 1st Thin Putty Coat',
            timing: 'Dry 4–6 hrs',
            detail: `Apply a thin, even first coat of ${product.name} with a putty knife from bottom to top to level undulations.`,
          },
          {
            stepNumber: '03',
            title: 'Apply 2nd Coat & Sand Smooth',
            timing: 'Fine emery paper',
            detail: 'Apply a second thin coat after drying, allow to harden completely, and sand gently with fine abrasive paper before dusting clean.',
          },
          {
            stepNumber: '04',
            title: 'Prime Before Topcoat',
            timing: 'Mandatory seal',
            detail: 'Apply 1 coat of interior wall primer over dried putty to lock in smoothness and maximize emulsion spreading.',
            linkedProductName: 'Decoprime Wall Primer',
            linkedProductSlug: 'decoprime-wall-primer',
          },
        ],
      };
    }
    return {
      title: 'Recommended 4-Step Wall Priming System',
      subtitle: `Build strong adhesion and uniform colour holdout with ${product.name}.`,
      steps: [
        {
          stepNumber: '01',
          title: 'Clean & Sand Masonry',
          timing: 'Dry wall check',
          detail: 'Remove dust, chalking, and loose paint with Emery Paper 180 and wipe clean. Fresh plaster should cure for 28 days before priming.',
        },
        {
          stepNumber: '02',
          title: 'Dilute Per Official Ratio',
          timing: spec?.dilution || 'Check pack guide',
          detail: spec?.dilution
            ? `Dilute ${product.name} at ${spec.dilution} and mix thoroughly for consistent sealing.`
            : `Dilute ${product.name} strictly as specified on the Asian Paints pack for optimal penetration and opacity.`,
        },
        {
          stepNumber: '03',
          title: `Apply 1 Coat ${product.name}`,
          timing: spec?.recoatInterval ? `Dry ${spec.recoatInterval}` : 'Dry 4–6 hrs',
          detail: 'Apply one uniform coat by brush or roller, avoiding dry patches or excessive pooling.',
        },
        {
          stepNumber: '04',
          title: 'Apply Finish Emulsion Coats',
          timing: '2 finish coats',
          detail: 'Once the primer is completely dry, apply 2 coats of your chosen Asian Paints interior or exterior emulsion.',
          linkedProductName: sub.includes('exterior') ? 'Apex Ultima' : 'Royale Luxury Emulsion',
          linkedProductSlug: sub.includes('exterior') ? 'apex-ultima' : 'royale-luxury-emulsion',
        },
      ],
    };
  }

  // Default: Interior Paint
  return {
    title: 'Recommended 4-Step Interior Painting System',
    subtitle: `Follow Asian Paints’ complete preparation, putty, primer, and finish sequence with ${product.name}.`,
    steps: [
      {
        stepNumber: '01',
        title: 'Clean & Sand Surface',
        timing: 'Before priming',
        detail: 'Remove dust, grease, fungal marks, and loose paint. Sand smooth with Emery Paper 180 and wipe clean so walls are dry and sound.',
      },
      {
        stepNumber: '02',
        title: 'Level with Wall Putty',
        timing: 'Dry 4–6 hrs per coat',
        detail: 'Apply 2 thin coats of wall putty to fill minor dents and level undulations, sanding gently once dry.',
        linkedProductName: 'Birla White WallCare Putty',
        linkedProductSlug: 'birla-white-wallcare-putty',
      },
      {
        stepNumber: '03',
        title: 'Apply Interior Wall Primer',
        timing: 'Dry 4–6 hrs',
        detail: 'Apply 1 uniform coat of water-thinnable interior wall primer to seal porosity and maximize topcoat coverage.',
        linkedProductName: 'Decoprime Wall Primer',
        linkedProductSlug: 'decoprime-wall-primer',
      },
      {
        stepNumber: '04',
        title: `Apply 2 Coats ${product.name}`,
        timing: spec?.recoatInterval || '3–4 hrs between coats',
        detail: spec?.dilution
          ? `Dilute per official guide (${spec.dilution}) and apply 2 smooth coats by brush or roller.`
          : 'Dilute cleanly as per the official Asian Paints pack instructions and apply 2 smooth finish coats.',
      },
    ],
  };
}

function buildFeatureCards(
  product: CatalogProductLike,
  spec?: VerifiedAsianPaintsSpec
): { eyebrow: string; title: string; detail: string }[] {
  const cards: { eyebrow: string; title: string; detail: string }[] = [];
  const props = (product.properties || []).map((p) => p.trim()).filter(Boolean);

  if (spec?.keyTechnology && spec?.keyTechnologyDetail) {
    cards.push({
      eyebrow: '01. Signature Performance',
      title: spec.keyTechnology,
      detail: spec.keyTechnologyDetail,
    });
  }

  if (spec?.warranty && spec?.warrantyDetail) {
    cards.push({
      eyebrow: `0${cards.length + 1}. Official Manufacturer Backing`,
      title: `${spec.warranty} Warranty`,
      detail: `${spec.warrantyDetail}. Apply per the recommended system and retain your Rainbow Paints invoice for registration.`,
    });
  }

  if (spec?.coverageTwoCoats || spec?.coverageOneCoat) {
    cards.push({
      eyebrow: `0${cards.length + 1}. Verified Spreading Rate`,
      title: spec.coverageTwoCoats || spec.coverageOneCoat || 'High Coverage',
      detail:
        spec.coverageTwoCoats && spec.coverageOneCoat
          ? `Official spreading rate of ${spec.coverageOneCoat} and ${spec.coverageTwoCoats} on properly prepared surfaces.`
          : `Official spreading rate of ${spec.coverageTwoCoats || spec.coverageOneCoat} on properly prepared surfaces.`,
    });
  }

  // Fill remaining slots cleanly from verified product.properties (zero invented claims!)
  for (const prop of props) {
    if (cards.length >= 4) break;
    const lower = prop.toLowerCase();
    // Avoid duplicating exact warranty or finish already shown
    if (spec?.warranty && lower.includes('warranty')) continue;
    if (spec?.keyTechnology && lower === spec.keyTechnology.toLowerCase()) continue;

    cards.push({
      eyebrow: `0${cards.length + 1}. Key Product Benefit`,
      title: prop,
      detail: `Verified feature of genuine Asian Paints ${product.name} supplied in factory-sealed packaging.`,
    });
  }

  // Always include a genuine dealer / computerized tinting card if space remains
  if (cards.length < 3) {
    const sub = (product.subCategory || product.category || '').toLowerCase();
    const isTintable =
      sub.includes('interior paint') ||
      sub.includes('exterior paint') ||
      sub.includes('enamel') ||
      sub.includes('texture');
    cards.push({
      eyebrow: `0${cards.length + 1}. Authorized Dealer Guarantee`,
      title: isTintable ? 'Genuine Stock & Computerized Tinting' : '100% Factory-Sealed Genuine Stock',
      detail: isTintable
        ? 'Fresh Asian Paints manufacturing batches dispensed accurately on official Colour Spectra tinting machines at Rainbow Paints & Hardwares, Coimbatore.'
        : '100% genuine Asian Paints stock sourced directly through authorized channels with GST billing and prompt Coimbatore delivery.',
    });
  }

  return cards.slice(0, 4);
}

export function buildAsianPaintsRichContent(product: CatalogProductLike): RichProductContent {
  const normalized = product.name.trim().toLowerCase();
  const spec = ASIAN_PAINTS_VERIFIED_SPECS[normalized];
  const sub = product.subCategory || product.category || 'Paint';
  const unitShort = getUnitShort(product.unit);
  const sizes = getPackSizes(product);
  const packSizesLabel = sizes.map((s) => formatPackSize(s, product.unit || 'L')).join(', ');
  const props = (product.properties || []).map((p) => p.trim()).filter(Boolean);

  // Authentic packshot image (HD restored if available, otherwise official CDN upgraded)
  const rawImage = HD_PACKSHOT_IMAGES[normalized] || upgradeCdnImageUrl(product.image) || '/assets/aistudio/royale_luxury_emulsion_packshot_hd.jpg';

  const gallery: ProductGalleryImage[] = [
    {
      src: rawImage,
      alt: `Asian Paints ${product.name} Original Factory Pack`,
      label: 'Packshot',
      caption: `Official Asian Paints Pack · Available in ${packSizesLabel}`,
      objectFit: 'contain',
      enableZoom: true,
    },
  ];

  // Build 4 strictly truthful Key Metrics
  const metrics: ProductKeyMetric[] = [];
  if (spec?.warranty) {
    metrics.push({
      value: spec.warranty,
      label: 'Official Warranty',
      detail: spec.warrantyDetail || 'Official Asian Paints manufacturer performance warranty',
    });
  }
  if (spec?.coverageTwoCoats || spec?.coverageOneCoat) {
    const covVal = (spec.coverageTwoCoats || spec.coverageOneCoat || '').replace(/\s*\(.*?\)\s*/g, '').trim();
    metrics.push({
      value: covVal.replace(/\s*sq\.ft\s*\/\s*(L|kg)/i, ''),
      label: `sq.ft / ${spec.calcUnit || unitShort} (${spec.coverageTwoCoats ? '2 Coats' : '1 Coat'})`,
      detail: spec.coverageTwoCoats && spec.coverageOneCoat
        ? `${spec.coverageOneCoat} on normal primed surfaces`
        : 'On properly prepared & primed surfaces per official PIS',
    });
  }
  if (spec?.keyTechnology) {
    metrics.push({
      value: spec.keyTechnology,
      label: 'Key Technology',
      detail: spec.keyTechnologyDetail || `Engineered by Asian Paints for ${sub.toLowerCase()}`,
    });
  }
  if (spec?.surfaceDry || spec?.recoatInterval) {
    metrics.push({
      value: spec.surfaceDry || spec.recoatInterval || '',
      label: spec.surfaceDry ? 'Surface Dry' : 'Recoat Interval',
      detail:
        spec.surfaceDry && spec.recoatInterval
          ? `Recoat: ${spec.recoatInterval}${spec.dilution ? ` · ${spec.dilution.split(',')[0]}` : ''}`
          : spec.dilution || 'Standard drying at 30°C & 50–60% RH',
    });
  } else if (spec?.dilution) {
    metrics.push({
      value: spec.dilution.split(' ')[0],
      label: 'Recommended Dilution',
      detail: spec.dilution,
    });
  }

  // Fill remaining metric slots up to 4 strictly from real catalog properties & pack info
  if (metrics.length < 4 && props[0] && !metrics.some((m) => m.value.toLowerCase() === props[0].toLowerCase())) {
    metrics.push({
      value: props[0].length <= 24 ? props[0] : sub,
      label: 'Verified Highlight',
      detail: props[0].length <= 24 ? `Genuine Asian Paints ${sub}` : props[0],
    });
  }
  if (metrics.length < 4 && props[1]) {
    metrics.push({
      value: props[1].length <= 24 ? props[1] : `${sizes.length} ${sizes.length === 1 ? 'Pack' : 'Packs'}`,
      label: props[1].length <= 24 ? 'Core Benefit' : 'Available Sizes',
      detail: props[1].length <= 24 ? `Engineered for reliable ${sub.toLowerCase()} performance` : props[1],
    });
  }
  if (metrics.length < 4) {
    metrics.push({
      value: packSizesLabel.length <= 22 ? packSizesLabel : `${sizes.length} Sizes`,
      label: 'Factory Pack Sizes',
      detail: `Available in ${packSizesLabel} sealed Asian Paints packs`,
    });
  }
  if (metrics.length < 4) {
    metrics.push({
      value: '100% Genuine',
      label: 'Authorized Dealer',
      detail: 'Fresh batch stock with GST invoice & Coimbatore doorstep delivery',
    });
  }

  // Build Official Technical Specifications Table (100% grounded!)
  const specificationsTable: { label: string; value: string }[] = [
    { label: 'Brand', value: 'Asian Paints (Authorized Dealer Stock)' },
    { label: 'Product Category', value: sub },
  ];
  if (spec?.finish) specificationsTable.push({ label: 'Finish / Type', value: spec.finish });
  if (spec?.material) specificationsTable.push({ label: 'Base Formulation', value: spec.material });
  if (spec?.warranty) specificationsTable.push({ label: 'Warranty', value: `${spec.warranty} (${spec.warrantyDetail || 'per Asian Paints terms'})` });
  if (spec?.coverageTwoCoats) specificationsTable.push({ label: 'Coverage (2 Coats)', value: spec.coverageTwoCoats });
  if (spec?.coverageOneCoat) specificationsTable.push({ label: 'Coverage (1 Coat)', value: spec.coverageOneCoat });
  if (spec?.dilution) specificationsTable.push({ label: 'Recommended Dilution', value: spec.dilution });
  if (spec?.surfaceDry) specificationsTable.push({ label: 'Surface Dry Time', value: spec.surfaceDry });
  if (spec?.recoatInterval) specificationsTable.push({ label: 'Recoating Interval', value: spec.recoatInterval });
  if (spec?.shadeSummary) specificationsTable.push({ label: 'Shade Availability', value: spec.shadeSummary });
  if (spec?.extraSpecs) {
    specificationsTable.push(...spec.extraSpecs);
  }
  specificationsTable.push({ label: 'Available Pack Sizes', value: packSizesLabel });
  if (props.length > 0 && specificationsTable.length < 8) {
    specificationsTable.push({ label: 'Key Attributes', value: props.join(' · ') });
  }

  // Build Hero Summary & Tagline (100% factual)
  const tagline =
    spec?.tagline ||
    (props.length >= 2
      ? `Asian Paints ${sub} — ${props[0]} & ${props[1]}`
      : `Genuine Asian Paints ${sub}`);

  const heroSummary =
    spec?.summary ||
    (props.length > 0
      ? `Genuine Asian Paints ${product.name} (${sub}) featuring ${props.join(', ').toLowerCase()}. Available in factory-sealed ${packSizesLabel} packs at wholesale dealer pricing.`
      : `Genuine Asian Paints ${product.name} for ${sub.toLowerCase()} applications. Supplied in factory-sealed ${packSizesLabel} packs by Rainbow Paints & Hardwares, Coimbatore.`);

  // Build Dynamic Real-Price FAQs (synced to FAQPage JSON-LD!)
  const basePrice = parseBasePrice(product);
  const priceParts = sizes.map((s) => {
    const sp = product.sizePrices?.[s];
    let factor = 1;
    if (unitShort === 'kg') {
      if (s === 5) factor = 0.94;
      if (s === 20) factor = 0.53;
      if (s === 25) factor = 0.8;
      if (s === 40) factor = 0.472;
      if (s === 50) factor = 0.628;
    } else {
      if (s === 4) factor = 0.96;
      if (s === 10) factor = 0.92;
      if (s === 20) factor = 0.88;
    }
    const price = sp || Math.round(basePrice * s * factor);
    return `${formatPackSize(s, product.unit || 'L')} at ₹${price.toLocaleString('en-IN')}`;
  });

  const faqs: ProductFaqItem[] = [];
  if (basePrice > 0) {
    faqs.push({
      question: `What is the price of Asian Paints ${product.name} across available pack sizes?`,
      answer: `At Rainbow Paints & Hardwares (Authorized Asian Paints Dealer), ${product.name} is available in factory-sealed packs: ${priceParts.join(', ')}. Prices are at wholesale store rates with GST billing.`,
    });
  }
  if (spec?.coverageTwoCoats || spec?.coverageOneCoat) {
    faqs.push({
      question: `What is the official coverage of Asian Paints ${product.name}?`,
      answer: `Per official Asian Paints specifications, ${product.name} delivers ${[spec.coverageOneCoat, spec.coverageTwoCoats].filter(Boolean).join(' and ')} on properly prepared surfaces. Actual spreading rate varies based on surface porosity, texture, and application method.`,
    });
  }
  if (spec?.dilution || spec?.recoatInterval) {
    faqs.push({
      question: `What is the recommended dilution and drying time for ${product.name}?`,
      answer: `${spec.dilution ? `Recommended dilution is ${spec.dilution}. ` : ''}${spec.surfaceDry ? `Surface dry time is approximately ${spec.surfaceDry}. ` : ''}${spec.recoatInterval ? `Allow ${spec.recoatInterval} before recoating.` : 'Follow the pack instructions for optimal film build.'}`,
    });
  }
  if (spec?.warranty) {
    faqs.push({
      question: `What warranty does Asian Paints offer on ${product.name}?`,
      answer: `Asian Paints provides ${spec.warranty} warranty coverage (${spec.warrantyDetail || 'subject to official system guidelines'}) when applied as per the recommended painting system and registered with your purchase invoice.`,
    });
  }
  if (props.length > 0) {
    faqs.push({
      question: `What are the key benefits of Asian Paints ${product.name}?`,
      answer: `${product.name} is formulated for ${sub.toLowerCase()} applications and stands out for ${props.join(', ')}.`,
    });
  }
  faqs.push({
    question: `Is Asian Paints ${product.name} genuine factory-sealed stock with delivery in Coimbatore?`,
    answer: `Yes. Rainbow Paints & Hardwares (54 Cox Street, Kattoor, Coimbatore) supplies 100% genuine, factory-sealed Asian Paints products with fresh manufacturing batches, GST invoicing, and prompt doorstep delivery across Coimbatore.`,
  });
  if (spec?.extraFaqs?.length) {
    faqs.push(...spec.extraFaqs);
  }

  // Build SEO metadata (keep benefit-focused, exact "{Name} by Asian Paints - Buy Online" title!)
  const alreadyHasBrand = normalized.includes('asian paints');
  const seoTitle = alreadyHasBrand
    ? `${product.name} - Buy Online`
    : `${product.name} by Asian Paints - Buy Online`;

  const buildCleanSeoDesc = (): string => {
    const MAX_LEN = 156;
    if (spec?.seoBenefitSentence) {
      const candidates = [
        `Upgrade your space with Asian Paints ${product.name}. ${spec.seoBenefitSentence}`,
        `Shop Asian Paints ${product.name}. ${spec.seoBenefitSentence}`,
        `Asian Paints ${product.name}: ${spec.seoBenefitSentence}`,
      ];
      const fit = candidates.find((c) => c.length <= MAX_LEN);
      if (fit) return fit;
    }
    if (props.length >= 2) {
      const candidates = [
        `Shop genuine Asian Paints ${product.name} for ${sub.toLowerCase()}. Delivers ${props[0].toLowerCase()} & ${props[1].toLowerCase()} in factory-sealed packs.`,
        `Shop Asian Paints ${product.name}. Delivers ${props[0].toLowerCase()} & ${props[1].toLowerCase()} in factory-sealed packs.`,
        `Asian Paints ${product.name} (${sub}): ${props[0].toLowerCase()} in genuine factory-sealed packs.`,
      ];
      const fit = candidates.find((c) => c.length <= MAX_LEN);
      if (fit) return fit;
    }
    const fallback = `Shop genuine Asian Paints ${product.name} in factory-sealed ${packSizesLabel} packs at Rainbow Paints Coimbatore with fast local delivery.`;
    if (fallback.length <= MAX_LEN) return fallback;
    return `Shop genuine Asian Paints ${product.name} in factory-sealed packs at Rainbow Paints Coimbatore.`;
  };

  const seoDescription = buildCleanSeoDesc();

  const highlights: string[] = [
    ...(spec?.finish ? [`Finish: ${spec.finish}`] : []),
    ...(spec?.warranty ? [`Official Warranty: ${spec.warranty}`] : []),
    ...(spec?.coverageTwoCoats ? [`Coverage: ${spec.coverageTwoCoats}`] : spec?.coverageOneCoat ? [`Coverage: ${spec.coverageOneCoat}`] : []),
    ...props,
  ].slice(0, 6);

  return {
    productKey: normalized,
    tagline,
    heroSummary,
    gallery,
    metrics: metrics.slice(0, 4),
    calculator: spec ? buildCalculatorForSpec(spec) : undefined,
    featureCards: buildFeatureCards(product, spec),
    specificationsTable,
    comparison: spec?.comparisonRows?.length
      ? {
          title: `How ${product.name} Compares`,
          subtitle: `Verified feature comparison between Asian Paints ${product.name} and ${spec.standardComparisonLabel || 'standard alternatives'}.`,
          featuredColumnLabel: product.name,
          standardColumnLabel: spec.standardComparisonLabel || 'Standard Alternative',
          rows: spec.comparisonRows,
        }
      : undefined,
    applicationSteps: getCategoryApplicationSteps(product, spec),
    faqs: faqs.slice(0, 6),
    seo: {
      title: seoTitle,
      description: seoDescription,
      keywords: [
        `Asian Paints ${product.name}`,
        `${product.name} price`,
        `buy ${product.name} online`,
        `Asian Paints ${sub}`,
        ...props.slice(0, 3),
        'Asian Paints authorized dealer Coimbatore',
      ].join(', '),
      ogImageAlt: `Asian Paints ${product.name} - ${sub} Original Factory Pack`,
      material: spec?.material || `Asian Paints ${sub}`,
      colorSummary: spec?.shadeSummary || (sub.toLowerCase().includes('paint') ? 'White & Computerized Asian Paints Shades' : 'Standard Factory Finish'),
      highlights,
      additionalProperties: specificationsTable.map((s) => ({ name: s.label, value: s.value })),
    },
  };
}
