import React, { useState, useMemo, useDeferredValue, memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Copy, RefreshCcw, Search, Heart, Clock, X, ChevronDown, Plus, Minus, Palette, Maximize2, Minimize2, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { shadeService, Shade } from '../services/shadeService';
import AIPhotoStudio from './AIPhotoStudio';
import Interactive2DShowroom from './Interactive2DShowroom';
import { useWishlistStore } from '../store/useWishlistStore';
import { useAuthStore } from '../store/useAuthStore';

// Memoized Shade Item to prevent unnecessary re-renders
const ShadeCard = memo(({ shade, onSelect, textColor, isFavorite, onToggleFavorite, isSelected }: { 
  shade: Shade, 
  onSelect: (s: Shade) => void, 
  textColor: string,
  isFavorite?: boolean,
  onToggleFavorite?: (e: React.MouseEvent, s: Shade) => void,
  isSelected?: boolean
}) => (
  <div 
    onClick={() => onSelect(shade)}
    className={`group cursor-pointer rounded-lg overflow-hidden transition-all relative h-full flex flex-col bg-[#faf9f6] hover:-translate-y-1 active:scale-[0.97] ${isSelected ? 'border-2 border-gold ring-2 ring-gold/30 shadow-[0_6px_16px_rgba(200,165,100,0.3)] z-10' : 'border border-zinc-200 shadow-sm hover:border-gold/50 hover:shadow-[0_6px_16px_rgba(200,165,100,0.15)]'}`}
  >
    <div className="flex-grow w-full transition-all relative min-h-[50px] sm:min-h-[70px] lg:min-h-[75px]" style={{ backgroundColor: shade.hex }}>
        {onToggleFavorite && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(e, shade);
            }}
            className={`absolute top-1.5 right-1.5 z-20 p-1.5 rounded-full bg-black/20 hover:bg-black/45 text-white transition-all transform hover:scale-110 backdrop-blur-xs select-none cursor-pointer ${
              isFavorite ? 'opacity-100 scale-105' : 'opacity-75 hover:opacity-100'
            }`}
            title={isFavorite ? "Remove from wishlist" : "Save shade to wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </button>
        )}
    </div>
    <div className="bg-[#faf9f6] p-1.5 sm:p-2.5 text-center flex flex-col justify-center items-center gap-0.5 border-t border-zinc-100 shrink-0">
       <p className="text-[8px] sm:text-[9.5px] md:text-[10px] text-zinc-800 font-bold truncate w-full px-0.5">{shade.name}</p>
       <p className="text-[7px] sm:text-[8px] md:text-[8.5px] text-zinc-500 font-mono tracking-wider">{shade.shadeCode}</p>
    </div>
  </div>
));

ShadeCard.displayName = 'ShadeCard';

const ROOMS = {
  living: {
    name: 'Living Room',
    surfs: ['back', 'left', 'right', 'ceiling', 'floor'],
    defaults: { ceiling: '#fafafa', back: '#f4f4f4', left: '#eaeaea', right: '#ededed', floor: '#8b5e3c' }
  },
  bedroom: {
    name: 'Bedroom',
    surfs: ['back', 'left', 'right', 'ceiling', 'floor'],
    defaults: { ceiling: '#fafafa', back: '#f3f3f3', left: '#e9e9e9', right: '#ececec', floor: '#e0d5c3' }
  },
  exterior_modern: {
    name: 'Modern Bungalow',
    surfs: ['wall', 'door', 'roof', 'pillars', 'ground'],
    defaults: { wall: '#f4f4f4', door: '#8b5e3c', roof: '#5a544c', pillars: '#eaeaea', ground: '#8a9a70' }
  },
  exterior_villa: {
    name: 'Indian Villa',
    surfs: ['wall', 'door', 'roof', 'pillars', 'ground'],
    defaults: { wall: '#f4f4f4', door: '#8b5e3c', roof: '#5a544c', pillars: '#eaeaea', ground: '#8a9a70' }
  }
};

const SURF_LABELS: Record<string, string> = {
  back: 'Back Wall', left: 'Left/Accent', right: 'Right/Side',
  ceiling: 'Ceiling', floor: 'Floor', wall: 'Main Exterior',
  door: 'Front Door', roof: 'Canopy/Roof', pillars: 'Pillars/Trims', ground: 'Ground/Grass'
};

const BRANDS = [
  { id: 'all', label: 'All' },
  { id: 'asian', label: 'Asian Paints' },
  { id: 'berger', label: 'Berger Paints' }
];

const FAMILIES = [
  'all', 'favorites', 'whites', 'neutrals', 'yellows', 'oranges', 'pinks', 'reds', 'purples', 'blues', 'greens', 'browns', 'greys'
];

// Curated Professional Interior Presets for 1-click transformation
const INTER_PRESETS = [
  {
    name: "Subtle Sand",
    desc: "Warm minimalist Alabaster with soft oak floor textures",
    colors: { back: '#f5ebe0', left: '#e3d5ca', right: '#e3d5ca', ceiling: '#faf8f5', floor: '#b5835a' }
  },
  {
    name: "Imperial Luxury",
    desc: "Plush deep indigo accent paired with cream trims and teak floor",
    colors: { back: '#1e293b', left: '#f1f5f9', right: '#f1f5f9', ceiling: '#fafafa', floor: '#451a03' }
  },
  {
    name: "Nordic Breeze",
    desc: "Slate grey accent paired with clean ice blue and white floor limits",
    colors: { back: '#475569', left: '#cbd5e1', right: '#e2e8f0', ceiling: '#f8fafc', floor: '#f3f4f6' }
  },
  {
    name: "Tuscan Sun",
    desc: "Exotic warm mustard contrast paired with sand walls and terracotta flooring",
    colors: { back: '#eab308', left: '#fef08a', right: '#fef08a', ceiling: '#fefce8', floor: '#9a3412' }
  }
];

// Curated Professional Exterior Presets
const EXTER_PRESETS = [
  {
    name: "Tuscan Estate",
    desc: "Cream brick facades, terracotta clay roofs, and walnut highlights",
    colors: { wall: '#eed9c4', door: '#5c4033', roof: '#800000', pillars: '#fafaf9', ground: '#606c38' }
  },
  {
    name: "Sleek Industrial",
    desc: "Sleek slate graphite grey, charcoal doors, and gravel grey limits",
    colors: { wall: '#3f4b5a', door: '#1e293b', roof: '#0f172a', pillars: '#e2e8f0', ground: '#4a5d4e' }
  },
  {
    name: "Modern Villa",
    desc: "Clean limestone structure, golden mahogany frames, and modern glass structures",
    colors: { wall: '#fcfaf2', door: '#cca564', roof: '#3d302b', pillars: '#ffffff', ground: '#6e8550' }
  }
];

// Helper to convert hex to HSL
function hexToHsl(hexStr: string) {
  const hex = hexStr.replace('#', '');
  if (hex.length !== 6) return { h: 0, s: 0, l: 50 };
  
  let r = parseInt(hex.slice(0, 2), 16) / 255;
  let g = parseInt(hex.slice(2, 4), 16) / 255;
  let b = parseInt(hex.slice(4, 6), 16) / 255;
  
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Helper to convert HSL to hex
function hslToHex(h: number, s: number, l: number) {
  let finalH = h / 360;
  let finalS = s / 100;
  let finalL = l / 100;
  let finalR, finalG, finalB;
  
  if (finalS === 0) {
    finalR = finalG = finalB = finalL;
  } else {
    const hue2rgb = (pValue: number, qValue: number, tValue: number) => {
      let t = tValue;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return pValue + (qValue - pValue) * 6 * t;
      if (t < 1/2) return qValue;
      if (t < 2/3) return pValue + (qValue - pValue) * (2/3 - t) * 6;
      return pValue;
    };
    const q = finalL < 0.5 ? finalL * (1 + finalS) : finalL + finalS - finalL * finalS;
    const p = 2 * finalL - q;
    finalR = hue2rgb(p, q, finalH + 1/3);
    finalG = hue2rgb(p, q, finalH);
    finalB = hue2rgb(p, q, finalH - 1/3);
  }
  const toHexVal = (x: number) => {
    const hexVal = Math.round(x * 255).toString(16);
    return hexVal.length === 1 ? '0' + hexVal : hexVal;
  };
  return `#${toHexVal(finalR)}${toHexVal(finalG)}${toHexVal(finalB)}`;
}

// Helper to convert hex to RGB values
function hexToRgbValues(hexStr: string) {
  const hex = hexStr.replace('#', '');
  if (hex.length !== 6) return { r: 128, g: 128, b: 128 };
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16)
  };
}

// Helper to convert RGB values to hex
function rgbToHex(r: number, g: number, b: number) {
  const toHexVal = (x: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(x)));
    const hexVal = clamped.toString(16);
    return hexVal.length === 1 ? '0' + hexVal : hexVal;
  };
  return `#${toHexVal(r)}${toHexVal(g)}${toHexVal(b)}`;
}

// Helper to calculate cohesive harmonies using HSL color space rotation
function calculateHarmonies(hexStr: string) {
  const hex = hexStr.replace('#', '');
  if (hex.length !== 6) return [];
  
  let r = parseInt(hex.slice(0, 2), 16) / 255;
  let g = parseInt(hex.slice(2, 4), 16) / 255;
  let b = parseInt(hex.slice(4, 6), 16) / 255;
  
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  const hslToHex = (hInput: number, sInput: number, lInput: number) => {
    let finalH = hInput / 360;
    let finalS = sInput / 100;
    let finalL = lInput / 100;
    let finalR, finalG, finalB;
    
    if (finalS === 0) {
      finalR = finalG = finalB = finalL;
    } else {
      const hue2rgb = (pValue: number, qValue: number, tValue: number) => {
        let t = tValue;
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return pValue + (qValue - pValue) * 6 * t;
        if (t < 1/2) return qValue;
        if (t < 2/3) return pValue + (qValue - pValue) * (2/3 - t) * 6;
        return pValue;
      };
      const q = finalL < 0.5 ? finalL * (1 + finalS) : finalL + finalS - finalL * finalS;
      const p = 2 * finalL - q;
      finalR = hue2rgb(p, q, finalH + 1/3);
      finalG = hue2rgb(p, q, finalH);
      finalB = hue2rgb(p, q, finalH - 1/3);
    }
    const toHexVal = (x: number) => {
      const hexVal = Math.round(x * 255).toString(16);
      return hexVal.length === 1 ? '0' + hexVal : hexVal;
    };
    return `#${toHexVal(finalR)}${toHexVal(finalG)}${toHexVal(finalB)}`;
  };

  return [
    {
      type: 'Complementary Accent',
      desc: 'Bold opposite accent pairing',
      hex: hslToHex((h + 180) % 360, Math.min(s + 5, 100), Math.max(l - 5, 20)),
    },
    {
      type: 'Monochromatic Depth',
      desc: 'Sophisticated tonal designer shade',
      hex: hslToHex(h, Math.max(s - 10, 15), l > 50 ? l - 25 : l + 25),
    },
    {
      type: 'Analogous Neighbor',
      desc: 'Harmonious flowing warm hue',
      hex: hslToHex((h + 30) % 360, s, Math.max(l - 5, 20)),
    },
    {
      type: 'Custom Paint Primer',
      desc: 'Warm matching framing neutral',
      hex: hslToHex(h, 8, Math.max(l, 86)),
    }
  ];
}

