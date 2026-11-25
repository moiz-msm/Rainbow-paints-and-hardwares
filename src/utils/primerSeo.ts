export type WaterBasedPrimerRole = 'interior' | 'exterior' | 'both';

export interface WaterBasedPrimerSeoConfig {
  role: WaterBasedPrimerRole;
  /** Updated catalog product name displayed on cards, H1, cart & JSON-LD */
  productName: string;
  /** Preserved canonical URL slug so existing Google-indexed URLs never break */
  canonicalSlug: string;
  /** Alternate legacy product names (e.g., cached in Firestore) that map to this entry */
  aliases?: string[];
  /** Natural, clean SEO page <title> with exterior/interior primer integrated directly */
  seoTitle: string;
  /** Natural branded product name for SEO descriptions & Google Shopping feed */
  seoDisplayName: string;
  /** Benefit-focused SEO meta description (strictly <= 158 chars) */
  seoDescription: string;
}

/**
 * Strictly verified catalog of all 23 water-based interior, exterior, and dual (2-in-1)
 * masonry wall primers across all stocked brands.
 *
 * Excluded intentionally:
 * - Solvent-thinnable wall primers (TruCare Solvent Thinnable, BP Cement Primer Solvent Based, MRF Solvent Thinnable)
 * - Metal primers (Red Oxide, Zinc Yellow, Zinc Chromate, Zinc Phosphate, Epoxy / PU Metal Primers)
 * - Wood primers & sanding sealers
 * - Wall putties, fillers, terrace tile primers & decorative texture primers
 */
