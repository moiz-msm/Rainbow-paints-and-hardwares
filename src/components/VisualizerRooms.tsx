import React from 'react';
import * as THREE from 'three';
import { ContactShadows, Float } from '@react-three/drei';

// --- Shared 3D Selected Surface Overlays ---
export const HighlightPlane = ({ position, rotation, args, isActive }: { position: [number, number, number]; rotation?: [number, number, number]; args: [number, number]; isActive: boolean }) => {
  if (!isActive) return null;
  return (
    <group position={position} rotation={rotation}>
      {/* Slightly in front/above to prevent z-fighting */}
      <mesh position={[0, 0, 0.008]}>
        <planeGeometry args={args} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.15} depthTest={true} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={args} />
        <meshBasicMaterial color="#d4af37" wireframe wireframeLinewidth={2} transparent opacity={0.5} depthTest={true} />
      </mesh>
    </group>
  );
};

export const HighlightBox = ({ position, rotation, args, isActive }: { position: [number, number, number]; rotation?: [number, number, number]; args: [number, number, number]; isActive: boolean }) => {
  if (!isActive) return null;
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[args[0] + 0.01, args[1] + 0.01, args[2] + 0.01]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.12} depthTest={true} />
      </mesh>
      <mesh>
        <boxGeometry args={[args[0] + 0.015, args[1] + 0.015, args[2] + 0.015]} />
        <meshBasicMaterial color="#d4af37" wireframe wireframeLinewidth={1.5} transparent opacity={0.4} depthTest={true} />
      </mesh>
    </group>
  );
};

