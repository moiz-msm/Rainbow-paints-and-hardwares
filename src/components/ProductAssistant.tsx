import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'mascot' | 'user';
  timestamp: Date;
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
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide helper bubble after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelperBubble(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll position to hide/show the floating button when hero is visible
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      // Instantly dismiss any bouncing tooltip when scrolling begins
      setShowHelperBubble(false);
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // If we are on homepage and scroll is near top, hero mascot is visible
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
    
    handleScroll(); // Initial check
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
      text: "Hello! I'm your Rainbow Assistant. How can I help you transform your space today? I can help you choose colors, calculate your paint needs, or browse our latest products.",
      sender: 'mascot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "918072442930";
  const phoneNumber = "+918072442930";

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

  const getLocalResponse = (text: string): string => {
    const input = text.toLowerCase();
    
    if (input === 'hi' || input === 'hello' || input === 'hey' || input.includes("hi there") || input.includes("hello there")) {
      return "Hi there! I'm the Rainbow Paints mascot. I can help guide you through our product catalog, color visualizer, and paint calculator. How can I assist you today?";
    }

    if (input.includes("genuine") || input.includes("original") || input.includes("authent") || input.includes("fake")) {
      return "Rainbow Paints has been an authorized distributor for Asian Paints and Berger Paints since 2001. Every product we sell is 100% genuine, factory-sealed, and sourced directly from the manufacturers.";
    }
    
    if (input.includes("how much") || input.includes("quantity") || input.includes("calculate") || input.includes("area") || input.includes("square feet") || input.includes("sqft")) {
      return "To calculate the exact quantity of paint you need, I recommend using our Paint Calculator tool on the website. It helps you get an accurate estimate based on your room dimensions!";
    }
    
    if (input.includes("color") || input.includes("shade") || input.includes("visual") || input.includes("look like") || input.includes("choose")) {
      return "Choosing the right color can be tricky! You can use our 'Visualizer' tool to see shades in a room setting, or browse our 'Products' section for the latest color catalogs.";
    }
    
    if (input.includes("price") || input.includes("cost") || input.includes("rate") || input.includes("discount") || input.includes("offer")) {
      return "Our prices are highly competitive and consistent with our in-store rates. You can find detailed pricing for all our products in the 'Products' section of this website.";
    }
    
    if (input.includes("delivery") || input.includes("shipping") || input.includes("coimbatore") || input.includes("location") || input.includes("where")) {
      return "We are based in Coimbatore and provide doorstep delivery across the city, typically within 24-48 hours. Our store is a trusted landmark with over 20 years of service.";
    }
    
    if (input.includes("brand") || input.includes("asian") || input.includes("berger") || input.includes("industrial")) {
      return "We are authorized distributors for Asian Paints and Berger Paints. We offer their full range of architectural and industrial products, all backed by manufacturer warranties.";
    }
    
    if (input.includes("help") || input.includes("question") || input.includes("support")) {
      return "I'm here to help! I can answer questions about paint types, brands, authenticity, or guide you to our paint calculator and color visualizer tools. What's on your mind?";
    }

    return "I'm currently operating in basic mode due to high traffic, but I can still help with general info about our paints, authenticity, and tools. Feel free to ask about our brands or use the WhatsApp button for direct support!";
  };

  const processChatMessage = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Optimize tokens: Send only the last 6 messages (3 turns) and exclude initial greeting
      const relevantMsgs = messages
        .filter(m => m.id !== 'initial')
        .slice(-6);

      const history: ChatPart[] = relevantMsgs.concat(userMsg).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      if (!response.ok) {
        // Fallback to local bot on any error
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
        timestamp: new Date()
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue.trim();
    setInputValue("");
    await processChatMessage(userText);
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
            className="mb-4 w-[280px] xs:w-[320px] sm:w-[400px] md:w-[450px] bg-white border border-zinc-200 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[50vh] sm:h-[60vh] min-h-[400px] max-h-[700px]"
          >
            {/* Header */}
            <div className="bg-zinc-50/80 backdrop-blur-sm p-4 sm:p-6 border-b border-zinc-100 flex items-center gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gold/10 border-2 border-gold/20 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                <img 
                  src="/mascot.webp" 
                  alt="Mascot" 
                  referrerPolicy="no-referrer" 
                  className="w-8 h-8 sm:w-11 sm:h-11 object-contain" 
                />
              </div>
              <div>
                <h3 className="text-ivory font-display font-bold text-[10px] sm:text-sm uppercase tracking-[0.2em]">Rainbow Assistant</h3>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] sm:text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Active to help</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-auto p-1.5 sm:p-2.5 hover:bg-zinc-200 rounded-full transition-all text-zinc-400 hover:text-ivory"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-white scroll-smooth"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gold text-[#ffffff] font-semibold rounded-tr-none' 
                      : 'bg-zinc-100 text-ivory border border-zinc-200/50 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-zinc-100 text-ivory/40 p-4 rounded-2xl rounded-tl-none border border-zinc-200/50 flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-duration:0.6s]" />
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* User Input & Action Bar */}
            <div className="p-4 sm:p-6 bg-white border-t border-zinc-100 space-y-3 sm:y-4">
              <form onSubmit={handleSubmit} className="relative group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-2.5 sm:py-3.5 pl-4 sm:pl-5 pr-12 sm:pr-14 text-xs sm:text-sm text-ivory focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-gold text-[#ffffff] rounded-lg hover:bg-gold/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed group-hover:scale-105"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </form>

              <div className="pt-1.5 flex justify-center">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=Hi! I need help with paints from the Rainbow Paints website.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#25D366] text-[#ffffff] hover:bg-[#075E54] transition-all shadow-sm font-bold text-[9px] uppercase tracking-wider"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp for Help/Queries
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(!isHeroVisible || isOpen) && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-24 md:h-24 flex items-center justify-center group relative cursor-pointer pointer-events-auto"
        layoutId="mascot-container"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="bg-[#ffffff] rounded-full p-3.5 md:p-5 border border-zinc-200 shadow-xl"
            >
              <X className="w-5 h-5 md:w-8 md:h-8 text-ivory" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              className="flex items-center justify-center"
            >
              <motion.img 
                layoutId="mascot-img" 
                src="/mascot.webp" 
                alt="Mascot" 
                referrerPolicy="no-referrer"
                className="w-14 h-14 md:w-24 md:h-24 object-contain" 
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Helper text bubble, automatically dismissed on timer or scrolling */}
        {(showHelperBubble && !isOpen) && (
          <div className="absolute bottom-[105%] left-[50%] -translate-x-[50%] bg-white px-3 py-1.5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-zinc-100 flex items-center justify-center pointer-events-none animate-bounce z-20 whitespace-nowrap">
            <span className="text-[10px] sm:text-xs font-display font-bold text-zinc-900 tracking-wide">May I help you?</span>
            {/* Speech bubble pointer pointing down to mascot / roller brush */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-r border-b border-zinc-100 rotate-45 -mt-1" />
          </div>
        )}
      </motion.button>
      )}
    </div>
  );
}
