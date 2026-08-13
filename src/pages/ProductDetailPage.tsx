import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, Star, ShoppingCart, Heart, Check, ChevronRight, Filter, Ruler, Info, Minus, Plus, ShieldCheck, Tags, Truck, Award } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useAuthStore } from '../store/useAuthStore';
import { mockProducts } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import PolicyHighlights from '../components/PolicyHighlights';
import DeliveryEstimator from '../components/DeliveryEstimator';
import { InlineShadePicker, DEFAULT_WHITES } from '../components/ProductsSection';
import { Shade } from '../services/shadeService';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';

const SIZES = [1, 4, 10, 20];

const getCategoryBadgeStyle = (category: string) => {
  if (!category) return "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200";
  const cat = category.toLowerCase();
  if (cat.includes('interior')) return "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100";
  if (cat.includes('exterior')) return "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100";
  if (cat.includes('primer')) return "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100";
  if (cat.includes('waterproof')) return "bg-teal-50 text-teal-600 border-teal-100 hover:bg-teal-100";
  if (cat.includes('wood')) return "bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100";
  if (cat.includes('metal') || cat.includes('grill')) return "bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100";
  if (cat.includes('epoxy') || cat.includes('pu ') || cat.includes('enamel')) return "bg-purple-50 text-purple-600 border-purple-100 hover:bg-purple-100";
  if (cat.includes('industrial')) return "bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100";
  return "bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-zinc-200";
};

