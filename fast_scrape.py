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
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/112.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
}

def fetch_image(prod):
    query = urllib.parse.quote(f"Dr Fixit {prod}")
    url = f"https://dir.indiamart.com/search.mp?ss={query}"
    req = urllib.request.Request(url, headers=headers)
    try:
        html = urllib.request.urlopen(req, context=ctx, timeout=10).read().decode('utf-8', errors='ignore')
        match = re.search(r'https?://[a-zA-Z0-9.\-]+imimg\.com/data[0-9a-zA-Z/_\-]+\.(?:jpg|png|jpeg|webp)', html, re.IGNORECASE)
        if match:
            return prod, match.group(0)
    except Exception as e:
        pass
    return prod, ""

with ThreadPoolExecutor(max_workers=10) as executor:
    results = executor.map(fetch_image, products)
    for prod, img in results:
        images[prod] = img
        print(f'"{prod}": "{img}",')

with open('fast_scraped_images.json', 'w') as f:
    json.dump(images, f, indent=2)

