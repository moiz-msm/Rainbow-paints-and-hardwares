const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
const marker = '// Vite middleware for development';
const parts = code.split(marker);
let topPart = parts[0];
let bottomPart = marker + parts[1];
topPart = topPart.replace('async function startServer() {\n  const app = express();', 'export const app = express();');
topPart = topPart.replace('const PORT = 3000;\n', '');
bottomPart = '\nasync function startDevServer() {\n  const PORT = process.env.PORT || 3000;\n  \n' + bottomPart;
const oldListenStr = `  app.listen(PORT, "0.0.0.0", () => {
    console.log(\`Server running on http://localhost:${PORT}\`);
  });
}

startServer();`;
const newListenStr = `  if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(\`Server running on http://localhost:${PORT}\`);
    });
  }
}

if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
  startDevServer();
}

export default app;`;
bottomPart = bottomPart.replace(oldListenStr, newListenStr);
fs.writeFileSync('server.ts', topPart + bottomPart);
console.log('Refactored server.ts');
