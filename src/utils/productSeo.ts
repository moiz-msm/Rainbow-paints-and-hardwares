import { getRichProductContent, RichProductContent } from '../data/richProductContent';

export interface SeoProductInput {
  id?: string | number;
  name: string;
  slug?: string;
  brand?: string;
  topCategory?: string;
  subCategory?: string;
  category?: string;
  price?: string;
  basePrice?: number;
  sizes?: number[];
  sizePrices?: Record<number, number>;
  unit?: string;
  properties?: string[];
  description?: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export interface GeneratedProductSeo {
  title: string;
  description: string;
  keywords: string;
  imageAlt: string;
  highlights: string[];
  additionalProperties: { name: string; value: string }[];
  faqs: { question: string; answer: string }[];
  richContent: RichProductContent | null;
}

const BRAND_LEAD_ALIASES: Record<string, string[]> = {
  'asian paints': ['asian paints'],
  'berger paints': ['berger', 'berger paints'],
  'mrf vapocure': ['mrf', 'mrf vapocure'],
  'dr. fixit': ['dr. fixit', 'dr fixit'],
  'birla white': ['birla white', 'birla'],
  'fevicol': ['fevicol'],
  'sheenlac': ['sheenlac'],
  'just spray': ['just spray'],
  'ajax': ['ajax'],
  'bawa': ['bawa'],
  'jaya': ['jaya'],
  'gorila': ['gorila'],
  'local': [],
};

function cleanWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function productStartsWithBrand(name: string, brand: string): boolean {
  const lowerName = name.trim().toLowerCase();
  const lowerBrand = brand.trim().toLowerCase();
  if (!lowerBrand || lowerBrand === 'local') return true;
  if (lowerName.includes(lowerBrand)) return true;
  const aliases = BRAND_LEAD_ALIASES[lowerBrand] || [lowerBrand];
  return aliases.some(
    (alias) =>
      lowerName.startsWith(`${alias} `) ||
      lowerName.startsWith(`${alias}-`) ||
      lowerName === alias ||
      lowerName.includes(` ${alias} `)
  );
}

/**
 * Formats natural product display name including brand when not already present.
 * Example: "Asian Paints Royale Luxury Emulsion" or "Berger Red Oxide Primer"
 */
export function getBrandedProductName(name: string, brand?: string): string {
  const cleanName = cleanWhitespace(name || 'Paint Product');
  const cleanBrand = cleanWhitespace(brand || '');
  if (!cleanBrand || cleanBrand.toLowerCase() === 'local' || productStartsWithBrand(cleanName, cleanBrand)) {
    return cleanName;
  }
  return `${cleanBrand} ${cleanName}`;
}

/**
 * Standardized high-CTR product page title:
 * "{Product Name} by {Brand} - Buy Online"
 * Avoids repeating brand when the product name already contains the brand (or brand is Local).
 */
export function buildProductSeoTitle(product: SeoProductInput): string {
  const richContent = getRichProductContent(product.name, product);
  if (richContent?.seo?.title) {
    return richContent.seo.title;
  }

  const cleanName = cleanWhitespace(product.name || 'Paint Product');
  const cleanBrand = cleanWhitespace(product.brand || '');

  if (!cleanBrand || cleanBrand.toLowerCase() === 'local' || productStartsWithBrand(cleanName, cleanBrand)) {
    return `${cleanName} - Buy Online`;
  }
  return `${cleanName} by ${cleanBrand} - Buy Online`;
}

const PRESERVED_TOKENS = new Set([
  'PU', '2K', '1K', 'UV', 'VOC', 'PVC', 'GI', 'MS', 'HD', 'BWR', 'QD', 'HB',
  'NC', 'RAL', 'HOR', 'DPC', 'SBR', 'EPDM', 'MRF', 'JIS', 'ASTM', 'LEED',
  'LED', 'DIY', 'AC', 'DC', 'SS', 'PP', 'PE', 'UPVC', 'CPVC', 'RCC', 'GP',
  'Teflon', 'Teflon™', 'Teflon®', 'Berger', 'Asian', 'Paints', 'Fixit', 'Dr.',
  'Green', 'Assure', 'Italian', 'Dholpur', 'Granite', 'Marble', 'Velvet',
]);

function normalizeBenefitPhrase(raw: string): string {
  // Handle hyphenated words and ALL-CAPS strings gracefully
  const words = raw.split(' ').map((token) => {
    const cleanWord = token.replace(/[^a-zA-Z0-9™®.]/g, '');
    if (PRESERVED_TOKENS.has(token) || PRESERVED_TOKENS.has(cleanWord)) {
      return token;
    }
    // Preserve short unit/numeric tokens like 750W, 120°C, 2hr, 3D
    if (/^\d+[a-zA-Z°%]+$/.test(token) || /^[23]D$/i.test(token)) {
      return token;
    }
    // Handle hyphenated words like Anti-Bubble, High-Tension, Two-Pack
    if (token.includes('-')) {
      return token
        .split('-')
        .map((part) => {
          if (PRESERVED_TOKENS.has(part)) return part;
          return part.toLowerCase();
        })
        .join('-');
    }
    // Convert ALL-CAPS or Title Case words to lowercase
    return token.toLowerCase();
  });

  return words.join(' ');
}

/**
 * Turns raw product property bullets into clean, human-readable benefit phrases
 * suitable for click-worthy Google meta descriptions (stripping technical spec dumps).
 */
function extractHumanBenefits(properties?: string[]): string[] {
  if (!Array.isArray(properties) || properties.length === 0) return [];

  const seen = new Set<string>();
  const benefits: string[] = [];

  for (const rawProp of properties) {
    if (!rawProp || typeof rawProp !== 'string') continue;

    // Split on pipes and pick the most benefit-oriented clause
    const segments = rawProp.split('|').map((s) => s.trim()).filter(Boolean);
    for (let seg of segments) {
      // Skip pure technical / pricing / numeric spec segments in meta descriptions
      if (
        /^(coverage|surface dry|recoat|recoating|dilution|thinner|pack|available in|code|batch|mrp|mixing ratio|pot life|dft|volume solids|flash point|viscosity|specific gravity|is[:\s-]?\d)/i.test(
          seg
        )
      ) {
        continue;
      }
      if (/[₹]|sq\.?\s*ft|m²|microns?|\b\d+\s*:\s*\d+\b/i.test(seg)) {
        continue;
      }

      // Remove parenthetical technical notes like (ASTM D 6886) or (Code 052991)
      seg = seg
        .replace(/\([^)]*(?:ASTM|JIS|IS[:\s]?\d|Code|LEED|CFTRI|USFDA|P\d+|R\d+|\d+L|\d+ml|\d+°C)[^)]*\)/gi, '')
        .replace(/\s+[—–-]\s+.*$/, (match) => (seg.length > 52 ? '' : match))
        .replace(/[.!?,;:\s&]+$/, '')
        .trim();

      seg = cleanWhitespace(seg);
      // Skip tiny 1-word fragments like "Smooth" or overly long technical paragraphs
      if (seg.length < 7 || seg.length > 58) continue;
      if (!seg.includes(' ') && seg.length < 10) continue;

      const phrase = normalizeBenefitPhrase(seg);
      const dedupeKey = phrase.toLowerCase();

      if (!seen.has(dedupeKey)) {
        seen.add(dedupeKey);
        benefits.push(phrase);
      }
      if (benefits.length >= 4) break;
    }
    if (benefits.length >= 4) break;
  }

  return benefits;
}

