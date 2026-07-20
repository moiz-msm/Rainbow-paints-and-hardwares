const fs = require('fs');
let content = fs.readFileSync('src/services/shadeService.ts', 'utf-8');

const injection = `  getShadeUrl(shade: Shade): string {
    const brandSlug = shade.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const familySlug = shade.family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const shadeSlug = this.generateSlug(shade);
    return \`/color/\${brandSlug}/\${familySlug}/\${shadeSlug}\`;
  },
`;

content = content.replace('  /**\n   * Get a single shade by slug', injection + '\n  /**\n   * Get a single shade by slug');
fs.writeFileSync('src/services/shadeService.ts', content);