const PRIMER_CONFIG_LIST: WaterBasedPrimerSeoConfig[] = [
  // === WATER-BASED INTERIOR PRIMERS (9) ===
  {
    role: 'interior',
    productName: 'Decoprime Interior Wall Primer',
    canonicalSlug: 'decoprime-wall-primer',
    aliases: ['Decoprime Wall Primer'],
    seoTitle: 'Decoprime Interior Wall Primer by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints Decoprime Interior Wall Primer',
    seoDescription:
      'Prepare walls with Asian Paints Decoprime Interior Wall Primer, a water-based interior primer with high opacity & strong grip for smooth interior paint.',
  },
  {
    role: 'interior',
    productName: 'Decoprime Interior Wall Primer Advanced - Water Thinnable',
    canonicalSlug: 'decoprime-interior-wall-primer-advanced-water-thinnable',
    seoTitle: 'Decoprime Interior Wall Primer Advanced (Water Based) by Asian Paints',
    seoDisplayName: 'Asian Paints Decoprime Interior Wall Primer Advanced',
    seoDescription:
      'Buy Asian Paints Decoprime Interior Wall Primer Advanced, a water-based interior primer offering high opacity, alkali resistance & lasting interior paint.',
  },
  {
    role: 'interior',
    productName: 'Royale Wall Base Coat Interior Primer',
    canonicalSlug: 'royale-wall-base-coat',
    aliases: ['Royale Wall Base Coat'],
    seoTitle: 'Royale Wall Base Coat Interior Primer by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints Royale Wall Base Coat Interior Primer',
    seoDescription:
      'Shop Asian Paints Royale Wall Base Coat Interior Primer, a water-based interior primer for superior whiteness, smoothness & rich Royale interior paint.',
  },
  {
    role: 'interior',
    productName: 'TruCare Interior Wall Primer - Water thinnable',
    canonicalSlug: 'trucare-interior-wall-primer-water-thinnable',
    seoTitle: 'TruCare Interior Wall Primer (Water Based) by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints TruCare Interior Wall Primer (Water Based)',
    seoDescription:
      'Buy Asian Paints TruCare Interior Wall Primer, a fast-drying water-based interior primer with whiteness & alkali resistance for smooth interior paint.',
  },
  {
    role: 'interior',
    productName: 'TruCare Sparc Ultraa Interior Primer- Water Thinnable',
    canonicalSlug: 'trucare-sparc-ultraa-interior-primer-water-thinnable',
    seoTitle: 'TruCare Sparc Ultraa Interior Primer (Water Based) by Asian Paints',
    seoDisplayName: 'Asian Paints TruCare Sparc Ultraa Interior Primer',
    seoDescription:
      'Shop Asian Paints TruCare Sparc Ultraa Interior Primer, an economical water-based interior primer for better opacity & adhesion under interior paint.',
  },
  {
    role: 'interior',
    productName: 'TruCare Sparc Interior Primer-water Thinnable',
    canonicalSlug: 'trucare-sparc-interior-primer-water-thinnable',
    seoTitle: 'TruCare Sparc Interior Primer (Water Based) by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints TruCare Sparc Interior Primer',
    seoDescription:
      'Buy Asian Paints TruCare Sparc Interior Primer, a budget-friendly water-based interior primer delivering whiteness & strong adhesion for interior paint.',
  },
  {
    role: 'interior',
    productName: 'SmartCare Damp Sheath Interior Primer',
    canonicalSlug: 'smartcare-damp-sheath-interior',
    aliases: ['SmartCare Damp Sheath Interior'],
    seoTitle: 'SmartCare Damp Sheath Interior Primer by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints SmartCare Damp Sheath Interior Primer',
    seoDescription:
      'Block dampness with Asian Paints SmartCare Damp Sheath Interior Primer, a water-based waterproofing interior primer with 3-year warranty for interior paint.',
  },
  {
    role: 'interior',
    productName: 'SmartCare Damp Sheath Interior Primer Advanced',
    canonicalSlug: 'smartcare-damp-sheath-interior-advanced',
    aliases: ['SmartCare Damp Sheath Interior Advanced'],
    seoTitle: 'SmartCare Damp Sheath Interior Primer Advanced by Asian Paints',
    seoDisplayName: 'Asian Paints SmartCare Damp Sheath Interior Primer Advanced',
    seoDescription:
      'Protect walls with Asian Paints SmartCare Damp Sheath Interior Primer Advanced, a water-based interior primer with 3-year warranty for interior paint.',
  },
  {
    role: 'interior',
    productName: 'BP White Interior Primer (Water Based)',
    canonicalSlug: 'bp-white-primer-(water-based)',
    aliases: ['BP White Primer (Water Based)', 'BP White Primer'],
    seoTitle: 'BP White Primer (Water Based) by Berger Paints - Buy Online',
    seoDisplayName: 'Berger BP White Primer',
    seoDescription:
      'Buy Berger BP White Primer, a fast-drying acrylic interior primer with high opacity & strong plaster grip for interior paint.',
  },
  {
    role: 'both',
    productName: 'Dampstop Duo Interior and Exterior Waterproof Primer',
    canonicalSlug: 'dampstop-duo-interior-and-exterior-waterproof-primer',
    aliases: ['Home Shield Dampstop', 'Dampstop Duo'],
    seoTitle: 'Dampstop Duo Interior and Exterior Waterproof Primer by Berger',
    seoDisplayName: 'Berger Dampstop Duo Interior and Exterior Waterproof Primer',
    seoDescription:
      'Protect walls with Berger Dampstop Duo Interior and Exterior Waterproof Primer, a dual-action waterproofing primer for interior paint and exterior paint.',
  },
  {
    role: 'both',
    productName: 'Seal O Prime Interior and Exterior Waterproof Primer',
    canonicalSlug: 'seal-o-prime-interior-and-exterior-waterproof-primer',
    aliases: ['Seal O Prime'],
    seoTitle: 'Seal O Prime Interior and Exterior Waterproof Primer by Berger',
    seoDisplayName: 'Berger Seal O Prime Interior and Exterior Waterproof Primer',
    seoDescription:
      'Shop Berger Seal O Prime Interior and Exterior Waterproof Primer for ultimate alkali & damp protection on interior paint and exterior paint.',
  },
  {
    role: 'both',
    productName: 'Walmasta Primer - Interior and Exterior Primer',
    canonicalSlug: 'walmasta-primer-interior-and-exterior-primer',
    aliases: ['Walmasta Primer'],
    seoTitle: 'Walmasta Primer (Interior and Exterior Primer) by Berger - Buy Online',
    seoDisplayName: 'Berger Walmasta Primer - Interior and Exterior Primer',
    seoDescription:
      'Buy Berger Walmasta Primer (Interior and Exterior Primer), a water-based primer delivering superior adhesion for interior paint and exterior paint.',
  },
  {
    role: 'exterior',
    productName: 'Dampshield Exterior Primer',
    canonicalSlug: 'dampshield-exterior-primer',
    aliases: ['Dampshield Exterior Primer'],
    seoTitle: 'Dampshield Exterior Primer by Berger Paints - Buy Online',
    seoDisplayName: 'Berger Dampshield Exterior Primer',
    seoDescription:
      'Protect masonry with Berger Dampshield Exterior Primer, a high-performance damp-resistant water-based exterior primer for durable exterior paint.',
  },

  // === WATER-BASED EXTERIOR PRIMERS (10) ===
  {
    role: 'exterior',
    productName: 'WeatherCoat Exterior Primer',
    canonicalSlug: 'weathercoat-exterior-primer',
    seoTitle: 'WeatherCoat Exterior Primer by Berger Paints - Buy Online',
    seoDisplayName: 'Berger WeatherCoat Exterior Primer',
    seoDescription:
      'Protect walls with Berger WeatherCoat Exterior Primer, a water-based exterior primer resisting alkali & efflorescence for long-lasting exterior paint.',
  },
  {
    role: 'exterior',
    productName: 'TruCare Exterior Wall Primer',
    canonicalSlug: 'trucare-exterior-wall-primer',
    seoTitle: 'TruCare Exterior Wall Primer by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints TruCare Exterior Wall Primer',
    seoDescription:
      'Prep masonry with Asian Paints TruCare Exterior Wall Primer, a water-based exterior primer resisting alkali & peeling for durable exterior paint.',
  },
  {
    role: 'exterior',
    productName: 'TruCare Exterior Wall Primer Advanced',
    canonicalSlug: 'trucare-exterior-wall-primer-advanced',
    seoTitle: 'TruCare Exterior Wall Primer Advanced by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints TruCare Exterior Wall Primer Advanced',
    seoDescription:
      'Buy Asian Paints TruCare Exterior Wall Primer Advanced, a water-based exterior primer with higher opacity & adhesion for long-lasting exterior paint.',
  },
  {
    role: 'exterior',
    productName: 'TruCare Sparc Ultraa Exterior Primer',
    canonicalSlug: 'trucare-sparc-ultraa-exterior-primer',
    seoTitle: 'TruCare Sparc Ultraa Exterior Primer by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints TruCare Sparc Ultraa Exterior Primer',
    seoDescription:
      'Shop Asian Paints TruCare Sparc Ultraa Exterior Primer, a value water-based exterior primer delivering strong opacity & grip for exterior paint.',
  },
  {
    role: 'exterior',
    productName: 'TruCare Sparc Exterior Primer',
    canonicalSlug: 'trucare-sparc-exterior-primer',
    seoTitle: 'TruCare Sparc Exterior Primer by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints TruCare Sparc Exterior Primer',
    seoDescription:
      'Buy Asian Paints TruCare Sparc Exterior Primer, an economical water-based exterior primer with reliable whiteness & adhesion for exterior paint.',
  },
  {
    role: 'exterior',
    productName: 'Damp Sheath Exterior Primer',
    canonicalSlug: 'damp-sheath-exterior',
    aliases: ['Damp Sheath Exterior'],
    seoTitle: 'Damp Sheath Exterior Primer by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints Damp Sheath Exterior Primer',
    seoDescription:
      'Shield facades with Asian Paints Damp Sheath Exterior Primer, a water-based waterproofing exterior primer with 5-year warranty for exterior paint.',
  },
  {
    role: 'exterior',
    productName: 'SmartCare Damp Sheath Exterior Primer Advanced',
    canonicalSlug: 'smartcare-damp-sheath-exterior-advanced',
    aliases: ['SmartCare Damp Sheath Exterior Advanced'],
    seoTitle: 'SmartCare Damp Sheath Exterior Primer Advanced by Asian Paints',
    seoDisplayName: 'Asian Paints SmartCare Damp Sheath Exterior Primer Advanced',
    seoDescription:
      'Buy Asian Paints SmartCare Damp Sheath Exterior Primer Advanced, a water-based exterior primer with crack bridging & 5-year warranty for exterior paint.',
  },
  {
    role: 'exterior',
    productName: 'SmartCare Primero Exterior Primer',
    canonicalSlug: 'smartcare-primero',
    aliases: ['SmartCare Primero'],
    seoTitle: 'SmartCare Primero Exterior Primer by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints SmartCare Primero Exterior Primer',
    seoDescription:
      'Buy Asian Paints SmartCare Primero Exterior Primer, a water-based silicone exterior primer-sealer for strong sealing & higher exterior paint coverage.',
  },
  {
    role: 'exterior',
    productName: 'Damp Secure Exterior Primer',
    canonicalSlug: 'damp-secure',
    aliases: ['Damp Secure'],
    seoTitle: 'Damp Secure Exterior Primer by Asian Paints - Buy Online',
    seoDisplayName: 'Asian Paints Damp Secure Exterior Primer',
    seoDescription:
      'Protect walls with Asian Paints Damp Secure Exterior Primer, a water-based waterproofing exterior primer with 3-year warranty for exterior paint.',
  },
  {
    role: 'exterior',
    productName: 'AquaFresh DampGarde Exterior Primer',
    canonicalSlug: 'aquafresh-dampgarde',
    aliases: ['AquaFresh DampGarde'],
    seoTitle: 'MRF AquaFresh DampGarde Exterior Primer - Buy Online',
    seoDisplayName: 'MRF AquaFresh DampGarde Exterior Primer',
    seoDescription:
      'Protect facades with MRF AquaFresh DampGarde Exterior Primer, a water-based waterproofing exterior primer with anti-efflorescence grip for exterior paint.',
  },

  // === WATER-BASED 2-IN-1 / DUAL INTERIOR & EXTERIOR WALL PRIMERS (4) ===
  {
    role: 'both',
    productName: 'MRF Altura 2-in-1 Interior and Exterior Wall Primer',
    canonicalSlug: 'mrf-altura-2-in-1-wall-primer',
    aliases: ['MRF Altura 2-in-1 Wall Primer'],
    seoTitle: 'MRF Altura 2-in-1 Interior and Exterior Wall Primer - Buy Online',
    seoDisplayName: 'MRF Altura 2-in-1 Interior and Exterior Wall Primer',
    seoDescription:
      'Buy MRF Altura 2-in-1 Interior and Exterior Wall Primer, a GreenPro water-based interior & exterior primer for high opacity under interior & exterior paint.',
  },
  {
    role: 'both',
    productName: 'MRF Sello 2-in-1 Interior and Exterior Wall Primer',
    canonicalSlug: 'mrf-sello-2-in-1-wall-primer',
    aliases: ['MRF Sello 2-in-1 Wall Primer'],
    seoTitle: 'MRF Sello 2-in-1 Interior and Exterior Wall Primer - Buy Online',
    seoDisplayName: 'MRF Sello 2-in-1 Interior and Exterior Wall Primer',
    seoDescription:
      'Shop MRF Sello 2-in-1 Interior and Exterior Wall Primer, a water-based interior & exterior primer resisting moisture & alkali under wall paint.',
  },
  {
    role: 'both',
    productName: 'MRF AquaFresh PU Interior and Exterior Wall Primer',
    canonicalSlug: 'mrf-aquafresh-pu-wall-primer',
    aliases: ['MRF AquaFresh PU Wall Primer'],
    seoTitle: 'MRF AquaFresh PU Interior and Exterior Wall Primer - Buy Online',
    seoDisplayName: 'MRF AquaFresh PU Interior and Exterior Wall Primer',
    seoDescription:
      'Buy MRF AquaFresh PU Interior and Exterior Wall Primer, a water-based PUD interior & exterior primer enhancing adhesion & sheen of exterior & interior paint.',
  },
  {
    role: 'both',
    productName: '604 PRIMESEAL Interior and Exterior Wall Primer',
    canonicalSlug: '604-primeseal',
    aliases: ['604 PRIMESEAL'],
    seoTitle: 'Dr. Fixit 604 PRIMESEAL Interior and Exterior Wall Primer - Buy Online',
    seoDisplayName: 'Dr. Fixit 604 PRIMESEAL Interior and Exterior Wall Primer',
    seoDescription:
      'Buy Dr. Fixit 604 PRIMESEAL Interior and Exterior Wall Primer, a water-based penetrating interior & exterior primer resisting efflorescence under wall paint.',
  },
];

