# Website and SEO refresh — 2 October 2026

The existing static site was redesigned around real simulator screenshots and a practical product guide. Production hosting and the shared invoice viewer are preserved.

## Included

- Search title and description focused on Australian small business invoicing.
- Semantic headings, a descriptive image inventory, and contextual links to the guide.
- Canonical URLs on all five public pages; sitemap includes the new guide.
- Website, organisation and software application JSON-LD. No fabricated ratings or reviews. This does not claim eligibility for Google's app rich results.
- Large Open Graph and Twitter sharing card; Apple Smart App Banner.
- Real App Store destination: https://apps.apple.com/au/app/invoice-mate-invoice-maker/id6754184134
- Responsive screenshot sizes, WebP delivery, explicit dimensions, lazy loading below the hero.
- Theme preference follows the system with a persistent manual override. Accessible mobile navigation, keyboard-operated tour, screenshot enlargement and reduced-motion support.
- No analytics or trackers added.

## Content decisions

The site remains in English for its Australian audience. It explains the five supported app languages. Product capabilities were checked against local app source and the official App Store listing. Claims of guaranteed compliance, “bank-grade” security and “only you can access” have been removed from the homepage rather than repeated without evidence. Tax guidance is limited to describing product behaviour.

The privacy and terms body text is preserved; support's template count was updated from five to six to match the application source. Support and legal pages inherit the same navigation and light/dark design.

## After publication

Submit https://syainvoices.com/sitemap.xml in the owner's Google Search Console and inspect the homepage and guide. Search Console ownership/access was not configured in this task. Ranking and indexing improvements require search engines to recrawl; metadata changes do not guarantee position or rich results.

## References

- Official app: https://apps.apple.com/au/app/invoice-mate-invoice-maker/id6754184134
- Google image SEO: https://developers.google.com/search/docs/appearance/google-images
- Google structured data policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google app structured data: https://developers.google.com/search/docs/appearance/structured-data/software-app

## Preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` in the repository root. The marketing card source is `marketing/social.html`; that working template is excluded from the Cloudflare static publishing allowlist. The finished card is in `images/`.
