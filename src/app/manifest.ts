import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KD Arcade",
    short_name: "KD Arcade",
    description: "Independent games from KD Arcade.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c14",
    theme_color: "#0c0c14",
    icons: [{ src: "/favicon.svg", sizes: "64x64", type: "image/svg+xml" }],
  };
}
