const fs = require('fs');

let code = fs.readFileSync('server.ts', 'utf-8');

// The marker where we split:
const marker = '// Vite middleware for development';
const parts = code.split(marker);

let topPart = parts[0];
let bottomPart = marker + parts[1];

// Make app exported and remove the async function wrapper for the top part
topPart = topPart.replace(
  'async function startServer() {\n  const app = express();',
  'export const app = express();'
);

// We need to move the PORT variable to bottomPart where it is used,
// although it might be used internally? Let's check (it's only used in app.listen).
topPart = topPart.replace('const PORT = 3000;\n', '');

// wrap the bottom part with the server start function
bottomPart = `
async function startDevServer() {
  const PORT = process.env.PORT || 3000;
  
` + bottomPart;

// We must also handle the end of bottomPart correctly.
// Old bottom part ends with:
//   app.listen(PORT, "0.0.0.0", () => {
//     console.log(\`Server running on http://localhost:\${PORT}\`);
//   });
// }
// 
// startServer();

// We replace the listen part:
const oldListenStr = `  app.listen(PORT, "0.0.0.0", () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
  });
}

startServer();`;

const newListenStr = `  if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(\`Server running on http://localhost:\${PORT}\`);
    });
  }
}

if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
  startDevServer();
}

export default app;`;

bottomPart = bottomPart.replace(oldListenStr, newListenStr);

fs.writeFileSync('server.ts', topPart + bottomPart);
console.log("Refactored server.ts");