// --- Architectural Trims (Skirting Boards & Crown Moldings) ---
export const ElegantRoomTrim = () => (
  <group>
    {/* --- Baseboards / Skirting Boards (separated from walls to framing paint) --- */}
    <mesh position={[0, 0.06, -1.98]} castShadow receiveShadow>
      <boxGeometry args={[6.0, 0.12, 0.03]} />
      <meshPhysicalMaterial color="#eae6df" roughness={0.5} />
    </mesh>
    <mesh position={[-2.98, 0.06, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[4.0, 0.12, 0.03]} />
      <meshPhysicalMaterial color="#eae6df" roughness={0.5} />
    </mesh>
    <mesh position={[2.98, 0.06, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[4.0, 0.12, 0.03]} />
      <meshPhysicalMaterial color="#eae6df" roughness={0.5} />
    </mesh>

    {/* --- Crown Moldings (sophisticated classical ceiling border) --- */}
    <mesh position={[0, 2.94, -1.98]} castShadow receiveShadow>
      <boxGeometry args={[6.0, 0.12, 0.04]} />
      <meshPhysicalMaterial color="#fcfbfa" roughness={0.5} />
    </mesh>
    <mesh position={[-2.98, 2.94, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[4.0, 0.12, 0.04]} />
      <meshPhysicalMaterial color="#fcfbfa" roughness={0.5} />
    </mesh>
    <mesh position={[2.98, 2.94, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[4.0, 0.12, 0.04]} />
      <meshPhysicalMaterial color="#fcfbfa" roughness={0.5} />
    </mesh>
  </group>
);

// --- Window Overlay Frame ---
export const DecorativeWindow = ({ onSurfClick }: { onSurfClick: (surf: string) => void }) => (
  <group position={[0, 1.5, -1.975]}>
    {/* Window Outer Frameline (Slim charcoal charcoal wood) */}
    <mesh position={[0, 0, 0]} castShadow onClick={(e) => { e.stopPropagation(); onSurfClick('back'); }}>
      <boxGeometry args={[2.5, 1.6, 0.04]} />
      <meshPhysicalMaterial color="#222222" roughness={0.5} />
    </mesh>
    {/* Translucent physical glass windowpane (glistens elegantly under point lights) */}
    <mesh position={[0, 0, 0.01]} onClick={(e) => { e.stopPropagation(); onSurfClick('back'); }}>
      <planeGeometry args={[2.36, 1.46]} />
      <meshPhysicalMaterial color="#def5ff" roughness={0.05} metalness={0.9} transmission={0.9} clearcoat={1.0} transparent opacity={0.65} />
    </mesh>
    {/* Inner Mullion Dividers */}
    <mesh position={[0, 0, 0.015]} onClick={(e) => { e.stopPropagation(); onSurfClick('back'); }}>
      <boxGeometry args={[2.36, 0.03, 0.01]} />
      <meshPhysicalMaterial color="#222222" roughness={0.5} />
    </mesh>
    <mesh position={[0, 0, 0.015]} onClick={(e) => { e.stopPropagation(); onSurfClick('back'); }}>
      <boxGeometry args={[0.03, 1.46, 0.01]} />
      <meshPhysicalMaterial color="#222222" roughness={0.5} />
    </mesh>
  </group>
);

// --- Classy Pendant Ceiling Light ---
export const CeilingLamp = () => (
  <group position={[0, 3.0, 0]}>
    {/* Sleek support cable */}
    <mesh position={[0, -0.4, 0]} castShadow>
      <cylinderGeometry args={[0.005, 0.005, 0.8, 8]} />
      <meshPhysicalMaterial color="#111111" metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Ceiling attachment canopy */}
    <mesh position={[0, -0.01, 0]} castShadow>
      <cylinderGeometry args={[0.05, 0.05, 0.02, 12]} />
      <meshPhysicalMaterial color="#111111" metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Dome metal lamp shade */}
    <mesh position={[0, -0.82, 0]} castShadow>
      <sphereGeometry args={[0.15, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshPhysicalMaterial color="#1f1f1f" roughness={0.3} metalness={0.8} side={THREE.DoubleSide} />
    </mesh>
    {/* Reflective warm brass internal coating */}
    <mesh position={[0, -0.83, 0]}>
      <sphereGeometry args={[0.145, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshPhysicalMaterial color="#d4af37" metalness={1.0} roughness={0.15} />
    </mesh>
    {/* Glowing bulb */}
    <mesh position={[0, -0.88, 0]}>
      <sphereGeometry args={[0.03, 12, 12]} />
      <meshBasicMaterial color="#fffbeb" />
    </mesh>
    {/* Dynamic downwards spotlights casting dramatic room illumination */}
    <spotLight position={[0, -0.88, 0]} angle={1.1} penumbra={1.0} intensity={2.5} color="#ffd899" castShadow />
  </group>
);

// --- Elegant Velvet/Fabric Tufted Rug ---
export const ElegantRug = ({ color = "#ded9cb", args = [1.5, 32] }: { color?: string, args?: [number, number] }) => (
  <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <ringGeometry args={[0, args[0], args[1]]} />
    <meshPhysicalMaterial color={color} roughness={0.95} />
  </mesh>
);

// --- High-End Custom Furniture Objects ---
const ElegantCouch = (props: any) => (
  <group {...props}>
     {/* Couch Frame Base (Solid Rich Cedar/Walnut) */}
     <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
       <boxGeometry args={[2.5, 0.1, 0.9]} />
       <meshPhysicalMaterial color="#302015" roughness={0.7} />
     </mesh>
     {/* Couch Legs (Golden-accented brass cylinders) */}
     <mesh position={[-1.18, 0.04, -0.38]} castShadow>
       <cylinderGeometry args={[0.03, 0.02, 0.08, 12]} />
       <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
     </mesh>
     <mesh position={[1.18, 0.04, -0.38]} castShadow>
       <cylinderGeometry args={[0.03, 0.02, 0.08, 12]} />
       <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
     </mesh>
     <mesh position={[-1.18, 0.04, 0.38]} castShadow>
       <cylinderGeometry args={[0.03, 0.02, 0.08, 12]} />
       <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
     </mesh>
     <mesh position={[1.18, 0.04, 0.38]} castShadow>
       <cylinderGeometry args={[0.03, 0.02, 0.08, 12]} />
       <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
     </mesh>

     {/* Seating Main Cushion Deck */}
     <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
       <boxGeometry args={[2.4, 0.18, 0.86]} />
       <meshPhysicalMaterial color="#dfdcd7" roughness={0.8} />
     </mesh>

     {/* Layered Seating Cushions */}
     <mesh position={[-0.58, 0.33, 0.05]} castShadow receiveShadow>
       <boxGeometry args={[1.12, 0.14, 0.72]} />
       <meshPhysicalMaterial color="#e5e2dd" roughness={0.85} />
     </mesh>
     <mesh position={[0.58, 0.33, 0.05]} castShadow receiveShadow>
       <boxGeometry args={[1.12, 0.14, 0.72]} />
       <meshPhysicalMaterial color="#e5e2dd" roughness={0.85} />
     </mesh>

     {/* Flanking Armrests */}
     <mesh position={[-1.24, 0.45, 0]} castShadow receiveShadow>
       <boxGeometry args={[0.16, 0.48, 0.88]} />
       <meshPhysicalMaterial color="#dfdcd7" roughness={0.8} />
     </mesh>
     <mesh position={[1.24, 0.45, 0]} castShadow receiveShadow>
       <boxGeometry args={[0.16, 0.48, 0.88]} />
       <meshPhysicalMaterial color="#dfdcd7" roughness={0.8} />
     </mesh>

     {/* Backrest frame structure */}
     <mesh position={[0, 0.65, -0.34]} castShadow receiveShadow>
       <boxGeometry args={[2.4, 0.58, 0.18]} />
       <meshPhysicalMaterial color="#dfdcd7" roughness={0.8} />
     </mesh>
     {/* Padded Cozy Back Pillows */}
     <mesh position={[-0.58, 0.68, -0.2]} rotation={[0.05, 0, 0]} castShadow receiveShadow>
       <boxGeometry args={[1.1, 0.42, 0.1]} />
       <meshPhysicalMaterial color="#e5e2dd" roughness={0.85} />
     </mesh>
     <mesh position={[0.58, 0.68, -0.2]} rotation={[0.05, 0, 0]} castShadow receiveShadow>
       <boxGeometry args={[1.1, 0.42, 0.1]} />
       <meshPhysicalMaterial color="#e5e2dd" roughness={0.85} />
     </mesh>

     {/* Designer Velvet Accent Cushions (Royal Teal & Amber Ochre) */}
     <mesh position={[-0.95, 0.46, 0.12]} rotation={[0.1, 0.25, 0.3]} castShadow>
       <boxGeometry args={[0.36, 0.36, 0.1]} />
       <meshPhysicalMaterial color="#1a353d" roughness={0.7} />
     </mesh>
     <mesh position={[0.95, 0.46, 0.12]} rotation={[0.1, -0.25, -0.3]} castShadow>
       <boxGeometry args={[0.36, 0.36, 0.1]} />
       <meshPhysicalMaterial color="#cca564" roughness={0.65} />
     </mesh>
  </group>
);

const ElegantPlant = (props: any) => (
  <group {...props}>
    {/* Chic Architectural Fluted White Ceramic Pot */}
    <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.22, 0.15, 0.44, 24, 8]} />
      <meshPhysicalMaterial color="#fcfaf2" roughness={0.15} metalness={0.05} />
    </mesh>
    {/* Dark Moist Soil Deck */}
    <mesh position={[0, 0.43, 0]} receiveShadow>
      <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} />
      <meshPhysicalMaterial color="#302015" roughness={0.9} />
    </mesh>
    
    {/* Plant Stems and Organic Textured Fan palm Leaves */}
    <group position={[0, 0.43, 0]}>
      {/* Central Stem 1 */}
      <mesh position={[0, 0.3, 0]} rotation={[0.1, 0, 0.18]} castShadow>
        <cylinderGeometry args={[0.012, 0.015, 0.6, 8]} />
        <meshPhysicalMaterial color="#6a7850" roughness={0.8} />
      </mesh>
      {/* Broad leaf */}
      <mesh position={[0.16, 0.65, 0.03]} rotation={[0.4, 0.1, 0.24]} castShadow>
        <boxGeometry args={[0.16, 0.5, 0.005]} />
        <meshPhysicalMaterial color="#384a2f" roughness={0.55} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Left/Back Stem 2 */}
      <mesh position={[-0.08, 0.38, -0.08]} rotation={[-0.2, 0, -0.25]} castShadow>
        <cylinderGeometry args={[0.011, 0.014, 0.78, 8]} />
        <meshPhysicalMaterial color="#6a7850" roughness={0.8} />
      </mesh>
      {/* Broad leaf */}
      <mesh position={[-0.38, 0.88, -0.32]} rotation={[-0.45, 0.2, -0.5]} castShadow>
        <boxGeometry args={[0.18, 0.56, 0.005]} />
        <meshPhysicalMaterial color="#2d3d25" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Right/Front Stem 3 */}
      <mesh position={[0.08, 0.45, 0.08]} rotation={[0.2, 0.1, 0.32]} castShadow>
        <cylinderGeometry args={[0.011, 0.014, 0.9, 8]} />
        <meshPhysicalMaterial color="#6a7850" roughness={0.8} />
      </mesh>
      {/* Broad leaf */}
      <mesh position={[0.48, 1.05, 0.34]} rotation={[0.55, -0.15, 0.65]} castShadow>
        <boxGeometry args={[0.17, 0.54, 0.005]} />
        <meshPhysicalMaterial color="#32472a" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* High Central Stem 4 */}
      <mesh position={[0, 0.55, 0]} rotation={[0, 0, -0.05]} castShadow>
        <cylinderGeometry args={[0.011, 0.013, 1.1, 8]} />
        <meshPhysicalMaterial color="#6a7850" roughness={0.8} />
      </mesh>
      {/* Broad leaf */}
      <mesh position={[-0.04, 1.25, 0]} rotation={[0.1, 0, -0.12]} castShadow>
        <boxGeometry args={[0.15, 0.6, 0.005]} />
        <meshPhysicalMaterial color="#3a4f32" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  </group>
);

