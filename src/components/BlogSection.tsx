import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Bookmark, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

export default function BlogSection() {
  const recentPosts = blogPosts.slice(0, 3);
  
  return (
    <section id="blog" className="py-12 sm:py-20 lg:py-24 border-t border-gold/10 relative overflow-hidden bg-gradient-to-b from-white/60 to-royale-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-4 mb-6"
        >
          <div className="max-w-xl">
            <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 uppercase tracking-tight leading-tight text-center text-ivory">Rainbow Paint <span className="text-gradient italic">Blog</span></h2>
            <p className="text-gold text-[10px] sm:text-xs font-sans font-light text-center">Expert advice, design inspiration, and technical guides from the pros at Rainbow Paints.</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {recentPosts.map((post, idx) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-zinc-200/20 bg-royale-surface shadow-lg">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-royale-bg/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-display font-bold uppercase tracking-[0.2em] text-gold border border-gold/20 shadow-sm">
                    {post.category}
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                     <div className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-royale-bg shadow-xl scale-90 group-hover:scale-100">
                        <PlayCircle className="w-4 h-4" />
                     </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[9px] text-gold mb-2 uppercase tracking-widest font-display">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Bookmark className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <h3 className="text-sm font-medium font-serif mb-1.5 group-hover:text-gold transition-colors leading-snug text-ivory line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gold text-[10px] sm:text-[11px] leading-relaxed line-clamp-2 font-sans font-light">
                  {post.excerpt}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/blog" className="flex items-center gap-2 px-6 py-2.5 border border-zinc-200/30 rounded-full hover:bg-black/20 transition-all font-display font-semibold text-[10px] text-ivory/80 hover:text-ivory tracking-[0.2em] uppercase hover:border-gold/30 hover:scale-105 active:scale-95 shadow-lg shadow-black/20">
            View All Blog Posts <ArrowRight className="w-3.5 h-3.5 text-gold/60" />
          </Link>
        </div>
      </div>
    </section>
  );
}
