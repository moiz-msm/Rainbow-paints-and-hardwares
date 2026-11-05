import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { useUniversalSearchStore, SearchTab } from '../store/useUniversalSearchStore';

interface SmartSearchBarProps {
  variant?: 'header' | 'hero' | 'compact';
  className?: string;
  placeholder?: string;
}

const HERO_TRENDING_TAGS = [
  { label: '0952', tab: 'shades', hint: 'Soft Glow' },
  { label: 'Royale Glitz', tab: 'products', hint: 'Paint' },
  { label: 'Interior Paint', tab: 'categories', hint: 'Category' },
  { label: 'Cost Calculator', tab: 'tools', hint: 'Tool' },
  { label: 'Waterproofing', tab: 'tools', hint: 'Service' },
  { label: 'Visualizer', tab: 'tools', hint: '3D Preview' },
];

export default function SmartSearchBar({
  variant = 'header',
  className = '',
  placeholder,
}: SmartSearchBarProps) {
  const { openSearch } = useUniversalSearchStore();

  if (variant === 'hero') {
    return (
      <div className={`w-full max-w-xl mx-auto lg:mx-0 ${className}`}>
        {/* Main Hero Search Trigger Bar */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => openSearch()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openSearch();
            }
          }}
          className="group relative cursor-pointer bg-white border-2 border-gold/40 hover:border-gold rounded-2xl p-2 sm:p-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 sm:gap-3 ring-4 ring-gold/10 hover:ring-gold/20"
          title="Search shades, paints, tools, blogs (⌘K)"
          aria-label="Universal Smart Search"
        >
          <div className="p-2 sm:p-2.5 rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors shrink-0">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="flex-1 min-w-0 text-left">
            <div className="text-xs sm:text-sm font-medium text-zinc-700 truncate">
              {placeholder || 'Search shades, products, tools, blogs...'}
            </div>
            <div className="text-[10px] sm:text-[11px] text-zinc-600 hidden sm:block truncate">
              Try &ldquo;0952&rdquo;, &ldquo;Royale Glitz&rdquo;, &ldquo;Calculator&rdquo;, &ldquo;Interior Paint&rdquo;
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="hidden sm:inline-flex items-center px-2 py-1 text-[11px] font-mono text-gold bg-gold/10 border border-gold/30 rounded-lg">
              ⌘K
            </span>
            <div className="bg-gold text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider group-hover:bg-[#b09265] transition-colors shadow-sm flex items-center gap-1">
              <span>Search</span>
            </div>
          </div>
        </div>

        {/* Quick Trending Searches Chips */}
        <div className="mt-2.5 flex items-center justify-center lg:justify-start gap-1.5 flex-wrap text-[10px] sm:text-xs">
          <span className="text-ivory/60 font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold" />
            Trending:
          </span>
          {HERO_TRENDING_TAGS.map((tag) => (
            <button
              key={tag.label}
              type="button"
              onClick={() => openSearch(tag.label, tag.tab as SearchTab)}
              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-gold/20 text-ivory/90 hover:text-gold border border-white/10 hover:border-gold/40 transition-all font-medium cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => openSearch()}
        className={`flex items-center justify-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 text-gold hover:text-gold/80 hover:bg-black/5 sm:bg-white sm:shadow-sm sm:border sm:border-zinc-200 sm:hover:border-gold/60 rounded-xl text-xs transition-all cursor-pointer shrink-0 ${className}`}
        title="Search shades, paints, tools, blogs... (⌘K)"
        aria-label="Universal Search"
      >
        <Search className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-gold shrink-0" />
        <span className="hidden sm:inline truncate text-[11px] text-zinc-600">Search...</span>
      </button>
    );
  }

  // Default 'header' variant
  return (
    <button
      type="button"
      onClick={() => openSearch()}
      className={`group flex items-center gap-2 px-3 py-1.5 bg-white shadow-sm border border-zinc-200 hover:border-gold/60 rounded-xl text-xs text-zinc-500 hover:text-zinc-800 transition-all cursor-pointer ${className}`}
      title="Search shades, products, tools, blogs... (⌘K)"
      aria-label="Universal Search"
    >
      <Search className="w-3.5 h-3.5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
      <span className="truncate flex-1 text-left text-zinc-600 group-hover:text-zinc-700">
        {placeholder || 'Search shades, paints, tools...'}
      </span>
      <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[9px] font-mono text-gold bg-gold/10 border border-gold/30 rounded">
        ⌘K
      </kbd>
    </button>
  );
}