const ElegantDesk = (props: any) => (
  <group {...props}>
    {/* Frame Rim Support (Sleek brass metal frame under marble/ebony) */}
    <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
      <boxGeometry args={[2.0, 0.04, 0.8]} />
      <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.15} />
    </mesh>
    {/* Luxury desk tabletop: Polished Ebony / Black Marble */}
    <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
      <boxGeometry args={[2.04, 0.04, 0.84]} />
      <meshPhysicalMaterial color="#1a1a1a" roughness={0.2} metalness={0.1} clearcoat={1.0} clearcoatRoughness={0.05} />
    </mesh>

    {/* Elegant structural side legs */}
    <mesh position={[-0.9, 0.36, 0]} castShadow>
      <boxGeometry args={[0.04, 0.72, 0.76]} />
      <meshPhysicalMaterial color="#111111" roughness={0.3} />
    </mesh>
    <mesh position={[0.9, 0.36, 0]} castShadow>
      <boxGeometry args={[0.04, 0.72, 0.76]} />
      <meshPhysicalMaterial color="#111111" roughness={0.3} />
    </mesh>

    {/* Floating side storage drawers in fine Teak/Oak */}
    <mesh position={[0.62, 0.52, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.42, 0.28, 0.74]} />
      <meshPhysicalMaterial color="#3d2817" roughness={0.7} />
    </mesh>
    {/* Tiny brass draw handles */}
    <mesh position={[0.62, 0.52, 0.375]} castShadow>
      <boxGeometry args={[0.18, 0.03, 0.01]} />
      <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
    </mesh>

    {/* Minimalist IMac-style computer mockup on desk */}
    <group position={[0, 0.78, -0.15]}>
      {/* Aluminium screen stand */}
      <mesh position={[0, 0.12, 0]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.1, 0.24, 0.1]} />
        <meshPhysicalMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Monitor Chassis */}
      <mesh position={[0, 0.34, 0.02]} rotation={[-0.05, 0, 0]} castShadow>
        <boxGeometry args={[0.62, 0.36, 0.015]} />
        <meshPhysicalMaterial color="#151515" metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Polished Glass Screen Panel */}
      <mesh position={[0, 0.34, 0.028]} rotation={[-0.05, 0, 0]} receiveShadow>
        <planeGeometry args={[0.6, 0.32]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.05} metalness={0.95} clearcoat={1.0} />
      </mesh>
      {/* Slim aluminum keyboard */}
      <mesh position={[0, 0.005, 0.24]} castShadow>
        <boxGeometry args={[0.26, 0.01, 0.09]} />
        <meshPhysicalMaterial color="#e5e5e5" metalness={0.5} roughness={0.4} />
      </mesh>
    </group>

    {/* Table study desk lamp with active light bulb and localized workspace point lighting */}
    <group position={[-0.7, 0.78, 0.1]}>
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.015, 12]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.03, 0.18, -0.01]} rotation={[0, 0, -0.22]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.34, 8]} />
        <meshPhysicalMaterial color="#111111" roughness={0.4} />
      </mesh>
      <mesh position={[-0.02, 0.35, -0.03]} rotation={[0, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.22, 8]} />
        <meshPhysicalMaterial color="#111111" roughness={0.4} />
      </mesh>
      {/* Elegant cone lamp shade */}
      <mesh position={[-0.06, 0.42, -0.03]} rotation={[0, 0, 1.2]} castShadow>
        <coneGeometry args={[0.07, 0.11, 16]} />
        <meshPhysicalMaterial color="#1d1d1d" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Glowing filament */}
      <mesh position={[-0.06, 0.39, -0.03]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshBasicMaterial color="#ffeed8" />
      </mesh>
      <pointLight position={[-0.06, 0.36, -0.03]} intensity={1.8} distance={2.2} color="#ffe8cc" />
    </group>
  </group>
);

const ElegantChair = (props: any) => (
  <group {...props}>
    {/* Base star feet cylinder support */}
    <mesh position={[0, 0.08, 0]} castShadow>
      <cylinderGeometry args={[0.035, 0.035, 0.12, 12]} />
      <meshPhysicalMaterial color="#222" metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Five legs star split */}
    <mesh position={[0, 0.06, 0]} rotation={[0, 0.8, 0]} castShadow>
      <boxGeometry args={[0.48, 0.03, 0.04]} />
      <meshPhysicalMaterial color="#222" metalness={0.9} roughness={0.2} />
    </mesh>
    <mesh position={[0, 0.06, 0]} rotation={[0, -0.8, 0]} castShadow>
      <boxGeometry args={[0.48, 0.03, 0.04]} />
      <meshPhysicalMaterial color="#222" metalness={0.9} roughness={0.2} />
    </mesh>
    {/* Metallic pneumatic extension core */}
    <mesh position={[0, 0.22, 0]} castShadow>
      <cylinderGeometry args={[0.022, 0.022, 0.22, 12]} />
      <meshPhysicalMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
    </mesh>
    {/* Padded comfortable seat cushion (Rich Italian black leather) */}
    <mesh position={[0, 0.36, 0.02]} rotation={[0.05, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.48, 0.06, 0.46]} />
      <meshPhysicalMaterial color="#2d2d2d" roughness={0.65} metalness={0.15} />
    </mesh>
    {/* Ergonomically curved high backrest */}
    <group position={[0, 0.65, -0.16]} rotation={[-0.08, 0, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.44, 0.5, 0.04]} />
        <meshPhysicalMaterial color="#2d2d2d" roughness={0.65} metalness={0.15} />
      </mesh>
      {/* Metallic support handle back strap */}
      <mesh position={[0, -0.22, -0.03]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.015]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
      </mesh>
    </group>
  </group>
);

