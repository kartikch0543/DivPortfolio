# Developer CMS Guide

## Overview

The KD Arcade Developer CMS (`/cms`) provides a scalable dashboard for studio creators to manage games, publication workflows, devlogs with MDX preview, media assets, roadmaps, and releases.

## Features

1. **Dashboard Overview (`/cms`)**: Key performance indicators (Total Games, Published vs. Draft count, Devlogs count, Releases), quick actions, and recent activities.
2. **Game Manager (`/cms/games`)**: Full CRUD support for games with status workflow (`Draft`, `Published`, `Archived`), categories, tags, technologies, and launch targets.
3. **Media Library (`/cms/media`)**: Asset management for game cover images, banners, screenshots, and promotional video trailers.
4. **Devlog Manager (`/cms/devlog`)**: MDX & Markdown editor with live preview side-by-side tab and background autosave via `useAutosave`.
5. **Roadmap & Release Manager (`/cms/roadmap`)**: Track future milestones, version history, platform releases, and release notes.
6. **Site & Profile Settings (`/cms/settings`, `/cms/profile`)**: Customize studio identity, canonical URLs, social channels, developer bio, and roles.

## Architecture & Extensibility

- **Forms & Validation**: Built on `react-hook-form` and `zod` schema validation (`src/lib/validations/`).
- **Clean Service Layer**: `CmsService` (`src/services/cms-service.ts`) abstracts data storage. It operates in-memory with local persistence out of the box and is ready to swap to Supabase client adapters without UI component changes.
