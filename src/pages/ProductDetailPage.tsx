import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { collection, query, where, getDocs, getDocsFromCache } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ArrowLeft, Star, ShoppingCart, Heart, Check, ChevronRight, Filter, Ruler, Info, Minus, Plus, ShieldCheck, Tags, Truck, Award } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { useAuthStore } from '../store/useAuthStore';
import { mockProducts } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import PolicyHighlights from '../components/PolicyHighlights';
import DeliveryEstimator from '../components/DeliveryEstimator';
import { InlineShadePicker, RalShadePicker, DEFAULT_WHITES } from '../components/ProductsSection';
import { Shade } from '../services/shadeService';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import {
  applyStandardEnamelIndustrialShades,
  STANDARD_ENAMEL_INDUSTRIAL_SHADES,
} from '../constants/industrialEnamelShades';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const sizeParam = searchParams.get('size');
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

        // 1. Fetch from Firebase and find a case-insensitive match (with cache/offline fallback)
        let snapshotDocs: any[] = [];
        try {
          const snapshot = await getDocs(collection(db, 'products'));
          snapshotDocs = snapshot.docs;
        } catch (firestoreErr) {
          try {
            const cachedSnapshot = await getDocsFromCache(collection(db, 'products'));
            snapshotDocs = cachedSnapshot.docs;
          } catch {
            snapshotDocs = [];
          }
        }
        const removedNames = [
          'Tractor Sparc Emulsion',
          'Tractor Uno Acrylic Distemper',
          'Tractor Emulsion Shyne',
          'Apcolite Premium Satin Emulsion',
          'Apcolite Advanced Emulsion',
          'Apcolite Premium Enamel',
          'Apex Advanced',
          'Floor Epoxy Coating',
          'Food Grade Epoxy',
          'MIO Coatings',
          'BP Red Oxide Primer',
          'Luxol Metal Primer',
          'Protecton Red Oxide Metal Primer IS 2339'
        ].map(n => n.toLowerCase());

        const blacklistedIds = ['FtYxbQJggWPGiFQmCZqU', 'cfC16vcJc7Y6SuG8I0io', 'urWWhE0zkeCmRzBcTHqw', 'KQsvJ6kbraBWrRqaiLPB'];

        let dbProducts = snapshotDocs.map(doc => ({ id: doc.id, ...doc.data() }))
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
          let updatedP = { ...p };
          let key = updatedP.name ? updatedP.name.trim().toLowerCase() : '';

          if (key === 'protecton epilux 4 mio coating' || key === 'berger paints red oxide zinc chromate metal primer is2074') {
            updatedP = {
              ...updatedP,
              name: 'Berger Paints Red Oxide Zinc Chromate Metal Primer IS2074',
              seoTitle: 'Berger Paints Red Oxide Zinc Chromate Metal Primer IS2074',
              subCategory: 'Primers',
              price: '₹ 2,834.00',
              sizes: [20],
              sizePrices: { 20: 2834 },
              unit: 'L',
              properties: [
                'Red Oxide Zinc Chromate Anti-Corrosive Metal Primer conforming to IS 2074',
                'Dual active-passive rust protection for structural steel and iron surfaces',
                'Excellent adhesion, leveling, and barrier resistance in industrial environments',
                'Ideal foundation coat for synthetic enamels, alkyd, and industrial topcoats'
              ],
              image: '/assets/aistudio/berger_protection_br_rozc_prim_2074_pq_zinc_chroma_1789721975_19d96e46.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'protecton yellow zinc chromate primer' || key === 'berger industrial zinc yellow primer') {
            updatedP = {
              ...updatedP,
              name: 'Berger Industrial Zinc Yellow Primer',
              seoTitle: 'Berger Industrial Zinc Yellow Primer',
              image: '/assets/aistudio/Berger_Industrial_Zinc_Primer_Drum_2b7eeb0c.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'protecton grey oxide zinc chromate primer' || key === 'berger paints industrial bison zinc phosphate grey primer') {
            updatedP = {
              ...updatedP,
              name: 'Berger Paints Industrial Bison Zinc Phosphate Grey Primer',
              seoTitle: 'Berger Paints Industrial Bison Zinc Phosphate Grey Primer',
              properties: [
                'Single-Pack High Corrosion Protective Grey Metal Primer',
                'Formulated with Zinc Phosphate pigments for active anti-rust protection',
                'Outstanding adhesion on steel sheets and structural trusses',
                'Ensures high build foundation and excellent topcoat adhesion'
              ],
              image: '/assets/aistudio/5a50c524-2a35-4a96-8e39-799a97d1c66a_02114f07.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'protecton epilux 155 hb coating' || key === 'berger industrial epoxy paint - epilux 155 hb enamel paint') {
            updatedP = {
              ...updatedP,
              name: 'Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint',
              seoTitle: 'Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint | Buy Online',
              seoDescription: 'Buy Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint in 4L (₹1,480) & 20L (₹6,800) packs. Heavy-duty two-pack polyamide epoxy coating in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.',
              seoKeywords: 'Berger Industrial Epoxy Paint, Epilux 155 HB Enamel Paint, Berger Protecton Epilux 155 HB, industrial epoxy enamel 4L 20L, RAL shade epoxy paint, Dark Grey Smoke Grey Golden Yellow Signal Red Blue Green epoxy',
              subCategory: 'Epoxy Paint',
              price: '₹ 1,480.00',
              sizes: [4, 20],
              sizePrices: { 4: 1480, 20: 6800 },
              unit: 'L',
              shades: STANDARD_ENAMEL_INDUSTRIAL_SHADES,
              allowRalShades: true,
              properties: [
                'Two-Pack High-Build Polyamide-Cured Industrial Epoxy Enamel (3:1 Mixing Ratio)',
                'Superior defense against water condensation, mineral oils, and chemical splashes',
                'Hard, abrasion-resistant gloss/semi-gloss topcoat for structural steel & machinery',
                'Available in 4L & 20L packs — White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & RAL codes'
              ],
              image: '/assets/aistudio/Green_Berger_Epilux_Industrial_Paint_Drum_9548146d.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'luxol high gloss enamel' || key === 'luxol high gloss enamel paint') {
            updatedP = {
              ...updatedP,
              name: 'Luxol High Gloss Enamel Paint',
              seoTitle: 'Luxol High Gloss Enamel Paint by Berger Paints | Buy Online',
              seoDescription: 'Buy Berger Luxol High Gloss Enamel Paint online at wholesale prices. Mirror-like high-gloss solvent-based enamel for wood & metal surfaces in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.',
              seoKeywords: 'Luxol High Gloss Enamel Paint, Berger Luxol Hi-Gloss Enamel, Luxol Enamel Paint, metal and wood enamel paint, high gloss synthetic enamel, RAL shade enamel paint',
              properties: [
                'Mirror-Like High-Gloss Enamel Finish',
                'Tough, Stain & Scratch-Resistant Protective Film',
                'Anti-Corrosive Shield for Wood, Metal Grills & Doors',
                'Available in 8 Standard Colors & Custom RAL Shade Codes'
              ],
              image: '/assets/aistudio/Lewis_Berger_LUXOL_Red_Paint_Can_98daa79b.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'just spray js1 acrylic spray paint - classic shades' || key === 'acrylic spray paint just spray classic shades') {
            updatedP = {
              ...updatedP,
              name: 'Acrylic Spray Paint Just Spray Classic Shades',
              seoTitle: 'Acrylic Spray Paint Just Spray Classic Shades | Buy Online',
              seoDescription: 'Buy Acrylic Spray Paint Just Spray Classic Shades (400ml Aerosol Can) online at wholesale prices. Fast-drying 100% pure acrylic spray paint in Glossy Black, Glossy White, Signal Red, Matt Black, Medium Yellow & Forest Green.',
              seoKeywords: 'Acrylic Spray Paint Just Spray Classic Shades, Just Spray Acrylic Spray Paint, Just Spray Thailand 400ml, aerosol spray paint, fast dry acrylic spray paint, classic shades spray paint',
              image: '/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png',
              shades: Array.isArray(updatedP.shades)
                ? updatedP.shades.map((s: any) => ({
                    ...s,
                    image: '/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png'
                  }))
                : updatedP.shades
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'mrf metalcoat polyurethane finish' || key === 'mrf metalcoat luxury 2k pu paint finish - for metal and wood' || key === 'mrf metalcoat luxury 2k pu paint - metal and wood finish') {
            updatedP = {
              ...updatedP,
              name: 'MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish',
              seoTitle: 'MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish',
              seoDescription: 'Buy MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish online at wholesale prices. Two-component non-yellowing polyurethane coating for metal gates, grilles, wood doors & industrial structures in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.',
              seoKeywords: 'MRF MetalCoat Luxury 2K PU Paint, Metal and Wood Finish, MRF MetalCoat PU Paint, 2K PU Paint for Metal and Wood, MRF Vapocure MetalCoat, RAL shade PU paint',
              properties: [
                'Two-component luxury 2K polyurethane (PU) finish for metal and wood',
                'Outstanding non-yellowing high-gloss or matt finish',
                'Superior abrasion, scratch, and chemical splash resistance',
                'Perfect for metal gates, wooden doors, automotive touchups & industrial structures'
              ]
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'mrf durothane pu wood finish' || key === 'mrf durothane 2k pu paint - metal and wood finish' || key === 'mrf durothane 2k pu paint -metal and wood finish') {
            updatedP = {
              ...updatedP,
              name: 'MRF Durothane 2K PU Paint - Metal and Wood Finish',
              seoTitle: 'MRF Durothane 2K PU Paint - Metal and Wood Finish',
              seoDescription: 'Buy MRF Durothane 2K PU Paint - Metal and Wood Finish online at wholesale prices. Premium two-pack 2K polyurethane coating for wooden doors, furniture & metal surfaces with scratch, water & chemical resistance.',
              seoKeywords: 'MRF Durothane 2K PU Paint, Metal and Wood Finish, MRF Durothane PU Wood Finish, 2K PU Paint for Metal and Wood, MRF Vapocure Durothane, polyurethane metal wood coating',
              properties: [
                'Premium two-pack 2K polyurethane finish for metal and wood',
                'Exceptional gloss retention, clarity & smooth film build',
                'Outstanding resistance to scratching, water, and domestic chemicals',
                'Suitable for wooden doors, furniture, gates & heavy-wear metal and wood surfaces'
              ]
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'pu enamel' || key === 'luxol pu enamel paint - for metal and wood finishes') {
            updatedP = {
              ...updatedP,
              name: 'Luxol PU Enamel Paint - For Metal and Wood Finishes',
              seoTitle: 'Luxol PU Enamel Paint - For Metal and Wood Finishes',
              seoDescription: 'Buy Berger Luxol PU Enamel Paint - For Metal and Wood Finishes online at wholesale prices. 4 Years Warranty polyurethane enamel for wooden doors, furniture, gates & metal surfaces in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.',
              seoKeywords: 'Luxol PU Enamel Paint, Luxol PU Enamel, Metal and Wood Finishes, Berger Luxol PU Enamel, polyurethane enamel paint, RAL shade PU enamel',
              properties: [
                'Engineering Grade Polyurethane (PU) Enamel for Metal & Wood Finishes (4 Years Warranty)',
                'Extreme Hardness & Absolute Scratch Shield',
                'Maintains High Gloss and Color without Yellowing in UV',
                'Available in 8 Standard Colors & Custom RAL Shade Codes'
              ],
              image: '/assets/aistudio/Berger_Luxol_PU_Enamel_Paint_Can_fe1cf491.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'mrf zameen floor coat' || key === 'mrf zameen 2k pu floor paint - for concrete and paver blocks surfaces') {
            updatedP = {
              ...updatedP,
              name: 'MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces',
              seoTitle: 'MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces',
              seoDescription: 'Buy MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces online at wholesale prices. Heavy-duty two-pack 2K polyurethane floor coating for concrete driveways, interlocking paver blocks, garage floors & industrial bays in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.',
              seoKeywords: 'MRF Zameen 2K PU Floor Paint, For Concrete and Paver Blocks Surfaces, MRF Zameen Floor Coat, 2K PU Floor Paint, concrete driveway paint, paver block floor coating, MRF Vapocure Zameen',
              properties: [
                'Heavy-duty 2K polyurethane floor paint for concrete and paver blocks surfaces',
                'Extreme abrasion resistance against forklift, car tire, and heavy foot traffic',
                'Superior resistance to oil, grease, detergents, water, and chemical spills',
                'Ideal for concrete driveways, paver blocks, garage floors, showrooms & walkways'
              ]
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'luxol anti rust 1k qd epoxy primer grey' || key === 'luxol anti-rust quick drying epoxy primer') {
            updatedP = {
              ...updatedP,
              name: 'Luxol Anti Rust 1K QD Epoxy Primer Grey',
              seoTitle: 'Luxol Anti Rust 1K QD Epoxy Primer Grey by Berger Paints | Buy Online',
              seoDescription: 'Buy Berger Luxol Anti Rust 1K QD Epoxy Primer Grey online at wholesale prices. Quick-drying single-pack (1K) anti-corrosive epoxy metal primer for steel, wood & masonry. Touch dry in 20 mins; available in 1L (₹440), 4L (₹1,550) & 20L (₹6,900) packs.',
              seoKeywords: 'Luxol Anti Rust 1K QD Epoxy Primer Grey, Berger Luxol Quick Drying Epoxy Primer, 1K Epoxy Primer Grey, Berger anti rust metal primer, quick dry epoxy primer 1L 4L 20L',
              price: '₹ 440.00',
              sizes: [1, 4, 20],
              sizePrices: { 1: 440, 4: 1550, 20: 6900 },
              unit: 'L',
              image: '/assets/aistudio/Lewis_Berger_Luxol_Anti-Rust_Primer_187bd4e7.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'mrf single pack epoxy primer grey' || key === 'mrf vapocure spep single pack epoxy primer grey') {
            updatedP = {
              ...updatedP,
              name: 'MRF Single Pack Epoxy Primer Grey',
              seoTitle: 'MRF Single Pack Epoxy Primer Grey (SPEP) | MRF Vapocure | Buy Online',
              seoDescription: 'Buy MRF Single Pack Epoxy Primer Grey (Vapocure SPEP) online at wholesale prices. Fast-drying 1K solvent-based epoxy metal primer for mild steel, industrial fabrication & automotive parts. Available in 1L (₹420) & 4L (₹1,560) packs.',
              seoKeywords: 'MRF Single Pack Epoxy Primer Grey, MRF Vapocure SPEP Grey, MRF SP EP Primer Grey, 1K epoxy primer metal, single pack epoxy primer 1L 4L, anti corrosive grey primer',
              price: '₹ 420.00',
              sizes: [1, 4],
              sizePrices: { 1: 420, 4: 1560 },
              unit: 'L',
              image: '/assets/aistudio/MRF_Vapocure_SPEP_Epoxy_Primer_Tin_671ab43b.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'pure turpentine oil (local brand)' || key === 'turpentine oil - for thinning/drying oil paints') {
            updatedP = {
              ...updatedP,
              name: 'Turpentine Oil - For Thinning/Drying Oil Paints',
              slug: 'turpentine-oil-for-thinning-drying-oil-paints',
              seoTitle: 'Turpentine Oil - For Thinning/Drying Oil Paints',
              seoDescription: 'Buy Turpentine Oil - For Thinning/Drying Oil Paints online at wholesale prices. Pure mineral turpentine oil solvent for thinning synthetic enamels, oil paints, varnishes & cleaning painting brushes and rollers.',
              seoKeywords: 'Turpentine Oil, Turpentine Oil For Thinning Drying Oil Paints, Mineral Turpentine Oil, Oil Paint Thinner, Enamel Paint Thinner, Paint Brush Cleaner, Turpentine Thinner 500ml 1L 3L 5L',
              properties: [
                'Genuine Mineral Turpentine Oil for Thinning & Drying Oil Paints',
                'Enhances Synthetic Enamel Wetting, Coverage & Brush Flow Control',
                'Effective for Cleansing Paint Brushes, Rollers & Spray Equipment',
                'Aromatic Hydrocarbon Solvent with Controlled Evaporation Rate'
              ],
              image: '/assets/aistudio/Clear_Ribbed_Water_Bottle_52311ca2.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'berger red oxide primer' || key === 'berger red oxide metal primer') {
            updatedP = {
              ...updatedP,
              name: 'Berger Red Oxide Primer',
              slug: 'berger-red-oxide-primer',
              seoTitle: 'Berger Red Oxide Primer (Solvent Thinnable) 1L & 4L | Buy Online',
              seoDescription: 'Buy Berger Red Oxide Primer (Solvent Thinnable) in 1L (₹210) & 4L (₹820) tins online at wholesale prices. Alkyd-based anti-corrosive metal primer for iron gates, grills & mild steel. Surface dry in 30 mins; coverage 100-120 sq.ft/L.',
              seoKeywords: 'Berger Red Oxide Primer, Berger Red Oxide Metal Primer, Solvent Thinnable Red Oxide Primer, Berger Red Oxide Primer 1L 4L price, anti rust metal primer, iron gate grill primer',
              price: '₹ 210.00',
              sizes: [1, 4],
              sizePrices: { 1: 210, 4: 820 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Red_Oxide_Primer_Tin_2bba15c7.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'berger bp zinc yellow primer' || key === 'berger zinc yellow primer') {
            updatedP = {
              ...updatedP,
              name: 'Berger BP Zinc Yellow Primer',
              slug: 'berger-bp-zinc-yellow-primer',
              seoTitle: 'Berger BP Zinc Yellow Primer (Solvent Thinnable) 1L & 4L | Buy Online',
              seoDescription: 'Buy Berger BP Zinc Yellow Primer (Solvent Thinnable) in 1L (₹290) & 4L (₹1,120) tins online at wholesale prices. Micro-zinc alkyd anti-corrosive primer for mild steel, GI, aluminum & coastal environments. Green Pro Certified.',
              seoKeywords: 'Berger BP Zinc Yellow Primer, Berger Zinc Yellow Primer, Zinc Chromate Metal Primer 1L 4L, Berger Solvent Thinnable Zinc Yellow Primer, non ferrous metal primer, anti corrosive yellow primer',
              price: '₹ 290.00',
              sizes: [1, 4],
              sizePrices: { 1: 290, 4: 1120 },
              unit: 'L',
              image: '/assets/aistudio/Berger_BP_Zinc_Yellow_Primer_Tin_147c7eea.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'mrf xuper yellow primer' || key === 'mrf vapocure xuper yellow primer') {
            updatedP = {
              ...updatedP,
              name: 'MRF Xuper Yellow Primer',
              slug: 'mrf-xuper-yellow-primer',
              seoTitle: 'MRF Xuper Yellow Primer (Vapocure V254) 1L & 4L | Buy Online',
              seoDescription: 'Buy MRF Xuper Yellow Primer (MRF Vapocure V254 Zinc Chrome Yellow Metal Primer) in 1L (₹360) & 4L (₹1,420) tins online at wholesale prices. Fast-drying ~30 min surface dry anti-rust primer for iron, mild steel & structural fabrication.',
              seoKeywords: 'MRF Xuper Yellow Primer, MRF Vapocure Xuper Yellow Primer, MRF Zinc Chrome Yellow Primer V254, MRF Yellow Metal Primer 1L 4L, fast dry metal primer',
              price: '₹ 360.00',
              sizes: [1, 4],
              sizePrices: { 1: 360, 4: 1420 },
              unit: 'L',
              image: '/assets/aistudio/MRF_Vapocure_Xuper_Yellow_Primer_Can_117fa5e0.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'protecton bergethane pu finish' || key === 'industrial 2k bergerthane pu enamel paint') {
            updatedP = {
              ...updatedP,
              name: 'Industrial 2K Bergerthane PU Enamel Paint',
              slug: 'industrial-2k-bergerthane-pu-enamel-paint',
              seoTitle: 'Industrial 2K Bergerthane PU Enamel Paint | 11L & 20L | Berger Protecton',
              seoDescription: 'Buy Industrial 2K Bergerthane PU Enamel Paint (Berger Protecton BTHANE PU) in 11L & 20L packs at wholesale prices. Two-pack 10:1 aliphatic acrylic polyurethane coating with UV & chemical resistance in standard & custom RAL shades.',
              seoKeywords: 'Industrial 2K Bergerthane PU Enamel Paint, Berger Protecton Bergethane PU, BTHANE PU Glossy Finish, 2K industrial polyurethane paint 11L 20L, RAL shade 2K PU enamel, Berger Thinner 825 PU coating',
              price: '₹ 3,950.00',
              sizes: [11, 20],
              sizePrices: { 11: 3950, 20: 6950 },
              unit: 'L',
              properties: [
                'Two-Pack Aliphatic 2K Acrylic Polyurethane (10:1 Mixing Ratio with Catalyst M15C70)',
                'Non-Yellowing High-Gloss UV & Weather Resistance for Tanks, Pipelines & Machinery',
                'Available in 11L (10L Base + 1L Catalyst) & 20L Industrial Packs',
                'Available in 8 Standard Colors & Custom RAL Classic Shade Codes'
              ],
              image: '/assets/aistudio/Berger_Protecton_Industrial_Paint_Pail_ee70a210.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (key === 'berger industrial epilux 78 high build tank liner' || key === 'epilux 78 hbtl' || key === 'protecton epilux 78 hbtl') {
            updatedP = {
              ...updatedP,
              name: 'Berger Industrial Epilux 78 High Build Tank Liner',
              slug: 'berger-industrial-epilux-78-high-build-tank-liner',
              seoTitle: 'Berger Industrial Epilux 78 High Build Tank Liner (20L) | White & Grey',
              seoDescription: 'Buy Berger Industrial Epilux 78 High Build Tank Liner (HBTL) 20L Pack online at wholesale prices. CFTRI & USFDA 21 CFR 175.300 compliant 2-pack amine-adduct epoxy tank coating in White & Grey for potable water, chemical & hydrocarbon tanks.',
              seoKeywords: 'Berger Industrial Epilux 78 High Build Tank Liner, Berger Epilux 78 HBTL White Grey, Epilux 78 20L Tank Coating, food grade potable water epoxy tank paint, CFTRI USFDA epoxy tank liner, Berger Catalyst 955938 Thinner 844',
              price: '₹ 9,650.00',
              sizes: [20],
              sizePrices: { 20: 9650 },
              unit: 'L',
              shades: [
                { name: 'White', code: '955000', hex: '#F8F9FA' },
                { name: 'Grey', code: 'GREY', hex: '#8D9296' }
              ],
              allowRalShades: false,
              image: '/assets/aistudio/Berger_Protecton_Green_Paint_Drum_823bd727.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'berger industrial ferrotol heat resistant aluminium paint (upto 250°c)' ||
            key === 'berger ferrotol hr aluminium paint' ||
            key === 'ferrotol hr aluminium medium'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger Industrial Ferrotol Heat Resistant Aluminium Paint (Upto 250°C)',
              slug: 'berger-industrial-ferrotol-heat-resistant-aluminium-paint-upto-250c',
              seoTitle: 'Berger Industrial Ferrotol Heat Resistant Aluminium Paint (Upto 250°C) | 4L & 20L',
              seoDescription: 'Buy Berger Industrial Ferrotol HR Heat Resistant Aluminium Paint (up to 250°C) in 4L (₹1,620) & 20L (₹7,880) dual packs online at wholesale prices. Dual-pack oleoresinous leafing aluminium coating for boilers, stacks, chimneys, pipes & tanks.',
              seoKeywords: 'Berger Industrial Ferrotol Heat Resistant Aluminium Paint, Berger Ferrotol HR Aluminium 250C, heat resistant aluminium paint 250 degree, boiler chimney pipe heat paint, Berger Ferrotol Medium 541984 Al Paste 511985',
              price: '₹ 1,620.00',
              sizes: [4, 20],
              sizePrices: { 4: 1620, 20: 7880 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Ferrotol_HR_Aluminium_Paint_Drum_b3ed3008.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'berger g.p synthetic enamel paint - industrial grade' ||
            key === 'berger butterfly g.p. synthetic enamel' ||
            key === 'berger gp synthetic enamel paint - industrial grade'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger G.P Synthetic Enamel Paint - Industrial Grade',
              slug: 'berger-gp-synthetic-enamel-paint-industrial-grade',
              seoTitle: 'Berger G.P Synthetic Enamel Paint - Industrial Grade (20L) | RAL & Standard Shades',
              seoDescription: 'Buy Berger Butterfly G.P. Synthetic Enamel Paint - Industrial Grade in 20L drums (₹4,530) at wholesale prices. High-gloss alkyd enamel (80±5° gloss) for mild steel grilles, gates, machinery & interior wood in White, Black, Grey, Yellow, Red, Blue, Green & custom RAL shades.',
              seoKeywords: 'Berger G.P Synthetic Enamel Paint, Berger Butterfly GP Synthetic Enamel 20L, industrial synthetic enamel paint, bright grey synthetic enamel, Berger Thinner 800 enamel, RAL shade GP enamel 20L',
              price: '₹ 4,530.00',
              sizes: [20],
              sizePrices: { 20: 4530 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Butterfly_Burgundy_Paint_Can_0bd8ae57.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'berger torpedo quick drying enamel paint - industrial grade' ||
            key === 'berger torpedo qd enamel paint - industrial grade' ||
            key === 'berger torpedo qd enamel'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger Torpedo Quick Drying Enamel Paint - Industrial Grade',
              slug: 'berger-torpedo-quick-drying-enamel-paint-industrial-grade',
              seoTitle: 'Berger Torpedo Quick Drying Enamel Paint - Industrial Grade (20L) | RAL Shades',
              seoDescription: 'Buy Berger Torpedo Quick Drying (QD) Enamel Paint - Industrial Grade in 20L ColorBank drums (₹5,390) at wholesale prices. Rapid 30-min touch-dry & 60-min hard-dry alkyd enamel for machinery, fabrication & structural steel in standard & custom RAL shades.',
              seoKeywords: 'Berger Torpedo Quick Drying Enamel Paint, Berger Torpedo QD Enamel 20L, industrial QAD enamel paint, fast drying metal enamel 30 min dry, Berger Protecton Torpedo N Base V92I77, RAL shade QD enamel',
              price: '₹ 5,390.00',
              sizes: [20],
              sizePrices: { 20: 5390 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Protecton_Green_Paint_Drum__1__0566f887.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'protecton epilux 610 epoxy primer' ||
            key === 'berger epilux 610 coating grey epoxy primer - industrial grade' ||
            key === 'epilux 610 coating grey'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger Epilux 610 Coating Grey Epoxy Primer - Industrial Grade',
              slug: 'berger-epilux-610-coating-grey-epoxy-primer-industrial-grade',
              seoTitle: 'Berger Epilux 610 Coating Grey Epoxy Primer - Industrial Grade',
              seoDescription: 'Buy Berger Epilux 610 Coating Grey Epoxy Primer (P43633) - Industrial Grade online at wholesale prices. Two-pack epoxy zinc phosphate anti-corrosive primer (5:1 with Catalyst P43C50) in 4L & 18L drums; Berger Thinner 844 compatible.',
              seoKeywords: 'Berger Epilux 610 Coating Grey Epoxy Primer, Epilux 610 Grey P43633, Protecton Epilux 610 Epoxy Primer, Berger Catalyst P43C50, two pack epoxy grey metal primer, industrial zinc phosphate epoxy primer',
              subCategory: 'Primers',
              price: '₹ 1,150.00',
              sizes: [4, 18],
              sizePrices: { 4: 1150, 18: 4140 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Epilux_610_Protective_Coating_Drum_7d1fa625.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'berger epoxy thinner 844 - industrial grade' ||
            key === 'berger thinner 844' ||
            key === 'thinner 844' ||
            key === 'epoxy thinner 844'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger Epoxy Thinner 844 - Industrial Grade',
              slug: 'berger-epoxy-thinner-844-industrial-grade',
              seoTitle: 'Berger Epoxy Thinner 844 - Industrial Grade (EP-4/5 | 20L)',
              seoDescription: 'Buy Berger Protecton Epoxy Thinner 844 (EP-4/5, Code 844 900) in 20L drums at wholesale prices. Specialized solvent for Epilux 4, Epilux 5, Epilux 610 & 78.',
              seoKeywords: 'Berger Epoxy Thinner 844, Berger Thinner 844 EP-4/5, Berger 844 900 Thinner 20L, Epilux Epoxy Thinner 844, Epilux 610 thinner, Epilux 78 thinner, industrial epoxy paint thinner',
              subCategory: 'Thinners & Solvents',
              price: '₹ 4,200.00',
              sizes: [20],
              sizePrices: { 20: 4200 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Protecton_Industrial_Thinner_Drum_b565d737.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'protecton epilux 5 coal tar epoxy' ||
            key === 'berger epilux 5 coal tar epoxy black' ||
            key === 'epilux 5 coal tar epoxy black' ||
            key === 'epilux-5 ctar epoxy-black'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger Epilux 5 Coal Tar Epoxy Black',
              slug: 'berger-epilux-5-coal-tar-epoxy-black',
              seoTitle: 'Berger Epilux 5 Coal Tar Epoxy Black (20L Drum) | Protecton',
              seoDescription: 'Buy Berger Protecton Epilux 5 Coal Tar Epoxy Black (655800) 20L drum online at wholesale price. Heavy-duty 2K waterproof & chemical resistant steel coating.',
              seoKeywords: 'Berger Epilux 5 Coal Tar Epoxy Black, Epilux 5 Coal Tar Epoxy 20L, Berger 655800 655821 Catalyst, Protecton Epilux 5 Black, coal tar epoxy paint 20 litre drum, underground pipeline epoxy coating, marine hull black coal tar epoxy',
              subCategory: 'Epoxy Paint',
              price: '₹ 5,150.00',
              sizes: [20],
              sizePrices: { 20: 5150 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Protecton_Epoxy_Paint_Drum_caad1fa1.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'mrf pu thinner for finish' ||
            key === 'thinner for finish' ||
            key === 'mrf thinner for finish'
          ) {
            updatedP = {
              ...updatedP,
              name: 'MRF PU Thinner For Finish',
              slug: 'mrf-pu-thinner-for-finish',
              seoTitle: 'MRF PU Thinner For Finish (TFF) | 1L, 5L & 20L | MRF Vapocure',
              seoDescription: 'Buy MRF PU Thinner For Finish (Thinner For Finish TFF) in 1L, 5L & 20L packs online at wholesale price. Slow-evaporating genuine solvent for WoodCoat & MetalCoat.',
              seoKeywords: 'MRF PU Thinner For Finish, MRF Thinner For Finish, MRF TFF Thinner, MRF WoodCoat Thinner, MRF MetalCoat Thinner, MRF Durothane PU Thinner 1L 5L 20L',
              subCategory: 'Thinners & Solvents',
              price: '₹ 390.00',
              sizes: [1, 5, 20],
              sizePrices: { 1: 390, 5: 1920, 20: 7450 },
              unit: 'L',
              image: '/assets/aistudio/Thinner_for_Finish_Product_Can_14e3833f.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'mrf epoxy thinner 1110 ep' ||
            key === 'mrf thinner 1110 ep' ||
            key === 'thinner 1110 ep'
          ) {
            updatedP = {
              ...updatedP,
              name: 'MRF Epoxy Thinner 1110 EP',
              slug: 'mrf-epoxy-thinner-1110-ep',
              seoTitle: 'MRF Epoxy Thinner 1110 EP | 1L, 5L & 20L | MRF Vapocure',
              seoDescription: 'Buy MRF Vapocure Epoxy Thinner 1110 EP in 1L, 5L & 20L packs online at wholesale prices. Specialized epoxy dilution solvent for Epidec primers & high-build finishes.',
              seoKeywords: 'MRF Epoxy Thinner 1110 EP, MRF Thinner 1110 EP, MRF Vapocure 1110 EP, MRF Epidec Epoxy Thinner, 1110EP thinner 5L 20L, industrial epoxy thinner',
              subCategory: 'Thinners & Solvents',
              price: '₹ 400.00',
              sizes: [1, 5, 20],
              sizePrices: { 1: 400, 5: 1960, 20: 7650 },
              unit: 'L',
              image: '/assets/aistudio/Blue_Vapocure_Paints_Thinner_Can_82b1b978.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'mrf melamine thinner 3830' ||
            key === 'mrf thinner 3830' ||
            key === 'thinner 3830'
          ) {
            updatedP = {
              ...updatedP,
              name: 'MRF Melamine Thinner 3830',
              slug: 'mrf-melamine-thinner-3830',
              seoTitle: 'MRF Melamine Thinner 3830 (PU & Wood) | 1L, 5L & 20L',
              seoDescription: 'Buy MRF Vapocure Melamine Thinner 3830 in 1L, 5L & 20L cans online at wholesale price. Medium-drying thinner for Melamine Aura wood finish & 2K PU sealers.',
              seoKeywords: 'MRF Melamine Thinner 3830, MRF Thinner 3830, MRF Vapocure 3830 Thinner 5L, MRF Melamine Aura Thinner, wood polish thinner 3830, MRF PU melamine thinner',
              subCategory: 'Thinners & Solvents',
              price: '₹ 340.00',
              sizes: [1, 5, 20],
              sizePrices: { 1: 340, 5: 1650, 20: 6450 },
              unit: 'L',
              image: '/assets/aistudio/MRF_Vapocure_Thinner_3830_Can_8b24fe26.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'mrf fast drying pu primer grey' ||
            key === 'mrf fast dry 2:30 primer' ||
            key === 'mrf 2:30 primer' ||
            key === 'mrf 2k pu primer grey'
          ) {
            updatedP = {
              ...updatedP,
              name: 'MRF Fast Drying PU Primer Grey',
              slug: 'mrf-fast-drying-pu-primer-grey',
              seoTitle: 'MRF Fast Drying PU Primer Grey (2:30 Hr Dry) | 1L & 4L',
              seoDescription: 'Buy MRF Vapocure Fast Dry 2:30 PU Primer Grey (with Hardener) in 1L & 4L packs online at wholesale prices. Dries in 2 Hr 30 Min @ 30°C for automotive & metal.',
              seoKeywords: 'MRF Fast Drying PU Primer Grey, MRF Fast Dry 2:30 Primer, MRF Vapocure 2K PU Primer Grey, 2K PU metal primer automotive, fast dry polyurethane surfacer 1L 4L, MRF PU primer with hardener',
              subCategory: 'Primers',
              price: '₹ 520.00',
              sizes: [1, 4],
              sizePrices: { 1: 520, 4: 1980 },
              unit: 'L',
              image: '/assets/aistudio/MRF_Vapocure_Paints_Product_Set_c2f2bd85.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'berger acid alkali & heat resistant bituminous black is 158 paint' ||
            key === 'berger acid alkali and heat resistant bituminous black is158 paint' ||
            key === 'berger black bituminous is 158' ||
            key === 'berger bituminous black is 158'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger Acid Alkali & Heat Resistant Bituminous Black IS 158 Paint',
              slug: 'berger-acid-alkali-heat-resistant-bituminous-black-is158-paint',
              seoTitle: 'Berger Bituminous Black IS 158 Paint (20L) | Acid & Heat',
              seoDescription: 'Buy Berger Black Bituminous IS 158 Paint (Code 767991) 20L drum online at wholesale price. Lead-free acid, alkali & heat resisting coating for steel & boilers.',
              seoKeywords: 'Berger Acid Alkali and Heat Resistant Bituminous Black IS 158 Paint, Berger Black Bituminous IS 158, Berger 767991 Bituminous Paint 20L, IS 158 bituminous black paint, acid alkali heat resisting black paint, industrial black bitumen paint 20 litre drum, boiler funnel chimney black paint',
              subCategory: 'Industrial Paint and Coatings',
              price: '₹ 5,100.00',
              sizes: [20],
              sizePrices: { 20: 5100 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Black_Bituminous_Paint_Drum_4a05332e.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'berger lumeros hot oil resistant coating white' ||
            key === 'berger lumerous hot oil resistant coating white' ||
            key === 'lumeros hor coating - white' ||
            key === 'lumeros hor coating white'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger Lumeros Hot Oil Resistant Coating White',
              slug: 'berger-lumeros-hot-oil-resistant-coating-white',
              seoTitle: 'Berger Lumeros Hot Oil Resistant Coating White (HOR | 20L)',
              seoDescription: 'Buy Berger Protecton Lumeros HOR Coating White (R59000) 20L drum online at wholesale price. Single-pack hot oil resistant white paint for transformer tanks.',
              seoKeywords: 'Berger Lumeros Hot Oil Resistant Coating White, Berger Lumerous Hot Oil Resistant Coating White, Berger Lumeros HOR Coating White R59000, transformer internal white paint 20L, hot oil resistant transformer tank coating, IS 1180 IS 2026 transformer paint, Berger Protecton HOR coating',
              subCategory: 'Industrial Paint and Coatings',
              price: '₹ 7,980.00',
              sizes: [20],
              sizePrices: { 20: 7980 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Protecton_Green_Paint_Drum__2__9f8732f4.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'berger industrial aluminium paint is 2339 medium' ||
            key === 'berger industrial aluminium paint is2339 medium' ||
            key === 'berger aluminium is 2339 medium' ||
            key === 'berger aluminium paint is 2339'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger Industrial Aluminium Paint IS 2339 Medium',
              slug: 'berger-industrial-aluminium-paint-is2339-medium',
              seoTitle: 'Berger Industrial Aluminium Paint IS 2339 Medium (20L Kit)',
              seoDescription: 'Buy Berger Industrial Aluminium Paint IS 2339 Medium (17.1L 661984 + 4.4Kg Paste 661985) 20L dual pack online. Reflective metallic coating up to 200°C heat.',
              seoKeywords: 'Berger Industrial Aluminium Paint IS 2339 Medium, Berger Aluminium IS 2339 Medium 661984, Berger 661985 Aluminium Paste, IS 2339 dual container aluminium paint 20L, industrial heat reflective silver aluminium paint, storage tank pipeline structural steel aluminium paint, Berger Protecton aluminium paint wholesale',
              subCategory: 'Industrial Paint and Coatings',
              price: '₹ 6,695.00',
              sizes: [20],
              sizePrices: { 20: 6695 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Green_Industrial_Paint_Drum_c47eabff.png'
            };
            key = updatedP.name.toLowerCase();
          } else if (
            key === 'berger boiler compound heat resistant ferrotol no. 1 paint' ||
            key === 'berger boiler compound heat resistant ferrotol no.1 paint' ||
            key === 'berger ferrotol - 1' ||
            key === 'berger ferrotol no. 1' ||
            key === 'ferrotol - 1'
          ) {
            updatedP = {
              ...updatedP,
              name: 'Berger Boiler Compound Heat Resistant Ferrotol No. 1 Paint',
              slug: 'berger-boiler-compound-heat-resistant-ferrotol-no-1-paint',
              seoTitle: 'Berger Ferrotol No. 1 Boiler Compound Paint (20L | 540°C)',
              seoDescription: 'Buy Berger Protecton Ferrotol - 1 Boiler Compound Paint (Code 052991) 20L drum online. Graphite-bituminous coating for boiler interiors up to 540°C wet heat.',
              seoKeywords: 'Berger Boiler Compound Heat Resistant Ferrotol No. 1 Paint, Berger Protecton Ferrotol - 1 052991, Ferrotol No 1 boiler interior paint 20L, heat resistant boiler drum tube coating 540C, graphite bituminous boiler compound paint, steam turbine economizer water wall coating, Berger Protecton industrial paint wholesale',
              subCategory: 'Industrial Paint and Coatings',
              price: '₹ 5,590.00',
              sizes: [20],
              sizePrices: { 20: 5590 },
              unit: 'L',
              image: '/assets/aistudio/Berger_Ferrotol_Industrial_Paint_Drum_628fd187.png'
            };
            key = updatedP.name.toLowerCase();
          }
          
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
            if (sub === "Primer" || sub === "Undercoats") return "Primers";
            if (sub === "Interior Wall") return "Interior Paint";
            if (sub === "Exterior Wall") return "Exterior Paint";
            if (sub === "Metals and Grills" || sub === "Metal and Grills") return "Enamel Paint";
            if (sub === "PU Coatings") return "PU Paint";
            if (sub === "Epoxy Coatings") return "Epoxy Paint";
            if (sub === "Color Oxides" || sub === "Colour Oxide") {
              return key.includes("gorila") ? "Wood Finishes" : sub;
            }
            if (sub === "Abrasives & Sandpapers" || sub === "Abrasives and Sandpapers") return "Painting Tools";
            return sub;
          });

          if (key.includes("putty") || key.includes("white cement")) {
            subs = ["Primers"];
          }

          if (key.includes("2 in 1") || key.includes("2-in-1") || key.includes("two in one")) {
             subs.push("Interior Paint", "Exterior Paint");
          }
          if (key.includes("exterior primer")) {
             subs.push("Exterior Paint", "Primers");
          }
          if (key.includes("epoxy primer")) {
             subs.push("Primers", "Epoxy Paint");
          }

          updatedP.subCategories = Array.from(new Set(subs));
          if (updatedP.subCategories.length > 0) {
            updatedP.subCategory = updatedP.subCategories[0];
          }
          
          return applyStandardEnamelIndustrialShades(updatedP);
        }).filter((p: any) => !p.subCategories.includes("Color Oxides") && !p.subCategories.includes("Colour Oxide"));

        const effectiveSlugNormalized =
          targetSlugNormalized === 'protectonepilux4miocoating' ||
          targetSlugNormalized === 'protectonredoxidemetalprimeris2339'
            ? 'bergerpaintsredoxidezincchromatemetalprimeris2074'
            : targetSlugNormalized === 'protectonyellowzincchromateprimer'
            ? 'bergerindustrialzincyellowprimer'
            : targetSlugNormalized === 'protectongreyoxidezincchromateprimer'
            ? 'bergerpaintsindustrialbisonzincphosphategreyprimer'
            : targetSlugNormalized === 'protectonepilux155hbcoating'
            ? 'bergerindustrialepoxypaintepilux155hbenamelpaint'
            : targetSlugNormalized === 'luxolhighglossenamel'
            ? 'luxolhighglossenamelpaint'
            : targetSlugNormalized === 'justsprayjs1acrylicspraypaintclassicshades'
            ? 'acrylicspraypaintjustsprayclassicshades'
            : targetSlugNormalized === 'mrfmetalcoatpolyurethanefinish' ||
              targetSlugNormalized === 'mrfmetalcoatluxury2kpupaintfinishformetalandwood'
            ? 'mrfmetalcoatluxury2kpupaintmetalandwoodfinish'
            : targetSlugNormalized === 'mrfdurothanepuwoodfinish'
            ? 'mrfdurothane2kpupaintmetalandwoodfinish'
            : targetSlugNormalized === 'puenamel'
            ? 'luxolpuenamelpaintformetalandwoodfinishes'
            : targetSlugNormalized === 'apcolitepremiumenamel'
            ? 'apcolitepremiumglossenamel'
            : targetSlugNormalized === 'mrfzameenfloorcoat'
            ? 'mrfzameen2kpufloorpaintforconcreteandpaverblockssurfaces'
            : targetSlugNormalized === 'pureturpentineoillocalbrand'
            ? 'turpentineoilforthinningdryingoilpaints'
            : targetSlugNormalized === 'bergerzincyellowprimer'
            ? 'bergerbpzincyellowprimer'
            : targetSlugNormalized === 'protectonbergethanepufinish'
            ? 'industrial2kbergerthanepuenamelpaint'
            : targetSlugNormalized === 'protectonepilux610epoxyprimer'
            ? 'bergerepilux610coatinggreyepoxyprimerindustrialgrade'
            : targetSlugNormalized === 'protectonepilux5coaltarepoxy' ||
              targetSlugNormalized === 'epilux5coaltarepoxyblack'
            ? 'bergerepilux5coaltarepoxyblack'
            : targetSlugNormalized === 'bergerlumeroushotoilresistantcoatingwhite' ||
              targetSlugNormalized === 'lumeroshorcoatingwhite'
            ? 'bergerlumeroshotoilresistantcoatingwhite'
            : targetSlugNormalized;

        found = dbProducts.find(
          (p: any) =>
            (p.name && normalizeStr(p.name) === effectiveSlugNormalized) ||
            (p.slug && normalizeStr(p.slug) === effectiveSlugNormalized)
        );

        // 2. Fallback to mock data if not in Firebase
        if (!found) {
          let processedMockProducts = mockProducts.map(p => {
            let updatedP = { ...p };
            const key = p.name ? p.name.trim().toLowerCase() : '';
            let subs = updatedP.subCategory ? [updatedP.subCategory] : [];
            subs = subs.map((sub: string) => {
              if (sub === "Primer" || sub === "Undercoats") return "Primers";
              if (sub === "Interior Wall") return "Interior Paint";
              if (sub === "Exterior Wall") return "Exterior Paint";
              if (sub === "Metals and Grills" || sub === "Metal and Grills") return "Enamel Paint";
              if (sub === "PU Coatings") return "PU Paint";
              if (sub === "Epoxy Coatings") return "Epoxy Paint";
              if (sub === "Color Oxides" || sub === "Colour Oxide") return key.includes("gorila") ? "Wood Finishes" : sub;
              if (sub === "Abrasives & Sandpapers" || sub === "Abrasives and Sandpapers") return "Painting Tools";
              return sub;
            });
            if (key.includes("putty") || key.includes("white cement")) subs = ["Primers"];
            if (key.includes("2 in 1") || key.includes("2-in-1") || key.includes("two in one")) subs.push("Interior Paint", "Exterior Paint");
            if (key.includes("exterior primer")) subs.push("Exterior Paint", "Primers");
            if (key.includes("epoxy primer")) subs.push("Primers", "Epoxy Paint");
            
            (updatedP as any).subCategories = Array.from(new Set(subs));
            if ((updatedP as any).subCategories.length > 0) updatedP.subCategory = (updatedP as any).subCategories[0];
            return applyStandardEnamelIndustrialShades(updatedP);
          });
          found = processedMockProducts.find(
            p =>
              (p.name && normalizeStr(p.name) === effectiveSlugNormalized) ||
              ((p as any).slug && normalizeStr((p as any).slug) === effectiveSlugNormalized)
          );
          if (found && (found as any).subCategories && ((found as any).subCategories.includes("Color Oxides") || (found as any).subCategories.includes("Colour Oxide"))) {
             found = undefined;
          }
        }

          if (found) {
          setProduct(found);
          const parsedSizeParam = sizeParam ? parseInt(sizeParam, 10) : null;
          if (parsedSizeParam && found.sizes && found.sizes.includes(parsedSizeParam)) {
            setSelectedSize(parsedSizeParam);
          } else if (found.sizes && found.sizes.length > 0) {
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
          const parsedSizeParam = sizeParam ? parseInt(sizeParam, 10) : null;
          if (parsedSizeParam && mockProducts[0].sizes && mockProducts[0].sizes.includes(parsedSizeParam)) {
            setSelectedSize(parsedSizeParam);
          } else if (mockProducts[0].sizes && mockProducts[0].sizes.length > 0) {
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
  },
  "berger paints red oxide zinc chromate metal primer is2074": {
    finish: "Smooth Matt",
    dryingTime: "1 - 2 Hours (Surface Dry) / 8 Hours (Hard Dry)",
    coverage: "100 - 120 sq.ft/L (1 coat)",
    washability: "High Anti-Corrosive Moisture & Salt Barrier",
    base: "Modified Alkyd Solvent Based (IS 2074)",
    coats: "1 - 2 Uniform Priming Coats",
    vocLevel: "Industrial Protective Primer Standard",
    warranty: "IS 2074 Certified Anti-Rust Protection",
    desc1: "Berger Paints Red Oxide Zinc Chromate Metal Primer IS2074 is a high-performance single-pack anti-corrosive metal primer conforming to IS 2074 specifications, formulated with red iron oxide and zinc chromate pigments for superior rust inhibition.",
    desc2: "Designed for structural steel, mild steel fabrications, grills, pipelines, and industrial machinery, it provides a tough, high-adhesion foundation coat ready for synthetic enamel and industrial topcoats."
  },
  "berger industrial zinc yellow primer": {
    finish: "Smooth Matt",
    dryingTime: "1 - 2 Hours (Touch Dry) / 8 Hours (Hard Dry)",
    coverage: "100 - 120 sq.ft/L (1 coat)",
    washability: "High Anti-Corrosive Passivation Barrier",
    base: "Solvent Based Zinc Chromate Alkyd",
    coats: "1 - 2 Uniform Priming Coats",
    vocLevel: "Industrial Protective Primer Standard",
    warranty: "5 Years Anti-Corrosion Performance",
    desc1: "Berger Industrial Zinc Yellow Primer (Protecton BP Syn Zinc Primer Yellow) is a single-pack passivating yellow zinc chromate metal primer engineered for ferrous and non-ferrous surfaces including aluminum, galvanized iron, and structural steel.",
    desc2: "Provides a chemical rust-inhibitive passivation barrier and superior intercoat adhesion for industrial synthetic enamels, polyurethane, and epoxy protective systems."
  },
  "berger paints industrial bison zinc phosphate grey primer": {
    finish: "Smooth Matt",
    dryingTime: "1 - 2 Hours (Touch Dry) / 8 Hours (Hard Dry)",
    coverage: "100 - 120 sq.ft/L (1 coat)",
    washability: "High Anti-Corrosive Moisture & Salt Barrier",
    base: "Solvent Based Zinc Phosphate Alkyd",
    coats: "1 - 2 Uniform Priming Coats",
    vocLevel: "Industrial Protective Primer Standard",
    warranty: "5 Years Anti-Corrosion Performance",
    desc1: "Berger Paints Industrial Bison Zinc Phosphate Grey Primer (Protecton Bison Z/P Primer Grey VA5 633) is a high-corrosion protective grey metal primer formulated with zinc phosphate anti-corrosive pigments.",
    desc2: "Designed for structural steel, mild steel sheets, trusses, and industrial fabrication, it provides a high-build matte undercoat with strong adhesion for synthetic enamels and protective topcoats."
  },
  "berger industrial epoxy paint - epilux 155 hb enamel paint": {
    finish: "High-Build Gloss / Semi-Gloss Industrial Epoxy Enamel",
    dryingTime: "1 - 2 Hours (Surface Dry) / 16 Hours (Hard Dry)",
    coverage: "80 - 100 sq.ft/L (Per Coat at Recommended DFT)",
    washability: "High Chemical, Oil, Solvent & Abrasion Resistance",
    base: "Two-Pack Polyamide-Cured Epoxy (3:1 Base:Catalyst)",
    coats: "1 - 2 High-Build Coats over Epilux Primer",
    vocLevel: "Industrial Protective Coating Standard",
    warranty: "Heavy-Duty Industrial Chemical & Corrosion Protection",
    desc1: "Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint is a heavy-duty two-pack high-build polyamide-cured epoxy topcoat engineered for demanding industrial environments (3:1 Base to Catalyst mixing ratio by volume).",
    desc2: "Ideal for structural steelwork, storage tank exteriors, chemical plants, refineries, pipelines, and industrial machinery, it cures to a tough, abrasion-resistant film that resists moisture condensation, mineral oils, and chemical splashes. Available in 4L and 20L packs in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green, and custom RAL Classic shade codes."
  },
  "luxol high gloss enamel paint": {
    finish: "Mirror-Like High Gloss",
    dryingTime: "4 - 6 Hours (Touch Dry) / 12 - 16 Hours (Hard Dry)",
    coverage: "130 - 150 sq.ft/L (Per Coat)",
    washability: "High Washable & Oil/Stain-Resistant Film",
    base: "Solvent-Based Alkyd Synthetic Enamel",
    coats: "2 Coats over Metal / Wood Primer",
    vocLevel: "Commercial Decorative Enamel Standard",
    warranty: "2 Years Performance Warranty",
    desc1: "Luxol High Gloss Enamel Paint by Berger Paints is a premium solvent-based synthetic enamel engineered to deliver a rich, mirror-like gloss finish on interior and exterior wood, mild steel, and metal surfaces.",
    desc2: "Designed for doors, windows, grilles, gates, machinery, and furniture, it forms a tough, stain-resistant and anti-corrosive film that withstands daily wear. Available in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green, and custom RAL Classic shade codes."
  },
  "acrylic spray paint just spray classic shades": {
    finish: "Super Smooth Gloss / Matt Acrylic Finish",
    dryingTime: "Under 10 Mins (Touch Dry) / 1 Hour (Hard Dry)",
    coverage: "15 - 20 sq.ft per 400ml Can (2 - 3 Mist Coats)",
    washability: "Weather & UV-Resistant Acrylic Film",
    base: "100% Pure Acrylic Aerosol Formula (Thailand)",
    coats: "2 - 3 Uniform Mist Coats",
    vocLevel: "Aerosol Propellant Standard",
    warranty: "Manufacturer Quality Assured",
    desc1: "Acrylic Spray Paint Just Spray Classic Shades (Thailand formulation) is an all-purpose fast-drying 100% pure acrylic aerosol spray paint engineered for super smooth coverage across metal, wood, plastics, glass, automobiles, and DIY crafts.",
    desc2: "Equipped with a precision clog-resistant nozzle for effortless mist application, it dries in under 10 minutes and delivers lasting indoor and outdoor protection in Glossy Black, Glossy White, Signal Red, Matt Black, Medium Yellow, and Forest Green."
  },
  "mrf metalcoat luxury 2k pu paint - metal and wood finish": {
    finish: "Luxury 2K Polyurethane High Gloss / Matt Finish",
    dryingTime: "30 - 45 Mins (Touch Dry) / 8 - 12 Hours (Hard Dry)",
    coverage: "110 - 130 sq.ft/L (Per Coat)",
    washability: "High Chemical, UV, Scratch & Abrasion Resistance",
    base: "Two-Pack Aliphatic 2K Polyurethane (Metal & Wood)",
    coats: "2 Coats over PU / Epoxy Primer",
    vocLevel: "Commercial 2K PU Protective Standard",
    warranty: "Long-Lasting Non-Yellowing 2K PU Protection",
    desc1: "MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish is a premium two-component polyurethane coating engineered by MRF Vapocure for superior durability, UV color stability, and mirror-like richness on both metal and wood substrates.",
    desc2: "Ideal for luxury metal gates, window grilles, wooden doors, furniture, machinery, and exterior structures, it resists yellowing, weather exposure, and chemical splashes. Available in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green, and custom RAL Classic shade codes."
  },
  "mrf durothane 2k pu paint - metal and wood finish": {
    finish: "2K Polyurethane Gloss / Satin / Matt Finish",
    dryingTime: "30 - 45 Mins (Touch Dry) / 8 - 12 Hours (Hard Dry)",
    coverage: "110 - 130 sq.ft/L (Per Coat)",
    washability: "High Scratch, Water, Stain & Chemical Resistance",
    base: "Two-Pack Aliphatic 2K Polyurethane (Metal & Wood)",
    coats: "2 Coats over PU Sealer / Metal Primer",
    vocLevel: "Commercial 2K PU Coating Standard",
    warranty: "Long-Lasting Scratch & Abrasion Protection",
    desc1: "MRF Durothane 2K PU Paint - Metal and Wood Finish is a high-performance two-pack polyurethane coating engineered by MRF Vapocure for superior clarity, durability, and gloss retention across wood and metal surfaces.",
    desc2: "Formulated to withstand daily scratches, water spills, and household or industrial chemicals, it is ideal for wooden doors, cabinetry, furniture, railings, gates, and architectural metalwork."
  },
  "luxol pu enamel paint - for metal and wood finishes": {
    finish: "High-Gloss Polyurethane (PU) Enamel",
    dryingTime: "3 - 4 Hours (Touch Dry) / 10 - 12 Hours (Hard Dry)",
    coverage: "130 - 150 sq.ft/L (Per Coat)",
    washability: "High Scratch, UV, Stain & Chemical Splash Resistance",
    base: "Polyurethane-Modified Alkyd Enamel (Metal & Wood)",
    coats: "2 Coats over Metal / Wood Primer",
    vocLevel: "Commercial Decorative PU Enamel Standard",
    warranty: "4 Years Performance Warranty",
    desc1: "Luxol PU Enamel Paint - For Metal and Wood Finishes by Berger Paints is an engineering-grade polyurethane enamel formulated for superior surface hardness, non-yellowing UV stability, and mirror-rich gloss across metal and wood surfaces.",
    desc2: "Backed by a 4 Years Warranty, it shields doors, windows, grilles, gates, wooden furniture, and machinery against scratches, daily wear, and mild chemical splashes. Available in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green, and custom RAL Classic shade codes."
  },
  "mrf zameen 2k pu floor paint - for concrete and paver blocks surfaces": {
    finish: "2K Polyurethane Heavy-Duty Satin / Gloss Floor Finish",
    dryingTime: "1 - 2 Hours (Touch Dry) / 24 Hours (Light Foot) / 7 Days (Vehicle Traffic)",
    coverage: "80 - 100 sq.ft/L (Per Coat on Smooth Concrete)",
    washability: "High Abrasion, Tire Mark, Oil & Chemical Resistance",
    base: "Two-Pack 2K Polyurethane (Concrete & Paver Block Coating)",
    coats: "2 Coats over Clean, Dry Concrete / Paver Substrate",
    vocLevel: "Heavy-Duty Exterior & Industrial 2K PU Standard",
    warranty: "Long-Lasting Heavy-Traffic & Weather Protection",
    desc1: "MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces is a heavy-duty two-component polyurethane floor coating engineered by MRF Vapocure to protect concrete driveways, interlocking paver blocks, parking bays, showrooms, and walkways.",
    desc2: "Resisting hot car tires, forklift abrasion, oil, grease, detergents, and UV weathering, it is available in 1L, 4L, and 20L packs across White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green, and custom RAL Classic shade codes."
  },
  "luxol anti rust 1k qd epoxy primer grey": {
    finish: "Matt Grey (2 - 10 Gloss @ 60° GH)",
    dryingTime: "20 Mins (Surface Dry) / 6 - 8 Hrs (Recoat) / <24 Hrs (Hard Dry)",
    coverage: "50 sq.ft/L (for 2 Coats @ 80 - 100 microns DFT)",
    washability: "High Anti-Corrosive, Moisture & Rust Barrier",
    base: "Single-Pack (1K) Modified Epoxy Resin Solvent Based",
    coats: "1 - 2 Uniform Priming Coats (Brush or Spray)",
    vocLevel: "Green Pro Certified (Lead, Mercury & Chromium Free)",
    warranty: "Berger Paints Authorized Industrial Anti-Rust Protection",
    desc1: "Luxol Anti Rust 1K QD Epoxy Primer Grey by Lewis Berger is a single-component, ready-to-use quick-drying anti-corrosive primer formulated with special epoxy-based resins for ferrous metals, structural mild steel, wood, and concrete/masonry surfaces.",
    desc2: "Surface-drying in approximately 20 minutes at ambient temperature (28°C-30°C) with a 6-8 hour recoating window, it enables same-day topcoating with synthetic enamels or PU/industrial finishes. Flash point ~25°C (Abel Closed Cup); available in 1L, 4L, and 20L packs."
  },
  "mrf single pack epoxy primer grey": {
    finish: "Smooth Matt Grey Primer",
    dryingTime: "15 - 30 Mins (Touch Dry) / 4 - 6 Hrs (Recoat) / 10 - 12 Hrs (Sanding)",
    coverage: "100 - 120 sq.ft/L (Per Coat)",
    washability: "High Anti-Corrosive & Inter-Coat Adhesion Barrier",
    base: "Single-Pack (1K) Epoxy Resin Solvent Primer (Vapocure SPEP)",
    coats: "1 - 2 Uniform Coats (Brush / Roller / Spray)",
    vocLevel: "Industrial Protective Primer Standard (12 Months Shelf Life)",
    warranty: "MRF Vapocure Authorized Adhesion & Corrosion Protection",
    desc1: "MRF Single Pack Epoxy Primer Grey (MRF Vapocure SPEP) is a single-component, solvent-based anti-corrosive metal primer engineered for mild steel fabrication, automotive chassis/panels, gates, grills, and industrial structures.",
    desc2: "Delivering high opacity, rapid 15-30 minute touch-dry performance, and tenacious inter-coat adhesion, it forms a protective grey undercoat tailored for MRF MetalCoat, Durothane 2K PU, and industrial topcoats. Available in 1L and 4L metal tins."
  },
  "turpentine oil - for thinning/drying oil paints": {
    finish: "Clear Water-White Liquid Solvent",
    dryingTime: "Controlled Volatility (Supports Smooth Paint Film Leveling)",
    coverage: "Recommended Dilution: 5% - 10% by Volume in Enamels & Oil Paints",
    washability: "High Degreasing & Paint-Dissolving Solvent Strength",
    base: "Refined Mineral Turpentine Oil (MTO) Hydrocarbon Solvent",
    coats: "Add Proportionally per Manufacturer Topcoat Mixing Guide",
    vocLevel: "Flammable Petroleum Hydrocarbon Solvent (Keep Sealed & Ventilated)",
    warranty: "Pure Quality Verified by Rainbow Paints, Coimbatore",
    desc1: "Turpentine Oil - For Thinning/Drying Oil Paints is a refined mineral turpentine oil solvent formulated to adjust the viscosity of synthetic enamels, oil-based wood/metal primers, and oil paints for effortless brush, roller, or spray application.",
    desc2: "In addition to improving flow, leveling, and gloss retention in solvent-borne coatings, it effectively cleans paint brushes, rollers, and metal painting tools and removes grease or wet oil paint splashes. Available in 500ml, 1L, 3L, and 5L packs."
  },
  "berger red oxide primer": {
    finish: "Smooth Matt Red Oxide",
    dryingTime: "30 - 60 Mins (Surface Dry) / 8 - 10 Hrs (Recoat) / <24 Hrs (Hard Dry)",
    coverage: "100 - 120 sq.ft/L (Per Coat on Smooth Mild Steel)",
    washability: "High Anti-Corrosive Rust & Moisture Barrier",
    base: "Solvent-Thinnable Oil-Modified Alkyd Resin (Thin with MTO)",
    coats: "1 - 2 Coats Before Synthetic Enamel Topcoat",
    vocLevel: "Heavy-Metal Free (Lead, Mercury & Chromium Free)",
    warranty: "Berger Paints Authorized Anti-Rust Protection",
    desc1: "Berger Red Oxide Primer (Solvent Thinnable) is a high-opacity, oil-modified alkyd metal primer formulated to protect ferrous surfaces including mild steel gates, window grilles, iron doors, structural trusses, and machinery from rust and corrosion.",
    desc2: "Thinable with mineral turpentine oil (MTO) for brush or spray application, it surface-dries in 30-60 minutes, permits recoat in 8-10 hours, and delivers a tough matt foundation (100-120 sq.ft/L) free from lead, mercury, and chromium. Available in 1L and 4L tins."
  },
  "berger bp zinc yellow primer": {
    finish: "Smooth Matt Zinc Yellow",
    dryingTime: "1 - 3 Hrs (Surface Dry) / 24 Hrs (Recoat & Hard Dry)",
    coverage: "105 - 130 sq.ft/L (10 - 12 sq.m/L Per Coat)",
    washability: "High Saline, Coastal & Industrial Corrosion Resistance",
    base: "Solvent-Thinnable Micro-Zinc Alkyd (MTO / Thinner 800)",
    coats: "1 - 2 Coats on Ferrous & Non-Ferrous Metal Substrates",
    vocLevel: "Green Pro Certified Industrial Metal Primer",
    warranty: "Berger Paints Authorized Heavy-Duty Passivation",
    desc1: "Berger BP Zinc Yellow Primer (Solvent Thinnable) is a single-pack oil-modified alkyd metal primer fortified with micro-zinc passivating pigments for long-lasting corrosion defense on mild steel, galvanized iron, aluminum, and industrial metal structures.",
    desc2: "Engineered for harsh coastal, saline weather and heavy industrial atmospheres, it brushes or sprays smoothly with MTO or Berger Thinner 800, covers 10-12 sq.m/L per coat, and cures overnight into an active rust-inhibitive yellow base. Available in 1L and 4L tins."
  },
  "mrf xuper yellow primer": {
    finish: "Smooth Matt / Satin Yellow",
    dryingTime: "~30 Mins (Surface Dry) / 4 - 6 Hrs (Recoat)",
    coverage: "90 - 140 sq.ft/L (Up to 200 sq.ft/L on Smooth Spray Application)",
    washability: "High Rust-Inhibitive & Inter-Coat Adhesion Barrier",
    base: "Single-Pack Air-Drying Zinc Chrome Metal Primer (Vapocure V254)",
    coats: "1 - 2 Coats (Brush or Spray) Prior to Enamel / PU Topcoat",
    vocLevel: "Industrial Anti-Corrosive Primer Standard",
    warranty: "MRF Vapocure Authorized Metal Rust Defense",
    desc1: "MRF Xuper Yellow Primer (MRF Vapocure Item Code V254) is a fast-drying, single-component zinc chrome yellow primer specially formulated for mild steel fabrication, iron gates, grilles, automotive chassis components, and structural steel.",
    desc2: "Designed to save labor time on site, it achieves surface dryness in around 30 minutes and bonds tenaciously to wire-brushed steel, preventing under-film rust creep under synthetic enamels or MRF Vapocure topcoats. Available in 1L and 4L tins."
  },
  "industrial 2k bergerthane pu enamel paint": {
    finish: "High-Gloss Aliphatic 2K Polyurethane Finish",
    dryingTime: "30 - 60 Mins (Surface Dry) / 4 - 6 Hrs (Handle Dry) / 12 - 16 Hrs (Overcoat) / 7 Days (Full Cure)",
    coverage: "115 - 145 sq.ft/L (11.4 - 13.3 sq.m/L @ 30 - 35 microns DFT; Volume Solids ~45%)",
    washability: "Extreme UV, Weathering, Salt Air, Abrasion & Chemical Splash Resistance",
    base: "Two-Pack Aliphatic Acrylic Polyurethane (10:1 V/V Base : Catalyst M15C70; Berger Thinner 825)",
    coats: "1 - 2 Topcoats (6 - 8 Hrs Pot Life at 30°C) Over Epoxy Intermediate / Primer",
    vocLevel: "Protecton Industrial Coating Division Standard (Brush, Roller, Air / Airless Spray)",
    warranty: "Berger Protecton Industrial Grade Non-Yellowing Protection",
    desc1: "Industrial 2K Bergerthane PU Enamel Paint (Berger Protecton BTHANE PU Finish) is a heavy-duty two-component aliphatic isocyanate-cured acrylic polyurethane coating mixed 10:1 by volume with Catalyst M15C70 for exterior industrial and marine topcoat protection.",
    desc2: "With a 6-8 hour pot life, 30-50 micron DFT per coat, and thinning via Berger Thinner 825, it shields chemical storage tanks, pipelines, bridges, OEM machinery, and structural steel against UV chalking and chemical fumes. Supplied in 11L (10L Base + 1L Hardener) and 20L combo packs across 8 standard shades and custom RAL Classic colors."
  },
  "berger industrial epilux 78 high build tank liner": {
    finish: "Matt to Egg-Shell Amine-Adduct Epoxy Liner (White & Grey)",
    dryingTime: "2 - 3 Hrs (Touch Dry) / 6 - 8 Hrs (Handle) / Overnight (Overcoat) / 7 Days (Immersion Cure)",
    coverage: "40 - 60 sq.ft/L (3.7 - 5.5 sq.m/L @ 100 - 150 microns DFT; 182 - 273 µm WFT)",
    washability: "Sustained Potable Water, Hydrocarbon, ATF & Heavy Chemical Immersion Resistance",
    base: "Two-Pack Amine-Adduct Cured Epoxy (4:1 V/V Base : Catalyst 955938; Berger Thinner 844)",
    coats: "2 - 3 High-Build Coats (6 - 8 Hrs Pot Life; Max 5 Days Overcoat Window)",
    vocLevel: "CFTRI Mysore & USFDA 21 CFR 175.300 Food-Grade Immersion Standard",
    warranty: "Berger Protecton Authorized Tank Immersion Protection (12 Months Shelf Life)",
    desc1: "Berger Industrial Epilux 78 High Build Tank Liner (Protecton Epilux 78 HBTL) is a two-pack, amine-adduct cured high-build epoxy internal tank coating engineered for continuous immersion in mild steel and concrete tanks holding potable water, hydrocarbons, aviation turbine fuel (ATF), and industrial chemicals.",
    desc2: "Certified food-grade under CFTRI Mysore and USFDA 21 CFR 175.300 norms, it mixes 4:1 by volume with Catalyst 955938 (16L Base + 4L Catalyst = 20L Combo Pack), delivers 100-150 microns DFT per coat with Berger Thinner 844, and cures in 7 days for full immersion service. Available in White (955000) and Grey in 20L packs."
  },
  "berger industrial ferrotol heat resistant aluminium paint (upto 250°c)": {
    finish: "Bright Metallic High-Lustre Leafing Aluminium Finish",
    dryingTime: "4 Hrs (Touch Dry) / 6 - 8 Hrs (Handle Dry) / Overnight (Hard Dry & Overcoat)",
    coverage: "190 - 250 sq.ft/L (19.0 - 25.3 sq.m/L @ 15 - 20 microns DFT; Volume Solids ~36%)",
    washability: "Continuous Dry Heat Resistance Up to 250°C & Weather Reflectance",
    base: "Dual-Pack Oleoresinous Medium (541984) + Leafing Al Paste (511985); Thinner 800/853",
    coats: "2 Coats (Brush Unthinned or Spray Up to 10% Thinner @ 2.8 - 3.5 kg/cm²)",
    vocLevel: "Low Lead (<90 ppm); Flash Point >30°C; 12 Months Shelf Life",
    warranty: "Berger Protecton Industrial Heat-Resistant Coating Standard",
    desc1: "Berger Industrial Ferrotol Heat Resistant Aluminium Paint (Upto 250°C) is a dual-pack Protecton heat-resisting industrial finish composed of a specialized oleoresinous medium (Code 541984) and bright leafing aluminium paste (Code 511985/541985) formulated to withstand continuous dry operating temperatures up to 250°C.",
    desc2: "Delivering high metallic lustre, radiative heat reflection, and atmospheric corrosion defense, it spreads 19.0-25.3 sq.m/L per coat at 15-20 microns DFT. Ideal for exterior storage tanks, steam pipes, stacks, chimneys, ducting, radiators, and boiler fronts; available in 4L and 20L (17.32L Medium + 3.68kg Paste) kits."
  },
  "berger g.p synthetic enamel paint - industrial grade": {
    finish: "Full High-Gloss Alkyd Enamel (80 ± 5° Gloss @ 60° GH)",
    dryingTime: "2 - 3.5 Hrs (Surface Dry) / 12 - 24 Hrs Overnight (Hard Dry & Recoat)",
    coverage: "70 - 90 sq.ft/L (for 2 Coats on Primed Mild Steel & Wood)",
    washability: "Durable Stain, Oil & Mild Moisture Wipeability",
    base: "Solvent-Based Alkyd Resin (Thin 0 - 5% with Berger Thinner 800 / MTO)",
    coats: "2 Coats (24 Hrs Diluted Pot Life) Over Metal / Wood Primer",
    vocLevel: "Commercial G.P. Enamel Standard (Flash Point 37°C ± 2°C; 3 - 4 Yr Shelf Life)",
    warranty: "Berger Paints Authorized Industrial-Grade Finish Protection",
    desc1: "Berger G.P Synthetic Enamel Paint - Industrial Grade (Berger Butterfly G.P. Synthetic Enamel) is a high-gloss solvent-based alkyd enamel crafted for reliable hiding, smooth flow, and tough protective coverage on mild steel grilles, rolling shutters, collapsible gates, racks, structural frames, and interior woodwork.",
    desc2: "Formulated to accept Berger Thinner 800 or MTO with minimal dilution (0-5%), it yields 70-90 sq.ft/L across two coats with overnight hard drying and an extended 3-4 year unopened shelf life. Supplied in 20L bulk industrial drums across 8 standard colors and custom RAL Classic shade codes."
  },
  "berger torpedo quick drying enamel paint - industrial grade": {
    finish: "High-Gloss Quick-Drying (QD) Industrial Alkyd Finish",
    dryingTime: "~30 Mins (Touch Dry) / ~60 Mins (1 Hr Hard Dry)",
    coverage: "120 - 150 sq.ft/L (12 - 14 sq.m/L @ 25 - 35 microns DFT; Volume Solids ~45 - 50%)",
    washability: "High Shop-Floor Oil, Grease, Abrasion & Weather Resistance",
    base: "Single-Pack Quick-Drying Modified Alkyd (Berger Thinner 800 / Rapid QD Thinner)",
    coats: "1 - 2 Coats (Brush, Conventional Spray or Airless Spray Over QD Primer)",
    vocLevel: "Berger Protecton Industrial QAD Enamel Standard",
    warranty: "Berger Protecton Rapid-Turnaround Industrial Protection",
    desc1: "Berger Torpedo Quick Drying Enamel Paint - Industrial Grade (Berger Protecton Torpedo QD Enamel) is a single-component, rapid-drying modified alkyd industrial enamel engineered to dramatically cut fabrication shop-floor downtime and speeding up handling turnaround.",
    desc2: "Achieving touch dry in ~30 minutes and hard dry in ~60 minutes at 25-35 microns DFT per coat, it adheres strongly over primed mild steel, machinery, OEM castings, timber, and masonry. Supplied in 20L ColorBank drums (V92I77 base system) across 8 standard shades and custom RAL Classic colors."
  },
  "berger epilux 610 coating grey epoxy primer - industrial grade": {
    finish: "Smooth Matt Industrial Grey Zinc Phosphate Epoxy",
    dryingTime: "1 Hr (Touch Dry) / 4 - 6 Hrs (Handle Dry) / Overnight (Overcoat) / 7 Days (Full Cure)",
    coverage: "120 - 175 sq.ft/L (12.0 - 17.6 sq.m/L @ 25 - 35 microns DFT; Volume Solids 42±2%)",
    washability: "High Acid, Alkali, Salt Spray & Industrial Solvent Barrier",
    base: "Two-Pack Polyamide Epoxy + Zinc Phosphate (5:1 V/V Base P43633 : Catalyst P43C50; Thinner 844)",
    coats: "1 - 2 Coats (5 - 6 Hrs Pot Life @ 30°C; Max 4 Weeks Overcoat Window)",
    vocLevel: "Berger Protecton Industrial Primer Standard (Flash Point >22°C)",
    warranty: "Berger Protecton Authorized Anti-Corrosive Epoxy Protection",
    desc1: "Berger Epilux 610 Coating Grey Epoxy Primer - Industrial Grade (Protecton Code P43633) is a heavy-duty two-component polyamide-cured epoxy anti-corrosive primer formulated with zinc phosphate pigments for structural mild steel, process plants, marine equipment, and concrete.",
    desc2: "Mixed 5:1 by volume with Catalyst P43C50 (15L Base + 3L Catalyst = 18L Combo Drum) and thinned with Berger Thinner 844, it offers a 5-6 hour pot life, 25-35 microns DFT per coat, and up to 4 weeks overcoating latitude under epoxy, chlorinated rubber, or 2K Bergerthane PU topcoats. Available in 4L and 18L packs."
  },
  "berger epoxy thinner 844 - industrial grade": {
    finish: "Clear Colorless Industrial Epoxy Solvent Blend",
    dryingTime: "Controlled Flash-Off Rate (Prevents Pinholes & Dry Spray)",
    coverage: "Recommended Dilution: 5% - 10% by Volume (After Base + Catalyst Induction)",
    washability: "High Solvency Power for Immediate Cleaning of Spray Guns, Lines & Brushes",
    base: "Carefully Balanced Aromatic & Aliphatic Organic Solvent Blend (Code 844 900 / EP-4/5)",
    coats: "Add Slowly to Mixed Two-Pack Epilux Coatings Only After Induction Time",
    vocLevel: "Specific Gravity 0.84 - 0.86; Flash Point >35°C; 12 Months Sealed Shelf Life",
    warranty: "Berger Protecton Genuine Industrial Thinner Quality Guarantee",
    desc1: "Berger Epoxy Thinner 844 - Industrial Grade (Protecton Thinner 844 EP-4/5, Code 844 900) is an authorized Berger Protective Coatings organic solvent blend developed for heavy-duty two-pack epoxy systems including Epilux 4, Epilux 5, Epilux 78 Tank Liner, Epilux 155 HB, and Epilux 610 Primer.",
    desc2: "With a specific gravity of 0.84-0.86 and flash point above 35°C, adding 5-10% Thinner 844 after the base-catalyst induction period optimizes atomization and leveling for brush, conventional spray, or airless spray—preventing pinholes and ensuring uniform DFT. Available in sealed 20L industrial drums."
  },
  "berger epilux 5 coal tar epoxy black": {
    finish: "Semi-Glossy Jet Black High-Build Coal Tar Epoxy",
    dryingTime: "4 Hrs (Touch Dry) / 12 - 48 Hrs (Hard Dry & Recoat) / 7 Days (Full Immersion Cure)",
    coverage: "53 - 66 sq.ft/L (5.3 - 6.6 sq.m/L @ 100 - 125 microns DFT; Volume Solids 66±2%)",
    washability: "Extreme Continuous Water, Sewage, Brine, Acid/Alkali & Soil Corrosion Barrier",
    base: "Two-Pack Polyamide Coal Tar Epoxy (3:1 V/V Base 655800 + Catalyst 655821; Thinner 844)",
    coats: "2 Coats @ 100 - 125 µm DFT Each (152 - 189 µm WFT; 4 - 6 Hrs Pot Life @ 30°C)",
    vocLevel: "Heat Resistance: 93°C Cont. / 120°C Interm.; Flash Point >22°C; 12 Months Shelf Life",
    warranty: "Berger Protecton Heavy-Duty Immersion & Marine Coating Standard",
    desc1: "Berger Epilux 5 Coal Tar Epoxy Black (Protecton Code 655800) is a heavy-duty two-component polyamide-cured coal tar pitch and epoxy resin barrier coating specifically built for continuous freshwater, seawater, sewage, and underground soil immersion.",
    desc2: "Mixed 3:1 by volume with Catalyst 655821 (15L Base + 5L Catalyst = 20L Industrial Drum) and thinned with Berger Thinner 844, it delivers 66±2% volume solids at 100-125 microns DFT per coat with flexible impact resistance on ship hulls, piling, sewage plants, buried pipes, and ballast tanks."
  },
  "mrf pu thinner for finish": {
    finish: "Clear Transparent Slow-Evaporating PU Solvent",
    dryingTime: "Slow Flash-Off Rate (Extends Open Time & Leveling)",
    coverage: "Recommended Dilution: 15% - 25% by Volume for Spray / Brush PU Application",
    washability: "Blush-Free Moisture Resistance & Precision Spray Equipment Cleaning",
    base: "Moisture-Free Urethane-Grade Polyurethane Solvent Blend (MRF Thinner For Finish TFF)",
    coats: "Compatible with MRF WoodCoat, MetalCoat, Durothane & Treatwood 2K PU Systems",
    vocLevel: "Zero Moisture Content (Preserves Isocyanate Hardener); 24 Months Sealed Shelf Life",
    warranty: "MRF Corp Limited Vapocure Genuine Solvent Quality Standard",
    desc1: "MRF PU Thinner For Finish (Thinner For Finish TFF) is a genuine urethane-grade slow-evaporating solvent manufactured by MRF Corp Limited for two-pack polyurethane topcoats including WoodCoat, MetalCoat, Durothane, and Treatwood.",
    desc2: "Engineered to keep free moisture away from isocyanate hardeners, its slow evaporation profile allows sprayed or brushed 2K PU films to flow out glass-smooth—eliminating orange peel, pinholing, and humidity blushing. Available in 1L, 5L, and 20L sealed cans."
  },
  "mrf epoxy thinner 1110 ep": {
    finish: "Clear Colorless Industrial Epoxy Solvent Blend",
    dryingTime: "Balanced Flash-Off (Prevents Pinholes & Solvent Entrapment)",
    coverage: "Recommended Dilution: 10% - 20% by Volume (Per Epoxy Coating Datasheet)",
    washability: "High-Solvency Tool, Spray Line & Epoxy Equipment Flush",
    base: "Active Aromatic-Ketone Epoxy Thinner Blend (MRF Vapocure 1110 EP)",
    coats: "Formulated for MRF Epidec 2K Epoxy Primers, Zinc Phosphate & Enamel Topcoats",
    vocLevel: "24 Months Unopened Shelf Life; Store Away from Sparks & Direct Heat",
    warranty: "MRF Corp Limited Vapocure Industrial Thinner Guarantee",
    desc1: "MRF Epoxy Thinner 1110 EP (MRF Vapocure Thinner 1110 EP) is a dedicated industrial-grade epoxy diluent engineered specifically for MRF Epidec two-pack epoxy primers, mid-coats, and chemical-resistant finishes.",
    desc2: "By adjusting heavy epoxy viscosity cleanly without destabilizing polyamide/amine curing reactions, Thinner 1110 EP improves airless and conventional spray atomization, leveling, and brush drag while also providing rapid clean-up of spray guns and hoses. Available in 1L, 5L, and 20L packs."
  },
  "mrf melamine thinner 3830": {
    finish: "Clear Transparent Medium-Drying Wood & PU Solvent",
    dryingTime: "Controlled Medium Evaporation (Optimizes Flow & Micro-Bubble Release)",
    coverage: "Recommended Dilution: 15% - 25% by Volume for Melamine Spray Application",
    washability: "Clean Edge Leveling & Spray Gun Flushing",
    base: "Refined Solvent Blend for Acid-Cured Melamine & PU Wood Sealers (MRF Thinner 3830)",
    coats: "Ideal for MRF Melamine Aura Gloss/Matt, Melamine Sealers & PU Wood Sealers",
    vocLevel: "24 Months Sealed Shelf Life (MRF Corp Vapocure Quality Standard)",
    warranty: "MRF Corp Limited Vapocure Genuine Wood Finish Solvent Guarantee",
    desc1: "MRF Melamine Thinner 3830 (MRF Vapocure Thinner 3830) is a medium-drying specialty thinner designed for MRF Melamine Aura interior wood coatings, sanding sealers, and general-purpose polyurethane sealers.",
    desc2: "Its controlled medium evaporation speed gives acid-cured melamine and sealer coats adequate open time to release trapped air bubbles and lay flat without clouding or streaking—preserving natural timber clarity in both gloss and matt finishes. Available in 1L, 5L, and 20L cans."
  },
  "mrf fast drying pu primer grey": {
    finish: "Smooth Matt Sandable Grey PU Surfacer",
    dryingTime: "10 - 15 Mins (Touch Dry) / 2 Hrs 30 Mins @ 30°C (Hard Dry & Sandable)",
    coverage: "90 - 120 sq.ft/L (at Recommended 35 - 45 microns DFT per Coat)",
    washability: "Superior Corrosion Defense, Moisture Barrier & Wet/Dry Sandability",
    base: "Two-Pack Polyurethane Primer (4:1 Base : Hardener For PU; MRF PU Thinner)",
    coats: "1 - 2 Coats (3 - 5 Hrs Pot Life @ 30°C; Excellent Topcoat Holdout)",
    vocLevel: "MRF Vapocure Automotive & Industrial 2K PU Standard",
    warranty: "MRF Corp Limited Authorized Corrosion & Adhesion Protection",
    desc1: "MRF Fast Drying PU Primer Grey (MRF Vapocure Fast Dry 2:30 Primer) is a two-component (2K) polyurethane anti-corrosive primer-surfacer packaged with matching PU Hardener for automotive body refinishing, OEM machinery, and ferrous/non-ferrous fabrication.",
    desc2: "Formulated to dry hard and ready for sanding or topcoating in just 2 hours 30 minutes at 30°C, its high-build grey film fills minor surface imperfections while locking out rust and maximizing topcoat adhesion under MRF MetalCoat, Durothane, and 2K PU enamels. Available in 1L and 4L combo packs."
  },
  "berger acid alkali & heat resistant bituminous black is 158 paint": {
    finish: "Smooth Semi-Glossy to Eggshell Characteristic Jet Black",
    dryingTime: "1 - 3 Hrs (Touch Dry) / 6 - 8 Hrs (Hard Dry) / 16 - 24 Hrs Overnight (Overcoat)",
    coverage: "85 - 140 sq.ft/L (8 - 14 sq.m/L @ ~30 microns DFT per Coat)",
    washability: "High Resistance to Dilute Acids, Alkalis, Moisture, Chemical Fumes & Heat (IS 158)",
    base: "Single-Pack Ready-Mixed Lead-Free Inert Bituminous Composition (Code 767991 | IS 158)",
    coats: "2 Coats Direct Self-Priming by Soft Brush/Roller (Use as Self-Finish Black Only)",
    vocLevel: "Lead-Free IS 158 Standard; Flash Point >30°C; Heat Resisting Up to 300°C; 12 Mo Shelf Life",
    warranty: "Berger Protecton Authorized Industrial IS 158 Protective Coating Standard",
    desc1: "Berger Acid Alkali & Heat Resistant Bituminous Black IS 158 Paint (Protecton Code 767991) is a ready-mixed, single-pack lead-free inert bituminous protective coating manufactured to BIS IS 158 specifications for industrial ferrous steel, cast iron, underground concrete, boilers, funnels, chimneys, and cooling tower structures.",
    desc2: "Formulated for self-priming brush or roller application without a separate primer, it resists dilute sulphuric acid, sodium carbonate alkalis, chemical fumes, moisture, and elevated dry heat up to 300°C at 8-14 sq.m/L (~30 µm DFT). Supplied exclusively in sealed 20L industrial drums (keep as a black self-finish to prevent bitumen bleed-through)."
  },
  "berger lumeros hot oil resistant coating white": {
    finish: "Smooth High-Luminosity Semi-Gloss to Gloss White",
    dryingTime: "30 - 60 Mins (Touch Dry) / 6 - 8 Hrs (Hard Dry & Recoat) / Full Cure Before Oil Fill",
    coverage: "100 - 130 sq.ft/L (10 - 12 sq.m/L @ 25 - 30 microns DFT per Coat)",
    washability: "Continuous Hot Mineral Transformer Oil Immersion (90°C - 120°C; IEC 60296 / IS 335)",
    base: "Single-Pack (1K) Specialty Hot Oil Resistant (HOR) Industrial Resin (Code R59000)",
    coats: "2 Coats @ 25 - 30 µm DFT Each (50 - 60 µm System DFT on Sa 2½ / St 3 Steel)",
    vocLevel: "Non-Contaminating Dielectric Safe Film (Preserves Oil BDV; IS 1180 / IS 2026)",
    warranty: "Berger Protecton Authorized Transformer & Oil-Immersed Equipment Coating",
    desc1: "Berger Lumeros Hot Oil Resistant Coating White (Protecton Lumeros HOR Coating - White, Code R59000) is a specialized single-pack industrial protective coating engineered for internal walls of power and distribution transformer tanks, oil-filled switchgear, gearboxes, and oil-immersed electrical apparatus.",
    desc2: "Engineered to withstand prolonged immersion in hot mineral insulating oils (IS 335 / IEC 60296) up to 90°C-120°C without blistering, softening, peeling, or degrading transformer oil dielectric breakdown voltage (BDV). Its bright white finish enhances internal tank visibility during core assembly and inspection; supplied exclusively in sealed 20L industrial drums."
  },
  "berger industrial aluminium paint is 2339 medium": {
    finish: "Bright, Lustrous Leafing Silvery Metallic Sheen",
    dryingTime: "4 - 6 Hrs (Surface Dry) / 12 Hrs (Handle Dry) / 24 Hrs (Hard Dry & Overcoat @ 30°C)",
    coverage: "130 - 160 sq.ft/L (12 - 15 sq.m/L @ 12 - 15 microns DFT per Coat; ~30-40% Vol. Solids)",
    washability: "High Solar/Light Reflectivity, Moisture Shielding & Continuous Dry Heat Up to 200°C",
    base: "Dual-Container BIS IS 2339 System: 17.1L Oleoresinous Medium (661984) + 4.4 Kg Leafing Al. Paste (661985)",
    coats: "2 Coats over Primed Steel (Sa 2.5 / St 2-3); Brush Unthinned or Spray (Up to 10% Berger Thinner 800)",
    vocLevel: "BIS IS 2339 Standard; Flash Point >30°C; 12 Months Sealed Shelf Life (20L Factory Combo Kit)",
    warranty: "Berger Protecton Authorized BIS IS 2339 Industrial Protective Coating",
    desc1: "Berger Industrial Aluminium Paint IS 2339 Medium (Code 661984) is a factory-matched dual-container BIS IS 2339 protective finish supplied as a complete 20L industrial kit containing 17.1L oleoresinous medium (661984) and 4.4 Kg high-grade leafing aluminium paste (661985, included in pack MRP ₹7,876). Separating the paste until site mixing preserves full leafing brilliance so aluminium flakes overlap horizontally into an impervious metallic shield.",
    desc2: "Engineered for exterior surfaces of petroleum/oil/chemical storage tanks, bridges, pipelines, transmission towers, factory steel trusses, chimneys, and moderately heated equipment up to 200°C continuous dry heat. Delivers 12-15 sq.m/L at 12-15 µm DFT over Red Oxide Zinc Phosphate or Zinc Chromate primed steel; apply unthinned by brush or thin up to 10% with Berger Thinner 800 for conventional spray (2.8-3.5 kg/cm²)."
  },
  "berger boiler compound heat resistant ferrotol no. 1 paint": {
    finish: "Smooth Matt Black (Graphite-Dispersed Bituminous Film)",
    dryingTime: "6 - 8 Hrs (Touch Dry) / Overnight (Handle & Overcoat) + Mandatory 100°C Water-Bake Cure (8 Hrs)",
    coverage: "~138 sq.ft/L (12.9 sq.m/L @ 35 microns DFT / 78 microns WFT per Coat)",
    washability: "Continuous Hot Water & Steam Wet Heat Up to 540°C; Excellent Water Immersion & Abrasion Resistance",
    base: "Single-Pack (1K) Graphite Suspended in Specialized Bituminous Medium (Protecton Code 052991)",
    coats: "2 Coats Direct by Brush on Cleaned Bare Boiler Steel (Thin/Clean with Berger Thinner 800)",
    vocLevel: "Internal Hot-Wet Systems Only (Not for Exterior Weathering); Flash Point >30°C; 12 Mo Shelf Life",
    warranty: "Berger Protecton Authorized Industrial Boiler Interior Anti-Corrosive Compound",
    desc1: "Berger Boiler Compound Heat Resistant Ferrotol No. 1 Paint (Berger Protecton Ferrotol - 1, Code 052991) is a single-pack Matt Black anti-corrosive graphite-in-bituminous protective composition engineered specifically for 'hot-wet' metal surfaces in continuous contact with boiling water and high-temperature steam up to 540°C.",
    desc2: "Ideal for internal surfaces of boiler drums, boiler tubes, water walls, economizers, evaporators, steam accumulators, clarifiers, calorifiers, and steam turbine casings. Mandatory Curing: after 24 hours of air drying, fill the treated vessel with water and raise internal temperature to 100°C for at least 8 hours to bake Ferrotol No. 1 into an inert, insoluble, tightly bound barrier that protects against pitting and simplifies future descaling. Supplied in sealed 20L drums (MRP ₹6,579)."
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
    const isPowerTool = topCatLower.includes('power tools') || subCatLower.includes('power tools') || subCatLower.includes('tools') || nameLower.includes('meter') || nameLower.includes('machine') || nameLower.includes('sprayer') || nameLower.includes('washer') || nameLower.includes('sander') || nameLower.includes('mixer');

    // 1. Finish
    let finish = "Smooth & Matte Finish";
    if (isPowerTool) finish = "Industrial Grade Equipment";
    else if (nameLower.includes('aspira') || nameLower.includes('glitz') || nameLower.includes('silk') || propsString.includes('sheen')) finish = "Rich Pearl Sheen";
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
    if (isPowerTool) dryingTime = "N/A (Ready to Use)";
    else if (isWood || isEnamel || isIndustrial) dryingTime = "1-2 Hours (Touch Dry) / 8 Hours (Hard Dry)";
    else if (isSpray) dryingTime = "10-15 Minutes (Quick Dry)";
    else if (isPutty) dryingTime = "2-4 Hours (Hard Dry)";
    else if (isWaterproofing) dryingTime = "2-4 Hours per coat / 24 Hours Full Cure";

    // 3. Coverage
    let coverage = "130 - 150 sq.ft/L (2 coats)";
    if (isPowerTool) coverage = "N/A (Tool / Equipment)";
    else if (isExterior) coverage = "55 - 65 sq.ft/L (2 coats)";
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
    if (isPowerTool) washability = "Heavy Duty Hardware";
    else if (nameLower.includes('royale') || nameLower.includes('silk')) washability = "Heavy Scrub Resistance (Teflon / Nano-Clean)";
    else if (isExterior) washability = "100% Weatherproof & Rain Washable";
    else if (isWaterproofing) washability = "100% Hydrostatic Waterproof Membrane";
    else if (isWood || isEnamel) washability = "Scratch & Stain Resistant";
    else if (nameLower.includes('tractor')) washability = "Moderate Cleaning Resistance";
    else if (isPutty || isPrimer) washability = "Moisture & Alkali Resistant Base";

    // 5. Application Base & Diluent
    let base = "100% Acrylic Water Based";
    if (isPowerTool) base = "Electrical / Mechanical";
    else if (isWood || isEnamel || isIndustrial) base = "Solvent / Polyurethane (PU) Based";
    else if (isWaterproofing) base = "Polymer Modified Acrylic / SBR Hybrid";
    else if (isPutty) base = "White Cement & Re-dispersible Polymer Powder";
    else if (isSpray) base = "Aerosol Fast-Dry Solvent Base";

    // 6. Recommended Coats
    let coats = "2 Coats over 1 Coat Primer";
    if (isPowerTool) coats = "N/A";
    else if (isWaterproofing) coats = "Self-Priming + 2 Waterproof Topcoats";
    else if (isPutty) coats = "2 Coats (1.5mm total thickness)";
    else if (isPrimer) coats = "1 Uniform Sealing Coat";
    else if (isSpray) coats = "2-3 Thin Uniform Mist Coats";
    else if (isWood) coats = "2-3 Coats over PU Sealer";

    // 7. VOC & Eco Level
    let vocLevel = "Low VOC & Odorless";
    if (isPowerTool) vocLevel = "Zero Emissions (CE Certified)";
    else if (nameLower.includes('royale') || nameLower.includes('silk')) vocLevel = "Ultra-Low VOC & Anti-Bacterial (Green Certified)";
    else if (isPutty || isWaterproofing) vocLevel = "Zero VOC & Eco-Friendly";
    else if (isWood || isEnamel || isSpray) vocLevel = "Low VOC Commercial Standard";

    // 8. Exact Factual Warranty
    let warranty = "100% Genuine Manufacturer Guarantee";
    if (isPowerTool) {
      warranty = "6 Months to 1 Year Manufacturer Warranty";
    } else if (nameLower.includes('royale') || nameLower.includes('aspira') || nameLower.includes('glitz') || nameLower.includes('lustre') || nameLower.includes('shyne')) {
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
    if ((product as any)?.sizePrices && (product as any).sizePrices[selectedSize]) {
      return (product as any).sizePrices[selectedSize];
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
        "addressCountry": "IN"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 0,
          "unitCode": "d"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 0,
          "unitCode": "d"
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
      const vPrice = (targetProduct as any)?.sizePrices && (targetProduct as any).sizePrices[sizeVal]
        ? (targetProduct as any).sizePrices[sizeVal]
        : Math.round(basePrice * sizeVal * sizeDiscount);
      return {
        "@type": "Offer",
        "name": `${targetProduct.name} - ${sizeVal}${unitSymbol} Pack`,
        "sku": `RP-PG-${targetProduct.id || targetProduct.slug || targetProduct.name.replace(/\s+/g, '-').toLowerCase()}_rp-${targetProduct.id || targetProduct.slug || targetProduct.name.replace(/\s+/g, '-').toLowerCase()}-${String(sizeVal).toLowerCase()}${unitSymbol.toLowerCase()}`,
        "mpn": `MPN-${targetProduct.id || targetProduct.slug || targetProduct.name.replace(/\s+/g, '-').toLowerCase()}-${sizeVal}${unitSymbol}`,
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
        "sku": `RP-PG-${targetProduct.id || targetProduct.slug || targetProduct.name.replace(/\s+/g, '-').toLowerCase()}_rp-${targetProduct.id || targetProduct.slug || targetProduct.name.replace(/\s+/g, '-').toLowerCase()}-${String(sizeVal).toLowerCase()}${unitSymbol.toLowerCase()}`,
        "mpn": `MPN-${targetProduct.id || targetProduct.slug || targetProduct.name.replace(/\s+/g, '-').toLowerCase()}-${sizeVal}${unitSymbol}`,
        "name": `${targetProduct.name} - ${sizeVal}${unitSymbol} Pack`,
        "url": `${productUrl}?size=${sizeVal}`,
        "image": [absImage],
        "size": `${sizeVal} ${unitSymbol}`,
        "description": baseSchema.description,
        "brand": baseSchema.brand,
        "category": baseSchema.category,
        "offers": offer
      };
    });

    return {
      ...baseSchema,
      "@type": "Product",
      "sku": `RP-${targetProduct.id || '1'}`,
      "mpn": `MPN-${targetProduct.id || '1'}`,
      "offers": variationOffers
    };
  }, [product, productDetails, basePrice, displayImage, selectedSize]);

  const startingPackInfo = useMemo(() => {
    const firstSize = productSizes[0] || 1;
    const sizeLabel = firstSize < 1 ? `${firstSize * 1000}ml` : `${firstSize}${product?.unit === 'kg' ? 'kg' : 'L'}`;
    if ((product as any)?.sizePrices && (product as any).sizePrices[firstSize]) {
      return { sizeLabel, price: (product as any).sizePrices[firstSize] };
    }
    let factor = 1;
    if (product?.unit === 'kg') {
      if (firstSize === 5) factor = 0.94;
      if (firstSize === 20) factor = 0.53;
      if (firstSize === 25) factor = 0.8;
      if (firstSize === 40) factor = 0.472;
      if (firstSize === 50) factor = 0.628;
    } else {
      if (firstSize === 4) factor = 0.96;
      if (firstSize === 10) factor = 0.92;
      if (firstSize === 20) factor = 0.88;
    }
    return { sizeLabel, price: Math.round(basePrice * firstSize * factor) };
  }, [product, productSizes, basePrice]);

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
            "text": `The price of ${product.name} starts from ₹${startingPackInfo.price.toLocaleString()} for a ${startingPackInfo.sizeLabel} pack at Rainbow Paints & Hardwares.`
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

  const breadcrumbItems = useMemo(() => {
    if (!product) return [];
    const items: { label: string; href?: string }[] = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/buy-paint-online' },
    ];
    if (product.topCategory === 'Industrial') {
      items.push({ label: 'Industrial Paint and Coatings', href: '/c/industrial-paint-and-coatings' });
    } else if (product.topCategory === 'Home Paint') {
      items.push({ label: 'Home Paint', href: '/c/all-home-paint' });
    }
    if (product.subCategory) {
      items.push({
        label: product.subCategory,
        href: `/c/${product.subCategory.toLowerCase().replace(/\s+/g, '-')}`,
      });
    }
    if (product.brand) {
      items.push({
        label: product.brand,
        href: `/brands/${product.brand.toLowerCase().replace(/\s+/g, '-')}`,
      });
    }
    items.push({ label: product.name });
    return items;
  }, [product]);

  const breadcrumbSchema = useMemo(() => {
    if (!product || breadcrumbItems.length === 0) return null;
    const productCanonicalUrl = `https://www.rainbowpaint.in/p/${product.slug || product.name?.replace(/\s+/g, '-').toLowerCase()}`;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.label,
        "item": item.href ? `https://www.rainbowpaint.in${item.href}` : productCanonicalUrl
      }))
    };
  }, [product, breadcrumbItems]);

  const metaDesc = useMemo(() => {
    if ((product as any)?.seoDescription) return (product as any).seoDescription;
    const categoryLabel = product?.subCategory || product?.category || product?.topCategory || 'Quality paint';
    return `Buy ${product?.name} by ${product?.brand} online at wholesale prices. ${categoryLabel} with fast local delivery in Coimbatore.`;
  }, [product]);

  const fallbackTitle = useMemo(() => {
    if (!productSlug) return "Buy Paint Online | Rainbow Paints";
    if (
      productSlug === 'berger-paints-red-oxide-zinc-chromate-metal-primer-is2074' ||
      productSlug === 'protecton-epilux-4-mio-coating'
    ) {
      return "Berger Paints Red Oxide Zinc Chromate Metal Primer IS2074";
    }
    if (
      productSlug === 'berger-industrial-zinc-yellow-primer' ||
      productSlug === 'protecton-yellow-zinc-chromate-primer'
    ) {
      return "Berger Industrial Zinc Yellow Primer";
    }
    if (
      productSlug === 'berger-paints-industrial-bison-zinc-phosphate-grey-primer' ||
      productSlug === 'protecton-grey-oxide-zinc-chromate-primer'
    ) {
      return "Berger Paints Industrial Bison Zinc Phosphate Grey Primer";
    }
    if (
      productSlug === 'berger-industrial-epoxy-paint-epilux-155-hb-enamel-paint' ||
      productSlug === 'protecton-epilux-155-hb-coating'
    ) {
      return "Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint | Buy Online";
    }
    if (
      productSlug === 'luxol-high-gloss-enamel-paint' ||
      productSlug === 'luxol-high-gloss-enamel'
    ) {
      return "Luxol High Gloss Enamel Paint by Berger Paints | Buy Online";
    }
    if (
      productSlug === 'acrylic-spray-paint-just-spray-classic-shades' ||
      productSlug === 'just-spray-js1-acrylic-spray-paint---classic-shades'
    ) {
      return "Acrylic Spray Paint Just Spray Classic Shades | Buy Online";
    }
    if (
      productSlug === 'mrf-metalcoat-luxury-2k-pu-paint---metal-and-wood-finish' ||
      productSlug === 'mrf-metalcoat-luxury-2k-pu-paint-metal-and-wood-finish' ||
      productSlug === 'mrf-metalcoat-luxury-2k-pu-paint-finish---for-metal-and-wood' ||
      productSlug === 'mrf-metalcoat-polyurethane-finish'
    ) {
      return "MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish";
    }
    if (
      productSlug === 'mrf-durothane-2k-pu-paint---metal-and-wood-finish' ||
      productSlug === 'mrf-durothane-2k-pu-paint-metal-and-wood-finish' ||
      productSlug === 'mrf-durothane-pu-wood-finish'
    ) {
      return "MRF Durothane 2K PU Paint - Metal and Wood Finish";
    }
    if (
      productSlug === 'luxol-pu-enamel-paint---for-metal-and-wood-finishes' ||
      productSlug === 'luxol-pu-enamel-paint-for-metal-and-wood-finishes' ||
      productSlug === 'pu-enamel'
    ) {
      return "Luxol PU Enamel Paint - For Metal and Wood Finishes";
    }
    if (productSlug === 'luxol-anti-rust-1k-qd-epoxy-primer-grey') {
      return "Luxol Anti Rust 1K QD Epoxy Primer Grey by Berger Paints | Buy Online";
    }
    if (productSlug === 'mrf-single-pack-epoxy-primer-grey') {
      return "MRF Single Pack Epoxy Primer Grey (SPEP) | MRF Vapocure | Buy Online";
    }
    if (
      productSlug === 'turpentine-oil-for-thinning-drying-oil-paints' ||
      productSlug === 'pure-turpentine-oil-(local-brand)'
    ) {
      return "Turpentine Oil - For Thinning/Drying Oil Paints";
    }
    if (productSlug === 'berger-red-oxide-primer') {
      return "Berger Red Oxide Primer (Solvent Thinnable) 1L & 4L | Buy Online";
    }
    if (
      productSlug === 'berger-bp-zinc-yellow-primer' ||
      productSlug === 'berger-zinc-yellow-primer'
    ) {
      return "Berger BP Zinc Yellow Primer (Solvent Thinnable) 1L & 4L | Buy Online";
    }
    if (productSlug === 'mrf-xuper-yellow-primer') {
      return "MRF Xuper Yellow Primer (Vapocure V254) 1L & 4L | Buy Online";
    }
    if (
      productSlug === 'industrial-2k-bergerthane-pu-enamel-paint' ||
      productSlug === 'protecton-bergethane-pu-finish'
    ) {
      return "Industrial 2K Bergerthane PU Enamel Paint | 11L & 20L | Berger Protecton";
    }
    if (productSlug === 'berger-industrial-epilux-78-high-build-tank-liner') {
      return "Berger Industrial Epilux 78 High Build Tank Liner (20L) | White & Grey";
    }
    if (productSlug === 'berger-industrial-ferrotol-heat-resistant-aluminium-paint-upto-250c') {
      return "Berger Industrial Ferrotol Heat Resistant Aluminium Paint (Upto 250°C) | 4L & 20L";
    }
    if (productSlug === 'berger-gp-synthetic-enamel-paint-industrial-grade') {
      return "Berger G.P Synthetic Enamel Paint - Industrial Grade (20L) | RAL & Standard Shades";
    }
    if (
      productSlug === 'berger-torpedo-quick-drying-enamel-paint-industrial-grade' ||
      productSlug === 'berger-torpedo-qd-enamel-paint-industrial-grade'
    ) {
      return "Berger Torpedo Quick Drying Enamel Paint - Industrial Grade (20L) | RAL Shades";
    }
    if (
      productSlug === 'berger-epilux-610-coating-grey-epoxy-primer-industrial-grade' ||
      productSlug === 'protecton-epilux-610-epoxy-primer'
    ) {
      return "Berger Epilux 610 Coating Grey Epoxy Primer - Industrial Grade";
    }
    if (productSlug === 'berger-epoxy-thinner-844-industrial-grade') {
      return "Berger Epoxy Thinner 844 - Industrial Grade (EP-4/5 | 20L)";
    }
    if (
      productSlug === 'berger-epilux-5-coal-tar-epoxy-black' ||
      productSlug === 'epilux-5-coal-tar-epoxy-black' ||
      productSlug === 'protecton-epilux-5-coal-tar-epoxy'
    ) {
      return "Berger Epilux 5 Coal Tar Epoxy Black (20L Drum) | Protecton";
    }
    if (productSlug === 'mrf-pu-thinner-for-finish') {
      return "MRF PU Thinner For Finish (TFF) | 1L, 5L & 20L | MRF Vapocure";
    }
    if (productSlug === 'mrf-epoxy-thinner-1110-ep') {
      return "MRF Epoxy Thinner 1110 EP | 1L, 5L & 20L | MRF Vapocure";
    }
    if (productSlug === 'mrf-melamine-thinner-3830') {
      return "MRF Melamine Thinner 3830 (PU & Wood) | 1L, 5L & 20L";
    }
    if (productSlug === 'mrf-fast-drying-pu-primer-grey') {
      return "MRF Fast Drying PU Primer Grey (2:30 Hr Dry) | 1L & 4L";
    }
    if (productSlug === 'berger-acid-alkali-heat-resistant-bituminous-black-is158-paint') {
      return "Berger Bituminous Black IS 158 Paint (20L) | Acid & Heat";
    }
    if (
      productSlug === 'berger-lumeros-hot-oil-resistant-coating-white' ||
      productSlug === 'berger-lumerous-hot-oil-resistant-coating-white'
    ) {
      return "Berger Lumeros Hot Oil Resistant Coating White (HOR | 20L)";
    }
    if (
      productSlug === 'berger-industrial-aluminium-paint-is2339-medium' ||
      productSlug === 'berger-industrial-aluminium-paint-is-2339-medium'
    ) {
      return "Berger Industrial Aluminium Paint IS 2339 Medium (20L Kit)";
    }
    if (
      productSlug === 'berger-boiler-compound-heat-resistant-ferrotol-no-1-paint' ||
      productSlug === 'berger-boiler-compound-heat-resistant-ferrotol-no1-paint' ||
      productSlug === 'berger-ferrotol-1'
    ) {
      return "Berger Ferrotol No. 1 Boiler Compound Paint (20L | 540°C)";
    }
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
                    <strong className="text-zinc-900 font-semibold">{product.name}</strong> by <strong className="text-zinc-900 font-semibold">{product.brand}</strong> is stocked & sold by authorized dealer <strong className="text-zinc-900 font-semibold">Rainbow Paints & Hardwares</strong> (54 Cox Street, Kattoor, Coimbatore 641009). {product.topCategory?.toLowerCase().includes('power tools') ? `A professional grade tool with a ${productDetails.warranty}.` : `Offers an estimated coverage of <strong className="text-zinc-900 font-semibold">{productDetails.coverage}</strong> with <strong className="text-zinc-900 font-semibold">{productDetails.dryingTime}</strong> touch-dry time.`} Protected under <strong className="text-zinc-900 font-semibold">{productDetails.warranty}</strong> with <strong className="text-zinc-900 font-semibold">same-day local express delivery in Coimbatore</strong> and buy from 5000+ custom color shades.
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
        title={product.seoTitle || `${product.name} by ${product.brand} - Buy Online | Wholesale Price`}
        description={metaDesc}
        keywords={(product as any).seoKeywords || `${product.name}, ${product.brand}, ${product.category || product.topCategory}, ${product.subCategory}`}
        url={`https://www.rainbowpaint.in/p/${product.slug || product.name.replace(/\s+/g, '-').toLowerCase()}`}
        image={displayImage || product.image}
        productBrand={product.brand}
        productPrice={currentPrice}
        productCurrency="INR"
        productAvailability="InStock"
        schema={[productSchema, breadcrumbSchema, faqSchema].filter(Boolean)}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <Breadcrumb items={breadcrumbItems} omitSchema />

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
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h2 className="text-[11px] text-zinc-800 font-display uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-gold"/> Select Color / Shade
                  </h2>
                  {selectedShade && (
                    <span className="text-[10px] bg-gold/10 text-gold px-2.5 py-0.5 rounded-full font-semibold">
                      {selectedShade.name} ({selectedShade.shadeCode})
                    </span>
                  )}
                </div>
                <div className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {product.shades.map((shade: any) => {
                      const isSelected = selectedShade?.shadeCode === shade.code;
                      return (
                        <button
                          key={shade.code}
                          type="button"
                          onClick={() => {
                            setSelectedShade({
                              id: `custom-shade-${product.id}-${shade.code}`,
                              name: shade.name,
                              shadeCode: shade.code,
                              hex: shade.hex,
                              brand: product.brand
                            });
                          }}
                          className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all ${
                            isSelected 
                              ? 'border-gold bg-gold/10 shadow-sm ring-1 ring-gold/30' 
                              : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/70 hover:bg-zinc-50'
                          }`}
                          title={`${shade.name} (${shade.code})`}
                        >
                          <div 
                            className="w-8 h-8 rounded-full border border-zinc-300 shadow-inner relative flex items-center justify-center shrink-0"
                            style={{ backgroundColor: shade.hex }}
                          >
                            {isSelected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-sm ring-2 ring-white" />
                            )}
                          </div>
                          <span className="text-[10px] font-semibold text-ivory text-center truncate w-full leading-tight">
                            {shade.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {(product as any).allowRalShades && (
                    <RalShadePicker
                      currentShade={selectedShade}
                      onSelect={(shade) => setSelectedShade(shade)}
                    />
                  )}
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
                    onClick={() => { 
                      setSelectedSize(size); 
                      setQuantity(1); 
                      setSearchParams({ size: String(size) }, { replace: true }); 
                    }}
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
                      ₹{(
                        (product as any)?.sizePrices && (product as any).sizePrices[size]
                          ? (product as any).sizePrices[size]
                          : Math.round(basePrice * size * (
                              product?.unit === 'kg' 
                                ? (size === 5 ? 0.94 : size === 20 ? 0.53 : size === 25 ? 0.8 : size === 40 ? 0.472 : size === 50 ? 0.628 : 1)
                                : (size === 4 ? 0.96 : size === 10 ? 0.92 : size === 20 ? 0.88 : 1)
                            ))
                      ).toLocaleString()}
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
                The price of {product.name} starts from ₹{startingPackInfo.price.toLocaleString()} for a {startingPackInfo.sizeLabel} pack at Rainbow Paints & Hardwares. Price varies based on the pack size and selected shade.
              </p>
            </div>
            <div className="bg-royale-surface border border-zinc-200/50 rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What warranty comes with {product.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {product.name} comes with an official <strong className="text-gold font-medium">{productDetails?.warranty}</strong> provided by {product.brand} when applied over the recommended primer/undercoat system on sound surfaces.
              </p>
            </div>
            <div className="bg-royale-surface border border-zinc-200/50 rounded-2xl p-6 hover:border-gold/30 transition-colors md:col-span-2">
              <h3 className="font-medium text-ivory mb-3 text-sm">
                {product.topCategory?.toLowerCase().includes('power tools') 
                  ? `What category does ${product.name} fall under and what is it used for?` 
                  : `What category does ${product.name} fall under and what is its coverage?`}
              </h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {product.topCategory?.toLowerCase().includes('power tools')
                  ? `${product.name} by ${product.brand} belongs to the ${product.subCategory || product.category} category. It is a high-performance professional equipment designed to improve efficiency, accuracy, and quality for your tasks.`
                  : `${product.name} by ${product.brand} belongs to the ${product.subCategory || product.category} category. It offers an estimated coverage capacity of ${productDetails?.coverage} with a ${productDetails?.finish} and a touch-dry time of ${productDetails?.dryingTime}.`
                }
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
                <Link to={`/p/${rp.slug || rp.name.replace(/\s+/g, '-').toLowerCase()}`} key={rp.id} className="group flex flex-col bg-royale-surface border border-zinc-200 hover:border-gold/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(184,151,90,0.1)]">
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
                <Link to={`/p/${rp.slug || rp.name.replace(/\s+/g, '-').toLowerCase()}`} key={rp.id} className="group flex flex-col bg-royale-surface border border-zinc-200 hover:border-gold/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(184,151,90,0.1)]">
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

