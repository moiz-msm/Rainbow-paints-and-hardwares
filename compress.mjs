import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const files = fs.readdirSync(publicDir);

for (const file of files) {
  if (file.endsWith('.jpg') || file.endsWith('.png')) {
    if (file.startsWith('favicon')) continue; // Skip favicons just in case
    const input = path.join(publicDir, file);
    const output = path.join(publicDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    console.log(`Converting ${file} to .webp`);
    try {
      await sharp(input).webp({ quality: 80 }).toFile(output);
      console.log(`Converted ${file}`);
    } catch (e) {
      console.error(e);
    }
  }
}
