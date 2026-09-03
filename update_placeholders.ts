import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf-8');

// Use clean placehold.co URLs with Fevicol branding colors (Blue & White)
content = content.replace(
  '"image": "https://images.unsplash.com/photo-1585202684201-9878216960d7?auto=format&fit=crop&q=80&w=800&h=800"',
  '"image": "https://placehold.co/800x800/004C97/FFFFFF/png?text=Fevicol\\nSH"'
);

content = content.replace(
  '"image": "https://images.unsplash.com/photo-1621644788544-7f154378f4ce?auto=format&fit=crop&q=80&w=800&h=800"',
  '"image": "https://placehold.co/800x800/004C97/FFFFFF/png?text=Fevicol\\nMarine"'
);

content = content.replace(
  '"image": "https://images.unsplash.com/photo-1622340570377-51ff6e78885b?auto=format&fit=crop&q=80&w=800&h=800"',
  '"image": "https://placehold.co/800x800/004C97/FFFFFF/png?text=Fevicol\\nSR+998"'
);

content = content.replace(
  '"image": "https://images.unsplash.com/photo-1611077545166-027f6770dbbc?auto=format&fit=crop&q=80&w=800&h=800"',
  '"image": "https://placehold.co/800x800/FF5722/FFFFFF/png?text=Fevicol\\nHeatX"'
);

content = content.replace(
  '"image": "https://images.unsplash.com/photo-1596768782069-42b78f4bbd05?auto=format&fit=crop&q=80&w=800&h=800"',
  '"image": "https://placehold.co/800x800/004C97/FFFFFF/png?text=Fevicol\\nEzee+Spray"'
);

fs.writeFileSync('src/data.ts', content);
