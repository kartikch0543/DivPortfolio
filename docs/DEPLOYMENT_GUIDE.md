# Deployment Guide

## Production requirements

Set `NEXT_PUBLIC_SITE_URL` to the deployed canonical URL. Build with `npm run build` and serve with the hosting provider's Next.js runtime or `npm run start`.

## Release checks

Run `npm run lint`, `npm run typecheck`, `npm run format:check`, and `npm run build`. Confirm that `/robots.txt` and `/sitemap.xml` resolve after deployment.

## Hosting

The application is compatible with standard Next.js hosting. Select a host with Node.js support matching the `engines` field in `package.json`.
