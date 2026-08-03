# KD Arcade

KD Arcade is a Next.js 15 foundation for an independent game studio. Phase 2 provides the reusable visual language, navigation, layout primitives, theme controls, and accessible UI components; it intentionally does not include homepage content or game pages.

## Quick start

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run format:check
npm run build
```

See [the development guide](docs/DEVELOPMENT_GUIDE.md) and [architecture overview](docs/ARCHITECTURE.md) for project conventions.

## Design system

The default theme is dark and can be switched to light from the navigation. The token system, typography, responsive rules, and component usage are documented in [the design system guide](docs/DESIGN_SYSTEM.md).
