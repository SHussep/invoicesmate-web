import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = process.argv[2];
assert(base, 'Usage: npm run verify:cloudflare -- https://HOST');
const origin = new URL(base).origin;
const paths = new Map([
  ['/', 'index.html'], ['/index.html', 'index.html'],
  ['/privacy.html', 'privacy.html'], ['/terms.html', 'terms.html'],
  ['/guide.html', 'guide.html'], ['/js/theme.js', 'js/theme.js'],
  ['/images/invoice-mate-social.jpg', 'images/invoice-mate-social.jpg'],
  ['/screens/dashboard.webp', 'screens/dashboard.webp'],
  ['/screens/dashboard-660.webp', 'screens/dashboard-660.webp'],
  ['/support.html', 'support.html'], ['/i/', 'i/index.html'],
  ['/i', 'i/index.html'], ['/i/index.html', 'i/index.html'],
  ['/css/style.css', 'css/style.css'], ['/js/main.js', 'js/main.js'],
  ['/robots.txt', 'robots.txt'], ['/sitemap.xml', 'sitemap.xml'],
  ['/images/InvoicesMateLogoTransparent.png', 'images/InvoicesMateLogoTransparent.png'],
  ['/images/InvoicesMateLogo.png', 'images/InvoicesMateLogo.png'],
  ['/images/InvoicesMateLogo32.png', 'images/InvoicesMateLogo32.png'],
  ['/screens/expenses.png', 'screens/expenses.png'],
  ['/screens/invoice.png', 'screens/invoice.png'], ['/screens/export.png', 'screens/export.png'],
  ['/i/?migration-check=1', 'i/index.html'],
  ['/support.html?migration-check=1', 'support.html'],
]);
for (const [path, file] of paths) {
  const response = await fetch(origin + path, { redirect: 'manual' });
  assert.equal(response.status, 200, `${path}: expected 200 without redirect`);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.deepEqual(bytes, await readFile(new URL('../' + file, import.meta.url)), `${path}: content differs`);
  if (new URL(origin).hostname.endsWith('.workers.dev')) {
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  }
  if (file === 'i/index.html') assert.match(bytes.toString(), /noindex, nofollow/);
  console.log(`OK ${path}`);
}
for (const path of ['/missing-migration-check', '/.git/config', '/CNAME',
  '/README.md', '/wrangler.jsonc', '/package.json', '/cloudflare/worker.js']) {
  const response = await fetch(origin + path, { redirect: 'manual' });
  assert.equal(response.status, 404, `${path}: expected genuine 404`);
  console.log(`OK 404 ${path}`);
}
console.log('All routing and byte-integrity checks passed. No Firestore calls made.');
