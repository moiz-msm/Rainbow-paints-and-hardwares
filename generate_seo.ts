import fs from 'fs';
import path from 'path';
import { mockProducts, brands, subCategories } from './src/data';
import { blogPosts } from './src/data/blogPosts';

const APP_URL = 'https://rainbowpaint.in';

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
  
  const allShades = [...asianShades, ...bergerShades, ...mrfShades];
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
${mockProducts.map((p: any) => {
  const slug = p.slug || p.name.replace(/\s+/g, '-').toLowerCase();
  const pUrl = `${APP_URL}/p/${slug}`;
  const price = p.basePrice || p.sizes?.[0]?.price || 0;
  return `    <item>
      <g:id>${p.id}</g:id>
      <g:title>${(p.name || '').replace(/&/g, '&amp;')}</g:title>
      <g:description>${(p.name || '').replace(/&/g, '&amp;')} by ${(p.brand || '').replace(/&/g, '&amp;')} - ${(p.category || '').replace(/&/g, '&amp;')} &gt; ${(p.subCategory || '').replace(/&/g, '&amp;')}</g:description>
      <g:link>${pUrl.replace(/&/g, '&amp;')}</g:link>
      <g:image_link>${p.image ? (p.image.startsWith('http') ? p.image : APP_URL + p.image) : ''}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${p.inStock ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${price} INR</g:price>
      <g:brand>${(p.brand || '').replace(/&/g, '&amp;')}</g:brand>
      <g:google_product_category>Hardware &gt; Building Materials &gt; Paint</g:google_product_category>
    </item>`;
}).join('\n')}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'feed.xml'), rss);
  console.log('Generated public/feed.xml');
}

generateSitemap();
generateFeed();
