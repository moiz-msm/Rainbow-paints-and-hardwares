import React from 'react';

interface CategorySeoBlockProps {
  category?: string;
}

export default function CategorySeoBlock({ category }: CategorySeoBlockProps) {
  if (!category) return null;

  const contentMap: Record<string, React.ReactNode> = {
    'All Categories': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Buy <span className="text-gold">Paint Online</span> in Coimbatore at Wholesale Prices
        </h2>
        <p className="mb-4">
          Looking for the <strong>best paint shop near me</strong>? Rainbow Paints is your premier destination to <strong>buy paint online</strong> and in-store. We are a trusted wholesale dealer offering an extensive catalog of premium interior and exterior paints, waterproofing chemicals, wood finishes, and industrial coatings. Whether you are a homeowner planning a DIY makeover or a professional painting contractor, we provide the highest quality materials at unmatched factory prices.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Authorized Dealer for <span className="text-gold">Top Paint Brands</span>
        </h3>
        <p className="mb-4">
          We stock 100% genuine, unadulterated products from industry leaders like <strong>Asian Paints, Berger Paints, Dr. Fixit, and MRF Vapocure</strong>. By bypassing middlemen, we guarantee that you get authentic paints, primers, putty, and texture finishes directly from the manufacturer's warehouse to your doorstep.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Home Wall Paints:</strong> Washable interior luxury emulsions and ultra-durable exterior weather-proof coatings.</li>
          <li><strong>Construction Chemicals:</strong> Professional-grade damp-proofing, crack fillers, and epoxy tile grouts.</li>
          <li><strong>Wood & Metal Care:</strong> High-gloss polyurethane (PU) polishes, melamine, and anti-rust synthetic enamels.</li>
        </ul>
      </>
    ),

    'Exterior Paints': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Buy <span className="text-gold">Exterior Paint</span> Online in Coimbatore
        </h2>
        <p className="mb-4">
          Protect and beautify your home with the <strong>best exterior paints</strong> available in the market. At Rainbow Paints, we offer a comprehensive range of premium and <strong>affordable exterior paints</strong> specifically formulated to withstand the harsh Indian climate. Whether you need <strong>outdoor paint for house</strong> facades, commercial buildings, or large projects, our selection ensures long-lasting color and structural protection.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Top Rated <span className="text-gold">Exterior Wall Paints</span>
        </h3>
        <p className="mb-4">
          Our catalog includes industry-leading products like <strong>Asian Paints Ultima Protek</strong>, Apex, and <strong>moisture resistant paint</strong> solutions. If you are looking for specific textures, tile guards, or high-performance <strong>exterior paint for buildings</strong>, we have you covered. We also stock advanced formulations like <strong>self-leveling polyurethane systems</strong> and paints that cover mold to keep your exterior walls pristine.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Asian Paints Ultima Protek:</strong> Unmatched weatherproofing with up to 10 years of warranty.</li>
          <li><strong>Apex Exterior Emulsion:</strong> Smooth, water-based finish with excellent anti-algal properties.</li>
          <li><strong>Moisture & Moss Resistant Paints:</strong> Essential for coastal and high-humidity zones to prevent green algae.</li>
        </ul>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Calculate Your <span className="text-gold">Paint Cost</span>
        </h3>
        <p className="mb-4">
          Planning a painting project? Use our integrated <strong>paint cost calculator</strong> to estimate the exact requirement per square feet, helping you manage your budget efficiently. Shop <strong>exterior wall paint</strong> online today and get fast, local delivery across Coimbatore.
        </p>
      </>
    ),

    'Interior Paints': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Buy <span className="text-gold">Interior Paint</span> Online for Premium Home Interiors
        </h2>
        <p className="mb-4">
          Transform your living spaces with our curated collection of <strong>luxury emulsion paint</strong> and <strong>high sheen paint</strong>. Choosing the right interior paint is crucial not just for aesthetics, but also for maintaining a healthy home environment. We offer everything from standard washable paints to specialized <strong>anti mould ceiling paint</strong> for damp-prone areas like bathrooms and kitchens.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Explore Our Range of <span className="text-gold">Premium Emulsions</span>
        </h3>
        <p className="mb-4">
          Discover industry favorites like <strong>Asian Paints Royale Glitz</strong> for an ultra-smooth, luxurious finish, and <strong>Berger Easy Clean</strong> for homes with kids and pets. Our interior paints provide rich color payoff, superior stain resistance, and a silky touch.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Luxury High Sheen Paint:</strong> Perfect for living rooms to create a bright, expansive feel.</li>
          <li><strong>Easy Clean & Washable Paints:</strong> Effortlessly wipe away stains without damaging the paint film.</li>
          <li><strong>Anti Mould & Moisture Resistant:</strong> Keep your bathroom and kitchen ceilings clean and healthy.</li>
        </ul>
        <p className="mb-4">
          From soothing neutrals to bold accent colors, you can securely <strong>buy interior paint</strong> online from Rainbow Paints. We stock top brands including Asian Paints, Berger, and MRF, ensuring you receive 100% genuine products with fast local delivery.
        </p>
      </>
    ),
    
    'Waterproofing': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Advanced <span className="text-gold">Waterproofing Solutions</span> in Coimbatore
        </h2>
        <p className="mb-4">
          Protect your home from structural damage, dampness, and leaks with our professional-grade <strong>waterproofing chemicals and compounds</strong>. Whether it's roof leakage, bathroom seepage, or exterior wall dampness, Rainbow Paints provides top-tier waterproofing products to secure your investment against heavy rains.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Trusted <span className="text-gold">Waterproofing Brands</span>
        </h3>
        <p className="mb-4">
          We stock proven solutions from industry leaders like <strong>Dr. Fixit, Asian Paints SmartCare, and Berger Home Shield</strong>. From crack fillers and damp proofing base coats to elastomeric exterior coatings, find exactly what you need for a long-lasting, water-resistant seal.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Roof & Terrace Waterproofing:</strong> High-build elastomeric coatings to prevent roof leaks and reduce interior temperatures.</li>
          <li><strong>Bathroom & Kitchen:</strong> Specialized epoxy grouts and under-tile membranes for wet areas.</li>
          <li><strong>Exterior Wall Dampness:</strong> Moisture-blocking primers and textured protective coats.</li>
        </ul>
      </>
    ),

    'Wood Finishes': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Premium <span className="text-gold">Wood & Metal Finishes</span> Online
        </h2>
        <p className="mb-4">
          Elevate your furniture, doors, and metal structures with high-quality <strong>wood polishes, PU finishes, and enamel paints</strong>. Our collection ensures durability, deep gloss, and long-lasting protection against termites, moisture, and rust.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Explore <span className="text-gold">Enamels & Polishes</span>
        </h3>
        <p className="mb-4">
          Whether you are looking for a matte melamine polish for your wooden cabinets or a high-gloss synthetic enamel for metal gates, we offer top brands like <strong>MRF WoodCoat, Asian Paints Apcolite, and Sheenlac</strong>. 
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Wood Polishes & PU:</strong> Retain the natural grain of wood with crystal-clear polyurethane coatings.</li>
          <li><strong>Metal Enamels:</strong> Anti-rust, weather-resistant paints for grills, gates, and industrial machinery.</li>
          <li><strong>Thinners & Sealers:</strong> High-grade sanding sealers and NC thinners for surface preparation.</li>
        </ul>
      </>
    ),

    'Undercoats': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Buy <span className="text-gold">Primers, Putty & Undercoats</span> Online
        </h2>
        <p className="mb-4">
          A flawless paint job starts with a perfect foundation. Explore our wide range of <strong>wall putty, exterior primers, and interior base coats</strong> to ensure your topcoat adheres properly and lasts for years. 
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          The Best Base for <span className="text-gold">Every Surface</span>
        </h3>
        <p className="mb-4">
          We carry premium acrylic wall putty, water-thinnable primers, and specialized anti-efflorescence primers from brands like Asian Paints and Birla White. Getting the base right guarantees better coverage, richer color payoff, and reduced paint consumption.
        </p>
      </>
    ),

    'Painting Tools': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Professional <span className="text-gold">Painting Tools & Accessories</span>
        </h2>
        <p className="mb-4">
          Achieve a master-class finish with the right <strong>painting tools and accessories</strong>. From ergonomic rollers and precision brushes to masking tapes and abrasives, Rainbow Paints is your one-stop shop for all painting supplies.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Equip Yourself with <span className="text-gold">Quality Gear</span>
        </h3>
        <p className="mb-4">
          Our inventory includes microfiber rollers for smooth finishes, sturdy putty blades with handles, heavy-duty scrapers, and premium sandpapers. Whether you are a DIY enthusiast or a professional contractor in Coimbatore, we have the durable tools you need to get the job done efficiently.
        </p>
      </>
    ),
    
    'Interior Texture': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Luxury <span className="text-gold">Interior Texture Paints</span> & Designer Finishes
        </h2>
        <p className="mb-4">
          Give your home a premium designer look with our curated range of <strong>interior texture paints</strong>. Whether you want a metallic sheen, rustic stucco, or elegant fabric-like wall textures, we provide professional-grade products like <strong>Asian Paints Royale Play</strong> and <strong>Berger Silk GlamArt</strong> to transform ordinary walls into stunning accent pieces.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Accentuate Your Space with <span className="text-gold">Special Effects</span>
        </h3>
        <p className="mb-4">
          Create bespoke visual effects with specialized base coats and top coats. We offer a full spectrum of designer textures including metallic glazes, marble finishes, and non-metallic dapple effects that add depth and character to your living room or bedroom.
        </p>
      </>
    ),

    'Exterior Texture': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Durable <span className="text-gold">Exterior Texture Paints</span>
        </h2>
        <p className="mb-4">
          Enhance your building's elevation with tough, weather-resistant <strong>exterior texture paints</strong>. Products like <strong>Asian Paints Apex Ultima Protek Duralife</strong> and coarse stone textures provide superior protection against structural cracks while delivering a rugged, high-end architectural finish.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Protection Meets <span className="text-gold">Aesthetics</span>
        </h3>
        <p className="mb-4">
          Our exterior textures act as heavy-duty barriers against heavy rainfall, algae, and UV damage. Choose from roller-applied textures, spray finishes, or trowel-applied grit textures to protect your facade and maintain its color integrity for over a decade.
        </p>
      </>
    ),

    'Metals and Grills': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Anti-Rust <span className="text-gold">Metal Paints & Grill Finishes</span>
        </h2>
        <p className="mb-4">
          Safeguard your iron gates, window grills, and metal structures with high-performance <strong>metal enamels and anti-rust paints</strong>. We offer premium synthetic enamels, epoxy primers, and PU coatings from trusted brands like <strong>MRF Vapocure</strong> and <strong>Berger Paints</strong> to stop corrosion in its tracks.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Long-Lasting <span className="text-gold">Gloss & Durability</span>
        </h3>
        <p className="mb-4">
          Achieve a flawless, mirror-like gloss with our advanced PU (polyurethane) metal paints, or opt for rapid-drying direct-to-metal (DTM) coatings. Properly primed and painted metal surfaces will resist chipping, peeling, and rust for years.
        </p>
      </>
    ),

    'Thinners & Solvents': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Industrial-Grade <span className="text-gold">Thinners & Solvents</span>
        </h2>
        <p className="mb-4">
          Ensure proper paint viscosity and flawless application with our professional range of <strong>NC thinners, PU thinners, and enamel solvents</strong>. Using the right thinner is critical for spray painting, preventing blushing, and achieving an ultra-smooth finish without brush marks.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Premium Brands like <span className="text-gold">Sheenlac & MRF</span>
        </h3>
        <p className="mb-4">
          We stock authentic <strong>Sheenlac NC Thinner</strong>, general-purpose mineral spirits, and specialized slow-drying PU solvents for automotive and wood finishing. Shop quality solvents to clean your tools and prep surfaces properly.
        </p>
      </>
    ),

    'Tile Adhesives': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          High-Bond <span className="text-gold">Tile Adhesives & Grouts</span>
        </h2>
        <p className="mb-4">
          Ensure your flooring and wall tiles stay firmly in place with premium <strong>tile adhesives and epoxy grouts</strong>. Unlike traditional cement mortar, modern polymer-modified adhesives from brands like <strong>Asian Paints SmartCare and Dr. Fixit</strong> prevent tile shrinkage, cracking, and hollow sounds.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Waterproof <span className="text-gold">Epoxy Tile Grouts</span>
        </h3>
        <p className="mb-4">
          For bathrooms, kitchens, and swimming pools, we highly recommend our waterproof epoxy tile grouts. They are stain-resistant, anti-fungal, and come in various shades to seamlessly match your tiles, ensuring a hygienic and beautiful finish.
        </p>
      </>
    ),

    'PU Coatings': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Premium <span className="text-gold">PU Coatings (Polyurethane)</span>
        </h2>
        <p className="mb-4">
          For the ultimate high-gloss, scratch-resistant finish, explore our comprehensive range of <strong>PU (Polyurethane) Coatings</strong>. Ideal for luxury wooden furniture, premium metal fabrication, and automotive refinishing, PU paints deliver unparalleled durability and a glass-like sheen.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          UV Resistance & <span className="text-gold">Non-Yellowing Finishes</span>
        </h3>
        <p className="mb-4">
          Choose from top-tier brands like <strong>MRF WoodCoat and Asian Paints Emporio</strong>. Our exterior-grade PU coatings are UV-resistant and non-yellowing, ensuring that clear wood finishes and vivid metal colors remain vibrant and protected against harsh sunlight.
        </p>
      </>
    ),

    'Epoxy Coatings': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Heavy-Duty <span className="text-gold">Epoxy Coatings & Floor Paints</span>
        </h2>
        <p className="mb-4">
          Protect industrial floors, warehouses, and structural steel with chemical-resistant <strong>epoxy coatings</strong>. Epoxy systems provide a seamless, non-porous, and incredibly tough surface that withstands heavy forklift traffic, oil spills, and severe abrasion.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Self-Leveling <span className="text-gold">Epoxy Flooring</span>
        </h3>
        <p className="mb-4">
          We stock high-performance two-pack (2K) epoxy primers and self-leveling floor paints from <strong>Berger Paints and Asian Paints</strong>. Whether you need an anti-slip texture for a factory floor or a hygienic coating for a pharmaceutical lab, we have the right industrial solution.
        </p>
      </>
    ),

    'Synthetic Enamels': (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Durable <span className="text-gold">Synthetic Enamel Paints</span>
        </h2>
        <p className="mb-4">
          Versatile and highly durable, <strong>synthetic enamel paints</strong> are the traditional choice for protecting wood and metal surfaces. They offer a hard, washable film with excellent gloss retention, perfect for doors, windows, grills, and machinery.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Top Enamel <span className="text-gold">Brands</span>
        </h3>
        <p className="mb-4">
          We carry trusted oil-based enamels like <strong>Asian Paints Apcolite Premium Enamel</strong> and <strong>Berger Luxol</strong>. These paints provide a tough, water-resistant barrier that is easy to clean, making them ideal for both interior trims and exterior metalwork.
        </p>
      </>
    ),
  };

  // Map duplicate names based on exact URL params/filter names
  contentMap['Exterior Wall'] = contentMap['Exterior Paints'];
  contentMap['Interior Wall'] = contentMap['Interior Paints'];
  contentMap['All Home Paint'] = contentMap['All Categories'];
  contentMap['All Industrial'] = contentMap['All Categories'];

  const content = contentMap[category];

  if (!content) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 bg-white rounded-xl shadow-sm border border-royale-accent/30 mt-12 mb-8">
      <div className="prose prose-sm sm:prose-base max-w-none text-royale-text/80">
        {content}
      </div>
    </div>
  );
}
