import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, Palette, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom precision SVG icons matching the exact uploaded design mockup
const DeliveryScooterIcon = ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-[#C59B47]" }: { className?: string }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Parcel Delivery Box on Rear Rack */}
    <rect x="5" y="16" width="13" height="13" rx="2" fill="none" />
    <path d="M9 22.5h5" />
    {/* Scooter Chassis & Floorboard */}
    <path d="M18 24h6l6 8h4" />
    <path d="M25 24l5-13h6" />
    {/* Steering Handlebars */}
    <path d="M33 11h7" />
    {/* Front Cowl / Shield */}
    <path d="M30 20l4.5 10" />
    {/* Front & Rear Wheels */}
    <circle cx="13" cy="35" r="5" fill="none" />
    <circle cx="37" cy="35" r="5" fill="none" />
  </svg>
);

const ColorFanSwatchIcon = ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-[#C59B47]" }: { className?: string }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Fanned Paint Deck Blades */}
    <path d="M24 38L11 17a6 6 0 0 1 8.5-8.5l14.5 14.5" />
    <path d="M24 38L19 11a6 6 0 0 1 12 0l-4 19" />
    <path d="M24 38l13-14.5a6 6 0 0 1 8.5 8.5L31 38" />
    {/* Color segment dividers */}
    <path d="M15 22l4-2" />
    <path d="M21 18l4-1" />
    <path d="M33 25l3 3" />
    {/* Swatch Pivot Screw */}
    <circle cx="24" cy="38" r="2.5" fill="currentColor" />
  </svg>
);

const VerifiedShieldIcon = ({ className = "w-6 h-6 sm:w-7 sm:h-7 text-[#C59B47]" }: { className?: string }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Crest / Shield */}
    <path d="M24 6l15 6v12c0 10.5-6.5 17-15 20C15.5 41 9 34.5 9 24V12l15-6z" />
    {/* Checkmark inside Shield */}
    <path d="M17.5 24.5l4.5 4.5 8.5-9.5" />
  </svg>
);

