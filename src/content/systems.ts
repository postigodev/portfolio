export interface System {
  id: string;
  slug: string;
  title: string;
  problem: string;
  system: string;
  impact: string;
  stack: string[];
  repoUrl?: string;
  detail?: SystemDetail;
}

export interface SystemDetail {
  overview: string;
  problemDetail: string;
  constraints?: string[];
  architecture: string;
  architectureDiagram?: string;
  keyDecisions: { decision: string; reasoning: string }[];
  tradeoffs: { tradeoff: string; reasoning: string }[];
  impactDetail: string[];
  futureWork?: string[];
}

export const systems: System[] = [
  {
    id: "cussien",
    slug: "cussien",
    title: "Cussien Cart Generation System",
    problem:
      "Meal planning and grocery generation are fragmented across recipes, constraints, and manual lists.",
    system:
      "Full-stack planning system that transforms recipes into structured, retailer-aware carts through explicit state transitions.",
    impact:
      "Reusable operational layer separating user intent from purchase-ready outputs.",
    stack: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Prisma"],
    repoUrl: "https://github.com/postigodev/cart-generator",
    detail: {
      overview:
        "Cussien is a planning and cart-generation system designed to turn saved recipes into structured shopping outputs. Instead of behaving like a static recipe app, it models planning as a persistent workflow with explicit intermediate states, allowing user preferences, saved recipes, and downstream retailer logic to interact in a controlled way.",
      problemDetail:
        "Most recipe and grocery tools collapse several distinct problems into one interface: recipe storage, planning, ingredient aggregation, normalization, and shopping execution. That makes the system hard to extend and often leaves users manually reconciling inconsistent recipe formats, duplicated ingredients, and retailer-specific purchase decisions.\n\nThe core challenge was to represent meal planning as an operational system rather than a collection of UI screens.",
      constraints: [
        "User-facing planning state had to remain persistent across sessions",
        "Cart generation needed to stay deterministic and auditable even when AI-assisted transformations were introduced",
        "Retailer integration had to remain modular rather than hard-coded into the planning model",
      ],
      architecture:
        "The system is structured around explicit domain states and a modular backend.\n\n• Recipes act as reusable source objects\n• CartDraft captures editable planning intent\n• Cart represents a structured generated result\n• ShoppingCart serves as the retailer-facing output layer\n\nThe backend is built with NestJS, PostgreSQL, and Prisma. Authenticated users can manage recipes, drafts, and cart resources while provider-aware logic handles downstream matching without collapsing the core planning model into retailer-specific behavior.",
      architectureDiagram: `┌──────────────┐
│   Recipes    │
│ (Saved Base) │
└──────┬───────┘
       ▼
┌──────────────┐
│  CartDraft   │
│ Planning     │
│ Intent       │
└──────┬───────┘
       ▼
┌──────────────┐
│    Cart      │
│ Structured   │
│ Generation   │
└──────┬───────┘
       ▼
┌──────────────┐
│ ShoppingCart │
│ Retailer-    │
│ Aware Output │
└──────────────┘`,
      keyDecisions: [
        {
          decision: "Separated planning state from retailer-facing output",
          reasoning:
            "Prevents shopping-provider logic from contaminating the core planning model and keeps the system extensible",
        },
        {
          decision: "Used explicit state transitions across Recipe → CartDraft → Cart → ShoppingCart",
          reasoning:
            "Makes the workflow easier to reason about, persist, and evolve without mixing user intent with generated outputs",
        },
        {
          decision: "Kept aggregation, matching, and pricing logic deterministic",
          reasoning:
            "Ensures cart generation remains inspectable and reliable even when AI is used for bounded transformations",
        },
      ],
      tradeoffs: [
        {
          tradeoff: "More domain modeling upfront",
          reasoning:
            "The system is more complex than a simple recipe CRUD app, but gains much stronger extensibility and consistency",
        },
        {
          tradeoff: "Retailer support is modular rather than deeply integrated",
          reasoning:
            "This slows down provider-specific optimization in the short term, but avoids overfitting the entire architecture to one retailer",
        },
      ],
      impactDetail: [
        "Replaced ad-hoc recipe planning with a persistent, state-driven workflow",
        "Enabled persistent draft and cart workflows with real authenticated user state",
        "Created a foundation for provider-aware cart generation without collapsing the system into a static shopping list tool",
      ],
      futureWork: [
        "Expand provider integrations beyond the current retailer matching layer",
        "Strengthen cart-generation observability and validation flows",
        "Refine AI-assisted recipe transformation while keeping downstream execution deterministic",
      ],
    },
  },
  {
    id: "deskremote",
    slug: "deskremote",
    title: "DeskRemote",
    problem:
      "Controlling Spotify playback and Fire TV behavior from a desktop environment is fragmented across separate apps, devices, and manual steps.",
    system:
      "Desktop system coordinating Spotify playback, Fire TV commands, and local bindings through a Tauri-based architecture.",
    impact:
      "Unified control surface with persistent config, hotkeys, and cross-device execution.",
    stack: ["Rust", "Tauri", "TypeScript", "ADB", "Spotify API"],
    repoUrl: "https://github.com/postigodev/deskremote",
    detail: {
      overview:
        "DeskRemote is a desktop application for coordinating Spotify playback and Fire TV actions from Windows. Rather than acting as a single-purpose remote, it provides a local execution layer that combines device communication, Spotify auth and playback logic, reusable action bindings, and global hotkeys inside one desktop system.",
      problemDetail:
        "Spotify playback control and Fire TV interaction are usually split across different interfaces: phone apps, TV remotes, desktop Spotify clients, and device-specific setup steps. That fragmentation creates friction for simple repeated actions like launching Spotify on the TV, transferring playback, or triggering common media controls.\n\nThe challenge was not just sending commands, but building a stable desktop system that could coordinate local state, auth flows, device targeting, and reusable actions.",
      constraints: [
        "The system had to run locally on Windows as a desktop app",
        "Fire TV communication depended on ADB over TCP and local network reachability",
        "Spotify auth and playback handling needed to work through desktop-managed OAuth and cached tokens",
      ],
      architecture:
        "DeskRemote is built around a Rust workspace and a Tauri desktop shell.\n\n• Rust core handles configuration, Fire TV communication, Spotify auth and playback logic, and reusable bindings\n• Tauri provides the native desktop shell and command bridge\n• TypeScript frontend provides the local control UI\n• ADB over TCP enables Fire TV connection, wake, launch, and key events\n• Spotify integration handles token caching, device lookup, and playback transfer/toggle logic\n\nBindings, tray actions, and global hotkeys form a reusable execution layer on top of the underlying device commands.",
      architectureDiagram: `┌──────────────┐
│ Desktop UI   │
│ (TypeScript) │
└──────┬───────┘
       ▼
┌──────────────┐
│ Tauri Shell  │
│ Command      │
│ Bridge       │
└──────┬───────┘
       ▼
┌─────────────────────────────┐
│ Rust Core                   │
│ • Config                    │
│ • Bindings                  │
│ • Spotify Logic             │
│ • Fire TV Control           │
└──────┬───────────────┬──────┘
       ▼               ▼
┌──────────────┐   ┌──────────────┐
│ Spotify API  │   │ Fire TV ADB  │
│ OAuth / Conn │   │ over TCP     │
└──────────────┘   └──────────────┘`,
      keyDecisions: [
        {
          decision: "Separated the Rust core from the desktop UI",
          reasoning:
            "Keeps device communication and execution logic isolated from interface concerns and makes the system easier to extend",
        },
        {
          decision: "Introduced reusable bindings, tray actions, and hotkeys",
          reasoning:
            "Turns one-off device commands into a persistent local control layer for repeated actions",
        },
        {
          decision: "Used local token and config caching",
          reasoning:
            "Allows the desktop app to operate as a persistent control surface instead of restarting setup on every run",
        },
      ],
      tradeoffs: [
        {
          tradeoff: "Local desktop architecture instead of a cloud-mediated controller",
          reasoning:
            "Simpler and faster for single-user execution, but tied to the host machine and local environment",
        },
        {
          tradeoff: "ADB-based Fire TV integration",
          reasoning:
            "Provides practical device control, but depends on network setup, debugging permissions, and device-specific behavior",
        },
      ],
      impactDetail: [
        "Unified Spotify playback transfer and Fire TV control inside one desktop system",
        "Reduced repeated multi-step actions into reusable bindings and global shortcuts",
        "Created a local orchestration layer rather than a passive status dashboard or single-purpose remote",
      ],
      futureWork: [
        "Add stronger error handling, diagnostics, and tests",
        "Improve Fire TV app metadata and launcher discovery",
        "Polish editing and management flows around bindings and execution history",
      ],
    },
  },
];