function cleanSpace(text: string): string {
  return text.replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim();
}

export const WATER_BASED_WALL_PRIMER_CONFIG: Record<string, WaterBasedPrimerSeoConfig> = {};
for (const entry of PRIMER_CONFIG_LIST) {
  WATER_BASED_WALL_PRIMER_CONFIG[cleanSpace(entry.productName).toLowerCase()] = entry;
  if (entry.aliases) {
    for (const alias of entry.aliases) {
      WATER_BASED_WALL_PRIMER_CONFIG[cleanSpace(alias).toLowerCase()] = entry;
    }
  }
}

export function getWaterBasedWallPrimerConfig(productName?: string | null): WaterBasedPrimerSeoConfig | null {
  if (!productName) return null;
  const key = cleanSpace(productName).toLowerCase();
  return WATER_BASED_WALL_PRIMER_CONFIG[key] ?? null;
}

export function getWaterBasedWallPrimerRole(productName?: string | null): WaterBasedPrimerRole | null {
  return getWaterBasedWallPrimerConfig(productName)?.role ?? null;
}

/**
 * Normalizes a product's name to its SEO-optimized Exterior/Interior Primer product name
 * while preserving its canonical URL slug (handles both Firestore-cached old names and mockProducts).
 */
export function applyWaterBasedPrimerNameNormalization<T extends { name?: string; slug?: string }>(product: T): T {
  const config = getWaterBasedWallPrimerConfig(product?.name);
  if (!config) return product;
  return {
    ...product,
    name: config.productName,
    slug: product.slug || config.canonicalSlug,
  };
}

