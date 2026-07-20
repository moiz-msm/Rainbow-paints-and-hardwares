const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  '<Route path="/color/:shadeSlug" element={<ColorDetailsPage />} />',
  '<Route path="/color/:brandSlug/:familySlug/:shadeSlug" element={<ColorDetailsPage />} />\n        <Route path="/color/:shadeSlug" element={<ColorDetailsPage />} />'
);

fs.writeFileSync('src/App.tsx', content);
