export interface System {
  id: string;
  slug: string;
  title: string;
  category: string;
  hook: string;
  problem: string;
  system: string;
  impact: string;
  stack: string[];
  displayStack?: string[];
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
  modelDetail?: string;
  backendDetail?: string;
  futureWork?: string[];
}
export const systems: System[] = [
  {
    id: "sendo",
    slug: "sendo",
    title: "Sendo",
    category: "Desktop orchestration",
    hook:
      "Local execution layer for Spotify Connect + Fire TV, with explicit device targeting, reusable control flows, and recovery-aware state handling.",
    problem:
      "Spotify playback and Fire TV control are split across separate interfaces, leaving common actions like wake, launch, connect, and transfer playback fragile and repetitive.",
    system:
      "Windows desktop orchestration system that coordinates Spotify Connect playback, Fire TV control, and reusable user-defined execution flows through a local Rust/Tauri stack.",
    impact:
      "Collapsed a brittle multi-step media workflow into a single deterministic control layer with explicit targeting, persistent state, reusable bindings, and recovery-aware execution.",
    stack: ["Rust", "Tauri", "TypeScript", "ADB", "Spotify API"],
    displayStack: ["Rust", "Tauri", "TypeScript", "ADB", "Spotify API"],
    repoUrl: "https://github.com/postigodev/sendo",
    detail: {
      overview:
        "Sendo is a Windows desktop orchestration tool for controlling Spotify playback and Fire TV behavior from one local system. The real problem is not just remote control, but coordinating two different stateful systems with different identities, transports, and failure modes. Instead of acting like a passive dashboard, Sendo provides a local execution layer that coordinates device communication, Spotify auth, playback transfer, persistent bindings, tray actions, startup behavior, and global hotkeys inside one desktop application.",
      problemDetail:
        "Spotify playback and Fire TV interaction are normally spread across phone apps, TV remotes, desktop Spotify clients, and manual setup steps. Common workflows like waking the TV, launching Spotify, and transferring playback are therefore brittle, repetitive, and easy to break.\n\nThe core challenge was not sending commands, but keeping state coherent across two independently evolving domains:\n- Spotify Connect state, which is remote, account-scoped, and eventually consistent\n- Fire TV state, which is local, device-scoped, and network-dependent\n\nThese domains can diverge at any time. The system therefore needed to reconcile external state, survive auth and reachability failures, and prevent ambiguous playback routing.",
      constraints: [
        "The system had to run locally on Windows as a desktop app",
        "Fire TV communication depended on ADB over TCP and local network reachability",
        "Spotify auth and playback needed to work through desktop-managed OAuth, cached tokens, and explicit target-device selection"
      ],
      architecture:
        "Sendo is structured around a Rust execution core and a Tauri desktop shell.\n\n- Rust owns the execution layer: configuration, Fire TV communication, Spotify auth, playback transfer, target resolution, bindings, and persistent local state\n- Tauri provides the desktop shell, tray integration, startup behavior, notifications, and the command bridge between UI and execution logic\n- The TypeScript frontend provides the local control UI and view state while using controlled polling to reconcile external playback state with UI state\n- ADB over TCP enables Fire TV wake, launch, navigation, media keys, and app scanning\n- Spotify integration handles token caching, device lookup, playback targeting, transfer, and transport control\n\nBindings, tray actions, and hotkeys form a reusable execution layer on top of the lower-level device commands, making the system useful beyond a single page UI.",
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
            "Device communication, orchestration, and side-effect-heavy logic remain isolated from rendering concerns, which makes the system easier to evolve and easier to debug under real device failures."
        },
        {
          decision:
            "Introduced bindings, tray actions, startup behavior, and global hotkeys as first-class execution surfaces",
          reasoning:
            "Repeated multi-step actions become persistent local workflows instead of manual UI sequences."
        },
        {
          decision:
            "Made Spotify playback targeting explicit by persisting a selected device ID",
          reasoning:
            "This prevents ambiguous routing when multiple Spotify Connect devices exist and keeps UI state aligned with the real target."
        },
        {
          decision:
            "Handled playback synchronization through controlled polling instead of event-driven updates",
          reasoning:
            "Spotify and Fire TV do not expose reliable push-based state updates, so the system must actively reconcile external state without introducing stale UI or excessive polling."
        }
      ],
      tradeoffs: [
        {
          tradeoff: "Local desktop orchestration instead of a cloud-mediated controller",
          reasoning:
            "This gives fast direct control and simple ownership for a single user, but ties the system to the host machine, local environment, and installed dependencies such as ADB."
        },
        {
          tradeoff: "ADB-based Fire TV integration",
          reasoning:
            "ADB provides practical low-level device control without TV-specific SDK work, but introduces real constraints around network reachability, permissions, and device-specific timing."
        }
      ],
      impactDetail: [
        "Unified Spotify Connect routing and Fire TV control into a single deterministic execution layer",
        "Reduced repeated multi-step media workflows into persistent bindings, tray actions, and global shortcuts",
        "Built explicit recovery and target-selection behavior instead of a passive dashboard or one-off remote app"
      ],
      futureWork: [
        "Add stronger diagnostics, tests, and release hardening around external device failures",
        "Improve Fire TV app metadata and launcher discovery",
        "Expand execution history, recovery UX, and advanced device-management workflows",
        "Generalize device control to support multiple TV platforms beyond Fire TV"
      ]
    }
  },
  {
    id: "urbanlens",
    slug: "urbanlens",
    title: "UrbanLens",
    category: "Thermal investigation",
    hook:
      "Locality analysis pipeline that turns a map capture into thermal evidence, classified hotspots, ranked interventions, and grounded follow-up reasoning.",
    problem:
      "Urban heat tools can show that a place is hot, but they rarely explain what is driving the heat, what matters most, or what should be inspected first.",
    system:
      "Urban heat investigation system that combines Google Maps capture, thermal generation, hotspot classification, deterministic ranking, and agent-grounded follow-up analysis.",
    impact:
      "Built a full map-capture-to-analysis pipeline that turns a selected real-world locality into thermal evidence, classified hotspot surfaces, ranked intervention candidates, and stored analysis artifacts for grounded Q&A.",
    stack: [
      "Python",
      "FastAPI",
      "Pydantic",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Google Maps API",
      "Anthropic",
      "Gemini",
      "Featherless",
      "ElevenLabs",
      "ThermalGen",
      "PyTorch",
      "Pillow"
    ],
    displayStack: ["Python", "FastAPI", "Next.js", "ThermalGen", "Google Maps", "LLMs"],
    repoUrl: "https://github.com/LambSystems/UrbanLens",
    detail: {
      overview:
        "UrbanLens is a localized urban heat investigation system. A user selects a region directly on a Google Maps satellite view, and the frontend sends both geospatial metadata and a captured image to the backend. The backend persists the capture, runs ThermalGen to generate thermal evidence, proposes hotspots, classifies each hotspot using RGB crop inspection and optional multimodal reasoning, ranks findings by severity and confidence, and exposes a planner for grounded follow-up questions over the generated analysis.",
      problemDetail:
        "Urban heat tools often stop at visualization. Satellite maps show surfaces, thermal imagery shows heat, and planning dashboards show aggregate indicators, but none of these alone answer the operational question: what should someone inspect or improve first in this specific locality?\n\nThe core challenge was connecting visual evidence, generated thermal evidence, surface classification, ranking logic, and interactive reasoning without relying on a perfect dataset. The system needed to work from user-selected map imagery while keeping the analysis inspectable and grounded.",
      constraints: [
        "The system had to work without a clean pre-existing drone or thermal dataset",
        "Frontend map selection had to align with model-sized image captures so hotspot coordinates could be rendered accurately",
        "Thermal output and RGB satellite imagery had to be reconciled into a single geospatial analysis result",
        "Surface classification had to degrade gracefully when roofs, roads, and parking lots were visually ambiguous",
        "Agent behavior needed to remain exploratory without breaking the deterministic analysis and ranking pipeline"
      ],
      architecture:
        "UrbanLens separates capture, thermal generation, perception, scoring, grounded reasoning, and UI into explicit layers.\n\n- The Next.js frontend owns region selection, map capture, hotspot rendering, trace visualization, planner interaction, and optional voice briefing playback\n- The FastAPI backend owns typed analysis contracts, capture upload, local persistence, ThermalGen execution, hotspot proposal, perception enrichment, ranking, planner responses, and voice briefing generation\n- ThermalGen converts a captured RGB image into thermal evidence and hotspot candidates\n- The perception layer crops the original image around each thermal candidate and classifies the visible surface using heuristic features plus optional multimodal classification\n- The scoring layer computes anomaly, severity, confidence, and final rank scores so the priority order remains inspectable\n- The planner answers questions over an existing stored analysis instead of replacing the analysis pipeline\n\nThe key boundary is that reasoning can investigate and explain, while ranking remains grounded in typed evidence and deterministic scoring.",
      architectureDiagram: `+-----------------------------+
|        Next.js UI           |
| Google Maps selection       |
| satellite capture           |
| hotspots + trace + planner  |
+--------------+--------------+
               |
               v
+--------------+--------------+
|           FastAPI           |
| analysis API | planner      |
| capture store | session API |
+------+---------------+------+
       |               |
       v               v
+------+-------+   +---+----------------+
| ThermalGen   |   | LLMProvider        |
| RGB -> heat  |   | Anthropic/Gemini/  |
| hotspot cand |   | Featherless/Mock   |
+------+-------+   +---+----------------+
       |
       v
+------+----------------------+
| Perception + Classification |
| RGB crop inspection         |
| surface family + confidence |
+------+----------------------+
       |
       v
+------+----------------------+
| Scoring + Ranking           |
| anomaly | severity | conf   |
| final priority order        |
+------+----------------------+
       |
       v
+------+----------------------+
| Planner + Voice Briefing    |
| grounded Q&A + explanation  |
+-----------------------------+`,
      keyDecisions: [
        {
          decision:
            "Used Google Maps satellite capture as the primary input",
          reasoning:
            "This created a reproducible input pipeline without blocking on drone or municipal thermal datasets."
        },
        {
          decision:
            "Kept ThermalGen inside a larger investigation pipeline",
          reasoning:
            "Thermal generation becomes more useful when combined with classification, ranking, and grounded follow-up reasoning."
        },
        {
          decision: "Separated reasoning from deterministic scoring",
          reasoning:
            "The planner can explain and investigate, while priority ranking remains auditable through explicit evidence and scores."
        },
        {
          decision:
            "Classified hotspots from RGB crops rather than only thermal intensity",
          reasoning:
            "Thermal evidence localizes heat concentration, but RGB inspection provides the semantic layer needed to distinguish roofs, roads, vegetation, and ambiguous surfaces."
        },
        {
          decision: "Introduced an LLMProvider abstraction",
          reasoning:
            "Provider flexibility made the planner more resilient and avoided hard-coupling the reasoning layer to a single vendor."
        }
      ],
      tradeoffs: [
        {
          tradeoff: "Map-based satellite captures instead of real drone or sensor data",
          reasoning:
            "This improved reproducibility and speed, but production deployment should support higher-resolution thermal and aerial datasets."
        },
        {
          tradeoff:
            "Heuristic and multimodal classification instead of a trained segmentation model",
          reasoning:
            "A dedicated segmentation model would likely improve consistency, but the chosen approach was faster to integrate and sufficient for the current system."
        },
        {
          tradeoff: "Planner constrained to generated analyses",
          reasoning:
            "Restricting follow-up questions to an existing analysis kept the system grounded and prevented unbounded, weakly supported reasoning."
        }
      ],
      impactDetail: [
        "Built a full map-capture-to-analysis pipeline rather than a static heatmap demo",
        "Connected ThermalGen output to hotspot proposal, classification, and ranked intervention candidates",
        "Added grounded follow-up reasoning over stored analyses instead of an ungrounded chatbot",
        "Integrated typed backend contracts across capture, scoring, planner, and UI layers"
      ],
      futureWork: [
        "Replace local artifact persistence with cloud storage and saved analysis records",
        "Train or integrate a dedicated satellite surface segmentation model",
        "Add richer environmental layers such as canopy coverage, NDVI, land use, flood risk, and solar exposure",
        "Calibrate against real thermal sensor or municipal heat datasets",
        "Extend from single-locality analysis into comparative multi-region planning workflows"
      ]
    }
  },
  {
    id: "aeris",
    slug: "aeris",
    title: "Aeris",
    category: "Environmental decision pipeline",
    hook:
      "Live environmental scanner that keeps perception fast while context loading and recommendation generation run through typed, resilient backend boundaries.",
    problem:
      "Environmental dashboards expose conditions and vision models detect objects, but neither turns visible waste plus local environmental context into immediate action.",
    system:
      "Context-aware environmental vision system that combines live YOLO waste detection, CASTNET-backed context, weather and air-quality signals, and a resilient recommendation layer.",
    impact:
      "Turned a passive detection demo into a perception-to-action pipeline with responsive live inference, contextual risk grounding, provider fallback, caching, and deterministic policy backup.",
    stack: [
      "Python",
      "FastAPI",
      "Streamlit",
      "PyTorch",
      "Ultralytics YOLO",
      "OpenCV",
      "React",
      "Vite",
      "TypeScript",
      "Tailwind",
      "Pydantic",
      "Gemini",
      "Anthropic",
      "CASTNET",
      "Open-Meteo"
    ],
    displayStack: ["Python", "FastAPI", "YOLO", "OpenCV", "React", "CASTNET"],
    repoUrl: "https://github.com/lambsystems/aeris",
    detail: {
      overview:
        "Aeris is a live environmental scanner that turns object detection into context-aware sustainability guidance. A custom YOLO model detects visible waste objects such as cans, paper, and bottles, while the backend enriches each detection with CASTNET, weather, air-quality, and alert context. Instead of treating computer vision as the final output, Aeris uses vision as the perception layer in a larger decision pipeline that produces local, explainable actions.",
      problemDetail:
        "Most environmental tools stop at either monitoring or detection. Air-quality dashboards show regional conditions, but they rarely connect those conditions to what a person should do in a specific physical scene. Object detection systems can identify a bottle or piece of paper, but they do not understand whether wind, rain, ozone, particulate matter, or local risk changes the urgency of action.\n\nThe core challenge was connecting three distinct layers without collapsing responsiveness:\n- live visual perception from a camera feed\n- environmental context from external data sources\n- recommendation logic that remains useful even when LLM providers fail\n\nAeris therefore separates perception from reasoning, keeps the live camera responsive, normalizes detections into typed backend contracts, and generates concise action guidance without depending entirely on an external model provider.",
      constraints: [
        "The live camera experience had to remain responsive while YOLO inference and advice generation ran at different speeds",
        "The system needed to support a local custom YOLO checkpoint while preserving a backend image-scan API for testing and integration",
        "Environmental context had to be cached and normalized instead of repeatedly fetched during scanning",
        "LLM-backed advice had to degrade gracefully to deterministic local policy if API keys, network access, or provider responses failed"
      ],
      architecture:
        "Aeris separates perception, context, recommendation, and UI into explicit layers.\n\n- Streamlit owns the live WebRTC camera feed, local YOLO inference, object tracking, bounding-box drawing, frame skipping, confidence thresholds, and uploaded clip processing\n- FastAPI owns environmental context, schema validation, scan-frame support, latest-detection access, and sustainability advice generation\n- A lightweight local bridge lets the live vision runtime publish the latest actionable detection to the backend through a stable interface\n- React/Vite provides the product shell for current scan state, environmental context display, and recommendation output\n- The advice layer routes through Gemini or Anthropic when configured, caches repeated outputs, and falls back to deterministic rules when model providers are unavailable\n\nThis architecture keeps the critical boundary explicit: fast perception stays independent from slower context loading and recommendation generation.",
      architectureDiagram: `+----------------------+
|   React Product UI   |
| scan + context + rec |
+----------+-----------+
           |
           v
+----------+-----------+
|        FastAPI       |
| schemas | context    |
| advice  | detection  |
+-----+------------+---+
      |            |
      v            v
+-----+-----+  +---+----------------+
| CASTNET   |  | AI / Fallback      |
| Weather   |  | recommendation     |
| Air APIs  |  | cache + policy     |
+-----------+  +--------------------+

+---------------------------+
| Streamlit Vision Runtime  |
| WebRTC + YOLO + tracking  |
+-------------+-------------+
              |
              v
+-------------+-------------+
| Latest detection bridge   |
+---------------------------+`,
      keyDecisions: [
        {
          decision: "Separated live perception from recommendation generation",
          reasoning:
            "YOLO inference remains fast and responsive while environmental lookup and recommendation generation run more slowly and asynchronously."
        },
        {
          decision: "Used FastAPI and Pydantic as the system contract layer",
          reasoning:
            "Typed models make it easier to normalize detections, environmental context, risk flags, and advice across Streamlit, React, and backend surfaces."
        },
        {
          decision: "Kept live YOLO inference inside the Python runtime",
          reasoning:
            "The custom PyTorch/Ultralytics checkpoint was most reliable in the local Python path for real-time detection."
        },
        {
          decision: "Converted environmental readings into semantic risk flags",
          reasoning:
            "Raw values such as ozone, rainfall, wind, and PM2.5 are harder to act on directly; semantic flags provide a stable decision interface."
        },
        {
          decision: "Added a provider cascade with deterministic fallback",
          reasoning:
            "The system remains useful even when external model providers fail."
        },
        {
          decision:
            "Cached advice by object class, CASTNET site, measurement date, and active risk profile",
          reasoning:
            "The same object often remains in frame across multiple scans, so caching reduces duplicate model calls and improves latency."
        }
      ],
      tradeoffs: [
        {
          tradeoff: "Streamlit-first live vision instead of fully native browser inference",
          reasoning:
            "Python-based YOLO inference was more reliable for the custom model, but required a bridge between the vision runtime and the product UI."
        },
        {
          tradeoff: "Prototype event bridge instead of production event streaming",
          reasoning:
            "A lightweight local bridge reduced implementation risk, but a production system should replace it with WebSockets, Redis Streams, or another event layer."
        },
        {
          tradeoff: "Focused detector classes instead of broad waste taxonomy",
          reasoning:
            "Training around can, paper, and bottle made the system more controllable and measurable, but limited real-world category coverage."
        },
        {
          tradeoff: "LLM-generated language with deterministic fallback",
          reasoning:
            "The LLM improves nuance and phrasing, while fallback guarantees availability at lower expressiveness."
        }
      ],
      impactDetail: [
        "Built a full environmental perception-to-action pipeline instead of a standalone object detector",
        "Integrated a custom YOLO waste model into live webcam and uploaded-clip workflows",
        "Connected detections with CASTNET, weather, air-quality, and weather-alert context",
        "Separated fast visual perception from slower advice generation so the camera remains responsive while recommendations update asynchronously",
        "Implemented provider-backed advice with deterministic fallback and cache-aware routing",
        "Created typed backend contracts that can support future perception sources such as browser inference, mobile capture, or geotagged field evidence"
      ],
      modelDetail:
        "The current model path uses a YOLO checkpoint trained for three focused waste classes: can, paper, and bottle. The work included annotated dataset preparation, COCO-to-YOLO conversion, preprocessing safeguards, model training, and runtime integration into the live vision pipeline.",
      backendDetail:
        "The FastAPI backend exposes health, fixed context, scan-frame, sustainability advice, and latest-detection endpoints. Pydantic schemas define the contracts for detections, bounding boxes, environmental context, risk flags, and advice output. The backend loads CASTNET readings, augments them with weather and air-quality sources, derives semantic risk flags, and routes recommendation generation through a provider cascade.",
      futureWork: [
        "Replace the prototype event bridge with production-grade streaming",
        "Expand the detector taxonomy to include wrappers, bags, bins, overflow, and illegal dumping",
        "Add geotagged field capture and map-based aggregation for campus or municipal operations",
        "Evolve from single-object recommendations into ranked cleanup or intervention workflows",
        "Combine street-level detections with satellite, thermal, GIS, and demographic layers for environmental priority mapping"
      ]
    }
  },
  {
    id: "cussien",
    slug: "cussien",
    title: "Cussien",
    category: "Stateful planning",
    hook:
      "Recipe-to-cart execution model that separates planning intent, generated cart structure, and retailer-facing purchase output.",
    problem:
      "Most meal-planning tools collapse recipe storage, ingredient aggregation, and shopping execution into one interface, leaving users to reconcile duplicates, inconsistencies, and retailer-specific choices by hand.",
    system:
      "State-driven cart generation system that transforms saved recipes into structured, retailer-aware shopping outputs through explicit domain transitions.",
    impact:
      "Turned meal planning from ad-hoc list making into a persistent workflow with explicit state boundaries, deterministic cart generation, and a modular retailer-facing output layer.",
    stack: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Prisma"],
    displayStack: ["TypeScript", "Next.js", "NestJS", "PostgreSQL", "Prisma"],
    repoUrl: "https://github.com/postigodev/cussien",
    detail: {
      overview:
        "Cussien is a planning and cart-generation system that turns saved recipes into structured shopping outputs. Instead of behaving like a static recipe app, it models planning as a persistent workflow with explicit intermediate states, allowing user preferences, recipe data, and downstream retailer logic to interact in a controlled way.",
      problemDetail:
        "Most recipe and grocery tools collapse several distinct problems into one interface: recipe storage, planning, ingredient normalization, aggregation, and shopping execution. That makes the system hard to extend and often leaves users manually resolving inconsistent recipe formats, duplicated ingredients, and purchase decisions.\n\nThe core challenge was to represent meal planning as an operational system rather than a collection of screens.",
      constraints: [
        "User-facing planning state had to remain persistent across sessions",
        "Cart generation needed to remain deterministic and auditable even when AI-assisted transformations were introduced",
        "Retailer integration had to stay modular rather than hard-coded into the planning model"
      ],
      architecture:
        "The system is structured around explicit domain states and a modular backend.\n\n- Recipes act as reusable source objects\n- CartDraft captures editable planning intent\n- Cart represents a structured generated result\n- ShoppingCart serves as the retailer-facing output layer\n\nThe backend is built with NestJS, PostgreSQL, and Prisma. Authenticated users manage recipes, drafts, and cart resources while provider-aware logic handles downstream matching without collapsing the core planning model into retailer-specific behavior.",
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
            "This prevents provider-specific logic from contaminating the core planning model and keeps the system extensible."
        },
        {
          decision:
            "Used explicit state transitions across Recipe -> CartDraft -> Cart -> ShoppingCart",
          reasoning:
            "The workflow becomes easier to reason about, persist, and evolve without mixing user intent with generated outputs."
        },
        {
          decision:
            "Kept aggregation, matching, and pricing logic deterministic",
          reasoning:
            "Cart generation remains inspectable and reliable even when AI is used for bounded transformations."
        }
      ],
      tradeoffs: [
        {
          tradeoff: "More domain modeling upfront",
          reasoning:
            "The system is more complex than a simple recipe CRUD app, but gains stronger extensibility and consistency."
        },
        {
          tradeoff: "Modular retailer support instead of deep provider coupling",
          reasoning:
            "This slows short-term provider-specific optimization, but avoids overfitting the architecture to one retailer."
        }
      ],
      impactDetail: [
        "Replaced ad-hoc recipe planning with a persistent, state-driven workflow",
        "Enabled draft and cart workflows with real authenticated user state",
        "Created a foundation for provider-aware cart generation without collapsing the product into a static shopping list tool"
      ],
      futureWork: [
        "Expand provider integrations beyond the current matching layer",
        "Strengthen cart-generation observability and validation flows",
        "Refine AI-assisted recipe transformation while keeping downstream execution deterministic"
      ]
    }
  }
];