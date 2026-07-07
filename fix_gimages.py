import re
import json
import time
import os

while not os.path.exists('g_images.json'):
    time.sleep(2)

with open('g_images.json', 'r') as f:
    images = json.load(f)

with open('src/data.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def repl(match):
    name = match.group(1)
    obj = match.group(0)
    
    new_url = images.get(name)
    if new_url:
        obj = re.sub(r'image:\s*"[^"]*"', f'image: "{new_url}"', obj)
    return obj

pattern = r'name:\s*"([^"]+)",\s*brand:\s*"Dr\. Fixit",.*?image:\s*"[^"]*"'
content = re.sub(pattern, repl, content, flags=re.DOTALL)

with open('src/data.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated src/data.ts")
