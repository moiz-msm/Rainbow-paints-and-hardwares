/**
 * Central registry of verified 1024x1024 studio-restored HD product packshots.
 * Keys are normalized lowercase product names matching both Firestore and local catalog entries.
 */
export const HD_PACKSHOT_IMAGES: Record<string, string> = {
  'royale luxury emulsion': '/assets/aistudio/royale_luxury_emulsion_packshot_hd.jpg',
  'royale glitz reserve': '/assets/aistudio/royale_glitz_reserve_packshot_hd.jpg',
  'royale glitz': '/assets/aistudio/royale_glitz_packshot_hd.jpg',
  'royale shyne luxury emulsion': '/assets/aistudio/royale_shyne_packshot_hd.jpg',
  'royale shyne': '/assets/aistudio/royale_shyne_packshot_hd.jpg',
  'royale aspira': '/assets/aistudio/royale_aspira_packshot_hd.jpg',
  'apcolite all protek shyne': '/assets/aistudio/apcolite_all_protek_shyne_packshot_hd.jpg',
  'apcolite premium emulsion': '/assets/aistudio/apcolite_premium_emulsion_packshot_hd.jpg',
  'apex ultima': '/assets/aistudio/apex_ultima_packshot_hd.jpg',
  'apex ultima protek': '/assets/aistudio/apex_ultima_protek_packshot_hd.jpg',
  'apex ultima protek duralife': '/assets/aistudio/apex_ultima_protek_duralife_packshot_hd.jpg',
  'apex dust proof': '/assets/aistudio/apex_dust_proof_packshot_hd.jpg',
  'tractor emulsion': '/assets/aistudio/tractor_emulsion_packshot_hd.jpg',
  'nilaya arc matt': '/assets/aistudio/nilaya_arc_matt_packshot_hd.jpg',
  'nilaya arc pearlescent': '/assets/aistudio/nilaya_arc_pearlescent_packshot_hd.jpg',
  'royale glitz ultra matt': '/assets/aistudio/royale_glitz_ultra_matt_packshot_hd.jpg',
  'apcolite all protek matt': '/assets/aistudio/apcolite_all_protek_matt_packshot_hd.jpg',
  'royale matt emulsion': '/assets/aistudio/royale_matt_emulsion_packshot_hd.jpg',
  'royale matt': '/assets/aistudio/royale_matt_emulsion_packshot_hd.jpg',
  'royale play safari': '/assets/aistudio/royale_play_safari_packshot_hd.jpg',
  'royale play stucco': '/assets/aistudio/royale_play_stucco_packshot_hd.jpg',
  'apex floor guard': '/assets/aistudio/apex_floor_guard_packshot_hd.jpg',
  'apex tile guard': '/assets/aistudio/apex_tile_guard_packshot_hd.jpg',
  'apex tile guard matt': '/assets/aistudio/apex_tile_guard_packshot_hd.jpg',
  'ace exterior emulsion': '/assets/aistudio/ace_exterior_emulsion_packshot_hd.jpg',
  'smartcare damp proof': '/assets/aistudio/smartcare_damp_proof_packshot_hd.jpg',
  'smartcare damp proof ultra': '/assets/aistudio/smartcare_damp_proof_ultra_packshot_hd.jpg',
  'smartcare damp sheath interior': '/assets/aistudio/smartcare_damp_sheath_interior_packshot_hd.jpg',
};

/**
 * Upgrades supported third-party CDN parameters (Berger Paints, Unsplash, IndiaMART,
 * Birla White, Justdial, Flipkart) to verified full-resolution native variants
 * without altering the underlying authentic product photo.
 */
export function upgradeCdnImageUrl(url?: string): string {
  if (!url) return '';
  let upgraded = url;
  if (upgraded.includes('images.bergerpaints.com')) {
    upgraded = upgraded
      .replace(/width=640/g, 'width=1200')
      .replace(/quality=75/g, 'quality=95');
  }
  if (upgraded.includes('images.unsplash.com')) {
    upgraded = upgraded
      .replace(/([?&])w=600\b/g, '$1w=1200')
      .replace(/([?&])q=80\b/g, '$1q=90');
  }
  if (
    upgraded.includes('5.imimg.com') &&
    /-500x500\.(jpe?g|png|webp)$/i.test(upgraded) &&
    !upgraded.includes('/3923053/')
  ) {
    upgraded = upgraded.replace(/-500x500\.(jpe?g|png|webp)$/i, '-1000x1000.$1');
  }
  if (upgraded.includes('www.birlawhite.com/_next/image')) {
    const match = upgraded.match(/[?&]url=([^&]+)/);
    if (match?.[1]) {
      try {
        upgraded = decodeURIComponent(match[1]);
      } catch {
        // Keep original URL if decoding fails
      }
    }
  }
  if (upgraded.includes('content.jdmagicbox.com')) {
    upgraded = upgraded.replace(/Resize=\(360,360\)/g, 'Resize=(1000,1000)');
  }
  if (upgraded.includes('rukminim2.flixcart.com/image/480/640/')) {
    upgraded = upgraded.replace('/image/480/640/', '/image/1024/1024/');
  }
  return upgraded;
}
