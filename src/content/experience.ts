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
    period: "Jan 2026 – Mar 2026",
    bullets: [
      "Debugged and resolved critical client-side routing failures in a production **Next.js** application, restoring full navigation integrity",
      "Improved frontend-backend interaction reliability by aligning **routing logic** with application state across distributed components",
    ],
    featured: true,
  },
  {
    id: "coaktiva-ai",
    company: "Coaktiva S.A.",
    role: "Software Engineer (Automation & AI Integration)",
    period: "Jun 2025 – Sep 2025",
    bullets: [
      "Reduced manual workload by **~30–40%** by designing a **stateful backend** integrating WhatsApp Cloud API, **OpenAI**, and **n8n**",
      "Architected **event-driven** services using **webhooks** to process hundreds of daily interactions with session-based state management",
      "Built data processing pipelines for document ingestion, validation, and human approval flows",
    ],
    featured: true,
  },
  {
    id: "coaktiva",
    company: "Coaktiva S.A.",
    role: "Software Engineer",
    period: "May 2023 – Sep 2023",
    bullets: [
      "Processed and migrated large-scale datasets (**40k+ rows**) from Excel into **MongoDB** via automated ingestion pipelines",
      "Designed and deployed virtualized server infrastructure using **OVH** and **Proxmox** (~**2x performance** increase)",
      "Led adoption by 3 non-technical operators through documentation and training",
    ],
    featured: true,
  },
  {
    id: "cimax",
    company: "Cimax",
    role: "Software Engineer (Full-Stack, Contract)",
    period: "May 2023 – Sep 2023",
    bullets: [
      "Built a full-stack **MERN** system for appointment scheduling and billing operations across **50+ doctors**",
      "Designed **MongoDB** data models representing patient-procedure-workflow relationships with dynamic multi-criteria filtering",
      "Replaced manual coordination workflows with structured, real-time data access for administrative staff",
    ],
    featured: true,
  },
];
