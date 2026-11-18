export interface EnamelIndustrialShade {
  name: string;
  code: string;
  hex: string;
}

export const STANDARD_ENAMEL_INDUSTRIAL_SHADES: EnamelIndustrialShade[] = [
  { name: 'White', code: 'WHITE', hex: '#FFFFFF' },
  { name: 'Black', code: 'BLACK', hex: '#1A1A1A' },
  { name: 'Dark Grey', code: 'DARK GREY', hex: '#4A4E52' },
  { name: 'Smoke Grey', code: 'SMOKE GREY', hex: '#7A8084' },
  { name: 'Golden Yellow', code: 'GOLDEN YELLOW', hex: '#E5A01D' },
  { name: 'Signal Red', code: 'SIGNAL RED', hex: '#B81D24' },
  { name: 'Blue', code: 'BLUE', hex: '#1E5AA8' },
  { name: 'Green', code: 'GREEN', hex: '#1B7A43' },
];

export const isEnamelOrIndustrialShadeApplicable = (product: any): boolean => {
  if (!product || !product.name) return false;

  const nameLower = product.name.toLowerCase();
  const topCatLower = (product.topCategory || '').toLowerCase();
  const subCatLower = (product.subCategory || '').toLowerCase();
  const subCatsLower = Array.isArray(product.subCategories)
    ? product.subCategories.map((s: string) => s.toLowerCase())
    : [];

  // Exclude primers, coal tar epoxies, metallic/aluminium/blackboard paints, thinners, spray paints, and clear/grout/putty products
  const excludedTerms = [
    'primer',
    'coal tar',
    'aluminium',
    'aluminum',
    'black board',
    'blackboard',
    'thinner',
    'solvent',
    'reducer',
    'catalyst',
    'hardener',
    'spray',
    'metallic',
    'glasscoat',
    'bonding agent',
    'grout',
    'putty',
    'insulator',
    'triblock',
    'clear',
  ];

  if (excludedTerms.some((term) => nameLower.includes(term))) {
    return false;
  }

  return (
    topCatLower === 'industrial' ||
    subCatLower.includes('enamel') ||
    subCatLower === 'epoxy paint' ||
    subCatLower === 'pu paint' ||
    subCatsLower.some((s) => s.includes('enamel') || s === 'epoxy paint' || s === 'pu paint') ||
    nameLower.includes('enamel') ||
    nameLower.includes('metalcoat') ||
    nameLower.includes('luxol satin finish')
  );
};

export const applyStandardEnamelIndustrialShades = <T extends Record<string, any>>(
  product: T
): T & { shades?: EnamelIndustrialShade[] | any[]; allowRalShades?: boolean } => {
  if (!isEnamelOrIndustrialShadeApplicable(product)) {
    return product;
  }

  const existingShades =
    Array.isArray(product.shades) && product.shades.length > 0 ? product.shades : null;

  return {
    ...product,
    shades: existingShades || STANDARD_ENAMEL_INDUSTRIAL_SHADES,
    allowRalShades: true,
  };
};
