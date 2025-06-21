import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Pour __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const lightPath = path.resolve(__dirname, '../src/styles/tokens/_variables-light.scss');
const darkPath = path.resolve(__dirname, '../src/styles/tokens/_variables-dark.scss');
const outputPath = path.resolve(__dirname, '../src/styles/themes/_tokens.map.scss');

const extractVarNames = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const regex = /^\$([a-zA-Z0-9-_]+):/;
  const names = new Set();

  for (const line of lines) {
    const match = regex.exec(line);
    if (match) names.add(match[1]);
  }

  return names;
};

const lightVars = extractVarNames(lightPath);
const darkVars = extractVarNames(darkPath);
const common = [...lightVars].filter((name) => darkVars.has(name)).sort();

const lines = [
  "@use '../tokens/variables-light' as light;",
  "@use '../tokens/variables-dark' as dark;",
  '',
  '$tokens: ('
];

for (const name of common) {
  lines.push(`  '${name}': (`);
  lines.push(`    light: light.$${name},`);
  lines.push(`    dark: dark.$${name}`);
  lines.push('  ),');
}

lines.push(');');

fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8');
console.log(`✅ Token map generated: ${outputPath}`);
