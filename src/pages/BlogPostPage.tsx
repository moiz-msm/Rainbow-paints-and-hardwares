import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar, Bookmark, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import LuxuryBackground from '../components/LuxuryBackground';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => {
    return blogPosts.find((p) => p.slug === slug);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <LuxuryBackground />
      <main className="min-h-screen pb-20 relative z-10">
        <SEO 
          title={`${post.title} | Rainbow Paints`}
          description={post.excerpt}
          keywords={post.seoKeywords.join(", ")}
          schema={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Rainbow Paints and Hardwares"
            },
            "datePublished": new Date(post.date).toISOString(),
            "url": `https://rainbowpaints.in/blog/${post.slug}`
          }}
        />

        <article className="pt-24 md:pt-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-xs font-display font-semibold text-ivory/60 hover:text-ivory tracking-[0.2em] uppercase transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Blog
            </Link>

            <header className="mb-10 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[10px] text-gold uppercase tracking-widest font-display mb-6">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-medium text-ivory/90">{post.category}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                <span className="flex items-center gap-1.5"><Bookmark className="w-3.5 h-3.5" />{post.readTime}</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium font-serif tracking-tight text-ivory mb-6 leading-tight uppercase">
                {post.title}
              </h1>
              
              <p className="text-lg md:text-xl text-gold/80 leading-relaxed font-sans font-light border-l border-gold pl-6 py-2">
                {post.excerpt}
              </p>
            </header>
          </div>

          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="aspect-[21/9] rounded-[2rem] overflow-hidden bg-royale-surface border border-zinc-200/20 shadow-2xl">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-ivory/80 font-light leading-relaxed">
              <Markdown 
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-4xl mt-12 mb-6 font-serif font-medium text-ivory tracking-wide" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-3xl mt-10 mb-5 font-serif font-medium text-ivory tracking-wide" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-2xl mt-8 mb-4 font-serif font-medium text-ivory tracking-wide" {...props} />,
                  h4: ({node, ...props}) => <h4 className="text-xl mt-6 mb-3 font-serif font-medium text-ivory tracking-wide" {...props} />,
                  p: ({node, ...props}) => <p className="mb-6" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-ivory/80" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-ivory/80" {...props} />,
                  li: ({node, ...props}) => <li className="marker:text-gold" {...props} />,
                  a: ({node, href, ...props}) => {
                    if (href?.startsWith('/')) {
                      return <Link to={href} className="text-gold hover:text-gold/80 hover:underline font-medium" {...props as any} />
                    }
                    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 hover:underline font-medium" {...props} />
                  },
                  img: ({node, ...props}) => <img className="rounded-2xl shadow-2xl my-10 object-cover w-full max-h-[500px]" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-12 border-zinc-200/20" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-ivory" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gold pl-4 italic my-6 text-ivory/70" {...props} />
                }}
              >
                {post.content}
              </Markdown>
            </div>

            <div className="mt-16 pt-8 border-t border-zinc-200/20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-xl font-serif text-gold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-serif text-ivory">{post.author}</h4>
                  <p className="text-gold/60 text-xs font-display tracking-widest uppercase">Color Specialist</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Tag className="w-4 h-4 text-ivory/40 mt-1" />
              {post.seoKeywords.map((keyword, index) => (
                <span key={index} className="px-4 py-1.5 bg-royale-surface border border-zinc-200/10 rounded-full text-[10px] font-display uppercase tracking-widest text-ivory/60">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </article>
        
        {/* Call to action section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="bg-royale-surface border border-gold/20 rounded-[2rem] p-8 md:p-14 text-center overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />
            
            <h3 className="text-2xl md:text-3xl font-serif text-ivory mb-4 relative z-10 uppercase tracking-wide">Ready to Transform Your Space?</h3>
            <p className="text-gold/80 mb-10 max-w-xl mx-auto relative z-10 font-light text-sm md:text-base leading-relaxed">
              Our specialists at Rainbow Paints are here to help you select the exact right products based on weather, budget, and design aspirations.
            </p>
            <Link to="/buy-paint-online" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-royale-bg font-display font-bold uppercase tracking-[0.2em] text-xs rounded-full hover:bg-ivory hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gold/20 relative z-10">
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
