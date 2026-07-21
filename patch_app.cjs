const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace("import GlobalLoader from './components/GlobalLoader';\n", "");
content = content.replace("        <GlobalLoader />\n", "");
fs.writeFileSync('src/App.tsx', content);
