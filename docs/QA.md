# Validation — 2 October 2026

- Five public pages checked for one H1, one main landmark, unique descriptions and canonical URLs.
- All internal links, image paths and local anchors resolve. JSON-LD and sitemap XML parse successfully.
- JavaScript syntax and Git whitespace checks pass.
- Cloudflare packaging succeeds; the existing route and byte-integrity suite passes against Wrangler 4.146.0 locally on port 8789, including invoice-viewer paths and private-file 404s.
- Chrome visual review at 1440 × 1000 and 390 × 844: light/dark themes, mobile navigation, theme persistence, app-tour tabs and arrow-key selection, image enlargement and Escape dismissal, FAQ expansion and guide navigation.
- No horizontal page overflow at the mobile viewport. No broken source images were found.
- Seven simulator originals at 1320 × 2868; responsive WebP variants at 1320 and 660 px wide. Four marketing compositions at 1200 × 630 and 1080 × 1350.
- No Lighthouse score, field Core Web Vitals, Google indexing or rich-result eligibility is claimed. Search Console submission remains a post-publication step.

## Release context

This change is based on `codex/cloudflare-invoicesmate-migration` (55e5980), whose deployment and DNS approval are managed separately. The shared invoice viewer, Worker logic, production hosting and DNS were not modified by this refresh. Merge the migration first and retarget this change to main, or integrate this refresh into that branch before its approved deployment.

## Capture limitations

See SCREENSHOTS.md for source fidelity and the app's light-status-bar contrast issue. The application screenshots use a development build and fictional records. Confirm the pictured features match the App Store release before publication.
