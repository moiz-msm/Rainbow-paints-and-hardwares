import re
import sys

# Replace known chat images
replacements = {
    "101 PIDIPROOF LW+": "https://www.drfixit.co.in/images/chat/Pidiproof-LW+.png",
    "100 PIDIPROOF LW+ SUPER": "https://www.drfixit.co.in/images/chat/Pidiproof-LW+.png",
    "301 Pidicrete URP": "https://www.drfixit.co.in/images/chat/drfixit-urp.png",
    "302 SUPER LATEX": "https://www.drfixit.co.in/images/chat/drfixit-urp.png",
    "112 PIDIFIN 2K": "https://www.drfixit.co.in/images/chat/PIDIFIN-2K.png",
    "113 FASTFLEX": "https://www.drfixit.co.in/images/chat/Fastflex.png",
    "196 BITUFIX": "https://www.drfixit.co.in/images/chat/bitufix.png",
    "104 DAMPGUARD": "https://www.drfixit.co.in/images/chat/Dampguard-Classic.png",
    "201 CRACK-X PASTE": "https://www.drfixit.co.in/images/chat/crack-x-Paste.png",
    "217 CRACK-X SHRINKFREE": "https://www.drfixit.co.in/images/chat/Crack-X-Shrinkfree-Waterproofing-Expert.png",
    "604 PRIMESEAL": "https://www.drfixit.co.in/images/chat/PRIMESEAL.png",
    "Newcoat": "https://www.drfixit.co.in/images/chat/Newcoat.png",
    "Newcoat Coool": "https://www.drfixit.co.in/images/chat/Newcoat-Coool.png",
    "Newcoat Ezee": "https://www.drfixit.co.in/images/chat/Newcoat-Easy.png",
    "Raincoat": "https://www.drfixit.co.in/images/chat/Raincoat-Classic.png",
    "641 RAINCOAT CLASSIC": "https://www.drfixit.co.in/images/chat/Raincoat-Classic.png",
    "642 RAINCOAT SELECT": "https://www.drfixit.co.in/images/chat/Raincoat-Classic.png",
    "643 RAINCOAT WATERPROOF COATING": "https://www.drfixit.co.in/images/chat/Raincoat-Classic.png",
    "651 RAINCOAT NEO": "https://www.drfixit.co.in/images/chat/Raincoat-Classic.png",
    "T16 ROFF CERA CLEAN": "https://www.drfixit.co.in/images/chat/Tile.png",
}

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# All dr fixit images are mostly https://www.drfixit.co.in/content/dam/drfixit/packshots/pidiproof-urp.png
# We need to replace the image specifically for the Dr Fixit products.
# We'll use regex to find each object with brand: "Dr. Fixit" and name and replace its image.

import re

def repl(match):
    name = match.group(1)
    # the entire object text is in match.group(0)
    obj = match.group(0)
    
    # Check if there is a replacement
    new_url = replacements.get(name)
    if not new_url:
        new_url = "https://www.drfixit.co.in/images/chat/drfixit-urp.png"
        
    obj = re.sub(r'image:\s*"[^"]*"', f'image: "{new_url}"', obj)
    return obj

# regex to find object with name and brand: "Dr. Fixit"
pattern = r'name:\s*"([^"]+)",\s*brand:\s*"Dr\. Fixit",.*?image:\s*"[^"]*"'
content = re.sub(pattern, repl, content, flags=re.DOTALL)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
