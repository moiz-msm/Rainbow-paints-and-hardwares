import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Bookmark,
  Tag,
  CheckCircle2,
  ShieldCheck,
  FlaskConical,
  ChevronDown,
  ChevronRight,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import type { BlogPost } from '../data/blogPosts';

interface InformationalBlogTemplateProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

export default function InformationalBlogTemplate({
  post,
  relatedPosts = [],
}: InformationalBlogTemplateProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const cta = post.cta || {
    title: 'Source Genuine Industrial Thinners & Coatings at Wholesale Prices',
    subtitle:
      'Order factory-sealed Berger Protecton and MRF Vapocure thinners, 2K epoxy primers, and polyurethane finishes directly from our authorised industrial counter in Coimbatore.',
    primaryLabel: 'Shop Thinners & Solvents',
    primaryHref: '/c/thinners-&-solvents',
    secondaryLabel: 'Browse Industrial Coatings',
    secondaryHref: '/c/industrial-paint-and-coatings',
  };

  return (
    <article className="pt-24 md:pt-32">
      {/* Breadcrumb + Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[11px] font-display uppercase tracking-[0.16em] text-ivory/60 mb-6"
        >
          <Link to="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-gold/70" />
          <Link to="/blog" className="hover:text-gold transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3 h-3 text-gold/70" />
          <span className="text-gold font-semibold">{post.category}</span>
        </nav>

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-display font-semibold text-ivory/60 hover:text-ivory tracking-[0.2em] uppercase transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to All Articles
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gold uppercase tracking-widest font-display mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-royale-surface border border-gold/30 rounded font-semibold text-ivory">
              <FlaskConical className="w-3.5 h-3.5 text-gold" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-ivory/70">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-ivory/70">
              <Bookmark className="w-3.5 h-3.5 text-gold" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium font-serif tracking-tight text-ivory mb-6 leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-ivory/80 leading-relaxed font-sans font-normal border-l-4 border-gold pl-5 py-1.5 max-w-4xl">
            {post.excerpt}
          </p>
        </header>
      </div>

      {/* Hero Editorial Image */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-royale-surface border border-gold/20 shadow-xl">
          <img
            src={post.image}
            alt={post.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Executive Key Takeaways Box */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <section
            aria-label="Key Technical Takeaways"
            className="mb-12 rounded-2xl bg-royale-surface border border-gold/25 p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
              <h2 className="text-lg sm:text-xl font-serif font-semibold text-ivory tracking-wide uppercase">
                Key Technical Takeaways
              </h2>
            </div>
            <ul className="space-y-3">
              {post.keyTakeaways.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-base text-ivory/85 leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Main Long-Form SEO Content */}
        <div className="text-ivory/85 font-normal text-base sm:text-[17px] leading-[1.8]">
          <Markdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-3xl sm:text-4xl mt-12 mb-6 font-serif font-semibold text-ivory tracking-wide"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl sm:text-3xl mt-12 mb-5 font-serif font-semibold text-ivory tracking-wide pb-2 border-b border-gold/20"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl sm:text-2xl mt-9 mb-4 font-serif font-semibold text-ivory tracking-wide"
                  {...props}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  className="text-lg sm:text-xl mt-7 mb-3 font-serif font-semibold text-ivory"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => <p className="mb-6" {...props} />,
              ul: ({ node, ...props }) => (
                <ul className="list-disc pl-6 mb-6 space-y-2.5 text-ivory/85" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal pl-6 mb-6 space-y-2.5 text-ivory/85" {...props} />
              ),
              li: ({ node, ...props }) => <li className="marker:text-gold" {...props} />,
              a: ({ node, href, ...props }) => {
                if (href?.startsWith('/')) {
                  return (
                    <Link
                      to={href}
                      className="text-ivory underline decoration-gold decoration-2 underline-offset-4 hover:text-gold font-semibold transition-colors"
                      {...(props as any)}
                    />
                  );
                }
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory underline decoration-gold decoration-2 underline-offset-4 hover:text-gold font-semibold transition-colors"
                    {...props}
                  />
                );
              },
              img: ({ node, ...props }) => (
                <img
                  referrerPolicy="no-referrer"
                  className="rounded-2xl shadow-lg my-10 object-cover w-full max-h-[480px] border border-gold/15"
                  {...props}
                />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-12 border-gold/20" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-semibold text-ivory" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-gold bg-royale-surface/80 rounded-r-xl px-5 py-4 italic my-7 text-ivory/85"
                  {...props}
                />
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>

        {/* Technical Compatibility Matrix */}
        {post.comparisonTable && (
          <section className="my-14" aria-label={post.comparisonTable.title}>
            <div className="mb-5">
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-ivory tracking-wide">
                {post.comparisonTable.title}
              </h2>
              {post.comparisonTable.subtitle && (
                <p className="text-sm sm:text-base text-ivory/70 mt-2">
                  {post.comparisonTable.subtitle}
                </p>
              )}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gold/25 bg-white shadow-sm">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="bg-ivory text-white">
                    {post.comparisonTable.headers.map((header, idx) => (
                      <th
                        key={idx}
                        className="py-3.5 px-4 text-xs font-display font-semibold uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/15 text-sm">
                  {post.comparisonTable.rows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={rIdx % 2 === 0 ? 'bg-white' : 'bg-royale-surface/60'}
                    >
                      {row.cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-3.5 px-4 align-top leading-relaxed ${
                            cIdx === 0 ? 'font-semibold text-ivory' : 'text-ivory/80'
                          }`}
                        >
                          {cIdx === 1 && row.linkHref ? (
                            <Link
                              to={row.linkHref}
                              className="text-ivory font-semibold underline decoration-gold decoration-2 underline-offset-4 hover:text-gold transition-colors"
                            >
                              {row.linkText || cell}
                            </Link>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* Shoppable Featured Industrial Thinners & Products Grid */}
      {post.featuredProducts && post.featuredProducts.length > 0 && (
        <section
          aria-label="Featured Professional-Grade Thinners"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-16"
        >
          <div className="rounded-2xl bg-royale-surface border border-gold/25 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-display font-bold uppercase tracking-[0.2em] text-gold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Factory-Sealed OEM Solvents
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-ivory">
                  Recommended Berger &amp; MRF Industrial Thinners
                </h2>
                <p className="text-sm text-ivory/75 mt-1.5 max-w-2xl">
                  Order genuine industrial thinners matched to your epoxy, polyurethane, or melamine coating directly at wholesale dealer rates.
                </p>
              </div>
              <Link
                to="/c/thinners-&-solvents"
                className="inline-flex items-center gap-2 text-xs font-display font-bold uppercase tracking-[0.16em] text-ivory hover:text-gold transition-colors shrink-0"
              >
                View All Thinners <ArrowRight className="w-4 h-4 text-gold" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {post.featuredProducts.map((prod) => (
                <Link
                  key={prod.slug}
                  to={`/p/${prod.slug}`}
                  className="group flex flex-col bg-white rounded-xl border border-gold/20 overflow-hidden hover:border-gold hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square bg-royale-bg p-5 flex items-center justify-center overflow-hidden">
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-ivory text-white text-[10px] font-display font-semibold uppercase tracking-wider rounded">
                      {prod.badge}
                    </span>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-display font-bold uppercase tracking-[0.15em] text-gold mb-1">
                      {prod.brand} • {prod.packSizes}
                    </span>
                    <h3 className="text-base font-serif font-semibold text-ivory group-hover:text-gold transition-colors leading-snug mb-2">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-ivory/70 leading-relaxed mb-4 flex-1">
                      {prod.bestFor}
                    </p>
                    <div className="pt-3 border-t border-gold/15 flex items-center justify-between gap-2">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-ivory/50">
                          Wholesale From
                        </span>
                        <span className="text-base font-bold text-ivory">{prod.price}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-display font-bold uppercase tracking-wider text-gold group-hover:translate-x-0.5 transition-transform">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Buy
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technical FAQs Section (Matches FAQPage JSON-LD) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {post.faqs && post.faqs.length > 0 && (
          <section className="my-14" aria-label="Frequently Asked Technical Questions">
            <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-ivory tracking-wide mb-6">
              Frequently Asked Questions on Industrial Paint Thinners
            </h2>
            <div className="space-y-3">
              {post.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-gold/25 bg-white overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-royale-surface/60 transition-colors cursor-pointer"
                    >
                      <span className="font-serif font-semibold text-ivory text-base sm:text-lg leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-ivory/80 leading-relaxed border-t border-gold/10">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Author Card */}
        <div className="mt-14 pt-8 border-t border-gold/20">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-xl font-serif font-semibold text-ivory">
              {post.author.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-serif font-semibold text-ivory">{post.author}</h4>
              <p className="text-gold text-xs font-display font-semibold tracking-widest uppercase">
                {post.authorRole || 'Industrial & Protective Coatings Specialist'}
              </p>
            </div>
          </div>
        </div>

        {/* SEO Topic Tags */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <Tag className="w-4 h-4 text-gold shrink-0" />
          {post.seoKeywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3.5 py-1.5 bg-royale-surface border border-gold/20 rounded text-[11px] font-display font-medium text-ivory/75"
            >
              {keyword}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-gold/20">
            <h3 className="text-xl sm:text-2xl font-serif font-semibold text-ivory mb-6">
              Continue Reading
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {relatedPosts.slice(0, 2).map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="group p-5 rounded-xl bg-royale-surface border border-gold/20 hover:border-gold transition-colors"
                >
                  <span className="text-[10px] font-display font-bold uppercase tracking-widest text-gold">
                    {rp.category} • {rp.readTime}
                  </span>
                  <h4 className="text-base font-serif font-semibold text-ivory group-hover:text-gold transition-colors mt-1.5 mb-2 line-clamp-2">
                    {rp.title}
                  </h4>
                  <p className="text-xs text-ivory/70 line-clamp-2">{rp.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Industrial Conversion CTA Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-ivory text-white rounded-2xl p-8 md:p-14 text-center overflow-hidden relative shadow-xl border border-gold/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/15 blur-[90px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/10 blur-[90px] rounded-full pointer-events-none" />

          <h3 className="text-2xl md:text-3xl font-serif font-medium text-white mb-4 relative z-10">
            {cta.title}
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto relative z-10 font-light text-sm md:text-base leading-relaxed">
            {cta.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            <Link
              to={cta.primaryHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-white font-display font-bold uppercase tracking-[0.16em] text-xs rounded-lg hover:bg-white hover:text-ivory transition-all shadow-lg"
            >
              {cta.primaryLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {cta.secondaryLabel && cta.secondaryHref && (
              <Link
                to={cta.secondaryHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white border border-white/25 font-display font-bold uppercase tracking-[0.16em] text-xs rounded-lg hover:bg-white hover:text-ivory transition-all"
              >
                {cta.secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
