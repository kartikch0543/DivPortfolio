# Development Guide

## Prerequisites

Use Node.js 20.9 or newer and npm. Copy `.env.example` to `.env.local` before local development if a non-default site URL is needed.

## Commands

- `npm run dev`: start the development server.
- `npm run lint`: run ESLint.
- `npm run typecheck`: run strict TypeScript checking.
- `npm run format:check`: verify formatting.
- `npm run build`: create a production build.

## Environment variables

`NEXT_PUBLIC_SITE_URL` is the canonical public URL used for metadata, robots, and the sitemap. It must be a complete URL without a trailing-path requirement.
