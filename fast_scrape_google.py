import urllib.request
import urllib.parse
import re
import json
import ssl
from concurrent.futures import ThreadPoolExecutor

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

products = [
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
]

images = {}
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
}

def fetch_image(prod):
    query = urllib.parse.quote(f"Dr Fixit {prod} 1 litre")
    url = f"https://duckduckgo.com/i.js?l=in-en&o=json&q={query}"
    # duckduckgo image api requires vqd which is hard to get, let's try google instead
    url = f"https://www.google.com/search?tbm=isch&q={query}"
    req = urllib.request.Request(url, headers=headers)
    try:
        html = urllib.request.urlopen(req, context=ctx, timeout=10).read().decode('utf-8', errors='ignore')
        # Google images returns some urls in the script tags like ["https://...", ...]
        match = re.search(r'\["(https://[^"]+\.(?:jpg|png|jpeg))",\d+,\d+\]', html, re.IGNORECASE)
        if match:
            return prod, match.group(1)
        # fallback for old google html
        match2 = re.search(r'src="(https://encrypted-tbn0\.gstatic\.com/images[^"]+)"', html)
        if match2:
            return prod, match2.group(1)
    except Exception as e:
        pass
    return prod, ""

with ThreadPoolExecutor(max_workers=5) as executor:
    results = executor.map(fetch_image, products)
    for prod, img in results:
        images[prod] = img
        print(f'"{prod}": "{img}",')

with open('fast_scraped_images.json', 'w') as f:
    json.dump(images, f, indent=2)

