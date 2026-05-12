# Summit

Summit is a Next.js recruiting landing site built from a reverse-engineered UX report. It includes:

- a long-scroll marketing homepage
- a shared `JOIN THE TEAM` lead modal
- legal pages for `Terms of Use` and `Privacy Policy`
- a simple `/api/lead` endpoint for local form submission testing

## Local Development

Install dependencies and start the app:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful Routes

- `/`
- `/terms-of-use`
- `/privacy-policy`

## Quality Checks

```bash
npm run lint
npm run build
```

## Copy Source

The canonical copy source for the app lives in `src/lib/copy.ts`.

`COPY.md` is the product-owner-facing inventory of visible strings, and `AUDIT-REPORT.md` captures the latest mobile-first audit findings and verification notes.
