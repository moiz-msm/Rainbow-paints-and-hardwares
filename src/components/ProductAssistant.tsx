import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { mockProducts } from '../data';

interface Message {
  id: string;
  text: string;
  sender: 'mascot' | 'user';
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "Where is your Coimbatore store located?",
  "Do you offer doorstep delivery?",
  "Which paint brands do you sell?",
  "How can I calculate paint quantity?"
];

export default function ProductAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    };

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
      text: "Hello! Welcome to **Rainbow Paints & Hardwares**. How can I help you today? Ask me about paint products, brands, pricing, store location, or delivery!",
      sender: 'mascot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "918072442930";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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

  const getSimpleResponse = (text: string): string => {
    const input = text.toLowerCase().trim();

    if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste)\b/.test(input)) {
      return "Hello! Welcome to **Rainbow Paints & Hardwares**. How can I assist you with your painting needs today?";
    }

    if (input.includes("location") || input.includes("where") || input.includes("address") || input.includes("store") || input.includes("shop")) {
      return "Our store is located at **54 Cox Street, Kattoor, Coimbatore - 641009**, Tamil Nadu. We are open Monday to Saturday, 9:00 AM – 8:30 PM. You can also order directly online for doorstep delivery!";
    }

    if (input.includes("deliver") || input.includes("shipping") || input.includes("time") || input.includes("eta")) {
      return "We offer fast doorstep delivery across **Coimbatore** (typically 2 to 4 hours for local orders) as well as **Pan-India dispatch** for industrial coatings, primers, and bulk orders.";
    }

    if (input.includes("brand") || input.includes("asian") || input.includes("berger") || input.includes("fixit") || input.includes("mrf") || input.includes("sheenlac") || input.includes("birla") || input.includes("fevicol")) {
      return "We are authorized dealers since 2001 for **Asian Paints, Berger Paints, Dr. Fixit, MRF Vapocure, Sheenlac, Fevicol, Birla White, and Just Spray**. Every product is 100% genuine and factory-sealed.";
    }

    if (input.includes("calculat") || input.includes("quantity") || input.includes("how much") || input.includes("lit") || input.includes("coverage")) {
      return "You can estimate exact paint litres and primer requirements using our **Paint Calculator** page! As a quick rule of thumb, interior emulsions cover around **110–130 sq.ft per litre for 2 coats**.";
    }

    if (input.includes("waterproof") || input.includes("damp") || input.includes("leak") || input.includes("terrace")) {
      return "For waterproofing and dampness issues, we carry **Dr. Fixit** and **Berger/Asian Paints Waterproofing** solutions (Roofseal, Damp Proof, Crack-X, and LW+). You can also book a free digital moisture inspection via our **Painting Services** page.";
    }

    if (input.includes("primer") || input.includes("red oxide") || input.includes("zinc") || input.includes("metal") || input.includes("industrial")) {
      return "We stock interior wall primers, exterior primers, and industrial metal primers including **Berger Paints Red Oxide Zinc Chromate Metal Primer IS2074**, **Berger Industrial Zinc Yellow Primer**, and **Bison Zinc Phosphate Grey Primer**. Browse **Shop** or use Search to view sizes and pricing.";
    }

    if (input.includes("price") || input.includes("cost") || input.includes("rate") || input.includes("bulk") || input.includes("wholesale") || input.includes("quote")) {
      return "We offer competitive in-store & wholesale pricing with no extra online markup. For **bulk or B2B project quotes**, message us directly on WhatsApp at **+91 80724 42930**.";
    }

    if (input.includes("contact") || input.includes("phone") || input.includes("call") || input.includes("whatsapp") || input.includes("hour") || input.includes("open")) {
      return "You can reach us at **+91 80724 42930** (Call or WhatsApp) during store hours (Mon–Sat, 9:00 AM – 8:30 PM), or tap the WhatsApp button below to chat with our team directly.";
    }

    if (input.includes("genuine") || input.includes("original") || input.includes("authent")) {
      return "Rainbow Paints & Hardwares has been an authorized paint distributor since **2001**. Every bucket is 100% genuine and factory-tinted.";
    }

    // Check if the user mentioned a specific product name
    const matchedProduct = mockProducts.find((p) => {
      const nameLower = p.name.toLowerCase();
      return input.length >= 4 && (nameLower.includes(input) || input.split(/\s+/).filter(w => w.length > 3).every(w => nameLower.includes(w)));
    });

    if (matchedProduct) {
      return `Yes, **${matchedProduct.name}** (${matchedProduct.brand}) is available starting at **${matchedProduct.price}**. You can find it in our Shop or Search bar for pack sizes and details!`;
    }

    return "Thanks for reaching out to **Rainbow Paints & Hardwares**! You can ask me about our **store location, delivery, paint brands, waterproofing, primers, or bulk pricing**, or click **WhatsApp** below to speak with our store team directly.";
  };

  const processChatMessage = (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const replyText = getSimpleResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: 'mascot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue("");
    processChatMessage(userText);
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
            className="mb-4 w-[300px] xs:w-[340px] sm:w-[400px] md:w-[430px] bg-white border border-zinc-200 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[52vh] sm:h-[60vh] min-h-[420px] max-h-[680px]"
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
                <h2 className="text-zinc-900 font-serif font-bold text-xs sm:text-sm tracking-wide">Rainbow Support</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-zinc-500 truncate">
                    Paint Store Help • Coimbatore, TN
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 sm:p-2 hover:bg-zinc-200 rounded-full transition-all text-zinc-500 hover:text-zinc-900"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

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
                  <div className={`max-w-[88%] p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user' 
                      ? 'bg-zinc-900 text-white font-normal rounded-tr-none' 
                      : 'bg-white text-zinc-800 border border-zinc-200/80 rounded-tl-none prose prose-sm prose-zinc'
                  }`}>
                    <div className="prose prose-xs sm:prose-sm max-w-none text-inherit">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
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
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Prompts */}
            <div className="px-4 py-2 bg-zinc-50/70 border-t border-zinc-100 overflow-x-auto no-scrollbar flex items-center gap-1.5">
              {SUGGESTED_PROMPTS.map((prompt, pIdx) => (
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
                  placeholder="Ask about paints, prices, or store info..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 sm:py-3 pl-3.5 sm:pl-4 pr-11 text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-0.5">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" />
                  <span>54 Cox St, Kattoor, CBE</span>
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
        {!isOpen && (
          <div className="absolute bottom-[105%] right-0 bg-white px-3 py-1.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-100 flex items-center justify-center pointer-events-none animate-bounce z-20 whitespace-nowrap">
            <span className="text-[10px] sm:text-xs font-serif font-bold text-zinc-900 tracking-wide">May I help you?</span>
            <div className="absolute top-full right-6 w-2 h-2 bg-white border-r border-b border-zinc-100 rotate-45 -mt-1" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
