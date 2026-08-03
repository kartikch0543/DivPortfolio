# Game Integration Guide

Game content lives in typed data modules rather than page components. Every game uses a multi-target launch model so present-day itch.io releases and future delivery channels coexist:

```ts
launch: {
  browser: "https://…", // itch.io or another external browser release
  webgl: null,          // self-hosted build, embedded when available
  playStore: null,
  steam: null,
  github: null,
}
```

The browser player prefers an embedded WebGL target when available and otherwise presents the external browser launch. Adding a new platform is a data change, not a route redesign.

Before integration, define performance budgets, keyboard controls, reduced-motion behavior, save-state requirements, and a fallback experience for unsupported devices.
