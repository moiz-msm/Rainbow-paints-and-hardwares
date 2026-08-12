const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'src/pages/InteriorPaintingPage.tsx', type: 'interior' },
  { file: 'src/pages/ExteriorPaintingPage.tsx', type: 'exterior' },
  { file: 'src/pages/WoodPaintingPage.tsx', type: 'wood' },
  { file: 'src/pages/WaterproofingPage.tsx', type: 'waterproofing' },
  { file: 'src/pages/IndustrialFlooringPage.tsx', type: 'flooring' },
];

pages.forEach(p => {
  const filePath = path.join(process.cwd(), p.file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');

  if (!content.includes('import ServiceInfo')) {
    content = content.replace(
      "import Breadcrumb from '../components/Breadcrumb';",
      "import Breadcrumb from '../components/Breadcrumb';\nimport ServiceInfo from '../components/ServiceInfo';"
    );
  }

  // Find `<PaintingProcess />` and replace everything from there until the first of:
  // `{/* FAQs */}` or `{/* Internal Links for SEO */}` or `<div className="bg-white border-t border-royale-accent/40 py-16">`
  
  const processIndex = content.indexOf('<PaintingProcess />');
  if (processIndex !== -1) {
    let endIndex = content.indexOf('{/* FAQs */}', processIndex);
    if (endIndex === -1) endIndex = content.indexOf('{/* Internal Links for SEO */}', processIndex);
    if (endIndex === -1) endIndex = content.indexOf('<div className="bg-white border-t border-royale-accent/40 py-16">', processIndex);
    
    if (endIndex !== -1) {
      const before = content.substring(0, processIndex);
      const after = content.substring(endIndex);
      content = before + `<ServiceInfo serviceType="${p.type}" />\n      ` + after;
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${p.file}`);
    } else {
      console.log(`End index not found for ${p.file}`);
    }
  } else {
    // Maybe we already replaced it, or it doesn't have PaintingProcess.
    // Let's check for <DetailedPaintingPricing
    const pricingIndex = content.indexOf('<DetailedPaintingPricing');
    if (pricingIndex !== -1) {
      let endIndex = content.indexOf('{/* FAQs */}', pricingIndex);
      if (endIndex === -1) endIndex = content.indexOf('{/* Internal Links for SEO */}', pricingIndex);
      if (endIndex === -1) endIndex = content.indexOf('<div className="bg-white border-t border-royale-accent/40 py-16">', pricingIndex);

      if (endIndex !== -1) {
        const before = content.substring(0, pricingIndex);
        const after = content.substring(endIndex);
        content = before + `<ServiceInfo serviceType="${p.type}" />\n      ` + after;
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${p.file} (DetailedPaintingPricing block)`);
      }
    }
  }
});

// Specially handle PaintingServiceSEOPage
const seoPagePath = path.join(process.cwd(), 'src/pages/PaintingServiceSEOPage.tsx');
if (fs.existsSync(seoPagePath)) {
  let content = fs.readFileSync(seoPagePath, 'utf-8');
  if (!content.includes('import ServiceInfo')) {
    content = content.replace(
      "import Breadcrumb from '../components/Breadcrumb';",
      "import Breadcrumb from '../components/Breadcrumb';\nimport ServiceInfo from '../components/ServiceInfo';"
    );
  }

  // It has <DetailedPaintingPricing locationName={locationName} />
  const ratesSection = content.indexOf('{/* Rates Section */}');
  const internalLinks = content.indexOf('{/* Internal Links / Areas */}');

  if (ratesSection !== -1 && internalLinks !== -1) {
    const before = content.substring(0, ratesSection);
    const after = content.substring(internalLinks);
    content = before + `<ServiceInfo serviceType="generic" />\n      ` + after;
    fs.writeFileSync(seoPagePath, content);
    console.log(`Updated src/pages/PaintingServiceSEOPage.tsx`);
  }
}

