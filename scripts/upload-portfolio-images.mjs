// One-off: upload the portfolio images to production Ghost via the Admin API
// and print the resulting URLs, so docs/home-page-content.html can be updated
// to reference real, uploaded image paths instead of the assumed
// /content/images/portfolio/... paths (which only exist locally via the
// devcontainer bind mount).
//
// Usage: node scripts/upload-portfolio-images.mjs

import { readdirSync, readFileSync } from 'node:fs';
import { join, extname } from 'node:path';
import { api, GHOST_URL } from './ghost-api.mjs';

const DIR = join(import.meta.dirname, '..', '.devcontainer', 'server', 'images', 'portfolio');

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
};

const files = readdirSync(DIR).filter((f) => extname(f).toLowerCase() in MIME);

console.log(`Uploading ${files.length} images from ${DIR} to ${GHOST_URL}\n`);

const results = [];
for (const file of files) {
  const bytes = readFileSync(join(DIR, file));
  const type = MIME[extname(file).toLowerCase()];
  const form = new FormData();
  form.append('file', new Blob([bytes], { type }), file);
  form.append('purpose', 'image');

  try {
    const res = await api('images/upload/', { method: 'POST', form });
    const url = res.images[0].url;
    results.push({ file, url });
    console.log(`${file} -> ${url}`);
  } catch (err) {
    console.error(`${file} -> FAILED: ${err.message}`);
  }
}

console.log('\nDone.');
