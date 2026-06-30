import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Palette, Calculator, ArrowRight, Sparkles, Scale } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    title: "Colour Visualizer",
    desc: "See colours on your walls before you buy.",
    icon: Sparkles,
    link: "/visualizer",
    actionText: "Try Now",
    bgClass: "bg-gradient-to-br from-[#DFE5D9] to-[#C2CEB7]",
    textClass: "text-[#1F2E22]",
    descClass: "text-[#2D4432]",
    iconColor: "text-[#4A644D]",
    emoji: "🛋️",
  },
  {
    title: "Paint Cost Calculator",
    desc: "Enter your room size and get exact paint quantity & cost.",
    icon: Calculator,
    link: "/calculator",
    actionText: "Calculate Now",
    bgClass: "bg-gradient-to-br from-[#E2EFFF] to-[#C0DCFC]",
    textClass: "text-[#102A4C]",
    descClass: "text-[#1C4173]",
    iconColor: "text-[#2C62AA]",
    emoji: "📐",
  },
  {
    title: "Compare Paints",
    desc: "Compare premium interior and exterior emulsion paints side-by-side.",
    icon: Scale,
    link: "/compare-paints",
    actionText: "Compare Now",
    bgClass: "bg-gradient-to-br from-[#FCEAF1] to-[#F3D1DF]",
    textClass: "text-[#4A1728]",
    descClass: "text-[#6B243B]",
    iconColor: "text-[#9E395A]",
    emoji: "⚖️",
  },
];

export default function ToolsOverview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setCanScroll(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    if (scrollWidth > clientWidth) {
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    }
  };

  return (
    <section
      id="tools"
      className="py-12 sm:py-20 lg:py-24 border-t border-gold/10 relative overflow-hidden bg-gradient-to-b from-transparent to-royale-surface"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 tracking-tight leading-tight text-center text-[#1A365D]">
            Everything You Need, <span className="text-gradient italic">All in One Place</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-[#1A365D]/70 max-w-xl mx-auto font-sans font-light leading-relaxed">
            Smart tools to help you choose, calculate and order with confidence.
          </p>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 md:px-0 -mx-4 md:mx-0 no-scrollbar pb-2 md:pb-0 max-w-5xl mx-auto"
        >
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex-none w-[260px] md:w-auto snap-center"
            >
              {tool.link.startsWith("#") ? (
                <a
                  href={tool.link}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(tool.link);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`group relative flex flex-col justify-between min-h-[180px] sm:min-h-[220px] rounded-2xl overflow-hidden border border-white/20 shadow-sm hover:shadow-md transition-all ${tool.bgClass}`}
                >
                  <div className="p-5 sm:p-6 flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="max-w-[70%]">
                        <h3 className={`text-sm sm:text-base font-medium font-serif mb-1 sm:mb-2 uppercase tracking-wider leading-tight ${tool.textClass}`}>
                          {tool.title}
                        </h3>
                        <p className={`text-[10px] sm:text-[11px] leading-relaxed ${tool.descClass}`}>
                          {tool.desc}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                        <tool.icon className={`w-4 h-4 ${tool.iconColor}`} />
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className={`flex items-center gap-1 sm:gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest group-hover:gap-2 sm:group-hover:gap-3 transition-all ${tool.textClass}`}>
                        {tool.actionText} <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                    <span className="text-8xl drop-shadow-xl saturate-150 blur-[1px]">{tool.emoji}</span>
                  </div>
                </a>
              ) : (
                <Link
                  to={tool.link}
                  className={`group relative flex flex-col justify-between min-h-[180px] sm:min-h-[220px] rounded-2xl overflow-hidden border border-white/20 shadow-sm hover:shadow-md transition-all ${tool.bgClass}`}
                >
                  <div className="p-5 sm:p-6 flex flex-col h-full relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className="max-w-[70%]">
                        <h3 className={`text-sm sm:text-base font-medium font-serif mb-1 sm:mb-2 uppercase tracking-wider leading-tight ${tool.textClass}`}>
                          {tool.title}
                        </h3>
                        <p className={`text-[10px] sm:text-[11px] leading-relaxed ${tool.descClass}`}>
                          {tool.desc}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                        <tool.icon className={`w-4 h-4 ${tool.iconColor}`} />
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className={`flex items-center gap-1 sm:gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest group-hover:gap-2 sm:group-hover:gap-3 transition-all ${tool.textClass}`}>
                        {tool.actionText} <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 flex items-center justify-center">
                    <span className="text-8xl drop-shadow-xl saturate-150 blur-[1px]">{tool.emoji}</span>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {canScroll && (
          <div className="w-24 h-1 bg-zinc-200/60 rounded-full mx-auto mt-6 overflow-hidden relative md:hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#1A365D] rounded-full w-1/3 transition-transform duration-100 ease-out"
              style={{ transform: `translateX(${scrollProgress * 200}%)` }} 
            />
          </div>
        )}
      </div>
    </section>
  );
}
