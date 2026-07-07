import fs from 'fs';

function normalize(str) {
  return str.toLowerCase().replace(/dr\.?\s*fixit/g, '').replace(/[^a-z0-9]/g, '');
}

console.log(normalize("101 PIDIPROOF LW+"));
console.log(normalize("Dr. Fixit Pidiproof LW+"));
