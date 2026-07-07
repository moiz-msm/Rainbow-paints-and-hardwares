import urllib.request
import urllib.parse
import re
import json
import time

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
# Use duckduckgo html search with a user agent, but for images directly!
# No wait, duckduckgo blocks fast requests.
# Let's use Yahoo Image Search!
def fetch_image_yahoo(prod):
    query = urllib.parse.quote(f"Dr Fixit {prod}")
    url = f"https://images.search.yahoo.com/search/images?p={query}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        # Yahoo images have 'imgurl&quot;:&quot;https://...&quot;'
        match = re.search(r'imgurl(?:&quot;|"):(?:&quot;|")([^"&]+)(?:&quot;|")', html)
        if match:
            url = match.group(1).replace('\\/', '/')
            return prod, url
    except Exception as e:
        pass
    return prod, ""

for prod in products:
    p, img = fetch_image_yahoo(prod)
    if img:
        images[prod] = img
        print(f'"{prod}": "{img}",')
    time.sleep(0.1)

with open('scraped_yahoo.json', 'w') as f:
    json.dump(images, f, indent=2)

