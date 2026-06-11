import React from 'react';
import { Shade } from '../services/shadeService';

const SURF_LABELS: Record<string, string> = {
  back: 'Back Wall', left: 'Left/Accent', right: 'Right/Side',
  ceiling: 'Ceiling', floor: 'Floor', wall: 'Main Exterior',
  door: 'Front Door', roof: 'Canopy/Roof', pillars: 'Pillars/Trims', ground: 'Ground/Grass'
};

const ShadeLabel = ({ shade, x, y }: { shade?: Shade | null, x: number, y: number }) => {
  if (!shade) return null;
  return (
    <foreignObject x={x - 70} y={y - 18} width={140} height={36} className="pointer-events-none">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex flex-col items-center border border-white/20 drop-shadow-md">
          <span className="text-[9px] font-bold text-white truncate max-w-full text-center uppercase tracking-widest font-sans leading-none mb-0.5">
            {shade.name}
          </span>
          <span className="text-[7.5px] text-zinc-300 font-mono tracking-[0.2em] leading-none">
            {shade.shadeCode}
          </span>
        </div>
      </div>
    </foreignObject>
  );
};

interface Interactive2DShowroomProps {
  activeRoom: string;
  colors: Record<string, string>;
  activeSurf: string;
  onSurfClick: (surf: string) => void;
  appliedShades?: Record<string, Shade | null>;
}

