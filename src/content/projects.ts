export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  detail?: {
    problem: string;
    systemDesign: string;
    keyDecisions: string[];
  };
}

export const projects: Project[] = [
  {
    id: "coaktiva-automation",
    slug: "coaktiva-automation",
    title: "Coaktiva Automation Platform",
    description:
      "Stateful backend system integrating WhatsApp Cloud API, OpenAI, and n8n for automated debt recovery communications. Reduced manual workload by ~30-40%.",
    stack: ["Node.js", "n8n", "OpenAI API", "WhatsApp Cloud API", "MongoDB"],
    featured: true,
    detail: {
      problem:
        "Coaktiva's debt recovery team manually handled hundreds of daily customer interactions across fragmented channels, leading to inconsistencies and high operational overhead.",
      systemDesign:
        "Event-driven architecture using webhooks to process incoming messages, route them through stateful session management, and trigger appropriate automated or human-in-the-loop responses. Data processing pipelines handle document ingestion and validation with approval flows.",
      keyDecisions: [
        "Chose n8n for workflow orchestration to enable non-technical team members to modify flows",
        "Implemented session-based state management for multi-turn conversations",
        "Built human approval flows for critical decisions rather than full automation",
        "Used event-driven architecture to decouple message processing from business logic",
      ],
    },
  },
  {
    id: "coaktiva-infra",
    slug: "coaktiva-infrastructure",
    title: "Coaktiva Infrastructure & Data Pipelines",
    description:
      "Internal ecosystem of backend services, data pipelines, and virtualized infrastructure replacing manual processes. Migrated 40k+ row datasets and achieved ~2x performance gains.",
    stack: ["Node.js", "MongoDB", "Docker", "OVH", "Proxmox", "Linux"],
    featured: true,
    detail: {
      problem:
        "Core business operations relied on manual Excel-based processes with no structured data storage, running on aging physical infrastructure.",
      systemDesign:
        "Multi-layer system: automated data ingestion pipelines for monthly Excel processing, MongoDB as the central data store, backend services for messaging and operational workflows, and virtualized server infrastructure on OVH/Proxmox.",
      keyDecisions: [
        "Used MongoDB for flexibility with unstructured, inconsistent source data",
        "Deployed Proxmox for virtualization to maximize hardware utilization",
        "Built ingestion pipelines to handle corrupted and inconsistent data formats gracefully",
        "Prioritized documentation and training for non-technical operator adoption",
      ],
    },
  },
  {
    id: "cimax-system",
    slug: "cimax-medical-system",
    title: "Cimax Medical Operations System",
    description:
      "Full-stack MERN application for appointment scheduling and billing across 50+ doctors, replacing manual coordination processes.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    featured: true,
    detail: {
      problem:
        "A medical facility coordinating 50+ doctors relied on manual scheduling and billing, causing errors and slow operations for ~30 daily patient interactions.",
      systemDesign:
        "MERN stack application with MongoDB data models representing patient-procedure-workflow relationships. Dynamic query system for multi-criteria filtering. Interface designed for non-technical administrative staff.",
      keyDecisions: [
        "Chose MongoDB for flexible schema to model complex medical relationships",
        "Built dynamic query system for real-time multi-criteria data access",
        "Optimized UI for non-technical users to reduce operational friction",
        "Designed for administrative staff workflows rather than direct doctor interaction",
      ],
    },
  },
];
