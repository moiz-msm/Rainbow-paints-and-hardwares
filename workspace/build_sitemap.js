import fs from 'fs';
import path from 'path';

function escapeXML(str) {
  return str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;') : '';
}

async function generate() {
  let productUrls = '';
  let shadeUrls = '';
  
  try {
    const shadesDir = path.join(process.cwd(), 'src', 'data', 'shades');
    if (fs.existsSync(shadesDir)) {
      const files = fs.readdirSync(shadesDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const shadeData = JSON.parse(fs.readFileSync(path.join(shadesDir, file), 'utf8'));
          shadeData.forEach((shade) => {
            const combined = `${shade.name}-${shade.shadeCode}`;
            const slug = escapeXML(combined.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
            if (slug) {
              shadeUrls += `
  <url>
    <loc>https://www.rainbowpaint.in/color/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
            }
          });
        }
      }
    }
  } catch (err) {
    console.error("Failed to process shades:", err);
  }

  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (firebaseConfig.projectId) {
        const dbId = firebaseConfig.firestoreDatabaseId || '(default)';
        const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${dbId}/documents/products?pageSize=1000`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          if (data.documents && Array.isArray(data.documents)) {
            data.documents.forEach((doc) => {
              const nameString = doc.fields?.name?.stringValue;
              const rawSlug = doc.fields?.slug?.stringValue || (nameString ? nameString.replace(/\s+/g, '-').toLowerCase() : '');
              const slug = escapeXML(rawSlug);
              if (slug) {
                productUrls += `
  <url>
    <loc>https://www.rainbowpaint.in/p/${slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
              }
            });
          }
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.rainbowpaint.in</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/faqs</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/buy-paint-online</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/c/interior-wall</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/c/exterior-wall</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/c/waterproofing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/c/wood-finishes</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/c/metals-and-grills</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/c/primer</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/visualizer</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/calculator</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/compare-paints</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/brands/asian-paints</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/brands/berger-paints</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/brands/dr-fixit</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/brands/mrf-vapocure</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/refund-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.rainbowpaint.in/shipping-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>${productUrls}${shadeUrls}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log("Successfully generated public/sitemap.xml!");
}

generate();
