const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const target = `  }, [shade]);

    return (`;

const replacement = `  }, [shade]);

  if (loading) {
    return (`;

content = content.replace(target, replacement);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Restored if (loading)");