const ElegantBed = ({ woodColor = "#3d2817", bedspreadColor = "#f3f0e8", ...props }: { woodColor?: string; bedspreadColor?: string; [key: string]: any }) => (
  <group position={[0, 0, -0.4]} {...props}>
    {/* Modern wooden frame layout */}
    <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
      <boxGeometry args={[1.96, 0.14, 2.38]} />
      <meshPhysicalMaterial color={woodColor} roughness={0.6} />
    </mesh>

    {/* Luxury deep mattress layered */}
    <mesh position={[0, 0.35, 0.01]} castShadow receiveShadow>
      <boxGeometry args={[1.88, 0.26, 2.3]} />
      <meshPhysicalMaterial color="#ffffff" roughness={0.95} />
    </mesh>

    {/* Folded Duvet with soft aesthetic contours */}
    <mesh position={[0, 0.43, 0.18]} castShadow receiveShadow>
      <boxGeometry args={[1.9, 0.14, 1.58]} />
      <meshPhysicalMaterial color={bedspreadColor} roughness={0.88} />
    </mesh>
    {/* Decorative modern ochre scarf runner thrown across bed */}
    <mesh position={[0, 0.44, -0.6]} castShadow receiveShadow>
      <boxGeometry args={[1.92, 0.12, 0.12]} />
      <meshPhysicalMaterial color="#cca564" roughness={0.8} />
    </mesh>

    {/* Elegant velvet padded classical headboard board */}
    <mesh position={[0, 0.88, -1.18]} castShadow receiveShadow>
      <boxGeometry args={[2.04, 1.0, 0.08]} />
      <meshPhysicalMaterial color="#3a3024" roughness={0.7} />
    </mesh>
    {/* Decorative tufted grid sections */}
    <mesh position={[-0.45, 0.88, -1.13]} castShadow>
      <boxGeometry args={[0.82, 0.82, 0.03]} />
      <meshPhysicalMaterial color="#4a4034" roughness={0.8} />
    </mesh>
    <mesh position={[0.45, 0.88, -1.13]} castShadow>
      <boxGeometry args={[0.82, 0.82, 0.03]} />
      <meshPhysicalMaterial color="#4a4034" roughness={0.8} />
    </mesh>

    {/* Cozy Soft Down Sleeping Pillows */}
    <mesh position={[-0.43, 0.52, -0.84]} rotation={[0.18, 0, 0]} castShadow>
      <boxGeometry args={[0.66, 0.12, 0.42]} />
      <meshPhysicalMaterial color="#fafafa" roughness={0.95} />
    </mesh>
    <mesh position={[0.43, 0.52, -0.84]} rotation={[0.18, 0, 0]} castShadow>
      <boxGeometry args={[0.66, 0.12, 0.42]} />
      <meshPhysicalMaterial color="#fafafa" roughness={0.95} />
    </mesh>
    {/* Contrast mustard accent throw pillow */}
    <mesh position={[0, 0.51, -0.62]} rotation={[0.26, 0.1, -0.1]} castShadow>
      <boxGeometry args={[0.46, 0.08, 0.3]} />
      <meshPhysicalMaterial color="#cca564" roughness={0.75} />
    </mesh>

    {/* Luxury Side stands with glowing modern globe spheres */}
    {/* Left nightstand */}
    <group position={[-1.25, 0, -1.0]}>
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 0.44, 0.36]} />
        <meshPhysicalMaterial color={woodColor} roughness={0.75} />
      </mesh>
      {/* Front golden pull */}
      <mesh position={[0, 0.3, 0.181]} castShadow>
        <boxGeometry args={[0.14, 0.02, 0.015]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Globe base */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.01, 12]} />
        <meshPhysicalMaterial color="#111" metalness={0.8} />
      </mesh>
      {/* Glowing physical sphere lamp */}
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial color="#fff4e0" />
      </mesh>
      <pointLight position={[0, 0.52, 0.08]} intensity={1.2} distance={2.2} color="#ffe5ca" />
    </group>

    {/* Right nightstand */}
    <group position={[1.25, 0, -1.0]}>
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.38, 0.44, 0.36]} />
        <meshPhysicalMaterial color={woodColor} roughness={0.75} />
      </mesh>
      {/* Front golden pull */}
      <mesh position={[0, 0.3, 0.181]} castShadow>
        <boxGeometry args={[0.14, 0.02, 0.015]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Globe base */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.01, 12]} />
        <meshPhysicalMaterial color="#111" metalness={0.8} />
      </mesh>
      {/* Glowing physical sphere lamp */}
      <mesh position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial color="#fff4e0" />
      </mesh>
      <pointLight position={[0, 0.52, 0.08]} intensity={1.2} distance={2.2} color="#ffe5ca" />
    </group>
  </group>
);

const ElegantTree = (props: any) => (
  <group {...props}>
    {/* Trunk Assembly - Realistic organic split */}
    <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[0.08, 0.12, 1.2, 16]} />
      <meshPhysicalMaterial color="#352213" roughness={0.9} />
    </mesh>
    {/* Split Branches */}
    <mesh position={[-0.12, 1.1, 0.05]} rotation={[0.2, 0, -0.2]} castShadow>
      <cylinderGeometry args={[0.04, 0.07, 0.6, 8]} />
      <meshPhysicalMaterial color="#352213" roughness={0.9} />
    </mesh>
    <mesh position={[0.12, 1.2, -0.05]} rotation={[-0.2, 0, 0.25]} castShadow>
      <cylinderGeometry args={[0.035, 0.06, 0.5, 8]} />
      <meshPhysicalMaterial color="#352213" roughness={0.9} />
    </mesh>
    
    {/* Organic interlocking layered foliage clouds */}
    {/* Cloud 1 */}
    <mesh position={[-0.3, 1.5, 0.1]} castShadow>
      <sphereGeometry args={[0.42, 18, 18]} />
      <meshPhysicalMaterial color="#223e16" roughness={0.85} />
    </mesh>
    {/* Cloud 2 */}
    <mesh position={[0.3, 1.6, -0.1]} castShadow>
      <sphereGeometry args={[0.38, 18, 18]} />
      <meshPhysicalMaterial color="#2d4f1e" roughness={0.85} />
    </mesh>
    {/* Cloud 3 */}
    <mesh position={[0, 2.0, 0]} castShadow>
      <sphereGeometry args={[0.46, 18, 18]} />
      <meshPhysicalMaterial color="#325721" roughness={0.8} />
    </mesh>
    {/* Cloud 4 - Peak cap */}
    <mesh position={[0, 2.38, 0]} castShadow>
      <sphereGeometry args={[0.32, 16, 16]} />
      <meshPhysicalMaterial color="#3a6327" roughness={0.85} />
    </mesh>
  </group>
);

// --- Swimming Pool Landscape for Exterior Modes ---
const SwimmingPool = () => (
  <group position={[4.4, 0.015, 2.4]}>
    {/* Cedar Deck border wood */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[4.2, 4.6]} />
      <meshPhysicalMaterial color="#8e674b" roughness={0.7} />
    </mesh>
    {/* Inner Pool structure tile lining */}
    <mesh position={[0, -0.12, 0]} receiveShadow>
      <boxGeometry args={[3.3, 0.24, 3.7]} />
      <meshPhysicalMaterial color="#9adbff" roughness={0.3} />
    </mesh>
    {/* Translucent beautiful shimmering water surface with specular spec highlights */}
    <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[3.2, 3.6]} />
      <meshPhysicalMaterial color="#2cc3f0" roughness={0.025} metalness={0.15} transmission={0.9} clearcoat={1.0} clearcoatRoughness={0.05} />
    </mesh>
  </group>
);

