urls=(
"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0"
"https://images.unsplash.com/photo-1583847268964-b28dc8f51f92"
"https://images.unsplash.com/photo-1598928506311-c55dd5802c6c"
"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
"https://images.unsplash.com/photo-1567016432779-094069958ea5"
"https://images.unsplash.com/photo-1540518614846-7eded433c457"
"https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
"https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"
"https://images.unsplash.com/photo-1505693314120-0d443867891c"
"https://images.unsplash.com/photo-1617325247661-675ab03407bd"
)
for url in "${urls[@]}"; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  echo "$status $url"
done
