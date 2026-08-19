import fs from 'fs';
import path from 'path';
import { mockProducts, brands, subCategories } from './src/data';
import { blogPosts } from './src/data/blogPosts';

const APP_URL = 'https://www.rainbowpaint.in';

function generateSitemap() {
  const urls = [
    '/',
    '/about',
    '/contact',
    '/faqs',
    '/visualizer',
    '/calculator',
    '/compare-paints',
    '/blog',
    '/painting-services'
  ];

  // Add category routes
  Object.keys(subCategories).forEach(cat => {
    subCategories[cat].forEach(sub => {
       urls.push(`/c/${sub.toLowerCase().replace(/\s+/g, '-')}`);
    });
  });

  // Add brand routes
  brands.filter(b => b !== "All Brands").forEach(brand => {
     urls.push(`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`);
  });

  // Add blog routes
  blogPosts.forEach(post => {
     urls.push(`/blog/${post.slug}`);
  });

  
  // Add shade routes
  const asianShades = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/shades/asian-paints.json'), 'utf-8'));
  const bergerShades = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/shades/berger-paints.json'), 'utf-8'));
  const mrfShades = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/shades/mrf-paints.json'), 'utf-8'));
  let ralShades = [];
  try {
    ralShades = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/shades/ral-classic.json'), 'utf-8'));
  } catch(e) {}
  
  const allShades = [...asianShades, ...bergerShades, ...mrfShades, ...ralShades];
  allShades.forEach((shade) => {
    const brandSlug = shade.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const familySlug = shade.family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const shadeSlug = `${shade.name}-${shade.shadeCode}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    urls.push(`/color/${brandSlug}/${familySlug}/${shadeSlug}`);
  });

  
  
  // Add hyperlocal location routes
  
  const serviceRoutes = [
    '/services/interior-wall-painting',
    '/services/exterior-wall-painting',
    '/services/waterproofing',
    '/services/wood-metal-painting',
    '/services/industrial-flooring'
  ];
  serviceRoutes.forEach(route => {
    urls.push(route);
  });
  
  const neighborhoods = [
    'coimbatore',
    'rs-puram-coimbatore',
    'gandhipuram-coimbatore',
    'peelamedu-coimbatore',
    'saibaba-colony-coimbatore',
    'ramanathapuram-coimbatore',
    'saravanampatti-coimbatore',
    'thudiyalur-coimbatore',
    'vadavalli-coimbatore',
    'singanallur-coimbatore',
    'kovaipudur-coimbatore',
    'pollachi',
    'mettupalayam',
    'tiruppur'
  ];
  neighborhoods.forEach(hood => {
    urls.push(`/store/${hood}`);
    urls.push(`/painting-services/${hood}`);
    serviceRoutes.forEach(route => {
      urls.push(`${route}/${hood}`);
    });
  });


  // Add product routes
  mockProducts.forEach((product: any) => {
     const slug = product.slug || product.name.replace(/\s+/g, '-').toLowerCase();
     urls.push(`/p/${slug}`);
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${APP_URL}${url.replace(/&/g, '&amp;')}</loc>
    <changefreq>daily</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Generated public/sitemap.xml');
}

function generateFeed() {
  const rss = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Rainbow Paints Coimbatore</title>
    <link>${APP_URL}</link>
    <description>Premium architectural paints, industrial coatings, and hardware</description>
${mockProducts.flatMap((p: any) => {
  const slug = p.slug || p.name.replace(/\s+/g, '-').toLowerCase();
  const parsePrice = (priceStr: string | undefined): number => {
    if (!priceStr) return 0;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };
  const basePrice = p.basePrice || parsePrice(p.price) || 850;
  
  const sizes = p.sizes && p.sizes.length > 0 ? p.sizes : [1];
  const unitSymbol = p.unit === 'kg' ? 'kg' : 'L';
  
  return sizes.map((sizeVal: number) => {
    let sizeDiscount = 1;
    if (p.unit === 'kg') {
      if (sizeVal === 5) sizeDiscount = 0.94;
      if (sizeVal === 20) sizeDiscount = 0.53;
      if (sizeVal === 25) sizeDiscount = 0.8;
      if (sizeVal === 40) sizeDiscount = 0.472;
      if (sizeVal === 50) sizeDiscount = 0.628;
    } else {
      if (sizeVal === 4) sizeDiscount = 0.96;
      if (sizeVal === 10) sizeDiscount = 0.92;
      if (sizeVal === 20) sizeDiscount = 0.88;
    }
    const finalPrice = Math.round(basePrice * sizeVal * sizeDiscount);
    const pUrl = `${APP_URL}/p/${slug}?size=${sizeVal}`;
    const variantId = `RP-${p.id || '1'}-${String(sizeVal).toLowerCase()}${unitSymbol.toLowerCase()}`;
    const title = `${p.brand ? p.brand + ' ' : ''}${p.name} - ${sizeVal}${unitSymbol}`.replace(/&/g, '&amp;');

    return `    <item>
      <g:id>${variantId}</g:id>
      <g:item_group_id>${p.id}</g:item_group_id>
      <g:title>${title}</g:title>
      <g:description>${(p.name || '').replace(/&/g, '&amp;')} by ${(p.brand || '').replace(/&/g, '&amp;')} - ${(p.category || '').replace(/&/g, '&amp;')} &gt; ${(p.subCategory || '').replace(/&/g, '&amp;')}. Available in ${sizeVal}${unitSymbol} size.</g:description>
      <g:link>${pUrl.replace(/&/g, '&amp;')}</g:link>
      <g:image_link>${p.image ? (p.image.startsWith('http') ? p.image : APP_URL + p.image) : ''}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${finalPrice}.00 INR</g:price>
      <g:brand>${(p.brand || '').replace(/&/g, '&amp;')}</g:brand>
      <g:google_product_category>Hardware &gt; Building Materials &gt; Paint</g:google_product_category>
      <g:shipping>
        <g:country>IN</g:country>
        <g:price>0 INR</g:price>
        <g:min_handling_time>0</g:min_handling_time>
        <g:max_handling_time>0</g:max_handling_time>
        <g:min_transit_time>0</g:min_transit_time>
        <g:max_transit_time>0</g:max_transit_time>
      </g:shipping>
    </item>`;
  });
}).join('\n')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'feed.xml'), rss);
  console.log('Generated public/feed.xml');
}

generateSitemap();
generateFeed();
