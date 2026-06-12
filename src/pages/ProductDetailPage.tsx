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

  useEffect(() => {
    if (isPaint && product) {
      const def = DEFAULT_WHITES[product.brand] || DEFAULT_WHITES.default;
      setSelectedShade({
        id: `default-${product.brand}-${def.code}`,
        name: def.name,
        shadeCode: def.code,
        hex: def.hex,
        brand: product.brand
      });
    }
  }, [isPaint, product]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      window.scrollTo(0, 0);
      try {
        const decodedSlug = productSlug?.replace(/-/g, ' ').toLowerCase();
        let found: any = null;

        // 1. Fetch from Firebase and find a case-insensitive match
        const snapshot = await getDocs(collection(db, 'products'));
        const dbProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        found = dbProducts.find((p: any) => p.name?.toLowerCase() === decodedSlug);

        // 2. Fallback to mock data if not in Firebase
        if (!found) {
          found = mockProducts.find(p => p.name.toLowerCase() === decodedSlug);
        }

        if (found) {
          setProduct(found);
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
        image: product.image,
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

  const productDetails = useMemo(() => {
    if (!product) return null;
    
    const isInterior = product.subCategory?.includes('Interior');
    const isExterior = product.subCategory?.includes('Exterior');
    const isWood = product.subCategory?.includes('Wood') || product.topCategory?.includes('Wood');
    const isWaterproofing = product.subCategory?.includes('Waterproofing') || product.topCategory?.includes('Waterproofing');
    
    let finish = "Smooth & Matte";
    let dryingTime = "30-45 Minutes";
    let coverage = "120-140 sq.ft/L (2 coats)";
    let washability = "Medium";
    let base = "Water Based";
    let warranty = isExterior ? "7-10 Years" : "As per brand terms";
    
    const propsString = (product.properties?.join(" ") || "").toLowerCase();
    const nameString = (product.name || "").toLowerCase();
    
    if (propsString.includes('sheen') || nameString.includes('shyne') || nameString.includes('glamor') || nameString.includes('glitz') || nameString.includes('luxury')) finish = "Rich Sheen";
    if (propsString.includes('gloss') || nameString.includes('enamel')) finish = "High Gloss";
    if (propsString.includes('silk') || nameString.includes('satin')) finish = "Smooth Satin";
    
    if (isExterior) {
       washability = "Excellent / Weatherproof";
       coverage = "50-60 sq.ft/L (2 coats)";
    }
    if (isWood) {
       dryingTime = "2-4 Hours";
       base = "Solvent / PU Based";
       washability = "High";
    }
    if (isWaterproofing) {
       finish = "Protective Film";
       washability = "Excellent";
       coverage = "Depends on porosity";
    }
    
    if (nameString.includes('enamel') || nameString.includes('pu') || nameString.includes('epoxy')) {
       base = "Solvent Based";
       dryingTime = "4-6 Hours";
    }
    
    // We don't have brandDetails imported here, so we will generate a matching description
    const desc1 = product.description || `Discover the ultimate finish and durability with ${product.name}, a premium offering from ${product.brand}. This ${product.subCategory || 'high-quality paint'} is engineered for both professional contractors and DIY enthusiasts, delivering exceptional coverage and long-lasting protection for your spaces.`;
    const desc2 = `Enhance your living space with this advanced formula that resists fading and stands up to daily wear and tear. Application is smooth, leaving a luxurious texture that revitalizes surfaces.`;

    return { finish, dryingTime, coverage, washability, base, warranty, desc1, desc2 };
  }, [product]);

  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === 'number') return priceVal;
    if (typeof priceVal === 'string') return parseFloat(priceVal.replace(/[^0-9.]/g, '')) || 850;
    return 850;
  };
  const basePrice = product ? parsePrice(product.price) : 850;
  
  let discountFactor = 1;
  if (selectedSize === 4) discountFactor = 0.96;
  if (selectedSize === 10) discountFactor = 0.92;
  if (selectedSize === 20) discountFactor = 0.88;
  const currentPrice = Math.round(basePrice * selectedSize * discountFactor);

  const productSchema = useMemo(() => {
    if (!product) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "image": product.image,
      "description": productDetails?.desc1 || `Buy ${product.name} online. ${product.subCategory} from ${product.brand}.`,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "offers": {
        "@type": "Offer",
        "price": currentPrice,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "url": `https://rainbowpaint.in/p/${product.slug || product.name?.replace(/\s+/g, '-').toLowerCase()}`
      }
    };
  }, [product, productDetails, currentPrice]);

  if (loading) {
    return (
      <div className="pt-24 pb-12 bg-royale-bg min-h-[80vh] flex items-center justify-center">
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
      image: product.image,
      size: selectedSize,
      quantity,
      unitPrice: basePrice,
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
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs">
                <div><span className="block text-zinc-600 mb-1">Finish</span> <span className="text-zinc-800 font-medium">{productDetails.finish}</span></div>
                <div><span className="block text-zinc-600 mb-1">Drying Time</span> <span className="text-zinc-800 font-medium">{productDetails.dryingTime}</span></div>
                <div><span className="block text-zinc-600 mb-1">Coverage</span> <span className="text-zinc-800 font-medium">{productDetails.coverage}</span></div>
                <div><span className="block text-zinc-600 mb-1">Washability</span> <span className="text-zinc-800 font-medium">{productDetails.washability}</span></div>
                <div><span className="block text-zinc-600 mb-1">Application Base</span> <span className="text-zinc-800 font-medium">{productDetails.base}</span></div>
                <div><span className="block text-zinc-600 mb-1">Warranty</span> <span className="text-zinc-800 font-medium">{productDetails.warranty}</span></div>
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
        title={`${product.name} - Buy ${product.brand} Paints Online`}
        description={productDetails?.desc1 || `Buy ${product.name} online. ${product.subCategory} from ${product.brand}.`}
        keywords={`${product.name}, ${product.brand}, ${product.category}, ${product.subCategory}`}
        url={`https://rainbowpaint.in/p/${product.slug || product.name.replace(/\s+/g, '-').toLowerCase()}`}
        image={product.image}
        productBrand={product.brand}
        productPrice={currentPrice}
        productCurrency="INR"
        productAvailability="InStock"
        schema={[productSchema].filter(Boolean)}
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
                src={product.image} 
                alt={product.name}
                className={`w-full h-full object-contain p-8 lg:p-12 transition-transform duration-200 ${isZoomed ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
              />
              
              {/* Zoom Layer */}
              <div 
                className={`absolute inset-0 bg-white bg-no-repeat pointer-events-none transition-opacity duration-200 ${isZoomed ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  backgroundImage: `url(${product.image})`,
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
                {product.subCategory && (
                  <span className={`text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest border transition-colors ${getCategoryBadgeStyle(product.subCategory)}`} title={product.subCategory}>
                    {product.subCategory}
                  </span>
                )}
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
                  { icon: ShieldCheck, title: "Authorized distributors", sub: "for featured products" },
                  { icon: Tags, title: "Same Price as In-Store", sub: "no online extra charge" },
                  { icon: Truck, title: "Doorstep delivery", sub: "skip the trip, we deliver" },
                  { icon: Award, title: "20+ yrs trusted", sub: "msme/gst certified" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                  <div key={idx} className="flex flex-col items-center justify-start sm:justify-center text-center p-2 sm:p-3 md:p-4 rounded-[10px] sm:rounded-2xl border border-gold/20 bg-gradient-to-b from-white/5 to-gold/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group hover:shadow-[0_15px_40px_-5px_rgba(184,151,90,0.15)] hover:border-gold/40 hover:-translate-y-1">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-1.5 sm:mb-2 rounded-lg sm:rounded-[14px] bg-white/10 shadow-[0_4px_15px_rgba(184,151,90,0.1)] flex items-center justify-center border border-gold/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      <span className="text-gold drop-shadow-[0_2px_5px_rgba(184,151,90,0.2)]">
                        <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 sm:gap-1 items-center">
                      <p className="text-[7.5px] sm:text-[10px] md:text-xs font-display font-bold text-ivory uppercase tracking-tight sm:tracking-widest leading-[1.1] sm:leading-tight group-hover:text-gold transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[6.5px] sm:text-[9px] md:text-[10px] text-ivory/60 font-sans tracking-tight sm:tracking-wide leading-tight max-w-[150px]">
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

            {/* Shade Selector */}
            {isPaint && (
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
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setQuantity(1); }}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      selectedSize === size 
                        ? 'border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(184,151,90,0.15)] ring-1 ring-gold/30' 
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:bg-zinc-50'
                    }`}
                  >
                    <span className="block text-sm sm:text-base font-serif font-semibold">{size}L</span>
                    <span className="block text-[9px] font-sans opacity-70 mt-0.5">₹{(basePrice * size).toLocaleString()}</span>
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

        {/* Frequently Bought Together Section */}
        {boughtTogether.length > 0 && (
          <div className="mt-20 pt-16 border-t border-zinc-200/50">
            <h2 className="text-2xl font-serif text-ivory mb-8">Customers buy these <span className="text-gradient italic">Together</span></h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {boughtTogether.map(rp => (
                <Link to={`/p/${rp.name.replace(/\s+/g, '-').toLowerCase()}`} key={rp.id} className="group flex items-center bg-royale-surface border border-zinc-200 hover:border-gold/30 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(184,151,90,0.1)] p-3">
                  <div className="relative bg-white w-20 h-20 shrink-0 rounded-xl flex items-center justify-center p-2">
                    <img src={rp.image} alt={rp.name} loading="lazy" decoding="async" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="pl-4 flex flex-col flex-1">
                    <span className="text-[9px] uppercase tracking-wider text-gold font-display font-bold mb-1">{rp.brand}</span>
                    <h3 className="text-xs font-medium text-ivory mb-1 leading-tight line-clamp-2">{rp.name}</h3>
                    <span className="text-sm font-display text-ivory mt-auto font-semibold">₹{rp.price || 850}</span>
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

