import { assert, test } from 'vitest'

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../.vitepress/dist');
const FORBIDDEN_PATTERN = ['[!code '];

function walk(dir) {
  const files = fs.readdirSync(dir);
  return files.flatMap(file => {
    const fullPath = path.join(dir, file);
    return fs.statSync(fullPath).isDirectory()
      ? walk(fullPath)
      : [fullPath];
  });
}

for (const word of FORBIDDEN_PATTERN) {
	test(`rendered files should not contain "${word}"`, () => {
		const htmlFiles = walk(DIST_DIR).filter(f => f.endsWith('.html'));
		for (const file of htmlFiles) {
			const content = fs.readFileSync(file, 'utf-8');
			if(content.includes(word)) {
				assert.fail(`File ${path.relative(DIST_DIR, file)} contains forbidden pattern: "${word}"`);
			}
		}
	});
}
