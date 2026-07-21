import React from 'react';

export const LivingRoomSvg = ({ wallColor }: { wallColor: string }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="wallLight" cx="70%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
      </radialGradient>
      <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e5e7eb" />
        <stop offset="100%" stopColor="#9ca3af" />
      </linearGradient>
      <linearGradient id="windowLight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="60%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      
      {/* Floor Wood Texture Pattern */}
      <pattern id="woodFloor" width="80" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-10)">
        <rect width="80" height="20" fill="none" />
        <line x1="0" y1="0" x2="80" y2="0" stroke="#6b7280" strokeWidth="0.5" opacity="0.3" />
        <line x1="40" y1="0" x2="40" y2="20" stroke="#6b7280" strokeWidth="0.5" opacity="0.3" />
      </pattern>

      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="15" stdDeviation="15" floodOpacity="0.3" />
      </filter>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.3"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      {/* Fabric Texture */}
      <filter id="fabricNoise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" in="noise" result="coloredNoise" />
        <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
      </filter>

      {/* Wall Texture */}
      <filter id="wallTexture">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise" />
        <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
      </filter>
    </defs>
    
    {/* Base Wall Color with Texture */}
    <rect width="800" height="420" fill={wallColor} filter="url(#wallTexture)" />
    {/* Wall Lighting */}
    <rect width="800" height="420" fill="url(#wallLight)" style={{ mixBlendMode: 'overlay' }} />
    <rect width="800" height="420" fill="url(#wallLight)" style={{ mixBlendMode: 'multiply' }} opacity="0.4" />

    {/* Floor */}
    <path d="M0,420 L800,420 L800,600 L0,600 Z" fill="url(#floorGrad)" />
    <path d="M0,420 L800,420 L800,600 L0,600 Z" fill="url(#woodFloor)" />
    
    {/* Skirting Board */}
    <rect x="0" y="405" width="800" height="15" fill="#f9fafb" filter="url(#shadow)" />
    <rect x="0" y="405" width="800" height="2" fill="#ffffff" opacity="0.8" />
    <rect x="0" y="420" width="800" height="1" fill="#cbd5e1" />

    {/* Window */}
    <g transform="translate(520, 60)" filter="url(#shadow)">
      {/* Frame outer */}
      <rect x="0" y="0" width="220" height="300" fill="#ffffff" rx="4" />
      {/* Inner depth */}
      <rect x="5" y="5" width="210" height="290" fill="#e2e8f0" />
      <rect x="10" y="10" width="200" height="280" fill="#cbd5e1" />
      {/* Glass panes with sky gradient */}
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="100%" stopColor="#bae6fd" />
      </linearGradient>
      <rect x="15" y="15" width="85" height="130" fill="url(#skyGrad)" />
      <rect x="105" y="15" width="85" height="130" fill="url(#skyGrad)" />
      <rect x="15" y="155" width="85" height="130" fill="url(#skyGrad)" />
      <rect x="105" y="155" width="85" height="130" fill="url(#skyGrad)" />
      {/* Window Reflections */}
      <path d="M 15 15 L 100 145 L 60 145 L 15 70 Z" fill="#ffffff" opacity="0.4" />
      <path d="M 105 15 L 190 145 L 150 145 L 105 70 Z" fill="#ffffff" opacity="0.4" />
      <path d="M 15 155 L 100 285 L 60 285 L 15 210 Z" fill="#ffffff" opacity="0.4" />
      <path d="M 105 155 L 190 285 L 150 285 L 105 210 Z" fill="#ffffff" opacity="0.4" />
    </g>

    {/* Light rays from window */}
    <path d="M 520,60 L 800,60 L 800,600 L 200,600 Z" fill="url(#windowLight)" style={{ mixBlendMode: 'overlay' }} opacity="0.3" />
    <path d="M 520,60 L 800,60 L 800,600 L 200,600 Z" fill="url(#windowLight)" style={{ mixBlendMode: 'screen' }} opacity="0.1" />

    {/* Art Piece */}
    <g transform="translate(150, 100)" filter="url(#shadow)">
      {/* Frame outer */}
      <rect x="0" y="0" width="240" height="180" fill="#1f2937" rx="2" />
      {/* Frame inner */}
      <rect x="2" y="2" width="236" height="176" fill="#334155" rx="1" />
      {/* Mat */}
      <rect x="10" y="10" width="220" height="160" fill="#f8fafc" />
      {/* Mat shadow */}
      <rect x="30" y="30" width="180" height="120" fill="#000000" opacity="0.1" filter="url(#softShadow)" />
      {/* Art */}
      <rect x="30" y="30" width="180" height="120" fill="#e2e8f0" />
      <circle cx="120" cy="90" r="45" fill="#f59e0b" />
      <circle cx="120" cy="90" r="30" fill="#fbbf24" />
      <path d="M 30,150 L 120,70 L 210,150 Z" fill="#334155" opacity="0.8" />
      <path d="M 60,150 L 140,90 L 210,150 Z" fill="#475569" opacity="0.9" />
      {/* Glass reflection */}
      <path d="M 10,10 L 100,170 L 60,170 L 10,80 Z" fill="#ffffff" opacity="0.3" />
    </g>

    {/* Sofa Shadow */}
    <ellipse cx="320" cy="500" rx="240" ry="30" fill="#000000" opacity="0.3" filter="url(#softShadow)" />
    <ellipse cx="320" cy="500" rx="200" ry="20" fill="#000000" opacity="0.4" filter="url(#softShadow)" />

    {/* Sofa */}
    <g transform="translate(120, 320)" filter="url(#fabricNoise)">
      {/* Backrest */}
      <rect x="0" y="0" width="400" height="140" rx="15" fill="#e2e8f0" />
      <rect x="0" y="0" width="400" height="140" rx="15" fill="url(#windowLight)" opacity="0.2" />
      
      {/* Back Cushions */}
      <rect x="15" y="15" width="182" height="120" rx="12" fill="#ffffff" filter="url(#softShadow)" />
      <rect x="15" y="15" width="182" height="120" rx="12" fill="url(#windowLight)" opacity="0.3" />
      <rect x="203" y="15" width="182" height="120" rx="12" fill="#ffffff" filter="url(#softShadow)" />
      <rect x="203" y="15" width="182" height="120" rx="12" fill="url(#windowLight)" opacity="0.3" />

      {/* Seat Base */}
      <rect x="-20" y="100" width="440" height="60" rx="10" fill="#cbd5e1" />
      <rect x="-20" y="100" width="440" height="20" rx="10" fill="#f8fafc" opacity="0.5" />
      
      {/* Seat Cushions */}
      <rect x="15" y="100" width="182" height="50" rx="8" fill="#ffffff" filter="url(#softShadow)" />
      <rect x="15" y="100" width="182" height="50" rx="8" fill="url(#windowLight)" opacity="0.3" />
      <rect x="203" y="100" width="182" height="50" rx="8" fill="#ffffff" filter="url(#softShadow)" />
      <rect x="203" y="100" width="182" height="50" rx="8" fill="url(#windowLight)" opacity="0.3" />

      {/* Armrests */}
      <rect x="-25" y="30" width="50" height="140" rx="15" fill="#e2e8f0" filter="url(#shadow)" />
      <rect x="-25" y="30" width="50" height="140" rx="15" fill="url(#windowLight)" opacity="0.5" />
      {/* Armrest highlight */}
      <path d="M -20,45 Q 0,30 20,45" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.8" />
      
      <rect x="375" y="30" width="50" height="140" rx="15" fill="#e2e8f0" filter="url(#shadow)" />
      <rect x="375" y="30" width="50" height="140" rx="15" fill="url(#windowLight)" opacity="0.2" />
      {/* Armrest highlight */}
      <path d="M 380,45 Q 400,30 420,45" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.5" />
      
      {/* Sofa Legs */}
      <rect x="10" y="150" width="12" height="30" fill="#1e293b" />
      <polygon points="10,180 22,180 25,190 7,190" fill="#0f172a" />
      <rect x="378" y="150" width="12" height="30" fill="#1e293b" />
      <polygon points="378,180 390,180 393,190 375,190" fill="#0f172a" />
    </g>

    {/* Potted Plant */}
    <g transform="translate(40, 340)">
      <ellipse cx="60" cy="190" rx="40" ry="12" fill="#000000" opacity="0.4" filter="url(#softShadow)" />
      {/* Leaves Detailed */}
      <g filter="url(#softShadow)">
        <path d="M 60,130 C 10,-10 30,70 60,130 Z" fill="#15803d" />
        <path d="M 60,130 C 130,0 90,80 60,130 Z" fill="#166534" />
        <path d="M 60,130 C 20,40 50,110 60,130 Z" fill="#22c55e" />
        <path d="M 60,130 C 100,50 70,110 60,130 Z" fill="#16a34a" />
        <path d="M 60,130 C 60,10 80,70 60,130 Z" fill="#4ade80" />
      </g>
      {/* Pot */}
      <path d="M 25,130 L 95,130 L 80,190 L 40,190 Z" fill="#d97706" filter="url(#shadow)" />
      {/* Pot Lip */}
      <rect x="20" y="125" width="80" height="10" rx="3" fill="#b45309" filter="url(#shadow)" />
      {/* Pot Lighting */}
      <path d="M 25,130 L 95,130 L 80,190 L 40,190 Z" fill="url(#windowLight)" opacity="0.4" />
    </g>
    
    {/* Coffee Table */}
    <g transform="translate(180, 510)">
      <ellipse cx="140" cy="50" rx="150" ry="20" fill="#000000" opacity="0.4" filter="url(#softShadow)" />
      {/* Rug under table */}
      <ellipse cx="140" cy="50" rx="180" ry="40" fill="#ffffff" opacity="0.7" filter="url(#fabricNoise)" />
      
      {/* Legs (Wood) */}
      <rect x="30" y="10" width="12" height="45" fill="#78350f" rx="2" />
      <rect x="238" y="10" width="12" height="45" fill="#78350f" rx="2" />
      {/* Top (Wood) */}
      <path d="M -10,0 L 290,0 L 270,15 L 10,15 Z" fill="#b45309" filter="url(#shadow)" />
      <path d="M -10,0 L 290,0 L 270,15 L 10,15 Z" fill="url(#windowLight)" opacity="0.5" />
      
      {/* Books on table */}
      <g filter="url(#softShadow)">
        <rect x="180" y="-12" width="60" height="12" fill="#ef4444" rx="2" />
        <rect x="180" y="-12" width="60" height="12" fill="url(#windowLight)" opacity="0.3" rx="2" />
        <rect x="185" y="-22" width="50" height="10" fill="#3b82f6" rx="2" />
        <rect x="185" y="-22" width="50" height="10" fill="url(#windowLight)" opacity="0.3" rx="2" />
      </g>
    </g>
  </svg>
);