export default function Interactive2DShowroom({
  activeRoom,
  colors,
  activeSurf,
  onSurfClick,
  appliedShades,
}: Interactive2DShowroomProps) {
  const isExterior = activeRoom.startsWith('exterior_');
  const [renderMode, setRenderMode] = React.useState<'accurate' | 'ambient'>('accurate');

  // Interactive surfaces list based on indoor/outdoor
  const surfs = isExterior
    ? ['wall', 'door', 'roof', 'pillars', 'ground']
    : ['back', 'left', 'right', 'ceiling', 'floor'];

  return (
    <div id="interactive-2d-showroom" className="w-full relative select-none flex flex-col bg-white border border-zinc-200/80 rounded-none sm:rounded-2xl shadow-md overflow-hidden">
      {/* 1. Cohesive Header Control Row */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#faf9f6]/95 text-zinc-900 border-b border-zinc-200 z-20">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
          </span>
          <div className="flex items-baseline gap-1 min-w-0">
            <span className="text-[9px] text-zinc-500 font-display font-medium uppercase tracking-wider whitespace-nowrap">Selected Area:</span>
            <span className="text-[11px] font-sans font-bold text-gold tracking-wide truncate">
              {SURF_LABELS[activeSurf] || activeSurf}
            </span>
          </div>
        </div>

        {/* Small Elegant Render Toggle */}
        <div className="flex items-center gap-0.5 bg-white p-0.5 rounded-md border border-zinc-200 shadow-xs">
          <button
            type="button"
            onClick={() => setRenderMode('accurate')}
            className={`px-2 py-0.5 rounded text-[8px] tracking-wider font-sans font-bold uppercase transition-all duration-200 ${
              renderMode === 'accurate'
                ? 'bg-gold text-white shadow-sm border border-transparent'
                : 'text-zinc-500 hover:text-gold hover:bg-gold/5'
            }`}
            title="Show actual solid flat paint shades with 100% precision"
          >
            Accurate
          </button>
          <button
            type="button"
            onClick={() => setRenderMode('ambient')}
            className={`px-2 py-0.5 rounded text-[8px] tracking-wider font-sans font-bold uppercase transition-all duration-200 ${
              renderMode === 'ambient'
                ? 'bg-gold text-white shadow-sm border border-transparent'
                : 'text-zinc-500 hover:text-gold hover:bg-gold/5'
            }`}
            title="Enable depth lighting/shadow modeling"
          >
            3D Depth
          </button>
        </div>
      </div>

      {/* Dynamic Lighting and Glow SVG Definition */}
      <svg className="w-0 h-0 absolute">
        <defs>
          {/* Ambient drop shadow for architectural layers */}
          <filter id="soft-shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
          </filter>
          <filter id="inset-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feOffset dx="0" dy="3"/>
            <feGaussianBlur stdDeviation="3" result="offset-blur"/>
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
            <feFlood floodColor="black" floodOpacity="0.6" result="color"/>
            <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
            <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
          </filter>

          {/* Linear gradients for realistic perspective drop-off and shadows */}
          <linearGradient id="wall-shading-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="wall-shading-right" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="ceiling-shading" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
          </linearGradient>
          <linearGradient id="floor-shading" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
          </linearGradient>

          {/* Roof slate pattern for traditional exterior */}
          <pattern id="roof-tiles" width="20" height="12" patternUnits="userSpaceOnUse">
            <path d="M 0,12 Q 10,4 20,12 M 10,4 L 10,0" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>

      <div className="w-full relative aspect-[600/380] overflow-hidden bg-zinc-50 border-b border-zinc-100">
        {/* main interactive SVG canvas */}
        <svg 
          viewBox="0 0 600 380" 
          className="w-full h-full transition-all duration-300"
          style={{ cursor: 'pointer' }}
        >
          {!isExterior ? (
            /* ==================== INTERIOR SCENARIO (Living, Bedroom, Office) ==================== */
            <g id="interior-room-group">
              {/* 1. Ceiling Surface */}
              <g onClick={() => onSurfClick('ceiling')} className="group/ceiling">
                <polygon 
                  points="0,0 600,0 450,95 150,95" 
                  fill={colors.ceiling || '#fafafa'} 
                  className="transition-all duration-300 hover:brightness-[1.02]"
                />
                {renderMode === 'ambient' && (
                  <polygon points="0,0 600,0 450,95 150,95" fill="url(#ceiling-shading)" className="pointer-events-none" />
                )}
                <polygon 
                  points="0,0 600,0 450,95 150,95" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'ceiling' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.ceiling} x={300} y={45} />
              </g>

              {/* 2. Left Wall Surface */}
              <g onClick={() => onSurfClick('left')} className="group/left">
                <polygon 
                  points="0,0 150,95 150,285 0,380" 
                  fill={colors.left || '#eaeaea'} 
                  className="transition-all duration-300 hover:brightness-[1.02]"
                />
                {renderMode === 'ambient' && (
                  <polygon points="0,0 150,95 150,285 0,380" fill="url(#wall-shading-left)" className="pointer-events-none" />
                )}
                <polygon 
                  points="0,0 150,95 150,285 0,380" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'left' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.left} x={75} y={190} />
              </g>

              {/* 3. Right Wall Surface */}
              <g onClick={() => onSurfClick('right')} className="group/right">
                <polygon 
                  points="600,0 450,95 450,285 600,380" 
                  fill={colors.right || '#ededed'} 
                  className="transition-all duration-300 hover:brightness-[1.02]"
                />
                {renderMode === 'ambient' && (
                  <polygon points="600,0 450,95 450,285 600,380" fill="url(#wall-shading-right)" className="pointer-events-none" />
                )}
                <polygon 
                  points="600,0 450,95 450,285 600,380" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'right' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.right} x={525} y={190} />
              </g>

              {/* 4. Floor Surface */}
              <g onClick={() => onSurfClick('floor')} className="group/floor">
                <polygon 
                  points="0,380 150,285 450,285 600,380" 
                  fill={colors.floor || '#8b5e3c'} 
                  className="transition-all duration-300 hover:brightness-[1.02]"
                />
                {renderMode === 'ambient' && (
                  <polygon points="0,380 150,285 450,285 600,380" fill="url(#floor-shading)" className="pointer-events-none" />
                )}
                <polygon 
                  points="0,380 150,285 450,285 600,380" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'floor' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.floor} x={300} y={330} />
              </g>

              {/* 5. Back Wall Surface */}
              <g onClick={() => onSurfClick('back')} className="group/back">
                <polygon 
                  points="150,95 450,95 450,285 150,285" 
                  fill={colors.back || '#f4f4f4'} 
                  className="transition-all duration-300 hover:brightness-[1.02]"
                />
                {/* Back Wall Ambient Shadow from ceilings/sides */}
                {renderMode === 'ambient' && (
                  <rect x="150" y="95" width="300" height="190" fill="black" opacity="0.04" className="pointer-events-none" />
                )}
                <polygon 
                  points="150,95 450,95 450,285 150,285" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'back' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.back} x={300} y={130} />
              </g>

              {/* High-end 2D Overlay Elements representing current rooms */}
              {activeRoom === 'living' && (
                <g id="living-decorations" className="pointer-events-none">
                  {/* Chic Mid-century Sofa */}
                  <g filter="url(#soft-shadow)">
                    {/* Sofa base shadow */}
                    <ellipse cx="290" cy="275" rx="100" ry="12" fill="black" opacity="0.22" />
                    {/* Sofa Main Frame */}
                    <rect x="195" y="222" width="190" height="42" rx="6" fill="#dedbd2" />
                    <rect x="190" y="210" width="10" height="52" rx="4" fill="#cfcbc2" />
                    <rect x="380" y="210" width="10" height="52" rx="4" fill="#cfcbc2" />
                    {/* Cushions */}
                    <rect x="202" y="215" width="86" height="32" rx="4" fill="#e9e5db" />
                    <rect x="292" y="215" width="86" height="32" rx="4" fill="#e9e5db" />
                    <rect x="205" y="195" width="80" height="24" rx="4" fill="#f4f1ea" />
                    <rect x="295" y="195" width="80" height="24" rx="4" fill="#f4f1ea" />
                    {/* Toss Pillow Teal */}
                    <rect x="210" y="202" width="22" height="22" rx="3" transform="rotate(-15, 221, 213)" fill="#2a475e" />
                    {/* Toss Pillow Gold */}
                    <rect x="352" y="202" width="22" height="22" rx="3" transform="rotate(15, 363, 213)" fill="#d4af37" />
                    {/* Sofa legs */}
                    <line x1="205" y1="264" x2="198" y2="278" stroke="#cca564" strokeWidth="4" />
                    <line x1="375" y1="264" x2="382" y2="278" stroke="#cca564" strokeWidth="4" />
                  </g>

                  {/* Classy Pendant hanging lamps */}
                  <g>
                    <line x1="300" y1="0" x2="300" y2="105" stroke="#1c1917" strokeWidth="2" />
                    <path d="M 285,115 C 285,105 315,105 315,115 Z" fill="#292524" />
                    <ellipse cx="300" cy="116" rx="6" ry="6" fill="#fef08a" opacity="0.9" />
                  </g>

                  {/* Elegant Ficus plant in fluted pot on the right */}
                  <g filter="url(#soft-shadow)">
                    {/* Circular Pot */}
                    <ellipse cx="430" cy="272" rx="16" ry="4" fill="black" opacity="0.15" />
                    <path d="M 416,238 L 444,238 L 439,270 L 421,270 Z" fill="#fafaf9" stroke="#e4e4e7" strokeWidth="1" />
                    {/* Soil */}
                    <ellipse cx="430" cy="238" rx="13" ry="3" fill="#451a03" />
                    {/* Beautiful Organic Palm Fronds */}
                    <path d="M 430,238 Q 420,180 395,192" stroke="#3f6212" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 430,238 Q 445,175 465,188" stroke="#365314" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 430,238 Q 430,165 422,170" stroke="#4d7c0f" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <path d="M 430,238 Q 436,192 452,210" stroke="#3f6212" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M 430,238 Q 418,205 408,222" stroke="#3f6212" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </g>
                </g>
              )}

              {activeRoom === 'bedroom' && (
                <g id="bedroom-decorations" className="pointer-events-none">
                  {/* Centered Modern Luxury Bed */}
                  <g filter="url(#soft-shadow)">
                    {/* Bedbase silhouette shadow */}
                    <ellipse cx="300" cy="285" rx="110" ry="12" fill="black" opacity="0.22" />
                    {/* Wood Headboard board */}
                    <rect x="185" y="165" width="230" height="98" rx="4" fill="#362312" />
                    <rect x="195" y="175" width="100" height="42" rx="2" fill="#4d351e" />
                    <rect x="305" y="175" width="100" height="42" rx="2" fill="#4d351e" />

                    {/* Mattress and Bedspread */}
                    <rect x="190" y="215" width="220" height="62" rx="6" fill="#f5f5f4" />
                    <rect x="190" y="228" width="220" height="49" rx="3" fill="#e7e5e4" />

                    {/* Folds/Duvet */}
                    <path d="M 190,236 C 210,232 390,232 410,236 L 410,277 C 390,279 210,279 190,277 Z" fill="#e7e5e4" />
                    <path d="M 190,248 C 220,244 380,244 410,248 L 410,277 L 190,277 Z" fill="#d6d3d1" />

                    {/* Cozy sleeping pillows */}
                    <rect x="205" y="202" width="76" height="24" rx="4" fill="#ffffff" stroke="#e7e5e4" strokeWidth="1" />
                    <rect x="319" y="202" width="76" height="24" rx="4" fill="#ffffff" stroke="#e7e5e4" strokeWidth="1" />
                    {/* Ochre Accent pillow */}
                    <rect x="272" y="212" width="56" height="15" rx="3" fill="#cca564" />
                  </g>

                  {/* Framed Artwork on left wall */}
                  <g>
                    <polygon points="45,115 110,135 110,205 45,185" fill="#1c1917" />
                    <polygon points="53,121 102,137 102,197 53,179" fill="#fafaf9" />
                    <circle cx="78" cy="158" r="14" fill="#e2a74c" opacity="0.8" />
                  </g>
                </g>
              )}

              {activeRoom === 'office' && (
                <g id="office-decorations" className="pointer-events-none">
                  {/* Contemporary Desk Frame */}
                  <g filter="url(#soft-shadow)">
                    {/* Shadow */}
                    <ellipse cx="295" cy="278" rx="95" ry="8" fill="black" opacity="0.2" />

                    {/* Desk Legs (Golden metal rods) */}
                    <line x1="205" y1="216" x2="205" y2="274" stroke="#cca564" strokeWidth="4.5" />
                    <line x1="385" y1="216" x2="385" y2="274" stroke="#cca564" strokeWidth="4.5" />
                    <line x1="205" y1="272" x2="385" y2="272" stroke="#cca564" strokeWidth="2" />

                    {/* Desktop surface (Black Marble/Ebony) */}
                    <rect x="195" y="208" width="200" height="14" rx="3" fill="#18181b" />
                    <rect x="195" y="208" width="200" height="4" rx="1" fill="#cca564" />

                    {/* Floating Desk Drawers */}
                    <rect x="330" y="222" width="50" height="32" fill="#362312" />
                    <circle cx="355" cy="232" r="2.5" fill="#cca564" />
                    <circle cx="355" cy="246" r="2.5" fill="#cca564" />

                    {/* Minimalist Computer Display */}
                    <rect x="275" y="152" width="42" height="32" rx="3" fill="#2d2d2d" />
                    <rect x="278" y="155" width="36" height="24" rx="1" fill="#fafafa" />
                    <rect x="294" y="184" width="4" height="24" fill="#a1a1aa" />
                    <ellipse cx="296" cy="207" rx="12" ry="3" fill="#a1a1aa" />

                    {/* Desk Study Lamp */}
                    <path d="M 225,208 L 230,185 L 222,185 Z" fill="#2d2d2d" stroke="#cca564" strokeWidth="1" />
                    <circle cx="222" cy="184" r="5" fill="#ffeb3b" />
                  </g>

                  {/* Chic Swivel Office Chair */}
                  <g filter="url(#soft-shadow)">
                    {/* Base star */}
                    <line x1="280" y1="284" x2="310" y2="284" stroke="#1c1917" strokeWidth="3" />
                    <line x1="295" y1="262" x2="295" y2="284" stroke="#2a2a2a" strokeWidth="5" />
                    {/* Chair Seat */}
                    <rect x="272" y="250" width="46" height="12" rx="3" fill="#3f3f46" />
                    {/* Curve backrest */}
                    <path d="M 276,252 C 274,232 276,218 286,218" stroke="#3f3f46" strokeWidth="10" strokeLinecap="round" fill="none" />
                    <path d="M 276,252 C 274,232 276,218 286,218" stroke="#27272a" strokeWidth="4" strokeLinecap="round" fill="none" />
                  </g>
                </g>
              )}
            </g>
          ) : (
            /* ==================== EXTERIOR SCENARIO (Bungalow, Villa, Apartment) ==================== */
            <g id="exterior-house-group">
              {/* 1. Ground/Grass */}
              <g onClick={() => onSurfClick('ground')} className="group/ground">
                <rect 
                  x="0" 
                  y="260" 
                  width="600" 
                  height="120" 
                  fill={colors.ground || '#8a9a70'} 
                  className="transition-all duration-300 hover:brightness-[1.02]"
                />
                <rect x="0" y="260" width="600" height="12" fill="black" opacity="0.1" className="pointer-events-none" />
                <rect 
                  x="0" 
                  y="260" 
                  width="600" 
                  height="120" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'ground' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.ground} x={300} y={320} />
              </g>

              {/* 2. Main Wall/Facade (Wall) */}
              <g onClick={() => onSurfClick('wall')} className="group/wall">
                {activeRoom === 'exterior_modern' && (
                  /* Modern Cantilever structure */
                  <g>
                    <polygon 
                      points="120,60 480,60 480,260 120,260" 
                      fill={colors.wall || '#f4f4f4'} 
                      className="transition-all duration-300 hover:brightness-[1.02]"
                    />
                    <polygon 
                      points="260,110 520,110 520,180 260,180" 
                      fill={colors.wall || '#f4f4f4'} 
                      className="transition-all duration-350 shadow-lg hover:brightness-[1.04]"
                      filter="url(#soft-shadow)"
                    />
                  </g>
                )}
                {activeRoom === 'exterior_villa' && (
                  /* Standard villa box */
                  <rect 
                    x="130" 
                    y="100" 
                    width="340" 
                    height="160" 
                    fill={colors.wall || '#f4f4f4'} 
                    className="transition-all duration-300 hover:brightness-[1.02]"
                  />
                )}
                {activeRoom === 'exterior_apartment' && (
                  /* Multi storey tower facade */
                  <rect 
                    x="140" 
                    y="40" 
                    width="320" 
                    height="220" 
                    fill={colors.wall || '#f4f4f4'} 
                    className="transition-all duration-300 hover:brightness-[1.02]"
                  />
                )}
                <polygon 
                  points="120,60 480,60 480,260 120,260" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'wall' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.wall} x={300} y={180} />
              </g>

              {/* 3. Pillars/Trims */}
              <g onClick={() => onSurfClick('pillars')} className="group/pillars">
                {activeRoom === 'exterior_modern' && (
                  /* Structural block pillars */
                  <g>
                    <rect x="120" y="60" width="18" height="200" fill={colors.pillars || '#eaeaea'} className="transition-all duration-200" />
                    <rect x="462" y="60" width="18" height="200" fill={colors.pillars || '#eaeaea'} className="transition-all duration-200" />
                  </g>
                )}
                {activeRoom === 'exterior_villa' && (
                  /* Elegant Rounded Pillars */
                  <g>
                    <rect x="170" y="100" width="22" height="160" rx="3" fill={colors.pillars || '#eaeaea'} className="transition-all duration-200" />
                    <rect x="408" y="100" width="22" height="160" rx="3" fill={colors.pillars || '#eaeaea'} className="transition-all duration-200" />
                    {/* Archway header */}
                    <path d="M 170,100 Q 300,60 430,100 L 430,118 Q 300,78 170,118 Z" fill={colors.pillars || '#eaeaea'} />
                  </g>
                )}
                {activeRoom === 'exterior_apartment' && (
                  /* Multiple architectural balconies */
                  <g>
                    <rect x="170" y="120" width="105" height="18" fill={colors.pillars || '#eaeaea'} />
                    <rect x="325" y="120" width="105" height="18" fill={colors.pillars || '#eaeaea'} />
                    <rect x="170" y="200" width="105" height="18" fill={colors.pillars || '#eaeaea'} />
                    <rect x="325" y="200" width="105" height="18" fill={colors.pillars || '#eaeaea'} />
                  </g>
                )}
                <rect 
                  x="100" 
                  y="40" 
                  width="400" 
                  height="220" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'pillars' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.pillars} x={150} y={150} />
              </g>

              {/* 4. Canopy/Roof */}
              <g onClick={() => onSurfClick('roof')} className="group/roof">
                {activeRoom === 'exterior_modern' && (
                  /* Modern sleek flat roof parapet */
                  <rect 
                    x="100" 
                    y="42" 
                    width="400" 
                    height="18" 
                    fill={colors.roof || '#5a544c'} 
                    className="transition-all duration-300"
                  />
                )}
                {activeRoom === 'exterior_villa' && (
                  /* Classical Pitched Gable Roof */
                  <g>
                    <polygon 
                      points="110,100 300,30 490,100" 
                      fill={colors.roof || '#5a544c'} 
                      className="transition-all duration-300"
                    />
                    {/* Terracotta style texture lines */}
                    <polygon points="110,100 300,30 490,100" fill="url(#roof-tiles)" className="pointer-events-none" />
                  </g>
                )}
                {activeRoom === 'exterior_apartment' && (
                  /* Tall Penthouse Top crown */
                  <polygon 
                    points="120,40 140,20 460,20 480,40" 
                    fill={colors.roof || '#5a544c'} 
                    className="transition-all duration-300"
                  />
                )}
                <rect 
                  x="100" 
                  y="20" 
                  width="400" 
                  height="90" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'roof' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.roof} x={300} y={65} />
              </g>

              {/* 5. Front Door */}
              <g onClick={() => onSurfClick('door')} className="group/door">
                {activeRoom === 'exterior_modern' && (
                  /* Offset Wood cladding door */
                  <rect 
                    x="210" 
                    y="160" 
                    width="40" 
                    height="100" 
                    fill={colors.door || '#8b5e3c'} 
                    className="transition-all duration-300 hover:brightness-[1.05]"
                  />
                )}
                {activeRoom === 'exterior_villa' && (
                  /* Double central arch door */
                  <path 
                    d="M 275,260 L 275,170 A 25,25 0 0,1 325,170 L 325,260 Z" 
                    fill={colors.door || '#8b5e3c'} 
                    className="transition-all duration-300 hover:brightness-[1.05]"
                  />
                )}
                {activeRoom === 'exterior_apartment' && (
                  /* Giant Double glass lobby door */
                  <rect 
                    x="270" 
                    y="180" 
                    width="60" 
                    height="80" 
                    fill={colors.door || '#8b5e3c'} 
                    className="transition-all duration-300 hover:brightness-[1.05]"
                  />
                )}
                <rect 
                  x="200" 
                  y="150" 
                  width="150" 
                  height="115" 
                  fill="none" 
                  stroke="#d4af37" 
                  strokeWidth={activeSurf === 'door' ? '3' : '0'} 
                  className="pointer-events-none"
                />
                <ShadeLabel shade={appliedShades?.door} x={300} y={230} />
              </g>

              {/* Fixed Glass Windows on the structure */}
              <g className="pointer-events-none" fill="#e0f2fe" stroke="#1e293b" strokeWidth="2" opacity="0.85">
                {/* Modern Window grids */}
                {activeRoom === 'exterior_modern' && (
                  <g>
                    <rect x="330" y="195" width="80" height="42" rx="2" />
                    <line x1="370" y1="195" x2="370" y2="237" stroke="#1e293b" strokeWidth="1.5" />
                  </g>
                )}
                {/* Traditional Villa grids */}
                {activeRoom === 'exterior_villa' && (
                  <g>
                    <rect x="210" y="130" width="40" height="50" rx="3" />
                    <rect x="350" y="130" width="40" height="50" rx="3" />
                  </g>
                )}
                {/* Apartment grids */}
                {activeRoom === 'exterior_apartment' && (
                  <g>
                    <rect x="185" y="65" width="32" height="35" />
                    <rect x="240" y="65" width="32" height="35" />
                    <rect x="328" y="65" width="32" height="35" />
                    <rect x="382" y="65" width="32" height="35" />
                  </g>
                )}
              </g>

              {/* Decorative Exterior Walkway lights and trees */}
              <g id="exterior-decorations" className="pointer-events-none">
                {/* Walkway Path */}
                <polygon points="270,260 330,260 370,380 230,380" fill="#cbd5e1" opacity="0.8" />
                {/* Tree on the Left */}
                <g filter="url(#soft-shadow)">
                  <rect x="55" y="210" width="12" height="60" rx="2" fill="#4d351e" />
                  <circle cx="61" cy="180" r="32" fill="#1e3a1e" />
                  <circle cx="50" cy="165" r="26" fill="#3f6212" />
                  <circle cx="75" cy="172" r="24" fill="#4d7c0f" />
                </g>
                {/* Miniature planter on the Right */}
                <g filter="url(#soft-shadow)">
                  <rect x="510" y="235" width="40" height="28" rx="2" fill="#e4e4e7" stroke="#d4d4d8" />
                  <path d="M 505,235 C 500,215 555,215 555,235 Z" fill="#365314" />
                </g>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* 3. Sleek Subtle Footer Info & Instruction Bar (Replaces floating instruction clutter) */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#faf9f6] text-zinc-400 rounded-b-none sm:rounded-b-2xl border-t border-zinc-200/50 text-[8px] sm:text-[9px] uppercase tracking-wider font-display font-semibold select-none z-10 shrink-0">
        <span className="text-zinc-500 font-mono">1. Tap shade in catalog below</span>
        <span className="text-[#cca564] flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#cca564] animate-pulse" /> 2. Click any area above to coat
        </span>
      </div>
    </div>
  );
}