export function getWaterBasedPrimerBadgeLabel(role: WaterBasedPrimerRole): string {
  if (role === 'interior') return 'Water-Based Interior Primer';
  if (role === 'exterior') return 'Water-Based Exterior Primer';
  return 'Water-Based Interior and Exterior Wall Primer';
}

export function getWaterBasedPrimerApplicationSurface(role: WaterBasedPrimerRole): string {
  if (role === 'interior') return 'Interior Plastered & Putty Masonry Walls';
  if (role === 'exterior') return 'Exterior Cement Plaster & Masonry Walls';
  return 'Interior & Exterior Masonry Plastered Walls';
}

/**
 * Returns the clean, naturally integrated SEO page <title> for verified water-based wall primers.
 */
export function buildWaterBasedPrimerTitle(
  productName: string,
  brand: string | undefined,
  role: WaterBasedPrimerRole
): string {
  const config = getWaterBasedWallPrimerConfig(productName);
  if (config) return config.seoTitle;

  const cleanName = cleanSpace(productName);
  const cleanBrand = cleanSpace(brand || '');
  const label =
    role === 'interior'
      ? 'Interior Primer'
      : role === 'exterior'
        ? 'Exterior Primer'
        : 'Interior and Exterior Wall Primer';
  return cleanBrand ? `${cleanName} ${label} by ${cleanBrand} - Buy Online` : `${cleanName} ${label} - Buy Online`;
}

