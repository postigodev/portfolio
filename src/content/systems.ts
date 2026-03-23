export interface System {
  id: string;
  slug: string;
  title: string;
  problem: string;
  system: string;
  impact: string;
  stack: string[];
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
    id: "customer-ops",
    slug: "customer-ops",
    title: "Stateful Customer Operations System",
    problem:
      "Fragmented, manual customer communication and document workflows.",
    system:
      "Stateful backend combining AI intent classification with deterministic workflow execution.",
    impact:
      "Reduced manual workload by ~30–40% and unified messaging, validation, and approval processes.",
    stack: ["Node.js", "n8n", "OpenAI API", "WhatsApp Cloud API", "Google Sheets"],
    detail: {
      overview:
        "This system automates customer communication workflows that previously required manual coordination. It handles both outbound messaging and real-time inbound responses, while maintaining a consistent operational state across interactions.",
      problemDetail:
        "Customer operations relied on fragmented tools (WhatsApp, email, spreadsheets) and manual coordination. This led to inconsistent workflows, lost state, and high operational overhead.\n\nNaive automation approaches using AI directly resulted in unpredictable behavior and unreliable execution.",
      architecture:
        "The system is structured around a stateful backend that coordinates multiple services:\n\n• WhatsApp API for messaging\n• OpenAI for intent classification\n• n8n for workflow orchestration\n• Google Sheets as a persistent state layer\n\nIncoming messages are classified into bounded actions, which are then routed through deterministic workflows. Each interaction updates a shared state record, ensuring consistency across the system.",
      architectureDiagram: `┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  WhatsApp   │────▶│  Intent      │────▶│  Action Router  │
│  Cloud API  │     │  Classifier  │     │  (Bounded)      │
└─────────────┘     │  (OpenAI)    │     └────────┬────────┘
                    └──────────────┘              │
                                                  ▼
                                        ┌─────────────────┐
                                        │  n8n Workflows  │
                                        │  (Deterministic)│
                                        └────────┬────────┘
                                                  │
                                                  ▼
                                        ┌─────────────────┐
                                        │  Shared State   │
                                        │  (Google Sheets)│
                                        └─────────────────┘`,
      keyDecisions: [
        {
          decision: "Separated AI reasoning from execution",
          reasoning: "Ensures workflows remain deterministic and reliable",
        },
        {
          decision: "Introduced bounded action routing",
          reasoning: "Prevents uncontrolled AI-driven behavior",
        },
        {
          decision: "Used shared state (Google Sheets)",
          reasoning: "Allows visibility and persistence across all interactions",
        },
      ],
      tradeoffs: [
        {
          tradeoff: "Google Sheets as state store",
          reasoning: "Simple and accessible, but not scalable for high concurrency",
        },
        {
          tradeoff: "Workflow orchestration via n8n",
          reasoning: "Flexible, but adds dependency on external tooling",
        },
      ],
      impactDetail: [
        "Reduced manual communication workload by ~30–40%",
        "Unified messaging, validation, and approval processes",
        "Enabled consistent handling of hundreds of daily interactions",
      ],
      futureWork: [
        "Replace Google Sheets with a proper state store (e.g. PostgreSQL or Redis)",
        "Add observability layer for workflow tracing and failure detection",
      ],
    },
  },
  {
    id: "infra-pipeline",
    slug: "infra-pipeline",
    title: "Infrastructure & Data Pipeline System",
    problem:
      "Manual data handling and unreliable infrastructure workflows.",
    system:
      "Automated ingestion, transformation, and virtualized infrastructure using OVH + Proxmox.",
    impact:
      "Improved system performance (~2x) and enabled scalable, repeatable data processing.",
    stack: ["Node.js", "MongoDB", "Docker", "OVH", "Proxmox", "Linux"],
    detail: {
      overview:
        "An infrastructure system designed to automate data ingestion, transformation, and deployment pipelines across virtualized environments. It replaced manual, error-prone workflows with repeatable, containerized processes.",
      problemDetail:
        "Data pipelines were managed manually — ingestion was ad-hoc, transformation scripts were fragile, and infrastructure provisioning required direct intervention on bare-metal servers.\n\nThis created bottlenecks: data inconsistencies, slow deployments, and no reproducibility across environments.",
      constraints: [
        "Infrastructure had to run on OVH dedicated servers, not cloud-native services",
        "Budget constraints prevented use of managed Kubernetes or equivalent",
      ],
      architecture:
        "The system operates across three layers:\n\n• Data ingestion: automated collection and validation from external sources into MongoDB\n• Transformation pipeline: containerized processing stages using Docker, orchestrated sequentially\n• Infrastructure layer: Proxmox-based virtualization on OVH bare metal, with scripted provisioning\n\nEach layer is independently deployable and monitored through system-level logging.",
      architectureDiagram: `┌──────────────────┐
│  External Data   │
│  Sources         │
└────────┬─────────┘
         ▼
┌──────────────────┐     ┌──────────────────┐
│  Ingestion       │────▶│  MongoDB         │
│  (Node.js)       │     │  (Raw Store)     │
└──────────────────┘     └────────┬─────────┘
                                  ▼
                         ┌──────────────────┐
                         │  Transform       │
                         │  (Docker)        │
                         └────────┬─────────┘
                                  ▼
                         ┌──────────────────┐
                         │  Proxmox / OVH   │
                         │  (Infra Layer)   │
                         └──────────────────┘`,
      keyDecisions: [
        {
          decision: "Used Proxmox for virtualization instead of Kubernetes",
          reasoning: "Simpler operational model for the team size and infra constraints",
        },
        {
          decision: "Containerized each pipeline stage independently",
          reasoning: "Enables isolated testing and independent scaling of each step",
        },
        {
          decision: "MongoDB as the primary data store",
          reasoning: "Schema flexibility was critical for evolving data sources",
        },
      ],
      tradeoffs: [
        {
          tradeoff: "No managed orchestration (Airflow, Prefect)",
          reasoning: "Reduced complexity but limited scheduling and retry capabilities",
        },
        {
          tradeoff: "Proxmox over cloud-native",
          reasoning: "Lower cost but higher operational burden for maintenance",
        },
      ],
      impactDetail: [
        "Improved system performance by approximately 2×",
        "Enabled scalable, repeatable data processing pipelines",
        "Reduced deployment time from hours to minutes",
      ],
      futureWork: [
        "Introduce a lightweight orchestration layer for pipeline scheduling",
        "Add monitoring and alerting for pipeline failures",
        "Evaluate migration path to cloud-native infrastructure",
      ],
    },
  },
  {
    id: "cimax-medical",
    slug: "cimax-medical",
    title: "Cimax Medical Operations System",
    problem:
      "Manual scheduling and billing coordination across medical staff.",
    system:
      "Full-stack backend system with structured data models and real-time query capabilities.",
    impact:
      "Supported 50+ doctors and replaced manual coordination workflows.",
    stack: ["MERN", "MongoDB", "Express", "React"],
    detail: {
      overview:
        "A full-stack operations system built for a medical organization to manage scheduling, billing, and staff coordination. It replaced spreadsheet-based workflows with a structured, queryable backend serving a real-time web interface.",
      problemDetail:
        "Medical staff coordination — scheduling, billing, and patient assignment — was managed through spreadsheets and phone calls. This led to scheduling conflicts, billing errors, and no centralized visibility into operations.\n\nExisting off-the-shelf solutions were either too expensive or too rigid for the organization's workflows.",
      architecture:
        "The system follows a MERN architecture:\n\n• MongoDB for flexible data modeling of doctors, schedules, patients, and billing records\n• Express API layer with role-based access control\n• React frontend with real-time schedule views and billing dashboards\n\nThe data model is designed around relationships between doctors, time slots, and billing events, supporting complex queries like availability checks and revenue aggregation.",
      architectureDiagram: `┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  React UI    │────▶│  Express API │────▶│  MongoDB     │
│  (Schedules, │     │  (RBAC)      │     │  (Doctors,   │
│   Billing)   │     └──────────────┘     │   Slots,     │
└──────────────┘                          │   Billing)   │
       ▲                                  └──────┬───────┘
       │                                         │
       └─────────── polling updates ─────────────┘`,
      keyDecisions: [
        {
          decision: "Built custom instead of adapting off-the-shelf",
          reasoning: "Existing tools didn't support the organization's specific scheduling logic",
        },
        {
          decision: "MongoDB over relational DB",
          reasoning: "Schema flexibility needed for evolving business rules around scheduling",
        },
        {
          decision: "Role-based access at the API level",
          reasoning: "Different permission needs for admins, doctors, and billing staff",
        },
      ],
      tradeoffs: [
        {
          tradeoff: "No real-time sync (WebSockets)",
          reasoning: "Polling-based updates were sufficient for the user count and reduced complexity",
        },
        {
          tradeoff: "Monolithic deployment",
          reasoning: "Faster to ship and maintain for a small team, but limits independent scaling",
        },
      ],
      impactDetail: [
        "Supported daily operations for 50+ doctors",
        "Eliminated scheduling conflicts and billing inconsistencies",
        "Replaced manual coordination with structured, queryable workflows",
      ],
      futureWork: [
        "Add real-time updates via WebSockets for schedule changes",
        "Introduce automated billing reconciliation",
        "Extract billing into a separate microservice for independent scaling",
      ],
    },
  },
];
