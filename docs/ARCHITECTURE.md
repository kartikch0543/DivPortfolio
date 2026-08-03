# Architecture

## Approach

The project uses Next.js App Router with a Clean Architecture-inspired dependency direction: route code composes features, features consume application services, and shared utilities remain framework-light.

## Layers

- `src/app`: routes, metadata files, layouts, and route-level states.
- `src/features`: future vertical slices containing feature UI and use cases.
- `src/services`: adapters for APIs, persistence, or external platforms.
- `src/lib`: shared configuration and framework-independent utilities.
- `src/components`: reusable presentation and provider components.
- `src/components/layout`: site-wide layout, navigation, branding, and section primitives.
- `src/components/ui`: shadcn-compatible UI primitives built on accessible Radix foundations where needed.
- `src/types`: shared domain and integration types.

Dependencies must point inward. Shared code must not import from a feature or route.

## Design foundation

The root layout composes the theme provider, global navigation, page content, and footer. Only components requiring browser state or interaction are client components: the theme toggle, responsive navigation, search form, dialog, and tooltip primitives. Layout components and most UI primitives remain server-compatible.

Visual tokens live in `src/app/globals.css`; motion presets live in `src/lib/motion`. This keeps visual decisions centralized while allowing future features to consume stable primitives.

## Content architecture

`src/data` holds typed game and studio content. The games feature reads that data through the `Game` model and `LaunchTargets` union, so pages and reusable cards do not embed title, URL, or platform data. Dynamic game pages are statically generated from the same source.
