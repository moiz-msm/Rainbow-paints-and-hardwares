const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Fix buttons layout
content = content.replace(
  'className="mt-8 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-4"',
  'className="mt-8 sm:mt-10 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-3 sm:gap-4"'
);

// Fix trust badges layout
const oldBadges = `<motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-10"
                  >
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <PackageOpen className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold" />
                        <span className="text-ivory font-bold text-sm sm:text-lg">200+</span>
                      </div>
                      <span className="text-ivory/80 text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1 text-center lg:text-left">Products</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[10px] font-sans mt-0.5 text-center lg:text-left">From top brands only</span>
                    </div>
                    
                    <div className="h-8 sm:h-10 w-px bg-ivory/10"></div>
                    
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Palette className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold" />
                        <span className="text-ivory font-bold text-sm sm:text-lg">5000+</span>
                      </div>
                      <span className="text-ivory/80 text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1 text-center lg:text-left">Shades</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[10px] font-sans mt-0.5 text-center lg:text-left">To choose from</span>
                    </div>

                    <div className="h-8 sm:h-10 w-px bg-ivory/10"></div>
                    
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Truck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold" />
                        <span className="text-ivory font-bold text-sm sm:text-lg">Doorstep</span>
                      </div>
                      <span className="text-ivory/80 text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1 text-center lg:text-left">Delivery</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[10px] font-sans mt-0.5 text-center lg:text-left">Pan India</span>
                    </div>

                    <div className="h-8 sm:h-10 w-px bg-ivory/10"></div>
                    
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Tags className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold" />
                        <span className="text-ivory font-bold text-sm sm:text-lg">Best</span>
                      </div>
                      <span className="text-ivory/80 text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1 text-center lg:text-left">Pricing</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[10px] font-sans mt-0.5 text-center lg:text-left">Same as in-store</span>
                    </div>
                  </motion.div>`;

const currentBadges = `<motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-10"
                  >
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-2">
                        <PackageOpen className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                        <span className="text-ivory font-bold text-base sm:text-lg">200+</span>
                      </div>
                      <span className="text-ivory/80 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1">Products</span>
                      <span className="text-ivory/50 text-[9px] sm:text-[10px] font-sans mt-0.5">From top brands only</span>
                    </div>
                    
                    <div className="h-10 w-px bg-ivory/10 hidden sm:block"></div>
                    
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                        <span className="text-ivory font-bold text-base sm:text-lg">5000+</span>
                      </div>
                      <span className="text-ivory/80 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1">Shades</span>
                      <span className="text-ivory/50 text-[9px] sm:text-[10px] font-sans mt-0.5">To choose from</span>
                    </div>

                    <div className="h-10 w-px bg-ivory/10 hidden md:block lg:hidden xl:block"></div>
                    
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                        <span className="text-ivory font-bold text-base sm:text-lg">Doorstep</span>
                      </div>
                      <span className="text-ivory/80 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1">Delivery</span>
                      <span className="text-ivory/50 text-[9px] sm:text-[10px] font-sans mt-0.5">Pan India</span>
                    </div>

                    <div className="h-10 w-px bg-ivory/10 hidden sm:block"></div>
                    
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="flex items-center gap-2">
                        <Tags className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                        <span className="text-ivory font-bold text-base sm:text-lg">Best</span>
                      </div>
                      <span className="text-ivory/80 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1">Pricing</span>
                      <span className="text-ivory/50 text-[9px] sm:text-[10px] font-sans mt-0.5">Same as in-store</span>
                    </div>
                  </motion.div>`;

content = content.replace(currentBadges, oldBadges);

// Replace sizes and text to make it fit in one line
const newBadges = `<motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-8 sm:mt-10 grid grid-cols-4 divide-x divide-ivory/10 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:justify-start lg:gap-8 w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto lg:mx-0"
                  >
                    <div className="flex flex-col items-center lg:items-start px-2 lg:px-0">
                      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                        <PackageOpen className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold hidden sm:block" />
                        <span className="text-ivory font-bold text-[11px] sm:text-lg">200+</span>
                      </div>
                      <span className="text-ivory/80 text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1 text-center lg:text-left whitespace-nowrap">Products</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[10px] font-sans mt-0.5 text-center lg:text-left hidden sm:block">From top brands</span>
                    </div>
                    
                    <div className="flex flex-col items-center lg:items-start px-2 lg:px-0">
                      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                        <Palette className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold hidden sm:block" />
                        <span className="text-ivory font-bold text-[11px] sm:text-lg">5000+</span>
                      </div>
                      <span className="text-ivory/80 text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1 text-center lg:text-left whitespace-nowrap">Shades</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[10px] font-sans mt-0.5 text-center lg:text-left hidden sm:block">To choose from</span>
                    </div>
                    
                    <div className="flex flex-col items-center lg:items-start px-2 lg:px-0">
                      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                        <Truck className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold hidden sm:block" />
                        <span className="text-ivory font-bold text-[11px] sm:text-lg">Doorstep</span>
                      </div>
                      <span className="text-ivory/80 text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1 text-center lg:text-left whitespace-nowrap">Delivery</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[10px] font-sans mt-0.5 text-center lg:text-left hidden sm:block">Pan India</span>
                    </div>
                    
                    <div className="flex flex-col items-center lg:items-start px-2 lg:px-0">
                      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                        <Tags className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold hidden sm:block" />
                        <span className="text-ivory font-bold text-[11px] sm:text-lg">Best</span>
                      </div>
                      <span className="text-ivory/80 text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.1em] mt-1 text-center lg:text-left whitespace-nowrap">Pricing</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[10px] font-sans mt-0.5 text-center lg:text-left hidden sm:block">Same as in-store</span>
                    </div>
                  </motion.div>`;

content = content.replace(currentBadges, newBadges);

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
console.log("Patched hero!");
