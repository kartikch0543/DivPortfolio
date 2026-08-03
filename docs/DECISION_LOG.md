# Decision Log

| Date       | Decision                                      | Rationale                                                                                            |
| ---------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 2026-08-03 | Use Next.js App Router                        | It provides first-class metadata routes, layouts, loading, and error boundaries.                     |
| 2026-08-03 | Use Tailwind CSS v4 with shadcn configuration | It provides a token-ready styling base and a consistent route for future UI primitives.              |
| 2026-08-03 | Use `next-themes` class strategy              | It supports persisted system-aware dark mode without coupling feature code to theme mechanics.       |
| 2026-08-03 | Reserve feature and service folders           | It keeps Phase 1 lean while establishing clear extension points.                                     |
| 2026-08-03 | Brand the shared foundation as KD Arcade      | A replaceable logo component and SVG favicon establish the studio identity without locked-in assets. |
| 2026-08-03 | Default to a token-based dark theme           | Dark surfaces fit the studio direction while CSS variables preserve a complete light-theme path.     |
| 2026-08-03 | Pair Inter with Pixelify Sans                 | The pairing gives display moments a pixel character without sacrificing interface readability.       |
| 2026-08-03 | Use Radix for dialog and tooltip foundations  | Accessible interaction behavior is delegated to focused, well-tested primitives.                     |
| 2026-08-03 | Keep motion presets in `lib/motion`           | Features can share subtle, reduced-motion-aware transitions without duplicating timing decisions.    |