/**
 * Returns the clean, benefit-focused SEO meta description (strictly <= 158 chars)
 * targeting exterior primer / exterior paint and interior primer / interior paint keywords.
 */
export function buildWaterBasedPrimerDescription(
  productName: string,
  brand: string | undefined,
  role: WaterBasedPrimerRole,
  _benefitSnippet?: string
): string {
  const config = getWaterBasedWallPrimerConfig(productName);
  if (config) return config.seoDescription;

  const cleanName = cleanSpace(productName);
  const cleanBrand = cleanSpace(brand || '');
  const branded = cleanBrand ? `${cleanBrand} ${cleanName}` : cleanName;
  if (role === 'exterior') {
    return `Buy ${branded}, a water-based exterior primer for strong alkali resistance & lasting exterior paint finishes. Genuine factory-sealed packs.`;
  }
  if (role === 'interior') {
    return `Buy ${branded}, a water-based interior primer for high opacity, alkali sealing & smooth interior paint finishes. Genuine factory-sealed packs.`;
  }
  return `Buy ${branded}, a water-based interior and exterior wall primer for strong masonry adhesion under interior & exterior paint. Genuine packs.`;
}

/**
 * Builds keyword metadata targeting exterior primer, exterior paint, interior primer & interior paint.
 */
export function buildWaterBasedPrimerKeywords(
  productName: string,
  brand: string | undefined,
  role: WaterBasedPrimerRole,
  extraKeywords: string[] = []
): string {
  const config = getWaterBasedWallPrimerConfig(productName);
  const cleanName = cleanSpace(productName);
  const cleanBrand = cleanSpace(brand || '');
  const displayName = config?.seoDisplayName || (cleanBrand ? `${cleanBrand} ${cleanName}` : cleanName);
  const brandShort = cleanBrand.replace(/\s+Paints$/i, '').trim();

  const coreKeywords: string[] = [];
  if (role === 'interior' || role === 'both') {
    coreKeywords.push(
      'interior primer',
      'water based interior primer',
      'interior wall primer',
      'interior paint primer',
      'interior paint',
      ...(cleanBrand && cleanBrand.toLowerCase() !== 'local'
        ? [`${cleanBrand} interior primer`, ...(brandShort !== cleanBrand ? [`${brandShort} interior primer`] : [])]
        : [])
    );
  }
  if (role === 'exterior' || role === 'both') {
    coreKeywords.push(
      'exterior primer',
      'water based exterior primer',
      'exterior wall primer',
      'exterior paint primer',
      'exterior paint',
      ...(cleanBrand && cleanBrand.toLowerCase() !== 'local'
        ? [`${cleanBrand} exterior primer`, ...(brandShort !== cleanBrand ? [`${brandShort} exterior primer`] : [])]
        : [])
    );
  }
  if (role === 'both') {
    coreKeywords.push(
      '2 in 1 interior and exterior wall primer',
      'interior and exterior wall primer',
      '2 in 1 wall primer'
    );
  }

  const all = [
    displayName,
    `${displayName} price`,
    `buy ${displayName} online`,
    ...coreKeywords,
    cleanName,
    ...(config?.aliases || []),
    ...extraKeywords,
    'wall primer Coimbatore',
    'Rainbow Paints',
  ]
    .map((k) => cleanSpace(k))
    .filter(Boolean);

  return [...new Set(all)].join(', ');
}

