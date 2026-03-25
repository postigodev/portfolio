import { ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import ExperienceCard from "@/components/ExperienceCard";
import GitHubRepoCard from "@/components/GitHubRepoCard";
import Layout from "@/components/Layout";
import SystemCard from "@/components/SystemCard";
import { Button } from "@/components/ui/button";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { systems } from "@/content/systems";
import { useGitHubRepos } from "@/hooks/use-github-repos";
import { normalizeText } from "@/lib/utils";

const proofItems = [
  {
    title: "Stateful workflows",
    detail:
      "Planning systems, auth-backed resources, and operational flows that keep user intent separate from execution.",
  },
  {
    title: "Production debugging",
    detail:
      "Routing, configuration, and reliability work under live constraints rather than isolated toy builds.",
  },
  {
    title: "Automation replacing ops",
    detail:
      "Systems aimed at removing manual coordination, brittle spreadsheets, and fragmented operator processes.",
  },
];

const Index = () => {
  const featuredExperience = experience.filter((item) => item.featured);
  const { data: repos, isLoading: reposLoading } = useGitHubRepos();
  const introParts = normalizeText(profile.intro).split("\n");
  const evidenceStats = [
    { value: systems.length.toString().padStart(2, "0"), label: "selected systems" },
    { value: featuredExperience.length.toString().padStart(2, "0"), label: "production roles" },
    { value: profile.skills.languages.length.toString().padStart(2, "0"), label: "core languages" },
  ];

  return (
    <Layout>
      <div className="space-y-20 md:space-y-24">
        <section className="grid gap-10 border-b border-border/80 pb-16 lg:grid-cols-[minmax(0,1.35fr)_20rem] lg:items-end">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="section-label">Systems engineer / production thinking</p>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.07em] text-foreground sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-foreground/88 sm:text-xl">
                I build backend systems that survive contact with production.
              </p>
            </div>

            <div className="grid max-w-4xl gap-5 border-l border-goat/50 pl-5 text-sm leading-7 text-muted-foreground md:grid-cols-2">
              {introParts.map((part) => (
                <p key={part}>{part}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-6" asChild>
                <Link to="/projects">
                  Selected Systems <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6" asChild>
                <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" /> Resume
                </a>
              </Button>
              <Button variant="ghost" size="lg" className="rounded-full px-5" asChild>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button variant="ghost" size="lg" className="rounded-full px-5" asChild>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
              <Button variant="ghost" size="lg" className="rounded-full px-5" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-4 w-4" /> Email
                </a>
              </Button>
            </div>
          </div>

          <aside className="dossier-panel overflow-hidden">
            <div className="editorial-rule" />
            <div className="space-y-6 p-6">
              <div>
                <p className="section-label">Operational brief</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Based in {profile.location}. Focused on backend systems, distributed behavior,
                  and replacing manual ops with explicit workflows.
                </p>
              </div>

              <div className="space-y-4 border-y border-border/80 py-5">
                {evidenceStats.map((stat) => (
                  <div key={stat.label} className="flex items-end justify-between gap-4">
                    <p className="text-3xl font-semibold tracking-[-0.06em] text-foreground">
                      {stat.value}
                    </p>
                    <p className="stat-kicker text-right">{stat.label}</p>
                  </div>
                ))}
              </div>

              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Knox College | Class of 2027
              </p>
            </div>
          </aside>
        </section>

        <section className="space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="section-label">What the site should prove</p>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
                Systems work with real operational edges, not just polished interfaces.
              </h2>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {proofItems.map((item) => (
              <article key={item.title} className="dossier-panel p-6">
                <p className="stat-kicker">Signal</p>
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.04em] text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-3">
            <p className="section-label">Selected systems</p>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
                Two systems, each framed as architecture, decisions, and operational tradeoffs.
              </h2>
              <Link
                to="/projects"
                className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-goat"
              >
                View all systems -&gt;
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            {systems.map((system) => (
              <SystemCard key={system.id} system={system} />
            ))}
          </div>
        </section>

        <section className="grid gap-12 border-t border-border/80 pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="section-label">Experience</p>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground">
                Roles shaped by debugging, infrastructure, and system behavior.
              </h2>
            </div>
            <div className="space-y-8">
              {featuredExperience.map((item) => (
                <ExperienceCard key={item.id} exp={item} />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="section-label">Open source</p>
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground">
                  Supporting experiments and public systems work.
                </h2>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-goat"
                >
                  github
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              {reposLoading
                ? Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="dossier-panel h-48 animate-pulse" />
                  ))
                : repos?.slice(0, 2).map((repo) => <GitHubRepoCard key={repo.id} repo={repo} />)}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
