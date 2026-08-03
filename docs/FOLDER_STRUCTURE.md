# Folder Structure

```text
src/
  app/          App Router routes, layout, route metadata, and states
  components/   Shared UI primitives, layout, and providers
  features/     Isolated feature modules (reserved)
  hooks/        Shared React hooks (reserved)
  lib/          Configuration and small reusable utilities
  services/     External-service adapters (reserved)
  types/        Shared TypeScript types (reserved)
public/         Static public assets
docs/           Project documentation
```

Reserved folders contain `.gitkeep` only until their first real module is introduced. Avoid creating broad shared abstractions until a concrete feature needs them.

`components/layout` owns the global shell and page structure. `components/ui` owns reusable UI primitives. `lib/motion` owns Framer Motion presets, while `lib/config` contains typed site and navigation configuration.
