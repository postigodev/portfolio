import { FileText, Github, Linkedin, Mail } from "lucide-react";
import ExperienceCard from "@/components/ExperienceCard";
import GitHubRepoCard from "@/components/GitHubRepoCard";
import Layout from "@/components/Layout";
import SectionReadingBar from "@/components/SectionReadingBar";
import SystemCard from "@/components/SystemCard";
import { Button } from "@/components/ui/button";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { systems } from "@/content/systems";
import { useReadingSections } from "@/hooks/use-reading-sections";
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
  const { activeTitle, isVisible } = useReadingSections([
    { id: "home-hero-title", title: profile.name },
    { id: "home-systems-label", title: "Selected systems" },
    { id: "home-experience-label", title: "Experience" },
    { id: "home-open-source-label", title: "Open source" },
  ]);

  return (
    <Layout>
      <SectionReadingBar title={activeTitle} visible={isVisible} />

      <article className="mx-auto max-w-4xl space-y-14 pb-8 md:space-y-16">
        <section className="space-y-6">
          <p className="section-label">Systems engineer / production thinking</p>
          <h1
            id="home-hero-title"
            className="max-w-4xl text-5xl font-semibold tracking-[-0.07em] text-foreground sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-foreground/88 sm:text-xl">
            Backend systems designed for real-world constraints and failure.
          </p>

          <div className="space-y-3 text-[15px] leading-8 text-muted-foreground">
            {introParts.map((part) => (
              <p key={part}>{part}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button size="sm" variant="outline" className="rounded-full px-4" asChild>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" /> Resume
              </a>
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full px-4" asChild>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full px-4" asChild>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
              </a>
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full px-4" asChild>
              <a href={`mailto:${profile.email}`}>
                <Mail className="mr-2 h-4 w-4" /> Email
              </a>
            </Button>
          </div>
        </section>

        <section className="border-t border-border/70 pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            {proofItems.map((item) => (
              <div key={item.title}>
                <p className="stat-kicker">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t border-border/70 pt-6">
          <p id="home-systems-label" className="section-label">
            Selected systems
          </p>
          <h2
            className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl"
          >
            Two systems, each framed as architecture, decisions, and operational tradeoffs.
          </h2>

          <div>
            {systems.map((system) => (
              <SystemCard key={system.id} system={system} />
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t border-border/70 pt-6">
          <p id="home-experience-label" className="section-label">
            Experience
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.05em] text-foreground">
            Roles shaped by debugging, infrastructure, and system behavior.
          </h2>

          <div className="space-y-7">
            {featuredExperience.map((item) => (
              <ExperienceCard key={item.id} exp={item} />
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t border-border/70 pt-6">
          <div className="space-y-2">
            <p id="home-open-source-label" className="section-label">
              Open source
            </p>
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
              Supporting experiments and public systems work.
            </h2>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {reposLoading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="rounded-md border border-border/80 p-4 text-sm text-muted-foreground">
                    Loading repository...
                  </div>
                ))
              : repos?.slice(0, 4).map((repo) => <GitHubRepoCard key={repo.id} repo={repo} />)}
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default Index;
