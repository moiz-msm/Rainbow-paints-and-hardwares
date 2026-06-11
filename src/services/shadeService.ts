/**
 * Shade Service
 * Handles loading, searching, and filtering of paint shades.
 * Uses dynamic imports to keep bundles small.
 */

export interface Shade {
  id: string;
  name: string;
  shadeCode: string;
  hex: string;
  rgb: string;
  brand: string;
  category: string;
  finish: string;
  popular: boolean;
  family: string;
}

let asianShades: Shade[] = [];
let bergerShades: Shade[] = [];
let mrfShades: Shade[] = [];

/**
 * Lazy loads brand data
 */
async function loadBrandData(brand: string): Promise<Shade[]> {
  if (brand.toLowerCase() === 'asian' || brand.toLowerCase() === 'asian paints') {
    if (asianShades.length === 0) {
      const data = await import('../data/shades/asian-paints.json');
      // De-duplicate in case of data inconsistencies
      const unique = new Map<string, Shade>();
      data.default.forEach((s: Shade) => {
        if (!unique.has(s.id)) unique.set(s.id, s);
      });
      asianShades = Array.from(unique.values());
    }
    return asianShades;
  }
  
  if (brand.toLowerCase() === 'berger' || brand.toLowerCase() === 'berger paints') {
    if (bergerShades.length === 0) {
      const data = await import('../data/shades/berger-paints.json');
      // De-duplicate in case of data inconsistencies
      const unique = new Map<string, Shade>();
      data.default.forEach((s: Shade) => {
        if (!unique.has(s.id)) unique.set(s.id, s);
      });
      bergerShades = Array.from(unique.values());
    }
    return bergerShades;
  }

  if (brand.toLowerCase() === 'mrf' || brand.toLowerCase() === 'mrf vapocure' || brand.toLowerCase() === 'mrf paints') {
    if (mrfShades.length === 0) {
      const data = await import('../data/shades/mrf-paints.json');
      const unique = new Map<string, Shade>();
      data.default.forEach((s: Shade) => {
        if (!unique.has(s.id)) unique.set(s.id, s);
      });
      mrfShades = Array.from(unique.values());
    }
    return mrfShades;
  }
  
  return [];
}

export const shadeService = {
  /**
   * Fetches shades with filtering
   */
  async getShades(options: { 
    brand?: string, 
    family?: string, 
    search?: string,
    limit?: number,
    offset?: number
  } = {}): Promise<{ shades: Shade[], total: number }> {
    const { brand = 'all', family = 'all', search = '', limit = 100, offset = 0 } = options;
    
    let pool: Shade[] = [];
    
    // Load required brands
    if (brand === 'all') {
      const [asian, berger, mrf] = await Promise.all([
        loadBrandData('asian'),
        loadBrandData('berger'),
        loadBrandData('mrf')
      ]);
      pool = [...asian, ...berger, ...mrf];
    } else {
      pool = await loadBrandData(brand);
    }
    
    // Apply Filters
    let filtered = pool.filter(s => {
      let familyMatch = false;
      if (family === 'all') {
        familyMatch = true;
      } else {
        const query = family.toLowerCase();
        const target = s.family.toLowerCase();
        familyMatch = target === query || target + 's' === query || query + 's' === target || 
                      (query === 'greys' && target === 'grey') || (query === 'whites' && target === 'white') ||
                      (query === 'neutrals' && target === 'neutral');
      }
      
      const searchLower = search.toLowerCase();
      const searchMatch = !search || 
        s.name.toLowerCase().includes(searchLower) || 
        s.shadeCode.toLowerCase().includes(searchLower);
      
      return familyMatch && searchMatch;
    });
    
    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);
    
    return {
      shades: paginated,
      total
    };
  },

  /**
   * Get a single shade by code
   */
  async getShadeByCode(code: string): Promise<Shade | undefined> {
    const all = await this.getShades({ brand: 'all', limit: 10000 });
    return all.shades.find(s => s.shadeCode === code);
  },

  /**
   * Get popular shades
   */
  async getPopularShades(brand: string = 'all'): Promise<Shade[]> {
    const all = await this.getShades({ brand, limit: 10000 });
    return all.shades.filter(s => s.popular);
  }
};
