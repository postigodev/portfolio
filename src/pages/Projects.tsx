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
      <div className="max-w-4xl">
        <section>
          <p className="section-label">Systems</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
            Selected systems, documented as architecture work.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Dossiers for systems I designed and built: what broke, how the system is shaped,
            and what changed operationally.
          </p>
          <div className="mt-7">
            {systems.map((system) => (
              <SystemCard key={system.id} system={system} />
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        <section className="max-w-2xl">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-foreground">Open Source</h2>
            <a
              href="https://github.com/postigodev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              github.com/postigodev -&gt;
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
              Showing curated repositories while GitHub is unavailable.
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
