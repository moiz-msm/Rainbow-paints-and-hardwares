import React, { useRef, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProductSearchStore } from '../store/useProductSearchStore';
import { brands, mockProducts, topCategories, subCategories } from '../data';

export default function ProductSearchInput() {
  const { searchQuery, setSearchQuery, showSuggestions, setShowSuggestions } = useProductSearchStore();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowSuggestions]);

  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const suggestionsSet = new Set<string>();
    
    // Check brands
    brands.forEach(b => {
      if (b.toLowerCase().includes(query)) suggestionsSet.add(b);
    });
    
    // Check categories
    [...topCategories, ...subCategories["Home Paint"], ...subCategories.Industrial].forEach(c => {
      if (c.toLowerCase().includes(query)) suggestionsSet.add(c);
    });

    // Check products
    mockProducts.forEach(p => {
      if (p.name.toLowerCase().includes(query)) suggestionsSet.add(p.name);
      if (p.properties) {
        p.properties.forEach((prop: string) => {
          if (prop.toLowerCase().includes(query)) suggestionsSet.add(prop);
        });
      }
      if (p.subCategory && p.subCategory.toLowerCase().includes(query)) {
        suggestionsSet.add(p.subCategory);
      }
    });

    return Array.from(suggestionsSet).slice(0, 8); // top 8 suggestions
  }, [searchQuery]);

  return (
    <div className="relative w-full" ref={searchContainerRef} role="search">
      <Search aria-hidden="true" className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
      <input
        type="search"
        title="Search products and brands"
        aria-label="Search products and brands"
        placeholder="Search products, brands..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => {
          if (searchQuery.trim()) setShowSuggestions(true);
        }}
        className="w-full bg-white shadow-sm border border-zinc-200 rounded-xl py-1.5 sm:py-2 pl-8 sm:pl-9 pr-7 sm:pr-8 text-xs sm:text-sm text-zinc-800 placeholder:text-zinc-600 focus:border-gold/50 focus:outline-none transition-colors"
      />
      {searchQuery && (
        <button 
          onClick={() => {
            setSearchQuery("");
            setShowSuggestions(false);
          }}
          title="Clear search"
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors"
        >
          <X aria-hidden="true" className="w-3.5 h-3.5 text-gold/50 hover:text-gold" />
        </button>
      )}

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && searchSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 right-0 mt-2 max-h-[45vh] sm:max-h-64 bg-royale-bg/95 border border-zinc-200 rounded-xl shadow-2xl overflow-y-auto z-50 backdrop-blur-md"
          >
            {searchSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(suggestion);
                  setShowSuggestions(false);
                }}
                className="w-full text-left px-4 py-3 text-xs sm:text-sm text-ivory/80 hover:text-gold hover:bg-black/5 transition-colors border-b border-zinc-200 last:border-0 flex items-center gap-2 group"
              >
                <Search className="w-3.5 h-3.5 text-gold/50 group-hover:text-gold" />
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