export default function Hero() {
  return (
    <section 
      aria-label="Skip the Trip, We Deliver - Coimbatore Paint Store"
      className="relative w-full overflow-hidden bg-[#FAF6F0] pt-[76px] sm:pt-[88px] lg:pt-[96px] xl:pt-[104px] pb-4 sm:pb-6 lg:pb-0"
    >
      {/* Warm Plaster Wall Architectural Backdrop with Soft Window Sunlight Shadows */}
      <div 
        className="absolute inset-0 pointer-events-none select-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 20% 25%, rgba(255, 255, 255, 0.95) 0%, rgba(250, 246, 240, 0.65) 60%, rgba(246, 239, 230, 0.85) 100%),
            linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(245, 238, 228, 0.3) 50%, rgba(240, 232, 220, 0.5) 100%)
          `
        }}
      />

      {/* Subtle sunlight window shadow diagonal rays on the cream wall */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          background: `
            repeating-linear-gradient(
              130deg,
              rgba(235, 225, 212, 0.35) 0px,
              rgba(235, 225, 212, 0.35) 45px,
              rgba(255, 255, 255, 0) 45px,
              rgba(255, 255, 255, 0) 130px
            )
          `
        }}
      />

      {/* Subtle Light Wood Plank Floor Transition Along the Bottom */}
      <div 
        className="absolute bottom-0 inset-x-0 h-12 sm:h-20 lg:h-28 pointer-events-none opacity-50"
        style={{
          background: 'linear-gradient(to top, rgba(225, 203, 180, 0.45) 0%, rgba(243, 233, 222, 0.2) 60%, transparent 100%)'
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 w-full">


        {/* Main Hero Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] xl:min-h-[620px] py-2 lg:py-4">
          
          {/* ================= LEFT COLUMN: Value Proposition & CTAs ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            


            {/* EST. 2001 • 25+ years of trust badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C59B47]/10 border border-[#C59B47]/40 mb-3"
            >
              <span className="text-xs font-sans font-bold text-[#966E26] tracking-widest uppercase">
                EST. 2001 • 25+ years of trust
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center lg:items-start"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[84px] font-sans font-black italic tracking-tight text-[#0B2847] leading-[1.05]">
                Skip the Trip.
              </h1>

              {/* "We Deliver." with authentic golden ochre textured paintbrush stroke */}
              <div className="relative inline-block mt-2 sm:mt-3">
                {/* SVG Textured Paint Brushstroke Graphic with Ragged Bristle Ends */}
                <svg
                  viewBox="0 0 540 92"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full -z-10 pointer-events-none drop-shadow-sm select-none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="brushGoldHero" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#BA8634" />
                      <stop offset="35%" stopColor="#C7963E" />
                      <stop offset="70%" stopColor="#BD8A35" />
                      <stop offset="100%" stopColor="#A87522" />
                    </linearGradient>
                  </defs>
                  {/* Thick painterly horizontal stroke */}
                  <path
                    d="M14 20 C32 15 62 13 105 12 C210 10 375 11 470 14 C490 15 512 17 528 20 C538 22 537 25 533 28 C526 31 515 32 538 35 C523 39 498 40 531 43 C513 47 488 48 517 52 C498 56 482 58 506 61 C488 65 460 67 435 69 C355 74 215 76 110 75 C60 74 25 70 14 63 C6 58 4 51 4 42 C4 31 6 23 14 20 Z"
                    fill="url(#brushGoldHero)"
                  />
                  {/* Dry brush bristle tails on the right edge */}
                  <path
                    d="M500 24 Q528 26 538 27 M505 34 Q533 37 539 39 M495 45 Q525 47 534 50 M488 56 Q515 59 524 61"
                    stroke="url(#brushGoldHero)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Live white text over the brush stroke */}
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[84px] font-sans font-black italic tracking-tight text-white leading-[1.05] px-5 sm:px-7 py-1 sm:py-1.5 block drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]">
                  We Deliver.
                </span>
              </div>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base xl:text-[17px] text-slate-700 font-sans font-normal leading-relaxed max-w-md sm:max-w-lg lg:max-w-xl px-2 sm:px-0"
            >
              Order paints, primers, putty and painting essentials online and get it at your doorstep in Coimbatore.
            </motion.p>

            {/* 3-Column Value Proposition Strip with Hairline Dividers */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-4 sm:mt-5 w-full max-w-sm sm:max-w-md lg:max-w-lg"
            >
              {/* Desktop Horizontal Row Layout */}
              <div className="hidden sm:flex items-center justify-between py-1.5 border-y sm:border-y-0 border-zinc-200/80">
                {/* Prop 1: Delivery in 60 Minutes* */}
                <div className="flex items-center gap-2.5 pr-3 xl:pr-5">
                  <div className="shrink-0 text-[#C59B47]">
                    <DeliveryScooterIcon className="w-7 h-7 xl:w-8 xl:h-8" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs xl:text-[13px] font-sans font-bold text-[#0B2847] leading-tight">
                      Delivery in
                    </span>
                    <span className="mt-0.5 inline-block bg-[#BA8535] text-white text-[10px] xl:text-[11px] font-sans font-bold px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
                      60 Minutes*
                    </span>
                  </div>
                </div>

                <div className="h-8 w-px bg-zinc-300/80 shrink-0" aria-hidden="true" />

                {/* Prop 2: 5,000+ Colours */}
                <div className="flex items-center gap-2.5 px-3 xl:px-5">
                  <div className="shrink-0 text-[#C59B47]">
                    <ColorFanSwatchIcon className="w-7 h-7 xl:w-8 xl:h-8" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs xl:text-sm font-sans font-black text-[#0B2847] leading-tight">
                      5,000+
                    </span>
                    <span className="text-[11px] xl:text-xs font-sans font-medium text-[#0B2847] leading-tight">
                      Colours
                    </span>
                  </div>
                </div>

                <div className="h-8 w-px bg-zinc-300/80 shrink-0" aria-hidden="true" />

                {/* Prop 3: Top Paint Brands */}
                <div className="flex items-center gap-2.5 pl-3 xl:pl-5">
                  <div className="shrink-0 text-[#C59B47]">
                    <VerifiedShieldIcon className="w-7 h-7 xl:w-8 xl:h-8" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs xl:text-sm font-sans font-black text-[#0B2847] leading-tight">
                      Top
                    </span>
                    <span className="text-[11px] xl:text-xs font-sans font-medium text-[#0B2847] leading-tight whitespace-nowrap">
                      Paint Brands
                    </span>
                  </div>
                </div>
              </div>

              {/* Mobile 3-Column Centered Grid Layout */}
              <div className="grid grid-cols-3 divide-x divide-zinc-200 sm:hidden py-1">
                {/* Item 1 */}
                <div className="flex flex-col items-center text-center px-1">
                  <DeliveryScooterIcon className="w-5 h-5 text-[#C59B47] mb-0.5" />
                  <span className="text-[10px] font-sans font-bold text-[#0B2847] leading-tight">
                    Delivery in
                  </span>
                  <span className="mt-0.5 bg-[#BA8535] text-white text-[8.5px] font-sans font-bold px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
                    60 Minutes*
                  </span>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col items-center text-center px-1">
                  <ColorFanSwatchIcon className="w-5 h-5 text-[#C59B47] mb-0.5" />
                  <span className="text-[11px] font-sans font-black text-[#0B2847] leading-tight">
                    5,000+
                  </span>
                  <span className="text-[10px] font-sans font-medium text-[#0B2847] leading-tight">
                    Colours
                  </span>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col items-center text-center px-1">
                  <VerifiedShieldIcon className="w-5 h-5 text-[#C59B47] mb-0.5" />
                  <span className="text-[11px] font-sans font-black text-[#0B2847] leading-tight">
                    Top
                  </span>
                  <span className="text-[10px] font-sans font-medium text-[#0B2847] leading-tight whitespace-nowrap">
                    Paint Brands
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 2 CTA Pill Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 sm:mt-5 flex flex-row items-center flex-nowrap gap-2 sm:gap-3 w-full sm:w-auto whitespace-nowrap"
            >
              {/* Primary CTA: Shop Now */}
              <Link
                to="/buy-paint-online"
                className="bg-[#BA8535] hover:bg-[#a3722b] text-white font-sans font-bold rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-md hover:shadow-xl flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm shrink-0"
              >
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </Link>

              {/* Secondary CTA: Explore Colours */}
              <Link
                to="/visualizer"
                className="bg-white hover:bg-slate-50 text-[#0B2847] border-2 border-[#0B2847] font-sans font-bold rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-xs sm:text-sm shrink-0"
              >
                <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Explore Colours</span>
              </Link>
            </motion.div>

            {/* Desktop Subtle Footnote */}
            <p className="hidden lg:block text-[10px] text-slate-500 font-sans mt-3">
              *For eligible locations and products in Coimbatore, subject to availability.
            </p>

            {/* Mobile Product Showcase Image (renders directly under CTA buttons) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="w-full mt-3 sm:mt-4 flex flex-col items-center lg:hidden"
            >
              <img
                src="/assets/aistudio/779ae9cc-47b0-43a1-8427-d07c913a49cd_c3eb3e9e.webp"
                alt="60 Mins Delivery in Coimbatore - Paint Delivery Truck and Products"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="1024"
                height="768"
                className="w-full max-w-[380px] sm:max-w-[440px] h-auto object-contain select-none pointer-events-none drop-shadow-md"
              />
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-sans text-center mt-1.5 px-2">
                *For eligible locations and products, subject to availability.
              </p>
            </motion.div>

          </div>

          {/* ================= RIGHT COLUMN (Desktop): Premium Paint Buckets Showcase Image ================= */}
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 relative w-full h-full items-end justify-end">
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full relative flex items-end justify-end"
            >
              <img
                src="/assets/aistudio/779ae9cc-47b0-43a1-8427-d07c913a49cd_c3eb3e9e.webp"
                alt="60 Mins Delivery in Coimbatore - Paint Delivery Truck and Products"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="1024"
                height="768"
                className="w-full max-w-[760px] lg:max-w-[860px] xl:max-w-[980px] h-auto object-contain object-bottom select-none pointer-events-none drop-shadow-xl"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