/**
 * Concise, visible on-page opening summary for water-based wall primers so on-page content
 * aligns naturally with the product name, SEO title, and description.
 */
export function buildWaterBasedPrimerHeroSummary(
  productName: string,
  brand: string | undefined,
  role: WaterBasedPrimerRole,
  properties?: string[]
): string {
  const config = getWaterBasedWallPrimerConfig(productName);
  const displayName = config?.seoDisplayName || (brand ? `${brand} ${productName}` : productName);
  const roleDesc =
    role === 'interior'
      ? 'water-based interior primer for interior paint'
      : role === 'exterior'
        ? 'water-based exterior primer for exterior paint'
        : 'water-based interior and exterior wall primer for interior and exterior paint';

  const cleanProps = (properties || [])
    .map((p) => cleanSpace(p).replace(/\.$/, ''))
    .filter(Boolean)
    .slice(0, 2);

  if (cleanProps.length >= 2) {
    return `${displayName} is a genuine ${roleDesc} engineered for ${cleanProps[0].toLowerCase()} and ${cleanProps[1].toLowerCase()}, creating a uniform, high-adhesion masonry foundation.`;
  }
  if (cleanProps.length === 1) {
    return `${displayName} is a genuine ${roleDesc} delivering ${cleanProps[0].toLowerCase()} for reliable adhesion and longer-lasting wall paint finishes.`;
  }
  return `${displayName} is a genuine ${roleDesc} formulated to seal porous cement plaster, resist alkalinity, and maximize emulsion coverage.`;
}

/**
 * Formats Google Merchant Center feed title cleanly using the natural SEO product display name.
 */
export function buildWaterBasedPrimerFeedTitle(
  brandedName: string,
  sizeLabel: string,
  role: WaterBasedPrimerRole,
  productName?: string
): string {
  const config = getWaterBasedWallPrimerConfig(productName || brandedName);
  if (config) {
    return `${config.seoDisplayName} - ${sizeLabel}`;
  }
  const tag =
    role === 'interior'
      ? 'Interior Primer'
      : role === 'exterior'
        ? 'Exterior Primer'
        : 'Interior and Exterior Wall Primer';
  return `${cleanSpace(brandedName)} ${tag} - ${sizeLabel}`;
}