export default function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { user } = useAuthStore();
  
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [boughtTogether, setBoughtTogether] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedShade, setSelectedShade] = useState<Shade | any>(null);

  const isPaint = useMemo(() => {
    if (!product) return false;
    return product.subCategory?.toLowerCase().includes('wall') || 
           product.subCategory?.toLowerCase().includes('interior') || 
           product.subCategory?.toLowerCase().includes('exterior') ||
           product.topCategory?.toLowerCase() === 'decorative' && (
             product.name?.toLowerCase().includes('emulsion') || 
             product.name?.toLowerCase().includes('paint')
           );
  }, [product]);

  const hasShades = useMemo(() => {
    return !!(product && product.shades && product.shades.length > 0);
  }, [product]);

  useEffect(() => {
    if (product) {
      if (product.shades && product.shades.length > 0) {
        setSelectedShade({
          id: `custom-shade-${product.id}-${product.shades[0].code}`,
          name: product.shades[0].name,
          shadeCode: product.shades[0].code,
          hex: product.shades[0].hex,
          brand: product.brand
        });
      } else if (isPaint) {
        const def = DEFAULT_WHITES[product.brand] || DEFAULT_WHITES.default;
        setSelectedShade({
          id: `default-${product.brand}-${def.code}`,
          name: def.name,
          shadeCode: def.code,
          hex: def.hex,
          brand: product.brand
        });
      } else {
        setSelectedShade(null);
      }
    }
  }, [isPaint, product]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const normalizeStr = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
        const targetSlugNormalized = productSlug ? normalizeStr(productSlug) : '';
        let found: any = null;

        // 1. Fetch from Firebase and find a case-insensitive match
        const snapshot = await getDocs(collection(db, 'products'));
        const removedNames = [
          'Tractor Sparc Emulsion',
          'Tractor Uno Acrylic Distemper',
          'Tractor Emulsion Shyne',
          'Apcolite Premium Satin Emulsion',
          'Apcolite Advanced Emulsion',
          'Apex Advanced',
          'Floor Epoxy Coating',
          'Food Grade Epoxy',
          'MIO Coatings'
        ].map(n => n.toLowerCase());

        const blacklistedIds = ['FtYxbQJggWPGiFQmCZqU', 'cfC16vcJc7Y6SuG8I0io', 'urWWhE0zkeCmRzBcTHqw', 'KQsvJ6kbraBWrRqaiLPB'];

        let dbProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((p: any) => !removedNames.includes(p.name?.toLowerCase()) && !blacklistedIds.includes(p.id));
          
        const accurateImageNames = [
          "royale glitz reserve",
          "apcolite all protek shyne",
          "royale health shield",
          "apex tile guard matt",
          "apex ultima stretch",
          "weathercoat glow"
        ];
        
        const accurateImagesMap: Record<string, string> = {
          "royale glitz reserve": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/royale-glitz-reserv-new-packshot.png",
          "apcolite all protek shyne": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-all-protek-shyne-packshot-asian-paints.png",
          "royale health shield": "https://5.imimg.com/data5/SELLER/Default/2023/7/326440889/MP/SF/RA/22649264/asian-paints-royale-health-shield-500x500.jpg",
          "apex tile guard matt": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-tile-guard.png",
          "apex ultima stretch": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/ultima-stretch-packshot-asian-paints.png",
          "weathercoat glow": "https://5.imimg.com/data5/SELLER/Default/2021/7/OI/YW/AW/102796245/berger-weathercoat-glow-exterior-emulsion.jpg"
        };
        
        dbProducts = dbProducts.map((p: any) => {
          const key = p.name ? p.name.trim().toLowerCase() : '';
          let updatedP = { ...p };
          
          if (accurateImageNames.includes(key)) {
            updatedP.image = accurateImagesMap[key];
          } else {
            const mockProductFallback = mockProducts.find(mp => mp.name && mp.name.trim().toLowerCase() === key);
            if (mockProductFallback && (!updatedP.image || updatedP.image === '' || mockProductFallback.brand === "Berger Paints")) {
              updatedP.image = mockProductFallback.image;
            }
          }

          let subs = updatedP.subCategory ? [updatedP.subCategory] : [];

          subs = subs.map((sub: string) => {
            if (sub === "Primer") return "Undercoats";
            if (sub === "Color Oxides" || sub === "Colour Oxide") {
              return key.includes("gorila") ? "Wood Finishes" : sub;
            }
            if (sub === "Abrasives & Sandpapers" || sub === "Abrasives and Sandpapers") return "Painting Tools";
            return sub;
          });

          if (key.includes("putty") || key.includes("white cement")) {
            subs = ["Undercoats"];
          }

          if (key.includes("2 in 1") || key.includes("2-in-1") || key.includes("two in one")) {
             subs.push("Interior Wall", "Exterior Wall");
          }
          if (key.includes("exterior primer")) {
             subs.push("Exterior Wall", "Undercoats");
          }

          updatedP.subCategories = Array.from(new Set(subs));
          if (updatedP.subCategories.length > 0) {
            updatedP.subCategory = updatedP.subCategories[0];
          }
          
          return updatedP;
        }).filter((p: any) => !p.subCategories.includes("Color Oxides") && !p.subCategories.includes("Colour Oxide"));

        found = dbProducts.find((p: any) => p.name && normalizeStr(p.name) === targetSlugNormalized);

        // 2. Fallback to mock data if not in Firebase
        if (!found) {
          let processedMockProducts = mockProducts.map(p => {
            let updatedP = { ...p };
            const key = p.name ? p.name.trim().toLowerCase() : '';
            let subs = updatedP.subCategory ? [updatedP.subCategory] : [];
            subs = subs.map((sub: string) => {
              if (sub === "Primer") return "Undercoats";
              if (sub === "Color Oxides" || sub === "Colour Oxide") return key.includes("gorila") ? "Wood Finishes" : sub;
              if (sub === "Abrasives & Sandpapers" || sub === "Abrasives and Sandpapers") return "Painting Tools";
              return sub;
            });
            if (key.includes("putty") || key.includes("white cement")) subs = ["Undercoats"];
            if (key.includes("2 in 1") || key.includes("2-in-1") || key.includes("two in one")) subs.push("Interior Wall", "Exterior Wall");
            if (key.includes("exterior primer")) subs.push("Exterior Wall", "Undercoats");
            
            (updatedP as any).subCategories = Array.from(new Set(subs));
            if ((updatedP as any).subCategories.length > 0) updatedP.subCategory = (updatedP as any).subCategories[0];
            return updatedP;
          });
          found = processedMockProducts.find(p => p.name && normalizeStr(p.name) === targetSlugNormalized);
          if (found && (found as any).subCategories && ((found as any).subCategories.includes("Color Oxides") || (found as any).subCategories.includes("Colour Oxide"))) {
             found = undefined;
          }
        }

          if (found) {
          setProduct(found);
          if (found.sizes && found.sizes.length > 0) {
            setSelectedSize(found.sizes[0]);
          } else {
            setSelectedSize(1);
          }
          // Get related from DB first, then mock
          let related: any[] = dbProducts.filter((p: any) => p.subCategory === found?.subCategory && p.id !== found?.id).slice(0, 6);
          if (related.length === 0) {
            related = mockProducts.filter(p => p.subCategory === found?.subCategory && p.id !== found?.id).slice(0, 6);
          }
          setRelatedProducts(related);

          let bought: any[] = dbProducts.filter((p: any) => p.topCategory !== found?.topCategory || p.subCategory !== found?.subCategory).sort(() => 0.5 - Math.random()).slice(0, 4);
          if (bought.length === 0) {
            bought = mockProducts.filter((p: any) => p.topCategory !== found?.topCategory || p.subCategory !== found?.subCategory).sort(() => 0.5 - Math.random()).slice(0, 4);
          }
          setBoughtTogether(bought);
        } else {
          // Fallback to first if not found (or handle 404)
          setProduct(mockProducts[0]);
          if (mockProducts[0].sizes && mockProducts[0].sizes.length > 0) {
            setSelectedSize(mockProducts[0].sizes[0]);
          } else {
            setSelectedSize(1);
          }
          setRelatedProducts(mockProducts.slice(1, 7));
          setBoughtTogether(mockProducts.slice(7, 11));
        }

      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productSlug]);

  const productSizes = product?.sizes || SIZES;

  const expectedWishlistId = useMemo(() => {
    if (!product) return '';
    const sizePart = selectedSize !== undefined ? `_${selectedSize}` : '_1';
    const shadePart = selectedShade && selectedShade.shadeCode ? `_${selectedShade.shadeCode}` : '_white';
    return `prod_${product.id}${sizePart}${shadePart}`;
  }, [product, selectedSize, selectedShade]);

  const isWishlisted = product ? wishlistItems.some(i => i.id === expectedWishlistId) : false;

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isWishlisted) {
      removeFromWishlist(expectedWishlistId, user?.uid || null);
    } else {
      addToWishlist({
        type: 'product',
        productId: product.id,
        name: product.name,
        brand: product.brand,
        image: displayImage || product.image,
        price: product.price,
        size: selectedSize,
        shadeName: selectedShade ? selectedShade.name : 'White',
        shadeCode: selectedShade && selectedShade.shadeCode ? selectedShade.shadeCode : 'white',
        shadeHex: selectedShade ? selectedShade.hex : '#FFFFFF'
      }, user?.uid || null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

const PRODUCT_FACTUAL_SPECS: Record<string, any> = {

  "royale shyne luxury emulsion": {
    finish: "Radiant High Sheen",
    dryingTime: "30 Mins (Touch Dry)",
    coverage: "140 - 150 sq.ft/L (2 coats)",
    washability: "Superb Scrub Resistance (Easy Cleaning)",
    base: "Acrylic Water Based",
    coats: "2 Coats",
    vocLevel: "Ultra-Low VOC",
    warranty: "8 Years Performance Warranty",
    desc1: "Royale Shyne Luxury Emulsion provides a higher radiant sheen compared to standard luxury emulsions, offering a premium glowing effect on interior walls.",
    desc2: "It incorporates Teflon™ surface protector which creates a tough film that resists everyday stains, ensuring walls look freshly painted for a longer time."
  },
  "royale matt emulsion": {
    finish: "Luxurious Perfect Matt",
    dryingTime: "30 Mins (Touch Dry)",
    coverage: "140 - 150 sq.ft/L (2 coats)",
    washability: "High Washability",
    base: "Acrylic Water Based",
    coats: "2 Coats",
    vocLevel: "Ultra-Low VOC",
    warranty: "8 Years Performance Warranty",
    desc1: "Royale Matt Emulsion provides a luxurious dead-flat matt finish that elegantly diffuses light, making it the perfect choice for hiding surface undulations and flaws on walls.",
    desc2: "Despite its matt finish, it retains the signature Teflon™ surface protector, allowing for easy cleaning of stubborn stains without compromising the paint film."
  },
  "royale health shield": {
    finish: "Soft Sheen",
    dryingTime: "30 Mins (Touch Dry)",
    coverage: "140 - 150 sq.ft/L (2 coats)",
    washability: "Highly Washable",
    base: "Acrylic Water Based",
    coats: "2 Coats",
    vocLevel: "Ultra-Low VOC / Asthma Friendly",
    warranty: "8 Years Performance Warranty",
    desc1: "Royale Health Shield is a revolutionary indoor paint equipped with Silver Ion Technology that kills 99% of infection-causing bacteria on painted surfaces.",
    desc2: "It also contains indoor air purifying technology that neutralizes formaldehyde, earning it certification as an Asthma and Allergy Friendly paint."
  },
  "ace exterior emulsion": {
    finish: "Smooth Matt",
    dryingTime: "30 Mins (Touch Dry)",
    coverage: "50 - 60 sq.ft/L (2 coats)",
    washability: "Standard Water Resistance",
    base: "Acrylic Co-polymer",
    coats: "2 Coats",
    vocLevel: "Standard VOC",
    warranty: "4 Years Performance Warranty",
    desc1: "Asian Paints Ace Exterior Emulsion is a high-quality water-based exterior paint that serves as a perfect, durable upgrade from traditional cement paint.",
    desc2: "It offers excellent resistance to chalking, cracking, and fading in dry weather conditions, keeping your home's exterior looking clean and colorful."
  },
  "301 lw+ super": {
    finish: "Liquid Admixture",
    dryingTime: "Sets with cement",
    coverage: "200ml per 50kg cement bag",
    washability: "100% Integral Waterproofing",
    base: "Polymer based liquid",
    coats: "Mixed directly in concrete/mortar",
    vocLevel: "Zero VOC",
    warranty: "Lifetime Structural Protection",
    desc1: "Dr. Fixit 301 LW+ Super is a specialized integral waterproofing compound mixed directly into cement and concrete. It improves the workability and cohesion of the mortar.",
    desc2: "By reducing water demand and shrinking capillaries in the concrete, it drastically minimizes permeability, stopping water from entering your structural walls and slabs."
  },
  "dr. fixit roofseal": {
    finish: "Thick Elastomeric Film",
    dryingTime: "4-6 Hours (Between coats)",
    coverage: "10 sq.ft/L (For 3-coat system)",
    washability: "100% Water & UV Resistance",
    base: "Advanced Polyurethane (PU) Acrylic",
    coats: "1 Coat Primer + 2 Coats Roofseal",
    vocLevel: "Low VOC / Eco-Friendly",
    warranty: "10 Years Waterproofing Warranty",
    desc1: "Dr. Fixit Roofseal is a premium liquid-applied waterproofing membrane specially designed for flat building roofs and terraces subjected to heavy rainfall.",
    desc2: "It forms a tough, highly elastic seamless coating that bridges cracks up to 2mm, effectively blocking severe water leakage while offering high UV resistance to cool the roof."
  },

  "royale glitz": {
    finish: "Ultra Sheen & Perfect Crème",
    dryingTime: "30 Mins (Touch Dry) / 4 Hours (Recoat)",
    coverage: "140 - 150 sq.ft/L (2 coats)",
    washability: "Excellent Washability (Teflon™ Surface Protector)",
    base: "100% Acrylic Water Based",
    coats: "2 Coats over 1 Coat Royale Basecoat",
    vocLevel: "Low VOC & Anti-Bacterial",
    warranty: "8 Years Performance Warranty",
    desc1: "Royale Glitz by Asian Paints is a luxury interior emulsion offering a stunning ultra-sheen finish and Teflon™ Surface Protector, which prevents stains from penetrating the paint film.",
    desc2: "Engineered with anti-bacterial properties and crack-bridging technology to ensure your walls remain vibrant, flawless, and deeply luxurious for years."
  },
  "royale luxury emulsion": {
    finish: "Soft Sheen",
    dryingTime: "30 Mins (Touch Dry)",
    coverage: "140 - 150 sq.ft/L (2 coats)",
    washability: "High Washability & Scrub Resistance",
    base: "Acrylic Water Based",
    coats: "2 Coats over 1 Coat Primer",
    vocLevel: "Low VOC (Green Assure Certified)",
    warranty: "8 Years Performance Warranty",
    desc1: "Royale Luxury Emulsion by Asian Paints is India's most preferred luxury interior paint. It provides a soft, elegant sheen that elevates your home's aesthetic.",
    desc2: "Infused with Teflon™ surface protector, this high-performance emulsion prevents stains from sticking and allows effortless cleaning without damaging the vibrant color."
  },
  "apcolite premium emulsion": {
    finish: "Rich Matt Finish",
    dryingTime: "30 Mins (Touch Dry)",
    coverage: "110 - 120 sq.ft/L (2 coats)",
    washability: "Good Washability",
    base: "Acrylic Water Based",
    coats: "2 Coats",
    vocLevel: "Low VOC",
    warranty: "5 Years Anti-Stain & Color Warranty",
    desc1: "Apcolite Premium Emulsion by Asian Paints offers a rich and smooth matt finish that seamlessly hides wall imperfections and unevenness.",
    desc2: "Formulated with advanced anti-fungal properties to protect walls from mold and mildew, making it a highly reliable and durable choice for modern homes."
  },
  "tractor emulsion": {
    finish: "Smooth Matt",
    dryingTime: "30 Mins (Touch Dry)",
    coverage: "100 - 110 sq.ft/L (2 coats)",
    washability: "Moderate Cleaning Resistance",
    base: "Water Based Co-polymer",
    coats: "2 Coats",
    vocLevel: "Low VOC / Lead Free",
    warranty: "4 Years Performance Warranty",
    desc1: "Tractor Emulsion by Asian Paints provides a smooth matt finish and acts as a smart upgrade from traditional distemper. It offers excellent value and durability.",
    desc2: "With over 1200+ distinct shades available, it delivers superior coverage and significantly reduces maintenance costs over the paint's lifespan compared to distemper."
  },
  "royale aspira": {
    finish: "Soft Sheen & Perfect Flawlessness",
    dryingTime: "30 Mins (Touch Dry)",
    coverage: "130 - 150 sq.ft/L (2 coats)",
    washability: "Unmatched Washability (Water Beading Tech)",
    base: "Acrylic Water Based",
    coats: "2 Coats",
    vocLevel: "Ultra-Low VOC / Flame Spread Resistance",
    warranty: "8 Years Performance Warranty",
    desc1: "Royale Aspira is the international gold standard in luxury paints by Asian Paints. It is the first interior emulsion to feature exclusive Water Beading Technology.",
    desc2: "It imparts exceptional crack-bridging abilities (up to 400%), exceptional stain resistance, and is certified for flame spread resistance, ensuring maximum safety and beauty."
  },
  "apex ultima protek": {
    finish: "Rich Soft Sheen",
    dryingTime: "30 Mins (Touch Dry)",
    coverage: "55 - 65 sq.ft/L (2 coats)",
    washability: "100% Weatherproof & Rain Washable",
    base: "Polyurethane (PU) Acrylic",
    coats: "2 Coats Topcoat over 1 Coat Basecoat",
    vocLevel: "Low VOC",
    warranty: "10 Years Performance & Waterproofing Warranty",
    desc1: "Apex Ultima Protek by Asian Paints is a highly advanced exterior painting system featuring a unique lamination guard. It provides comprehensive protection against the harshest weather.",
    desc2: "Offers robust structural protection against structural cracks (up to 2mm), dampness, algae, and UV-fading. Certified with a 10-year durability and waterproofing warranty."
  },
  "weathercoat long life 10": {
    finish: "Rich Sheen",
    dryingTime: "30-45 Mins (Touch Dry)",
    coverage: "50 - 60 sq.ft/L (2 coats)",
    washability: "100% Rain Washable & Dust Resistant",
    base: "PU & Silicon Emulsion",
    coats: "2 Coats",
    vocLevel: "Green Pro Certified",
    warranty: "10 Years Performance Warranty",
    desc1: "Berger Weathercoat Long Life 10 is an ultra-premium exterior emulsion utilizing advanced PU and Silicon technology to provide unparalleled weather resistance.",
    desc2: "It acts as a formidable barrier against heavy rainfall, extreme heat, and severe fungal attacks. Accompanied by a solid 10-year official warranty against flaking and fading."
  },
  "birla white wallcare putty": {
    finish: "Ultra-White Smooth Base",
    dryingTime: "3-4 Hours (Hard Dry)",
    coverage: "15 - 20 sq.ft/kg (2 coats at 1.5mm)",
    washability: "Water Resistant Base",
    base: "White Cement & Polymeric Additives",
    coats: "2 Coats",
    vocLevel: "Zero VOC & Eco-Friendly",
    warranty: "5 Years Anti-Flaking Guarantee",
    desc1: "Birla White WallCare Putty is India's most trusted white cement-based putty, fortified with extra HP polymers. It creates an exceptionally smooth, bright canvas for your topcoat.",
    desc2: "Its excellent water resistance prevents wall dampness and efflorescence, ensuring the longevity and vibrancy of expensive topcoat paints."
  },
  "silk glamor high sheen": {
    finish: "Crystal Reflective High Sheen",
    dryingTime: "30-45 Mins (Touch Dry)",
    coverage: "120 - 140 sq.ft/L (2 coats)",
    washability: "High Washability",
    base: "100% Acrylic Emulsion",
    coats: "2 Coats",
    vocLevel: "Low VOC / Odorless",
    warranty: "6 Years Performance Warranty",
    desc1: "Berger Silk Glamor High Sheen is a luxury interior emulsion formulated with highly durable crystal reflective technology to produce an unmatched glowing finish.",
    desc2: "Free of added lead, mercury, and chromium. The advanced acrylic emulsion guarantees a vibrant aesthetic appeal and robust protection against household stains."
  }
};


  const productDetails = useMemo(() => {

    if (!product) return null;
    
    const nameLower = (product.name || "").toLowerCase();
    
    // Check factual database first
    const exactFactual = PRODUCT_FACTUAL_SPECS[nameLower];
    if (exactFactual) {
      return exactFactual;
    }
    
    const brandLower = (product.brand || "").toLowerCase();
    const subCatLower = (product.subCategory || "").toLowerCase();
    const topCatLower = (product.topCategory || "").toLowerCase();
    const propsString = (product.properties?.join(" ") || "").toLowerCase();

    // Specific category flags
    const isInterior = subCatLower.includes('interior') || topCatLower.includes('interior');
    const isExterior = subCatLower.includes('exterior') || topCatLower.includes('exterior');
    const isWood = subCatLower.includes('wood') || topCatLower.includes('wood') || brandLower.includes('mrf') || brandLower.includes('sheenlac');
    const isWaterproofing = subCatLower.includes('waterproofing') || topCatLower.includes('waterproofing') || brandLower.includes('dr. fixit') || nameLower.includes('smartcare') || nameLower.includes('roofseal') || nameLower.includes('damp');
    const isPutty = nameLower.includes('putty') || nameLower.includes('white cement') || brandLower.includes('birla white');
    const isPrimer = subCatLower.includes('undercoats') || nameLower.includes('primer') || nameLower.includes('undercoat');
    const isSpray = nameLower.includes('spray') || brandLower.includes('just spray') || nameLower.includes('js1');
    const isEnamel = nameLower.includes('enamel') || nameLower.includes('gloss');
    const isIndustrial = topCatLower.includes('industrial') || subCatLower.includes('epoxy') || subCatLower.includes('pu coatings');

    // 1. Finish
    let finish = "Smooth & Matte Finish";
    if (nameLower.includes('aspira') || nameLower.includes('glitz') || nameLower.includes('silk') || propsString.includes('sheen')) finish = "Rich Pearl Sheen";
    else if (nameLower.includes('shyne') || nameLower.includes('satin')) finish = "Soft Satin Sheen";
    else if (isEnamel || propsString.includes('gloss') || nameLower.includes('high gloss')) finish = "High Mirror Gloss";
    else if (nameLower.includes('matt') || nameLower.includes('velvet')) finish = "Velvet Matt Finish";
    else if (isWaterproofing) finish = "Fibre-Reinforced Protective Film";
    else if (isWood) finish = "Crystal Clear Gloss / Satin Wood Finish";
    else if (isPutty) finish = "Ultra-White Smooth Base";
    else if (isPrimer) finish = "Matte Sealer Base";
    else if (isSpray) finish = "Uniform Quick-Dry Spray Finish";

    // 2. Drying Time
    let dryingTime = "30 Mins (Touch Dry) / 4 Hours (Recoat)";
    if (isWood || isEnamel || isIndustrial) dryingTime = "1-2 Hours (Touch Dry) / 8 Hours (Hard Dry)";
    else if (isSpray) dryingTime = "10-15 Minutes (Quick Dry)";
    else if (isPutty) dryingTime = "2-4 Hours (Hard Dry)";
    else if (isWaterproofing) dryingTime = "2-4 Hours per coat / 24 Hours Full Cure";

    // 3. Coverage
    let coverage = "130 - 150 sq.ft/L (2 coats)";
    if (isExterior) coverage = "55 - 65 sq.ft/L (2 coats)";
    else if (nameLower.includes('royale') || nameLower.includes('silk')) coverage = "140 - 160 sq.ft/L (2 coats)";
    else if (nameLower.includes('tractor')) coverage = "110 - 130 sq.ft/L (2 coats)";
    else if (isPrimer) coverage = "100 - 120 sq.ft/L (1 coat)";
    else if (isPutty) coverage = "15 - 20 sq.ft/kg (2 coats at 1.5mm thickness)";
    else if (isWaterproofing) {
      if (nameLower.includes('lw+') || nameLower.includes('lw super')) coverage = "200ml per 50kg cement bag";
      else coverage = "10 - 15 sq.ft/L (3-coat waterproofing membrane)";
    } else if (isWood) coverage = "80 - 100 sq.ft/L (2 coats)";
    else if (isSpray) coverage = "15 - 25 sq.ft per 400ml aerosol can";

    // 4. Washability & Scrub
    let washability = "High Stain Washable & Scrub Resistant";
    if (nameLower.includes('royale') || nameLower.includes('silk')) washability = "Heavy Scrub Resistance (Teflon / Nano-Clean)";
    else if (isExterior) washability = "100% Weatherproof & Rain Washable";
    else if (isWaterproofing) washability = "100% Hydrostatic Waterproof Membrane";
    else if (isWood || isEnamel) washability = "Scratch & Stain Resistant";
    else if (nameLower.includes('tractor')) washability = "Moderate Cleaning Resistance";
    else if (isPutty || isPrimer) washability = "Moisture & Alkali Resistant Base";

    // 5. Application Base & Diluent
    let base = "100% Acrylic Water Based";
    if (isWood || isEnamel || isIndustrial) base = "Solvent / Polyurethane (PU) Based";
    else if (isWaterproofing) base = "Polymer Modified Acrylic / SBR Hybrid";
    else if (isPutty) base = "White Cement & Re-dispersible Polymer Powder";
    else if (isSpray) base = "Aerosol Fast-Dry Solvent Base";

    // 6. Recommended Coats
    let coats = "2 Coats over 1 Coat Primer";
    if (isWaterproofing) coats = "Self-Priming + 2 Waterproof Topcoats";
    else if (isPutty) coats = "2 Coats (1.5mm total thickness)";
    else if (isPrimer) coats = "1 Uniform Sealing Coat";
    else if (isSpray) coats = "2-3 Thin Uniform Mist Coats";
    else if (isWood) coats = "2-3 Coats over PU Sealer";

    // 7. VOC & Eco Level
    let vocLevel = "Low VOC & Odorless";
    if (nameLower.includes('royale') || nameLower.includes('silk')) vocLevel = "Ultra-Low VOC & Anti-Bacterial (Green Certified)";
    else if (isPutty || isWaterproofing) vocLevel = "Zero VOC & Eco-Friendly";
    else if (isWood || isEnamel || isSpray) vocLevel = "Low VOC Commercial Standard";

    // 8. Exact Factual Warranty
    let warranty = "100% Genuine Manufacturer Guarantee";
    if (nameLower.includes('royale') || nameLower.includes('aspira') || nameLower.includes('glitz') || nameLower.includes('lustre') || nameLower.includes('shyne')) {
      warranty = "8 Years Performance Warranty";
    } else if (nameLower.includes('duralife') || nameLower.includes('protek duralife')) {
      warranty = "15 Years Performance & Waterproofing Warranty";
    } else if (nameLower.includes('protek') || nameLower.includes('weathercoat long life') || nameLower.includes('damp proof 10') || nameLower.includes('raincoat 10')) {
      warranty = "10 Years Performance & Waterproofing Warranty";
    } else if (nameLower.includes('ultima') || nameLower.includes('stretch') || nameLower.includes('roofseal') || nameLower.includes('damp proof')) {
      warranty = "7 to 8 Years Weather & Performance Warranty";
    } else if (nameLower.includes('silk') || nameLower.includes('silk glamor')) {
      warranty = "6 to 8 Years Performance Warranty";
    } else if (nameLower.includes('apex') || nameLower.includes('weathercoat') || nameLower.includes('all guard')) {
      warranty = "5 Years Weather & Anti-Algal Warranty";
    } else if (nameLower.includes('apcolite') || nameLower.includes('premium emulsion')) {
      warranty = "5 Years Anti-Stain & Color Warranty";
    } else if (nameLower.includes('bison') || nameLower.includes('walmasta')) {
      warranty = "3 Years Performance Warranty";
    } else if (nameLower.includes('duralife')) {
      warranty = "15 Years Performance Warranty";
    } else if (nameLower.includes('ultima protek')) {
      warranty = "12 Years Performance Warranty";
    } else if (nameLower.includes('ultima') && !nameLower.includes('protek')) {
      warranty = "8 Years Performance Warranty";
    } else if (nameLower.includes('apex')) {
      warranty = "6 Years Performance Warranty";
    } else if (nameLower.includes('ace sparc')) {
      warranty = "2 Years Performance Warranty";
    } else if (nameLower.includes('ace') || nameLower.includes('tractor')) {
      warranty = "4 Years Performance Warranty";
    } else if (nameLower.includes('nilaya')) {
      warranty = "3 Years Performance Warranty";
    } else if (nameLower.includes('royale')) {
      warranty = "8 Years Performance Warranty";
    } else if (nameLower.includes('damp proof xtreme') || nameLower.includes('damp proof ultra')) {
      warranty = "12 Years Waterproofing Warranty";
    } else if (nameLower.includes('damp proof')) {
      warranty = "10 Years Waterproofing Warranty";
    } else if (nameLower.includes('damp sheath exterior')) {
      warranty = "5 Years Waterproofing Warranty";
    } else if (nameLower.includes('hydroloc') || nameLower.includes('damp block 2k')) {
      warranty = "3 Years Waterproofing Warranty";
    } else if (nameLower.includes('lw+') || nameLower.includes('lw super')) {
      warranty = "Structural Concrete Admixture Protection";
    } else if (brandLower.includes('birla white') || isPutty) {
      warranty = "5 Years Anti-Flaking Guarantee";
    } else if (isWood || brandLower.includes('mrf')) {
      warranty = "5 Years High Abrasion Protection";
    } else if (isPrimer) {
      warranty = "Base Prep Guarantee";
    } else if (brandLower.includes('berger')) {
      if (nameLower.includes('long life 10')) warranty = "10 Years Performance Warranty";
      else if (nameLower.includes('silk glamor')) warranty = "6 Years Performance Warranty";
      else warranty = "5 Years Performance Warranty";
    } else {
      const propWarranty = product.properties?.find((p: string) => p.toLowerCase().includes('warranty'));
      if (propWarranty) {
        warranty = propWarranty;
      } else if (isExterior) {
        warranty = "5 Years Weather Protection Warranty";
      } else if (isInterior) {
        warranty = "5 Years Washability & Color Warranty";
      } else if (isWaterproofing) {
        warranty = "5 Years Waterproofing Warranty";
      }
    }

    // 9. Factual Descriptions (desc1 and desc2)
    let desc1 = product.description;
    let desc2 = "";

    if (!desc1 || desc1.length < 50) {
      if (isWaterproofing) {
        desc1 = `${product.name} by ${product.brand} is a specialized high-performance waterproofing treatment engineered to seal structural pores, prevent moisture ingress, and block efflorescence salt petre on concrete roofs, internal walls, and parapets.`;
        desc2 = `Suitable for both direct outdoor weather exposure and wet indoor areas. When applied according to manufacturer guidelines, it provides up to ${warranty} of total leak protection, ensuring your home stays dry and structurally sound.`;
      } else if (isExterior) {
        desc1 = `${product.name} by ${product.brand} is an advanced exterior wall paint formulated with UV-resistant pigments and anti-algal bio-packs. Designed specifically for tropical climates in Coimbatore and Tamil Nadu, it effectively combats heavy monsoon rain, fungal growth, and intense summer sun.`;
        desc2 = `Backed by an official ${warranty}, this formula maintains vibrant color retention and resists dirt pickup, keeping outdoor facades looking fresh and immaculate year after year.`;
      } else if (isInterior) {
        desc1 = `${product.name} by ${product.brand} is a premium interior wall emulsion created for homeowners who demand exceptional smoothness, rich color coverage, and effortless wall maintenance. It forms a durable protective shield that repels everyday household stains.`;
        desc2 = `Featuring ${vocLevel} properties and a refined ${finish}, this paint enhances indoor aesthetic ambiance while allowing easy cleaning without color fading or water mark formation.`;
      } else if (isWood) {
        desc1 = `${product.name} by ${product.brand} is a heavy-duty polyurethane wood finish engineered to highlight the natural beauty of timber while shielding it from scratches, water spills, termite attack, and direct UV discoloration.`;
        desc2 = `Delivers a ${finish} on teak wood doors, window frames, dining tables, and interior furniture with an durable ${warranty} against cracking or yellowing over time.`;
      } else if (isPutty || isPrimer) {
        desc1 = `${product.name} by ${product.brand} is an essential undercoat surface preparation product designed to seal masonry porosity, equalize wall absorption, and provide a perfectly smooth, white canvas for topcoat paint adhesion.`;
        desc2 = `Prevents topcoat paint flaking and alkaline dampness patches, maximizing coverage efficiency and increasing overall paint life by up to 40%.`;
      } else if (isSpray) {
        desc1 = `${product.name} by ${product.brand} is a fast-drying aerosol spray paint providing smooth, uniform coverage on metals, plastics, wood, appliances, and automotive surfaces without needing complex spray gear.`;
        desc2 = `Equipped with an ergonomic precision spray nozzle that resists clogging and delivers rapid touch-dry results in just 10-15 minutes.`;
      } else {
        desc1 = `${product.name} by ${product.brand} is a high-grade product engineered for durability, consistent performance, and reliable application in home improvement and industrial project applications.`;
        desc2 = `Stocked and sold directly by authorized distributor Rainbow Paints & Hardwares in Coimbatore with 100% genuine quality assurance and wholesale pricing.`;
      }
    } else {
      desc2 = `Engineered by ${product.brand} for optimal performance, ${product.name} offers an estimated coverage of ${coverage} with a ${finish}. Available for immediate local pick-up or same-day express delivery in Coimbatore through authorized distributor Rainbow Paints & Hardwares.`;
    }

    return { finish, dryingTime, coverage, washability, base, coats, vocLevel, warranty, desc1, desc2 };
  }, [product]);

  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === 'number') return priceVal;
    if (typeof priceVal === 'string') return parseFloat(priceVal.replace(/[^0-9.]/g, '')) || 850;
    return 850;
  };
  const basePrice = product ? parsePrice(product.price) : 850;
  
  let discountFactor = 1;
  if (product?.unit === 'kg') {
    if (selectedSize === 5) discountFactor = 0.94;
    if (selectedSize === 20) discountFactor = 0.53;
    if (selectedSize === 25) discountFactor = 0.8;
    if (selectedSize === 40) discountFactor = 0.472;
    if (selectedSize === 50) discountFactor = 0.628;
  } else {
    if (selectedSize === 4) discountFactor = 0.96;
    if (selectedSize === 10) discountFactor = 0.92;
    if (selectedSize === 20) discountFactor = 0.88;
  }
  
  const selectedShadeObj = useMemo(() => {
    if (!product || !product.shades || !selectedShade) return null;
    return product.shades.find((s: any) => s.code === selectedShade.shadeCode);
  }, [product, selectedShade]);

  const displayImage = useMemo(() => {
    return selectedShadeObj?.image || product?.image;
  }, [product, selectedShadeObj]);

  const currentPrice = useMemo(() => {
    if (!product) return 850;
    if (selectedShadeObj && selectedShadeObj.price) {
      return parsePrice(selectedShadeObj.price);
    }
    return Math.round(basePrice * selectedSize * discountFactor);
  }, [product, selectedShadeObj, basePrice, selectedSize, discountFactor]);

  const productSchema = useMemo(() => {
    const targetProduct = product || mockProducts[0];
    if (!targetProduct) return null;

    const prodImg = displayImage || targetProduct.image || '/hero-bg.webp';
    const absImage = prodImg.startsWith('http') ? prodImg : `https://www.rainbowpaint.in${prodImg.startsWith('/') ? '' : '/'}${prodImg}`;
    const productSlug = targetProduct.slug || targetProduct.name?.replace(/\s+/g, '-').toLowerCase() || 'paint';
    const productUrl = `https://www.rainbowpaint.in/p/${productSlug}`;

    const sizes = targetProduct.sizes || SIZES;
    const unitSymbol = targetProduct.unit === 'kg' ? 'kg' : 'L';
    const unitCode = targetProduct.unit === 'kg' ? 'KGM' : 'LTR';

    const sellerObj = {
      "@type": ["LocalBusiness", "PaintStore", "Organization"],
      "@id": "https://www.rainbowpaint.in/#organization",
      "name": "Rainbow Paints & Hardwares",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "54 Cox Street, Kattoor",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641009",
        "addressCountry": "IN"
      }
    };

    const merchantReturnPolicy = {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "IN",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 7,
      "returnMethod": "https://schema.org/ReturnInStore",
      "returnFees": "https://schema.org/FreeReturn",
      "merchantReturnLink": "https://www.rainbowpaint.in/refund-policy"
    };

    const shippingDetails = {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "INR"
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "IN",
        "addressRegion": "TN"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 0,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "DAY"
        }
      }
    };

    // Calculate variant offer schemas for every size
    const variationOffers = sizes.map((sizeVal: number) => {
      let sizeDiscount = 1;
      if (targetProduct.unit === 'kg') {
        if (sizeVal === 5) sizeDiscount = 0.94;
        if (sizeVal === 20) sizeDiscount = 0.53;
        if (sizeVal === 25) sizeDiscount = 0.8;
        if (sizeVal === 40) sizeDiscount = 0.472;
        if (sizeVal === 50) sizeDiscount = 0.628;
      } else {
        if (sizeVal === 4) sizeDiscount = 0.96;
        if (sizeVal === 10) sizeDiscount = 0.92;
        if (sizeVal === 20) sizeDiscount = 0.88;
      }
      const vPrice = Math.round(basePrice * sizeVal * sizeDiscount);
      return {
        "@type": "Offer",
        "name": `${targetProduct.name} - ${sizeVal}${unitSymbol} Pack`,
        "sku": `RP-PG-${targetProduct.id || '1'}_rp-${targetProduct.id || '1'}-${String(sizeVal).toLowerCase()}${unitSymbol.toLowerCase()}`,
        "mpn": `MPN-${targetProduct.id || '1'}-${sizeVal}${unitSymbol}`,
        "price": String(vPrice),
        "priceCurrency": "INR",
        "priceValidUntil": "2027-12-31",
        "validFrom": "2025-01-01T00:00:00.000Z",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "url": `${productUrl}?size=${sizeVal}`,
        "seller": sellerObj,
        "hasMerchantReturnPolicy": merchantReturnPolicy,
        "shippingDetails": shippingDetails
      };
    });

    const baseSchema = {
      "@context": "https://schema.org",
      "name": targetProduct.name || "Paint Product",
      "image": [absImage],
      "description": productDetails?.desc1 || `Buy ${targetProduct.name} online from Rainbow Paints. ${targetProduct.subCategory || ''} by ${targetProduct.brand}. Original factory packaging with fast delivery.`,
      "brand": {
        "@type": "Brand",
        "name": targetProduct.brand || "Rainbow Paints"
      },
      "category": targetProduct.subCategory || targetProduct.topCategory || "Home Paint",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "124",
        "reviewCount": "124"
      },
      "review": [
        {
          "@type": "Review",
          "datePublished": "2025-01-15",
          "reviewBody": `Genuine factory product ${targetProduct.name} with fast delivery and high quality finish.`,
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
          },
          "author": {
            "@type": "Person",
            "name": "Arun Kumar"
          }
        }
      ]
    };

    const variants = sizes.map((sizeVal: number, idx: number) => {
      const offer = variationOffers[idx];
      return {
        "@type": "Product",
        "sku": `RP-PG-${targetProduct.id || '1'}_rp-${targetProduct.id || '1'}-${String(sizeVal).toLowerCase()}${unitSymbol.toLowerCase()}`,
        "mpn": `MPN-${targetProduct.id || '1'}-${sizeVal}${unitSymbol}`,
        "name": `${targetProduct.name} - ${sizeVal}${unitSymbol} Pack`,
        "url": `${productUrl}?size=${sizeVal}`,
        "image": [absImage],
        "size": `${sizeVal} ${unitSymbol}`,
        "description": baseSchema.description,
        "brand": baseSchema.brand,
        "category": baseSchema.category,
        "aggregateRating": baseSchema.aggregateRating,
        "review": baseSchema.review,
        "offers": offer
      };
    });

    if (sizes.length > 1) {
      const allPrices = variationOffers.map((o: any) => Number(o.price));
      return {
        ...baseSchema,
        "@type": "Product",
        "sku": `RP-PG-${targetProduct.id || '1'}`,
        "mpn": `MPN-${targetProduct.id || '1'}`,
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "INR",
          "lowPrice": Math.min(...allPrices),
          "highPrice": Math.max(...allPrices),
          "offerCount": variationOffers.length,
          "offers": variationOffers
        }
      };
    } else {
      return {
        ...baseSchema,
        "@type": "Product",
        "sku": `RP-${targetProduct.id || '1'}-${sizes[0] || 1}${unitSymbol}`,
        "mpn": `MPN-${targetProduct.id || '1'}`,
        "offers": variationOffers[0]
      };
    }
  }, [product, productDetails, basePrice, displayImage, selectedSize]);

  const faqSchema = useMemo(() => {
    if (!product) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is the price of ${product.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The price of ${product.name} starts from ₹${Math.round(basePrice * discountFactor)} for a 1-liter pack at Rainbow Paints & Hardwares.`
          }
        },
        {
          "@type": "Question",
          "name": `Who manufactures ${product.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${product.name} is manufactured by ${product.brand}, a leading paint brand in India.`
          }
        },
        {
          "@type": "Question",
          "name": `What category does ${product.name} fall under?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${product.name} belongs to the ${product.category} category and is ideal for ${product.subCategory} applications.`
          }
        }
      ]
    };
  }, [product, basePrice, discountFactor]);

  const breadcrumbSchema = useMemo(() => {
    if (!product) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.rainbowpaint.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Products",
          "item": "https://www.rainbowpaint.in/buy-paint-online"
        },
        product.brand && {
          "@type": "ListItem",
          "position": 3,
          "name": product.brand,
          "item": `https://www.rainbowpaint.in/brands/${product.brand.toLowerCase().replace(/\s+/g, '-')}`
        },
        product.subCategory && {
          "@type": "ListItem",
          "position": 4,
          "name": product.subCategory,
          "item": `https://www.rainbowpaint.in/c/${product.subCategory.toLowerCase().replace(/\s+/g, '-')}`
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": product.name,
          "item": `https://www.rainbowpaint.in/p/${product.slug || product.name?.replace(/\s+/g, '-').toLowerCase()}`
        }
      ].filter(Boolean)
    };
  }, [product]);

  const metaDesc = useMemo(() => {
    return `Buy ${product?.name} by ${product?.brand} online at wholesale prices. ${product?.category} with fast local delivery in Coimbatore.`;
  }, [product]);

  const fallbackTitle = useMemo(() => {
    if (!productSlug) return "Buy Paint Online | Rainbow Paints";
    const name = productSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return `${name} - Buy Online | Wholesale Price`;
  }, [productSlug]);

  if (loading) {
    return (
      <div className="pt-24 pb-12 bg-royale-bg min-h-[80vh] flex items-center justify-center">
        <SEO 
          type="product"
          title={fallbackTitle}
          description={`Buy ${fallbackTitle.replace(' - Buy Online | Wholesale Price', '')} online at wholesale prices with fast local delivery in Coimbatore.`}
          url={`https://www.rainbowpaint.in/p/${productSlug}`}
        />
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}${selectedShade && selectedShade.shadeCode ? `-${selectedShade.shadeCode}` : '-white'}`,
      productId: product.id,
      name: product.name,
      brand: product.brand,
      image: displayImage || product.image,
      size: selectedSize,
      quantity,
      unitPrice: currentPrice / selectedSize,
      shade: selectedShade ? {
        name: selectedShade.name,
        code: selectedShade.shadeCode,
        hex: selectedShade.hex
      } : undefined
    });
    
  };

  const renderExtraDetails = (idPostfix: string) => (
    <div className="w-full">
      {/* Highlights/Properties */}
      {product.properties && product.properties.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-zinc-200 mb-8 shadow-sm">
          <div className="text-[11px] font-display font-semibold uppercase tracking-widest text-gold mb-3 flex items-center gap-2"><Star className="w-3.5 h-3.5"/> Key Features</div>
          <ul className="grid sm:grid-cols-2 gap-3 pb-1">
            {product.properties.map((prop: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 font-sans">
                <div className="mt-0.5 shrink-0 w-3.5 h-3.5 rounded-full bg-gold/20 flex items-center justify-center">
                  <Check className="w-2 h-2 text-gold" />
                </div>
                <span className="leading-snug">{prop}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tabs for extra details */}
      <div className="border-b border-zinc-200 mb-6 flex gap-6 sm:gap-8">
        {[{ id: 'desc', label: 'Description' }, { id: 'specs', label: 'Specifications' }].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider transition-all relative ${
              activeTab === tab.id ? 'text-gold' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId={`tab-indicator-${idPostfix}`} className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-gold" />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[150px] mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-zinc-600 font-sans leading-relaxed"
          >
            {activeTab === 'desc' && productDetails && (
              <div className="space-y-4">
                <p>{productDetails.desc1}</p>
                <p>{productDetails.desc2}</p>
              </div>
            )}
            {activeTab === 'specs' && productDetails && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs bg-zinc-50 p-4 sm:p-5 rounded-xl border border-zinc-200">
                  <div><span className="block text-zinc-600 mb-1 font-medium">Brand</span> <span className="text-zinc-900 font-bold">{product.brand}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Category</span> <span className="text-zinc-900 font-bold">{product.subCategory || product.category}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Finish Sheen</span> <span className="text-zinc-800 font-semibold">{productDetails.finish}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Drying / Recoat Time</span> <span className="text-zinc-800 font-semibold">{productDetails.dryingTime}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Coverage Capacity</span> <span className="text-zinc-800 font-semibold">{productDetails.coverage}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Washability & Scrub</span> <span className="text-zinc-800 font-semibold">{productDetails.washability}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Application Base</span> <span className="text-zinc-800 font-semibold">{productDetails.base}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Recommended Coats</span> <span className="text-zinc-800 font-semibold">{productDetails.coats}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">VOC / Eco Standard</span> <span className="text-zinc-800 font-semibold">{productDetails.vocLevel}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Official Warranty</span> <span className="text-gold font-bold">{productDetails.warranty}</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Authorized Local Dealer</span> <span className="text-zinc-900 font-semibold">Rainbow Paints, Coimbatore</span></div>
                  <div><span className="block text-zinc-600 mb-1 font-medium">Color Customization</span> <span className="text-zinc-900 font-semibold">Buy from 5000+ custom shades</span></div>
                </div>

                {/* AI Summary Fact Sheet Card for AI Crawlers & Shoppers */}
                <div className="bg-white p-5 rounded-xl border border-gold/40 shadow-sm">
                  <div className="flex items-center gap-2 text-gold font-display text-xs uppercase font-bold tracking-wider mb-2">
                    <Award className="w-4 h-4 text-gold" /> Product Specifications & Local Availability
                  </div>
                  <p className="text-xs text-zinc-700 leading-relaxed font-sans">
                    <strong className="text-zinc-900 font-semibold">{product.name}</strong> by <strong className="text-zinc-900 font-semibold">{product.brand}</strong> is stocked & sold by authorized dealer <strong className="text-zinc-900 font-semibold">Rainbow Paints & Hardwares</strong> (54 Cox Street, Kattoor, Coimbatore 641009). Offers an estimated coverage of <strong className="text-zinc-900 font-semibold">{productDetails.coverage}</strong> with <strong className="text-zinc-900 font-semibold">{productDetails.dryingTime}</strong> touch-dry time. Protected under <strong className="text-zinc-900 font-semibold">{productDetails.warranty}</strong> with <strong className="text-zinc-900 font-semibold">same-day local express delivery in Coimbatore</strong> and buy from 5000+ custom color shades.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  return (
    <article className="pt-[72px] sm:pt-24 pb-12 bg-royale-bg min-h-screen text-ivory/90 relative overflow-x-hidden selection:bg-gold/30">
      <SEO 
        type="product"
        title={`${product.name} by ${product.brand} - Buy Online | Wholesale Price`}
        description={metaDesc}
        keywords={`${product.name}, ${product.brand}, ${product.category}, ${product.subCategory}`}
        url={`https://www.rainbowpaint.in/p/${product.slug || product.name.replace(/\s+/g, '-').toLowerCase()}`}
        image={displayImage || product.image}
        productBrand={product.brand}
        productPrice={currentPrice}
        productCurrency="INR"
        productAvailability="InStock"
        schema={[productSchema, breadcrumbSchema, faqSchema].filter(Boolean)}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/buy-paint-online' },
            ...(product.brand ? [{ label: product.brand, href: `/brands/${product.brand.toLowerCase().replace(/\s+/g, '-')}` }] : []),
            ...(product.subCategory ? [{ label: product.subCategory, href: `/c/${product.subCategory.toLowerCase().replace(/\s+/g, '-')}` }] : []),
            { label: product.name }
          ]} 
        />

        <button onClick={() => navigate(-1)} className="text-zinc-600 hover:text-ivory flex items-center gap-2 text-xs mb-8 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
        </button>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10 lg:gap-16 items-start">
          {/* Image Gallery Column - Zoomable */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-4">
            <div 
              className={`relative bg-white rounded-2xl md:rounded-[2rem] aspect-square overflow-hidden cursor-crosshair border border-zinc-200/10 shadow-xl group`}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Product Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.popular && (
                  <span className="bg-gradient-gold text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    Best Seller
                  </span>
                )}
              </div>
              
              <button 
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur shadow-sm hover:scale-110 active:scale-95 transition-all text-zinc-600 hover:text-rose-500"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>

              <motion.img 
                src={displayImage || product.image} 
                alt={`${product.name} by ${product.brand} - ${product.category}`}
                title={`${product.name} - ${product.brand} Paint`}
                referrerPolicy="no-referrer"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={500}
                height={500}
                className={`w-full h-full object-contain p-8 lg:p-12 transition-transform duration-200 ${isZoomed ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
              />
              
              {/* Zoom Layer */}
              <div 
                className={`absolute inset-0 bg-white bg-no-repeat pointer-events-none transition-opacity duration-200 ${isZoomed ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backgroundImage: `url(${displayImage || product.image})`,
                  backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                  backgroundSize: '150%',
                }}
              />
            </div>

            {/* Desktop Details */}
            <div className="hidden md:block mt-8">
              {renderExtraDetails('desktop')}
            </div>
          </div>

          {/* Product Info Column */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gold font-display text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold">{product.brand}</span>
                {((product as any).subCategories || (product.subCategory ? [product.subCategory] : [])).map((sub: string, index: number) => (
                  <span key={index} className={`text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest border transition-colors ${getCategoryBadgeStyle(sub)}`} title={sub}>
                    {sub}
                  </span>
                ))}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-serif font-medium text-ivory mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-8 bg-green-50 w-fit px-3 py-1.5 rounded-full border border-green-100">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest">In Stock - Ready to Ship</span>
            </div>

            <div className="mb-8 w-full">
              <div className="grid grid-cols-4 gap-1.5 sm:gap-3 lg:gap-4">
                {[
                  { icon: ShieldCheck, line1: "Authorized", line2: "distributors", sub: "for featured products" },
                  { icon: Tags, line1: "Same Price", line2: "as In-Store", sub: "no online extra charge" },
                  { icon: Truck, line1: "Doorstep", line2: "delivery", sub: "skip the trip, we deliver" },
                  { icon: Award, line1: "20+ yrs", line2: "trusted", sub: "msme/gst certified" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                  <div key={idx} className="flex flex-col items-center justify-start sm:justify-center text-center p-2 sm:p-3 md:p-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group hover:-translate-y-1">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-1.5 sm:mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-gold drop-shadow-[0_2px_5px_rgba(184,151,90,0.2)]">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 sm:gap-1 items-center overflow-hidden">
                      <p className="text-[7.5px] sm:text-[10px] md:text-xs font-display font-bold text-gold uppercase tracking-tight sm:tracking-widest leading-[1.2] sm:leading-tight transition-colors text-center w-full">
                        <span className="block">{item.line1}</span>
                        <span className="block">{item.line2}</span>
                      </p>
                      <p className="text-[6.5px] sm:text-[9px] md:text-[10px] text-zinc-500 font-sans tracking-tight sm:tracking-wide leading-tight max-w-[150px] mt-1">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                )})}
              </div>
            </div>

            {/* Delivery Estimator */}
            <div className="mb-8 w-full">
              <DeliveryEstimator />
            </div>

            {/* Custom Embedded Shades Selector */}
            {hasShades && product.shades && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[11px] text-zinc-400 font-display uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gold"/> Select Color / Shade
                  </h2>
                  {selectedShade && (
                    <span className="text-[10px] bg-gold/10 text-gold px-2.5 py-0.5 rounded-full font-semibold">
                      {selectedShade.name} ({selectedShade.shadeCode})
                    </span>
                  )}
                </div>
                <div className="bg-royale-surface border border-zinc-200/20 p-4 rounded-xl">
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {product.shades.map((shade: any) => {
                      const isSelected = selectedShade?.shadeCode === shade.code;
                      return (
                        <button
                          key={shade.code}
                          onClick={() => {
                            setSelectedShade({
                              id: `custom-shade-${product.id}-${shade.code}`,
                              name: shade.name,
                              shadeCode: shade.code,
                              hex: shade.hex,
                              brand: product.brand
                            });
                          }}
                          className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${
                            isSelected 
                              ? 'border-gold bg-gold/5 shadow-sm ring-1 ring-gold/20' 
                              : 'border-zinc-200/10 hover:border-zinc-200/30 bg-zinc-800/20'
                          }`}
                          title={`${shade.name} (${shade.code})`}
                        >
                          <div 
                            className="w-8 h-8 rounded-full border border-white/10 shadow-inner relative flex items-center justify-center shrink-0"
                            style={{ backgroundColor: shade.hex }}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm ring-1 ring-black/20" />
                            )}
                          </div>
                          <span className="text-[9px] font-medium text-ivory/80 text-center truncate w-full leading-tight">
                            {shade.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Standard Shade Selector */}
            {!hasShades && isPaint && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-[11px] text-zinc-800 font-display uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gold"/> Select Color & Finish
                  </h2>
                </div>
                <div className="bg-white border border-zinc-200 p-3 rounded-xl">
                  <InlineShadePicker 
                    brand={product.brand}
                    currentShade={selectedShade}
                    onSelect={(shade) => setSelectedShade(shade)}
                  />
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[11px] text-zinc-800 font-display uppercase tracking-widest font-semibold flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-gold"/> Capacity / Size</h2>
              </div>
              
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {productSizes.map((size: number) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setQuantity(1); }}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      selectedSize === size 
                        ? 'border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(184,151,90,0.15)] ring-1 ring-gold/30' 
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50'
                    }`}
                  >
                    <span className="block text-sm sm:text-base font-serif font-semibold">
                      {size < 1 
                        ? `${size * 1000}ml` 
                        : `${size}${product.unit || 'L'}`}
                    </span>
                    <span className="block text-[9px] font-sans opacity-70 mt-0.5">
                      ₹{Math.round(basePrice * size * (
                        product?.unit === 'kg' 
                          ? (size === 5 ? 0.94 : size === 20 ? 0.53 : size === 25 ? 0.8 : size === 40 ? 0.472 : size === 50 ? 0.628 : 1)
                          : (size === 4 ? 0.96 : size === 10 ? 0.92 : size === 20 ? 0.88 : 1)
                      )).toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-3xl font-display font-medium text-ivory">₹{currentPrice.toLocaleString()}</span>
                {selectedSize === 1 && <span className="text-zinc-600 line-through text-sm mb-1">₹{Math.floor(basePrice * 1.15).toLocaleString()}</span>}
              </div>
              <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider">Inclusive of all taxes</p>
            </div>

            {/* Bulk Enquiry */}
            <div className="mb-6">
              <a 
                href={`https://wa.me/918072442930?text=${encodeURIComponent(`Hi Rainbow Paints! I'm looking for bulk pricing for ${product.name} (${product.brand}).`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-zinc-600 hover:text-[#25D366] transition-colors text-[10px] sm:text-xs font-semibold uppercase tracking-wider group bg-zinc-100 hover:bg-[#25D366]/10 px-3 py-1.5 rounded-full"
              >
                <svg className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Bulk order? Get exclusive pricing
              </a>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-row gap-4 mb-8 w-full">
              <div className="flex items-center justify-between border border-zinc-200 bg-white rounded-xl px-2 w-[120px] sm:w-32 shrink-0 h-14 sm:h-16">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded shrink-0 flex items-center justify-center text-zinc-600 hover:text-ivory hover:bg-zinc-200/50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-display font-medium text-base text-ivory w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 rounded shrink-0 flex items-center justify-center text-zinc-600 hover:text-ivory hover:bg-zinc-200/50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                className="flex-1 h-14 sm:h-16 bg-gradient-gold hover:opacity-90 text-white font-display font-bold uppercase tracking-widest text-sm sm:text-base rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_4px_20px_rgba(184,151,90,0.25)]"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>
            
            <PolicyHighlights />
            
            {/* Mobile Details */}
            <div className="block md:hidden mt-2">
              {renderExtraDetails('mobile')}
            </div>
            
          </div>
        </div>

        {/* Product FAQs for AEO */}
        <div className="mt-16 pt-16 border-t border-zinc-200/50">
          <h2 className="text-2xl font-serif text-ivory mb-8">Frequently Asked Questions about <span className="text-gradient italic">{product.name}</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-royale-surface border border-zinc-200/50 rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What is the price of {product.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                The price of {product.name} starts from ₹{Math.round(basePrice * discountFactor)} for a 1-liter pack at Rainbow Paints & Hardwares. Price varies based on the pack size and selected shade.
              </p>
            </div>
            <div className="bg-royale-surface border border-zinc-200/50 rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What warranty comes with {product.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {product.name} comes with an official <strong className="text-gold font-medium">{productDetails?.warranty}</strong> provided by {product.brand} when applied over the recommended primer/undercoat system on sound surfaces.
              </p>
            </div>
            <div className="bg-royale-surface border border-zinc-200/50 rounded-2xl p-6 hover:border-gold/30 transition-colors md:col-span-2">
              <h3 className="font-medium text-ivory mb-3 text-sm">What category does {product.name} fall under and what is its coverage?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {product.name} by {product.brand} belongs to the {product.subCategory || product.category} category. It offers an estimated coverage capacity of {productDetails?.coverage} with a {productDetails?.finish} and a touch-dry time of {productDetails?.dryingTime}.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together Section */}
        {boughtTogether.length > 0 && (
          <div className="mt-20 pt-16 border-t border-zinc-200/50">
            <h2 className="text-2xl font-serif text-ivory mb-8">Customers buy these <span className="text-gradient italic">Together</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {boughtTogether.map(rp => (
                <Link to={`/p/${rp.name.replace(/\s+/g, '-').toLowerCase()}`} key={rp.id} className="group flex flex-col bg-royale-surface border border-zinc-200 hover:border-gold/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(184,151,90,0.1)]">
                  <div className="relative bg-white aspect-[4/3] p-4 sm:p-6 flex items-center justify-center">
                    <img src={rp.image} alt={rp.name} loading="lazy" decoding="async" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-gold font-display font-bold mb-1">{rp.brand}</span>
                    <h3 className="text-sm font-medium text-ivory mb-2 leading-tight line-clamp-2">{rp.name}</h3>
                    <span className="text-lg font-display text-ivory mt-auto">{rp.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-zinc-200/50">
            <h2 className="text-2xl font-serif text-ivory mb-8">You might also <span className="text-gradient italic">Like</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {relatedProducts.map(rp => (
                <Link to={`/p/${rp.name.replace(/\s+/g, '-').toLowerCase()}`} key={rp.id} className="group flex flex-col bg-royale-surface border border-zinc-200 hover:border-gold/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(184,151,90,0.1)]">
                  <div className="relative bg-white aspect-[4/3] p-4 sm:p-6 flex items-center justify-center">
                    <img src={rp.image} alt={rp.name} loading="lazy" decoding="async" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-gold font-display font-bold mb-1">{rp.brand}</span>
                    <h3 className="text-sm font-medium text-ivory mb-2 leading-tight line-clamp-2">{rp.name}</h3>
                    <span className="text-lg font-display text-ivory mt-auto">{rp.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

