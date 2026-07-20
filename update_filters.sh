sed -i '2075,2150c\
                {/* Brand & Family Filters */}\
                <div className="flex flex-col gap-3">\
                  <div className="flex flex-col gap-1.5">\
                    <span className="text-[10px] text-ivory/60 font-semibold uppercase tracking-widest px-1">Brand</span>\
                    <div className="flex flex-wrap gap-1.5">\
                      {BRANDS.map(b => (\
                        <button\
                          key={b.id}\
                          onClick={() => setSBrand(b.id)}\
                          className={`px-3.5 focus:outline-none py-1.5 font-sans font-semibold uppercase tracking-widest text-[9px] sm:text-[10px] rounded-full transition-all border ${sBrand === b.id ? '"'bg-gold text-white border-transparent shadow-md scale-102 font-bold'"' : '"'bg-transparent border-zinc-200 text-ivory/60 hover:text-gold hover:border-gold/30 hover:bg-gold/5'"'}`}\
                        >\
                          {b.id === '"'all'"' ? '"'All'"' : b.label}\
                        </button>\
                      ))}\
                    </div>\
                  </div>\
                  <div className="flex flex-col gap-1.5 overflow-hidden">\
                    <span className="text-[10px] text-ivory/60 font-semibold uppercase tracking-widest px-1">Color Family</span>\
                    <div className="flex overflow-x-auto pb-2 -mb-2 gap-1.5 hide-scrollbar">\
                      {FAMILIES.map(f => (\
                        <button\
                          key={f}\
                          onClick={() => setSFamily(f)}\
                          className={`px-3.5 shrink-0 whitespace-nowrap focus:outline-none py-1.5 font-sans font-semibold uppercase tracking-widest text-[9px] sm:text-[10px] rounded-full transition-all border ${sFamily === f ? '"'bg-gold text-white border-transparent shadow-md scale-102 font-bold'"' : '"'bg-transparent border-zinc-200 text-ivory/60 hover:text-gold hover:border-gold/30 hover:bg-gold/5'"'}`}\
                        >\
                          {f === '"'all'"' ? '"'All'"' : f}\
                        </button>\
                      ))}\
                    </div>\
                  </div>\
                </div>\
' src/components/VisualizerSection.tsx
