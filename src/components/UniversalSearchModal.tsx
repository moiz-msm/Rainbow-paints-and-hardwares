import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Palette,
  Package,
  Folder,
  BookOpen,
  Wrench,
  Calculator,
  GitCompare,
  ShieldCheck,
  Truck,
  HelpCircle,
  Info,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Check,
  Building,
  Lightbulb,
} from 'lucide-react';
import { useUniversalSearchStore, SearchTab } from '../store/useUniversalSearchStore';
import { mockProducts, topCategories, subCategories, brands } from '../data';
import { blogPosts, BlogPost } from '../data/blogPosts';
import { shadeService, Shade } from '../services/shadeService';

// Available tools and website services
interface WebsiteTool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string[];
}

const WEBSITE_TOOLS: WebsiteTool[] = [
  {
    id: 'visualizer',
    name: 'Paint Visualizer',
    description: 'Preview 5,000+ shades in realistic 3D living room, bedroom & exterior wall scenes.',
    category: 'Interactive Tool',
    url: '/visualizer',
    icon: Palette,
    keywords: ['visualizer', 'color', 'shade', 'room', '3d', 'preview', 'wall', 'paint color'],
  },
  {
    id: 'calculator',
    name: 'Paint Cost Calculator',
    description: 'Calculate exact liters required and project cost based on carpet area and rooms.',
    category: 'Interactive Tool',
    url: '/calculator',
    icon: Calculator,
    keywords: ['calculator', 'paint calculator', 'estimate', 'cost', 'liters', 'area', 'budget', 'price'],
  },
  {
    id: 'compare',
    name: 'Compare Paints',
    description: 'Compare sheen, washability, warranty, and price side-by-side across top brands.',
    category: 'Shopping Tool',
    url: '/compare-paints',
    icon: GitCompare,
    keywords: ['compare', 'difference', 'vs', 'sheen', 'washability', 'warranty', 'royale vs silk'],
  },
  {
    id: 'interior-service',
    name: 'Interior Paint Service',
    description: 'Turnkey interior wall painting, masking, dust-free sanding & flawless finish.',
    category: 'Painting Service',
    url: '/services/interior-wall-painting',
    icon: Sparkles,
    keywords: ['interior service', 'house painting', 'painter', 'home painting', 'interior wall'],
  },
  {
    id: 'exterior-service',
    name: 'Exterior Paint Service',
    description: 'All-weather exterior painting with elastomeric crack bridging & anti-algae warranty.',
    category: 'Painting Service',
    url: '/services/exterior-wall-painting',
    icon: Building,
    keywords: ['exterior service', 'monsoon', 'weatherproof', 'outdoor paint', 'elevation'],
  },
  {
    id: 'waterproofing-service',
    name: 'Waterproofing Solutions',
    description: 'Terrace waterproofing, damp wall injection & bathroom leakage diagnosis.',
    category: 'Specialty Service',
    url: '/services/waterproofing',
    icon: ShieldCheck,
    keywords: ['waterproofing', 'leakage', 'damp', 'terrace', 'dr fixit', 'smartcare', 'seepage'],
  },
  {
    id: 'wood-metal-service',
    name: 'Wood & Metal Painting',
    description: 'PU, Melamine, and PU enamel coating for doors, windows, gates & iron grills.',
    category: 'Specialty Service',
    url: '/services/wood-metal-painting',
    icon: Wrench,
    keywords: ['wood painting', 'metal painting', 'grill', 'gate', 'pu polish', 'melamine', 'enamel'],
  },
  {
    id: 'industrial-flooring',
    name: 'Industrial Flooring',
    description: 'Self-leveling epoxy flooring and PU heavy-duty chemical resistant coats.',
    category: 'Industrial Service',
    url: '/services/industrial-flooring',
    icon: Building,
    keywords: ['industrial', 'flooring', 'epoxy floor', 'factory', 'warehouse coating'],
  },
  {
    id: 'track-order',
    name: 'Track Your Order',
    description: 'Live order tracking with real-time status and delivery updates across India.',
    category: 'Customer Support',
    url: '/track-order',
    icon: Truck,
    keywords: ['track', 'order', 'status', 'shipping', 'delivery', 'consignment'],
  },
  {
    id: 'faqs',
    name: 'FAQs & Painting Knowledge',
    description: 'Clear answers on paint dilution, coverage per liter, primers & tinting.',
    category: 'Help Center',
    url: '/faqs',
    icon: HelpCircle,
    keywords: ['faq', 'help', 'coverage', 'dilution', 'drying time', 'how to paint', 'questions'],
  },
  {
    id: 'about',
    name: 'About Rainbow Paints',
    description: '20+ years of trust, authorised dealers for Asian Paints, Berger, MRF & Dr. Fixit in Coimbatore.',
    category: 'Company Info',
    url: '/about',
    icon: Info,
    keywords: ['about', 'rainbow', 'coimbatore', 'shop', 'store location', 'dealer', 'history'],
  },
];

// Popular quick search chips
const POPULAR_SEARCHES = [
  { label: '0952', tab: 'shades', hint: 'Soft Glow (Asian)' },
  { label: 'Royale Glitz', tab: 'products', hint: 'Luxury Paint' },
  { label: 'Easy Clean Silky Touch', tab: 'products', hint: 'Stain Resistant' },
  { label: 'Interior Paint', tab: 'categories', hint: 'Category' },
  { label: 'Paint Calculator', tab: 'tools', hint: 'Estimator' },
  { label: 'Waterproofing', tab: 'tools', hint: 'Solutions' },
  { label: 'RAL 9010', tab: 'shades', hint: 'RAL Classic' },
  { label: 'Weathercoat', tab: 'products', hint: 'Exterior' },
];