export const BedroomSvg = ({ wallColor }: { wallColor: string }) => (
  <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="bedLight" cx="50%" cy="30%" r="80%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
        <stop offset="60%" stopColor="#ffffff" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id="floorGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#d1d5db" />
        <stop offset="100%" stopColor="#6b7280" />
      </linearGradient>
      <filter id="shadow2" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="15" stdDeviation="15" floodOpacity="0.4" />
      </filter>
      <filter id="softShadow2" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="10" result="blur" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.4"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <linearGradient id="lampGlow" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="70%" stopColor="#fef08a" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
      </linearGradient>

      {/* Wall Texture */}
      <filter id="wallTexture2">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise" />
        <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
      </filter>
      
      {/* Fabric Texture */}
      <filter id="fabricNoise2">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" in="noise" result="coloredNoise" />
        <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
      </filter>
    </defs>

    {/* Base Wall Color with texture */}
    <rect width="800" height="420" fill={wallColor} filter="url(#wallTexture2)" />
    
    {/* Wall Paneling / Wainscoting (Adds realism to wall) */}
    <g opacity="0.2" stroke="#000000" strokeWidth="2" filter="url(#shadow2)">
      <rect x="40" y="80" width="200" height="300" fill="none" />
      <rect x="50" y="90" width="180" height="280" fill="none" />
      
      <rect x="280" y="80" width="240" height="300" fill="none" />
      <rect x="290" y="90" width="220" height="280" fill="none" />
      
      <rect x="560" y="80" width="200" height="300" fill="none" />
      <rect x="570" y="90" width="180" height="280" fill="none" />
    </g>
    <g opacity="0.4" stroke="#ffffff" strokeWidth="1">
      <rect x="39" y="79" width="202" height="302" fill="none" />
      <rect x="279" y="79" width="242" height="302" fill="none" />
      <rect x="559" y="79" width="202" height="302" fill="none" />
    </g>

    {/* Wall Lighting */}
    <rect width="800" height="420" fill="url(#bedLight)" style={{ mixBlendMode: 'overlay' }} />
    <rect width="800" height="420" fill="url(#bedLight)" style={{ mixBlendMode: 'multiply' }} opacity="0.6" />

    {/* Floor */}
    <path d="M0,420 L800,420 L800,600 L0,600 Z" fill="url(#floorGrad2)" />
    
    {/* Skirting Board */}
    <rect x="0" y="405" width="800" height="15" fill="#f3f4f6" filter="url(#shadow2)" />
    <rect x="0" y="405" width="800" height="2" fill="#ffffff" opacity="0.8" />
    <rect x="0" y="420" width="800" height="1" fill="#cbd5e1" />

    {/* Rug */}
    <ellipse cx="400" cy="530" rx="320" ry="60" fill="#f8fafc" filter="url(#fabricNoise2)" />

    {/* Bed Shadow */}
    <ellipse cx="400" cy="530" rx="280" ry="35" fill="#000000" opacity="0.4" filter="url(#softShadow2)" />
    <ellipse cx="400" cy="530" rx="250" ry="25" fill="#000000" opacity="0.5" filter="url(#softShadow2)" />

    {/* Bed */}
    <g transform="translate(180, 260)">
      {/* Headboard */}
      <rect x="20" y="0" width="400" height="200" rx="12" fill="#cbd5e1" filter="url(#shadow2)" />
      {/* Headboard Tufting Lines */}
      <g opacity="0.4">
        <path d="M 20,40 L 420,40 M 20,80 L 420,80 M 20,120 L 420,120 M 20,160 L 420,160" stroke="#000000" strokeWidth="2" filter="url(#softShadow2)" />
        <path d="M 100,0 L 100,200 M 180,0 L 180,200 M 260,0 L 260,200 M 340,0 L 340,200" stroke="#000000" strokeWidth="2" filter="url(#softShadow2)" />
      </g>
      
      {/* Mattress Base */}
      <rect x="0" y="160" width="440" height="60" rx="6" fill="#334155" filter="url(#shadow2)" />
      
      {/* Pillows */}
      <g filter="url(#softShadow2)">
        {/* Back Pillows */}
        <rect x="35" y="85" width="170" height="90" rx="15" fill="#ffffff" filter="url(#fabricNoise2)" />
        <rect x="235" y="85" width="170" height="90" rx="15" fill="#ffffff" filter="url(#fabricNoise2)" />
        {/* Front Pillows */}
        <rect x="55" y="110" width="150" height="70" rx="20" fill="#e2e8f0" filter="url(#fabricNoise2)" />
        <rect x="235" y="110" width="150" height="70" rx="20" fill="#e2e8f0" filter="url(#fabricNoise2)" />
        {/* Accent Pillows */}
        <rect x="175" y="130" width="90" height="55" rx="10" fill="#fbbf24" filter="url(#fabricNoise2)" />
        <rect x="185" y="145" width="70" height="40" rx="10" fill="#1e293b" filter="url(#fabricNoise2)" />
      </g>
      
      {/* Blanket/Duvet */}
      <g filter="url(#fabricNoise2)">
        <path d="M 5,180 L 435,180 C 445,180 455,190 455,220 L 455,300 L -15,300 L -15,220 C -15,190 -5,180 5,180 Z" fill="#ffffff" filter="url(#shadow2)" />
        {/* Duvet Folds with shadows */}
        <path d="M 5,180 Q 220,220 435,180" fill="none" stroke="#e2e8f0" strokeWidth="6" filter="url(#softShadow2)" />
        <path d="M -15,230 Q 220,260 455,230" fill="none" stroke="#e2e8f0" strokeWidth="5" filter="url(#softShadow2)" />
        <path d="M -15,270 Q 220,290 455,270" fill="none" stroke="#e2e8f0" strokeWidth="4" filter="url(#softShadow2)" />
        
        {/* Folded throw blanket at foot of bed */}
        <path d="M -15,260 L 455,260 L 455,300 L -15,300 Z" fill="#64748b" opacity="0.9" />
        <path d="M -15,260 L 455,260 L 455,300 L -15,300 Z" fill="url(#bedLight)" style={{ mixBlendMode: 'multiply' }} opacity="0.5" />
        <path d="M -15,260 Q 220,270 455,260" fill="none" stroke="#475569" strokeWidth="4" />
      </g>
    </g>

    {/* Nightstands */}
    {/* Left */}
    <g transform="translate(60, 390)" filter="url(#shadow2)">
      <rect x="0" y="0" width="110" height="100" rx="4" fill="#0f172a" />
      <rect x="5" y="5" width="100" height="40" rx="2" fill="#1e293b" />
      <rect x="5" y="50" width="100" height="45" rx="2" fill="#1e293b" />
      {/* Handles */}
      <rect x="35" y="20" width="40" height="6" rx="3" fill="#cbd5e1" />
      <rect x="35" y="70" width="40" height="6" rx="3" fill="#cbd5e1" />
    </g>
    
    {/* Right */}
    <g transform="translate(630, 390)" filter="url(#shadow2)">
      <rect x="0" y="0" width="110" height="100" rx="4" fill="#0f172a" />
      <rect x="5" y="5" width="100" height="40" rx="2" fill="#1e293b" />
      <rect x="5" y="50" width="100" height="45" rx="2" fill="#1e293b" />
      {/* Handles */}
      <rect x="35" y="20" width="40" height="6" rx="3" fill="#cbd5e1" />
      <rect x="35" y="70" width="40" height="6" rx="3" fill="#cbd5e1" />
    </g>

    {/* Lamps */}
    {/* Left Lamp */}
    <g transform="translate(90, 260)">
      {/* Light Glow */}
      <polygon points="-40,90 90,90 60,0 -10,0" fill="url(#lampGlow)" />
      {/* Lamp Body */}
      <circle cx="25" cy="115" r="15" fill="#f59e0b" filter="url(#shadow2)" />
      <rect x="22" y="70" width="6" height="40" fill="#d97706" />
      {/* Lamp Shade */}
      <polygon points="-15,90 65,90 40,30 10,30" fill="#f8fafc" filter="url(#shadow2)" />
      <polygon points="-15,90 65,90 40,30 10,30" fill="url(#bedLight)" style={{ mixBlendMode: 'multiply' }} opacity="0.2" />
    </g>

    {/* Right Lamp */}
    <g transform="translate(660, 260)">
      {/* Light Glow */}
      <polygon points="-40,90 90,90 60,0 -10,0" fill="url(#lampGlow)" />
      {/* Lamp Body */}
      <circle cx="25" cy="115" r="15" fill="#f59e0b" filter="url(#shadow2)" />
      <rect x="22" y="70" width="6" height="40" fill="#d97706" />
      {/* Lamp Shade */}
      <polygon points="-15,90 65,90 40,30 10,30" fill="#f8fafc" filter="url(#shadow2)" />
      <polygon points="-15,90 65,90 40,30 10,30" fill="url(#bedLight)" style={{ mixBlendMode: 'multiply' }} opacity="0.2" />
    </g>

  </svg>
);