// --- Flanking walkway security lamps (exterior) ---
const DrivewayGardenLight = (props: any) => (
  <group {...props}>
    {/* Black post column */}
    <mesh position={[0, 0.2, 0]} castShadow>
      <cylinderGeometry args={[0.024, 0.024, 0.4, 8]} />
      <meshPhysicalMaterial color="#111" roughness={0.4} />
    </mesh>
    {/* Brass cap wrap */}
    <mesh position={[0, 0.4, 0]}>
      <cylinderGeometry args={[0.03, 0.03, 0.02, 10]} />
      <meshPhysicalMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
    </mesh>
    {/* Glowing physical emitter capsule */}
    <mesh position={[0, 0.44, 0]}>
      <sphereGeometry args={[0.026, 10, 10]} />
      <meshBasicMaterial color="#fff3d0" />
    </mesh>
  </group>
);


// --- Living Room ---
const LivingRoomModel = ({ colors, activeSurf, onSurfClick }: any) => {
  return (
    <group>
      {/* Back Wall */}
      <mesh position={[0, 1.5, -2]} onClick={(e) => { e.stopPropagation(); onSurfClick('back'); }}>
        <planeGeometry args={[6, 3]} />
        <meshPhysicalMaterial color={colors.back || '#f4f4f4'} roughness={0.9} />
      </mesh>
      <HighlightPlane position={[0, 1.5, -2]} args={[6, 3]} isActive={activeSurf === 'back'} />
      
      {/* Left Wall */}
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('left'); }}>
        <planeGeometry args={[4, 3]} />
        <meshPhysicalMaterial color={colors.left || '#eaeaea'} roughness={0.9} />
      </mesh>
      <HighlightPlane position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} args={[4, 3]} isActive={activeSurf === 'left'} />

      {/* Right Wall */}
      <mesh position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('right'); }}>
        <planeGeometry args={[4, 3]} />
        <meshPhysicalMaterial color={colors.right || '#ededed'} roughness={0.9} />
      </mesh>
      <HighlightPlane position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} args={[4, 3]} isActive={activeSurf === 'right'} />

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('floor'); }}>
        <planeGeometry args={[6, 4]} />
        <meshPhysicalMaterial color={colors.floor || '#8b5e3c'} roughness={0.4} metalness={0.1} />
      </mesh>
      <HighlightPlane position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} args={[6, 4]} isActive={activeSurf === 'floor'} />

      {/* Ceiling */}
      <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('ceiling'); }}>
        <planeGeometry args={[6, 4]} />
        <meshPhysicalMaterial color={colors.ceiling || '#fafafa'} roughness={1} />
      </mesh>
      <HighlightPlane position={[0, 2.995, 0]} rotation={[Math.PI / 2, 0, 0]} args={[6, 4]} isActive={activeSurf === 'ceiling'} />

      {/* --- Upgraded Structural Layers --- */}
      <ElegantRoomTrim />
      <DecorativeWindow onSurfClick={onSurfClick} />
      <ElegantRug color="#e5e0d3" />
      <CeilingLamp />

      {/* High-end Models */}
      <Float speed={1} rotationIntensity={0} floatIntensity={0.15}>
        <ElegantCouch position={[-0.4, 0, -0.4]} rotation={[0, 0.18, 0]} scale={1.25} />
      </Float>
      
      <ElegantPlant position={[2.1, 0, -1.4]} scale={1.4} />
      
      <ContactShadows resolution={1024} scale={10} blur={2.2} opacity={0.65} far={2} color="#000000" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 4]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 5, 0]} intensity={0.4} />
    </group>
  );
};

// --- Bedroom ---
const BedroomModel = ({ colors, activeSurf, onSurfClick }: any) => {
  return (
    <group>
      {/* Back Wall */}
      <mesh position={[0, 1.5, -2]} onClick={(e) => { e.stopPropagation(); onSurfClick('back'); }}>
        <planeGeometry args={[6, 3]} />
        <meshPhysicalMaterial color={colors.back || '#f4f4f4'} roughness={0.9} />
      </mesh>
      <HighlightPlane position={[0, 1.5, -2]} args={[6, 3]} isActive={activeSurf === 'back'} />

      {/* Left Wall */}
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('left'); }}>
        <planeGeometry args={[4, 3]} />
        <meshPhysicalMaterial color={colors.left || '#eaeaea'} roughness={0.9} />
      </mesh>
      <HighlightPlane position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} args={[4, 3]} isActive={activeSurf === 'left'} />

      {/* Right Wall */}
      <mesh position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('right'); }}>
        <planeGeometry args={[4, 3]} />
        <meshPhysicalMaterial color={colors.right || '#ededed'} roughness={0.9} />
      </mesh>
      <HighlightPlane position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} args={[4, 3]} isActive={activeSurf === 'right'} />

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('floor'); }}>
        <planeGeometry args={[6, 4]} />
        <meshPhysicalMaterial color={colors.floor || '#e0d5c3'} roughness={0.8} />
      </mesh>
      <HighlightPlane position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} args={[6, 4]} isActive={activeSurf === 'floor'} />

      {/* Ceiling */}
      <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('ceiling'); }}>
        <planeGeometry args={[6, 4]} />
        <meshPhysicalMaterial color={colors.ceiling || '#fafafa'} roughness={1} />
      </mesh>
      <HighlightPlane position={[0, 2.995, 0]} rotation={[Math.PI / 2, 0, 0]} args={[6, 4]} isActive={activeSurf === 'ceiling'} />

      {/* --- Upgraded Structural Layers --- */}
      <ElegantRoomTrim />
      <DecorativeWindow onSurfClick={onSurfClick} />
      <ElegantRug color="#ded6c5" args={[1.4, 32]} />

      {/* Abstract Bed */}
      <ElegantBed scale={1.12} />

      <ElegantPlant position={[-2.1, 0, -1.3]} scale={1.1} />

      <ContactShadows resolution={1024} scale={10} blur={2.2} opacity={0.65} far={2} color="#000000" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 6, 4]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <spotLight position={[-3.5, 4.5, 2.5]} intensity={1.8} angle={0.5} penumbra={1} castShadow />
    </group>
  );
};

