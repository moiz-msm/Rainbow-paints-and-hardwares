const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
const oldStr = '  app.listen(PORT, "0.0.0.0", () => {\n    console.log();\n  });\n}\n\nstartServer();';
const newStr = '  if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {\n    app.listen(PORT, "0.0.0.0", () => {\n      console.log();\n    });\n  }\n}\n\nif (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {\n  startDevServer();\n}\n\nexport default app;';
code = code.replace(oldStr, newStr);
fs.writeFileSync('server.ts', code);
