import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import LuxuryBackground from '../components/LuxuryBackground';
import { blogPosts } from '../data/blogPosts';
import { Calendar, Bookmark, PlayCircle, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  return (
    <>
      <LuxuryBackground />
      <main className="min-h-screen pb-20 relative z-10 pt-32">
        <SEO 
          title="Rainbow Paints Blog | Painting Guides & Tips in Coimbatore"
          description="Expert advice on exterior paints, interior colors, waterproofing, and painting costs in Coimbatore. Read the latest articles from Rainbow Paints."
          keywords={["Paint Blog Coimbatore", "Painting Tips", "Waterproofing Guide", "Interior Color Trends", "Exterior Paint Ideas"].join(", ")}
          schema={{
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Rainbow Paints Blog",
            "description": "Expert advice on exterior paints, interior colors, waterproofing, and painting costs in Coimbatore.",
            "url": "https://rainbowpaints.in/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Rainbow Paints and Hardwares"
            }
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex flex-col items-center text-center gap-4 mb-6">
            <div className="max-w-xl mx-auto">
              <h1 className="text-xl sm:text-2xl font-serif font-medium mb-3 uppercase tracking-tight leading-tight text-center text-ivory">
                Rainbow Paint <span className="text-gradient italic">Blog</span>
              </h1>
              <p className="text-gold text-[10px] sm:text-xs font-sans font-light text-center">
                Professional advice, cost breakdowns, and seasonal tips from Coimbatore's leading paint experts.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-zinc-200/20 bg-royale-surface shadow-xl">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-royale-bg/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-display font-medium uppercase tracking-[0.2em] text-ivory border border-zinc-200/20">
                      {post.category}
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                       <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center text-royale-bg shadow-2xl scale-90 group-hover:scale-100">
                          <PlayCircle className="w-5 h-5" />
                       </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-gold mb-3 uppercase tracking-widest font-display">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Bookmark className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-medium font-serif mb-2.5 group-hover:text-gold transition-colors leading-snug text-ivory line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gold/80 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans font-light">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs font-display font-semibold text-ivory/60 uppercase tracking-[0.2em] group-hover:text-ivory transition-colors">
                    Read Article <ArrowRight className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold transition-colors" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
