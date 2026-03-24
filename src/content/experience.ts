export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
  featured: boolean;
}

export const experience: Experience[] = [
  {
    id: "streetstashed",
    company: "StreetStashed",
    role: "Software Engineer Intern",
    period: "Jan 2026 - Mar 2026",
    bullets: [
      "Restored production stability in a **production Next.js marketplace** by diagnosing routing architecture failures affecting client-side navigation",
      "Resolved build and configuration issues blocking application startup and development workflows",
      "Improved system reliability by aligning routing behavior with application state across distributed components",
    ],
    featured: true,
  },
  {
    id: "coaktiva-ai",
    company: "Coaktiva S.A.",
    role: "Software Engineer (Automation & AI Integration)",
    period: "Jun 2025 - Sep 2025",
    bullets: [
      "Designed and deployed a **stateful backend system** integrating WhatsApp Cloud API, OpenAI, and n8n, reducing manual workload by **~30-40%**",
      "Architected **event-driven services** handling hundreds of daily interactions with session-based state and dynamic request routing",
      "Consolidated fragmented messaging, validation, and approval processes into a **unified operational system**",
    ],
    featured: true,
  },
  {
    id: "coaktiva",
    company: "Coaktiva S.A.",
    role: "Software Engineer",
    period: "May 2023 - Sep 2023",
    bullets: [
      "Replaced manual data and infrastructure workflows by designing backend services, ingestion pipelines, and virtualized infrastructure",
      "Processed and migrated large-scale datasets (**40k+ rows**) from unstructured Excel sources into MongoDB through automated pipelines",
      "Deployed **virtualized server infrastructure** using OVH and Proxmox, improving performance by **~2x** and increasing reliability",
    ],
    featured: true,
  },
  {
    id: "cimax",
    company: "Cimax",
    role: "Software Engineer (Full-Stack, Contract)",
    period: "May 2023 - Sep 2023",
    bullets: [
      "Built a full-stack MERN system supporting scheduling and billing operations for **50+ doctors**",
      "Designed MongoDB data models representing patient, procedure, and workflow relationships with dynamic querying",
      "Replaced manual coordination workflows with a production system handling **~30 daily patient interactions**",
    ],
    featured: true,
  },
];