// --- Office ---
const OfficeModel = ({ colors, activeSurf, onSurfClick }: any) => {
  return (
    <group>
      {/* Back Wall */}
      <mesh position={[0, 1.5, -2]} onClick={(e) => { e.stopPropagation(); onSurfClick('back'); }}>
        <planeGeometry args={[6, 3]} />
        <meshPhysicalMaterial color={colors.back || '#f4f4f4'} roughness={0.9} />
      </mesh>
      <HighlightPlane position={[0, 1.5, -2]} args={[6, 3]} isActive={activeSurf === 'back'} />

      {/* Left Wall */}
      <mesh position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('left'); }}>
        <planeGeometry args={[4, 3]} />
        <meshPhysicalMaterial color={colors.left || '#eaeaea'} roughness={0.9} />
      </mesh>
      <HighlightPlane position={[-3, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} args={[4, 3]} isActive={activeSurf === 'left'} />

      {/* Right Wall */}
      <mesh position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('right'); }}>
        <planeGeometry args={[4, 3]} />
        <meshPhysicalMaterial color={colors.right || '#ededed'} roughness={0.9} />
      </mesh>
      <HighlightPlane position={[3, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} args={[4, 3]} isActive={activeSurf === 'right'} />

      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('floor'); }}>
        <planeGeometry args={[6, 4]} />
        <meshPhysicalMaterial color={colors.floor || '#8b5e3c'} roughness={0.3} metalness={0.1} />
      </mesh>
      <HighlightPlane position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} args={[6, 4]} isActive={activeSurf === 'floor'} />

      {/* Ceiling */}
      <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('ceiling'); }}>
        <planeGeometry args={[6, 4]} />
        <meshPhysicalMaterial color={colors.ceiling || '#fafafa'} roughness={1} />
      </mesh>
      <HighlightPlane position={[0, 2.995, 0]} rotation={[Math.PI / 2, 0, 0]} args={[6, 4]} isActive={activeSurf === 'ceiling'} />

      {/* --- Upgraded Structural Layers --- */}
      <ElegantRoomTrim />
      <DecorativeWindow onSurfClick={onSurfClick} />
      <ElegantRug color="#e1dacd" args={[1.3, 32]} />

      <Float speed={1} rotationIntensity={0} floatIntensity={0.08}>
        <ElegantDesk position={[0, 0, -0.4]} scale={1.25} />
      </Float>
      <ElegantChair position={[0.0, 0, 0.25]} scale={1.2} />

      <ElegantPlant position={[2.1, 0, -1.3]} scale={1.3} />

      <ContactShadows resolution={1024} scale={10} blur={2.2} opacity={0.65} far={2} color="#000000" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 6, 3]} intensity={1.0} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[0, 2.7, 0]} intensity={1.2} />
    </group>
  );
};

// --- Exterior: Modern Luxury Bungalow ---
const ModernLuxuryBungalowModel = ({ colors, activeSurf, onSurfClick }: any) => {
  return (
    <group>
      {/* Real Cantilever Block Main structure */}
      <mesh position={[0, 2, -1]} onClick={(e) => { e.stopPropagation(); onSurfClick('wall'); }}>
        <boxGeometry args={[8, 4, 3]} />
        <meshPhysicalMaterial color={colors.wall || '#f4f4f4'} roughness={0.9} />
      </mesh>
      
      {/* Cantilever balcony overhang (creates beautiful photoreal shadows) */}
      <mesh position={[2, 3, 0.5]} onClick={(e) => { e.stopPropagation(); onSurfClick('wall'); }}>
        <boxGeometry args={[4, 1.5, 2]} />
        <meshPhysicalMaterial color={colors.wall || '#f4f4f4'} roughness={0.9} />
      </mesh>
      <HighlightBox position={[0, 2, -1]} args={[8, 4, 3]} isActive={activeSurf === 'wall'} />
      <HighlightBox position={[2, 3, 0.5]} args={[4, 1.5, 2]} isActive={activeSurf === 'wall'} />

      {/* Sophisticated Windows (reflecting sky/light) */}
      <group position={[-2, 2.5, 0.52]}>
        <mesh castShadow>
          <boxGeometry args={[1.8, 1.2, 0.05]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.68, 1.08]} />
          <meshPhysicalMaterial color="#90e0ef" roughness={0.05} metalness={0.9} transmission={0.9} clearcoat={1.0} />
        </mesh>
      </group>

      <group position={[2.2, 3.0, 1.52]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 0.8, 0.05]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[2.08, 0.68]} />
          <meshPhysicalMaterial color="#90e0ef" roughness={0.05} metalness={0.9} transmission={0.9} clearcoat={1.0} />
        </mesh>
      </group>

      {/* Roof Fascia & Flat Parapet Canopy */}
      <mesh position={[0, 4.2, -1]} onClick={(e) => { e.stopPropagation(); onSurfClick('roof'); }}>
        <boxGeometry args={[8.4, 0.4, 3.4]} />
        <meshPhysicalMaterial color={colors.roof || '#5a544c'} roughness={0.8} />
      </mesh>
      <HighlightBox position={[0, 4.2, -1]} args={[8.4, 0.4, 3.4]} isActive={activeSurf === 'roof'} />

      {/* Front Entrance Main Hardwood Door */}
      <mesh position={[-1, 1.25, 0.51]} onClick={(e) => { e.stopPropagation(); onSurfClick('door'); }}>
        <boxGeometry args={[1.4, 2.5, 0.1]} />
        <meshPhysicalMaterial color={colors.door || '#8b5e3c'} roughness={0.35} metalness={0.15} />
      </mesh>
      {/* Golden door drag handle */}
      <mesh position={[-0.4, 1.25, 0.57]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
      </mesh>
      <HighlightBox position={[-1, 1.25, 0.51]} args={[1.4, 2.5, 0.1]} isActive={activeSurf === 'door'} />

      {/* Left Columns / Pillars feature */}
      <mesh position={[-3, 2, 0.5]} onClick={(e) => { e.stopPropagation(); onSurfClick('pillars'); }}>
        <boxGeometry args={[0.36, 4, 0.36]} />
        <meshPhysicalMaterial color={colors.pillars || '#eaeaea'} roughness={0.65} />
      </mesh>
      <HighlightBox position={[-3, 2, 0.5]} args={[0.36, 4, 0.36]} isActive={activeSurf === 'pillars'} />

      {/* Ground/Grass Lawn */}
      <mesh position={[0, 0, 3]} rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('ground'); }}>
        <planeGeometry args={[16, 12]} />
        <meshPhysicalMaterial color={colors.ground || '#8a9a70'} roughness={1} />
      </mesh>
      <HighlightPlane position={[0, 0.005, 3]} rotation={[-Math.PI / 2, 0, 0]} args={[16, 12]} isActive={activeSurf === 'ground'} />
      
      {/* Premium Concrete tiled Walkway */}
      <mesh position={[-1, 0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 8]} />
        <meshPhysicalMaterial color="#cccccc" roughness={0.8} />
      </mesh>

      {/* Custom Landscaping */}
      <SwimmingPool />
      <DrivewayGardenLight position={[-2.4, 0, 1.5]} />
      <DrivewayGardenLight position={[2.4, 0, 1.5]} />

      <ElegantTree position={[-5, 0, 1]} scale={1.25} />
      <ElegantTree position={[5.2, 0, 5]} scale={1.0} />

      <ContactShadows resolution={1024} scale={18} blur={2.2} opacity={0.65} far={4} color="#000000" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[12, 12, 6]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-12, 6, 2]} intensity={0.4} />
    </group>
  );
};

