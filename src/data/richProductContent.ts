import { mockProducts } from '../data';
import { buildAsianPaintsRichContent, CatalogProductLike } from './asianPaintsRichCatalog';

export interface ProductGalleryImage {
  src: string;
  alt: string;
  label: string;
  caption: string;
  objectFit: 'contain' | 'cover';
  enableZoom?: boolean;
}

export interface ProductKeyMetric {
  value: string;
  label: string;
  detail: string;
}

export interface StainResistanceItem {
  stain: string;
  cleanMethod: string;
  result: string;
}

export interface EditorialFeatureSection {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  imageCaption: string;
  stainMatrix?: StainResistanceItem[];
}

export interface ComparisonRow {
  criterion: string;
  featured: string;
  standard: string;
}

export interface ApplicationStep {
  stepNumber: string;
  title: string;
  timing: string;
  detail: string;
  linkedProductName?: string;
  linkedProductSlug?: string;
}

export interface ProductFaqItem {
  question: string;
  answer: string;
}

export interface PaintCalculatorConfig {
  coverageTwoCoatsSqFtPerLitre: number;
  coverageOneCoatSqFtPerLitre: number;
  dilutionNote: string;
  unit?: 'L' | 'kg';
  primerLabel?: string;
  coatsLabel?: string;
  hidePrimerOption?: boolean;
  presets: {
    label: string;
    wallSqFt: number;
    subtitle: string;
  }[];
}

export interface ProductFeatureCard {
  eyebrow: string;
  title: string;
  detail: string;
}

export interface ProductSpecificationRow {
  label: string;
  value: string;
}

export interface RichProductContent {
  productKey: string;
  tagline: string;
  heroSummary: string;
  gallery: ProductGalleryImage[];
  metrics: ProductKeyMetric[];
  calculator?: PaintCalculatorConfig;
  editorialSections?: EditorialFeatureSection[];
  featureCards?: ProductFeatureCard[];
  macroStudy?: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    specs: { label: string; value: string }[];
  };
  specificationsTable?: ProductSpecificationRow[];
  comparison?: {
    title: string;
    subtitle: string;
    featuredColumnLabel: string;
    standardColumnLabel: string;
    rows: ComparisonRow[];
  };
  applicationSteps: {
    title: string;
    subtitle: string;
    steps: ApplicationStep[];
  };
  faqs: ProductFaqItem[];
  seo?: {
    title: string;
    description: string;
    keywords: string;
    ogImageAlt: string;
    material: string;
    colorSummary: string;
    highlights: string[];
    additionalProperties: { name: string; value: string }[];
  };
}