// Typo mapping and smart suggestions dictionary
const COMMON_TYPOS: Record<string, string> = {
  // Category Typos & Synonyms
  interier: 'Interior Paint',
  interor: 'Interior Paint',
  intrior: 'Interior Paint',
  'interior wall': 'Interior Paint',
  'inner paint': 'Interior Paint',
  exterier: 'Exterior Paint',
  exteror: 'Exterior Paint',
  extrior: 'Exterior Paint',
  'exterior wall': 'Exterior Paint',
  'outer paint': 'Exterior Paint',
  primer: 'Primers',
  primar: 'Primers',
  primmr: 'Primers',
  undercoat: 'Primers',
  undercoats: 'Primers',
  basecoat: 'Primers',
  putty: 'Primers',
  'white cement': 'Primers',
  enamal: 'Enamel Paint',
  emamel: 'Enamel Paint',
  'metal paint': 'Enamel Paint',
  'grill paint': 'Enamel Paint',
  'oil paint': 'Enamel Paint',
  pu: 'PU Paint',
  'pu coating': 'PU Paint',
  'pu coatings': 'PU Paint',
  epoxey: 'Epoxy Paint',
  epoxi: 'Epoxy Paint',
  'floor epoxy': 'Epoxy Paint',
  waterprof: 'Waterproofing',
  waterprofing: 'Waterproofing',
  'water proof': 'Waterproofing',
  'water proofing': 'Waterproofing',
  leakage: 'Waterproofing',
  seepage: 'Waterproofing',
  dampness: 'Waterproofing',
  'damp proof': 'Waterproofing',
  varnish: 'Wood Finishes',
  'wood paint': 'Wood Finishes',
  melamyne: 'Wood Finishes',

  // Brand Typos
  beger: 'Berger Paints',
  bergur: 'Berger Paints',
  barger: 'Berger Paints',
  asian: 'Asian Paints',
  apcolite: 'Asian Paints',
  royale: 'Asian Paints',
  mrf: 'MRF Vapocure',
  vapocure: 'MRF Vapocure',
  'mrf paint': 'MRF Vapocure',
  drfixit: 'Dr. Fixit',
  'dr fixit': 'Dr. Fixit',
  fixit: 'Dr. Fixit',
  sheenlac: 'Sheenlac',
  shenlac: 'Sheenlac',
  birla: 'Birla White',
  birlawhite: 'Birla White',
  fevicol: 'Fevicol',
  favicol: 'Fevicol',

  // Tool & Service Typos
  calclator: 'Paint Calculator',
  calculatr: 'Paint Calculator',
  calc: 'Paint Calculator',
  estimator: 'Paint Calculator',
  estimate: 'Paint Calculator',
  vizualizer: '3D Visualizer',
  visualiser: '3D Visualizer',
  visual: '3D Visualizer',
  'room visualizer': '3D Visualizer',
  comapre: 'Compare Paints',
  comparision: 'Compare Paints',
  track: 'Track Order',
  'order status': 'Track Order',
  'order tracking': 'Track Order',
  consignment: 'Track Order',
  faq: 'FAQs & Painting Knowledge',
  help: 'FAQs & Painting Knowledge',

  // Popular Product Typos
  'easy clan': 'Easy Clean Silky Touch',
  'esay clean': 'Easy Clean Silky Touch',
  'sliky touch': 'Easy Clean Silky Touch',
  'silky touch': 'Easy Clean Silky Touch',
  royle: 'Royale Glitz',
  glitz: 'Royale Glitz',
  glits: 'Royale Glitz',
  'royale glits': 'Royale Glitz',
  'silk glamor': 'Silk Glamor',
  'silk glamour': 'Silk Glamor',
  weathercoat: 'Weathercoat',
  'weather coat': 'Weathercoat',
  'apex ultima': 'Apex Ultima Stretch',
  '0953': '0952',
  '952': '0952',
};

const SEARCHABLE_DICTIONARY = [
  'Interior Paint',
  'Exterior Paint',
  'Primers',
  'Enamel Paint',
  'PU Paint',
  'Epoxy Paint',
  'Waterproofing',
  'Wood Finishes',
  'Painting Tools',
  'Asian Paints',
  'Berger Paints',
  'MRF Vapocure',
  'Dr. Fixit',
  'Birla White',
  'Sheenlac',
  'Fevicol',
  'Paint Calculator',
  '3D Visualizer',
  'Compare Paints',
  'Track Order',
  'Easy Clean Silky Touch',
  'Royale Glitz',
  'Silk Glamor',
  'Weathercoat',
  'Apex Ultima Stretch',
  '0952',
];

const levenshteinDist = (a: string, b: string): number => {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix: number[][] = Array(bn + 1).fill(null).map(() => Array(an + 1).fill(0));
  for (let i = 0; i <= an; i++) matrix[0][i] = i;
  for (let j = 0; j <= bn; j++) matrix[j][0] = j;
  for (let j = 1; j <= bn; j++) {
    for (let i = 1; i <= an; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(matrix[j][i - 1] + 1, matrix[j - 1][i] + 1, matrix[j - 1][i - 1] + cost);
    }
  }
  return matrix[bn][an];
};

