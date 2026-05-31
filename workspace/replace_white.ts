import fs from 'fs';

function replaceInFile(filePath: string, replacements: [RegExp | string, string][]) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [searchValue, replaceValue] of replacements) {
        content = content.replaceAll(searchValue, replaceValue);
    }
    fs.writeFileSync(filePath, content);
}

replaceInFile('src/components/ProductsSection.tsx', [
    [/bg-\[#1a1a1a\]\/95/g, 'bg-white/95'],
    [/border border-gold\/20/g, 'border border-black/10'],
    [/shadow-\[0_20px_60px_-15px_rgba\(0,0,0,0\.8\),0_0_30px_-5px_rgba\(212,175,55,0\.15\)\]/g, 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_30px_-5px_rgba(0,0,0,0.05)]'],
    
    // Category dropdown text
    [/bg-gradient-to-r from-gold\/20 to-gold\/5 text-gold border border-gold\/30 shadow-\[0_0_20px_rgba\(212,175,55,0\.15\)\]/g, 'bg-zinc-100 text-zinc-900 font-bold'],
    [/bg-white\/5 text-ivory hover:bg-white\/10 hover:pl-5/g, 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 hover:pl-5'],
    [/bg-gold\/50/g, 'bg-zinc-900/40'],
    [/text-gold\/80/g, 'text-zinc-900/60'],
    [/border-gold\/10/g, 'border-black/5'],
    [/bg-gold\/15 text-gold font-semibold/g, 'bg-zinc-100 text-zinc-900 font-bold'],
    [/text-ivory\/80 hover:bg-white\/5 hover:text-white/g, 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'],
    
    // Mix-blend overlay changes
    [/bg-\[radial-gradient\(ellipse_at_top_right,rgba\(212,175,55,0\.05\),transparent_50%\)\]/g, 'bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.03),transparent_50%)]'],
    [/opacity-\[0\.02\] mix-blend-overlay/g, "opacity-[0.03] invert mix-blend-overlay"],

]);
