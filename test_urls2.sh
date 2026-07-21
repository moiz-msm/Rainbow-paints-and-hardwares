urls=(
"https://images.unsplash.com/photo-1593696140826-c58b021acf8b"
"https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e"
"https://images.unsplash.com/photo-1560185016592-36c1cf440266"
"https://images.unsplash.com/photo-1513694203232-719a280e022f"
)
for url in "${urls[@]}"; do
  status=$(curl -o /dev/null -s -w "%{http_code}" "$url")
  echo "$status $url"
done