export const RICH_PRODUCT_CONTENT: Record<string, RichProductContent> = {
  'royale luxury emulsion': {
    productKey: 'royale luxury emulsion',
    tagline: 'Soft Sheen Luxury Interior Emulsion with Teflon™ Surface Protector',
    heroSummary:
      'Asian Paints’ flagship water-based luxury interior emulsion offering a smooth soft sheen, Teflon™ Surface Protector for easy stain removal, JIS Z-2801 anti-bacterial protection, Low VOC Green Assure formulation, and an official 8-year performance warranty.',
    gallery: [
      {
        src: '/assets/aistudio/royale_luxury_emulsion_packshot_hd.jpg',
        alt: 'Asian Paints Royale Luxury Emulsion Original Factory Pack with Teflon Surface Protector',
        label: 'Packshot',
        caption: 'Official Asian Paints Pack · Available in 1L, 4L, 10L & 20L Sealed Packs',
        objectFit: 'contain',
        enableZoom: true,
      },
      {
        src: '/assets/aistudio/royale_luxury_living_room.jpg',
        alt: 'Modern living room interior illustrating a smooth soft sheen wall finish',
        label: 'Living Room',
        caption: 'Finish Reference · Soft Sheen Interior Look Reflecting Natural Daylight',
        objectFit: 'cover',
        enableZoom: false,
      },
      {
        src: '/assets/aistudio/royale_luxury_teflon_wipe.jpg',
        alt: 'Illustration of wiping a coffee spill off a smooth painted interior wall with a damp cloth',
        label: 'Stain Guard',
        caption: 'Teflon™ Surface Protector · Easy Removal of Hydrophilic & Hydrophobic Household Stains',
        objectFit: 'cover',
        enableZoom: false,
      },
      {
        src: '/assets/aistudio/royale_luxury_sheen_macro.jpg',
        alt: 'Close-up surface study illustrating a smooth silky soft sheen wall texture',
        label: 'Sheen Finish',
        caption: 'Finish Texture Reference · Smooth, Silky Soft Sheen Appearance',
        objectFit: 'cover',
        enableZoom: true,
      },
      {
        src: '/assets/aistudio/royale_luxury_bedroom.jpg',
        alt: 'Modern bedroom interior illustrating a calm low-odor painted wall environment',
        label: 'Bedroom',
        caption: 'Green Assure · Low VOC (ASTM D 6886), Low Odor & JIS Z-2801 Anti-Bacterial Shield',
        objectFit: 'cover',
        enableZoom: false,
      },
    ],
    metrics: [
      {
        value: '8 Years',
        label: 'Performance Warranty',
        detail: 'Official Asian Paints warranty covering colour retention & film integrity',
      },
      {
        value: 'Teflon™',
        label: 'Surface Protector',
        detail: 'Protects against hydrophilic & hydrophobic household stains',
      },
      {
        value: '140–160',
        label: 'sq.ft / L (2 Coats)',
        detail: '270–310 sq.ft/L (1 coat) on normal primed masonry surfaces',
      },
      {
        value: '30 Mins',
        label: 'Surface Dry · Low VOC',
        detail: '3–4 hrs recoat · Meets LEED VOC criteria (ASTM D 6886)',
      },
    ],
    calculator: {
      coverageTwoCoatsSqFtPerLitre: 150,
      coverageOneCoatSqFtPerLitre: 290,
      dilutionNote: 'Official PIS dilution: 40%–45% clean water by volume for brush/roller/spray (10%–20% for airless spray). Use thinned paint within 24 hours.',
      presets: [
        { label: 'Bedroom (10×12 ft)', wallSqFt: 380, subtitle: '~380 sq.ft paintable wall area' },
        { label: 'Living Room (14×18 ft)', wallSqFt: 620, subtitle: '~620 sq.ft paintable wall area' },
        { label: 'Full 2BHK Home', wallSqFt: 1450, subtitle: '~1,450 sq.ft interior walls' },
        { label: 'Full 3BHK Home', wallSqFt: 2200, subtitle: '~2,200 sq.ft interior walls' },
      ],
    },
    editorialSections: [
      {
        eyebrow: '01. Teflon™ Surface Protector',
        title: 'Reinforced Film Built for Tough Everyday Household Stains',
        body: 'Royale Luxury Emulsion is fortified with Teflon™ Surface Protector to reinforce the paint film and deliver superior washability. According to Asian Paints’ official Product Information Sheet, it protects against both hydrophilic stains (coffee, tea, ketchup, shoe polish) and hydrophobic stains (crayon, lipstick), making everyday wall cleaning straightforward without harming the finish.',
        bullets: [
          'Protects against both water-based (hydrophilic) and oil/wax-based (hydrophobic) stains',
          'High washability and dirt-removal performance on fully cured walls',
          'Ideal for dining spaces, living rooms, hallways, and family bedrooms',
        ],
        image: '/assets/aistudio/royale_luxury_teflon_wipe.jpg',
        imageAlt: 'Wiping a spilled coffee mark cleanly from an interior painted wall',
        imageCaption: 'Official Asian Paints guideline: allow freshly painted walls to dry thoroughly before gentle cleaning with a soft damp cloth and mild soap solution.',
        stainMatrix: [
          { stain: 'Coffee & Tea', cleanMethod: 'Hydrophilic stain · Soft damp cloth', result: 'Easy wipe-off' },
          { stain: 'Ketchup & Shoe Polish', cleanMethod: 'Hydrophilic stain · Mild soap & water', result: 'High stain removal' },
          { stain: 'Crayon & Lipstick', cleanMethod: 'Hydrophobic stain · Mild detergent wipe', result: 'Lifts cleanly' },
        ],
      },
      {
        eyebrow: '02. Exquisite Soft Sheen',
        title: 'Silky, Smooth Soft Sheen That Elevates Natural Daylight',
        body: 'Positioned between flat matt emulsions and high-gloss finishes, Royale Luxury Emulsion creates a smooth, glowing soft sheen that lends refined depth to interior walls. Its water-based acrylic formulation flows smoothly by brush or roller across over 5,000 computerized Asian Paints shades.',
        bullets: [
          'Smooth, silky soft-sheen appearance tailored for luxury living rooms and bedrooms',
          'Theoretical spreading rate of 270–310 sq.ft/L (1 coat) and 140–160 sq.ft/L (2 coats)',
          'Backed by Asian Paints’ 8-year warranty covering colour retention and film integrity',
        ],
        image: '/assets/aistudio/royale_luxury_living_room.jpg',
        imageAlt: 'Sunlit modern living room illustrating soft sheen wall finish',
        imageCaption: 'Finish reference illustrating how soft sheen gently diffuses ambient daylight across interior masonry walls.',
      },
      {
        eyebrow: '03. Green Assure & Anti-Bacterial Shield',
        title: 'Low VOC Formulation with JIS Z-2801 Anti-Bacterial Protection',
        body: 'Formulated under Asian Paints’ Green Assure standards, Royale Luxury Emulsion meets international LEED VOC criteria (tested per ASTM D 6886:2018) with very low odor and zero added lead, mercury, arsenic, or chromium. It also includes an anti-fungal shield and anti-bacterial protection conforming to Japanese Industrial Standard JIS Z-2801.',
        bullets: [
          'Low VOC (meets LEED VOC criteria per ASTM D 6886:2018) with very low odor',
          'Manufactured without added lead, mercury, arsenic, or chromium',
          'Anti-bacterial shield conforming to JIS Z-2801 plus anti-fungal protection',
        ],
        image: '/assets/aistudio/royale_luxury_bedroom.jpg',
        imageAlt: 'Master bedroom interior painted with low-VOC interior emulsion',
        imageCaption: 'Surface dry in 30 minutes (at 30°C & 50–60% RH) with very low painting odor.',
      },
    ],
    macroStudy: {
      eyebrow: 'Official PIS Technical Summary',
      title: 'Verified Asian Paints Application & Film Specifications',
      description:
        'Follow Asian Paints’ official dilution, recoating, and surface-preparation ratios for consistent coverage, smooth leveling, and full 8-year performance warranty eligibility.',
      image: '/assets/aistudio/royale_luxury_sheen_macro.jpg',
      imageAlt: 'Close-up surface study illustrating smooth soft sheen wall finish',
      specs: [
        { label: 'Brush / Roller Dilution', value: '40%–45% water' },
        { label: 'Airless Spray Dilution', value: '10%–20% water' },
        { label: 'Surface Dry / Recoat', value: '30 mins / 3–4 hrs' },
        { label: 'Thinned Paint Stability', value: 'Use within 24 hrs' },
      ],
    },
    comparison: {
      title: 'How Royale Luxury Emulsion Stands Apart',
      subtitle: 'Key official feature differences between Asian Paints Royale Luxury Emulsion and standard interior wall emulsions.',
      featuredColumnLabel: 'Royale Luxury Emulsion',
      standardColumnLabel: 'Standard Interior Emulsion',
      rows: [
        {
          criterion: 'Finish Appearance',
          featured: 'Smooth, silky soft sheen',
          standard: 'Standard matt or basic low sheen',
        },
        {
          criterion: 'Stain Protection',
          featured: 'Teflon™ Surface Protector (hydrophilic & hydrophobic stains)',
          standard: 'Basic washability without Teflon™ reinforcement',
        },
        {
          criterion: 'Hygiene Protection',
          featured: 'JIS Z-2801 Anti-Bacterial & Anti-Fungal shield',
          standard: 'Basic interior film',
        },
        {
          criterion: 'Spreading Rate (2 Coats)',
          featured: '140–160 sq.ft / L (270–310 sq.ft/L for 1 coat)',
          standard: 'Lower spreading rate on masonry walls',
        },
        {
          criterion: 'VOC & Eco Standard',
          featured: 'Green Assure Low VOC (ASTM D 6886), zero added heavy metals',
          standard: 'Standard interior emulsion formulation',
        },
        {
          criterion: 'Official Warranty',
          featured: '8-Year Performance Warranty (colour retention & film integrity)',
          standard: 'No 8-year luxury performance warranty',
        },
      ],
    },
    applicationSteps: {
      title: 'Recommended 4-Step Painting System',
      subtitle: 'Apply Royale Luxury Emulsion over properly prepared, puttied, and primed walls to achieve the official finish and qualify for the 8-year warranty.',
      steps: [
        {
          stepNumber: '01',
          title: 'Clean & Sand Surface',
          timing: 'Before priming',
          detail: 'Remove loose paint, dust, grease, and fungal growth. Sand smooth with Emery Paper 180 and wipe clean so the masonry surface is dry and sound.',
        },
        {
          stepNumber: '02',
          title: 'Level with Wall Putty',
          timing: 'Dry 4–6 hrs per coat',
          detail: 'Apply 2 thin coats of wall putty to fill minor dents and level undulations, allowing each coat to dry before sanding gently with fine abrasive paper.',
          linkedProductName: 'Birla White WallCare Putty',
          linkedProductSlug: 'birla-white-wallcare-putty',
        },
        {
          stepNumber: '03',
          title: 'Apply Interior Wall Primer',
          timing: 'Dry 4–6 hrs',
          detail: 'Apply 1 uniform coat of water-based interior wall primer to seal porosity, improve adhesion, and deliver consistent topcoat coverage.',
          linkedProductName: 'Decoprime Wall Primer',
          linkedProductSlug: 'decoprime-wall-primer',
        },
        {
          stepNumber: '04',
          title: 'Apply 2 Coats Royale Luxury',
          timing: '3–4 hrs between coats',
          detail: 'Dilute 40%–45% with clean water (use thinned paint within 24 hours). Apply 2 coats by brush or roller with a 3–4 hour recoat interval.',
        },
      ],
    },
    faqs: [
      {
        question: 'What is the price of Asian Paints Royale Luxury Emulsion in 1L, 4L, 10L & 20L?',
        answer: 'At Rainbow Paints & Hardwares (Authorized Asian Paints Dealer), Royale Luxury Emulsion starts at ₹780 for 1L, ₹2,995 for 4L, ₹7,176 for 10L, and ₹13,728 for 20L in factory-sealed packs with computerized tinting across 1,750+ shades.',
      },
      {
        question: 'What is the official coverage of Asian Paints Royale Luxury Emulsion?',
        answer: 'Per Asian Paints’ Product Information Sheet, Royale Luxury Emulsion delivers approximately 270–310 sq.ft per litre for 1 coat and 140–160 sq.ft per litre for 2 coats on normal smooth primed masonry surfaces. Actual coverage varies with wall porosity, surface texture, and application method.',
      },
      {
        question: 'What stains does the Teflon™ Surface Protector help protect against?',
        answer: 'Teflon™ Surface Protector reinforces the paint film to aid easy removal of both hydrophilic household stains (such as coffee, tea, ketchup, and shoe polish) and hydrophobic stains (such as crayon and lipstick), offering high washability without damaging the soft sheen finish.',
      },
      {
        question: 'How is Royale Luxury Emulsion different from Royale Shyne and Royale Matt?',
        answer: 'Royale Luxury Emulsion provides a smooth, velvety soft sheen. Royale Shyne offers a higher-gloss sheen for brighter light reflection, while Royale Matt delivers a non-reflective flat matt appearance.',
      },
      {
        question: 'What is the recommended dilution and recoating time?',
        answer: 'Dilute up to 40%–45% with clean potable water by volume for brush, roller, or conventional spray (10%–20% for airless spray), and use thinned paint within 24 hours. Surface dry time is 30 minutes at 30°C (50–60% RH), with a recoating interval of 3–4 hours.',
      },
      {
        question: 'Does Royale Luxury Emulsion have low VOC and anti-bacterial protection?',
        answer: 'Yes. It meets LEED VOC criteria (tested per ASTM D 6886:2018), has very low odor, contains no added lead, mercury, arsenic, or chromium, helps prevent fungal growth, and provides anti-bacterial protection conforming to Japanese Industrial Standard JIS Z-2801.',
      },
      {
        question: 'How does the 8-year performance warranty work?',
        answer: 'Asian Paints offers an 8-year performance warranty covering colour retention and film integrity (against flaking and peeling) when Royale Luxury Emulsion is applied as per the recommended painting system and registered with your purchase invoice via Asian Paints’ official warranty portal.',
      },
    ],
    seo: {
      title: 'Royale Luxury Emulsion by Asian Paints - Buy Online',
      description:
        'Give your interior walls a smooth, velvety soft sheen with Asian Paints Royale Luxury Emulsion. Washable Teflon™ stain guard, low odor & 8-year warranty.',
      keywords:
        'Asian Paints Royale Luxury Emulsion, Asian Paints Royale Luxury Emulsion price, Royale Luxury Emulsion 1L 4L 10L 20L price, Royale Luxury Emulsion Teflon Surface Protector, Royale Luxury Emulsion coverage per litre, Royale Luxury Emulsion 8 year warranty, soft sheen washable interior wall paint, Low VOC Green Assure interior emulsion, Asian Paints authorized dealer Coimbatore',
      ogImageAlt:
        'Asian Paints Royale Luxury Emulsion Paint Bucket with Teflon Surface Protector and 8-Year Warranty',
      material: 'Water-based 100% Acrylic Interior Emulsion with Teflon™ Surface Protector',
      colorSummary: 'White & 1,750+ Asian Paints Colour Spectra Tinted Shades',
      highlights: [
        'Smooth Soft Sheen Luxury Interior Wall Finish',
        'Teflon™ Surface Protector — Easy Removal of Coffee, Tea, Ketchup, Crayon & Lipstick Stains',
        'Official 8-Year Performance Warranty (Colour Retention & Film Integrity)',
        'High Coverage: 140–160 sq.ft/L (2 Coats) | 270–310 sq.ft/L (1 Coat)',
        'Green Assure Low VOC (ASTM D 6886:2018), Low Odor & JIS Z-2801 Anti-Bacterial Shield',
        'Fast 30-Minute Surface Dry | 3–4 Hour Recoat Interval | 40–45% Water Dilution',
      ],
      additionalProperties: [
        { name: 'Finish', value: 'Smooth Soft Sheen' },
        { name: 'Surface Technology', value: 'Teflon™ Surface Protector (Hydrophilic & Hydrophobic Stain Removal)' },
        { name: 'Performance Warranty', value: '8 Years (Colour Retention & Film Integrity)' },
        { name: 'Coverage (2 Coats)', value: '140–160 sq.ft per litre on primed masonry' },
        { name: 'Coverage (1 Coat)', value: '270–310 sq.ft per litre on primed masonry' },
        { name: 'Surface Dry Time', value: '30 minutes at 30°C & 50–60% RH' },
        { name: 'Recoating Interval', value: '3–4 hours' },
        { name: 'Dilution Ratio', value: '40–45% clean water (brush/roller), 10–20% (airless spray)' },
        { name: 'VOC & Eco Compliance', value: 'Green Assure Low VOC (LEED / ASTM D 6886:2018), Zero Added Heavy Metals' },
        { name: 'Hygiene Protection', value: 'Anti-Bacterial (JIS Z-2801) & Anti-Fungal Shield' },
        { name: 'Available Pack Sizes', value: '1L, 4L, 10L, 20L' },
        { name: 'Shade Availability', value: 'White & 1,750+ Computerized Tinted Shades' },
      ],
    },
  },
  'berger epoxy floor paint - pro epishield mark 100': {
    productKey: 'berger epoxy floor paint - pro epishield mark 100',
    tagline: 'Two-Pack (2K) Glossy Epoxy Floor Paint for Concrete & Plastered Surfaces (6L Kit)',
    heroSummary:
      'Berger Protection Pro Epishield Mark 100 is a two-pack aliphatic amine-cured high-gloss epoxy floor coating and floor marking paint designed for concrete and plastered surfaces. Supplied as a matched 6L kit (5L Base + 1L Catalyst R62CI2, 5:1 v/v) in Golden Yellow (R6236) and White with 54 ± 2% volume solids, chemical resistance, and heavy-duty abrasion durability.',
    gallery: [
      {
        src: '/assets/aistudio/Berger_Pro_Epishield_Golden_Yellow_Drum_4b354320.png',
        alt: 'Berger Protection Pro Epishield Mark 100 Epoxy Floor Paint 6L Kit (5L Base + 1L Catalyst R62CI2)',
        label: 'Packshot',
        caption: 'Official Berger Protection 6L Kit (5L Base + 1L Catalyst R62CI2) · Available in Golden Yellow (R6236) & White',
        objectFit: 'contain',
        enableZoom: true,
      },
    ],
    metrics: [
      {
        value: '6L Kit (5:1)',
        label: '5L Base + 1L Catalyst',
        detail: 'Matched 2K kit with Catalyst R62CI2 · Mixing ratio 5:1 by volume',
      },
      {
        value: '105–116',
        label: 'sq.ft / L (1 Coat)',
        detail: '9.8–10.8 m²/L per coat at 50–55 µm DFT (~630–695 sq.ft per 6L kit)',
      },
      {
        value: '54 ± 2%',
        label: 'Volume Solids · High Gloss',
        detail: 'Aliphatic amine-cured epoxy film · 50–55 µm DFT (93–102 µm WFT)',
      },
      {
        value: '60 Mins',
        label: 'Pot Life · 7-Day Full Cure',
        detail: 'Surface dry 5 hrs · Hard dry 24 hrs · Foot traffic 3 days (at 30°C)',
      },
    ],
    calculator: {
      coverageTwoCoatsSqFtPerLitre: 55,
      coverageOneCoatSqFtPerLitre: 110,
      unit: 'L',
      coatsLabel: '2 Coats (100–110 µm DFT)',
      hidePrimerOption: true,
      dilutionNote:
        'Official Berger TDS theoretical coverage: 9.8–10.8 m²/L (105–116 sq.ft/L) per coat at 50–55 µm DFT (~55 sq.ft/L for 2 coats). Mix strictly 5:1 (v/v) with Catalyst R62CI2 and apply within 60 minutes pot life at 30°C; no thinning normally required.',
      presets: [
        { label: 'Garage / Workshop Bay', wallSqFt: 300, subtitle: '~300 sq.ft concrete floor' },
        { label: 'Warehouse Zone / Aisle', wallSqFt: 650, subtitle: '~650 sq.ft concrete floor' },
        { label: 'Factory Production Bay', wallSqFt: 1200, subtitle: '~1,200 sq.ft industrial floor' },
        { label: 'Large Plant / Showroom', wallSqFt: 2400, subtitle: '~2,400 sq.ft concrete floor' },
      ],
    },
    featureCards: [
      {
        eyebrow: '01. Concrete & Plastered Surfaces',
        title: 'Engineered for Concrete & Plastered Masonry',
        detail:
          'Formulated specifically for new and previously coated concrete floors, plastered masonry surfaces, and properly abraded aged epoxy coatings across factories, warehouses, clean rooms, pharma plants, and automotive showrooms.',
      },
      {
        eyebrow: '02. 2K Aliphatic Amine Chemistry',
        title: 'High Chemical & Mechanical Durability',
        detail:
          'Two-pack epoxy resin cured with aliphatic amine creates a dense 54 ± 2% volume-solids barrier that resists industrial wear, abrasion, routine washdowns, and chemical exposure.',
      },
      {
        eyebrow: '03. High-Visibility Floor Zoning',
        title: 'High-Gloss Finish in Golden Yellow & White',
        detail:
          'Available in Golden Yellow (Code R6236) and White for crisp industrial floor coatings, safety aisle demarcation, clean-room zoning, and high-visibility line marking.',
      },
      {
        eyebrow: '04. Factory-Matched 6L Kit',
        title: 'Complete 5L Base + 1L Catalyst R62CI2 Pack',
        detail:
          'Supplied as a complete 6L industrial kit (5:1 v/v ratio, not sold separately without catalyst) in sealed Berger Protection drums with GST invoicing and fast dispatch from Coimbatore.',
      },
    ],
    specificationsTable: [
      { label: 'Brand & Division', value: 'Berger Paints — Berger Protection (Protective Coating Division)' },
      { label: 'Product Name', value: 'Pro Epishield Mark 100 Epoxy Floor Paint' },
      { label: 'Recommended Substrates', value: 'Concrete Floors, Plastered Surfaces & Abraded Aged Epoxy Coatings' },
      { label: 'Product Chemistry', value: 'Two-Pack (2K) Aliphatic Amine-Cured Epoxy Resin' },
      { label: 'Finish', value: 'High Gloss' },
      { label: 'Available Colors', value: 'Golden Yellow (R6236) & White' },
      { label: 'Pack Size (Total Kit)', value: '6 Litres (5L Net Base + 1L Catalyst R62CI2)' },
      { label: 'Mixing Ratio', value: '5 : 1 (Base : Catalyst R62CI2 by volume)' },
      { label: 'Volume Solids', value: '54 ± 2%' },
      { label: 'Recommended DFT / WFT', value: '50–55 µm DFT / 93–102 µm WFT per coat' },
      { label: 'Theoretical Coverage', value: '9.8–10.8 m²/L (105–116 sq.ft/L) per coat @ 50–55 µm DFT' },
      { label: 'Pot Life (at 30°C)', value: 'Approx. 60 minutes after mixing' },
      { label: 'Surface Dry / Hard Dry', value: '5 hours / 24 hours (at 30°C)' },
      { label: 'Overcoating Interval', value: 'Min 12 hours · Max 3 days (abrade surface if exceeded)' },
      { label: 'Foot Traffic / Full Cure', value: 'Light foot traffic after 3 days · Full cure in 7 days' },
      { label: 'Application Conditions', value: 'Concrete moisture < 5% · Temp 15°C–35°C · RH ≤ 80%' },
    ],
    comparison: {
      title: 'How Pro Epishield Mark 100 Compares to Standard Floor Paint',
      subtitle:
        'Key technical differences between Berger Pro Epishield Mark 100 two-pack epoxy floor paint and conventional single-pack concrete floor paints.',
      featuredColumnLabel: 'Berger Pro Epishield Mark 100 (2K)',
      standardColumnLabel: 'Standard Single-Pack Floor Paint',
      rows: [
        {
          criterion: 'Curing Mechanism',
          featured: 'Two-pack (2K) aliphatic amine chemical cross-linking (5:1 with R62CI2)',
          standard: 'Air-drying single-pack film without hardener cross-linking',
        },
        {
          criterion: 'Film Build & Solids',
          featured: '54 ± 2% volume solids · 50–55 µm DFT per coat',
          standard: 'Lower film build with softer surface hardness',
        },
        {
          criterion: 'Industrial Suitability',
          featured: 'Factories, warehouses, clean rooms, pharma & chemical zones',
          standard: 'Light residential or low-traffic concrete areas',
        },
        {
          criterion: 'Chemical & Abrasion Defense',
          featured: 'High mechanical wear and chemical resistance after 7-day full cure',
          standard: 'Prone to tyre scuffing, oil staining & early peeling',
        },
        {
          criterion: 'Gloss & Safety Visibility',
          featured: 'High-gloss Golden Yellow (R6236) & White floor marking clarity',
          standard: 'Dulls quickly under washdowns and foot traffic',
        },
      ],
    },
    applicationSteps: {
      title: 'Recommended 4-Step Concrete Epoxy Floor Application System',
      subtitle:
        'Follow Berger Protection concrete preparation, mixing, and curing guidelines for strong adhesion and full industrial floor performance.',
      steps: [
        {
          stepNumber: '01',
          title: 'Clean, Dry & Check Moisture',
          timing: 'Moisture < 5%',
          detail:
            'Remove oil, grease, laitance, dust, and loose concrete thoroughly. Confirm concrete/plastered substrate moisture is below 5% and ambient conditions are 15°C–35°C (RH ≤ 80%).',
        },
        {
          stepNumber: '02',
          title: 'Prime Concrete Substrate',
          timing: 'Before topcoat',
          detail:
            'Apply a compatible epoxy concrete floor sealer/primer (such as Berger Pro Epishield Floor Sealer) on bare concrete or plaster, or abrade sound aged epoxy coatings cleanly before overcoating.',
        },
        {
          stepNumber: '03',
          title: 'Mix Base & Catalyst 5:1',
          timing: '60 min pot life',
          detail:
            'Stir the 5L base thoroughly, pour the complete 1L Catalyst R62CI2 into the base (5:1 v/v), and mix continuously for 3–5 minutes until uniform. Mix only what can be applied within 60 minutes.',
        },
        {
          stepNumber: '04',
          title: 'Apply Coats & Allow Full Cure',
          timing: '12 hr recoat · 7d cure',
          detail:
            'Apply evenly by brush or roller at 50–55 µm DFT per coat (min 12 hrs / max 3 days recoat). Surface dries in 5 hrs, hard dries in 24 hrs; allow 3 days before foot traffic and 7 days for full cure.',
        },
      ],
    },
    faqs: [
      {
        question: 'What is the price and pack composition of Berger Epoxy Floor Paint Pro Epishield Mark 100?',
        answer:
          'Berger Pro Epishield Mark 100 Epoxy Floor Paint is supplied as a complete 6L industrial kit (5L Net Base + 1L Catalyst R62CI2, mixing ratio 5:1 by volume) at ₹3,169 (20% off ₹3,961 MRP, inclusive of catalyst & taxes) at Rainbow Paints & Hardwares.',
      },
      {
        question: 'What surfaces can Berger Pro Epishield Mark 100 epoxy floor paint be applied on?',
        answer:
          'It is engineered for new and coated concrete floors and plastered masonry surfaces, as well as properly abraded aged epoxy floor coatings. Typical applications include industrial units, warehouses, clean rooms, pharmaceutical & chemical plants, food processing areas, laboratories, workshops, and automotive showrooms.',
      },
      {
        question: 'What colors are available in Berger Pro Epishield Mark 100?',
        answer:
          'At Rainbow Paints & Hardwares, Berger Pro Epishield Mark 100 is available in high-gloss Golden Yellow (Code R6236) and White—ideal for concrete floor coating, safety aisle demarcation, and high-visibility industrial floor marking.',
      },
      {
        question: 'How much area does a 6L kit of Berger Pro Epishield Mark 100 cover?',
        answer:
          'Per Berger Protection’s Technical Data Sheet, Pro Epishield Mark 100 has a theoretical spreading rate of 9.8–10.8 m²/L (approx. 105–116 sq.ft/L) per coat at 50–55 µm DFT. One 6L kit theoretically covers ~630–695 sq.ft in 1 coat or ~315–345 sq.ft in 2 coats, depending on concrete porosity and profile.',
      },
      {
        question: 'What is the mixing ratio and pot life of Pro Epishield Mark 100?',
        answer:
          'Mix strictly at 5:1 by volume (5 parts Base to 1 part Catalyst R62CI2) for 3–5 minutes until homogeneous. Do not split packs without exact volume measurement. At 30°C, the mixed epoxy has a pot life of approximately 60 minutes.',
      },
      {
        question: 'How long does Berger Pro Epishield Mark 100 epoxy floor paint take to dry and cure?',
        answer:
          'At 30°C, it becomes surface dry in 5 hours and hard dry in 24 hours, with an overcoating interval of 12 hours minimum to 3 days maximum. Allow 3 days before light foot traffic and 7 days for full chemical and mechanical cure.',
      },
    ],
    seo: {
      title: 'Berger Epoxy Floor Paint Pro Epishield Mark 100 - Buy Online',
      description:
        'Protect concrete & plastered floors with Berger Pro Epishield Mark 100 Epoxy Floor Paint (6L). High-gloss 2K chemical & abrasion defense in White & Yellow.',
      keywords:
        'epoxy floor paint, Berger epoxy floor paint, Berger Pro Epishield Mark 100, Pro Epishield Mark100 Golden Yellow R6236, epoxy floor paint for concrete, epoxy floor paint for plastered surfaces, 2K epoxy floor marking paint 6L, industrial epoxy floor coating white yellow, Berger Protecton Catalyst R62CI2, epoxy floor paint Coimbatore',
      ogImageAlt:
        'Berger Protection Pro Epishield Mark 100 Golden Yellow 6L Epoxy Floor Paint Kit (5L Base + 1L Catalyst R62CI2)',
      material: 'Two-Pack (2K) Aliphatic Amine-Cured Epoxy Resin Floor Coating',
      colorSummary: 'Golden Yellow (R6236) & White — High Gloss',
      highlights: [
        'Two-Pack (2K) Aliphatic Amine-Cured Glossy Epoxy Floor Paint for Concrete & Plastered Surfaces',
        'Complete 6L Kit (5L Base + 1L Catalyst R62CI2 · 5:1 v/v Mixing Ratio)',
        'High Volume Solids (54 ± 2%) · 50–55 µm DFT · 9.8–10.8 m²/L (105–116 sq.ft/L) per Coat',
        'High-Gloss Golden Yellow (R6236) & White for Factory Floors, Warehouses & Safety Line Marking',
        '60-Minute Pot Life · 5 Hr Surface Dry · 24 Hr Hard Dry · 3 Days Foot Traffic · 7 Days Full Cure',
      ],
      additionalProperties: [
        { name: 'Brand & Division', value: 'Berger Paints (Berger Protection — Protective Coating Division)' },
        { name: 'Product Type', value: 'Two-Pack (2K) Aliphatic Amine-Cured Epoxy Floor Paint & Marking Coat' },
        { name: 'Recommended Surfaces', value: 'Concrete Floors, Plastered Surfaces & Abraded Aged Epoxy Coatings' },
        { name: 'Available Colors', value: 'Golden Yellow (R6236), White' },
        { name: 'Finish', value: 'High Gloss' },
        { name: 'Pack Size', value: '6 Litres Kit (5L Base + 1L Catalyst R62CI2)' },
        { name: 'Mixing Ratio', value: '5 : 1 (Base : Catalyst by volume)' },
        { name: 'Volume Solids', value: '54 ± 2%' },
        { name: 'Dry Film Thickness (DFT)', value: '50–55 microns per coat (93–102 microns WFT)' },
        { name: 'Theoretical Coverage', value: '9.8–10.8 m²/L (105–116 sq.ft/L) per coat' },
        { name: 'Pot Life (30°C)', value: 'Approx. 60 minutes' },
        { name: 'Drying & Curing (30°C)', value: 'Surface dry 5 hrs · Hard dry 24 hrs · Foot traffic 3 days · Full cure 7 days' },
        { name: 'Overcoating Interval', value: 'Min 12 hours · Max 3 days' },
        { name: 'Substrate Moisture Limit', value: 'Less than 5% on concrete/plastered surfaces' },
      ],
    },
  },
  'berger guideline road and kerb marking 164 floor paint (water based)': {
    productKey: 'berger guideline road and kerb marking 164 floor paint (water based)',
    tagline: 'Single-Pack Water-Based Acrylic Road, Kerb & Floor Marking Paint (Conforms to IS-164 · 20L)',
    heroSummary:
      'Berger Guideline RM 164 is a single-pack, air-drying, 100% water-based acrylic road, kerb, and floor marking paint conforming to IS-164 specifications. Formulated with low VOC (< 30 g/L), rapid 20-minute surface dry, UV and weather resistance, and tough vehicular abrasion durability on concrete, asphalt/bitumen roads, kerbs, parking lots, and industrial walkways. Supplied in 20L packs in White and Yellow.',
    gallery: [
      {
        src: '/assets/aistudio/Berger_Guideline_Road_Marking_Paint_Bucket_f35b7aa2.png',
        alt: 'Berger Guideline RM 164 Water Based Road and Kerb Marking Paint 20L Bucket',
        label: 'Packshot',
        caption: 'Official Berger Guideline RM 164 20L Bucket (Code P34/000) · Available in White & Yellow',
        objectFit: 'contain',
        enableZoom: true,
      },
    ],
    metrics: [
      {
        value: 'IS-164',
        label: 'Water-Based Acrylic',
        detail: 'Single-pack air-drying road, kerb & floor marking paint conforming to IS-164',
      },
      {
        value: '108–150',
        label: 'sq.ft / L (1 Coat)',
        detail: '10–14 m²/L per coat at 25–35 µm DFT (~2,150–3,000 sq.ft per 20L drum)',
      },
      {
        value: '20 Mins',
        label: 'Fast Surface Dry',
        detail: 'Hard dry in ~60 mins · Overcoat in 45–60 mins to minimize traffic downtime',
      },
      {
        value: '< 30 g/L',
        label: 'Low VOC · Water Cleanup',
        detail: 'Eco-friendly water-thinnable formulation · 35 ± 2% volume solids',
      },
    ],
    calculator: {
      coverageTwoCoatsSqFtPerLitre: 65,
      coverageOneCoatSqFtPerLitre: 128,
      unit: 'L',
      coatsLabel: '2 Coats (50–70 µm DFT)',
      hidePrimerOption: true,
      dilutionNote:
        'Official Berger TDS theoretical spreading rate: 10–14 m²/L (108–150 sq.ft/L) per coat at 25–35 µm DFT (~65 sq.ft/L for 2 coats). Use potable tap water only if needed (max 10%–20% by volume) for brush, roller, or airless spray.',
      presets: [
        { label: 'Parking Lot Bays', wallSqFt: 500, subtitle: '~500 sq.ft line & bay area' },
        { label: 'Warehouse Walkways / Kerbs', wallSqFt: 1200, subtitle: '~1,200 sq.ft marking area' },
        { label: 'Campus Driveways & Kerbs', wallSqFt: 2500, subtitle: '~2,500 sq.ft road/kerb area' },
        { label: 'Industrial Yard / Highway Stretch', wallSqFt: 5000, subtitle: '~5,000 sq.ft marking area' },
      ],
    },
    featureCards: [
      {
        eyebrow: '01. Fast-Dry Traffic Efficiency',
        title: 'Surface Dry in ~20 Minutes, Hard Dry in 60 Minutes',
        detail:
          'Air-dries rapidly to minimize lane closures and facility downtime—surface dry in roughly 20 minutes and ready to overcoat in 45–60 minutes under normal ambient conditions.',
      },
      {
        eyebrow: '02. Safer Low-VOC Water-Based System',
        title: 'Low VOC (< 30 g/L) with Tap Water Cleanup',
        detail:
          'Unlike solvent-borne traffic paints, Berger Guideline 164 is water-based with under 30 g/L VOC—eliminating harsh solvent fumes, lowering fire risk, and allowing clean potable-water tool washup.',
      },
      {
        eyebrow: '03. Concrete, Asphalt & Kerb Versatility',
        title: 'Built for Bitumen, Concrete Floors, Kerbs & Airfields',
        detail:
          'Adheres reliably across concrete roads, asphalt/bitumen pavements, roadside kerbs, parking lots, industrial walkways, and airfield runways/taxiways without bitumen bleed-through.',
      },
      {
        eyebrow: '04. Weather, UV & Traffic Durability',
        title: 'IS-164 High-Visibility Smooth Matt Finish',
        detail:
          'Conforms to IS-164 road marking standards with strong UV stability, tropical weather resistance, and abrasion durability in crisp White and Yellow.',
      },
    ],
    specificationsTable: [
      { label: 'Brand & Product', value: 'Berger Paints — Guideline RM 164 Road & Kerb Marking Paint' },
      { label: 'Standard Conformance', value: 'Conforms to IS-164 (IS-164:1981) Specifications' },
      { label: 'Paint Type / Base', value: 'Single-Pack, Air-Drying 100% Water-Based Acrylic' },
      { label: 'Finish', value: 'Smooth & Matt (Non-Glare High Visibility)' },
      { label: 'Available Colors', value: 'White (Code P34/000) & Yellow' },
      { label: 'Pack Size', value: '20 Litres Factory-Sealed Bucket' },
      { label: 'Volume Solids', value: '35 ± 2%' },
      { label: 'Recommended DFT / WFT', value: '25–35 µm DFT / 71–100 µm WFT per coat' },
      { label: 'Theoretical Coverage', value: '10.0–14.0 m²/L (108–150 sq.ft/L) per coat @ 25–35 µm DFT' },
      { label: 'VOC & Lead Safety', value: 'Low VOC (< 30 g/L) · Lead content does not exceed 90 ppm' },
      { label: 'Thinner & Tool Cleaner', value: 'Potable / Tap Water (0%–20% max thinning if required)' },
      { label: 'Application Methods', value: 'Brush, Roller, or Airless Spray' },
      { label: 'Drying Time (Ambient)', value: 'Surface dry ~20 mins · Hard dry ~60 mins · Recoat min 45–60 mins' },
      { label: 'Recommended Applications', value: 'Road Lines, Kerb Marking, Parking Lots, Runways, Crash Barriers & Concrete Floors' },
      { label: 'Surface Conditions', value: 'Moisture < 5% · New concrete cured ≥ 21 days · Temp ≥ 10°C · RH ≤ 85%' },
    ],
    comparison: {
      title: 'Water-Based Guideline 164 vs. Solvent-Based Road Marking Paint',
      subtitle:
        'Practical performance and safety advantages of Berger Guideline RM 164 water-based acrylic marking paint over traditional solvent-based road paints.',
      featuredColumnLabel: 'Berger Guideline 164 (Water-Based)',
      standardColumnLabel: 'Conventional Solvent-Based Road Paint',
      rows: [
        {
          criterion: 'VOC & Site Safety',
          featured: 'Low VOC (< 30 g/L), low odor, non-flammable water-based handling',
          standard: 'High solvent VOC fumes and flammable storage/handling hazards',
        },
        {
          criterion: 'Thinning & Equipment Cleanup',
          featured: 'Potable tap water (0%–20% max) — no expensive chemical thinners needed',
          standard: 'Requires hydrocarbon / xylene thinners for dilution and brush cleanup',
        },
        {
          criterion: 'Asphalt / Bitumen Compatibility',
          featured: 'Water-based acrylic resists bitumen bleed and yellowing on asphalt roads',
          standard: 'Strong solvents can soften fresh asphalt and cause dark bleed-through',
        },
        {
          criterion: 'Drying & Lane Reopening',
          featured: 'Fast ~20 min surface dry · ~60 min hard dry · 45–60 min recoat',
          standard: 'Requires longer solvent flash-off in enclosed parking basements',
        },
        {
          criterion: 'UV & Weather Retention',
          featured: '100% acrylic film resists chalking and UV yellowing outdoors',
          standard: 'Alkyd/solvent binders chalk and yellow faster under intense sun',
        },
      ],
    },
    applicationSteps: {
      title: 'Recommended 4-Step Road, Kerb & Floor Marking Guide',
      subtitle:
        'Follow Berger Protecton surface preparation and application best practices for crisp, long-wearing road, kerb, and concrete floor markings.',
      steps: [
        {
          stepNumber: '01',
          title: 'Clean & Dry Substrate',
          timing: 'Moisture < 5%',
          detail:
            'Remove dust, loose mortar, oil, grease, and curing compounds via wire brushing or high-pressure water washing. Allow new concrete to cure at least 21 days and confirm surface moisture is below 5%.',
        },
        {
          stepNumber: '02',
          title: 'Mask Lines & Stir Well',
          timing: 'Single-pack ready',
          detail:
            'Mark out road lanes, parking bays, or kerb segments cleanly with masking tape. Stir Berger Guideline 164 thoroughly until completely homogeneous—no hardener mixing required.',
        },
        {
          stepNumber: '03',
          title: 'Dilute Minimally (If Needed)',
          timing: '0%–20% clean water',
          detail:
            'Apply straight from the drum or add minimal potable tap water (not exceeding 10%–20% by volume) to suit brush, roller, or airless spray viscosity. Avoid application below 10°C or above 85% RH.',
        },
        {
          stepNumber: '04',
          title: 'Apply & Allow Fast Cure',
          timing: '20 min dry · 60 min recoat',
          detail:
            'Apply evenly at 25–35 µm DFT (71–100 µm WFT) per coat. Allow 45–60 minutes before applying a second coat for heavy-traffic lanes, and ~60 minutes hard dry before reopening to traffic.',
        },
      ],
    },
    faqs: [
      {
        question: 'What is Berger Guideline Road and Kerb Marking 164 (Water Based) used for?',
        answer:
          'Berger Guideline RM 164 is a single-pack water-based acrylic marking paint conforming to IS-164 specifications. It is designed for concrete roads and floors, asphalt/bitumen pavements, roadside kerbs, basement and outdoor parking lots, warehouse walkways, and airfield runways/taxiways.',
      },
      {
        question: 'What are the key advantages of water-based Berger Guideline 164 over solvent-based marking paint?',
        answer:
          'Being 100% water-based acrylic with low VOC (< 30 g/L), it produces minimal odor, avoids fire hazards in basements or enclosed parking lots, cleans up with plain tap water instead of chemical thinners, resists bitumen bleed on asphalt, and retains bright UV-resistant colour outdoors.',
      },
      {
        question: 'What is the price, pack size, and color range of Berger Guideline 164?',
        answer:
          'At Rainbow Paints & Hardwares, Berger Guideline RM 164 Road and Kerb Marking Paint (Water Based) is supplied in 20L factory-sealed buckets at ₹3,361 (20% off ₹4,201 MRP, ~₹168/L incl. of taxes) in White (Code P34/000) and Yellow—ideal for road lines, kerb stripes, parking bays, runways, and crash barriers.',
      },
      {
        question: 'How much area does a 20L drum of Berger Guideline 164 cover?',
        answer:
          'Per official Berger technical specifications, Guideline RM 164 offers a theoretical spreading rate of 10.0–14.0 m²/L (approx. 108–150 sq.ft/L) per coat at 25–35 µm DFT. One 20L drum covers roughly 2,150–3,000 sq.ft in 1 coat depending on surface roughness and porosity.',
      },
      {
        question: 'How fast does Berger Guideline 164 dry and how should it be thinned?',
        answer:
          'It becomes surface dry in approximately 20 minutes and hard dry in about 60 minutes, with a minimum recoating interval of 45–60 minutes. Thin minimally with clean potable tap water only if needed (up to 10%–20% max by volume) for brush, roller, or airless spray.',
      },
      {
        question: 'Can Berger Guideline 164 be applied on both fresh concrete and asphalt surfaces?',
        answer:
          'Yes. It bonds cleanly to both concrete and asphalt/bitumen surfaces. Ensure newly laid concrete cures for at least 21 days, keep substrate moisture below 5%, and thoroughly remove oil, grease, dust, and loose laitance before painting.',
      },
    ],
    seo: {
      title: 'Berger Guideline 164 Road & Kerb Marking Paint - Buy Online',
      description:
        'Mark roads, kerbs, parking lots & concrete floors with Berger Guideline 164 Water-Based Marking Paint (20L). Fast-dry IS-164 acrylic, low VOC, White & Yellow.',
      keywords:
        'Berger Guideline 164, Berger Guideline RM 164, road marking paint, kerb marking paint, water based road marking paint, IS 164 road marking paint, concrete floor marking paint, parking lot marking paint 20L, white yellow kerb paint, Berger road marking paint Coimbatore',
      ogImageAlt:
        'Berger Guideline RM 164 Water Based Road and Kerb Marking Paint 20L Bucket in White and Yellow',
      material: 'Single-Pack 100% Acrylic Water-Based Road & Kerb Marking Paint (IS-164)',
      colorSummary: 'White (P34/000) & Yellow — Smooth Matt High-Visibility Finish',
      highlights: [
        'Single-Pack Water-Based 100% Acrylic Road, Kerb & Floor Marking Paint (Guideline RM 164 · IS-164)',
        'Fast Drying: ~20 Min Surface Dry & ~60 Min Hard Dry to Minimize Traffic Downtime',
        'Low VOC (< 30 g/L), Lead Safe (≤ 90 ppm) & Water-Thinnable for Easy Cleanup',
        'High Coverage: 10–14 m²/L (108–150 sq.ft/L) per Coat @ 25–35 µm DFT (35 ± 2% Volume Solids)',
        'For Road Lines, Kerbs, Parking Lots, Runways, Crash Barriers & Concrete Floors (20L · White & Yellow)',
      ],
      additionalProperties: [
        { name: 'Brand', value: 'Berger Paints India Limited' },
        { name: 'Product Code', value: 'Guideline RM 164 (White Code P34/000)' },
        { name: 'Standard Conformance', value: 'IS-164 (IS-164:1981)' },
        { name: 'Paint Type', value: 'Single-Pack Air-Drying Water-Based Acrylic Marking Paint' },
        { name: 'Recommended Applications', value: 'Road Lines, Kerb Marking, Parking Lots, Runways, Crash Barriers & Concrete Floors' },
        { name: 'Available Colors', value: 'White (P34/000), Yellow' },
        { name: 'Finish', value: 'Smooth & Matt' },
        { name: 'Pack Size', value: '20 Litres Bucket' },
        { name: 'Volume Solids', value: '35 ± 2%' },
        { name: 'Dry Film Thickness (DFT)', value: '25–35 microns per coat (71–100 microns WFT)' },
        { name: 'Theoretical Coverage', value: '10.0–14.0 m²/L (108–150 sq.ft/L) per coat' },
        { name: 'VOC & Lead Safety', value: 'Low VOC (< 30 g/L) · Lead ≤ 90 ppm' },
        { name: 'Thinner & Cleaner', value: 'Potable / Tap Water (0%–20% max thinning)' },
        { name: 'Application Methods', value: 'Brush, Roller, or Airless Spray' },
        { name: 'Drying Time', value: 'Surface dry ~20 mins · Hard dry ~60 mins · Recoat min 45–60 mins' },
      ],
    },
  },
};

