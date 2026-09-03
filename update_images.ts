import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf-8');

// Update logo
content = content.replace(
  'logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Fevicol_Logo.svg"',
  'logo: "https://upload.wikimedia.org/wikipedia/en/0/05/Fevicol_brand_logo.png"'
);

// Update Fevicol SH
content = content.replace(
  '"image": "https://5.imimg.com/data5/SELLER/Default/2021/7/OU/OI/YY/111005295/fevicol-sh-adhesive-500x500.jpg"',
  '"image": "https://images.unsplash.com/photo-1585202684201-9878216960d7?auto=format&fit=crop&q=80&w=800&h=800"'
);

// Update Fevicol Marine
content = content.replace(
  '"image": "https://5.imimg.com/data5/SELLER/Default/2022/9/EH/SE/ON/52533857/fevicol-marine-waterproof-adhesive-500x500.jpg"',
  '"image": "https://images.unsplash.com/photo-1621644788544-7f154378f4ce?auto=format&fit=crop&q=80&w=800&h=800"'
);

// Update Fevicol SR 998
content = content.replace(
  '"image": "https://5.imimg.com/data5/ANDROID/Default/2020/9/ER/LI/UB/19717013/product-jpeg-500x500.jpg"',
  '"image": "https://images.unsplash.com/photo-1622340570377-51ff6e78885b?auto=format&fit=crop&q=80&w=800&h=800"'
);

// Update Fevicol HeatX
content = content.replace(
  '"image": "https://5.imimg.com/data5/SELLER/Default/2021/11/EM/QJ/AZ/9027878/fevicol-heatx-adhesive.jpg"',
  '"image": "https://images.unsplash.com/photo-1611077545166-027f6770dbbc?auto=format&fit=crop&q=80&w=800&h=800"'
);

// Update Fevicol Ezee Spray
content = content.replace(
  '"image": "https://5.imimg.com/data5/SELLER/Default/2023/5/304958611/UK/DH/UB/50800048/fevicol-ezee-spray-adhesive-500x500.jpg"',
  '"image": "https://images.unsplash.com/photo-1596768782069-42b78f4bbd05?auto=format&fit=crop&q=80&w=800&h=800"'
);

fs.writeFileSync('src/data.ts', content);
