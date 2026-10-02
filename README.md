# InvoicesMate — Website

Marketing site for **InvoicesMate**, an invoicing and financial-management app for
Australian sole traders and small businesses (invoices, quotes, expenses, GST/ABN, reports).

Live at **https://syainvoices.com** (GitHub Pages).

Cloudflare migration is staged at
**https://invoicesmate-web.saul-hussep.workers.dev**. DNS cutover is pending;
see [migration notes](cloudflare/README.md).

## Stack
Plain static HTML/CSS/JS — no build step. Brand colours and logo mirror the Flutter app
(`InvoicesMate`), Royal Sky palette (`#2563EB → #0EA5E9`).

## Structure
- `index.html` — landing page
- `privacy.html`, `terms.html`, `support.html` — legal & support
- `css/style.css` — styles
- `js/main.js` — nav behaviour
- `images/` — logo assets
- `CNAME` — custom domain for GitHub Pages
- `i/index.html` — shared invoice/quote viewer using Firestore REST

## Local preview
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Product-site refresh

The home page and guide use real simulator captures with fictional demonstration records. Source, reproduction details and SEO decisions are documented in [screenshots](docs/SCREENSHOTS.md) and [SEO](docs/SEO.md). `marketing/` contains editable compositions; the deploy allowlist excludes those working templates.

The website follows system light/dark appearance and allows a persistent manual override. The app tour supports keyboard navigation and full-resolution screenshot viewing.
