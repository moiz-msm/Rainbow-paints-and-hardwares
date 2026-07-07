import re
import sys

# Read HTML files
with open('ap.html', 'r', encoding='utf-8') as f:
    html_int = f.read()
with open('ap_ext.html', 'r', encoding='utf-8') as f:
    html_ext = f.read()

html = html_int + html_ext

# Extract all image paths
pattern = r'/content/dam/asian_paints/products/packshots/[^"]*\.png'
paths = set(re.findall(pattern, html))
urls = ["https://static.asianpaints.com" + p for p in paths]

# Read data.ts
with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Define mappings based on what we see in the file
# We will do a manual dict for the ones we know
replacements = {
    "royale-glitz-new-packshot.png": "royale-glitz-new-packshot.png",
    "royale-luxury-emulsion-new-packshot.png": "interior-walls-royale-luxury-emulsion-asian-paints.png",
    "apcolite-premium-emulsion-new-packshot.png": "interior-walls-apcolite-premium-emulsion-asian-paints.png",
    "royale-aspira-new-packshot.png": "interior-walls-royale-aspira-luxury-emulsion-asian-paints.png",
    "royale-shyne-new-packshot.png": "interior-walls-royale-shyne-luxury-emulsion-asian-paints.png",
    "royale-matt-luxury-emulsion-packshot.png": "interior-walls-royale-matt-asian-paints.png",
    "royale-health-shield-new-packshot.png": "interior-walls-royale-health-shield-asian-paints.png", # Need to verify
    "apcolite-premium-satin-emulsion-new-packshot.png": "interior-walls-apcolite-premium-satin-emulsion-asian-paints.png",
    "apcolite-advanced-emulsion-new-packshot.png": "interior-walls-apcolite-advanced-emulsion-asian-paints.png", # verify
    "apex-dust-proof-packshot.png": "exterior-walls-apex-dust-proof-emulsion-packshot-asian-paints.png",
    "exterior-walls-apex-advanced-weatherproof-emulsion-packshot-asian-paints.png": "exterior-walls-apex-advanced-dust-proof-packshot-asian-paints.png",
    "tractor-emulsion-new-packshot.png": "interior-walls-tractor-emulsion-asian-paints.png",
    "tractor-sparc-emulsion-packshot.png": "interior-walls-tractor-sparc-asian-paints.png",
    "tractor-emulsion-shyne-packshot.png": "interior-walls-tractor-emulsion-shyne-asian-paints.png",
    "tractor-uno-acrylic-distemper-packshot.png": "interior-walls-tractor-uno-asian-paints.png",
    "exterior-walls-ace-exterior-emulsion-packshot-asian-paints.png": "exterior-walls-ace-exterior-emulsion-asian-paints.png",
    "decoprime-wall-primer-new-packshot.png": "decoprime-wall-primer-new-packshot.png", # verify
    "wood-finishes-italiano-emporio-pu-packshot-asian-paints.png": "wood-finishes-italiano-emporio-pu-packshot-asian-paints.png",
    "apcolite-premium-enamel-new-packshot.png": "apcolite-premium-enamel-new-packshot.png",
    "Nilaya-Arc-Matt-new.png": "Nilaya-Arc-Matt-new.png",
    "Nilaya-Arc-Pearlescent.png": "Nilaya-Arc-Pearlescent-new.png"
}

for old, new in replacements.items():
    old_url_www = f"https://www.asianpaints.com/content/dam/asian_paints/products/packshots/{old}"
    old_url_static = f"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/{old}"
    new_url = f"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/{new}"
    content = content.replace(old_url_www, new_url)
    content = content.replace(old_url_static, new_url)

# Print any asian paints urls that didn't get changed to static
leftovers = re.findall(r'https://www.asianpaints.com/[^\s"]+', content)
if leftovers:
    print("Leftover URLs:")
    for l in set(leftovers):
        print(l)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
