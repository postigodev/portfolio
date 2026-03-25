import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { GitHubRepo } from "@/hooks/use-github-repos";
import { normalizeText } from "@/lib/utils";

const GitHubRepoCard = ({ repo }: { repo: GitHubRepo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block rounded-2xl border border-border/80 bg-card/60 p-5 transition-all hover:-translate-y-0.5 hover:border-goat/35 hover:bg-card"
  >
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          Open source
        </p>
        <h3 className="mt-3 text-lg font-semibold tracking-[-0.03em] text-foreground">
          {repo.name}
        </h3>
      </div>
      <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-goat" />
    </div>

    {repo.description && (
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {normalizeText(repo.displayDescription ?? repo.description)}
      </p>
    )}

    <div className="mt-5 flex flex-wrap gap-2 border-t border-border/80 pt-4">
      {repo.language && (
        <Badge variant="secondary" className="rounded-full bg-background/60 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {repo.language}
        </Badge>
      )}
      {(repo.displayTopics ?? repo.topics.slice(0, 4)).map((topic) => (
        <Badge
          key={topic}
          variant="outline"
          className="rounded-full border-border/70 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          {topic}
        </Badge>
      ))}
    </div>
  </a>
);

export default GitHubRepoCard;
