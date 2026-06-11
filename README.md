# BILD website

Marketing website for BILD, the trust layer for residential property. A product by Luju Oy, Helsinki.

## Stack

Plain static HTML/CSS/JS. No build step, no dependencies.

- `index.html`, `homeowners.html`, `contractors.html`, `vision.html`, `about.html`, `contact.html` — pages
- `privacy.html`, `terms.html` — legal (privacy is bilingual EN/FI, follows the site language switcher)
- `assets/styles.css` — design system (petrol #053D5E, Space Grotesk + IBM Plex Mono)
- `assets/main.js` — interactions (stepper, van route, reveals, mobile menu, contact form)
- `assets/i18n.js` — EN/FI/SV dictionary + text-node translator
- `assets/bild-logo.svg`, `assets/favicon.svg`

## Run locally

Any static server, e.g.:

```
npx serve .
```

or just open `index.html` in a browser.

## Before public launch

- [ ] Wire the contact form to a real backend (currently front-end only)
- [ ] Fill in the Business ID placeholder `[XXXXX-X]` in `privacy.html`
- [ ] Legal review of `privacy.html` and `terms.html`
- [ ] Self-host the Google Fonts (GDPR)
- [ ] Add OG/social meta tags and a 404 page
