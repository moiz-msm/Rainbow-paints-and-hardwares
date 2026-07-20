const { mockProducts } = require('./dist/server.cjs');
console.log(mockProducts ? mockProducts.length : 'Not exported directly, trying to parse');
