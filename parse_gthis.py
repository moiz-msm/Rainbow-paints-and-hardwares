import re
import json

images = {}
with open('gthis_out.txt', 'r') as f:
    for line in f:
        if ' -> ' in line:
            parts = line.split(' -> ')
            if len(parts) == 2:
                images[parts[0].strip()] = parts[1].strip()

with open('g_images.json', 'w') as f:
    json.dump(images, f)
