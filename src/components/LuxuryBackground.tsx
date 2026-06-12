import React from "react";

export default function LuxuryBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-royale-bg">
      {/* 1. Subtle Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]" />
      <div className="absolute top-[40%] right-[-5%] w-[60%] h-[70%] rounded-full bg-gold/5 blur-[150px]" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#D4B572]/5 blur-[120px]" />

      {/* 2. Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#B8975A08_1px,transparent_1px),linear-gradient(to_bottom,#B8975A08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      {/* 3. Noise Texture Overlay (gives a premium matte finish to the solid colors) */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
    </div>
  );
}
