import type { Game } from "@/types/game";

export const games: Game[] = [
  {
    slug: "risky-business",
    title: "Risky Business",
    tagline: "Break. Earn. Upgrade. Gamble. Repeat.",
    description:
      "You are a pirate king stranded on an island, surrounded by crates, machines, and questionable financial decisions. Your only way off: a ship waiting for you — but escaping isn't cheap. Break → Earn → Upgrade → Gamble → Repeat. Do you play it safe, or risk everything?",
    coverImage: "/images/games/risky-business-cover.png",
    bannerImage: "/images/games/risky-business-banner.png",
    gallery: [
      {
        src: "/images/games/risky-business-cover.png",
        alt: "Risky Business Title Screen",
      },
      {
        src: "/images/games/risky-business-banner.png",
        alt: "Risky Business Island Scene",
      },
      {
        src: "/images/games/risky-business-devlog.png",
        alt: "Risky Business Game Jam Devlog",
      },
    ],
    genre: ["Arcade", "Incremental"],
    engine: "Unity",
    platforms: ["Browser"],
    status: "released",
    releaseDate: "2026-09-30",
    estimatedPlaytime: "5–10 min",
    featured: true,
    launch: {
      browser: "/games/risky-business/index.html",
      webgl: null,
      playStore: null,
      steam: null,
      github: null,
    },
    features: [
      "Pirate-themed incremental gameplay loop",
      "Gambling mechanic — you can lose everything",
      "Break, earn, upgrade, and gamble your way to freedom",
      "IIITN Game Jam — Tantrafiesta 2026 submission",
    ],
    controls: [
      "Move: A / D or Arrow Keys",
      "Jump: Space",
      "Interact: E",
    ],
    developerNotes:
      "Risky Business was built for IIITN Game Jam — Tantrafiesta 2026. The biggest plot twist is built into the progression: this isn't an incremental game where progress always moves upward. You can lose it all.",
    developmentStory:
      "The theme of the jam was 'Plot Twist', and in Risky Business the twist is built directly into the gameplay. The coins you've spent time collecting can disappear in seconds if you make the wrong gamble. Break crates, earn coins, upgrade your tools — then decide: play it safe, or bet everything for a faster escape?",
    versionHistory: [
      { version: "1.0.0", date: "2026-09-30", notes: "Initial release — Tantrafiesta 2026 submission." },
      { version: "1.0.1", date: "2026-10-06", notes: "Bug fixes and balance adjustments." },
    ],
    knownIssues: ["Browser audio may require an initial click before playback."],
    roadmap: ["Balance adjustments and additional content planned."],
    credits: [{ role: "Design & development", name: "Divyanshu Kumar" }],
  },
  {
    slug: "split-you",
    title: "Split You",
    tagline: "One move. Two consequences.",
    description:
      "Can you think in two directions at once? Split You is a puzzle-platformer where every move affects both you and your ninja clone simultaneously. A movement that helps one character may hinder the other.",
    coverImage: "/images/games/split-you-cover.png",
    bannerImage: "/images/games/split-you-banner.png",
    gallery: [
      {
        src: "/images/games/split-you-cover.png",
        alt: "Split You key visual and gameplay mechanics",
      },
    ],
    genre: ["Puzzle", "Platformer"],
    engine: "Unity",
    platforms: ["Browser"],
    status: "released",
    releaseDate: "2026-06-01",
    estimatedPlaytime: "20–40 min",
    featured: true,
    launch: {
      browser: "/games/split-you/index.html",
      webgl: null,
      playStore: null,
      steam: null,
      github: null,
    },
    features: [
      "Control two characters simultaneously",
      "16 handcrafted puzzle levels",
      "Mirrored and shared movement mechanics",
      "Pixel-art visuals with progressive difficulty",
    ],
    controls: [
      "Move: A / D or Arrow Keys",
      "Jump: Space",
      "Spawn Clone: C",
      "Interact / Open Door: W or Up Arrow",
      "Reset Level: R",
      "Pause: P",
      "Main Menu: Esc",
    ],
    developerNotes:
      "Split You is a web-first puzzle-platformer built in Unity. The web build is served locally so no external loading is required.",
    developmentStory:
      "Split You challenges you to control two linked characters at the same time and navigate through increasingly difficult levels. The green ninja reaches the green door, the pink ninja reaches the pink door — both must open simultaneously. Think carefully, every move matters.",
    versionHistory: [
      { version: "1.0.0", date: "2026-06-01", notes: "Initial release." },
    ],
    knownIssues: ["Browser audio may require an initial click before playback."],
    roadmap: ["Additional level packs planned."],
    credits: [{ role: "Design & development", name: "Divyanshu Kumar" }],
  },
  {
    slug: "tiny-together",
    title: "Tiny Together",
    tagline: "Two characters. One keyboard. Shared controls.",
    description:
      "In Tiny Together, you control two tiny adventurers at the same time — one walks on the ground, the other on the ceiling. Every move you make affects both of them, so reaching each character's door takes planning, timing, and creative thinking.",
    coverImage: "/images/games/tiny-together-cover.png",
    bannerImage: "/images/games/tiny-together-banner.png",
    gallery: [
      {
        src: "/images/games/tiny-together-cover.png",
        alt: "Tiny Together cover",
      },
      {
        src: "/images/games/tiny-together-devplan.png",
        alt: "Tiny Together Dev Plan & Architecture",
      },
    ],
    genre: ["Puzzle", "Platformer"],
    engine: "Unity",
    platforms: ["Browser"],
    status: "released",
    releaseDate: "2026-07-14",
    estimatedPlaytime: "15–25 min",
    featured: true,
    launch: {
      browser: "/games/tiny-together/index.html",
      webgl: null,
      playStore: null,
      steam: null,
      github: null,
    },
    features: [
      "Dual-character shared controls (ground + ceiling)",
      "Handcrafted puzzle levels",
      "Simple to learn, tricky to master",
      "Game Jam submission — The Brainless Game Jam (Top 10)",
    ],
    controls: [
      "Move: A / D or ← / →",
      "Jump: Space",
      "Open Door: W (when both at their doors)",
      "Restart Level: R",
      "Pause: P",
      "Main Menu: Esc",
    ],
    developerNotes:
      "Tiny Together was built for the Brainless Game Jam. The web build runs directly in your browser without any external dependencies.",
    developmentStory:
      "Two characters. One keyboard. Shared controls. Double the brainpower. Can you guide them through every level without leaving either behind? Lead both characters to their respective doors and open them at the same time. Simple to learn, surprisingly tricky to master.",
    versionHistory: [
      { version: "1.0.0", date: "2026-07-14", notes: "Initial release — Brainless Game Jam submission." },
    ],
    knownIssues: ["Browser audio may require an initial click before playback."],
    roadmap: ["Difficulty curve improvements planned post-jam."],
    credits: [{ role: "Design & development", name: "Divyanshu Kumar" }],
  },
  {
    slug: "ulta-he-krega",
    title: "Ulta He Karega",
    tagline: "In Desi Chaos, even logic goes ULTA.",
    description:
      "Ulta He Krega is a chaotic, brain-twisting puzzle experience inspired by Indian moms vs rebellious kids. You control both the Mother and the Child — but the rebellious child ALWAYS moves in the opposite direction (ULTA)!",
    coverImage: "/images/games/ulta-he-krega-cover.png",
    bannerImage: "/images/games/ulta-he-krega-banner.png",
    gallery: [
      {
        src: "/images/games/ulta-he-krega-cover.png",
        alt: "Ulta He Karega Key Visual",
      },
      {
        src: "/images/games/ulta-he-krega-gameplay.png",
        alt: "Ulta He Karega Level 1 Mechanics",
      },
    ],
    genre: ["Puzzle", "Platformer"],
    engine: "Unity",
    platforms: ["Browser"],
    status: "released",
    releaseDate: "2026-04-12",
    estimatedPlaytime: "4–5 min",
    featured: true,
    launch: {
      browser: "/games/ulta-he-krega/index.html",
      webgl: null,
      playStore: null,
      steam: null,
      github: null,
    },
    features: [
      "Opposite-movement mechanic — child always goes ULTA",
      "Desi chaos theme inspired by Indian family dynamics",
      "Short and snappy — done in 4–5 minutes",
      "LPU Gaming Masters Game Jam submission — Rank #2 Solo Developer",
    ],
    controls: [
      "Move: WASD / Arrow Keys",
      "Toggle Child: C",
      "Open Door: W / Up Arrow",
      "Jump: Space",
      "Reset Level: R",
      "Menu: Esc",
    ],
    developerNotes:
      "Created for the LPU Game Masters Game Jam 2026. The web build runs directly in your browser — no downloads needed.",
    developmentStory:
      "On paper it sounds simple — control both Mother and Child to reach their doors. But the rebellious child ALWAYS moves in the opposite direction. What starts as simple turns into controlled DESI CHAOS very quickly. To complete a level: the Mother must reach the red door, the Child must reach the yellow door, and both doors must be activated at the same time.",
    versionHistory: [
      { version: "1.0.0", date: "2026-04-12", notes: "Initial release — LPU Gaming Masters submission." },
    ],
    knownIssues: ["Some embedded-browser environments may require a refresh after fullscreen."],
    roadmap: ["YouTube walkthrough planned post-jam."],
    credits: [
      { role: "Design & development", name: "Divyanshu Kumar" },
      { role: "Main Art", name: "Pixel Frog (Pixel Adventure 1)" },
      { role: "UI & Doors Art", name: "Pixel Frog (Kings and Pigs)" },
    ],
  },
];

export const featuredGames = games.filter((game) => game.featured);
export const getGameBySlug = (slug: string) => games.find((game) => game.slug === slug);
