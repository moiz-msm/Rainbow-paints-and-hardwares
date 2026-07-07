import fs from 'fs';
let content = fs.readFileSync('src/data.ts', 'utf8');

// We need to parse the products array. It's a bit tricky with Regex.
// Let's find any object that has "name": "...Putty..." or "...White Cement..." and change its subCategory to "Undercoats".
// But we must be careful not to break the file.
// A simpler way is to split by "{" and "}", but there are nested braces.
// Let's use a regex to match the name and subCategory inside a block.

let changed = 0;
content = content.replace(/\{([^{}]*?"name":\s*"[^"]*(?:Putty|White Cement)[^"]*"[^{}]*?"subCategory":\s*)"[^"]*"/g, (match, p1) => {
    changed++;
    return '{' + p1 + '"Undercoats"';
});

console.log("Replaced", changed, "Putty/White Cement subCategories.");
fs.writeFileSync('src/data.ts', content, 'utf8');
