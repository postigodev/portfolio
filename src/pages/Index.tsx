import { Link } from "react-router-dom";
import { Github, Linkedin, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import SystemCard from "@/components/SystemCard";
import ExperienceCard from "@/components/ExperienceCard";
import GitHubRepoCard from "@/components/GitHubRepoCard";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { systems } from "@/content/systems";
import { useGitHubRepos } from "@/hooks/use-github-repos";

const Index = () => {
  const featuredExperience = experience.filter((e) => e.featured);
  const { data: repos, isLoading: reposLoading } = useGitHubRepos();

  return (
    <Layout>
      {/* Hero */}
      <section className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {profile.name}
        </h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          {profile.title}
        </p>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {profile.intro}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button size="sm" asChild>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <FileText className="mr-1.5 h-4 w-4" /> Resume
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1.5 h-4 w-4" /> GitHub
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-1.5 h-4 w-4" /> LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${profile.email}`}>
              <Mail className="mr-1.5 h-4 w-4" /> Email
            </a>
          </Button>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Experience */}
      <section className="max-w-2xl">
        <h2 className="text-lg font-semibold text-foreground">Experience</h2>
        <div className="mt-6 space-y-8">
          {featuredExperience.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Selected Systems */}
      <section className="max-w-2xl">
        <h2 className="text-lg font-semibold text-foreground">Selected Systems</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Key systems I designed and built — not side projects.
        </p>
        <div className="mt-6 grid gap-4">
          {systems.map((s) => (
            <SystemCard key={s.id} system={s} />
          ))}
        </div>
      </section>

      <Separator className="my-12" />

      {/* Open Source */}
      <section className="max-w-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Open Source
          </h2>
          <Link
            to="/projects"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </Link>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Selected experiments and systems work.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {reposLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-lg" />
              ))
            : repos?.slice(0, 4).map((repo) => (
                <GitHubRepoCard key={repo.id} repo={repo} />
              ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
