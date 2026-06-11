import React from 'react';
import { Info } from 'lucide-react';
import SEO from '../components/SEO';

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Rainbow Paints & Hardware",
      "foundingDate": "2001",
      "description": "Trusted destination for paints, coatings, hardware, and expert painting solutions in Coimbatore since 2001.",
      "url": "https://rainbowpaint.in",
      "logo": "https://rainbowpaint.in/Logo.jpg"
    }
  };

  return (
    <article className="pt-24 pb-20 bg-royale-bg min-h-screen">
      <SEO 
        title="About Us | Rainbow Paints & Hardwares" 
        description="Learn about Rainbow Paints & Hardwares, Coimbatore's trusted destination for paints and hardware since 2001."
        url="https://rainbowpaint.in/about"
        schema={aboutSchema}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.4em] mb-4">
            <Info className="w-3 h-3" /> Our Story
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 uppercase tracking-tight leading-tight">
            Trusted Since <span className="text-gradient">2001</span>
          </h1>
          <p className="text-gold text-sm sm:text-base font-light italic max-w-2xl">
            Welcome to Rainbow Paints & Hardware — Coimbatore’s trusted destination for paints, coatings, hardware, and expert painting solutions.
          </p>
        </div>

        {/* Content Section */}
        <div className="max-w-3xl space-y-8 text-ivory/80 leading-relaxed font-sans text-sm sm:text-base">
          <div className="space-y-4">
            <p>
              What started as a local paint store has grown into a trusted name with 3 branches across Coimbatore, serving industries, contractors, painting professionals, and homeowners with quality products and dependable service. Over the years, we have proudly become authorized dealers of leading brands like Berger Paints and Asian Paints, offering genuine products at competitive prices.
            </p>
            <p>
              At Rainbow Paints & Hardware, we believe buying paint should be simple and reliable. For years, we have been delivering paints directly to our customers’ doorsteps, helping contractors, businesses, and homeowners get materials quickly and hassle-free.
            </p>
          </div>

          <div className="bg-white shadow-sm border border-zinc-200 p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors duration-700" />
            <h2 className="text-zinc-900 font-serif text-xl mb-4 uppercase tracking-wider">The Digital Transition</h2>
            <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
              <p className="italic flex-1 text-zinc-700">
                Today, we are bringing the same trusted experience online — making it easier than ever to order paints, hardware, and related products from the comfort of your home or workplace. Our online store is built with one goal: to give you the same trusted in-store pricing, expert guidance, and convenient doorstep delivery you would receive by visiting any of our branches.
              </p>
              <div className="w-full md:w-1/2 lg:w-2/5 shrink-0 rounded-xl overflow-hidden border border-zinc-100 shadow-md">
                <img 
                  src="/Store-front.jpg" 
                  alt="Rainbow Paint & Hardwares Physical Store" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-video sm:aspect-square md:aspect-[4/3] hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-ivory font-serif text-xl uppercase tracking-wider mt-12">What Sets Us Apart</h2>
            <p>
              What truly sets us apart is our technical expertise and product knowledge. Whether you need help choosing the right wall finish, industrial coating, waterproofing solution, wood coating, or painting accessories, our experienced team is here to guide you with practical, honest advice.
            </p>
            <p>
              For over 20+ years, Rainbow Paints & Hardware has been built on trust, genuine products, expert service, and lasting customer relationships.
            </p>
          </div>

          <div className="pt-10 border-t border-zinc-200">
            <p className="text-ivory font-serif text-lg tracking-wide uppercase">
              Rainbow Paints & Hardware — Trusted Since 2001. Now Delivering Online, Right to Your Doorstep.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
