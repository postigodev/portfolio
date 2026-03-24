import type { GitHubRepo } from "@/hooks/use-github-repos";

export const fallbackRepos: GitHubRepo[] = [
  {
    id: 1,
    name: "deskremote",
    description:
      "Desktop control system coordinating Spotify playback and Fire TV devices.",
    html_url: "https://github.com/postigodev/deskremote",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["tauri", "typescript", "adb", "spotify"],
    fork: false,
    displayDescription:
      "Desktop control system coordinating Spotify playback and Fire TV devices through a unified local interface.",
    displayTopics: ["tauri", "typescript", "adb", "spotify"],
    displayOrder: 1,
    hidden: false,
  },
  {
    id: 2,
    name: "cart-generator",
    description:
      "Stateful planning system for turning saved recipes into structured shopping carts.",
    html_url: "https://github.com/postigodev/cart-generator",
    homepage: null,
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["nestjs", "postgresql", "planning", "systems"],
    fork: false,
    displayDescription:
      "Stateful planning system that transforms saved recipes into structured, retailer-aware shopping carts.",
    displayTopics: ["nestjs", "postgresql", "planning", "systems"],
    displayOrder: 2,
    hidden: false,
  },
];
