import type { GitHubRepo } from "@/hooks/use-github-repos";
import { normalizeText } from "@/lib/utils";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
const GitHubRepoCard = ({ repo }: { repo: GitHubRepo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block rounded-md border border-border/80 p-4 transition-colors hover:border-foreground/20 hover:bg-card/40"
  >
    <div className="flex items-start justify-between gap-3">
      <p className="text-base font-semibold tracking-[-0.03em] text-foreground transition-colors group-hover:text-goat group-hover:">
        {repo.name}
      </p>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </div>

    {repo.description && (
      <p className="mt-2 text-sm leading-6 text-muted-foreground transition-colors group-hover:text-foreground/78">
        {normalizeText(repo.displayDescription ?? repo.description)}
      </p>
    )}

    <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em]">
        {repo.language ?? "code"}
      </span>
      {(repo.displayTopics ?? repo.topics.slice(0, 4)).map((topic) => (
        <span
          key={topic}
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          {topic}
        </span>
      ))}
    </div>
  </a>
);

export default GitHubRepoCard;
