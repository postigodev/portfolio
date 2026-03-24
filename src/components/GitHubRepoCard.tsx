import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { GitHubRepo } from "@/hooks/use-github-repos";
import { normalizeText } from "@/lib/utils";

const GitHubRepoCard = ({ repo }: { repo: GitHubRepo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="group block rounded-lg border border-border p-5 transition-colors hover:bg-card"
  >
    <div className="flex items-start justify-between gap-2">
      <h3 className="text-base font-mono font-semibold text-foreground group-hover:underline">
        {repo.name}
      </h3>
      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
    {repo.description && (
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {normalizeText(repo.displayDescription ?? repo.description)}
      </p>
    )}
    <div className="mt-3 flex flex-wrap gap-1.5">
      {repo.language && (
        <Badge variant="secondary" className="text-xs font-mono font-normal">
          {repo.language}
        </Badge>
      )}
      {(repo.displayTopics ?? repo.topics.slice(0, 4)).map((topic) => (
        <Badge key={topic} variant="outline" className="text-xs font-mono font-normal">
          {topic}
        </Badge>
      ))}
    </div>
  </a>
);

export default GitHubRepoCard;
