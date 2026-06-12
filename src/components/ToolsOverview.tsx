import React from "react";
import { motion } from "framer-motion";
import { Palette, Calculator, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const tools = [
  {
    title: "Color Visualizer",
    desc: "See how any shade looks on your walls before you pick up a brush.",
    icon: Palette,
    link: "/visualizer",
    color: "from-purple-500 to-indigo-600",
    emoji: "🎨",
    actionText: "Visualize",
  },
  {
    title: "Paint Cost Calculator",
    desc: "Calculate the exact paint quantity and budget for your project.",
    icon: Calculator,
    link: "/calculator",
    color: "from-blue-500 to-cyan-600",
    emoji: "🧮",
    actionText: "Calculate",
  },
];

export default function ToolsOverview() {
  return (
    <section
      id="tools"
      className="py-12 sm:py-20 lg:py-24 border-t border-gold/10 relative overflow-hidden bg-transparent"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 border-b border-zinc-200 pb-4 flex flex-col items-center text-center">
          <span className="text-[8px] sm:text-[9px] font-display font-medium text-gold/80 uppercase tracking-[0.4em] mb-2 block">
            Digital Tools
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 uppercase tracking-tight leading-tight text-center">
            Smart <span className="text-gradient italic">Resources</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-gold max-w-xl mx-auto font-sans font-light leading-relaxed">
            Powerful tools designed to simplify your home transformation
            journey.
          </p>
        </div>

        <div className="flex md:grid md:grid-cols-2 gap-3 sm:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 md:px-0 -mx-4 md:mx-0 no-scrollbar pb-2 md:pb-0 max-w-3xl mx-auto">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex-none w-[200px] md:w-auto snap-center"
            >
              {tool.link.startsWith("#") ? (
                <a
                  href={tool.link}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.querySelector(tool.link);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group relative flex flex-col justify-end min-h-[180px] sm:min-h-[200px] rounded-xl overflow-hidden border border-zinc-200 bg-royale-surface/50 hover-gold-glow"
                >
                  <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-8 pointer-events-none opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <span className="text-[100px] sm:text-[120px] blur-[1px] scale-110 saturate-150 drop-shadow-xl">
                      {tool.emoji}
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-royale-bg via-royale-bg/90 to-transparent`}
                  />
                  <div className="p-4 sm:p-6 flex flex-col flex-grow relative z-10 w-full h-full">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 shadow-md`}
                    >
                      <tool.icon className="w-4 h-4 sm:w-5 sm:h-5 text-ivory" />
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-sm sm:text-lg font-medium font-serif mb-1 sm:mb-2 text-ivory tracking-wider uppercase leading-tight">
                        {tool.title}
                      </h3>
                      <p className="text-gold text-[10px] sm:text-xs leading-relaxed mb-4 group-hover:text-gold transition-colors max-w-[70%]">
                        {tool.desc}
                      </p>
                      <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-bold text-gold uppercase tracking-widest group-hover:gap-2 sm:group-hover:gap-3 transition-all">
                        {tool.actionText}{" "}
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
                      </div>
                    </div>
                  </div>
                </a>
              ) : (
                <Link
                  to={tool.link}
                  className="group relative flex flex-col justify-end min-h-[180px] sm:min-h-[200px] rounded-xl overflow-hidden border border-zinc-200 bg-royale-surface/50 hover-gold-glow"
                >
                  {/* Background Emoji with Overlay */}
                  <div className="absolute inset-0 flex items-center justify-end pr-4 sm:pr-8 pointer-events-none opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <span className="text-[100px] sm:text-[120px] blur-[1px] scale-110 saturate-150 drop-shadow-xl">
                      {tool.emoji}
                    </span>
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-royale-bg via-royale-bg/90 to-transparent`}
                  />

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow relative z-10 w-full h-full">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 shadow-md`}
                    >
                      <tool.icon className="w-4 h-4 sm:w-5 sm:h-5 text-ivory" />
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-sm sm:text-lg font-medium font-serif mb-1 sm:mb-2 text-ivory tracking-wider uppercase leading-tight">
                        {tool.title}
                      </h3>
                      <p className="text-gold text-[10px] sm:text-xs leading-relaxed mb-4 group-hover:text-gold transition-colors max-w-[70%]">
                        {tool.desc}
                      </p>

                      <div className="flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[10px] font-bold text-gold uppercase tracking-widest group-hover:gap-2 sm:group-hover:gap-3 transition-all">
                        {tool.actionText}{" "}
                        <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gold" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
