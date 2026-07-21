const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const targetLogic = `function getStableImages(shadeName) {
    const livingRooms = [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55dd5802c6c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80"
    ];
    
    const bedrooms = [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617325247661-675ab03407bd?auto=format&fit=crop&q=80"
    ];

    let hash = 0;
    for (let i = 0; i < shadeName.length; i++) {
      hash = shadeName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash);
    return {
      living: livingRooms[index % livingRooms.length],
      bedroom: bedrooms[index % bedrooms.length]
    };
  }`;

const newLogic = `function getStableImages(shadeName) {
    const livingRooms = [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80"
    ];
    
    const bedrooms = [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
    ];

    let hash = 0;
    for (let i = 0; i < shadeName.length; i++) {
      hash = shadeName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash);
    return {
      living: livingRooms[index % livingRooms.length],
      bedroom: bedrooms[index % bedrooms.length]
    };
  }`;

content = content.replace(targetLogic, newLogic);
fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Images patched");