export default function VisualizerSection() {
  const navigate = useNavigate();
  const [visualizerMode, setVisualizerMode] = useState<'3d' | 'ai'>('3d');
  const [isWorkspaceCollapsed, setIsWorkspaceCollapsed] = useState(true);
  const [activeRoom, setActiveRoom] = useState<keyof typeof ROOMS>('living');
  const [activeSurf, setActiveSurf] = useState<string>('back');
  const [colors, setColors] = useState<Record<string, Record<string, string>>>({
    living: { ...ROOMS.living.defaults },
    bedroom: { ...ROOMS.bedroom.defaults },
    exterior_modern: { ...ROOMS.exterior_modern.defaults },
    exterior_villa: { ...ROOMS.exterior_villa.defaults }
  });
  
  // Track full shade objects per surface for info display
  const [surfaceShades, setSurfaceShades] = useState<Record<string, Record<string, Shade | null>>>({
    living: {},
    bedroom: {},
    exterior_modern: {},
    exterior_villa: {}
  });
  
  const [activeShade, setActiveShade] = useState<Shade | null>(null);
  const [aiSeedShade, setAiSeedShade] = useState<Shade | null>(null);
  const [copied, setCopied] = useState(false);
  const [sharedPresetIdx, setSharedPresetIdx] = useState<number | null>(null);
  const [aiPalettes, setAiPalettes] = useState<any | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiLimitState, setAiLimitState] = useState<{ active: boolean; reason: 'quota' | 'error' | null }>({ active: false, reason: null });
  const [isAiTheoryCollapsed, setIsAiTheoryCollapsed] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchAiPalette = async () => {
      const baseObj = aiSeedShade || { hex: colors[activeRoom][activeRoom.startsWith('exterior') ? 'wall' : 'back'] || '#cca564', name: 'Default color' };
      const surfs = ROOMS[activeRoom].surfs;
      
      setIsAiLoading(true);
      try {
        const response = await fetch("/api/palette", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            baseHex: baseObj.hex,
            baseName: baseObj.name,
            surfs: surfs,
            roomType: activeRoom
          })
        });
        if (!response.ok) throw new Error("API failed");
        const data = await response.json();
        
        if (active) {
          if (data && data.status === "fallback") {
            setAiLimitState({ active: true, reason: data.reason === 'quota_exceeded' ? 'quota' : 'error' });
            setAiPalettes(null);
          } else {
            setAiLimitState({ active: false, reason: null });
            setAiPalettes(data);
          }
        }
      } catch (err) {
        console.error("AI palette fetch failed:", err);
        if (active) {
          setAiLimitState({ active: true, reason: 'error' });
          setAiPalettes(null);
        }
      } finally {
        if (active) {
          setIsAiLoading(false);
        }
      }
    };

    fetchAiPalette();
    return () => { active = false; };
  }, [aiSeedShade, activeRoom]);
  
  const [sBrand, setSBrand] = useState('all');
  const [sFamily, setSFamily] = useState('all');
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);
  const [sSearch, setSSearch] = useState('');
  const deferredSearch = useDeferredValue(sSearch);

  const [shades, setShades] = useState<Shade[]>([]);
  const [loading, setLoading] = useState(true);

  const { items: wishlistItems, addItem: wishlistAddItem, removeItem: wishlistRemoveItem, addToast } = useWishlistStore();
  const { user, openAuthModal } = useAuthStore();

  const [recent, setRecent] = useState<Shade[]>([]);
  const [combination, setCombination] = useState<Shade[]>([]);
  const [customPaletteName, setCustomPaletteName] = useState('My Custom Palette');
  const [isRecentExpanded, setIsRecentExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(40);
  const brandRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Advanced Color Matcher state & matching algorithm
  const [allPool, setAllPool] = useState<Shade[]>([]);
  const [customColorMatch, setCustomColorMatch] = useState('#cca564');
  const [colorAdjustTab, setColorAdjustTab] = useState<'hsl' | 'rgb'>('hsl');
  const [isColorPickerActive, setIsColorPickerActive] = useState(false);
  const colorInputRef = useRef<HTMLInputElement>(null);

  // Synchronize Custom Color Matcher to active selected color
  useEffect(() => {
    if (activeShade) {
      setCustomColorMatch(activeShade.hex);
    }
  }, [activeShade]);

  // Real-time harmonies computed based on currently selected active color
  const computedHarmonies = useMemo(() => {
    if (!activeShade) return null;
    const items = calculateHarmonies(activeShade.hex);
    
    // Look up closest shades in catalog to make recommendations premium & clickable
    return items.map(item => {
      let bestShade = activeShade;
      let minDistance = Infinity;
      
      const hexToRgb = (hStr: string) => {
        const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hStr);
        return match ? {
          r: parseInt(match[1], 16),
          g: parseInt(match[2], 16),
          b: parseInt(match[3], 16)
        } : { r: 128, g: 128, b: 128 };
      };
      
      const rTarget = hexToRgb(item.hex);
      // Sample 300 shades from preloaded pool to calculate fast nearest matches
      for (let i = 0; i < Math.min(allPool.length, 600); i++) {
        const shade = allPool[i];
        const rS = hexToRgb(shade.hex);
        const d = Math.sqrt(
          (rTarget.r - rS.r) * (rTarget.r - rS.r) +
          (rTarget.g - rS.g) * (rTarget.g - rS.g) +
          (rTarget.b - rS.b) * (rTarget.b - rS.b)
        );
        if (d < minDistance) {
          minDistance = d;
          bestShade = shade;
        }
      }
      return {
        ...item,
        nearestShade: bestShade
      };
    });
  }, [activeShade, allPool]);

  const favorites = useMemo(() => {
    return wishlistItems
      .filter(item => item.type === 'shade')
      .map(item => {
        const matched = allPool.find(s => s.hex.toLowerCase() === item.hex.toLowerCase());
        return matched ? matched.id : '';
      })
      .filter(Boolean);
  }, [wishlistItems, allPool]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (brandRef.current && !brandRef.current.contains(event.target as Node)) {
        setIsBrandOpen(false);
      }
      if (familyRef.current && !familyRef.current.contains(event.target as Node)) {
        setIsFamilyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Analytics/Storage tracking
  useEffect(() => {
    const savedRecent = localStorage.getItem('rainbow-recent-shades');
    if (savedRecent) setRecent(JSON.parse(savedRecent));

    const savedComb = localStorage.getItem('rainbow-combination');
    if (savedComb) setCombination(JSON.parse(savedComb));
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { shades: data } = await shadeService.getShades({
        brand: sBrand,
        family: sFamily === 'favorites' ? 'all' : sFamily,
        search: deferredSearch,
        limit: 10000 
      });
      
      let finalShades = data;
      if (sFamily === 'favorites') {
        finalShades = data.filter(s => favorites.includes(s.id));
      }
      
      setShades(finalShades);
      setVisibleCount(40); // Reset visible count on filter change
      setLoading(false);
    }
    load();
  }, [sBrand, sFamily, deferredSearch, favorites]);

  // Load total pool on mount for real-time picker matching
  useEffect(() => {
    async function preloadPool() {
      try {
        const { shades: pool } = await shadeService.getShades({ brand: 'all', limit: 20000 });
        setAllPool(pool);
      } catch (e) {
        console.error("Failed to prefetch paint shades pool:", e);
      }
    }
    preloadPool();
  }, []);

  // Parse palette query parameter if passed via wishlist/sharing redirects
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paletteStr = params.get('palette');
    if (paletteStr && allPool.length > 0) {
      const hexes = paletteStr.split(',');
      if (hexes.length > 0) {
        const surfs = ROOMS[activeRoom].surfs;
        const newColors = { ...colors[activeRoom] };
        const newShades = { ...surfaceShades[activeRoom] };
        
        hexes.forEach((hex, idx) => {
          const surf = surfs[idx % surfs.length];
          if (surf) {
            const decodedHex = decodeURIComponent(hex);
            newColors[surf] = decodedHex;
            
            // Find a matching shade in allPool
            const matched = allPool.find(s => s.hex.toLowerCase() === decodedHex.toLowerCase());
            newShades[surf] = matched || {
              id: `query-${surf}-${decodedHex}`,
              name: `Palette Color ${idx + 1}`,
              shadeCode: decodedHex,
              hex: decodedHex,
              rgb: '',
              brand: 'Custom',
              category: 'Imported',
              finish: 'Matte',
              popular: false,
              family: 'Neutral'
            };
          }
        });
        
        setColors(prev => ({ ...prev, [activeRoom]: newColors }));
        setSurfaceShades(prev => ({ ...prev, [activeRoom]: newShades }));
      }
    }
  }, [window.location.search, allPool, activeRoom]);

  // Compute matched brand shades in real-time
  const matchedShades = useMemo(() => {
    if (!customColorMatch || allPool.length === 0) return null;

    const hexToRgb = (hexStr: string) => {
      const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexStr);
      return match ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16)
      } : { r: 128, g: 128, b: 128 };
    };

    const target = hexToRgb(customColorMatch);

    const findBestForBrand = (brandId: 'asian' | 'berger') => {
      let minDistance = Infinity;
      let closest: Shade | null = null;
      
      for (const shade of allPool) {
        if (brandId === 'asian' && !shade.brand.toLowerCase().includes('asian')) continue;
        if (brandId === 'berger' && !shade.brand.toLowerCase().includes('berger')) continue;

        const sRGB = hexToRgb(shade.hex);
        const dist = Math.sqrt(
          (target.r - sRGB.r) * (target.r - sRGB.r) +
          (target.g - sRGB.g) * (target.g - sRGB.g) +
          (target.b - sRGB.b) * (target.b - sRGB.b)
        );

        if (dist < minDistance) {
          minDistance = dist;
          closest = shade;
        }
      }

      const similarity = Math.max(0, Math.min(100, Math.round((1 - minDistance / 442) * 100)));
      return closest ? { shade: closest, similarity } : null;
    };

    return {
      asian: findBestForBrand('asian'),
      berger: findBestForBrand('berger')
    };
  }, [customColorMatch, allPool]);

  const toggleFavorite = (e: React.MouseEvent, shade: Shade) => {
    e.stopPropagation();
    if (!user) {
      addToast({
        productName: shade.name,
        message: 'Please sign in to add shades to your wishlist.',
        isError: true,
      });
      openAuthModal();
      return;
    }
    const isShadeWishlisted = wishlistItems.some(item => item.type === 'shade' && item.hex.toLowerCase() === shade.hex.toLowerCase());
    if (isShadeWishlisted) {
      const wishlistItem = wishlistItems.find(item => item.type === 'shade' && item.hex.toLowerCase() === shade.hex.toLowerCase());
      if (wishlistItem) {
        wishlistRemoveItem(wishlistItem.id, user?.uid || null);
      }
    } else {
      wishlistAddItem({
        type: 'shade',
        shadeCode: shade.shadeCode,
        name: shade.name,
        hex: shade.hex,
        family: shade.family || 'Classic'
      }, user?.uid || null);
    }
  };

  const addToRecent = (shade: Shade) => {
    setRecent(prev => {
      const filtered = prev.filter(s => s.id !== shade.id);
      const newRecent = [shade, ...filtered].slice(0, 10);
      localStorage.setItem('rainbow-recent-shades', JSON.stringify(newRecent));
      return newRecent;
    });
  };

  const toggleInCombination = async (shade: Shade) => {
    setCustomPaletteName('My Custom Palette');
    setCombination(prev => {
      let newComb = [...prev];
      if (newComb.some(s => s.id === shade.id)) {
        newComb = newComb.filter(s => s.id !== shade.id);
      } else {
        if (newComb.length < 5) {
          newComb.push(shade);
        } else {
          return prev; // Max 5 colors
        }
      }
      localStorage.setItem('rainbow-combination', JSON.stringify(newComb));
      
      // CRM Logging when they build combinations
      if (newComb.length > 0) {
        import('../lib/crm').then(({ crmService }) => {
          crmService.addLead({
            type: 'VISUALIZER',
            name: user?.displayName || 'Anonymous Visualizer User',
            phone: user?.phoneNumber || 'Unknown',
            email: user?.email || '',
            metadata: {
              room: activeRoom,
              combination: newComb.map(c => c.shadeCode).join(', '),
              shadesCount: newComb.length
            }
          }).catch(() => {});
        }).catch(() => {});
      }
      
      return newComb;
    });
  };

  const paintSurface = (surf: string, shade: Shade | null) => {
    if (!shade) return;
    
    setColors(prev => {
      const newRoomColors = { ...prev[activeRoom] };
      if (surf === 'all') {
        const walls = String(activeRoom).startsWith('exterior') ? ['wall'] : ['back', 'left', 'right'];
        walls.forEach(w => newRoomColors[w] = shade.hex);
      } else {
        newRoomColors[surf] = shade.hex;
      }
      return { ...prev, [activeRoom]: newRoomColors };
    });

    setSurfaceShades(prev => {
      const newRoomShades = { ...prev[activeRoom] };
      if (surf === 'all') {
        const walls = String(activeRoom).startsWith('exterior') ? ['wall'] : ['back', 'left', 'right'];
        walls.forEach(w => newRoomShades[w] = shade);
      } else {
        newRoomShades[surf] = shade;
      }
      return { ...prev, [activeRoom]: newRoomShades };
    });
  };

  const handleSharePalette = (e: React.MouseEvent, preset: any, idx: number) => {
    e.stopPropagation();
    const hexQuery = Object.values(preset.colors).map(hex => encodeURIComponent(String(hex))).join(',');
    const shareUrl = `${window.location.origin}/visualizer?palette=${hexQuery}`;
    navigator.clipboard.writeText(shareUrl);
    setSharedPresetIdx(idx);
    setTimeout(() => setSharedPresetIdx(null), 2500);
  };

  const handleTogglePresetWishlist = (e: React.MouseEvent, preset: any) => {
    e.stopPropagation();
    if (!user) {
      addToast({
        productName: preset.name,
        message: 'Please sign in to save this color palette combination.',
        isError: true,
      });
      openAuthModal();
      return;
    }
    
    // Check if combo already exists in wishlist by comparing name
    const existingCombo = wishlistItems.find(item => 
      item.type === 'combination' && 
      item.name === preset.name
    );

    if (existingCombo) {
      wishlistRemoveItem(existingCombo.id, user?.uid || null);
    } else {
      const shadesArray = Object.entries(preset.colors).map(([surf, color]) => {
        const hVal = String(color);
        const matched = preset.resolvedShades?.[surf] || allPool.find(s => s.hex.toLowerCase() === hVal.toLowerCase());
        return {
          shadeCode: matched?.shadeCode || hVal,
          name: matched?.name || SURF_LABELS[surf] || surf,
          hex: hVal,
          family: matched?.family || 'Neutral'
        };
      });

      wishlistAddItem({
        type: 'combination',
        name: preset.name,
        shades: shadesArray
      }, user?.uid || null);
    }
  };

  const applyCuratedPreset = (presetColors: Record<string, string>, resolvedShades?: Record<string, Shade>) => {
    setColors(prev => ({
      ...prev,
      [activeRoom]: { ...presetColors }
    }));
    
    // Set custom text details to mock matching details in visualizer list or use real shades
    const mappedShadesRecord: Record<string, Shade> = {};
    Object.entries(presetColors).forEach(([surf, hex]) => {
      if (resolvedShades && resolvedShades[surf]) {
        mappedShadesRecord[surf] = resolvedShades[surf];
      } else {
        mappedShadesRecord[surf] = {
          id: `preset-${surf}`,
          name: `Curated Color`,
          shadeCode: `PRESET`,
          hex: hex,
          rgb: '',
          brand: 'Curated Designer Palette',
          category: '',
          finish: '',
          popular: true,
          family: 'Curated'
        };
      }
    });
    
    setSurfaceShades(prev => ({
      ...prev,
      [activeRoom]: mappedShadesRecord
    }));
  };

  const handleShadeSelect = (shade: Shade, updateAiSeed = false) => {
    setActiveShade(shade);
    addToRecent(shade);
    if (updateAiSeed) {
      setAiSeedShade(shade);
    }
    
    const container = document.getElementById('visualizer-container');
    if (container) {
      setTimeout(() => {
        const y = container.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 50);
    }
  };

  const handleSurfClick = (surf: string) => {
    setActiveSurf(surf);
    if (activeShade) {
      paintSurface(surf, activeShade);
    }
  };

  const handleReset = () => {
    setColors(prev => ({
      ...prev,
      [activeRoom]: { ...ROOMS[activeRoom].defaults }
    }));
    setSurfaceShades(prev => ({
      ...prev,
      [activeRoom]: {}
    }));
    setActiveShade(null);
  };

  const clearSelection = () => {
    setActiveShade(null);
    setActiveSurf(ROOMS[activeRoom].surfs[0]);
  };

  const copyShade = () => {
    if (!activeShade) return;
    navigator.clipboard.writeText(`${activeShade.name} ${activeShade.shadeCode} ${activeShade.hex}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentRoomColors = colors[activeRoom];

  const getTextColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luma = 0.299 * r + 0.587 * g + 0.114 *b;
    return luma > 145 ? '#1A1410' : '#F0E8D8';
  };

  const isExteriorRoom = useMemo(() => {
    return String(activeRoom).startsWith('exterior');
  }, [activeRoom]);

  const mathematicalPalettes = useMemo(() => {
    const baseColorHex = aiSeedShade?.hex || colors[activeRoom][activeRoom.startsWith('exterior') ? 'wall' : 'back'] || '#cca564';
    const surfs = ROOMS[activeRoom].surfs;
    const hsl = hexToHsl(baseColorHex);

    // 1. Monochromatic Fallback
    const monoColors: Record<string, string> = {};
    surfs.forEach((s, idx) => {
      if (idx === 0) {
        monoColors[s] = baseColorHex;
      } else {
        const valL = idx % 2 === 0 
          ? Math.max(hsl.l - idx * 10, 15) 
          : Math.min(hsl.l + idx * 10, 85);
        const valS = Math.max(hsl.s - idx * 5, 10);
        monoColors[s] = hslToHex(hsl.h, valS, valL);
      }
    });

    // 2. Complementary Fallback
    const compColors: Record<string, string> = {};
    const compH = (hsl.h + 180) % 360;
    surfs.forEach((s, idx) => {
      if (idx === 0) {
        compColors[s] = baseColorHex;
      } else if (idx === 1) {
        compColors[s] = hslToHex(compH, hsl.s, hsl.l);
      } else if (idx % 2 === 0) {
        compColors[s] = hslToHex(hsl.h, Math.max(hsl.s - 15, 10), Math.min(hsl.l + idx * 8, 90));
      } else {
        compColors[s] = hslToHex(compH, Math.max(hsl.s - 15, 10), Math.max(hsl.l - idx * 8, 15));
      }
    });

    // 3. Triadic Fallback
    const triadColors: Record<string, string> = {};
    const triadH1 = (hsl.h + 120) % 360;
    const triadH2 = (hsl.h + 240) % 360;
    surfs.forEach((s, idx) => {
      if (idx === 0) {
        triadColors[s] = baseColorHex;
      } else if (idx === 1) {
        triadColors[s] = hslToHex(triadH1, hsl.s, hsl.l);
      } else if (idx === 2) {
        triadColors[s] = hslToHex(triadH2, hsl.s, hsl.l);
      } else if (idx === 3) {
        triadColors[s] = hslToHex(triadH1, 15, 90);
      } else {
        triadColors[s] = hslToHex(triadH2, Math.min(hsl.s + 10, 80), 25);
      }
    });

    // 4. Analogous Fallback
    const analogousColors: Record<string, string> = {};
    const analogH1 = (hsl.h + 30) % 360;
    const analogH2 = (hsl.h - 30 + 360) % 360;
    surfs.forEach((s, idx) => {
      if (idx === 0) {
        analogousColors[s] = baseColorHex;
      } else if (idx === 1) {
        analogousColors[s] = hslToHex(analogH1, hsl.s, hsl.l);
      } else if (idx === 2) {
        analogousColors[s] = hslToHex(analogH2, hsl.s, hsl.l);
      } else if (idx % 2 === 0) {
        analogousColors[s] = hslToHex(analogH1, Math.max(hsl.s - 10, 10), Math.min(hsl.l + idx * 8, 90));
      } else {
        analogousColors[s] = hslToHex(analogH2, Math.max(hsl.s - 10, 10), Math.max(hsl.l - idx * 8, 15));
      }
    });

    return {
      monochromatic: {
        name: "Monochromatic Harmony",
        desc: "Cohesive tonal variations that create a deep, layered, and sophisticated architectural backdrop.",
        colors: monoColors
      },
      complementary: {
        name: "Complementary Contrast",
        desc: "A bold pairing of opposite hues on the color wheel that energizes the room's primary surfaces.",
        colors: compColors
      },
      triadic: {
        name: "Triadic Balance",
        desc: "An active, celebratory combination using three evenly spaced colors for premium visual balance.",
        colors: triadColors
      },
      analogous: {
        name: "Analogous Rhythm",
        desc: "A calm, gentle flow using neighboring colors for a seamless, cozy transition between surfaces.",
        colors: analogousColors
      }
    };
  }, [aiSeedShade, activeRoom, colors]);

  const resolvedPresets = useMemo<{ name: string; desc: string; colors: Record<string, string>; resolvedShades: Record<string, Shade>; style?: 'custom' | 'static' }[]>(() => {
    const rawPalettes = (aiPalettes && !isAiLoading) ? aiPalettes : mathematicalPalettes;
    const keys = ['monochromatic', 'complementary', 'triadic', 'analogous'];
    
    // Support spelling errors / key variants mapping
    const sourceData = {
      monochromatic: rawPalettes.monochromatic || rawPalettes.mono,
      complementary: rawPalettes.complementary || rawPalettes.complimentary || rawPalettes.comp,
      triadic: rawPalettes.triadic || rawPalettes.tridiac || rawPalettes.triad,
      analogous: rawPalettes.analogous || rawPalettes.analogue || rawPalettes.analog
    };

    const hexToRgb = (hStr: string) => {
      const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hStr);
      return match ? {
        r: parseInt(match[1], 16),
        g: parseInt(match[2], 16),
        b: parseInt(match[3], 16)
      } : { r: 128, g: 128, b: 128 };
    };

    return keys.map((key) => {
      const item = sourceData[key as keyof typeof sourceData] || mathematicalPalettes[key as keyof typeof mathematicalPalettes];
      const resolvedColors: Record<string, string> = {};
      const resolvedShades: Record<string, Shade> = {};

      const inputColors = item?.colors || {};

      Object.entries(inputColors).forEach(([surf, hex]) => {
        const hexVal = String(hex);
        if (allPool.length > 0) {
          let bestShade = allPool[0];
          let minDistance = Infinity;
          const rTarget = hexToRgb(hexVal);

          for (let i = 0; i < allPool.length; i++) {
            const shade = allPool[i];
            const rS = hexToRgb(shade.hex);
            const d = Math.sqrt(
              (rTarget.r - rS.r) * (rTarget.r - rS.r) +
              (rTarget.g - rS.g) * (rTarget.g - rS.g) +
              (rTarget.b - rS.b) * (rTarget.b - rS.b)
            );
            if (d < minDistance) {
              minDistance = d;
              bestShade = shade;
            }
          }
          if (bestShade) {
            resolvedColors[surf] = bestShade.hex;
            resolvedShades[surf] = bestShade;
          } else {
            resolvedColors[surf] = hexVal;
          }
        } else {
          resolvedColors[surf] = hexVal;
        }
      });

      return {
        name: item?.name || `${key.charAt(0).toUpperCase() + key.slice(1)} Palette`,
        desc: item?.desc || `Architectural paint recommendations for ${key} layout.`,
        colors: resolvedColors,
        resolvedShades,
        style: 'custom' as const
      };
    });
  }, [aiPalettes, isAiLoading, mathematicalPalettes, allPool]);

  return (
    <section id="visualizer" className="relative z-10">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-500/5 blur-[50px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Toggle Mode Selector */}
        <div className="flex justify-center mb-8 relative z-20">
          <div className="flex items-center gap-1.5 border border-zinc-200 bg-[#fdfbf7]/95 p-1 rounded-full shadow-sm max-w-md w-full sm:w-auto">
            <button 
              onClick={() => setVisualizerMode('3d')}
              className={`flex-1 sm:flex-none px-5 py-2.5 text-[10px] font-sans font-semibold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 ${visualizerMode === '3d' ? 'bg-gold text-white shadow-md' : 'text-zinc-500 hover:text-gold hover:bg-gold/5'}`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${visualizerMode === '3d' ? 'text-white' : 'text-gold'}`} /> Preview Model
            </button>
            <button 
              onClick={() => setVisualizerMode('ai')}
              className={`flex-1 sm:flex-none px-5 py-2.5 text-[10px] font-sans font-semibold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 ${visualizerMode === 'ai' ? 'bg-gold text-white shadow-md' : 'text-zinc-500 hover:text-gold hover:bg-gold/5'}`}
            >
              <Palette className={`w-3.5 h-3.5 ${visualizerMode === 'ai' ? 'text-white' : 'text-gold'}`} /> Upload Image
            </button>
          </div>
        </div>

        {/* Showroom Header with Collapse/Expand action */}
        <div className="flex items-center justify-between bg-[#faf9f6]/95 border border-zinc-200 p-3 sm:p-4 rounded-2xl shadow-xs mb-6 relative z-10">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-gold shrink-0 animate-pulse" />
            <div>
              <h3 className="font-serif text-base sm:text-lg text-zinc-900 flex items-center gap-2 leading-none">
                {visualizerMode === 'ai' ? 'Custom Shade Visualiser' : '3D Showroom Models'}
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                {visualizerMode === 'ai' ? 'Upload a photo of your room or click \'Use Live Camera\' to capture your walls in real time!' : 'Visualize architectural paint pairings in real-time'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsWorkspaceCollapsed(!isWorkspaceCollapsed)}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[8.5px] sm:text-[10px] font-sans font-semibold uppercase tracking-widest bg-gold text-white hover:bg-gold/90 transition-all flex items-center gap-2 shadow-sm cursor-pointer border border-transparent"
          >
            {isWorkspaceCollapsed ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-white shrink-0 animate-bounce" /> <span className="hidden sm:inline">Expand Showroom Panel</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-white shrink-0" /> <span className="hidden sm:inline">Collapse Showroom Panel</span>
              </>
            )}
          </button>
        </div>

        <div id="visualizer-container" className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-6 lg:items-start relative w-full">
          
          {/* Workspace Area: 3D Rooms OR AI Space (Collapsible) */}
          {!isWorkspaceCollapsed && (
            <div className="transition-all duration-500 ease-in-out flex flex-col gap-4 lg:col-span-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {visualizerMode === 'ai' ? (
                  <AIPhotoStudio 
                    activeShade={activeShade} 
                    onSelectShade={handleShadeSelect}
                    allShades={shades}
                  />
                ) : (
                  <>
                    {/* 3D Room Selectors */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-2 px-1">
                      <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                        {(Object.entries(ROOMS) as [keyof typeof ROOMS, any][]).map(([id, info]) => (
                          <button 
                            key={id} 
                            onClick={() => { setActiveRoom(id); setActiveSurf(info.surfs[0]); }} 
                            className={`px-3.5 focus:outline-none py-1.5 font-sans font-semibold uppercase tracking-widest text-[9px] sm:text-[10px] rounded-full transition-all border ${activeRoom === id ? 'bg-gold text-white border-transparent shadow-md scale-102 font-bold' : 'bg-transparent border-zinc-200 text-zinc-500 hover:text-gold hover:border-gold/30 hover:bg-gold/5'}`}
                          >
                            {info.name}
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={handleReset}
                        className="self-center sm:self-auto px-3.5 py-1.5 font-display font-semibold uppercase tracking-widest text-[9px] sm:text-[10px] rounded-full transition-all border bg-[#faf9f6]/90 border-gold/40 text-gold hover:border-gold hover:bg-gold/5 lg:hover:scale-105 flex items-center gap-1.5 shadow-xs"
                      >
                        <RefreshCcw className="w-2.5 h-2.5 text-gold" /> Reset Colors
                      </button>
                    </div>

                    {/* SVG 2D Interactive Room Showroom */}
                    <div className="lg:sticky lg:top-[142px] sticky top-[102px] sm:top-[126px] z-30 flex flex-col w-[calc(100%+2rem)] -mx-4 sm:mx-0 sm:w-full glass-panel p-0 rounded-none sm:rounded-2xl border-x-0 sm:border-x border-y sm:border-y border-zinc-200 bg-[#faf9f6]/95 backdrop-blur-xl shadow-lg">
                      <Interactive2DShowroom
                        activeRoom={activeRoom}
                        colors={currentRoomColors}
                        activeSurf={activeSurf}
                        onSurfClick={handleSurfClick}
                        appliedShades={surfaceShades[activeRoom]}
                      />
                    </div>

                    {/* Designer Curated Color Schemes Row */}
                    <div className="bg-[#faf9f6]/90 border border-zinc-200 rounded-2xl p-4 shadow-xs mt-2 relative overflow-hidden">
                      <div 
                        onClick={() => setIsAiTheoryCollapsed(!isAiTheoryCollapsed)}
                        className={`flex items-center justify-between gap-2 flex-wrap cursor-pointer group/header select-none ${isAiTheoryCollapsed ? '' : 'border-b border-zinc-150 pb-2.5 mb-3.5'}`}
                      >
                        <div className="flex items-center gap-2">
                          <Palette className="w-4 h-4 text-gold shrink-0" />
                          <div>
                            <h4 className="font-serif text-[13px] font-bold text-zinc-900 leading-none flex items-center gap-1.5 group-hover/header:text-gold transition-colors">
                              AI Color Theory Harmonies
                              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-300 ${isAiTheoryCollapsed ? '' : 'rotate-180'}`} />
                            </h4>
                            <div className="flex items-center gap-1.5 flex-wrap mt-1">
                              <p className="text-[10px] text-zinc-400 font-sans leading-none">Dynamic combinations from our catalog.</p>
                              {aiSeedShade && (
                                <span className="inline-flex items-center gap-1 text-[9px] bg-gold/10 text-zinc-700 font-medium px-2 py-0.5 rounded-full border border-gold/20 leading-none">
                                  <span className="w-1.5 h-1.5 rounded-full inline-block shrink-0 animate-ping duration-1000" style={{ backgroundColor: aiSeedShade.hex }} />
                                  Anchor: <strong className="text-gold font-bold">{aiSeedShade.name}</strong>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          {activeShade && activeShade.hex !== aiSeedShade?.hex && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setAiSeedShade(activeShade);
                              }}
                              className="px-2.5 py-1 bg-gold hover:bg-gold/90 text-white border border-gold rounded-lg text-[9px] font-display font-semibold uppercase tracking-wider flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-xs"
                              title={`Regenerate theory combinations centered on ${activeShade.name}`}
                            >
                              <Sparkles className="w-2.5 h-2.5 text-white shrink-0" /> Focus AI on {activeShade.name}
                            </button>
                          )}
                          {isAiLoading && (
                            <div className="flex items-center gap-1.5 bg-gold/10 px-2 py-0.5 rounded-full border border-gold/20 animate-pulse shrink-0">
                              <Sparkles className="w-2.5 h-2.5 text-gold" />
                              <span className="text-[8px] font-mono tracking-wider font-semibold uppercase text-gold font-bold">Gemini...</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {!isAiTheoryCollapsed && (
                        <div className={`grid grid-cols-1 md:grid-cols-4 gap-3 transition-opacity duration-300 ${isAiLoading ? 'opacity-65 pointer-events-none' : ''}`}>
                        {resolvedPresets.map((preset, idx) => (
                          <div
                            key={idx}
                            onClick={() => applyCuratedPreset(preset.colors, preset.resolvedShades)}
                            className={`p-3 text-left border rounded-xl shadow-xs group cursor-pointer flex flex-col justify-between transition-all ${
                              preset.style === 'custom'
                                ? 'border-[#dfd6c0] bg-[#faf9f6] ring-1 ring-gold/20 hover:border-gold/75 hover:bg-white shadow-[0_4px_12px_rgba(200,165,100,0.06)]'
                                : 'border-zinc-250 bg-white/50 hover:bg-white hover:border-gold/50'
                            }`}
                          >
                            <div className="w-full">
                              <h5 className="font-serif text-xs font-bold text-zinc-900 mb-1 group-hover:text-gold transition-colors flex items-center justify-between gap-1.5 w-full">
                                <span className="truncate">{preset.name}</span>
                                {preset.style === 'custom' && (
                                  <span className="shrink-0 text-[7.5px] uppercase font-bold tracking-wider font-display text-gold bg-gold/10 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                                    <Sparkles className="w-2.5 h-2.5" /> Live
                                  </span>
                                )}
                              </h5>
                              <p className="text-[9.5px] text-zinc-500 leading-snug mb-3.5 h-[28px] overflow-hidden">{preset.desc}</p>
                            </div>
                            
                            <div className="w-full">
                              <div className="flex h-4 w-full rounded overflow-hidden border border-zinc-200 shadow-3xs">
                                {Object.entries(preset.colors).map(([surf, color]) => {
                                  const matchedShade = preset.resolvedShades[surf];
                                  const tooltipText = matchedShade
                                    ? `${matchedShade.brand}: ${matchedShade.name} (${matchedShade.shadeCode})`
                                    : `${surf}: ${color}`;
                                  return (
                                    <div 
                                      key={surf} 
                                      className="flex-grow h-full" 
                                      style={{ backgroundColor: color }}
                                      title={tooltipText}
                                    />
                                  );
                                })}
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-zinc-150">
                                <span className="block text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 text-center">
                                  Select color to preview
                                </span>
                                <div className="grid grid-cols-5 gap-1.5">
                                  {Object.entries(preset.colors).map(([surf, color]) => {
                                    const matchedShade = preset.resolvedShades[surf];
                                    const label = SURF_LABELS[surf] || surf;
                                    const shade: Shade = matchedShade || {
                                      id: `temp-${surf}-${color}`,
                                      name: label,
                                      shadeCode: color,
                                      hex: color,
                                      rgb: '',
                                      brand: 'Default',
                                      category: 'Theme',
                                      finish: 'Matte',
                                      popular: false,
                                      family: 'Neutral'
                                    };
                                    
                                    const isCurrentActive = activeShade?.hex.toLowerCase() === shade.hex.toLowerCase();
                                    
                                    return (
                                      <div
                                        key={surf}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleShadeSelect(shade);
                                        }}
                                        className={`aspect-[3/4] rounded-lg border flex flex-col bg-[#faf9f6] relative overflow-hidden group/item cursor-pointer transition-all hover:-translate-y-0.5 active:scale-95 ${
                                          isCurrentActive 
                                            ? 'border-gold ring-1 ring-gold/30 shadow-[0_2px_6px_rgba(200,165,100,0.15)] z-10 scale-[1.03]' 
                                            : 'border-zinc-200 shadow-3xs hover:border-gold/30 hover:shadow-[0_2px_4px_rgba(200,165,100,0.08)]'
                                        }`}
                                        title={`Apply ${label}: ${shade.name} (${shade.shadeCode}) to clipboard`}
                                      >
                                        <div 
                                          className="flex-grow w-full transition-transform group-hover/item:scale-105" 
                                          style={{ backgroundColor: color }}
                                        />
                                        <div className="bg-[#faf9f6]/90 p-0.5 text-center flex flex-col justify-center items-center h-[18px] border-t border-zinc-100 shrink-0 select-none overflow-hidden">
                                          <span className="text-[5.5px] text-zinc-850 font-bold leading-tight truncate w-full px-0.5">
                                            {shade.shadeCode}
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Save Palette & Share Action Footer */}
                              <div className="mt-3 pt-2 border-t border-zinc-150 flex items-center justify-between gap-1.5 relative w-full leading-none">
                                <span className="text-[8.5px] font-sans font-bold text-zinc-500 uppercase tracking-wider group-hover:text-gold transition-colors">
                                  Apply Palette
                                </span>
                                
                                <div className="flex items-center gap-1.5 z-20">
                                  {/* Wishlist toggle button */}
                                  {(() => {
                                    const isPresetWishlisted = wishlistItems.some(item => 
                                      item.type === 'combination' && 
                                      item.name === preset.name
                                    );
                                    return (
                                      <button
                                        type="button"
                                        onClick={(e) => handleTogglePresetWishlist(e, preset)}
                                        className={`p-1 rounded-md border transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                                          isPresetWishlisted 
                                            ? 'bg-red-50 border-red-200 text-red-500' 
                                            : 'bg-white border-zinc-200 text-zinc-400 hover:text-red-500 hover:border-red-100'
                                        }`}
                                        title={isPresetWishlisted ? "Remove palette from wishlist" : "Save palette to wishlist"}
                                      >
                                        <Heart className={`w-3 h-3 ${isPresetWishlisted ? 'fill-current' : ''}`} />
                                      </button>
                                    );
                                  })()}

                                  {/* Share button */}
                                  <button
                                    type="button"
                                    onClick={(e) => handleSharePalette(e, preset, idx)}
                                    className="p-1 rounded-md border bg-white border-zinc-200 text-zinc-400 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                                    title="Share palette link"
                                  >
                                    <Share2 className="w-3 h-3" />
                                  </button>
                                </div>

                                {/* Live Link Copied Tooltip */}
                                {sharedPresetIdx === idx && (
                                  <div className="absolute right-0 -top-7 bg-zinc-950 text-white text-[8px] font-medium px-2 py-0.5 rounded shadow-lg border border-zinc-800 animate-bounce tracking-wide z-30">
                                    Link Copied!
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            </div>
          )}

          {/* Controls Area / Sidebar Panel */}
          <div className={`transition-all duration-500 ease-in-out w-[calc(100%+2rem)] -mx-4 sm:mx-0 sm:w-full glass-panel rounded-none sm:rounded-2xl border-x-0 sm:border-x border-y sm:border-y border-zinc-200 bg-[#faf9f6]/95 backdrop-blur-xl flex flex-col shadow-lg h-full ${
            isWorkspaceCollapsed ? 'lg:col-span-12' : 'lg:col-span-4'
          }`}>
            




            {/* Colour Comparison & Filters Dashboard */}
            <div className="border-b border-zinc-200/50 flex flex-col gap-3.5 p-3.5 shrink-0">
              
              {/* Filters Block */}
              <div className="flex flex-col gap-2 pb-1">
                <span className="text-[8px] font-display font-semibold uppercase tracking-[0.2em] text-gold block">Filter Catalog</span>
                
                {/* Search Bar */}
                <div className="relative">
                  <div className="flex items-center gap-2 bg-white border border-zinc-200 shadow-3xs rounded-lg px-2.5 h-[32px] transition-all focus-within:border-gold/50 focus-within:ring-1 focus-within:ring-gold/15">
                    <Search className="w-3.5 h-3.5 text-gold shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Search shade by name or code" 
                      value={sSearch}
                      onChange={e => setSSearch(e.target.value)}
                      className="bg-transparent w-full border-none py-1.5 text-xs text-zinc-900 focus:outline-none placeholder:text-zinc-400 font-sans min-w-0"
                    />
                    {sSearch && (
                      <button onClick={() => setSSearch('')} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-100/10 rounded-full transition-colors text-gold hover:text-gold/80 shrink-0">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Brand & Family Dropdowns */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative" ref={brandRef}>
                    <button
                      type="button"
                      onClick={() => setIsBrandOpen(!isBrandOpen)}
                      className="bg-[#faf9f6]/95 border border-zinc-200 hover:bg-zinc-50 transition-all rounded-lg py-1 px-2.5 text-[10px] font-display font-semibold text-zinc-800 outline-none shadow-sm w-full text-left flex items-center justify-between gap-1 group h-[32px]"
                    >
                      <span className="truncate">
                        <span className="text-zinc-500 font-normal mr-1">Brand:</span>
                        {sBrand === 'all' ? 'All' : (BRANDS.find(b => b.id === sBrand)?.label || sBrand)}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-gold transition-transform duration-300 ${isBrandOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isBrandOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[calc(100%+4px)] left-0 w-[180px] bg-[#faf9f6]/95 backdrop-blur-xl border border-zinc-200 shadow-xl rounded-xl p-2 z-[100] max-h-[220px] overflow-y-auto custom-scrollbar"
                        >
                          <div className="flex flex-col gap-0.5">
                            {BRANDS.map(b => (
                              <button
                                key={b.id}
                                onClick={() => { setSBrand(b.id); setIsBrandOpen(false); }}
                                className={`text-left px-2 .5 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${sBrand === b.id ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                              >
                                {b.id === 'all' ? 'All Brands' : b.label}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative" ref={familyRef}>
                    <button
                      type="button"
                      onClick={() => setIsFamilyOpen(!isFamilyOpen)}
                      className="bg-[#faf9f6]/95 border border-zinc-200 hover:bg-zinc-50 transition-all rounded-lg py-1 px-2.5 text-[10px] font-display font-semibold text-zinc-800 outline-none shadow-sm w-full text-left flex items-center justify-between gap-1 group capitalize h-[32px]"
                    >
                      <span className="truncate">
                        <span className="text-zinc-500 font-normal mr-1">Family:</span>
                        {sFamily === 'all' ? 'All' : sFamily}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-gold transition-transform duration-300 ${isFamilyOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isFamilyOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[calc(100%+4px)] right-0 w-[180px] bg-[#faf9f6]/95 backdrop-blur-xl border border-zinc-200 shadow-xl rounded-xl p-2 z-[100] max-h-[220px] overflow-y-auto custom-scrollbar"
                        >
                          <div className="flex flex-col gap-0.5">
                            {FAMILIES.map(f => (
                              <button
                                key={f}
                                onClick={() => { setSFamily(f); setIsFamilyOpen(false); }}
                                className={`text-left px-2 py-1.5 rounded-md text-xs font-medium capitalize transition-all duration-300 ${sFamily === f ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
                              >
                                {f === 'all' ? 'All Families' : f}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
              
              {/* Selected Shade Preview */}
              <div className="relative shrink-0 pt-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[8px] font-display font-semibold uppercase tracking-[0.2em] text-gold block">{activeShade ? 'Selected Colour' : 'Select a Colour'}</span>
                  {activeShade && (
                    <button 
                      onClick={clearSelection}
                      className="text-[9px] text-gold/70 hover:text-gold font-display font-semibold uppercase tracking-widest transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCcw className="w-2.5 h-2.5 text-gold shrink-0" /> Clear
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3 bg-white border border-zinc-150 p-2.5 rounded-xl shadow-3xs">
                  <div 
                    className={`w-11 h-11 rounded-lg flex-shrink-0 border transition-all duration-300 flex items-center justify-center ${
                      activeShade 
                        ? 'border-royale-accent/50 shadow-[0_4px_15px_rgba(0,0,0,0.08)]' 
                        : 'border-dashed border-zinc-300 bg-zinc-100/30'
                    }`}
                    style={{ backgroundColor: activeShade ? activeShade.hex : 'transparent', boxShadow: activeShade ? `0 4px 20px ${activeShade.hex}40` : '' }}
                  >
                    {!activeShade && <Palette className="w-4.5 h-4.5 text-gold shrink-0 animate-pulse" />}
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-serif text-sm sm:text-base text-zinc-950 font-bold leading-normal mb-0.5 truncate">{activeShade ? activeShade.name : 'Choose a paint catalog swatch'}</h4>
                    <p className="text-[9px] text-gold uppercase tracking-widest leading-none font-bold">{activeShade ? activeShade.brand : 'Tap any swatches below to view'}</p>
                    {activeShade && <code className="text-[8.5px] text-zinc-500 font-mono tracking-wider">{activeShade.shadeCode}</code>}
                  </div>
                  {activeShade && (
                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button 
                        onClick={() => toggleInCombination(activeShade)}
                        className={`px-2 py-1 rounded-md text-[8.5px] font-display uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1 border w-full ${
                          combination.some(s => s.id === activeShade.id) 
                            ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm hover:bg-black' 
                            : 'bg-white border-gold/40 text-gold hover:border-gold hover:bg-gold/5 shadow-xs'
                        }`}
                      >
                        {combination.some(s => s.id === activeShade.id) ? (
                          <><Minus className="w-2.5 h-2.5 shrink-0 text-gold" /> Remove</>
                        ) : (
                          <><Plus className="w-2.5 h-2.5 shrink-0 text-gold" /> Palette</>
                        )}
                      </button>
                      {activeShade.hex !== aiSeedShade?.hex && (
                        <button 
                          onClick={() => setAiSeedShade(activeShade)}
                          className="px-2 py-1 rounded-md text-[8.5px] font-display uppercase tracking-wide font-semibold transition-all flex items-center justify-center gap-1 border w-full bg-gold/10 border-gold/30 text-gold hover:bg-gold/20 shadow-xs"
                          title="Generate theory-driven AI palettes for this color"
                        >
                          <Sparkles className="w-2.5 h-2.5 shrink-0 text-gold" /> Focus AI
                        </button>
                      )}
                      <button 
                        onClick={copyShade}
                        className={`px-2 py-1 rounded-md text-[8.5px] font-display uppercase tracking-wider transition-all flex items-center justify-center gap-1 border w-full ${
                          copied ? 'bg-gold border-gold text-white shadow-sm font-semibold' : 'bg-white border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50 shadow-xs'
                        }`}
                      >
                        {copied ? (
                          <span className="shrink-0 bg-gold text-white text-[8.5px]">COPIED!</span>
                        ) : (
                          <><Copy className="w-2.5 h-2.5 shrink-0 text-gold" /> Copy</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Choice Palette Combination */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[8px] font-display font-semibold uppercase tracking-[0.2em] text-gold flex items-center gap-1.5"><Palette className="w-3 h-3" /> Compare Clipboard Palette</span>
                  <span className="text-[9px] text-zinc-500 font-medium font-sans">{combination.length}/5</span>
                </div>
                
                {combination.length === 0 ? (
                  <div className="h-[52px] border border-dashed border-[#dfd6c0] rounded-lg flex items-center justify-center bg-transparent">
                    <p className="text-[9px] text-zinc-400 font-medium text-center px-4 leading-normal">
                      Compare customized shades here by tapping "+ Palette" above
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex gap-2.5">
                      {combination.map((shade, index) => (
                        <div 
                          key={index} 
                          className={`flex-1 aspect-[3/4] rounded-lg relative overflow-hidden group cursor-pointer flex flex-col bg-[#faf9f6] transition-all hover:-translate-y-0.5 active:scale-[0.97] ${activeShade?.id === shade.id ? 'border border-gold ring-1 ring-gold/30 shadow-[0_4px_12px_rgba(200,165,100,0.25)] z-10' : 'border border-zinc-200 shadow-sm hover:border-gold/40 hover:shadow-[0_4px_12px_rgba(200,165,100,0.1)]'}`}
                          onClick={() => handleShadeSelect(shade)}
                          title={`Apply ${shade.name}`}
                        >
                          <div 
                            className="flex-grow w-full transition-transform group-hover:scale-105" 
                            style={{ backgroundColor: shade.hex }}
                          />
                          <div className="bg-[#faf9f6] p-0.5 text-center flex flex-col justify-center items-center h-[24px] border-t border-zinc-100 shrink-0">
                            <span className="text-[5.5px] text-zinc-800 font-bold leading-tight truncate w-full px-0.5">{shade.name}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleInCombination(shade);
                            }}
                            className="absolute top-0.5 right-0.5 p-0.5 rounded-full bg-[#18181b]/70 hover:bg-red-600 hover:scale-105 active:scale-95 text-white transition-all backdrop-blur-3xs z-10 shadow-sm border border-white/10"
                            title="Remove from palette"
                          >
                            <X className="w-2.5 h-2.5 text-white" />
                          </button>
                        </div>
                      ))}
                      {Array.from({ length: 5 - combination.length }).map((_, i) => (
                        <div key={`empty-${i}`} className="flex-1 aspect-[3/4] rounded-lg border border-dashed border-zinc-200/50 bg-transparent" />
                      ))}
                    </div>

                    {/* Integrated Naming and Wishlist Controls for Current Custom Palette */}
                    <div className="mt-3.5 space-y-2.5 bg-white border border-zinc-150 p-2.5 rounded-xl">
                      {/* Name input */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <label htmlFor="custom-palette-name-input" className="text-[8px] font-display font-semibold uppercase tracking-widest text-[#cca564] leading-none">
                            Customize Palette Name
                          </label>
                          <span className="text-[7.5px] text-zinc-400 font-mono">Brand Your Blend</span>
                        </div>
                        <input
                          id="custom-palette-name-input"
                          type="text"
                          value={customPaletteName}
                          onChange={(e) => setCustomPaletteName(e.target.value)}
                          placeholder="e.g. My Custom Palette"
                          className="bg-[#faf9f6] border border-zinc-200 hover:border-zinc-300 focus:border-gold/50 focus:ring-1 focus:ring-gold/15 rounded-lg px-2.5 py-1.5 text-xs text-zinc-850 outline-none w-full font-serif font-bold transition-all"
                        />
                      </div>

                      {/* Wishlist toggle button */}
                      {(() => {
                        const isWishlisted = wishlistItems.some(item => {
                          if (item.type !== 'combination') return false;
                          if (item.name === customPaletteName) return true;
                          if (item.shades.length !== combination.length) return false;
                          return item.shades.every((s, i) => s.hex.toLowerCase() === combination[i].hex.toLowerCase());
                        });

                        const handleSavePaletteToggle = () => {
                          if (!user) {
                            addToast({
                              productName: customPaletteName || 'Custom Palette',
                              message: 'Please sign in to save your custom color palette combination.',
                              isError: true,
                            });
                            openAuthModal();
                            return;
                          }
                          const existingItem = wishlistItems.find(item => {
                            if (item.type !== 'combination') return false;
                            if (item.name === customPaletteName) return true;
                            if (item.shades.length !== combination.length) return false;
                            return item.shades.every((s, i) => s.hex.toLowerCase() === combination[i].hex.toLowerCase());
                          });

                          if (existingItem) {
                            wishlistRemoveItem(existingItem.id, user?.uid || null);
                          } else {
                            const shadesArray = combination.map(s => ({
                              shadeCode: s.shadeCode,
                              name: s.name,
                              hex: s.hex,
                              family: s.family
                            }));

                            wishlistAddItem({
                              type: 'combination',
                              name: customPaletteName.trim() || 'My Custom Palette',
                              shades: shadesArray
                            }, user?.uid || null);
                          }
                        };

                        return (
                          <button
                            type="button"
                            onClick={handleSavePaletteToggle}
                            className={`w-full py-1.75 px-3 rounded-lg text-[9.5px] font-display font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all active:scale-[0.98] ${
                              isWishlisted
                                ? 'bg-zinc-950 border-zinc-950 text-white shadow-md hover:bg-black'
                                : 'bg-[#faf9f6]/90 text-[#cca564] border-gold/30 hover:border-gold hover:bg-gold/5 shadow-3xs'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 shrink-0 transition-transform duration-300 ${isWishlisted ? 'fill-gold text-gold scale-110' : 'text-gold group-hover:scale-105'}`} />
                            {isWishlisted ? 'Saved inside Wishlist' : 'Save Palette to Wishlist'}
                          </button>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Custom Paint Color Matcher & Picker Panel */}
            <div className="border-b border-zinc-200/50 bg-[#dfd6c0]/10 p-3 sm:p-4 shrink-0">
              <button
                onClick={() => setIsColorPickerActive(!isColorPickerActive)}
                className="w-full flex items-center justify-between focus:outline-none group"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4.5 h-4.5 text-gold group-hover:rotate-12 transition-transform duration-300" />
                  <div className="text-left">
                    <span className="text-[10px] font-display font-bold uppercase tracking-wider text-zinc-800 block">
                      Custom Color Matcher
                    </span>
                    <span className="text-[8px] sm:text-[9px] text-[#cca564] font-medium leading-none block">
                      Match custom hex directly with real paint libraries
                    </span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded bg-zinc-900/5 group-hover:bg-gold/10 text-[9px] font-bold text-gold uppercase tracking-wider transition-all flex items-center gap-1`}>
                  {isColorPickerActive ? 'Close' : 'Open Picker'}
                  <ChevronDown className={`w-3 h-3 text-gold transition-transform duration-300 ${isColorPickerActive ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isColorPickerActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3.5 bg-[#faf9f6]/90 border border-gold/20 p-3.5 rounded-xl relative">
                      {/* Interactive Custom Pick Tile */}
                      {(() => {
                        const hVal = hexToHsl(customColorMatch);
                        const rgbVal = hexToRgbValues(customColorMatch);
                        const wheelRadius = 55; // Radius of our color wheel circle
                        const centerCoords = 65; // Center inside the 130x130 box
                        
                        // Calculate marker position on the wheel
                        const markerTheta = ((hVal.h - 90) * Math.PI) / 180;
                        const markerDist = (hVal.s / 100) * wheelRadius;
                        const markerX = centerCoords + markerDist * Math.cos(markerTheta);
                        const markerY = centerCoords + markerDist * Math.sin(markerTheta);

                        const handleWheelPointer = (e: React.PointerEvent<HTMLDivElement>) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const mouseX = e.clientX - rect.left;
                          const mouseY = e.clientY - rect.top;
                          
                          const dx = mouseX - centerCoords;
                          const dy = mouseY - centerCoords;
                          const distance = Math.sqrt(dx * dx + dy * dy);
                          
                          let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
                          if (angleDeg < 0) angleDeg += 360;
                          
                          const saturation = Math.min(100, Math.round((Math.min(distance, wheelRadius) / wheelRadius) * 100));
                          const hue = Math.round(angleDeg);
                          
                          setCustomColorMatch(hslToHex(hue, saturation, hVal.l));
                        };

                        const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
                          e.currentTarget.setPointerCapture(e.pointerId);
                          handleWheelPointer(e);
                        };

                        const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
                          if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                            handleWheelPointer(e);
                          }
                        };

                        const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
                          e.currentTarget.releasePointerCapture(e.pointerId);
                        };

                        // Quick nuance presets
                        const lighterHex = hslToHex(hVal.h, hVal.s, Math.min(hVal.l + 12, 100));
                        const darkerHex = hslToHex(hVal.h, hVal.s, Math.max(hVal.l - 12, 0));
                        const mutedHex = hslToHex(hVal.h, Math.max(hVal.s - 20, 0), hVal.l);
                        const vividHex = hslToHex(hVal.h, Math.min(hVal.s + 20, 100), hVal.l);

                        return (
                          <div className="flex flex-col gap-4 bg-white border border-zinc-200/60 p-3.5 rounded-xl">
                            {/* Wheel & Details Row */}
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                              {/* 1. Pointer-controlled Color Wheel */}
                              <div className="relative shrink-0 select-none">
                                <div 
                                  onPointerDown={handlePointerDown}
                                  onPointerMove={handlePointerMove}
                                  onPointerUp={handlePointerUp}
                                  className="w-[130px] h-[130px] rounded-full border border-zinc-300 shadow-md relative cursor-crosshair touch-none overflow-hidden"
                                  style={{
                                    background: `
                                      radial-gradient(circle, #ffffff 0%, transparent 100%),
                                      conic-gradient(from 0deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)
                                    `
                                  }}
                                >
                                  {/* Absolute selector dot */}
                                  <div 
                                    className="absolute w-3.5 h-3.5 -ml-1.75 -mt-1.75 rounded-full border-2 border-white shadow-[0_1.5px_4px_rgba(0,0,0,0.6)]"
                                    style={{
                                      left: `${markerX}px`,
                                      top: `${markerY}px`,
                                      backgroundColor: customColorMatch,
                                      transform: 'translate(-50%, -50%)'
                                    }}
                                  />
                                </div>
                                <div className="absolute -bottom-1 left-12 px-1.5 py-0.5 bg-zinc-950 text-white font-mono text-[7px] tracking-wider rounded font-bold uppercase leading-none shadow-sm flex items-center justify-center">
                                  H:{hVal.h}° S:{hVal.s}%
                                </div>
                              </div>

                              {/* 2. Color Status & Info Controls */}
                              <div className="flex-grow w-full space-y-2.5">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-9 h-9 rounded-full border border-zinc-200 shadow-inner shrink-0" style={{ backgroundColor: customColorMatch }} />
                                  <div className="min-w-0">
                                    <span className="text-[8px] font-display font-medium uppercase tracking-widest text-[#cca564] block leading-none mb-1">SELECTED CUSTOM HEX</span>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-xs font-bold text-zinc-800 uppercase tracking-wide leading-none">{customColorMatch}</span>
                                      <button
                                        type="button"
                                        onClick={() => colorInputRef.current?.click()}
                                        className="text-[8.5px] font-semibold text-zinc-550 border border-zinc-250 bg-zinc-50 hover:bg-zinc-100 px-1.5 py-0.5 rounded leading-none transition-colors"
                                      >
                                        Native Pick
                                      </button>
                                      <input
                                        ref={colorInputRef}
                                        type="color"
                                        value={customColorMatch}
                                        onChange={(e) => setCustomColorMatch(e.target.value)}
                                        className="sr-only invisible absolute w-0 h-0"
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Active Component Builder Configurator Toggles */}
                                <div className="flex bg-zinc-100/90 p-0.5 rounded-lg border border-zinc-200/60 transition-all">
                                  <button
                                    type="button"
                                    onClick={() => setColorAdjustTab('hsl')}
                                    className={`flex-1 text-center py-1 rounded text-[9.5px] font-bold tracking-wider uppercase transition-all ${
                                      colorAdjustTab === 'hsl'
                                        ? 'bg-zinc-950 text-white shadow-xs'
                                        : 'text-zinc-500 hover:text-zinc-850'
                                    }`}
                                  >
                                    HSL Mode
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setColorAdjustTab('rgb')}
                                    className={`flex-1 text-center py-1 rounded text-[9.5px] font-bold tracking-wider uppercase transition-all ${
                                      colorAdjustTab === 'rgb'
                                        ? 'bg-zinc-950 text-white shadow-xs'
                                        : 'text-zinc-500 hover:text-zinc-850'
                                    }`}
                                  >
                                    RGB Mode
                                  </button>
                                </div>

                                {colorAdjustTab === 'hsl' ? (
                                  <div className="space-y-2.5">
                                    {/* Hue Control Slider */}
                                    <div className="space-y-0.5">
                                      <div className="flex justify-between items-center text-[8px] font-semibold text-zinc-500 uppercase tracking-wider">
                                        <span>HUE: {hVal.h}°</span>
                                        <span>Color Spectrum</span>
                                      </div>
                                      <input
                                        type="range"
                                        min="0"
                                        max="360"
                                        value={hVal.h}
                                        onChange={(e) => {
                                          const newH = parseInt(e.target.value);
                                          setCustomColorMatch(hslToHex(newH, hVal.s, hVal.l));
                                        }}
                                        className="w-full h-1.5 rounded-lg appearance-none cursor-ew-resize outline-none accent-gold"
                                        style={{
                                          background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                                        }}
                                      />
                                    </div>

                                    {/* Saturation Control Slider */}
                                    <div className="space-y-0.5">
                                      <div className="flex justify-between items-center text-[8px] font-semibold text-zinc-500 uppercase tracking-wider">
                                        <span>SATURATION: {hVal.s}%</span>
                                        <span>Vividness</span>
                                      </div>
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={hVal.s}
                                        onChange={(e) => {
                                          const newS = parseInt(e.target.value);
                                          setCustomColorMatch(hslToHex(hVal.h, newS, hVal.l));
                                        }}
                                        className="w-full h-1.5 rounded-lg appearance-none cursor-ew-resize outline-none accent-gold"
                                        style={{
                                          background: `linear-gradient(to right, ${hslToHex(hVal.h, 0, hVal.l)}, ${hslToHex(hVal.h, 100, hVal.l)})`
                                        }}
                                      />
                                    </div>

                                    {/* Lightness Control Slider */}
                                    <div className="space-y-0.5">
                                      <div className="flex justify-between items-center text-[8px] font-semibold text-zinc-500 uppercase tracking-wider">
                                        <span>LIGHTNESS: {hVal.l}%</span>
                                        <span>Shade Brightness</span>
                                      </div>
                                      <input
                                        type="range"
                                        min="3"
                                        max="97"
                                        value={hVal.l}
                                        onChange={(e) => {
                                          const newL = parseInt(e.target.value);
                                          setCustomColorMatch(hslToHex(hVal.h, hVal.s, newL));
                                        }}
                                        className="w-full h-1.5 rounded-lg appearance-none cursor-ew-resize outline-none accent-gold"
                                        style={{
                                          background: `linear-gradient(to right, #000000, ${hslToHex(hVal.h, hVal.s, 50)}, #ffffff)`
                                        }}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-2.5">
                                    {/* Red Channel Slider */}
                                    <div className="space-y-0.5">
                                      <div className="flex justify-between items-center text-[8px] font-semibold text-zinc-500 uppercase tracking-wider">
                                        <span className="text-red-650 font-bold">RED channel: {rgbVal.r}</span>
                                        <span>0 - 255</span>
                                      </div>
                                      <input
                                        type="range"
                                        min="0"
                                        max="255"
                                        value={rgbVal.r}
                                        onChange={(e) => {
                                          const newR = parseInt(e.target.value);
                                          setCustomColorMatch(rgbToHex(newR, rgbVal.g, rgbVal.b));
                                        }}
                                        className="w-full h-1.5 rounded-lg appearance-none cursor-ew-resize outline-none accent-red-650"
                                        style={{
                                          background: `linear-gradient(to right, ${rgbToHex(0, rgbVal.g, rgbVal.b)}, ${rgbToHex(255, rgbVal.g, rgbVal.b)})`
                                        }}
                                      />
                                    </div>

                                    {/* Green Channel Slider */}
                                    <div className="space-y-0.5">
                                      <div className="flex justify-between items-center text-[8px] font-semibold text-zinc-500 uppercase tracking-wider">
                                        <span className="text-emerald-700 font-bold">GREEN channel: {rgbVal.g}</span>
                                        <span>0 - 255</span>
                                      </div>
                                      <input
                                        type="range"
                                        min="0"
                                        max="255"
                                        value={rgbVal.g}
                                        onChange={(e) => {
                                          const newG = parseInt(e.target.value);
                                          setCustomColorMatch(rgbToHex(rgbVal.r, newG, rgbVal.b));
                                        }}
                                        className="w-full h-1.5 rounded-lg appearance-none cursor-ew-resize outline-none accent-emerald-600"
                                        style={{
                                          background: `linear-gradient(to right, ${rgbToHex(rgbVal.r, 0, rgbVal.b)}, ${rgbToHex(rgbVal.r, 255, rgbVal.b)})`
                                        }}
                                      />
                                    </div>

                                    {/* Blue Channel Slider */}
                                    <div className="space-y-0.5">
                                      <div className="flex justify-between items-center text-[8px] font-semibold text-zinc-500 uppercase tracking-wider">
                                        <span className="text-blue-650 font-bold">BLUE channel: {rgbVal.b}</span>
                                        <span>0 - 255</span>
                                      </div>
                                      <input
                                        type="range"
                                        min="0"
                                        max="255"
                                        value={rgbVal.b}
                                        onChange={(e) => {
                                          const newB = parseInt(e.target.value);
                                          setCustomColorMatch(rgbToHex(rgbVal.r, rgbVal.g, newB));
                                        }}
                                        className="w-full h-1.5 rounded-lg appearance-none cursor-ew-resize outline-none accent-blue-600"
                                        style={{
                                          background: `linear-gradient(to right, ${rgbToHex(rgbVal.r, rgbVal.g, 0)}, ${rgbToHex(rgbVal.r, rgbVal.g, 255)})`
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Nuance Quick Toggles Block */}
                            <div className="space-y-1.5 border-t border-zinc-100 pt-3">
                              <span className="text-[8px] font-display font-medium uppercase tracking-widest text-[#cca564] block leading-none">
                                Quick Toggles & Similars (Tap to select)
                              </span>
                              <div className="grid grid-cols-4 gap-2">
                                {/* Lighter */}
                                <button
                                  type="button"
                                  onClick={() => setCustomColorMatch(lighterHex)}
                                  className="group text-left focus:outline-none"
                                >
                                  <div className="h-6 w-full rounded-md border border-zinc-200 shadow-3xs mb-0.5 group-hover:scale-[1.03] active:scale-[0.97] transition-all" style={{ backgroundColor: lighterHex }} />
                                  <span className="text-[7.5px] font-semibold text-zinc-600 block text-center truncate">Lighter (+12%)</span>
                                </button>
                                {/* Darker */}
                                <button
                                  type="button"
                                  onClick={() => setCustomColorMatch(darkerHex)}
                                  className="group text-left focus:outline-none"
                                >
                                  <div className="h-6 w-full rounded-md border border-zinc-200 shadow-3xs mb-0.5 group-hover:scale-[1.03] active:scale-[0.97] transition-all" style={{ backgroundColor: darkerHex }} />
                                  <span className="text-[7.5px] font-semibold text-zinc-600 block text-center truncate">Darker (-12%)</span>
                                </button>
                                {/* Muted */}
                                <button
                                  type="button"
                                  onClick={() => setCustomColorMatch(mutedHex)}
                                  className="group text-left focus:outline-none"
                                >
                                  <div className="h-6 w-full rounded-md border border-zinc-200 shadow-3xs mb-0.5 group-hover:scale-[1.03] active:scale-[0.97] transition-all" style={{ backgroundColor: mutedHex }} />
                                  <span className="text-[7.5px] font-semibold text-zinc-600 block text-center truncate">Softer / Muted</span>
                                </button>
                                {/* Vivid */}
                                <button
                                  type="button"
                                  onClick={() => setCustomColorMatch(vividHex)}
                                  className="group text-left focus:outline-none"
                                >
                                  <div className="h-6 w-full rounded-md border border-zinc-200 shadow-3xs mb-0.5 group-hover:scale-[1.03] active:scale-[0.97] transition-all" style={{ backgroundColor: vividHex }} />
                                  <span className="text-[7.5px] font-semibold text-zinc-600 block text-center truncate">Vivid / Rich</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Realtime database matched cards */}
                      {matchedShades && (
                        <div className="space-y-2">
                          <span className="text-[7.5px] font-display font-bold uppercase tracking-[0.15em] text-gold block">
                            Database Formula Matches
                          </span>
                          <div className="grid grid-cols-2 gap-2.5">
                            {/* Asian Paint */}
                            {matchedShades.asian ? (
                              <button
                                onClick={() => handleShadeSelect(matchedShades.asian!.shade, true)}
                                className={`text-left bg-white border rounded-xl overflow-hidden shadow-xs flex flex-col relative transition-all duration-350 hover:-translate-y-0.5 ${activeShade?.id === matchedShades.asian.shade.id ? 'border-gold ring-1 ring-gold/35 shadow-[0_4px_10px_rgba(200,165,100,0.15)]' : 'border-zinc-200/80 hover:border-gold/30'}`}
                              >
                                <div className="h-2 w-full" style={{ backgroundColor: matchedShades.asian.shade.hex }} />
                                <div className="p-2 flex flex-col justify-between flex-grow w-full">
                                  <div>
                                    <h4 className="font-serif text-[10px] font-bold text-zinc-900 truncate mb-0.5">
                                      {matchedShades.asian.shade.name}
                                    </h4>
                                    <p className="text-[7.5px] font-mono text-zinc-400 capitalize truncate">
                                      {matchedShades.asian.shade.shadeCode}
                                    </p>
                                  </div>
                                  <div className="flex justify-between items-center text-[7.5px] mt-1.5 border-t border-zinc-50 pt-1 w-full">
                                    <span className="font-medium text-[7px] text-zinc-500 uppercase">Asian</span>
                                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                                      {matchedShades.asian.similarity}%
                                    </span>
                                  </div>
                                </div>
                              </button>
                            ) : (
                              <div className="bg-white border border-dashed border-zinc-200 rounded-xl p-3 text-center text-[9px] text-zinc-400">
                                Fetching Asian formula...
                              </div>
                            )}

                            {/* Berger Paint */}
                            {matchedShades.berger ? (
                              <button
                                onClick={() => handleShadeSelect(matchedShades.berger!.shade, true)}
                                className={`text-left bg-white border rounded-xl overflow-hidden shadow-xs flex flex-col relative transition-all duration-350 hover:-translate-y-0.5 ${activeShade?.id === matchedShades.berger.shade.id ? 'border-gold ring-1 ring-gold/35 shadow-[0_4px_10px_rgba(200,165,100,0.15)]' : 'border-zinc-200/80 hover:border-gold/30'}`}
                              >
                                <div className="h-2 w-full" style={{ backgroundColor: matchedShades.berger.shade.hex }} />
                                <div className="p-2 flex flex-col justify-between flex-grow w-full">
                                  <div>
                                    <h4 className="font-serif text-[10px] font-bold text-zinc-900 truncate mb-0.5">
                                      {matchedShades.berger.shade.name}
                                    </h4>
                                    <p className="text-[7.5px] font-mono text-zinc-400 capitalize truncate">
                                      {matchedShades.berger.shade.shadeCode}
                                    </p>
                                  </div>
                                  <div className="flex justify-between items-center text-[7.5px] mt-1.5 border-t border-zinc-50 pt-1 w-full">
                                    <span className="font-medium text-[7px] text-zinc-500 uppercase">Berger</span>
                                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                                      {matchedShades.berger.similarity}%
                                    </span>
                                  </div>
                                </div>
                              </button>
                            ) : (
                              <div className="bg-white border border-dashed border-zinc-200 rounded-xl p-3 text-center text-[9px] text-zinc-400">
                                Fetching Berger formula...
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shade List */}
            <div className="p-4 flex flex-col flex-grow min-h-[400px]">

              {/* Quick Tabs: Recent / Favorites */}
              {(recent.length > 0 || (favorites.length > 0 && shades.some(s => favorites.includes(s.id)))) && (
                <div className="mb-4 space-y-3">
                   {recent.length > 0 && (
                     <div>
                       <button 
                         onClick={() => setIsRecentExpanded(!isRecentExpanded)}
                         className="w-full flex items-center justify-between mb-2 sm:mb-2.5 focus:outline-none hover:opacity-80 transition-opacity"
                       >
                         <span className="text-[9px] sm:text-[10px] font-display font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">
                           <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Recently Viewed Colors
                         </span>
                         <ChevronDown className={`w-3.5 h-3.5 text-gold transition-transform duration-300 ${isRecentExpanded ? 'rotate-180' : ''}`} />
                       </button>
                       <AnimatePresence>
                         {isRecentExpanded && (
                           <motion.div 
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             transition={{ duration: 0.2 }}
                             className="overflow-hidden"
                           >
                             <div className="flex gap-2.5 overflow-x-auto pb-2.5 custom-scrollbar">
                               {recent.map(s => (
                                 <div key={`recent-${s.id}`} className="w-[84px] h-[110px] sm:w-[96px] sm:h-[125px] shrink-0 inline-block">
                                   <ShadeCard 
                                     shade={s}
                                     onSelect={handleShadeSelect}
                                     textColor={getTextColor(s.hex)}
                                     isSelected={activeShade?.id === s.id}
                                   />
                                 </div>
                               ))}
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   )}
                </div>
              )}

              <div className="flex justify-between items-end mb-2">
                <span className="text-[8px] font-display font-semibold uppercase tracking-[0.2em] text-gold">
                  {sBrand !== 'all' ? `${sBrand} Catalog Shades` : 'Global Catalog Shades'} ({shades.length})
                </span>
                {loading && <div className="w-3.5 h-3.5 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />}
              </div>

              <div className="flex-grow pb-4 relative overflow-y-auto custom-scrollbar" ref={scrollContainerRef}>
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-4 gap-1.5 sm:gap-2.5 content-start">
                  {shades.slice(0, visibleCount).map((shade) => (
                    <div key={shade.id} className="aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]">
                      <ShadeCard 
                        shade={shade}
                        onSelect={(s) => handleShadeSelect(s, true)}
                        textColor={getTextColor(shade.hex)}
                        isFavorite={favorites.includes(shade.id)}
                        onToggleFavorite={toggleFavorite}
                        isSelected={activeShade?.id === shade.id}
                      />
                    </div>
                  ))}
                  {shades.length === 0 && !loading && (
                    <div className="col-span-full py-12 flex flex-col items-center justify-center text-center px-4">
                      <div className="w-12 h-12 rounded-full bg-[#faf9f6] shadow-sm border border-zinc-200 flex items-center justify-center mb-4">
                        {sFamily === 'favorites' ? (
                          <Heart className="w-6 h-6 text-gold" />
                        ) : (
                          <Search className="w-6 h-6 text-gold" />
                        )}
                      </div>
                      <h5 className="text-sm font-serif text-ivory mb-1">
                        {sFamily === 'favorites' ? 'No Favorites Saved' : 'No Shades Found'}
                      </h5>
                      <p className="text-[10px] text-zinc-500 max-w-[160px] leading-relaxed">
                        {sFamily === 'favorites' 
                          ? 'Tap the heart icon on any shade to view it here for rapid access.'
                          : 'Try modifying your search or reset filters.'}
                      </p>
                    </div>
                  )}
                </div>
                {visibleCount < shades.length && (
                  <div className="pt-6 pb-2 flex justify-center">
                    <button
                      onClick={() => setVisibleCount(prev => prev + 40)}
                      className="px-6 py-2.5 bg-[#faf9f6]/95 border border-gold/40 text-gold text-xs sm:text-[13px] font-display font-semibold hover:border-gold hover:bg-gold/5 transition-colors rounded-full shadow-xs flex items-center gap-2"
                    >
                      See More Shades
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.8);
        }
      `}</style>
    </section>
  );
}
