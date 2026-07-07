import re
import urllib.request
import json

# Try to get the sitemap or product listing from drfixit
req = urllib.request.Request("https://www.drfixit.co.in/products", headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    with open('drfixit.html', 'w') as f:
        f.write(html)
    print("Downloaded drfixit.html")
except Exception as e:
    print(f"Error: {e}")
