sed -i '1111,1137c\
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4 px-1">\
                      <div className="flex bg-zinc-100/50 p-1 rounded-xl shadow-inner border border-zinc-200 overflow-x-auto hide-scrollbar w-full sm:w-auto">\
                        {(Object.entries(ROOMS) as [keyof typeof ROOMS, any][]).map(([id, info]) => (\
                          <button \
                            key={id} \
                            onClick={() => { setActiveRoom(id); setActiveSurf(info.surfs[0]); }} \
                            className={`px-4 py-2 font-display font-semibold uppercase tracking-wider text-[10px] rounded-lg transition-all flex-1 sm:flex-none whitespace-nowrap ${activeRoom === id ? '"'bg-white text-gold shadow-sm border border-zinc-200/60 scale-100'"' : '"'text-ivory/60 hover:text-ivory hover:bg-zinc-50/50 border border-transparent'"'}`}\
                          >\
                            {info.name}\
                          </button>\
                        ))}\
                      </div>\
                      <div className="flex items-center gap-2 shrink-0">\
                        <button \
                          onClick={() => exportElementAsImage('"interactive-2d-showroom"', `rainbowpaint-room-${activeRoom}-${Date.now()}.png`)}\
                          className="px-3.5 py-2 font-display font-semibold uppercase tracking-widest text-[9px] sm:text-[10px] rounded-lg transition-all border border-zinc-200 bg-white text-ivory hover:bg-zinc-50 hover:text-gold flex items-center gap-1.5 shadow-sm"\
                        >\
                          <Share2 className="w-3 h-3" /> Share\
                        </button>\
                        <button \
                          onClick={handleReset}\
                          className="px-3.5 py-2 font-display font-semibold uppercase tracking-widest text-[9px] sm:text-[10px] rounded-lg transition-all border border-zinc-200 bg-white text-ivory hover:bg-zinc-50 hover:text-gold flex items-center gap-1.5 shadow-sm"\
                        >\
                          <RefreshCcw className="w-3 h-3" /> Reset\
                        </button>\
                      </div>\
                    </div>\
' src/components/VisualizerSection.tsx
