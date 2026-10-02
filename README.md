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
