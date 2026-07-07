import google from 'googlethis';
import fs from 'fs';

const products = [
    "101 PIDIPROOF LW+",
    "100 PIDIPROOF LW+ SUPER",
    "301 Pidicrete URP",
    "302 SUPER LATEX",
    "303 PIDICRETE MPB",
    "233 PIDICRETE WP",
    "307 ALL SEAL",
    "304 POWERCRETE",
    "604 PRIMESEAL",
    "226 POLYMER MORTAR HB",
    "257 REPAIR POLYMER MORTAR",
    "112 PIDIFIN 2K",
    "113 FASTFLEX",
    "196 BITUFIX",
    "135 BATHSEAL TAPE",
    "103 REPELLIN WR",
    "104 DAMPGUARD",
    "107 KRYSTALLINE",
    "211 EPOXY BONDING AGENT",
    "204 RUST REMOVER",
    "207 PIDICRETE AM",
    "208 MICRO CONCRETE",
    "710 PIDIGROUT 10M",
    "202 CRACK-X POWDER",
    "201 CRACK-X PASTE",
    "217 CRACK-X SHRINKFREE",
    "501 FEVISEAL GP PRO",
    "501 FEVISEAL NEUTRAL PRO",
    "501 FEVISEAL WEATHERPROOF PRO",
    "FEVISEAL HY 100",
    "FEVISEAL HY 300",
    "515 FEVISEAL MULTIPURPOSE",
    "501 FEVISEAL BATHROOM & KITCHEN",
    "404 FEVIMATE TG",
    "T16 ROFF CERA CLEAN",
    "Newcoat",
    "Newcoat Coool",
    "Newcoat Ezee",
    "Raincoat",
    "641 RAINCOAT CLASSIC",
    "642 RAINCOAT SELECT",
    "643 RAINCOAT WATERPROOF COATING",
    "651 RAINCOAT NEO",
    "653 ROOFSEAL SELECT",
    "652 ROOFSEAL CLASSIC",
    "654 ROOFSEAL ULTRA",
    "610 SURESEAL"
];

const images = {};

async function fetchImages() {
    for (const prod of products) {
        try {
            const results = await google.image(`Dr Fixit ${prod}`, { safe: false });
            if (results && results.length > 0) {
                const img = results.find(r => r.url.includes('imimg.com') || r.url.includes('drfixit')) || results[0];
                images[prod] = img.url;
                console.log(prod, "->", img.url);
            }
        } catch (e) {
            console.error("Error fetching", prod, e.message);
        }
        await new Promise(r => setTimeout(r, 2000));
    }
    fs.writeFileSync('g_images.json', JSON.stringify(images, null, 2));
    console.log("Done");
}

fetchImages();
