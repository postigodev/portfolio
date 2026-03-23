import Layout from "@/components/Layout";
import GitHubRepoCard from "@/components/GitHubRepoCard";
import SystemCard from "@/components/SystemCard";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { systems } from "@/content/systems";
import { useGitHubRepos } from "@/hooks/use-github-repos";

const Projects = () => {
  const { data: repos, isLoading, error } = useGitHubRepos();
  const githubRepos = repos ?? [];

  return (
    <Layout>
      <div className="max-w-2xl">
        {/* Selected Systems */}
        <section>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Selected Systems</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Key systems I designed and built — not side projects.
          </p>
          <div className="mt-8 grid gap-4">
            {systems.map((s) => (
              <SystemCard key={s.id} system={s} />
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Open Source */}
        <section>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-foreground">Open Source</h2>
            <a
              href="https://github.com/postigodev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              github.com/postigodev →
            </a>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Selected experiments and systems work.
          </p>

          {isLoading && (
            <div className="mt-6 grid gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-28 rounded-lg" />
              ))}
            </div>
          )}

          {error && (
            <p className="mt-6 text-sm text-muted-foreground">
              Unable to load repositories right now.
            </p>
          )}

          {githubRepos.length > 0 && (
            <div className="mt-6 grid gap-4">
              {githubRepos.map((repo) => (
                <GitHubRepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Projects;
