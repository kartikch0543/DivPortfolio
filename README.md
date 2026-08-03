# KD Arcade - Indie Game Publishing Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## Overview

**KD Arcade** is a high-performance, scalable indie game publishing platform created by Divyanshu Kumar. Designed with Clean Architecture and strict TypeScript, KD Arcade connects players with HTML5/WebGL browser games, native multi-platform desktop/mobile downloads, developer devlogs, community reviews, and developer CMS tools.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 + Vanilla CSS + Pixel-Art Theme System
- **State & Logic**: Clean Architecture (Services, Adapters, Hooks, Repositories)
- **Forms & Validation**: `react-hook-form` + `zod`
- **Testing**: Vitest + React Testing Library + Playwright E2E
- **CI/CD & Hosting**: GitHub Actions + Vercel Deployment

---

## Repository Structure

```text
/
├── .github/              # GitHub Actions CI/CD workflows, templates, CODEOWNERS
├── docs/                 # Documentation guides (CMS, Auth, Community, Analytics, Publishing)
├── public/               # Static assets (images, icons, games, videos, logos)
├── scripts/              # Pre-deployment verification scripts
├── src/
│   ├── app/              # Next.js App Router pages and API route handlers
│   ├── components/       # Core design system & layout components
│   ├── config/           # Site metadata and global config
│   ├── data/             # Static game data & repositories
│   ├── features/         # Feature modules (CMS, Community, Analytics, Publishing)
│   ├── hooks/            # Reusable custom React hooks
│   ├── lib/              # Utility abstractions and Zod validation schemas
│   ├── services/         # Data services and external provider adapters
│   ├── types/            # TypeScript domain interfaces and types
│   └── utils/            # Helper utilities and class generators
├── tests/                # Vitest unit and integration test suites
├── .env.example          # Environment variables documentation
├── next.config.ts        # Next.js production configuration
├── package.json          # Dependency manifest
├── PROJECT_SPEC.md       # Primary project specification
└── README.md             # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js `^20.9.0` or higher
- npm `^10.0.0` or higher

### Installation

```bash
git clone https://github.com/kdivyanshu/DivPortfolio.git
cd DivPortfolio
npm install
```

### Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Development Server

Run local dev server on `http://localhost:3000`:

```bash
npm run dev
```

---

## Production Build & Verification Commands

Execute full verification suite prior to deployment:

```bash
# 1. ESLint check
npm run lint

# 2. TypeScript typecheck
npm run typecheck

# 3. Vitest unit tests
npm test

# 4. Next.js production build
npm run build
```

---

## Vercel Deployment Guide

This repository is optimized for direct, automated deployment on **Vercel**:

1. Push your changes to GitHub (`main` branch).
2. Connect your repository to **Vercel**.
3. Vercel automatically detects Next.js (App Router) with zero custom configuration needed.
4. Add environment variables specified in `.env.example` inside Vercel Dashboard Settings.
5. Deployments will automatically compile static pages and serverless functions cleanly.

---

## Future Roadmap

- [x] **Phase 1**: Developer CMS & Content Management
- [x] **Phase 2**: Authentication & Role-Based Access Control
- [x] **Phase 3**: Community Platform & Threaded Discussions
- [x] **Phase 4**: Plausible / GA4 / PostHog Analytics Adapters
- [x] **Phase 5**: Multi-Platform Publishing & WebGL Player Launcher
- [ ] **Phase 6**: Supabase Realtime Backend Integration & WebSockets
- [ ] **Phase 7**: Cloud Game Save Synchronization
- [ ] **Phase 8**: Global Leaderboards & Competitive Seasons

---

## License

Created by Divyanshu Kumar. Distributed under the MIT License.
