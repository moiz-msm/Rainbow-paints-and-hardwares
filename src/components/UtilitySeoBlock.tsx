import React from 'react';

interface UtilitySeoBlockProps {
  page: 'visualizer' | 'calculator' | 'compare';
}

export default function UtilitySeoBlock({ page }: UtilitySeoBlockProps) {
  const contentMap = {
    visualizer: (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Interactive <span className="text-gold">Paint Color Visualizer</span> Online
        </h2>
        <p className="mb-4">
          Take the guesswork out of choosing the right shade with our advanced <strong>virtual room painter</strong> and color visualization tool. Deciding on the perfect color for your home can be overwhelming, but our <strong>paint color visualizer</strong> allows you to see exactly how different hues will look in real living spaces before you buy.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Explore the <span className="text-gold">Asian Paints & Berger Shade Cards</span>
        </h3>
        <p className="mb-4">
          Browse thousands of colors from the official catalogs, including the <strong>Asian Paints shade card</strong> and Berger's Color Bank. Whether you are looking for a calming "Weathered White" for your exterior or a bold "Parisian Purple" for an accent wall, our tool lets you instantly apply these shades to digital room mockups. 
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Try Wall Colors Online:</strong> Test combinations for living rooms, bedrooms, and exteriors instantly.</li>
          <li><strong>Find Color Codes:</strong> Instantly look up specific color codes (like Asian Paints 8442 or L126).</li>
          <li><strong>Digital Swatches:</strong> Compare subtle differences in shades before purchasing sample pots.</li>
        </ul>
      </>
    ),
    calculator: (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          Accurate <span className="text-gold">Paint Cost Calculator</span> & Estimator
        </h2>
        <p className="mb-4">
          Planning a home makeover? Use our free <strong>paint cost calculator</strong> to accurately estimate the amount of paint required and the total budget for your project. Whether you are painting a single accent wall or calculating the <strong>wall painting cost per square foot</strong> for a full exterior renovation, our tool provides precise wholesale pricing.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Calculate <span className="text-gold">Square Footage & Paint Required</span>
        </h3>
        <p className="mb-4">
          Stop over-buying or running out of paint mid-project. By entering your room dimensions (length, width, and height) and subtracting doors and windows, our <strong>home painting price calculator</strong> accurately calculates the square footage and recommends the exact number of liters required for primer, putty, and topcoats.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Asian Paints Cost Calculator:</strong> Get instant price estimates based on live wholesale rates for products like Royale Glitz and Ultima Protek.</li>
          <li><strong>Material Breakdown:</strong> See exactly how much putty, primer, and emulsion you will need.</li>
          <li><strong>Budget Management:</strong> Compare costs between luxury finishes and standard emulsions to stay within budget.</li>
        </ul>
      </>
    ),
    compare: (
      <>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1A365D] mb-6">
          <span className="text-gold">Compare Paints</span>: Asian Paints vs Berger vs MRF
        </h2>
        <p className="mb-4">
          Finding the perfect paint can be overwhelming with so many options on the market. Our <strong>paint comparison tool</strong> lets you evaluate industry-leading products side-by-side. If you have ever wondered about <strong>Asian Paints Royale vs Berger Silk Glamour</strong> or need to find the best exterior emulsion, this tool breaks down the specifications for you.
        </p>
        <h3 className="text-xl font-serif font-medium text-[#1A365D] mt-8 mb-4">
          Make an <span className="text-gold">Informed Decision</span>
        </h3>
        <p className="mb-4">
          Don't just buy based on brand names; compare the actual properties that matter. You can evaluate coverage area, washability, finish (matte, soft sheen, or high gloss), warranty periods, and <strong>paint price comparisons</strong> directly on one screen.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Best Emulsion Paint Comparison:</strong> See which interior paint offers the highest stain resistance and washability.</li>
          <li><strong>Price vs. Value:</strong> Analyze cost-per-liter versus coverage area to find the most economical choice.</li>
          <li><strong>Feature Breakdown:</strong> Compare anti-algal properties, mold resistance, and durability ratings.</li>
        </ul>
      </>
    )
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 bg-white rounded-xl shadow-sm border border-royale-accent/30 mt-12 mb-8">
      <div className="prose prose-sm sm:prose-base max-w-none text-royale-text/80">
        {contentMap[page]}
      </div>
    </div>
  );
}
