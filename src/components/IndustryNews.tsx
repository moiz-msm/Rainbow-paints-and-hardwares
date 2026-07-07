import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Calendar } from 'lucide-react';

interface NewsArticle {
  title: string;
  snippet: string;
  url: string;
  source: string;
  date: string;
}

export default function IndustryNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
      } catch (err: any) {
        setError(err.message || 'Could not load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !news.length) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 border-t border-gold/10 relative z-10 bg-gradient-to-b from-royale-surface to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
            <Newspaper className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-ivory uppercase tracking-wide">
              Industry <span className="text-gradient italic">News & Trends</span>
            </h2>
            <p className="text-gold/80 text-xs sm:text-sm font-light mt-1">
              Latest updates from the world of painting and hardware.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, idx) => (
            <motion.a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group block bg-royale-bg border border-zinc-200/10 p-6 rounded-2xl hover:border-gold/30 transition-colors shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] text-gold uppercase tracking-widest font-display bg-gold/10 px-2 py-1 rounded-full">
                  {article.source || 'Industry News'}
                </span>
                <ExternalLink className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-medium font-serif mb-3 text-ivory group-hover:text-gold transition-colors leading-snug line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gold/70 text-xs leading-relaxed line-clamp-3 mb-4 font-sans font-light">
                {article.snippet}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-gold/50">
                <Calendar className="w-3 h-3" />
                {new Date(article.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) !== 'Invalid Date' ? new Date(article.date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : article.date}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
