import re
import sys

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-ultima-protek-topcoat-new-asian-paints.png": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-ultima-protek-topcoat-new-asian-paints.png",
    "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/apcolite-advanced-emulsion-packshot.png": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-advanced-emulsion-asian-paints.png",
    "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Nilaya-Arc-Pearlescent-new.png": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Nilaya-Arc-Pearlescent-new.png",
    "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-dust-proof-emulsion-packshot-asian-paints.png": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-dust-proof-emulsion-packshot-asian-paints.png",
    "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/apcolite-premium-enamel-hi-gloss-new-packshot.png": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/apcolite-premium-enamel-hi-gloss-new-packshot.png",
    "https://www.asianpaints.com/content/dam/asian_paints/textures/others/duralife_topcoat_single-layer.png": "https://static.asianpaints.com/content/dam/asian_paints/textures/others/duralife_topcoat_single-layer.png"
}

for old, new in replacements.items():
    content = content.replace(old, new)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)

