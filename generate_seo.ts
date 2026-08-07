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
    '/blog'
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
  
  const parsePrice = (priceVal: any) => {
    if (typeof priceVal === 'number') return priceVal;
    if (typeof priceVal === 'string') return parseFloat(priceVal.replace(/[^0-9.]/g, '')) || 850;
    return 850;
  };
  const basePrice = p.price ? parsePrice(p.price) : 850;
  const sizes = p.sizes || [1, 4, 10, 20];
  const unitSymbol = p.unit || 'L';

  return sizes.map((sizeVal: number) => {
    let sizeDiscount = 1;
    if (unitSymbol === 'kg') {
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
    const vPrice = Math.round(basePrice * sizeVal * sizeDiscount);
    const pUrl = `${APP_URL}/p/${slug}?size=${sizeVal}`;
    const variantId = `RP-PG-${p.id || '1'}_rp-${p.id || '1'}-${String(sizeVal).toLowerCase()}${unitSymbol.toLowerCase()}`;
    const groupId = `RP-PG-${p.id || '1'}`;
    const title = `${p.name} - ${sizeVal}${unitSymbol} Pack`;
    
    return `    <item>
      <g:id>${variantId}</g:id>
      <g:item_group_id>${groupId}</g:item_group_id>
      <g:title>${(title || '').replace(/&/g, '&amp;')}</g:title>
      <g:description>${(p.name || '').replace(/&/g, '&amp;')} by ${(p.brand || '').replace(/&/g, '&amp;')} - ${(p.category || '').replace(/&/g, '&amp;')} &gt; ${(p.subCategory || '').replace(/&/g, '&amp;')}</g:description>
      <g:link>${pUrl.replace(/&/g, '&amp;')}</g:link>
      <g:image_link>${p.image ? (p.image.startsWith('http') ? p.image : APP_URL + p.image) : ''}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${p.inStock !== false ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${vPrice}.00 INR</g:price>
      <g:brand>${(p.brand || '').replace(/&/g, '&amp;')}</g:brand>
      <g:google_product_category>Hardware &gt; Building Materials &gt; Paint</g:google_product_category>
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
