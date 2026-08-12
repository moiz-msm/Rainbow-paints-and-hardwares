const fs = require('fs');
const path = require('path');

const pages = [
  {
    file: 'src/pages/InteriorPaintingPage.tsx',
    title: 'Interior Wall Painting',
    heading: 'Premium Interior Wall Painting <span className="text-gold block mt-2">{locationName}</span>',
    desc: 'Transform your living spaces with our premium interior wall painting services. From basic touch-ups to luxurious Royale Shyne finishes, we offer transparent per-square-foot pricing.'
  },
  {
    file: 'src/pages/ExteriorPaintingPage.tsx',
    title: 'Exterior Wall Painting',
    heading: 'Professional Exterior Wall Painting <span className="text-gold block mt-2">{locationName}</span>',
    desc: 'Protect and beautify your building with our weather-resistant exterior wall painting services. Featuring Apex Ultima, Damp Proof, and crack-bridging solutions.'
  },
  {
    file: 'src/pages/WoodPaintingPage.tsx',
    title: 'Wood & Metal Painting',
    heading: 'Wood & Metal Polish <br className="hidden md:block"/>& Painting Services <span className="text-gold block mt-2">{locationName}</span>',
    desc: 'Premium PU, Melamine polish, and enamel painting for your doors, windows, grills, and furniture.'
  },
  {
    file: 'src/pages/WaterproofingPage.tsx',
    title: 'Waterproofing',
    heading: 'Scientific Waterproofing Solutions <span className="text-gold block mt-2">{locationName}</span>',
    desc: 'Stop leaks permanently with our professional waterproofing services for terraces, bathrooms, and exterior walls using Asian Paints SmartCare & Dr. Fixit.'
  },
  {
    file: 'src/pages/IndustrialFlooringPage.tsx',
    title: 'Industrial Flooring',
    heading: 'Epoxy & PU Industrial Flooring <span className="text-gold block mt-2">{locationName}</span>',
    desc: 'Heavy-duty epoxy and polyurethane flooring solutions for factories, warehouses, parking lots, and commercial spaces.'
  },
  {
    file: 'src/pages/PaintingServiceSEOPage.tsx',
    title: 'Painting Services',
    heading: 'Professional Painting Services <br/> in <span className="text-gold">{locationName}</span>',
    desc: 'Professionally trained and officially authorized painting contractors by Berger, Asian, and MRF Paints for interior wall painting, exterior wall painting, and more.'
  }
];

pages.forEach(p => {
  const filePath = path.join(process.cwd(), p.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    const breadcrumbStr = `<Breadcrumb items={[{label: 'Home', href: '/'}, {label: 'Painting Services', href: '/painting-services'}, {label: '${p.title}'}]} className="text-ivory/80 mb-6" />`;
    const seoBreadcrumbStr = `<Breadcrumb items={[{label: 'Home', href: '/'}, {label: 'Painting Services'}]} className="text-ivory/80 mb-6" />`;

    const bc = p.file.includes('PaintingServiceSEOPage') ? seoBreadcrumbStr : breadcrumbStr;

    // Inject breadcrumb right after <div className="max-w-7xl mx-auto px-4 relative z-20"> or similar container inside the hero
    // Let's find the main grid container in the hero. Usually: <div className="flex flex-col lg:flex-row gap-12 items-center">
    const hook = '<div className="flex flex-col lg:flex-row gap-12 items-center">';
    if (content.includes(hook) && !content.includes('<Breadcrumb')) {
      content = content.replace(hook, `${bc}\n          ${hook}`);
    } else if (content.includes('<div className="flex flex-col lg:flex-row gap-12 lg:items-center">') && !content.includes('<Breadcrumb')) {
        content = content.replace('<div className="flex flex-col lg:flex-row gap-12 lg:items-center">', `${bc}\n          <div className="flex flex-col lg:flex-row gap-12 lg:items-center">`);
    }

    // Replace the heading
    content = content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, `<h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 uppercase tracking-tight leading-tight text-ivory">\n                ${p.heading}\n              </h1>`);
    
    // Replace the description
    content = content.replace(/<p className="text-sm sm:text-base text-ivory\/80 mb-8 max-w-2xl mx-auto lg:mx-0 font-light italic">[\s\S]*?<\/p>/, `<p className="text-sm sm:text-base text-ivory/80 mb-8 max-w-2xl mx-auto lg:mx-0 font-light italic">\n                ${p.desc}\n              </p>`);

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${p.file}`);
  }
});
