# Production Checklist

- Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS URL.
- Confirm game launch URLs point to the intended itch.io release pages.
- Run `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.
- Deploy through Vercel or another Node-compatible Next.js host.
- Verify `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest` after deployment.
- Check the generated metadata and JSON-LD with production URLs.
- Review `npm audit` findings before every release; do not use forceful audit fixes without a dependency review.
