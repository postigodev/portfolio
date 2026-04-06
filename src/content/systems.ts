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
        "The system is structured around explicit domain states and a modular backend.\n\n- Recipes act as reusable source objects\n- CartDraft captures editable planning intent\n- Cart represents a structured generated result\n- ShoppingCart serves as the retailer-facing output layer\n\nThe backend is built with NestJS, PostgreSQL, and Prisma. Authenticated users can manage recipes, drafts, and cart resources while provider-aware logic handles downstream matching without collapsing the core planning model into retailer-specific behavior.",
      architectureDiagram: `+----------------+
|    Recipes     |
|  saved base    |
+-------+--------+
        |
        v
+----------------+
|   CartDraft    |
| planning state |
+-------+--------+
        |
        v
+----------------+
|      Cart      |
| structured gen |
+-------+--------+
        |
        v
+----------------+
|  ShoppingCart  |
| retailer layer |
+----------------+`,
      keyDecisions: [
        {
          decision: "Separated planning state from retailer-facing output",
          reasoning:
            "Prevents shopping-provider logic from contaminating the core planning model and keeps the system extensible",
        },
        {
          decision:
            "Used explicit state transitions across Recipe -> CartDraft -> Cart -> ShoppingCart",
          reasoning:
            "Makes the workflow easier to reason about, persist, and evolve without mixing user intent with generated outputs",
        },
        {
          decision:
            "Kept aggregation, matching, and pricing logic deterministic",
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
    id: "sendo",
    slug: "sendo",
    title: "Sendo",
    problem:
      "Desktop control of Spotify playback and Fire TV behavior is usually split across unrelated interfaces, with no reliable way to coordinate playback routing, device state, and repeated control flows from one place.",
    system:
      "Local desktop orchestration system for Spotify Connect playback, Fire TV control, and reusable user-defined execution flows.",
    impact:
      "Reduced a multi-step, failure-prone media workflow (wake TV → launch app → connect → transfer playback) into a single deterministic execution layer with explicit device targeting, persistent state, and reusable execution flows.",
    stack: ["Rust", "Tauri", "TypeScript", "ADB", "Spotify API"],
    repoUrl: "https://github.com/postigodev/deskremote",
    detail: {
      overview:
        "Sendo is a Windows desktop orchestration tool for controlling Spotify playback and Fire TV behavior from one local system. The project is built around a simple user goal, but the implementation problem is deeper: it has to bridge two different control domains with different state models, failure modes, and device identity rules. Instead of acting like a passive dashboard or a thin remote wrapper, Sendo provides a local execution layer that coordinates device communication, Spotify auth and playback logic, reusable bindings, tray actions, startup behavior, and global hotkeys inside one desktop application.",
      problemDetail:
        "Spotify playback control and Fire TV interaction are normally distributed across different surfaces: phone apps, TV remotes, desktop Spotify clients, and manual setup steps. This makes common workflows like waking the TV, launching Spotify, and transferring playback unnecessarily fragile.\n\nThe core challenge was not sending commands, but maintaining a consistent system state across two independently evolving domains:\n- Spotify Connect state (remote, eventually consistent, account-scoped)\n- Fire TV state (local, device-scoped, network-dependent)\n\nThese systems can diverge at any time, creating mismatches between UI state, actual playback, and target device identity. The system therefore needed to actively reconcile external state, handle partial failures such as auth, network, and device reachability issues, and prevent ambiguous playback routing.",
      constraints: [
        "The system had to run locally on Windows as a desktop app",
        "Fire TV communication depended on ADB over TCP and local network reachability",
        "Spotify auth and playback handling needed to work through desktop-managed OAuth, cached tokens, and explicit target-device selection",
      ],
      architecture:
        "Sendo is built around a Rust workspace and a Tauri desktop shell.\n\n- Rust core owns the execution layer: configuration, Fire TV communication, Spotify auth, playback transfer, target resolution, bindings, and persistent local state\n- Tauri provides the native desktop shell, tray integration, startup behavior, notifications, and the command bridge between UI and execution logic\n- TypeScript frontend provides the local control UI and view state, while implementing controlled polling to reconcile external playback state with UI state without introducing instability or excessive requests\n- ADB over TCP enables Fire TV connection, wake, launch, remote navigation, media keys, and app scanning\n- Spotify integration handles token caching, device lookup, explicit playback targeting, playback transfer, and transport control\n\nBindings, tray actions, and global hotkeys form a reusable execution layer on top of the lower-level device commands, which makes the system useful beyond the primary UI surfaces.",
      architectureDiagram: `+------------------+
|   Desktop UI     |
|   TypeScript     |
+---------+--------+
          |
          v
+---------+--------+
|    Tauri Shell   |
| tray + bridge    |
+---------+--------+
          |
          v
+-------------------------------+
|           Rust Core           |
| config | bindings | Spotify   |
| Fire TV control | execution   |
+-----------+-------------------+
            |
      +-----+-----+
      |           |
      v           v
+-------------+ +-------------+
| Spotify API | | Fire TV ADB |
| OAuth/ctrl  | | over TCP    |
+-------------+ +-------------+`,
      keyDecisions: [
        {
          decision: "Separated the Rust execution core from the desktop UI",
          reasoning:
            "Keeps device communication, orchestration, and side-effect-heavy logic isolated from rendering concerns, which makes the system easier to evolve and easier to debug under real device failures",
        },
        {
          decision:
            "Introduced reusable bindings, tray actions, startup behavior, and global hotkeys as first-class execution surfaces",
          reasoning:
            "Turns repeated multi-step media and device actions into persistent local workflows instead of forcing all control through a single UI page",
        },
        {
          decision:
            "Made Spotify playback targeting explicit by persisting a selected Spotify device ID",
          reasoning:
            "Prevents ambiguous routing when multiple TVs or Spotify Connect devices exist on the same account and keeps playback controls aligned with the device shown in the UI",
        },
        {
          decision:
            "Handled playback state synchronization via controlled polling instead of event-driven updates",
          reasoning:
            "Spotify and Fire TV do not expose reliable push-based state updates, requiring the system to actively reconcile UI state with external device state while avoiding stale UI, race conditions, or excessive polling overhead",
        },
      ],
      tradeoffs: [
        {
          tradeoff:
            "Local desktop orchestration instead of a cloud-mediated controller",
          reasoning:
            "Gives fast, direct control and simpler ownership for a single user, but ties the system to the host machine, local environment, and installed dependencies such as ADB",
        },
        {
          tradeoff: "ADB-based Fire TV integration",
          reasoning:
            "Provides practical low-level device control without platform-specific TV SDK work, but introduces real-world constraints around network reachability, debugging permissions, and device-specific timing behavior",
        },
      ],
      impactDetail: [
        "Unified Spotify Connect routing and Fire TV control into a single deterministic execution layer with explicit device targeting and readiness handling",
        "Reduced repeated multi-step media workflows into persistent bindings, tray actions, and global shortcuts",
        "Built a local orchestration layer with explicit recovery behavior and target selection instead of a passive status dashboard or one-off remote app",
      ],
      futureWork: [
        "Add stronger diagnostics, tests, and release hardening around external device failures",
        "Improve Fire TV app metadata and launcher discovery",
        "Expand execution history, recovery UX, and advanced device-management workflows",
        "Generalize device control layer to support multiple TV platforms beyond Fire TV (e.g., Android TV, WebOS), abstracting transport and command interfaces",
      ],
    },
  },
];
