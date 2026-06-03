const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace('}\n\nif (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {\n  startDevServer();', '  }\n}\n\nif (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {\n  startDevServer();');
code = code.replace('  });\n}\n\nif (process.env.VERCEL', '  });\n  }\n}\n\nif (process.env.VERCEL');
fs.writeFileSync('server.ts', code);