// --- Exterior: Conventional Indian Villa ---
const IndianVillaModel = ({ colors, activeSurf, onSurfClick }: any) => {
  return (
    <group>
      {/* Solid brick main structure */}
      <mesh position={[0, 2, -1]} onClick={(e) => { e.stopPropagation(); onSurfClick('wall'); }}>
        <boxGeometry args={[7, 4, 3]} />
        <meshPhysicalMaterial color={colors.wall || '#f4f4f4'} roughness={0.9} />
      </mesh>
      <HighlightBox position={[0, 2, -1]} args={[7, 4, 3]} isActive={activeSurf === 'wall'} />
      
      {/* Glass windows */}
      <group position={[-1.8, 1.8, 0.52]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 1.2, 0.05]} />
          <meshPhysicalMaterial color="#111" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.38, 1.08]} />
          <meshPhysicalMaterial color="#0077b6" roughness={0.05} metalness={0.9} transmission={0.9} clearcoat={1.0} transparent opacity={0.5} />
        </mesh>
      </group>
      <group position={[1.8, 1.8, 0.52]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 1.2, 0.05]} />
          <meshPhysicalMaterial color="#111" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.38, 1.08]} />
          <meshPhysicalMaterial color="#0077b6" roughness={0.05} metalness={0.9} transmission={0.9} clearcoat={1.0} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Styled Pitched Roof (Traditional Red/Grey Terracotta slate tile patterning) */}
      <mesh position={[0, 5, -1]} rotation={[0, Math.PI / 4, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('roof'); }}>
        <coneGeometry args={[4.9, 2, 4]} />
        <meshPhysicalMaterial color={colors.roof || '#5a544c'} roughness={0.8} />
      </mesh>
      {/* Wireframe interlocking ridge overlays representing ridges */}
      <mesh position={[0, 4.96, -1]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[4.95, 1.95, 4]} />
        <meshPhysicalMaterial color={colors.roof || '#5a544c'} roughness={0.8} wireframe wireframeLinewidth={3.5} />
      </mesh>

      {/* Main Baseboard ceiling canopy wrap */}
      <mesh position={[0, 4.2, -1]} onClick={(e) => { e.stopPropagation(); onSurfClick('roof'); }}>
        <boxGeometry args={[7.4, 0.6, 3.4]} />
        <meshPhysicalMaterial color={colors.roof || '#5a544c'} roughness={0.8} />
      </mesh>
      <HighlightBox position={[0, 4.2, -1]} args={[7.4, 0.6, 3.4]} isActive={activeSurf === 'roof'} />

      {/* Arched main entry door */}
      <mesh position={[0, 1.25, 0.51]} onClick={(e) => { e.stopPropagation(); onSurfClick('door'); }}>
        <boxGeometry args={[1.2, 2.5, 0.1]} />
        <meshPhysicalMaterial color={colors.door || '#8b5e3c'} roughness={0.3} metalness={0.15} />
      </mesh>
      <HighlightBox position={[0, 1.25, 0.51]} args={[1.2, 2.5, 0.1]} isActive={activeSurf === 'door'} />

      {/* Majestic Roman arched porch pillars */}
      <mesh position={[-1.6, 1.5, 1.5]} onClick={(e) => { e.stopPropagation(); onSurfClick('pillars'); }}>
        <cylinderGeometry args={[0.18, 0.18, 3, 16]} />
        <meshPhysicalMaterial color={colors.pillars || '#eaeaea'} roughness={0.65} />
      </mesh>
      <mesh position={[1.6, 1.5, 1.5]} onClick={(e) => { e.stopPropagation(); onSurfClick('pillars'); }}>
        <cylinderGeometry args={[0.18, 0.18, 3, 16]} />
        <meshPhysicalMaterial color={colors.pillars || '#eaeaea'} roughness={0.65} />
      </mesh>
      {/* Overhead porch canopy ceiling */}
      <mesh position={[0, 3, 1.5]} onClick={(e) => { e.stopPropagation(); onSurfClick('pillars'); }}>
        <boxGeometry args={[4.2, 0.28, 0.6]} />
        <meshPhysicalMaterial color={colors.pillars || '#eaeaea'} roughness={0.65} />
      </mesh>
      <HighlightBox position={[0, 3, 1.5]} args={[4.2, 0.28, 0.6]} isActive={activeSurf === 'pillars'} />

      {/* Grass garden */}
      <mesh position={[0, 0, 3]} rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('ground'); }}>
        <planeGeometry args={[15, 12]} />
        <meshPhysicalMaterial color={colors.ground || '#8a9a70'} roughness={1} />
      </mesh>
      <HighlightPlane position={[0, 0.005, 3]} rotation={[-Math.PI / 2, 0, 0]} args={[15, 12]} isActive={activeSurf === 'ground'} />
      
      {/* Stone pathway */}
      <mesh position={[0, 0.012, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 8]} />
        <meshPhysicalMaterial color="#cccccc" roughness={0.9} />
      </mesh>

      {/* Landscaping */}
      <ElegantTree position={[-4.2, 0, 1.8]} scale={0.9} />
      <ElegantTree position={[4.2, 0, 1.2]} scale={1.25} />

      <ContactShadows resolution={1024} scale={18} blur={2.2} opacity={0.65} far={4} color="#000000" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 12, 6]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-10, 6, 2]} intensity={0.4} />
    </group>
  );
};

