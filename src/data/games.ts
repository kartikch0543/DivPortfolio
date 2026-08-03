import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    slug: "tiny-together",
    title: "Tiny Together",
    tagline: "Small creatures. One big adventure.",
    description:
      "A compact cooperative adventure built around curiosity, movement, and the joy of figuring things out together.",
    coverImage: "/images/games/tiny-together-cover.svg",
    bannerImage: "/images/games/tiny-together-banner.svg",
    gallery: [
      {
        src: "/images/games/tiny-together-cover.svg",
        alt: "Tiny Together placeholder game scene",
      },
    ],
    genre: ["Adventure", "Co-op"],
    engine: "Unity",
    platforms: ["Browser", "Windows"],
    status: "released",
    releaseDate: "2025-01-18",
    estimatedPlaytime: "15–25 min",
    featured: true,
    launch: {
      browser: "https://kdivyanshu.itch.io/tiny-together",
      webgl: null,
      playStore: null,
      steam: null,
      github: null,
    },
    features: [
      "Designed for shared discovery",
      "Compact replayable sessions",
      "Handcrafted puzzle spaces",
    ],
    controls: ["Move: WASD or arrow keys", "Interact: E or space", "Pause: Escape"],
    developerNotes:
      "Tiny Together is currently distributed through itch.io. The browser target is deliberately separate from future WebGL, mobile, Steam, and source targets.",
    developmentStory:
      "The project began as an experiment in making cooperation feel natural without over-explaining the rules.",
    versionHistory: [
      { version: "1.0.0", date: "2025-01-18", notes: "Initial itch.io release." },
    ],
    knownIssues: ["Browser audio may require an initial click before playback."],
    roadmap: [
      "Evaluate a self-hosted WebGL build.",
      "Explore additional accessibility options.",
    ],
    credits: [{ role: "Design & development", name: "Divyanshu Kumar" }],
  },
  {
    slug: "ulta-he-krega",
    title: "Ulta He Krega",
    tagline: "Expect the unexpected.",
    description:
      "A playful arcade experience where every confident plan has an entertaining way of turning upside down.",
    coverImage: "/images/games/ulta-he-krega-cover.svg",
    bannerImage: "/images/games/ulta-he-krega-banner.svg",
    gallery: [
      {
        src: "/images/games/ulta-he-krega-cover.svg",
        alt: "Ulta He Krega placeholder game scene",
      },
    ],
    genre: ["Arcade", "Comedy"],
    engine: "Unity",
    platforms: ["Browser"],
    status: "released",
    releaseDate: "2025-04-12",
    estimatedPlaytime: "10–20 min",
    featured: true,
    launch: {
      browser: "https://kdivyanshu.itch.io/ulta-he-krega",
      webgl: null,
      playStore: null,
      steam: null,
      github: null,
    },
    features: [
      "Arcade-first pacing",
      "Surprises at every turn",
      "Built for quick sessions",
    ],
    controls: ["Move: WASD or arrow keys", "Action: Space", "Pause: Escape"],
    developerNotes:
      "The itch.io launch is the active release target. Additional launch destinations can be enabled in data without changing the page model.",
    developmentStory:
      "Ulta He Krega grew from a simple question: what happens when the expected answer is always the funniest wrong one?",
    versionHistory: [
      { version: "1.0.0", date: "2025-04-12", notes: "Initial itch.io release." },
    ],
    knownIssues: [
      "Some embedded-browser environments may require a refresh after returning from fullscreen.",
    ],
    roadmap: [
      "Add a self-hosted browser build when available.",
      "Consider Android distribution.",
    ],
    credits: [{ role: "Design & development", name: "Divyanshu Kumar" }],
  },
];

export const featuredGames = games.filter((game) => game.featured);
export const getGameBySlug = (slug: string) => games.find((game) => game.slug === slug);
