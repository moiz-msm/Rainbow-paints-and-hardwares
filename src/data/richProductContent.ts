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
  presets: {
    label: string;
    wallSqFt: number;
    subtitle: string;
  }[];
}

export interface RichProductContent {
  productKey: string;
  tagline: string;
  heroSummary: string;
  gallery: ProductGalleryImage[];
  metrics: ProductKeyMetric[];
  calculator: PaintCalculatorConfig;
  editorialSections: EditorialFeatureSection[];
  macroStudy: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    specs: { label: string; value: string }[];
  };
  comparison: {
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
};

export const getRichProductContent = (productName?: string): RichProductContent | null => {
  if (!productName) return null;
  const normalized = productName.trim().toLowerCase();
  return RICH_PRODUCT_CONTENT[normalized] || null;
};