function joinBenefits(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} & ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} & ${items[items.length - 1]}`;
}

function getCategoryLeadSentence(product: SeoProductInput, brandedName: string): {
  lead: string;
  verb: string;
  fallbackCloser: string;
} {
  const sub = (product.subCategory || product.category || product.topCategory || '').toLowerCase();
  const nameLower = (product.name || '').toLowerCase();

  if (sub.includes('interior texture')) {
    return {
      lead: `Create distinctive, designer interior feature walls with ${brandedName}.`,
      verb: 'Brings',
      fallbackCloser: 'Crafted for rich depth, tactile character & lasting indoor beauty.',
    };
  }
  if (sub.includes('exterior texture')) {
    return {
      lead: `Give exterior facades rich architectural texture with ${brandedName}.`,
      verb: 'Offers',
      fallbackCloser: 'Designed for standout wall patterns & tough outdoor weather durability.',
    };
  }
  if (sub.includes('interior paint')) {
    return {
      lead: `Elevate your interior walls with ${brandedName}.`,
      verb: 'Delivers',
      fallbackCloser: 'Smooth, lasting indoor beauty in genuine factory-sealed packs.',
    };
  }
  if (sub.includes('exterior paint')) {
    return {
      lead: `Protect and beautify exterior walls with ${brandedName}.`,
      verb: 'Offers',
      fallbackCloser: 'Built for lasting outdoor colour, rain resistance & curb appeal.',
    };
  }
  if (sub.includes('waterproof')) {
    return {
      lead: `Shield roofs, walls & wet spaces from dampness with ${brandedName}.`,
      verb: 'Delivers',
      fallbackCloser: 'Dependable waterproofing protection for lasting home peace of mind.',
    };
  }
  if (sub.includes('wood finish') || (sub.includes('pu paint') && nameLower.includes('wood'))) {
    return {
      lead: `Bring out rich grain and lasting protection on wood with ${brandedName}.`,
      verb: 'Crafted for',
      fallbackCloser: 'Ideal for wooden doors, furniture & fine interiors.',
    };
  }
  if (sub.includes('pu paint')) {
    return {
      lead: `Give metal, wood & tough surfaces a durable polyurethane finish with ${brandedName}.`,
      verb: 'Delivers',
      fallbackCloser: 'Built for superior gloss, weather durability & everyday wear resistance.',
    };
  }
  if (sub.includes('enamel')) {
    return {
      lead: `Give metal gates, grills & wooden surfaces a tough, rich finish with ${brandedName}.`,
      verb: 'Features',
      fallbackCloser: 'Trusted protection against everyday wear, moisture & rust.',
    };
  }
  if (sub.includes('primer')) {
    const isMetal = /metal|oxide|zinc|epoxy|steel|rust|iron|pu primer/i.test(nameLower);
    return {
      lead: isMetal
        ? `Protect iron & steel surfaces and boost topcoat grip with ${brandedName}.`
        : `Prepare walls for smoother, longer-lasting paint finishes with ${brandedName}.`,
      verb: 'Provides',
      fallbackCloser: 'Strong adhesion and reliable surface sealing for lasting coats.',
    };
  }
  if (sub.includes('epoxy') || sub.includes('industrial')) {
    return {
      lead: `Protect heavy-duty steel, concrete & industrial assets with ${brandedName}.`,
      verb: 'Engineered for',
      fallbackCloser: 'Industrial-grade protection built for demanding environments.',
    };
  }
  if (sub.includes('wood adhesive') || sub.includes('contact adhesive')) {
    return {
      lead: `Get strong, dependable bonding for woodworking & laminates with ${brandedName}.`,
      verb: 'Built for',
      fallbackCloser: 'Trusted adhesive performance for furniture, carpentry & interiors.',
    };
  }
  if (sub.includes('tile adhesive')) {
    return {
      lead: `Fix ceramic, vitrified & stone tiles securely with ${brandedName}.`,
      verb: 'Formulated for',
      fallbackCloser: 'Reliable grip and long-term strength for floors and walls.',
    };
  }
  if (sub.includes('thinner') || sub.includes('solvent')) {
    return {
      lead: `Achieve smooth flow, even leveling & a clean coat with ${brandedName}.`,
      verb: 'Formulated for',
      fallbackCloser: 'Genuine solvent quality for professional painting results.',
    };
  }
  if (sub.includes('power tool')) {
    return {
      lead: `Work faster with precision and control using ${brandedName}.`,
      verb: 'Designed for',
      fallbackCloser: 'Reliable jobsite performance for pros and DIY projects.',
    };
  }
  if (sub.includes('tool')) {
    return {
      lead: `Get smooth, neat painting and prep results with ${brandedName}.`,
      verb: 'Designed for',
      fallbackCloser: 'Durable, comfortable handling for clean, streak-free finishes.',
    };
  }
  return {
    lead: `Upgrade your painting project with genuine ${brandedName}.`,
    verb: 'Delivers',
    fallbackCloser: 'Reliable quality in factory-sealed packs with fast doorstep delivery.',
  };
}

/**
 * Benefit-focused, product-story Google meta description (strictly ~120–158 characters).
 * Tells shoppers about the product and its real benefits rather than dumping dry specs.
 */
export function buildProductSeoDescription(product: SeoProductInput): string {
  const richContent = getRichProductContent(product.name, product);
  if (richContent?.seo?.description) {
    return richContent.seo.description;
  }

  const brandedName = getBrandedProductName(product.name, product.brand);
  const { lead, verb, fallbackCloser } = getCategoryLeadSentence(product, brandedName);
  const benefits = extractHumanBenefits(product.properties);

  const MAX_LEN = 158;
  const MIN_IDEAL = 118;

  // Try fitting 3, 2, then 1 real benefits cleanly without ever truncating mid-sentence
  for (let count = Math.min(3, benefits.length); count >= 1; count--) {
    const benefitStr = joinBenefits(benefits.slice(0, count));
    const secondSentence = `${verb} ${benefitStr}.`;
    const candidate = cleanWhitespace(`${lead} ${secondSentence}`);
    if (candidate.length <= MAX_LEN) {
      // If slightly short, append a natural short trust closer if it still fits <= 158
      if (candidate.length < MIN_IDEAL) {
        const withDealer = `${candidate} Genuine factory-sealed packs.`;
        if (withDealer.length <= MAX_LEN) return withDealer;
        const withShop = `${candidate} Shop genuine packs online.`;
        if (withShop.length <= MAX_LEN) return withShop;
      }
      return candidate;
    }
  }

  // Fallback when product name is very long: craft a crisp shorter lead + 1–2 benefits
  if (benefits.length > 0) {
    const shortLead = `Shop ${brandedName} for lasting results.`;
    for (let count = Math.min(2, benefits.length); count >= 1; count--) {
      const candidate = cleanWhitespace(`${shortLead} ${verb} ${joinBenefits(benefits.slice(0, count))}.`);
      if (candidate.length <= MAX_LEN) return candidate;
    }
    const singleCompact = cleanWhitespace(`${brandedName}: ${benefits[0]}. Genuine factory-sealed packs.`);
    if (singleCompact.length <= MAX_LEN) return singleCompact;
  }

  const fallback = cleanWhitespace(`${lead} ${fallbackCloser}`);
  if (fallback.length <= MAX_LEN) return fallback;

  return cleanWhitespace(`${lead} Genuine factory-sealed packs.`).slice(0, MAX_LEN);
}

/**
 * Builds rich, product-specific SEO keywords grounded in real product attributes.
 */
export function buildProductSeoKeywords(product: SeoProductInput): string {
  const richContent = getRichProductContent(product.name, product);
  if (richContent?.seo?.keywords) {
    return richContent.seo.keywords;
  }

  const cleanName = cleanWhitespace(product.name || '');
  const cleanBrand = cleanWhitespace(product.brand || '');
  const brandedName = getBrandedProductName(cleanName, cleanBrand);
  const sub = cleanWhitespace(product.subCategory || product.category || product.topCategory || 'Paint');
  const benefits = extractHumanBenefits(product.properties).slice(0, 3);

  const kw = [
    brandedName,
    `${brandedName} price`,
    `buy ${brandedName} online`,
    cleanName !== brandedName ? cleanName : '',
    cleanBrand && cleanBrand.toLowerCase() !== 'local' ? `${cleanBrand} ${sub}` : sub,
    ...benefits,
    `${sub} Coimbatore`,
    'Rainbow Paints',
  ].filter(Boolean);

  return [...new Set(kw)].join(', ');
}

/**
 * Generates Schema.org additionalProperty entries strictly from verified product properties & metadata.
 */
export function buildProductAdditionalProperties(product: SeoProductInput): { name: string; value: string }[] {
  const richContent = getRichProductContent(product.name, product);
  if (richContent?.seo?.additionalProperties?.length) {
    return richContent.seo.additionalProperties;
  }

  const props: { name: string; value: string }[] = [];
  const sub = product.subCategory || product.category || product.topCategory;
  if (sub) props.push({ name: 'Category', value: sub });
  if (product.brand && product.brand.toLowerCase() !== 'local') {
    props.push({ name: 'Brand', value: product.brand });
  }

  const unitLabel = product.unit === 'kg' ? 'kg' : product.unit === 'pcs' ? 'pcs' : 'L';
  if (product.sizes && product.sizes.length > 0) {
    const formattedSizes = product.sizes
      .map((s) => (s < 1 && unitLabel === 'L' ? `${Math.round(s * 1000)}ml` : `${s}${unitLabel}`))
      .join(', ');
    props.push({ name: 'Available Pack Sizes', value: formattedSizes });
  }

  if (Array.isArray(product.properties)) {
    product.properties.slice(0, 6).forEach((raw, idx) => {
      const clean = cleanWhitespace(raw);
      if (!clean) return;
      const colonIdx = clean.indexOf(':');
      if (colonIdx > 2 && colonIdx < 28) {
        const key = clean.slice(0, colonIdx).trim();
        const val = clean.slice(colonIdx + 1).trim();
        if (val) {
          props.push({ name: key, value: val });
          return;
        }
      }
      props.push({ name: `Key Feature ${idx + 1}`, value: clean });
    });
  }

  return props;
}

/**
 * Generates strictly truthful product FAQs for FAQPage JSON-LD schema across all products.
 */
export function buildProductFaqs(
  product: SeoProductInput,
  startingPack?: { sizeLabel: string; price: number }
): { question: string; answer: string }[] {
  const richContent = getRichProductContent(product.name, product);
  if (richContent?.faqs?.length) {
    return richContent.faqs;
  }

  const brandedName = getBrandedProductName(product.name, product.brand);
  const sub = product.subCategory || product.category || product.topCategory || 'painting';
  const benefits = extractHumanBenefits(product.properties);

  const faqs: { question: string; answer: string }[] = [];

  if (startingPack && startingPack.price > 0) {
    faqs.push({
      question: `What is the price of ${brandedName}?`,
      answer: `${brandedName} starts from ₹${startingPack.price.toLocaleString('en-IN')} for the ${startingPack.sizeLabel} pack at Rainbow Paints & Hardwares in factory-sealed packaging.`,
    });
  }

  if (benefits.length > 0) {
    faqs.push({
      question: `What are the key benefits of ${brandedName}?`,
      answer: `${brandedName} is designed for ${sub.toLowerCase()} applications and offers ${joinBenefits(benefits.slice(0, 4))}.`,
    });
  }

  if (product.brand && product.brand.toLowerCase() !== 'local') {
    faqs.push({
      question: `Is ${brandedName} genuine factory-sealed stock?`,
      answer: `Yes. Rainbow Paints & Hardwares supplies 100% genuine, factory-sealed ${product.brand} products with fresh manufacturing batches and local delivery support in Coimbatore.`,
    });
  }

  return faqs;
}

/**
 * Builds all SEO assets for any product from one single source of truth.
 */
export function getProductSeoData(
  product: SeoProductInput,
  startingPack?: { sizeLabel: string; price: number }
): GeneratedProductSeo {
  const richContent = getRichProductContent(product.name, product);
  const brandedName = getBrandedProductName(product.name, product.brand);
  const sub = product.subCategory || product.category || product.topCategory || 'Paint';

  const highlights =
    richContent?.seo?.highlights?.length
      ? richContent.seo.highlights
      : (product.properties || []).map((p) => cleanWhitespace(p)).filter(Boolean).slice(0, 5);

  return {
    title: buildProductSeoTitle(product),
    description: buildProductSeoDescription(product),
    keywords: buildProductSeoKeywords(product),
    imageAlt: richContent?.seo?.ogImageAlt || `${brandedName} - ${sub} Original Pack`,
    highlights,
    additionalProperties: buildProductAdditionalProperties(product),
    faqs: buildProductFaqs(product, startingPack),
    richContent,
  };
}