const asianPaintsStaticIndex = new Map<string, CatalogProductLike>();
for (const item of mockProducts as CatalogProductLike[]) {
  if (item.brand?.trim().toLowerCase() === 'asian paints' && item.name) {
    asianPaintsStaticIndex.set(item.name.trim().toLowerCase(), item);
  }
}

const staticRichContentCache = new Map<string, RichProductContent>();

export const getRichProductContent = (
  productName?: string,
  productContext?: CatalogProductLike | null
): RichProductContent | null => {
  if (!productName) return null;
  const normalized = productName.trim().toLowerCase();

  // 1. Hand-crafted flagship overrides (e.g. Royale Luxury Emulsion) always take precedence untouched
  if (RICH_PRODUCT_CONTENT[normalized]) {
    return RICH_PRODUCT_CONTENT[normalized];
  }

  // 2. Asian Paints full catalog rich product pages (strictly verified specs & real catalog data)
  const staticMatch = asianPaintsStaticIndex.get(normalized);
  const contextBrand = productContext?.brand?.trim().toLowerCase();

  if (productContext && contextBrand && contextBrand !== 'asian paints') {
    return null;
  }

  if (productContext && contextBrand === 'asian paints') {
    const merged: CatalogProductLike = staticMatch
      ? {
          ...staticMatch,
          ...productContext,
          properties:
            productContext.properties && productContext.properties.length > 0
              ? productContext.properties
              : staticMatch.properties,
          sizes:
            productContext.sizes && productContext.sizes.length > 0
              ? productContext.sizes
              : staticMatch.sizes,
          sizePrices: productContext.sizePrices || staticMatch.sizePrices,
          unit: productContext.unit || staticMatch.unit,
          image: productContext.image || staticMatch.image,
        }
      : productContext;
    return buildAsianPaintsRichContent(merged);
  }

  if (staticMatch) {
    const cached = staticRichContentCache.get(normalized);
    if (cached) return cached;
    const built = buildAsianPaintsRichContent(staticMatch);
    staticRichContentCache.set(normalized, built);
    return built;
  }

  return null;
};
