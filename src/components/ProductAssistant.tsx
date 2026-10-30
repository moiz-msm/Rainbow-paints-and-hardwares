import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, MapPin, Compass, Navigation, ExternalLink, Sparkles, ShoppingBag } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useCartStore } from '../store/useCartStore';
import { useDeliveryStore } from '../store/useDeliveryStore';
import { useAuthStore } from '../store/useAuthStore';
import { mockProducts } from '../data';

interface GroundingLink {
  title: string;
  uri: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'mascot' | 'user';
  timestamp: Date;
  grounding?: GroundingLink[];
  contextPill?: string;
}

interface ChatPart {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function ProductAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const [isHeroVisible, setIsHeroVisible] = useState(location.pathname === '/');
  const [isScrolling, setIsScrolling] = useState(false);
  const [showHelperBubble, setShowHelperBubble] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { items: cartItems } = useCartStore();
  const deliveryStore = useDeliveryStore();
  const { user } = useAuthStore();

  // Find active product if currently on a product detail page
  const productSlug = location.pathname.startsWith('/p/') 
    ? location.pathname.replace('/p/', '').split('/')[0] 
    : null;
  const currentProduct = productSlug ? mockProducts.find(p => p.slug === productSlug) : null;

  // Track scroll position to hide/show the floating button when hero is visible
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (location.pathname === '/') {
            setIsHeroVisible(window.scrollY < 300);
          } else {
            setIsHeroVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-hero-chat', handleOpenChat);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-hero-chat', handleOpenChat);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [location.pathname]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial',
      text: "Hello! I'm **Rani**, your Rainbow Paints expert consultant in Coimbatore. I'm context-aware and powered by Google Maps intelligence—ask me about paint recommendations, real-time Coimbatore delivery times, store locations, or surface preparation!",
      sender: 'mascot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "918072442930";

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.chatbot-container')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const buildContextPayload = () => {
    const cartTotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * (item.size || 1) * item.quantity), 0);
    
    return {
      page: location.pathname,
      product: currentProduct ? {
        name: currentProduct.name,
        brand: currentProduct.brand,
        price: currentProduct.price,
        topCategory: currentProduct.topCategory,
        subCategory: currentProduct.subCategory,
        description: currentProduct.description
      } : null,
      cart: {
        itemsCount: cartItems.length,
        total: cartTotal,
        items: cartItems.map(it => ({
          name: it.name,
          quantity: it.quantity,
          size: it.size,
          unitPrice: it.unitPrice
        }))
      },
      customerLocation: deliveryStore.locationName ? {
        name: deliveryStore.locationName,
        pincode: deliveryStore.pincode,
        distanceKm: deliveryStore.distanceKm,
        durationText: deliveryStore.durationText,
        address: deliveryStore.formattedAddress || deliveryStore.locationName,
        coords: deliveryStore.latitude && deliveryStore.longitude ? {
          lat: deliveryStore.latitude,
          lon: deliveryStore.longitude
        } : null
      } : null,
      userName: user?.displayName || user?.email?.split('@')[0] || null
    };
  };

  const getLocalResponse = (text: string): string => {
    const input = text.toLowerCase();
    
    if (currentProduct && (input.includes('this') || input.includes('coat') || input.includes('primer') || input.includes('price') || input.includes('deliver'))) {
      return `For **${currentProduct.name}** (${currentProduct.brand}), we have complete stock at our Ganapathy store. We deliver across Coimbatore usually within 2 to 4 hours. You can also calculate exact requirements on our Paint Calculator!`;
    }

    if (input.includes("location") || input.includes("where") || input.includes("address") || input.includes("store")) {
      return "Rainbow Paints is located at **54 Cox Street, Ganapathy, Coimbatore - 641009**, near the Central Bus Stand and Gandhipuram. We provide direct doorstep delivery across all Coimbatore zones!";
    }

    if (input.includes("deliver") || input.includes("shipping") || input.includes("time") || input.includes("eta")) {
      const loc = deliveryStore.locationName || "your area in Coimbatore";
      return `We deliver right to ${loc}! Typical delivery time is 2 to 4 hours via our direct store dispatch with real-time route tracking.`;
    }
    
    if (input.includes("genuine") || input.includes("original") || input.includes("authent")) {
      return "Rainbow Paints has been an authorized distributor for Asian Paints, Berger Paints, and Dr. Fixit since 2001. Every bucket is 100% genuine, factory-tinted, and sealed.";
    }

    return "I'm Rani from Rainbow Paints! Ask me about wall paints, primers, waterproofing, or check doorstep delivery across Coimbatore. How can I help with your project?";
  };

  const processChatMessage = async (text: string) => {
    const contextPill = currentProduct 
      ? `Viewing: ${currentProduct.name}`
      : deliveryStore.locationName
      ? `Location: ${deliveryStore.locationName}`
      : undefined;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
      contextPill
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Keep up to last 8 messages for multi-turn conversation
      const relevantMsgs = messages
        .filter(m => m.id !== 'initial')
        .slice(-8);

      const history: ChatPart[] = relevantMsgs.concat(userMsg).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const contextPayload = buildContextPayload();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text, 
          history,
          context: contextPayload
        }),
      });

      if (!response.ok) {
        const localResponse = getLocalResponse(text);
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: localResponse,
          sender: 'mascot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
        return;
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.text || getLocalResponse(text),
        sender: 'mascot',
        timestamp: new Date(),
        grounding: data.grounding && Array.isArray(data.grounding) && data.grounding.length > 0 
          ? data.grounding 
          : undefined
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getLocalResponse(text),
        sender: 'mascot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleDetectLocationInChat = async () => {
    setIsLocating(true);
    try {
      await deliveryStore.trackUserLocation(true);
      const updatedState = useDeliveryStore.getState();
      const locText = updatedState.formattedAddress || `${updatedState.locationName || 'Coimbatore Area'} (${updatedState.pincode || '641009'})`;
      await processChatMessage(`I'm located at ${locText}. Can you check delivery availability, road distance, and ETA from your Ganapathy store using Google Maps?`);
    } catch (err) {
      console.warn("Location detection in chat failed:", err);
    } finally {
      setIsLocating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue("");
    await processChatMessage(userText);
  };

  // Quick contextual prompts based on user's active page
  const getSuggestedPrompts = () => {
    if (currentProduct) {
      return [
        `Can you deliver ${currentProduct.name} to my location?`,
        `How many coats of ${currentProduct.name} are recommended?`,
        `What primer matches this best?`
      ];
    }
    if (location.pathname === '/checkout' || location.pathname === '/cart') {
      return [
        "Detect my delivery address with Google Maps",
        "What is the estimated delivery time for my order?",
        "What payment options do you support?"
      ];
    }
    if (location.pathname === '/calculator') {
      return [
        "How much paint do I need for a 2 BHK apartment?",
        "What is the average coverage per liter for interior emulsion?"
      ];
    }
    return [
      "Where is your Coimbatore store located?",
      "Detect my location for delivery",
      "Which paint is best for exterior rainy walls?"
    ];
  };

  return (
    <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end chatbot-container transition-all duration-300 ${
      isScrolling && !isOpen ? 'opacity-30 pointer-events-none sm:pointer-events-auto hover:opacity-100 transition-opacity' : 'opacity-100'
    }`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[300px] xs:w-[340px] sm:w-[420px] md:w-[460px] bg-white border border-zinc-200 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[55vh] sm:h-[65vh] min-h-[440px] max-h-[720px]"
          >
            {/* Header */}
            <div className="bg-zinc-50/90 backdrop-blur-sm p-4 sm:p-5 border-b border-zinc-100 flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                <img 
                  src="/mascot.webp" 
                  alt="Mascot" 
                  referrerPolicy="no-referrer" 
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-zinc-900 font-serif font-bold text-xs sm:text-sm tracking-wide">Rainbow Assistant</h2>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-amber-50 text-gold border border-amber-200/60 uppercase">
                    AI + Maps
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-500 truncate">
                    {deliveryStore.locationName 
                      ? `📍 ${deliveryStore.locationName}` 
                      : 'Context-Aware • Coimbatore, TN'}
                  </span>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleDetectLocationInChat}
                disabled={isLocating}
                title="Detect location with Google Maps"
                className="p-2 text-zinc-600 hover:text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-all shadow-xs flex items-center gap-1 text-[11px] font-medium disabled:opacity-50"
              >
                <Compass className={`w-3.5 h-3.5 text-red-500 ${isLocating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'My Location'}</span>
              </button>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 sm:p-2 hover:bg-zinc-200 rounded-full transition-all text-zinc-500 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Context Notice Bar (if viewing product or in checkout) */}
            {(currentProduct || deliveryStore.locationName) && (
              <div className="bg-amber-50/70 border-b border-amber-100/80 px-4 py-2 text-[11px] text-amber-900 flex items-center justify-between gap-2 overflow-hidden">
                <div className="flex items-center gap-1.5 truncate">
                  {currentProduct ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="truncate">Viewing: <strong>{currentProduct.name}</strong> ({currentProduct.brand})</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">Google Maps: <strong>{deliveryStore.locationName}</strong></span>
                    </>
                  )}
                </div>
                {deliveryStore.distanceKm && (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0">
                    ~{deliveryStore.distanceKm} km ({deliveryStore.durationText || 'same-day'})
                  </span>
                )}
              </div>
            )}

            {/* Chat Thread */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-zinc-50/40 scroll-smooth"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  {msg.contextPill && (
                    <span className="text-[10px] text-zinc-400 mb-1 px-2">
                      {msg.contextPill}
                    </span>
                  )}
                  <div className={`max-w-[88%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-900 text-white font-normal rounded-tr-none' 
                      : 'bg-white text-zinc-800 border border-zinc-200/80 rounded-tl-none prose prose-sm prose-zinc'
                  }`}>
                    <div className="prose prose-xs sm:prose-sm max-w-none text-inherit">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>

                    {/* Google Maps Grounding Links */}
                    {msg.grounding && msg.grounding.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-zinc-100 space-y-1.5 not-prose">
                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500" /> Google Maps Places
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.grounding.map((place, idx) => (
                            <a
                              key={idx}
                              href={place.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-lg text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors shadow-2xs"
                            >
                              <Compass className="w-3 h-3 text-red-500 shrink-0" />
                              <span className="truncate max-w-[190px] sm:max-w-[240px]">{place.title}</span>
                              <ExternalLink className="w-2.5 h-2.5 text-zinc-400 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-zinc-400 mt-1 px-2">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-zinc-400 p-3.5 rounded-2xl rounded-tl-none border border-zinc-200 flex items-center gap-1.5 shadow-xs">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-duration:0.6s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                    <span className="text-[11px] font-medium text-zinc-500 ml-1.5">Checking paints & Google Maps...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Contextual Prompts */}
            <div className="px-4 py-2 bg-zinc-50/70 border-t border-zinc-100 overflow-x-auto no-scrollbar flex items-center gap-1.5">
              {getSuggestedPrompts().map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => processChatMessage(prompt)}
                  disabled={isTyping}
                  className="whitespace-nowrap px-2.5 py-1 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-700 rounded-full text-[11px] font-medium transition-all shadow-2xs shrink-0 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* User Input & Action Bar */}
            <div className="p-3.5 sm:p-4 bg-white border-t border-zinc-100 space-y-2.5">
              <form onSubmit={handleSubmit} className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentProduct ? `Ask about ${currentProduct.name} or delivery...` : "Ask Rani about paints, colors, or locations..."}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 sm:py-3 pl-3.5 sm:pl-4 pr-11 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-0.5">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  <span>54 Cox St, Ganapathy, CBE</span>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Hi! I need help with paints from the Rainbow Paints website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-700 font-semibold hover:text-emerald-800"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center group relative cursor-pointer pointer-events-auto"
        layoutId="mascot-container"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="bg-white rounded-full p-3.5 md:p-4 border border-zinc-200 shadow-xl"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-zinc-900" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              className="flex items-center justify-center relative"
            >
              <motion.img 
                layoutId="mascot-img" 
                src="/mascot.webp" 
                alt="Mascot" 
                referrerPolicy="no-referrer" 
                className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-md" 
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Pulsing online badge */}
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Helper text bubble */}
        {(showHelperBubble && !isOpen) && (
          <div className="absolute bottom-[105%] left-[50%] -translate-x-[50%] bg-white px-3 py-1.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-100 flex items-center justify-center pointer-events-none animate-bounce z-20 whitespace-nowrap">
            <span className="text-[10px] sm:text-xs font-serif font-bold text-zinc-900 tracking-wide">Ask Rani (AI + Maps)</span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-zinc-100 rotate-45 -mt-1" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
