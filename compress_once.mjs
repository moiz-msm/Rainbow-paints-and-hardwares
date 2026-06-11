import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimize() {
  const dir = 'public';
  const files = ['Hero-bg.png', 'Store-front.jpg', 'Logo.jpg', 'mascot.png'];
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    
    console.log(`Optimizing ${file}...`);
    const backupPath = filePath + '.backup';
    fs.copyFileSync(filePath, backupPath); // Backup original
    
    try {
      const isPng = file.endsWith('.png');
      const isJpg = file.endsWith('.jpg');
      
      let sharpInstance = sharp(backupPath)
        .resize({ width: 1920, withoutEnlargement: true }); // Max width 1920px
        
      if (isJpg) {
        sharpInstance = sharpInstance.jpeg({ quality: 75, progressive: true });
      } else if (isPng) {
        sharpInstance = sharpInstance.png({ quality: 75, compressionLevel: 8 });
      }
      
      await sharpInstance.toFile(filePath);
      
      const newSize = fs.statSync(filePath).size;
      console.log(`Optimized ${file}: ${(newSize / 1024 / 1024).toFixed(2)} MB`);
      
      // We can also generate webp versions to load in HTML with <picture>
      const parsed = path.parse(file);
      const webpPath = path.join(dir, `${parsed.name}.webp`);
      await sharp(backupPath)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(webpPath);
        
      console.log(`Created ${parsed.name}.webp: ${(fs.statSync(webpPath).size / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
      console.error(`Failed to optimize ${file}: `, err);
      // Restore from backup
      fs.copyFileSync(backupPath, filePath);
    }
    
    // Remove backup
    fs.unlinkSync(backupPath);
  }
}

optimize().catch(console.error);
