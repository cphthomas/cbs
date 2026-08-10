import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const source = resolve('public');
const destination = resolve('build');
const requiredFiles = ['index.html', 'styles.css', 'app.js', '_redirects'];

for (const file of requiredFiles) {
  if (!existsSync(resolve(source, file))) {
    throw new Error(`Missing required site file: public/${file}`);
  }
}

rmSync(destination, { force: true, recursive: true });
mkdirSync(destination, { recursive: true });
cpSync(source, destination, { recursive: true });

console.log('Static production site built in build/.');