// --- Exterior: Apartment Style ---
const ApartmentModel = ({ colors, activeSurf, onSurfClick }: any) => {
  return (
    <group>
      {/* Multi-storey modern blocks */}
      <mesh position={[0, 4, -1]} onClick={(e) => { e.stopPropagation(); onSurfClick('wall'); }}>
        <boxGeometry args={[9, 8, 3]} />
        <meshPhysicalMaterial color={colors.wall || '#f4f4f4'} roughness={0.9} />
      </mesh>
      <HighlightBox position={[0, 4, -1]} args={[9, 8, 3]} isActive={activeSurf === 'wall'} />
      
      {/* Multiple cutout windows for realistic multi-apartment scale */}
      <group position={[-2.5, 4.8, 0.52]}>
        <mesh castShadow><boxGeometry args={[1.4, 1.2, 0.05]} /><meshPhysicalMaterial color="#111" /></mesh>
        <mesh position={[0, 0, 0.01]}><planeGeometry args={[1.28, 1.08]} /><meshPhysicalMaterial color="#0077b6" transmission={0.9} clearcoat={1.0} /></mesh>
      </group>
      <group position={[2.5, 4.8, 0.52]}>
        <mesh castShadow><boxGeometry args={[1.4, 1.2, 0.05]} /><meshPhysicalMaterial color="#111" /></mesh>
        <mesh position={[0, 0, 0.01]}><planeGeometry args={[1.28, 1.08]} /><meshPhysicalMaterial color="#0077b6" transmission={0.9} clearcoat={1.0} /></mesh>
      </group>
      <group position={[-2.5, 2.2, 0.52]}>
        <mesh castShadow><boxGeometry args={[1.4, 1.2, 0.05]} /><meshPhysicalMaterial color="#111" /></mesh>
        <mesh position={[0, 0, 0.01]}><planeGeometry args={[1.28, 1.08]} /><meshPhysicalMaterial color="#0077b6" transmission={0.9} clearcoat={1.0} /></mesh>
      </group>
      <group position={[2.5, 2.2, 0.52]}>
        <mesh castShadow><boxGeometry args={[1.4, 1.2, 0.05]} /><meshPhysicalMaterial color="#111" /></mesh>
        <mesh position={[0, 0, 0.01]}><planeGeometry args={[1.28, 1.08]} /><meshPhysicalMaterial color="#0077b6" transmission={0.9} clearcoat={1.0} /></mesh>
      </group>

      {/* Main Flat Overhang Roof Parapet */}
      <mesh position={[0, 8.1, -1]} onClick={(e) => { e.stopPropagation(); onSurfClick('roof'); }}>
        <boxGeometry args={[9.5, 0.28, 3.5]} />
        <meshPhysicalMaterial color={colors.roof || '#5a544c'} roughness={0.8} />
      </mesh>
      <HighlightBox position={[0, 8.1, -1]} args={[9.5, 0.28, 3.5]} isActive={activeSurf === 'roof'} />

      {/* Grand entrance glass doors */}
      <mesh position={[0, 1.25, 0.51]} onClick={(e) => { e.stopPropagation(); onSurfClick('door'); }}>
        <boxGeometry args={[2, 2.5, 0.1]} />
        <meshPhysicalMaterial color={colors.door || '#8b5e3c'} roughness={0.25} metalness={0.15} />
      </mesh>
      <HighlightBox position={[0, 1.25, 0.51]} args={[2, 2.5, 0.1]} isActive={activeSurf === 'door'} />

      {/* Balcony structures & structural dividers */}
      {/* 1st Floor Balconies */}
      <mesh position={[-2.5, 3.5, 0.8]} onClick={(e) => { e.stopPropagation(); onSurfClick('pillars'); }}>
        <boxGeometry args={[2.5, 0.8, 1.0]} />
        <meshPhysicalMaterial color={colors.pillars || '#eaeaea'} roughness={0.65} />
      </mesh>
      {/* Balcony rails */}
      <mesh position={[-2.5, 4.0, 1.3]}>
        <boxGeometry args={[2.4, 0.4, 0.02]} />
        <meshPhysicalMaterial color="#111" metalness={0.9} transparent opacity={0.6} />
      </mesh>

      <mesh position={[2.5, 3.5, 0.8]} onClick={(e) => { e.stopPropagation(); onSurfClick('pillars'); }}>
        <boxGeometry args={[2.5, 0.8, 1.0]} />
        <meshPhysicalMaterial color={colors.pillars || '#eaeaea'} roughness={0.65} />
      </mesh>
      <mesh position={[2.5, 4.0, 1.3]}>
        <boxGeometry args={[2.4, 0.4, 0.02]} />
        <meshPhysicalMaterial color="#111" metalness={0.9} transparent opacity={0.6} />
      </mesh>

      {/* 2nd Floor Balconies */}
      <mesh position={[-2.5, 6.1, 0.8]} onClick={(e) => { e.stopPropagation(); onSurfClick('pillars'); }}>
        <boxGeometry args={[2.5, 0.8, 1.0]} />
        <meshPhysicalMaterial color={colors.pillars || '#eaeaea'} roughness={0.65} />
      </mesh>
      <mesh position={[-2.5, 6.6, 1.3]}>
        <boxGeometry args={[2.4, 0.4, 0.02]} />
        <meshPhysicalMaterial color="#111" metalness={0.9} transparent opacity={0.6} />
      </mesh>

      <mesh position={[2.5, 6.1, 0.8]} onClick={(e) => { e.stopPropagation(); onSurfClick('pillars'); }}>
        <boxGeometry args={[2.5, 0.8, 1.0]} />
        <meshPhysicalMaterial color={colors.pillars || '#eaeaea'} roughness={0.65} />
      </mesh>
      <mesh position={[2.5, 6.6, 1.3]}>
        <boxGeometry args={[2.4, 0.4, 0.02]} />
        <meshPhysicalMaterial color="#111" metalness={0.9} transparent opacity={0.6} />
      </mesh>

      <HighlightBox position={[-2.5, 3.5, 0.8]} args={[2.5, 0.8, 1.0]} isActive={activeSurf === 'pillars'} />
      <HighlightBox position={[2.5, 3.5, 0.8]} args={[2.5, 0.8, 1.0]} isActive={activeSurf === 'pillars'} />
      <HighlightBox position={[-2.5, 6.1, 0.8]} args={[2.5, 0.8, 1.0]} isActive={activeSurf === 'pillars'} />
      <HighlightBox position={[2.5, 6.1, 0.8]} args={[2.5, 0.8, 1.0]} isActive={activeSurf === 'pillars'} />

      {/* Ground Grass */}
      <mesh position={[0, 0, 3]} rotation={[-Math.PI / 2, 0, 0]} onClick={(e) => { e.stopPropagation(); onSurfClick('ground'); }}>
        <planeGeometry args={[16, 12]} />
        <meshPhysicalMaterial color={colors.ground || '#8a9a70'} roughness={1} />
      </mesh>
      <HighlightPlane position={[0, 0.005, 3]} rotation={[-Math.PI / 2, 0, 0]} args={[16, 12]} isActive={activeSurf === 'ground'} />
      
      {/* Driveway */}
      <mesh position={[0, 0.01, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 8]} />
        <meshPhysicalMaterial color="#cccccc" roughness={0.9} />
      </mesh>

      <ElegantTree position={[-4.5, 0, 2]} scale={1.15} />
      <ElegantTree position={[4.5, 0, 3]} scale={1.15} />

      <ContactShadows resolution={1024} scale={20} blur={2.2} opacity={0.65} far={4} color="#000000" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 14, 5]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-10, 6, 2]} intensity={0.4} />
    </group>
  );
};

// Removed unused export Photoreal components
