# Authentication Architecture Guide

## Overview

KD Arcade implements a robust authentication and authorization system supporting Supabase Auth, OAuth providers (Google, GitHub, and Discord), role-based access control (RBAC), protected routes, middleware, and cloud save synchronization.

## Roles & Permissions

- **Guest**: Unauthenticated visitor. Can view games, devlogs, home pages.
- **Player**: Authenticated user. Can favorite games, maintain play history, store cloud saves, and submit comments/reviews.
- **Developer**: Creator role. Can access the Developer CMS (`/cms`), manage game listings, release notes, and view telemetry.
- **Admin**: Full studio administration. Can manage site settings, global developer profiles, and moderate content.

## Architecture

- **Auth Service (`src/services/auth/auth-service.ts`)**: Encapsulates session handling, email authentication, and OAuth login workflows.
- **Cloud Save Adapter (`src/services/cloud-saves/cloud-save-service.ts`)**: Manages game progress serialization and checksum verification.
- **Middleware (`src/middleware.ts`)**: Restricts route access for `/cms` and `/profile` routes based on user role and session state.
