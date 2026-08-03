# Analytics & Telemetry Architecture Guide

## Overview

KD Arcade implements a pluggable, multi-provider analytics architecture. It supports studio metrics in the developer dashboard (`/cms/analytics`) and in-game telemetry tracking via standard hooks.

## Providers & Adapters

1. **Google Analytics (GA4)**: `GoogleAnalyticsAdapter` (`src/services/analytics/adapters/google-analytics.ts`)
2. **Plausible Analytics**: `PlausibleAdapter` (`src/services/analytics/adapters/plausible.ts`)
3. **PostHog**: `PostHogAdapter` (`src/services/analytics/adapters/posthog.ts`)
4. **Supabase Analytics**: `SupabaseAnalyticsAdapter` (`src/services/analytics/adapters/supabase-analytics.ts`)

## Tracked Metrics

- **Studio Metrics**: Total Visitors, Game Plays, Downloads, Play Time, Retention Rate (Day-7), Platform distribution, Geographic reach, Popular games ranking, Most viewed pages.
- **In-Game Telemetry**: Game sessions, completion rate, deaths, restarts, progress percentage (`useGameTelemetry`).
