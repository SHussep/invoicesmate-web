# Cloudflare migration

## Status — 2 October 2026

Source: `bb6ea19c0f9791d903dc25f3513e2d4a125bbcd6` from `main`.
Published to the existing owner's Cloudflare account using existing Wrangler OAuth:
<https://invoicesmate-web.saul-hussep.workers.dev>.
Worker version: `9211c2a6-6ae1-49b0-a86c-c426e4578063`.

All 27 route, byte-integrity and 404 checks passed locally and over HTTPS on
workers.dev. Chrome displayed the landing page correctly. The viewer rendered
its invalid-link state at `/i/?migration-check=1#invalid-migration-check`,
retaining the fragment and query without any Firestore document read/write.
No real invoice/quote was opened or accepted. Real document behavior remains
unverified, although its HTML and JavaScript are byte-identical to the source.

Production DNS, nameservers, mail and GitHub Pages have not been changed.
A read-only query found no `syainvoices.com` zone in the existing Cloudflare
account. Chrome local Cloudflare login is now confirmed. Hostinger DNS access and
the complete zone export are still required before preparing the cutover.

## Deployment

```sh
npm ci
npm run prepare:cloudflare
npx wrangler deploy --dry-run
npm run dev:cloudflare
# In another terminal:
npm run verify:cloudflare -- http://localhost:8787
# Publish only to the temporary workers.dev destination:
npm run deploy:cloudflare
npm run verify:cloudflare -- https://invoicesmate-web.saul-hussep.workers.dev
```

The packager copies only explicitly listed public files into `dist-cloudflare`.
It excludes Git, configuration, CNAME and migration backups. It replaces that
generated directory on each run. No build or application changes are required.
Keep credentials out of Git. No CI credentials were created or expanded.

The Worker preserves `.html` URLs and internally serves `index.html` for `/`
and `i/index.html` for `/i` and `/i/`. Queries remain intact. URL fragments
remain client-side. Unknown paths return 404. Temporary workers.dev responses
have `X-Robots-Tag: noindex, nofollow`; the viewer's original noindex meta stays
intact. Firestore, tracking and quote acceptance stay in the original browser
JavaScript. No Cloudflare database, credentials or backend migration is involved.

## Before DNS cutover

1. Export the entire Hostinger DNS zone and save it privately under
   `migration-backup.local/` (ignored by Git). The earlier public DNS snapshot
   is not a complete backup. Preserve all MX, SPF, DKIM, DMARC, CAA, verification
   records and service subdomains. Check DNSSEC/DS at the registrar.
2. Confirm the status of existing mail service and the addresses
   `support@syainvoices.com` and `privacy@syainvoices.com`. A website migration
   does not replace a mailbox or outbound SMTP. Do not configure forwarding
   without an approved destination.
3. Create/import a Free Cloudflare zone after presenting the exact proposed
   DNS operation for approval. Compare the imported zone against the export;
   automatic scanning alone is insufficient. Keep mail records DNS-only.
4. Present the assigned Cloudflare nameservers, exact apex/www changes and
   effects for action-specific approval. Do not guess nameservers from the
   Tortillerías zone. DNS and security changes require separate approval.
5. Connect apex and www to the tested Worker only after approval. Current
   config intentionally contains no production custom domains/routes. Decide
   whether www should serve the same site or redirect with path/query retained.
6. After activation, check HTTPS apex/www, HTTP-to-HTTPS, every route and asset,
   queries, fragments and a safe invalid-token viewer state. Use a disposable
   explicitly approved fixture or isolated mocks for acceptance tests.

## Rollback

Keep the existing GitHub Pages deployment and CNAME. For a bad Worker release,
use `npx wrangler rollback <known-good-version-id>` after reviewing the version.
For DNS recovery, detach any Cloudflare custom domain owning the affected web
record and restore only the previous web records from the complete backup.
Do not restore or modify mail records for a website problem. DNS rollback and
nameserver reversal require approval and are subject to propagation. Check the
GitHub origin/certificate before relying on it after a future cutover.

References: [Static Assets HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/),
[asset binding](https://developers.cloudflare.com/workers/static-assets/binding/),
[custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
