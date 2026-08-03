# KD Arcade Design System

## Direction

KD Arcade combines the friendly immediacy of browser game portals with the restraint of premium game storefronts. The result is pixel-informed, not retro-replicated: rich dark surfaces, luminous accents, compact arcade display type, and calm motion.

## Tokens

Tokens are CSS custom properties in `src/app/globals.css` and are mapped into Tailwind v4 semantic utilities.

| Token group | System                                                                                                                       |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Color       | Background, surface, muted, border, primary violet, secondary lime, accent pink, and semantic success/warning/danger values. |
| Typography  | Inter is the interface/body font; Pixelify Sans is reserved for brand and display moments.                                   |
| Spacing     | A 4px-derived scale from `--space-1` through `--space-16`; responsive sections use 48/64/96px vertical rhythm.               |
| Radius      | `sm` 8px, `md` 12px, `lg` 16px, `xl` 24px.                                                                                   |
| Shadows     | Three low-contrast elevation levels, optimized for the dark default theme.                                                   |
| Breakpoints | `sm` 640px, `md` 768px, `lg` 1024px, and `xl` 1280px.                                                                        |
| Layers      | Base 0, sticky header/overlay 50, modal 60, tooltip 70.                                                                      |

## Themes

Dark is the default. Both `.dark` and light-root tokens are fully defined, and `next-themes` persists a user-selected theme. The theme toggle has an accessible label and avoids hydration mismatch by rendering only after mount.

## Components

Use components from `@/components/ui` before creating local equivalents. Components use semantic colors rather than literal color values. Buttons, cards, badges, inputs, skeletons, spinners, dialog/modal primitives, tooltips, and search bars are reusable foundations.

`Container`, `Section`, `PageHeader`, and `SectionHeading` provide the page rhythm. `SiteHeader` and `SiteFooter` are global shell components, not page content.

## Motion

`@/lib/motion/presets` provides fade, slide, scale, stagger, hover, and page transition defaults. Motion is intentionally limited to interaction and entrance context. All global transitions honor `prefers-reduced-motion`.

## Accessibility

Keyboard focus uses a visible ring. Radix handles dialog focus management and tooltip semantics. Navigation uses semantic landmarks, mobile-menu state is exposed with ARIA attributes, and icon-only controls have accessible labels.
