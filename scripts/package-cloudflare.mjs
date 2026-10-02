import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const destination = resolve(root, 'dist-cloudflare');
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
// Explicit allowlist keeps repository files and credentials out of hosting.
for (const path of ['index.html', 'privacy.html', 'terms.html', 'support.html',
  'robots.txt', 'sitemap.xml', 'css', 'js', 'images', 'screens', 'i']) {
  await cp(resolve(root, path), resolve(destination, path), { recursive: true });
}
console.log('Static site packaged with unchanged source files.');
