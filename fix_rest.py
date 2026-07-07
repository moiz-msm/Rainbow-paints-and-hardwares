import urllib.request
import urllib.parse
import re
import json
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

products = [
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

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/112.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5'
}

images = {}

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for prod in products:
    query = urllib.parse.quote(f"Dr Fixit {prod}")
    url = f"https://dir.indiamart.com/search.mp?ss={query}"
    req = urllib.request.Request(url, headers=headers)
    try:
        html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
        match = re.search(r'https?://[a-zA-Z0-9.\-]+imimg\.com/data[0-9a-zA-Z/_\-]+\.(?:jpg|png|jpeg)', html, re.IGNORECASE)
        if match:
            img = match.group(0).replace('-250x250', '')
            images[prod] = img
            print(f'Found: {prod} -> {img}')
            def repl(m):
                if m.group(1) == prod:
                    return re.sub(r'image:\s*"[^"]*"', f'image: "{img}"', m.group(0))
                return m.group(0)
            pattern = r'name:\s*"([^"]+)",\s*brand:\s*"Dr\. Fixit",.*?image:\s*"[^"]*"'
            content = re.sub(pattern, repl, content, flags=re.DOTALL)
    except Exception as e:
        print(f'Error on {prod}: {e}')
    time.sleep(1) # sleep to avoid 429

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

