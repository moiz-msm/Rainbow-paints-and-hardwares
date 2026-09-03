import fs from 'fs';

let content = fs.readFileSync('src/components/PaintingServicesOverview.tsx', 'utf-8');

const oldRender = `<div className="w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.03)] border border-ivory/10 group-hover/cat:shadow-[0_8px_25px_rgb(0,0,0,0.08)] group-hover/cat:border-gold/40 transition-all duration-500 relative bg-white group-hover/cat:-translate-y-1">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/cat:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D]/80 via-transparent to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                       <ArrowRight className="w-5 h-5 text-white ml-auto -translate-x-2 opacity-0 group-hover/cat:opacity-100 group-hover/cat:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>`;

const newRender = `<div className={\`w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.03)] border border-ivory/10 group-hover/cat:shadow-[0_8px_25px_rgb(0,0,0,0.08)] group-hover/cat:border-gold/40 transition-all duration-500 relative group-hover/cat:-translate-y-1 flex items-center justify-center \${service.color.split(' ')[0]}\`}>
                    <service.icon className={\`w-12 h-12 sm:w-16 sm:h-16 \${service.color.split(' ')[1]} group-hover/cat:scale-110 transition-transform duration-500 ease-out\`} strokeWidth={1.5} />
                    <div className="absolute inset-0 bg-[#1A365D]/5 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                  </div>`;

content = content.replace(oldRender, newRender);

fs.writeFileSync('src/components/PaintingServicesOverview.tsx', content);
