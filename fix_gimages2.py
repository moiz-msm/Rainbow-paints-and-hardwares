import re
import json
import time
import os

with open('g_images.json', 'r') as f:
    images = json.load(f)

# Create case-insensitive map
images_ci = {k.lower(): v for k, v in images.items()}

# Also use partial_images
partial_images = {
  "101 PIDIPROOF LW+": "https://5.imimg.com/data5/SELLER/Default/2025/3/496720747/CW/XF/OX/1774309/dr-fixit-pidiproof-lw-plus.jpg",
  "100 PIDIPROOF LW+ SUPER": "https://5.imimg.com/data5/SELLER/Default/2024/8/446954522/GI/IZ/UZ/1774309/dr-fixit-raincoat-waterproofing-chemical.jpg",
  "301 Pidicrete URP": "https://5.imimg.com/data5/SELLER/Default/2023/8/336094569/TV/WV/BG/11348985/dr-fixit-301-pidicrete-urp-waterproofing-chemical.jpeg",
  "302 SUPER LATEX": "https://5.imimg.com/data5/SELLER/Default/2023/1/YJ/AA/DE/181063841/dr-fixit-302-super-latex.png",
  "303 PIDICRETE MPB": "https://5.imimg.com/data5/SELLER/Default/2023/8/336094569/TV/WV/BG/11348985/dr-fixit-301-pidicrete-urp-waterproofing-chemical.jpeg",
  "233 PIDICRETE WP": "https://5.imimg.com/data5/SELLER/Default/2023/8/336094569/TV/WV/BG/11348985/dr-fixit-301-pidicrete-urp-waterproofing-chemical.jpeg",
  "307 ALL SEAL": "https://5.imimg.com/data5/ANDROID/Default/2025/8/536495189/HB/JO/AR/161183780/product-jpeg.jpg",
  "304 POWERCRETE": "https://5.imimg.com/data5/SELLER/Default/2025/3/496440706/LL/BW/VM/1774309/dr-fixit-304-powercrete.jpg",
  "604 PRIMESEAL": "https://5.imimg.com/data5/SELLER/Default/2023/9/340488826/TC/MZ/OF/7242329/dr-fixit-604-primeseal.jpg",
  "226 POLYMER MORTAR HB": "https://5.imimg.com/data5/SELLER/PDFImage/2025/3/496114877/HY/ME/EJ/1774309/fosroc-renderoc-sp40.png",
  "257 REPAIR POLYMER MORTAR": "https://5.imimg.com/data5/SELLER/PDFImage/2025/3/496114877/HY/ME/EJ/1774309/fosroc-renderoc-sp40.png",
  "112 PIDIFIN 2K": "https://5.imimg.com/data5/SELLER/Default/2025/3/494104634/JO/IS/HI/1774309/dr-fixit-pidifin-2k.jpg",
  "113 FASTFLEX": "https://5.imimg.com/data5/SELLER/Default/2024/8/446764424/JQ/TW/VK/1774309/dr-fixit-fastflex-waterproofing-coating.jpg",
  "196 BITUFIX": "https://5.imimg.com/data5/SELLER/Default/2025/3/494655270/ZZ/UJ/BS/1774309/dr-fixit-bitufix.jpg",
  "135 BATHSEAL TAPE": "https://5.imimg.com/data5/SELLER/Default/2025/3/494665028/MD/DL/EU/1774309/dr-fixit-bathseal-tape.png"
}
for k, v in partial_images.items():
    images_ci[k.lower()] = v

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def repl(match):
    name = match.group(1).strip()
    obj = match.group(0)
    
    new_url = images_ci.get(name.lower())
    if not new_url:
        # Check partial match
        for k, v in images_ci.items():
            if k in name.lower() or name.lower() in k:
                new_url = v
                break

    if new_url:
        if 'imimg.com' in new_url:
            new_url = re.sub(r'-\d+x\d+(\.(?:jpg|png|jpeg|webp))$', r'\1', new_url, flags=re.IGNORECASE)
        # Avoid chat images
        if 'images/chat' not in new_url:
            obj = re.sub(r'image:\s*"[^"]*"', f'image: "{new_url}"', obj)
    
    # If still chat image, use fallback
    if 'images/chat' in obj:
        encoded_name = name.replace(" ", "+")
        fb = f"https://placehold.co/500x500/eeeeee/333333?text=Dr.+Fixit+{encoded_name}"
        obj = re.sub(r'image:\s*"[^"]*"', f'image: "{fb}"', obj)

    return obj

pattern = r'name:\s*"([^"]+)",\s*brand:\s*"Dr\. Fixit",.*?image:\s*"[^"]*"'
content = re.sub(pattern, repl, content, flags=re.DOTALL)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated src/data.ts with fallback!")