function calculateSimilarity(s1: string, s2: string): number {
  const q = s1.toLowerCase().trim();
  const t = s2.toLowerCase().trim();
  if (q === t) return 1.0;
  if (t.includes(q)) return 0.85 + (q.length / t.length) * 0.15;
  if (q.includes(t)) return 0.8;

  const targetWords = t.split(/[\s-]+/).filter(Boolean);
  const queryWords = q.split(/[\s-]+/).filter(Boolean);

  let maxScore = 0;
  for (const qw of queryWords) {
    for (const tw of targetWords) {
      const maxLen = Math.max(qw.length, tw.length);
      if (maxLen === 0) continue;
      const sim = (maxLen - levenshteinDist(qw, tw)) / maxLen;
      if (sim > maxScore) maxScore = sim;
    }
  }
  return maxScore;
}

export default function UniversalSearchModal() {
  const { isOpen, query, activeTab, setIsOpen, setQuery, setActiveTab, closeSearch } =
    useUniversalSearchStore();
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const [shades, setShades] = useState<Shade[]>([]);
  const [isSearchingShades, setIsSearchingShades] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedProductBrand, setSelectedProductBrand] = useState<string>('all');

  // Reset selected brand when query changes
  useEffect(() => {
    setSelectedProductBrand('all');
  }, [query]);

  // Global Keyboard shortcut (Cmd+K / Ctrl+K and Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closeSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen, closeSearch]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    } else {
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Asynchronous Shade Search with Debounce
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) {
      setShades([]);
      setIsSearchingShades(false);
      return;
    }

    setIsSearchingShades(true);
    const handler = setTimeout(async () => {
      try {
        const result = await shadeService.getShades({
          brand: 'all',
          search: trimmed,
          limit: 16,
        });
        setShades(result.shades || []);
      } catch (err) {
        console.error('Shade search failed:', err);
        setShades([]);
      } finally {
        setIsSearchingShades(false);
      }
    }, 120);

    return () => clearTimeout(handler);
  }, [query]);

  // 1. All Matched Products (Grouped & Round-Robin Interleaved across all brands)
  const allMatchedProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const removedNames = [
      'tractor sparc emulsion',
      'tractor uno acrylic distemper',
      'tractor emulsion shyne',
      'apcolite premium satin emulsion',
      'apcolite advanced emulsion',
      'floor epoxy coating',
      'food grade epoxy',
      'mio coatings',
    ];

    // Filter matching products
    const matches = mockProducts.filter((p) => {
      if (!p.name) return false;
      const nameLower = p.name.toLowerCase();
      if (removedNames.includes(nameLower)) return false;

      const matchName = nameLower.includes(trimmed);
      const matchBrand = p.brand?.toLowerCase().includes(trimmed);
      const matchSub = p.subCategory?.toLowerCase().includes(trimmed);
      const matchTop = p.topCategory?.toLowerCase().includes(trimmed);
      const matchProp = p.properties?.some((prop: string) =>
        prop.toLowerCase().includes(trimmed)
      );

      return matchName || matchBrand || matchSub || matchTop || matchProp;
    });

    // Group matching products by brand so all brands get fair representation
    const brandBuckets: Record<string, typeof mockProducts> = {};
    matches.forEach((p) => {
      const brand = p.brand || 'Other';
      if (!brandBuckets[brand]) brandBuckets[brand] = [];
      brandBuckets[brand].push(p);
    });

    const uniqueBrands = Object.keys(brandBuckets);

    // If query matches a specific brand, prioritize that brand first
    uniqueBrands.sort((a, b) => {
      const aMatch = a.toLowerCase().includes(trimmed);
      const bMatch = b.toLowerCase().includes(trimmed);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return brandBuckets[b].length - brandBuckets[a].length;
    });

    // Round-robin interleave across brands (1st Asian, 1st Berger, 1st MRF, 2nd Asian, 2nd Berger...)
    const interleaved: typeof mockProducts = [];
    let addedAny = true;
    let round = 0;
    while (addedAny) {
      addedAny = false;
      for (const b of uniqueBrands) {
        if (round < brandBuckets[b].length) {
          interleaved.push(brandBuckets[b][round]);
          addedAny = true;
        }
      }
      round++;
    }

    return interleaved;
  }, [query]);

  // Available brands within matched products
  const availableProductBrands = useMemo(() => {
    const map = new Map<string, number>();
    allMatchedProducts.forEach((p) => {
      const b = p.brand || 'Other';
      map.set(b, (map.get(b) || 0) + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [allMatchedProducts]);

  // Filtered Products for current view
  const filteredProducts = useMemo(() => {
    let list = allMatchedProducts;
    if (selectedProductBrand !== 'all') {
      list = list.filter((p) => p.brand === selectedProductBrand);
    }
    if (activeTab === 'all') {
      return list.slice(0, 24);
    }
    return list.slice(0, 80);
  }, [allMatchedProducts, selectedProductBrand, activeTab]);

  // Filter Categories & Brands with multi-brand category links
  const filteredCategoriesAndBrands = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    const items: Array<{
      type: 'category' | 'brand';
      name: string;
      topCategory?: string;
      url: string;
      description?: string;
    }> = [];

    // All categories list
    const allCatList: Array<{ name: string; top: string }> = [];
    Object.entries(subCategories).forEach(([top, list]) => {
      list.forEach((sub) => allCatList.push({ name: sub, top }));
    });

    allCatList.forEach((c) => {
      const matchCat = c.name.toLowerCase().includes(trimmed) || c.top.toLowerCase().includes(trimmed);
      if (matchCat) {
        const slug = c.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // 1. Top-level category across all brands
        items.push({
          type: 'category',
          name: c.name,
          topCategory: c.top,
          url: `/c/${slug}`,
          description: `Browse all products across all brands in ${c.name} (${c.top})`,
        });

        // 2. Discover all carrying brands for this category
        const brandsForCat = Array.from(
          new Set(
            mockProducts
              .filter((p) => {
                const sub = p.subCategory?.toLowerCase() || '';
                return sub === c.name.toLowerCase() || sub.includes(c.name.toLowerCase());
              })
              .map((p) => p.brand)
              .filter(Boolean)
          )
        );

        brandsForCat.forEach((b) => {
          items.push({
            type: 'category',
            name: `${b} • ${c.name}`,
            topCategory: c.top,
            url: `/c/${slug}?brand=${encodeURIComponent(b)}`,
            description: `Explore ${b} collection in ${c.name}`,
          });
        });
      }
    });

    // Brands list
    brands.forEach((b) => {
      if (b.toLowerCase() !== 'all brands' && b.toLowerCase().includes(trimmed)) {
        const slug = b
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        items.push({
          type: 'brand',
          name: b,
          url: `/brands/${slug}`,
          description: `Authorised products, tinting & shades by ${b}`,
        });

        // Also add top categories for this brand
        const brandCats = Array.from(
          new Set(
            mockProducts
              .filter((p) => p.brand?.toLowerCase() === b.toLowerCase())
              .map((p) => p.subCategory)
              .filter(Boolean)
          )
        );

        brandCats.slice(0, 4).forEach((catName) => {
          const catSlug = catName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          items.push({
            type: 'category',
            name: `${b} • ${catName}`,
            url: `/c/${catSlug}?brand=${encodeURIComponent(b)}`,
            description: `Explore ${catName} by ${b}`,
          });
        });
      }
    });

    return items.slice(0, 16);
  }, [query]);

  // Filter Blogs
  const filteredBlogs = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return blogPosts
      .filter((post: BlogPost) => {
        const matchTitle = post.title.toLowerCase().includes(trimmed);
        const matchExcerpt = post.excerpt.toLowerCase().includes(trimmed);
        const matchCategory = post.category.toLowerCase().includes(trimmed);
        const matchKeywords = post.seoKeywords?.some((kw) =>
          kw.toLowerCase().includes(trimmed)
        );
        return matchTitle || matchExcerpt || matchCategory || matchKeywords;
      })
      .slice(0, 8);
  }, [query]);

  // Filter Tools & Services
  const filteredTools = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return WEBSITE_TOOLS.filter((tool) => {
      const matchName = tool.name.toLowerCase().includes(trimmed);
      const matchDesc = tool.description.toLowerCase().includes(trimmed);
      const matchKeywords = tool.keywords.some((kw) => kw.toLowerCase().includes(trimmed));
      return matchName || matchDesc || matchKeywords;
    });
  }, [query]);

  // Counts for tabs
  const counts = useMemo(
    () => ({
      all:
        filteredProducts.length +
        shades.length +
        filteredCategoriesAndBrands.length +
        filteredBlogs.length +
        filteredTools.length,
      products: allMatchedProducts.length,
      shades: shades.length,
      categories: filteredCategoriesAndBrands.length,
      blogs: filteredBlogs.length,
      tools: filteredTools.length,
    }),
    [allMatchedProducts, filteredProducts, shades, filteredCategoriesAndBrands, filteredBlogs, filteredTools]
  );

  // Smart "Did you mean this?" and "Are you looking for this?" suggestions when counts.all === 0
  const smartFallback = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed || counts.all > 0) {
      return {
        didYouMean: '',
        alternativeTerms: [] as string[],
        suggestedProducts: [] as typeof mockProducts,
        suggestedCategories: [] as Array<{
          name: string;
          topCategory?: string;
          url: string;
          description: string;
        }>,
        suggestedTools: [] as typeof WEBSITE_TOOLS,
        hasAnySuggestions: false,
      };
    }

    // 1. Identify primary Did You Mean term
    let didYouMean = COMMON_TYPOS[trimmed] || '';
    const scoredCandidates: Array<{ item: string; score: number }> = [];

    for (const item of SEARCHABLE_DICTIONARY) {
      const score = calculateSimilarity(trimmed, item);
      if (score > 0.35) {
        scoredCandidates.push({ item, score });
      }
    }
    scoredCandidates.sort((a, b) => b.score - a.score);

    if (!didYouMean && scoredCandidates.length > 0) {
      didYouMean = scoredCandidates[0].item;
    }
    if (!didYouMean) {
      didYouMean = 'Interior Paint';
    }

    const alternativeTerms = scoredCandidates
      .map((s) => s.item)
      .filter((i) => i.toLowerCase() !== didYouMean.toLowerCase())
      .slice(0, 3);

    // 2. Compute Closest Products for didYouMean (Interleaved across brands)
    const targetLower = didYouMean.toLowerCase();
    const matchedProducts = mockProducts.filter((p) => {
      const name = p.name?.toLowerCase() || '';
      const brand = p.brand?.toLowerCase() || '';
      const sub = p.subCategory?.toLowerCase() || '';
      return (
        name.includes(targetLower) ||
        brand.includes(targetLower) ||
        sub.includes(targetLower) ||
        p.properties?.some((prop: string) => prop.toLowerCase().includes(targetLower))
      );
    });

    const fallbackProductsPool = matchedProducts.length > 0 ? matchedProducts : mockProducts;
    const buckets: Record<string, typeof mockProducts> = {};
    fallbackProductsPool.forEach((p) => {
      const b = p.brand || 'Other';
      if (!buckets[b]) buckets[b] = [];
      buckets[b].push(p);
    });

    const uniqueBrands = Object.keys(buckets);
    const interleavedProducts: typeof mockProducts = [];
    let round = 0;
    let added = true;
    while (added && interleavedProducts.length < 4) {
      added = false;
      for (const b of uniqueBrands) {
        if (round < buckets[b].length && interleavedProducts.length < 4) {
          interleavedProducts.push(buckets[b][round]);
          added = true;
        }
      }
      round++;
    }

    // 3. Compute Closest Categories
    const suggestedCategories: Array<{
      name: string;
      topCategory?: string;
      url: string;
      description: string;
    }> = [];

    const allCatList: Array<{ name: string; top: string }> = [];
    Object.entries(subCategories).forEach(([top, list]) => {
      list.forEach((sub) => allCatList.push({ name: sub, top }));
    });

    const matchedCat = allCatList.find(
      (c) => c.name.toLowerCase() === targetLower || targetLower.includes(c.name.toLowerCase())
    );

    if (matchedCat) {
      const slug = matchedCat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      suggestedCategories.push({
        name: matchedCat.name,
        topCategory: matchedCat.top,
        url: `/c/${slug}`,
        description: `Explore all brands in ${matchedCat.name} (${matchedCat.top})`,
      });

      const brandsForCat = Array.from(
        new Set(
          mockProducts
            .filter((p) => p.subCategory?.toLowerCase() === matchedCat.name.toLowerCase())
            .map((p) => p.brand)
            .filter(Boolean)
        )
      );

      brandsForCat.slice(0, 2).forEach((b) => {
        suggestedCategories.push({
          name: `${b} • ${matchedCat.name}`,
          topCategory: matchedCat.top,
          url: `/c/${slug}?brand=${encodeURIComponent(b)}`,
          description: `View ${b} ${matchedCat.name} collection`,
        });
      });
    } else {
      suggestedCategories.push({
        name: 'Interior Paint',
        topCategory: 'Home Paint',
        url: '/c/interior-paint',
        description: 'Luxury emulsions & interior wall finishes across all brands',
      });
      suggestedCategories.push({
        name: 'Exterior Paint',
        topCategory: 'Home Paint',
        url: '/c/exterior-paint',
        description: 'Weatherproof & moisture resistant exterior paints',
      });
    }

    // 4. Compute Closest Tools
    const toolMatch = WEBSITE_TOOLS.filter((t) => {
      const name = t.name.toLowerCase();
      const desc = t.description.toLowerCase();
      const kw = t.keywords.some((k) => k.toLowerCase().includes(trimmed) || targetLower.includes(k));
      return name.includes(targetLower) || desc.includes(targetLower) || kw;
    });

    const suggestedTools = toolMatch.length > 0 ? toolMatch.slice(0, 2) : WEBSITE_TOOLS.slice(0, 2);

    return {
      didYouMean,
      alternativeTerms,
      suggestedProducts: interleavedProducts,
      suggestedCategories: suggestedCategories.slice(0, 3),
      suggestedTools,
      hasAnySuggestions: interleavedProducts.length > 0 || suggestedCategories.length > 0,
    };
  }, [query, counts.all]);

  // Flat list of visible results for keyboard navigation
  const flatResults = useMemo(() => {
    const list: Array<{
      id: string;
      type: string;
      url: string;
      title: string;
    }> = [];

    if (activeTab === 'all' || activeTab === 'shades') {
      shades.forEach((s) => {
        list.push({
          id: `shade-${s.id}`,
          type: 'shade',
          url: shadeService.getShadeUrl(s),
          title: `${s.name} (${s.shadeCode})`,
        });
      });
    }

    if (activeTab === 'all' || activeTab === 'products') {
      filteredProducts.forEach((p) => {
        const slug = (p as any).slug || p.name.replace(/\s+/g, '-').toLowerCase();
        list.push({
          id: `prod-${p.id}`,
          type: 'product',
          url: `/p/${slug}`,
          title: p.name,
        });
      });
    }

    if (activeTab === 'all' || activeTab === 'categories') {
      filteredCategoriesAndBrands.forEach((cb) => {
        list.push({
          id: `cb-${cb.name}`,
          type: cb.type,
          url: cb.url,
          title: cb.name,
        });
      });
    }

    if (activeTab === 'all' || activeTab === 'tools') {
      filteredTools.forEach((t) => {
        list.push({
          id: `tool-${t.id}`,
          type: 'tool',
          url: t.url,
          title: t.name,
        });
      });
    }

    if (activeTab === 'all' || activeTab === 'blogs') {
      filteredBlogs.forEach((b) => {
        list.push({
          id: `blog-${b.id}`,
          type: 'blog',
          url: `/blog/${b.slug}`,
          title: b.title,
        });
      });
    }

    // If no exact results, allow keyboard navigation across smart fallback suggestions
    if (counts.all === 0 && smartFallback.hasAnySuggestions) {
      smartFallback.suggestedProducts.forEach((p) => {
        const slug = (p as any).slug || p.name.replace(/\s+/g, '-').toLowerCase();
        list.push({
          id: `suggested-prod-${p.id}`,
          type: 'product',
          url: `/p/${slug}`,
          title: p.name,
        });
      });
      smartFallback.suggestedCategories.forEach((c) => {
        list.push({
          id: `suggested-cat-${c.name}`,
          type: 'category',
          url: c.url,
          title: c.name,
        });
      });
      smartFallback.suggestedTools.forEach((t) => {
        list.push({
          id: `suggested-tool-${t.id}`,
          type: 'tool',
          url: t.url,
          title: t.name,
        });
      });
    }

    return list;
  }, [
    activeTab,
    shades,
    filteredProducts,
    filteredCategoriesAndBrands,
    filteredTools,
    filteredBlogs,
    counts.all,
    smartFallback,
  ]);

  // Navigate to destination
  const handleSelectResult = useCallback(
    (url: string) => {
      closeSearch();
      navigate(url);
    },
    [closeSearch, navigate]
  );

  // Handle keyboard list navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (flatResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = flatResults[selectedIndex];
      if (current) {
        handleSelectResult(current.url);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-start justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearch}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-white border border-zinc-200/90 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[88vh] z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header & Search Input */}
          <div className="relative border-b border-zinc-100 bg-zinc-50/50 p-3 sm:p-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gold shrink-0 absolute left-3 pointer-events-none" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search shades, paints, tools, blogs..."
                className="w-full bg-white border border-zinc-200 rounded-xl py-2.5 sm:py-3 pl-10 sm:pl-11 pr-14 sm:pr-24 text-sm sm:text-base text-zinc-900 placeholder:text-zinc-600 focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/15 transition-all shadow-inner"
              />

              <div className="absolute right-3 flex items-center gap-1.5">
                {isSearchingShades && (
                  <div className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                )}

                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    title="Clear input"
                    aria-label="Clear input"
                    className="p-1 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={closeSearch}
                  title="Close search (Esc)"
                  aria-label="Close search"
                  className="px-2 py-1 text-[11px] font-mono text-zinc-500 bg-zinc-100 hover:bg-zinc-200 rounded border border-zinc-200 transition-colors hidden sm:block"
                >
                  ESC
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            {query.trim().length > 0 && (
              <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-none text-xs">
                {(
                  [
                    { id: 'all', label: 'All', count: counts.all },
                    { id: 'shades', label: 'Shades', count: counts.shades },
                    { id: 'products', label: 'Products', count: counts.products },
                    { id: 'categories', label: 'Categories & Brands', count: counts.categories },
                    { id: 'tools', label: 'Tools & Services', count: counts.tools },
                    { id: 'blogs', label: 'Blog', count: counts.blogs },
                  ] as const
                ).map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as SearchTab);
                        setSelectedIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-zinc-900 text-gold shadow-sm'
                          : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive
                            ? 'bg-gold/20 text-gold font-bold'
                            : 'bg-zinc-100 text-zinc-500'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Results Container */}
          <div
            ref={resultsContainerRef}
            className="overflow-y-auto p-3 sm:p-4 max-h-[60vh] divide-y divide-zinc-100"
          >
            {/* If Query is Empty: Display Quick Suggestions & Popular Searches */}
            {!query.trim() && (
              <div className="py-2 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Popular & Trending Searches</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {POPULAR_SEARCHES.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setQuery(item.label);
                          setActiveTab(item.tab as SearchTab);
                        }}
                        className="flex flex-col text-left p-2.5 rounded-xl border border-zinc-200 hover:border-gold/50 hover:bg-gold/5 transition-all group"
                      >
                        <span className="text-xs font-semibold text-zinc-800 group-hover:text-gold transition-colors truncate">
                          {item.label}
                        </span>
                        <span className="text-[10px] text-zinc-600 mt-0.5">{item.hint}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Tools Access */}
                <div>
                  <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                    <Wrench className="w-3.5 h-3.5 text-gold" />
                    <span>Quick Tools & Services</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {WEBSITE_TOOLS.slice(0, 6).map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <button
                          key={tool.id}
                          onClick={() => handleSelectResult(tool.url)}
                          className="flex items-start gap-3 p-3 rounded-xl border border-zinc-200 hover:border-gold/60 hover:bg-zinc-50/80 transition-all text-left group"
                        >
                          <div className="p-2 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-zinc-900 group-hover:text-gold transition-colors truncate">
                              {tool.name}
                            </p>
                            <p className="text-[11px] text-zinc-600 line-clamp-1 mt-0.5">
                              {tool.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* If Query has no matches across all domains: Smart "Did you mean this?" & "Are you looking for this?" */}
            {query.trim() && counts.all === 0 && !isSearchingShades && (
              <div className="py-4 space-y-6">
                {/* "Did you mean this?" Card */}
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-gold/30">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-gold/15 text-gold shrink-0 mt-0.5 sm:mt-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">
                          No exact match for "<span className="text-zinc-800 font-semibold">{query}</span>"
                        </p>
                        {smartFallback.didYouMean && (
                          <p className="text-sm font-bold text-zinc-900 mt-0.5">
                            Did you mean: <span className="text-gold font-extrabold">{smartFallback.didYouMean}</span>?
                          </p>
                        )}
                      </div>
                    </div>

                    {smartFallback.didYouMean && (
                      <button
                        onClick={() => {
                          setQuery(smartFallback.didYouMean);
                          setActiveTab('all');
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-gold text-zinc-950 font-bold text-xs rounded-xl shadow-sm hover:brightness-105 active:scale-95 transition-all self-start sm:self-auto shrink-0"
                      >
                        <span>Search "{smartFallback.didYouMean}"</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Alternative suggestion chips */}
                  {smartFallback.alternativeTerms.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gold/15 flex-wrap">
                      <span className="text-[11px] font-semibold text-zinc-500">Or try:</span>
                      {smartFallback.alternativeTerms.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setQuery(term);
                            setActiveTab('all');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white border border-zinc-200 hover:border-gold text-zinc-700 hover:text-gold text-[11px] font-medium transition-all"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* "Are you looking for these?" Recommendations */}
                {smartFallback.hasAnySuggestions && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-gold" />
                      <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                        Are you looking for these?
                      </h3>
                    </div>

                    {/* Suggested Products (Multi-Brand Fair Share) */}
                    {smartFallback.suggestedProducts.length > 0 && (
                      <div>
                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                          Closest Products
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {smartFallback.suggestedProducts.map((p) => {
                            const slug =
                              (p as any).slug || p.name.replace(/\s+/g, '-').toLowerCase();
                            return (
                              <button
                                key={p.id}
                                onClick={() => handleSelectResult(`/p/${slug}`)}
                                className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200/80 hover:border-gold/60 hover:bg-gold/5 transition-all text-left group bg-white"
                              >
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-11 h-11 object-contain rounded-lg bg-zinc-50 border border-zinc-100 p-1 shrink-0"
                                  loading="lazy"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider block truncate">
                                      {p.brand}
                                    </span>
                                    {p.brand === 'Berger Paints' && (
                                      <span className="text-[9px] bg-red-50 text-red-700 px-1 py-0.2 rounded font-semibold shrink-0">
                                        Berger
                                      </span>
                                    )}
                                    {p.brand === 'MRF Vapocure' && (
                                      <span className="text-[9px] bg-blue-50 text-blue-700 px-1 py-0.2 rounded font-semibold shrink-0">
                                        MRF
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-xs font-bold text-zinc-900 group-hover:text-gold transition-colors truncate">
                                    {p.name}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[11px] font-bold text-zinc-800">
                                      {p.price}
                                    </span>
                                    <span className="text-[10px] text-zinc-600 bg-zinc-100 px-1.5 py-0.2 rounded truncate">
                                      {p.subCategory}
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Suggested Categories */}
                    {smartFallback.suggestedCategories.length > 0 && (
                      <div>
                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                          Related Categories
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {smartFallback.suggestedCategories.map((c) => (
                            <button
                              key={c.url}
                              onClick={() => handleSelectResult(c.url)}
                              className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200/80 hover:border-gold/60 hover:bg-gold/5 transition-all text-left group bg-white"
                            >
                              <div className="p-2 rounded-lg bg-zinc-100 text-gold group-hover:bg-gold group-hover:text-white transition-colors shrink-0">
                                <Folder className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-bold text-zinc-900 group-hover:text-gold transition-colors truncate block">
                                  {c.name}
                                </span>
                                <p className="text-[11px] text-zinc-600 truncate mt-0.5">
                                  {c.description}
                                </p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Tools */}
                    {smartFallback.suggestedTools.length > 0 && (
                      <div>
                        <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                          Helpful Tools & Services
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {smartFallback.suggestedTools.map((tool) => {
                            const ToolIcon = tool.icon;
                            return (
                              <button
                                key={tool.id}
                                onClick={() => handleSelectResult(tool.url)}
                                className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200/80 hover:border-gold/60 hover:bg-gold/5 transition-all text-left group bg-white"
                              >
                                <div className="p-2 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors shrink-0">
                                  <ToolIcon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="text-xs font-bold text-zinc-900 group-hover:text-gold transition-colors truncate block">
                                    {tool.name}
                                  </span>
                                  <p className="text-[11px] text-zinc-600 line-clamp-1 mt-0.5">
                                    {tool.description}
                                  </p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* SECTION 1: SHADE CODES & COLORS */}
            {(activeTab === 'all' || activeTab === 'shades') && shades.length > 0 && (
              <div className="py-3 first:pt-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Palette className="w-4 h-4 text-gold" />
                    <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Color Shades ({shades.length})
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-600">Click to preview in 3D Visualizer</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {shades.map((shade) => {
                    const shadeUrl = shadeService.getShadeUrl(shade);
                    return (
                      <button
                        key={shade.id}
                        onClick={() => handleSelectResult(shadeUrl)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200/80 hover:border-gold/60 hover:bg-gold/5 transition-all text-left group"
                      >
                        {/* Live Hex Swatch */}
                        <div
                          className="w-10 h-10 rounded-lg shadow-sm border border-black/10 shrink-0 relative overflow-hidden transition-transform group-hover:scale-105"
                          style={{ backgroundColor: shade.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-zinc-900 group-hover:text-gold transition-colors truncate">
                              {shade.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-zinc-100 text-zinc-700 rounded font-bold">
                              {shade.shadeCode}
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-600 flex items-center gap-1.5 mt-0.5">
                            <span>{shade.brand}</span>
                            <span>•</span>
                            <span className="capitalize">{shade.family || 'Color'}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 2: PRODUCTS */}
            {(activeTab === 'all' || activeTab === 'products') &&
              filteredProducts.length > 0 && (
                <div className="py-3 first:pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gold" />
                      <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                        Paints & Products (
                        {selectedProductBrand === 'all'
                          ? allMatchedProducts.length
                          : filteredProducts.length}
                        )
                      </span>
                    </div>
                    {allMatchedProducts.length > 4 && activeTab === 'all' && (
                      <button
                        onClick={() => setActiveTab('products')}
                        className="text-[11px] font-medium text-gold hover:underline"
                      >
                        View all {allMatchedProducts.length} products
                      </button>
                    )}
                  </div>

                  {/* Brand Filter Chips when multiple brands match */}
                  {availableProductBrands.length > 1 && (
                    <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 scrollbar-none">
                      <button
                        onClick={() => setSelectedProductBrand('all')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          selectedProductBrand === 'all'
                            ? 'bg-zinc-900 text-gold shadow-sm font-semibold'
                            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                        }`}
                      >
                        <span>All Brands</span>
                        <span
                          className={`text-[10px] font-mono px-1 rounded ${
                            selectedProductBrand === 'all'
                              ? 'bg-gold/20 text-gold font-bold'
                              : 'text-zinc-500'
                          }`}
                        >
                          {allMatchedProducts.length}
                        </span>
                      </button>
                      {availableProductBrands.map((b) => {
                        const isSelected = selectedProductBrand === b.name;
                        return (
                          <button
                            key={b.name}
                            onClick={() => setSelectedProductBrand(b.name)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-zinc-900 text-gold shadow-sm font-semibold ring-1 ring-gold/40'
                                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                            }`}
                          >
                            <span>{b.name}</span>
                            <span
                              className={`text-[10px] font-mono px-1 rounded ${
                                isSelected
                                  ? 'bg-gold/20 text-gold font-bold'
                                  : 'text-zinc-500'
                              }`}
                            >
                              {b.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredProducts.map((p) => {
                      const slug =
                        (p as any).slug || p.name.replace(/\s+/g, '-').toLowerCase();
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelectResult(`/p/${slug}`)}
                          className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200/80 hover:border-gold/60 hover:bg-gold/5 transition-all text-left group"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-11 h-11 object-contain rounded-lg bg-zinc-50 border border-zinc-100 p-1 shrink-0"
                            loading="lazy"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-gold uppercase tracking-wider block truncate">
                                {p.brand}
                              </span>
                              {p.brand === 'Berger Paints' && (
                                <span className="text-[9px] bg-red-50 text-red-700 px-1 py-0.2 rounded font-semibold shrink-0">
                                  Berger
                                </span>
                              )}
                              {p.brand === 'MRF Vapocure' && (
                                <span className="text-[9px] bg-blue-50 text-blue-700 px-1 py-0.2 rounded font-semibold shrink-0">
                                  MRF
                                </span>
                              )}
                            </div>
                            <h4 className="text-xs font-bold text-zinc-900 group-hover:text-gold transition-colors truncate">
                              {p.name}
                            </h4>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] font-bold text-zinc-800">
                                {p.price}
                              </span>
                              <span className="text-[10px] text-zinc-600 bg-zinc-100 px-1.5 py-0.2 rounded truncate">
                                {p.subCategory}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            {/* SECTION 3: CATEGORIES & BRANDS */}
            {(activeTab === 'all' || activeTab === 'categories') &&
              filteredCategoriesAndBrands.length > 0 && (
                <div className="py-3 first:pt-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Folder className="w-4 h-4 text-gold" />
                    <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      Categories & Brands ({filteredCategoriesAndBrands.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredCategoriesAndBrands.map((cb) => (
                      <button
                        key={`${cb.type}-${cb.name}`}
                        onClick={() => handleSelectResult(cb.url)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200/80 hover:border-gold/60 hover:bg-gold/5 transition-all text-left group"
                      >
                        <div className="p-2 rounded-lg bg-zinc-100 text-gold group-hover:bg-gold group-hover:text-white transition-colors shrink-0">
                          {cb.type === 'brand' ? (
                            <Building className="w-4 h-4" />
                          ) : (
                            <Folder className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-zinc-900 group-hover:text-gold transition-colors truncate">
                              {cb.name}
                            </span>
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">
                              {cb.type}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-600 truncate mt-0.5">
                            {cb.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* SECTION 4: TOOLS & SERVICES */}
            {(activeTab === 'all' || activeTab === 'tools') && filteredTools.length > 0 && (
              <div className="py-3 first:pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="w-4 h-4 text-gold" />
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Tools & Painting Services ({filteredTools.length})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => handleSelectResult(tool.url)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200/80 hover:border-gold/60 hover:bg-gold/5 transition-all text-left group"
                      >
                        <div className="p-2 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-zinc-900 group-hover:text-gold transition-colors truncate">
                              {tool.name}
                            </span>
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">
                              {tool.category}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-600 line-clamp-1 mt-0.5">
                            {tool.description}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 5: BLOGS & GUIDES */}
            {(activeTab === 'all' || activeTab === 'blogs') && filteredBlogs.length > 0 && (
              <div className="py-3 first:pt-0">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                    Blog Articles & Guides ({filteredBlogs.length})
                  </span>
                </div>

                <div className="space-y-2">
                  {filteredBlogs.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => handleSelectResult(`/blog/${post.slug}`)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-zinc-200/80 hover:border-gold/60 hover:bg-gold/5 transition-all text-left group"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-12 h-12 object-cover rounded-lg bg-zinc-100 border border-zinc-200 shrink-0"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-zinc-600">• {post.readTime}</span>
                        </div>
                        <h4 className="text-xs font-bold text-zinc-900 group-hover:text-gold transition-colors line-clamp-1 mt-0.5">
                          {post.title}
                        </h4>
                        <p className="text-[11px] text-zinc-600 line-clamp-1 mt-0.5">
                          {post.excerpt}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
