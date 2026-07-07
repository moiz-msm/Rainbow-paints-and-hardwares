import requests
from bs4 import BeautifulSoup
import urllib.parse

products = [
    'Royale glitz reserve asian paints',
    'Apcolite all protek shyne asian paints',
    'Royale health shield asian paints',
    'Apex tile guard matt asian paints',
    'Apex ultima stretch asian paints'
]

for prod in products:
    try:
        url = 'https://html.duckduckgo.com/html/'
        headers = {'User-Agent': 'Mozilla/5.0'}
        data = {'q': prod + ' packshot image filetype:jpg OR filetype:png'}
        
        r = requests.post(url, headers=headers, data=data, timeout=5)
        soup = BeautifulSoup(r.text, 'html.parser')
        
        links = []
        for a in soup.find_all('a'):
            link = a.get('href')
            if link and 'uddg=' in link:
                parsed = urllib.parse.parse_qs(urllib.parse.urlparse(link).query)
                if 'uddg' in parsed:
                    actual = parsed['uddg'][0]
                    if '.jpg' in actual or '.png' in actual:
                        links.append(actual)
                        
        print(prod, links[:2])
    except Exception as e:
        print(prod, e)
